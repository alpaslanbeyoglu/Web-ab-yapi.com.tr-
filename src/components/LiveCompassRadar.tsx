import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Compass,
  Navigation,
  MapPin,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  Building2,
  Footprints,
  Car,
  RefreshCw,
  ShieldCheck,
  Radio,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Project, CompanyInfo } from '../types';

interface LiveCompassRadarProps {
  projects: Project[];
  companyInfo: CompanyInfo;
  onSelectProject?: (project: Project) => void;
  setActiveTab?: (tab: string) => void;
}

interface LocationPoint {
  id: string;
  name: string;
  type: 'office' | 'project';
  address: string;
  district: string;
  neighborhood?: string;
  lat: number;
  lng: number;
  image?: string;
  status?: string;
}

// Great-circle Haversine formula (distance in meters)
function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Great-circle initial bearing in degrees (0° - 360°)
function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  let brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

// Cardinal direction helper in Turkish
function getCardinalDirectionTR(bearing: number): string {
  const directions = [
    { label: 'Kuzey', min: 337.5, max: 360 },
    { label: 'Kuzey', min: 0, max: 22.5 },
    { label: 'Kuzeydoğu', min: 22.5, max: 67.5 },
    { label: 'Doğu', min: 67.5, max: 112.5 },
    { label: 'Güneydoğu', min: 112.5, max: 157.5 },
    { label: 'Güney', min: 157.5, max: 202.5 },
    { label: 'Güneybatı', min: 202.5, max: 247.5 },
    { label: 'Batı', min: 247.5, max: 292.5 },
    { label: 'Kuzeybatı', min: 292.5, max: 337.5 },
  ];

  for (const d of directions) {
    if (bearing >= d.min && bearing < d.max) {
      return d.label;
    }
  }
  return 'Kuzey';
}

function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

// Estimated walking and driving times
function getEstimatedTimes(meters: number): { walking: string; driving: string } {
  const walkingMin = Math.max(1, Math.round(meters / 80));
  const walkingStr = walkingMin > 60
    ? `${Math.floor(walkingMin / 60)} sa ${walkingMin % 60} dk`
    : `${walkingMin} dk yürüme`;

  const drivingMin = Math.max(1, Math.round(meters / 416));
  const drivingStr = drivingMin > 60
    ? `${Math.floor(drivingMin / 60)} sa ${drivingMin % 60} dk`
    : `${drivingMin} dk araçla`;

  return { walking: walkingStr, driving: drivingStr };
}

export const LiveCompassRadar: React.FC<LiveCompassRadarProps> = ({
  projects,
  companyInfo,
  onSelectProject,
  setActiveTab,
}) => {
  // Modal & View states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [selectedTargetId, setSelectedTargetId] = useState<string>('auto');

  // Automatic GPS Location State
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    accuracy?: number;
  } | null>(null);

  // Automatic Compass Orientation State
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);

  // Default fallback center (Fatih / Cerrahpaşa)
  const fallbackLocation = useMemo(
    () => ({
      lat: 41.004813,
      lng: 28.933724,
      accuracy: 15,
    }),
    []
  );

  // Build full list of destinations (Central Office + Projects)
  const allDestinations: LocationPoint[] = useMemo(() => {
    const list: LocationPoint[] = [];

    // 1. AB Yapı Office
    list.push({
      id: 'office',
      name: `${companyInfo.name} Cerrahpaşa Ofisi`,
      type: 'office',
      address: companyInfo.address,
      district: companyInfo.district,
      lat: 41.004813,
      lng: 28.933724,
      status: 'Ofisimiz',
      image: '/logo.svg',
    });

    // 2. All projects
    projects.forEach((proj) => {
      list.push({
        id: proj.id,
        name: proj.title,
        type: 'project',
        address: proj.address,
        district: proj.district,
        neighborhood: proj.neighborhood,
        lat: proj.lat,
        lng: proj.lng,
        image: proj.featuredImage,
        status: proj.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor',
      });
    });

    return list;
  }, [projects, companyInfo]);

  // Current active GPS position
  const activePosition = userLocation || fallbackLocation;

  // Compute live distances and bearings for all destinations automatically
  const computedTargets = useMemo(() => {
    return allDestinations
      .map((dest) => {
        const distance = calculateHaversineDistance(
          activePosition.lat,
          activePosition.lng,
          dest.lat,
          dest.lng
        );
        const bearing = calculateBearing(
          activePosition.lat,
          activePosition.lng,
          dest.lat,
          dest.lng
        );
        return {
          ...dest,
          distance,
          bearing,
          cardinal: getCardinalDirectionTR(bearing),
          formattedDistance: formatDistance(distance),
          times: getEstimatedTimes(distance),
        };
      })
      .sort((a, b) => a.distance - b.distance);
  }, [allDestinations, activePosition]);

  // Current active destination (automatic closest or user chosen)
  const currentTarget = useMemo(() => {
    if (selectedTargetId === 'auto') {
      return computedTargets[0] || computedTargets.find((t) => t.type === 'office');
    }
    const found = computedTargets.find((t) => t.id === selectedTargetId);
    return found || computedTargets[0];
  }, [computedTargets, selectedTargetId]);

  // Needle rotation calculation:
  // Points directly at target in physical 3D space: (bearing - deviceHeading)
  const needleRotation = useMemo(() => {
    if (!currentTarget) return 0;
    if (deviceHeading !== null) {
      return (currentTarget.bearing - deviceHeading + 360) % 360;
    }
    return currentTarget.bearing;
  }, [currentTarget, deviceHeading]);

  // Target lock indicator (within +/- 15 degrees)
  const isAligned = useMemo(() => {
    if (deviceHeading === null) return false;
    const diff = Math.abs(needleRotation);
    return diff <= 15 || diff >= 345;
  }, [needleRotation, deviceHeading]);

  // Request & Auto-watch GPS position
  useEffect(() => {
    if (!('geolocation' in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        console.warn('GPS position init error:', err);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        console.warn('GPS continuous error:', err);
      },
      { enableHighAccuracy: true, maximumAge: 3000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Handle device compass heading
  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    let heading: number | null = null;
    const anyEvent = event as unknown as { webkitCompassHeading?: number };

    // iOS Safari
    if (typeof anyEvent.webkitCompassHeading === 'number' && !isNaN(anyEvent.webkitCompassHeading)) {
      heading = anyEvent.webkitCompassHeading;
    } else if (typeof event.alpha === 'number' && !isNaN(event.alpha)) {
      // Android / Chrome
      heading = (360 - event.alpha) % 360;
    }

    if (heading !== null) {
      setDeviceHeading(Math.round(heading));
    }
  }, []);

  // Request Compass Sensor & Listen
  const enableSensors = async () => {
    try {
      const DeviceOrientationEventAny = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };

      if (typeof DeviceOrientationEventAny.requestPermission === 'function') {
        const response = await DeviceOrientationEventAny.requestPermission();
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      } else {
        window.addEventListener('deviceorientationabsolute' as unknown as keyof WindowEventMap, handleOrientation as unknown as EventListener, true);
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    } catch {
      // silent fallback
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('deviceorientationabsolute' as unknown as keyof WindowEventMap, handleOrientation as unknown as EventListener, true);
    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientationabsolute' as unknown as keyof WindowEventMap, handleOrientation as unknown as EventListener, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [handleOrientation]);

  // Open Google Maps directions
  const openDirections = (dest: LocationPoint) => {
    const originParam = userLocation
      ? `&origin=${userLocation.lat},${userLocation.lng}`
      : '';
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dest.lat},${dest.lng}${originParam}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* 1. FLOATING MINIMAL COMPASS PILL (Bottom Left with 3D Holographic Elevation) */}
      <div className="fixed bottom-6 left-4 sm:left-6 z-40 select-none animate-float-slow">
        {isMinimized ? (
          <button
            onClick={() => {
              setIsMinimized(false);
              enableSensors();
            }}
            aria-label="Pusulayı Aç"
            className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-slate-950/95 text-amber-400 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.7),0_0_25px_rgba(245,158,11,0.45)] border-t border-amber-300/50 border-b border-amber-600/30 ring-1 ring-amber-500/30 backdrop-blur-xl hover:scale-105 transition-all active:scale-95 cursor-pointer"
            title="Size En Yakın AB Yapı Projesi (Pusulayı Aç)"
          >
            <span className="absolute -inset-1 rounded-full bg-amber-500/25 animate-ping pointer-events-none opacity-60"></span>
            <Compass className="w-6 h-6 text-amber-400 group-hover:rotate-45 transition-transform drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full shadow-xs"></span>
          </button>
        ) : (
          <div
            className="flex items-center gap-2.5 bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-slate-950/95 text-white p-2.5 pl-3 pr-4 rounded-3xl shadow-[0_20px_40px_-8px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.35)] border-t border-amber-300/40 border-b border-amber-600/20 ring-1 ring-amber-500/30 backdrop-blur-2xl transition-all duration-300 hover:border-amber-400/80 hover:shadow-[0_25px_45px_-8px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.5)] max-w-[calc(100vw-5.5rem)] sm:max-w-md cursor-pointer group transform hover:-translate-y-0.5"
            onClick={() => {
              setIsOpen(true);
              enableSensors();
            }}
          >
            {/* Automatic Rotating Compass Rose Needle */}
            <div
              className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/25 via-slate-900 to-slate-950 border border-amber-400/60 shrink-0 shadow-[inset_0_2px_6px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden group-hover:scale-105 transition-transform"
              title="Pusulayı Aç"
            >
              {/* Dial tick marks */}
              <div className="absolute inset-0.5 rounded-2xl border border-dashed border-amber-400/40"></div>

              {/* LIVE NEEDLE */}
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
                style={{ transform: `rotate(${needleRotation}deg)` }}
              >
                <div className="flex flex-col items-center justify-center">
                  {/* Pointing Head */}
                  <div className="w-0 h-0 border-l-[5.5px] border-l-transparent border-r-[5.5px] border-r-transparent border-b-[15px] border-b-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,1)]"></div>
                  {/* Pivot Pin */}
                  <div className="w-2.5 h-2.5 rounded-full bg-white -my-0.5 border border-slate-950 z-10 shadow-[0_0_6px_rgba(255,255,255,0.8)]"></div>
                  {/* Tail */}
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[10px] border-t-slate-500 opacity-75"></div>
                </div>
              </div>

              {/* Pulsing ring if aligned */}
              {isAligned && (
                <span className="absolute inset-0 rounded-2xl bg-emerald-400/30 animate-ping"></span>
              )}
            </div>

            {/* Target Details Text & Call to Action */}
            <div className="overflow-hidden text-left flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black tracking-wider text-amber-400 uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Size En Yakın AB Yapı Projesi
                </span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-xs font-bold text-slate-100 truncate">
                  {currentTarget?.name}
                </span>
                <span className="text-[11px] font-black text-amber-400 font-mono shrink-0 drop-shadow-xs">
                  · {currentTarget?.formattedDistance}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 group-hover:text-amber-300 transition-colors flex items-center gap-1">
                <span>Pusulayı açmak ve yön bulmak için tıklayın</span>
                <ChevronRight className="w-3 h-3 text-amber-400 shrink-0" />
              </p>
            </div>

            {/* Minimize Control */}
            <div className="flex items-center shrink-0 border-l border-slate-800/80 pl-1.5 ml-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(true);
                }}
                className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Küçült"
                aria-label="Küçült"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. ELEGANT SADELEŞTİRİLMİŞ RADAR & COMPASS MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none">
          <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                  <Compass className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base sm:text-lg tracking-tight flex items-center gap-2">
                    AB Yapı Canlı Pusula
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Otomatik En Yakın Proje Tespiti
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 custom-scrollbar">

              {/* A. AUTOMATIC 360° PUSULA KADRANI */}
              <div className="relative flex flex-col items-center justify-center py-2">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-amber-500/30 bg-radial from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center shadow-2xl">
                  
                  {/* Concentric Ticks */}
                  <div className="absolute inset-1.5 rounded-full border border-amber-400/20 border-dashed"></div>
                  <div className="absolute inset-6 rounded-full border border-slate-800"></div>

                  {/* Cardinal Directions */}
                  <div className="absolute top-2 font-black text-amber-400 text-xs tracking-widest">K (N)</div>
                  <div className="absolute bottom-2 font-black text-slate-500 text-xs tracking-widest">G (S)</div>
                  <div className="absolute right-3 font-black text-slate-500 text-xs tracking-widest">D (E)</div>
                  <div className="absolute left-3 font-black text-slate-500 text-xs tracking-widest">B (W)</div>

                  {/* LIVE ROTATING NEEDLE */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out pointer-events-none"
                    style={{ transform: `rotate(${needleRotation}deg)` }}
                  >
                    <div className="relative flex flex-col items-center justify-center h-44 sm:h-48">
                      {/* Top Needle Target Arrow */}
                      <div className="relative flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950 shadow-[0_0_12px_rgba(251,191,36,1)] flex items-center justify-center -mb-1 z-20 animate-bounce">
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        </div>
                        <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[38px] border-b-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]"></div>
                      </div>

                      {/* Pivot Center Pin */}
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 border-2 border-slate-900 shadow-xl z-20 flex items-center justify-center -my-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-950"></div>
                      </div>

                      {/* Tail */}
                      <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[26px] border-t-slate-600 opacity-60"></div>
                    </div>
                  </div>

                  {/* Aligned glow */}
                  {isAligned && (
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400/60 animate-ping pointer-events-none"></div>
                  )}
                </div>

                {/* Distance & Heading Info */}
                <div className="mt-3 flex items-center justify-center gap-3 text-center">
                  <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Kuş Uçuşu Mesafe</span>
                    <span className="text-sm font-mono font-bold text-amber-400">
                      {currentTarget?.formattedDistance}
                    </span>
                  </div>

                  <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Yön Açısı</span>
                    <span className="text-sm font-mono font-bold text-slate-200">
                      {Math.round(currentTarget?.bearing || 0)}° ({currentTarget?.cardinal})
                    </span>
                  </div>
                </div>
              </div>

              {/* B. CURRENT ACTIVE TARGET CARD */}
              {currentTarget && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {currentTarget.type === 'office' ? 'AB YAPI OFİSİ' : 'TAMAMLANAN PROJE'}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {currentTarget.district}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white leading-tight">
                        {currentTarget.name}
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {currentTarget.address}
                      </p>
                    </div>

                    <div className="text-right shrink-0 bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 shadow-inner">
                      <div className="text-lg font-black text-amber-400 font-mono">
                        {currentTarget.formattedDistance}
                      </div>
                    </div>
                  </div>

                  {/* Travel Times */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                    <div className="flex items-center gap-2 bg-slate-950/50 p-2 rounded-xl text-slate-300">
                      <Footprints className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 block">Yaya</span>
                        <span className="font-semibold text-slate-200">{currentTarget.times.walking}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-950/50 p-2 rounded-xl text-slate-300">
                      <Car className="w-4 h-4 text-blue-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 block">Araçla</span>
                        <span className="font-semibold text-slate-200">{currentTarget.times.driving}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => openDirections(currentTarget)}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Navigation className="w-4 h-4" />
                    Google Haritalar'da Yol Tarifi Al
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* C. EN YAKIN DİĞER PROJELER LİSTESİ */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Size En Yakın Diğer AB Yapı Noktaları:</span>
                  <button
                    onClick={() => setSelectedTargetId('auto')}
                    className={`text-[11px] hover:text-amber-400 transition-colors ${
                      selectedTargetId === 'auto' ? 'text-amber-400 font-bold' : 'text-slate-500'
                    }`}
                  >
                    Otomatik En Yakın
                  </button>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {computedTargets.slice(0, 6).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedTargetId(item.id)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        currentTarget?.id === item.id
                          ? 'bg-amber-500/15 border-amber-500/50 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold truncate">{item.name}</span>
                          {item.type === 'office' && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">Ofis</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{item.neighborhood || item.district}</p>
                      </div>

                      <div className="text-right shrink-0 ml-2">
                        <span className="text-xs font-mono font-bold text-amber-400">{item.formattedDistance}</span>
                        <span className="text-[10px] text-slate-500 block">{item.cardinal}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-950 border-t border-slate-900 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Telefonunuzu çevirdikçe ibre hedef yapıyı gerçek zamanlı gösterir.</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
