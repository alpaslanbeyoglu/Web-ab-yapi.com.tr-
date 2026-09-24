import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Compass,
  Navigation,
  MapPin,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  LocateFixed,
  ChevronDown,
  Building2,
  Sparkles,
  Footprints,
  Car,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Radio,
  Play,
  Pause,
  RotateCw,
  Sliders,
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

// Haversine formula to compute great-circle distance in meters
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

  return R * c; // in meters
}

// Great-circle initial bearing in degrees (0 - 360)
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
    { label: 'Kuzey (K)', min: 337.5, max: 360 },
    { label: 'Kuzey (K)', min: 0, max: 22.5 },
    { label: 'Kuzeydoğu (KD)', min: 22.5, max: 67.5 },
    { label: 'Doğu (D)', min: 67.5, max: 112.5 },
    { label: 'Güneydoğu (GD)', min: 112.5, max: 157.5 },
    { label: 'Güney (G)', min: 157.5, max: 202.5 },
    { label: 'Güneybatı (GB)', min: 202.5, max: 247.5 },
    { label: 'Batı (B)', min: 247.5, max: 292.5 },
    { label: 'Kuzeybatı (KB)', min: 292.5, max: 337.5 },
  ];

  for (const d of directions) {
    if (bearing >= d.min && bearing < d.max) {
      return d.label;
    }
  }
  return 'Kuzey (K)';
}

function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

// Estimated walking and driving time
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
  // Expanded HUD modal state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [autoNearest, setAutoNearest] = useState<boolean>(true);
  const [selectedTargetId, setSelectedTargetId] = useState<string>('auto');

  // Location state
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    accuracy?: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Compass & Heading state
  const [realHeading, setRealHeading] = useState<number | null>(null);
  const [simulatedHeading, setSimulatedHeading] = useState<number>(0);
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(false);
  const [headingPermission, setHeadingPermission] = useState<
    'prompt' | 'granted' | 'denied' | 'unsupported'
  >('prompt');
  const [hasSensorEvent, setHasSensorEvent] = useState<boolean>(false);

  // Fallback default coordinates (Fatih / Cerrahpaşa)
  const defaultFallbackLocation = useMemo(
    () => ({
      lat: 41.0122,
      lng: 28.9554,
      accuracy: 20,
    }),
    []
  );

  // Build target destinations
  const allDestinations: LocationPoint[] = useMemo(() => {
    const list: LocationPoint[] = [];

    // 1. Head Office
    list.push({
      id: 'office',
      name: `${companyInfo.name} Merkez Ofisi`,
      type: 'office',
      address: companyInfo.address,
      district: companyInfo.district,
      lat: 41.00615,
      lng: 28.94312,
      status: 'Açık & Hizmette',
      image: '/logo.svg',
    });

    // 2. All completed projects
    projects.forEach((proj) => {
      list.push({
        id: proj.id,
        name: `${proj.title}`,
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

  // Current active location
  const currentLocation = userLocation || defaultFallbackLocation;

  // Compute distances & bearings for all targets
  const computedTargets = useMemo(() => {
    return allDestinations.map((dest) => {
      const distance = calculateHaversineDistance(
        currentLocation.lat,
        currentLocation.lng,
        dest.lat,
        dest.lng
      );
      const bearing = calculateBearing(
        currentLocation.lat,
        currentLocation.lng,
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
    }).sort((a, b) => a.distance - b.distance);
  }, [allDestinations, currentLocation]);

  // Determine active target
  const activeTarget = useMemo(() => {
    if (autoNearest || selectedTargetId === 'auto') {
      return computedTargets[0] || computedTargets.find(t => t.type === 'office');
    }
    const found = computedTargets.find((t) => t.id === selectedTargetId);
    return found || computedTargets[0];
  }, [computedTargets, autoNearest, selectedTargetId]);

  // Effective device heading (Real sensor heading if available, or manual simulated heading)
  const currentHeading = useMemo(() => {
    if (realHeading !== null && !isSimulationActive) {
      return realHeading;
    }
    return simulatedHeading;
  }, [realHeading, simulatedHeading, isSimulationActive]);

  // Compute live needle rotation:
  // needleRotation = (bearing - heading) mod 360
  const needleRotation = useMemo(() => {
    if (!activeTarget) return 0;
    const rot = (activeTarget.bearing - currentHeading + 360) % 360;
    return Math.round(rot);
  }, [activeTarget, currentHeading]);

  // Check if locked on target within +/- 12 degrees
  const isLockedOnTarget = useMemo(() => {
    const diff = Math.abs(needleRotation);
    return diff <= 12 || diff >= 348;
  }, [needleRotation]);

  // Auto Simulation rotation interval
  useEffect(() => {
    if (!isSimulationActive) return;
    const interval = setInterval(() => {
      setSimulatedHeading((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isSimulationActive]);

  // Request & Watch GPS Position
  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setLocationError('Cihazınızda konum servisi desteklenmiyor.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setIsLocating(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Konum izni verilmedi. Tahmini Fatih merkez konumu kullanılıyor.');
        } else {
          setLocationError('Konum alınırken bir sorun oluştu.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  }, []);

  // Continuous GPS watch
  useEffect(() => {
    if (!('geolocation' in navigator)) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setLocationError(null);
      },
      (err) => {
        console.warn('GPS watch error:', err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Extract accurate compass heading from device orientation event
  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    let heading: number | null = null;

    // 1. iOS Safari native webkitCompassHeading (0 = True North, clockwise)
    const anyEvent = event as unknown as { webkitCompassHeading?: number; absolute?: boolean };
    if (typeof anyEvent.webkitCompassHeading === 'number' && !isNaN(anyEvent.webkitCompassHeading)) {
      heading = anyEvent.webkitCompassHeading;
      setHasSensorEvent(true);
      setHeadingPermission('granted');
    } else if (typeof event.alpha === 'number' && !isNaN(event.alpha)) {
      // 2. Android & Standard Browsers
      setHasSensorEvent(true);
      setHeadingPermission('granted');

      // If tilt parameters are available, calculate 3D tilt-compensated heading
      if (typeof event.beta === 'number' && typeof event.gamma === 'number') {
        const betaRad = (event.beta * Math.PI) / 180;
        const gammaRad = (event.gamma * Math.PI) / 180;
        const alphaRad = (event.alpha * Math.PI) / 180;

        const cy = Math.cos(gammaRad);
        const sy = Math.sin(gammaRad);
        const cb = Math.cos(betaRad);
        const sb = Math.sin(betaRad);
        const ca = Math.cos(alphaRad);
        const sa = Math.sin(alphaRad);

        const Vx = -ca * sy - sa * sb * cy;
        const Vy = -sa * sy + ca * sb * cy;
        let comp = Math.atan2(Vx, Vy) * (180 / Math.PI);
        if (comp < 0) comp += 360;
        heading = comp;
      } else {
        heading = (360 - event.alpha) % 360;
      }
    }

    if (heading !== null) {
      setRealHeading(Math.round(heading));
    }
  }, []);

  // Request Compass Sensor Permission (iOS & Android)
  const enableSensors = async () => {
    requestLocation();

    try {
      const DeviceOrientationEventAny = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };

      if (typeof DeviceOrientationEventAny.requestPermission === 'function') {
        const response = await DeviceOrientationEventAny.requestPermission();
        if (response === 'granted') {
          setHeadingPermission('granted');
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setHeadingPermission('denied');
        }
      } else {
        setHeadingPermission('granted');
        window.addEventListener('deviceorientationabsolute' as unknown as keyof WindowEventMap, handleOrientation as unknown as EventListener, true);
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    } catch (e) {
      console.warn('Sensors activation error:', e);
      setHeadingPermission('unsupported');
    }
  };

  // Mount orientation listeners
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

  // Interactive compass dragging / manual rotation state
  const compassDialRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handleDialPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleDialPointerMove(e);
  };

  const handleDialPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !compassDialRef.current) return;
    const rect = compassDialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    setSimulatedHeading(Math.round(angle));
    setIsSimulationActive(false);
  };

  const handleDialPointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* 1. FLOATING COMPASS PILL (Bottom Left on Mobile/Desktop) */}
      <div className="fixed bottom-6 left-4 sm:left-6 z-40 select-none">
        {isMinimized ? (
          <button
            onClick={() => {
              setIsMinimized(false);
              enableSensors();
            }}
            aria-label="Pusulayı Aç"
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-950/90 text-amber-400 shadow-2xl border border-amber-500/40 backdrop-blur-md hover:scale-105 transition-all active:scale-95"
            title="Canlı Pusula & Mesafe Radarı"
          >
            <span className="absolute -inset-1 rounded-full bg-amber-500/20 animate-ping pointer-events-none opacity-60"></span>
            <Compass className="w-6 h-6 animate-spin-slow group-hover:text-amber-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-slate-950/90 text-white p-1.5 pl-2 pr-3 rounded-full shadow-2xl border border-amber-500/30 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/60 max-w-[calc(100vw-5.5rem)] sm:max-w-md">
            
            {/* Rotating Mini Compass Rose Needle */}
            <button
              onClick={() => {
                setIsOpen(true);
                enableSensors();
              }}
              className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-amber-500/20 to-slate-900 border border-amber-400/40 shrink-0 shadow-inner overflow-hidden cursor-pointer active:scale-90 transition-transform"
              title="Pusulayı Büyüt & Canlı Takip Et"
            >
              {/* Dial tick marks */}
              <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-400/30"></div>

              {/* LIVE ROTATING ARROW NEEDLE */}
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
                style={{ transform: `rotate(${needleRotation}deg)` }}
              >
                <div className="flex flex-col items-center justify-center">
                  {/* Pointing Head */}
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[14px] border-b-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"></div>
                  {/* Pivot Pin */}
                  <div className="w-2 h-2 rounded-full bg-white -my-0.5 border border-slate-900 z-10 shadow"></div>
                  {/* Tail */}
                  <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[9px] border-t-slate-500 opacity-70"></div>
                </div>
              </div>

              {/* Pulsing beacon if locked */}
              {isLockedOnTarget && (
                <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"></span>
              )}
            </button>

            {/* Live Distance & Target Text */}
            <div
              onClick={() => {
                setIsOpen(true);
                enableSensors();
              }}
              className="cursor-pointer overflow-hidden text-left"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black tracking-wider text-amber-400 uppercase flex items-center gap-1 font-mono">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  {activeTarget?.formattedDistance}
                </span>
                <span className="text-[10px] text-slate-400">
                  · {needleRotation}°
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-100 truncate max-w-[130px] sm:max-w-[190px]">
                {activeTarget?.name}
              </p>
            </div>

            {/* Expand / Minimize Controls */}
            <div className="flex items-center gap-1 ml-1 border-l border-slate-800 pl-1.5 shrink-0">
              <button
                onClick={() => {
                  setIsOpen(true);
                  enableSensors();
                }}
                className="p-1.5 text-slate-400 hover:text-amber-400 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                title="Radarı Büyüt"
                aria-label="Radarı Büyüt"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                title="Küçült"
                aria-label="Küçült"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. EXPANDED LUXURY RADAR & COMPASS HUD MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                  <Compass className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-100 text-base sm:text-lg tracking-tight">
                      AB Yapı Canlı Pusula & Radar
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
                      {hasSensorEvent ? 'SENSÖR AKTİF' : 'CANLI GPS'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Gerçek zamanlı yön göstergesi ve yapı mesafesi
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

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">

              {/* A. TARGET SELECTION (AUTO vs SPECIFIC) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Hedef Nokta:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setAutoNearest(true);
                        setSelectedTargetId('auto');
                      }}
                      className={`px-2.5 py-1 rounded-full font-semibold text-[11px] transition-all cursor-pointer ${
                        autoNearest
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      ⚡ En Yakın (Otomatik)
                    </button>
                    <button
                      onClick={() => {
                        setAutoNearest(false);
                        setSelectedTargetId('office');
                      }}
                      className={`px-2.5 py-1 rounded-full font-semibold text-[11px] transition-all cursor-pointer ${
                        !autoNearest && selectedTargetId === 'office'
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      🏢 Merkez Ofis
                    </button>
                  </div>
                </div>

                {/* Dropdown selector */}
                <div className="relative">
                  <select
                    value={autoNearest ? 'auto' : selectedTargetId}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'auto') {
                        setAutoNearest(true);
                        setSelectedTargetId('auto');
                      } else {
                        setAutoNearest(false);
                        setSelectedTargetId(val);
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-medium appearance-none focus:outline-none focus:border-amber-400 cursor-pointer pr-10"
                  >
                    <option value="auto">⚡ En Yakın AB Yapı Noktası (Otomatik)</option>
                    <option value="office">🏢 AB Yapı Genel Merkez Ofisi (Cerrahpaşa / Fatih)</option>
                    <optgroup label="── Tamamlanan AB Yapı Projeleri ──">
                      {computedTargets
                        .filter((t) => t.type === 'project')
                        .map((proj) => (
                          <option key={proj.id} value={proj.id}>
                            📍 {proj.name} ({proj.formattedDistance} · {proj.neighborhood || proj.district})
                          </option>
                        ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* B. LARGE INTERACTIVE 360° COMPASS DIAL */}
              <div className="relative flex flex-col items-center justify-center py-2">
                
                {/* Touch / Mouse interactive Compass Dial */}
                <div
                  ref={compassDialRef}
                  onPointerDown={handleDialPointerDown}
                  onPointerMove={handleDialPointerMove}
                  onPointerUp={handleDialPointerUp}
                  className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-amber-500/30 bg-radial from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center shadow-2xl touch-none cursor-grab active:cursor-grabbing"
                  title="Pusula kadranına dokunup sürükleyerek yönü test edebilirsiniz"
                >
                  {/* Outer Degree Ring & Ticks */}
                  <div className="absolute inset-1 rounded-full border border-amber-400/20 border-dashed"></div>
                  <div className="absolute inset-6 rounded-full border border-slate-800"></div>
                  <div className="absolute inset-14 rounded-full border border-slate-800/60 border-dashed"></div>

                  {/* Crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-px bg-slate-800/60"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-full w-px bg-slate-800/60"></div>
                  </div>

                  {/* Cardinal Directions */}
                  <div className="absolute top-2 font-black text-amber-400 text-xs tracking-widest pointer-events-none">K (N)</div>
                  <div className="absolute bottom-2 font-black text-slate-500 text-xs tracking-widest pointer-events-none">G (S)</div>
                  <div className="absolute right-3 font-black text-slate-500 text-xs tracking-widest pointer-events-none">D (E)</div>
                  <div className="absolute left-3 font-black text-slate-500 text-xs tracking-widest pointer-events-none">B (W)</div>

                  {/* Intercardinal Degrees */}
                  <div className="absolute top-7 right-9 text-[9px] text-slate-600 font-mono pointer-events-none">45°</div>
                  <div className="absolute bottom-7 right-9 text-[9px] text-slate-600 font-mono pointer-events-none">135°</div>
                  <div className="absolute bottom-7 left-9 text-[9px] text-slate-600 font-mono pointer-events-none">225°</div>
                  <div className="absolute top-7 left-9 text-[9px] text-slate-600 font-mono pointer-events-none">315°</div>

                  {/* DYNAMIC ROTATING NEEDLE */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-150 ease-out pointer-events-none"
                    style={{ transform: `rotate(${needleRotation}deg)` }}
                  >
                    <div className="relative flex flex-col items-center justify-center h-48 sm:h-52">
                      {/* Top Needle Target Arrow */}
                      <div className="relative flex flex-col items-center">
                        {/* Target beacon dot */}
                        <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 shadow-[0_0_14px_rgba(251,191,36,1)] flex items-center justify-center -mb-1.5 z-20 animate-bounce">
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        </div>
                        {/* Needle Head Triangle */}
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[42px] border-b-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]"></div>
                      </div>

                      {/* Pivot Center Pin */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 border-2 border-slate-900 shadow-xl z-20 flex items-center justify-center -my-3.5">
                        <div className="w-3 h-3 rounded-full bg-slate-950 shadow-inner"></div>
                      </div>

                      {/* Counterweight Tail */}
                      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[30px] border-t-slate-600 opacity-60"></div>
                    </div>
                  </div>

                  {/* Lock glow ring */}
                  {isLockedOnTarget && (
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400/60 animate-ping pointer-events-none"></div>
                  )}
                </div>

                {/* Status Chips */}
                <div className="mt-4 grid grid-cols-3 gap-2 w-full text-center">
                  <div className="bg-slate-900/90 px-2.5 py-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Hedef Yönü (Azimut)</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-amber-400">
                      {Math.round(activeTarget?.bearing || 0)}° {activeTarget?.cardinal.split(' ')[0]}
                    </span>
                  </div>

                  <div className="bg-slate-900/90 px-2.5 py-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Cihaz Açısı</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-slate-200">
                      {currentHeading}°
                    </span>
                  </div>

                  <div className="bg-slate-900/90 px-2.5 py-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Hizalanma</span>
                    <span className={`text-xs font-bold ${isLockedOnTarget ? 'text-emerald-400' : 'text-amber-400/80'}`}>
                      {isLockedOnTarget ? '🎯 Kilitlendi' : `${needleRotation}° Çevir`}
                    </span>
                  </div>
                </div>

                {/* TEST & CALIBRATION CONTROLS */}
                <div className="mt-3 w-full space-y-2">
                  {/* Slider to manually spin orientation & test needle live */}
                  <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-amber-400" />
                        Manuel Döndür / Test Et:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsSimulationActive(!isSimulationActive)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                            isSimulationActive
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {isSimulationActive ? (
                            <>
                              <Pause className="w-3 h-3" /> Simülasyonu Durdur
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-emerald-400" /> Otomatik 360° Çevir
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={currentHeading}
                        onChange={(e) => {
                          setIsSimulationActive(false);
                          setSimulatedHeading(Number(e.target.value));
                        }}
                        className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <span className="text-xs font-mono font-bold text-amber-400 w-10 text-right">
                        {currentHeading}°
                      </span>
                    </div>
                  </div>

                  {/* Sensor activation button */}
                  <button
                    onClick={enableSensors}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 hover:from-amber-500/30 hover:to-amber-500/30 border border-amber-500/40 rounded-xl text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-amber-400" />
                    Telefon Sensörünü Yeniden Başlat & GPS İzni Ver
                  </button>
                </div>
              </div>

              {/* C. ACTIVE TARGET DETAILS CARD */}
              {activeTarget && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {activeTarget.type === 'office' ? 'GENEL MERKEZ OFİS' : 'TAMAMLANAN PROJE'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {activeTarget.district}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white leading-tight">
                        {activeTarget.name}
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {activeTarget.address}
                      </p>
                    </div>

                    {/* Distance Badge */}
                    <div className="text-right shrink-0 bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 shadow-inner">
                      <div className="text-lg sm:text-xl font-black text-amber-400 font-mono tracking-tight">
                        {activeTarget.formattedDistance}
                      </div>
                      <div className="text-[10px] text-slate-400">mesafe</div>
                    </div>
                  </div>

                  {/* Travel Time Estimates */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 bg-slate-950/50 p-2 rounded-xl text-slate-300">
                      <Footprints className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 block">Yaya Ulaşım</span>
                        <span className="font-semibold text-slate-200">{activeTarget.times.walking}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-950/50 p-2 rounded-xl text-slate-300">
                      <Car className="w-4 h-4 text-blue-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 block">Araçla Ulaşım</span>
                        <span className="font-semibold text-slate-200">{activeTarget.times.driving}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => openDirections(activeTarget)}
                      className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                    >
                      <Navigation className="w-4 h-4" />
                      Google Haritalar'da Yol Tarifi Al
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    {activeTarget.type === 'project' && onSelectProject && (
                      <button
                        onClick={() => {
                          const fullProj = projects.find((p) => p.id === activeTarget.id);
                          if (fullProj) {
                            onSelectProject(fullProj);
                            setIsOpen(false);
                            if (setActiveTab) setActiveTab('projects');
                          }
                        }}
                        className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors shrink-0 cursor-pointer"
                        title="Proje Detayını İncele"
                      >
                        Detaylar
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* D. LIVE GPS STATUS */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div>
                    <span className="text-slate-300 font-medium">
                      {userLocation ? 'Canlı GPS Konumu Aktif' : 'Varsayılan İstanbul Lokasyonu'}
                    </span>
                    {userLocation?.accuracy && (
                      <span className="text-[10px] text-slate-500 block">
                        Doğruluk Hassasiyeti: ±{Math.round(userLocation.accuracy)} metre
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={requestLocation}
                  disabled={isLocating}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                  {isLocating ? 'Konum Alınıyor...' : 'Konumu Yenile'}
                </button>
              </div>

              {locationError && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{locationError}</span>
                </div>
              )}

            </div>

            {/* Modal Footer Note */}
            <div className="p-3 bg-slate-950 border-t border-slate-900 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>
                Pusula kadranına dokunup parmağınızla çevirebilir veya telefonunuzu döndürerek test edebilirsiniz.
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
