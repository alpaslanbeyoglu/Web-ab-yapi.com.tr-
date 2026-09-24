import React, { useEffect, useRef, useState } from 'react';
import { Project, CompanyInfo } from '../types';
import { MapPin, Building, Calendar, ArrowRight, Navigation, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import L from 'leaflet';

interface IstanbulMapProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
  selectedDistrict?: string;
  companyInfo?: CompanyInfo;
}

export const IstanbulMap: React.FC<IstanbulMapProps> = ({
  projects,
  onSelectProject,
  selectedDistrict = 'Tümü',
  companyInfo,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(projects[0] || null);
  const [filterType, setFilterType] = useState<'all' | 'ongoing' | 'completed'>('all');

  const filteredProjects = projects.filter((p) => {
    const matchesDistrict = selectedDistrict === 'Tümü' || p.district === selectedDistrict;
    const matchesType =
      filterType === 'all' ||
      (filterType === 'ongoing' && p.status === 'ongoing') ||
      (filterType === 'completed' && p.status === 'completed');
    return matchesDistrict && matchesType;
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const container = mapContainerRef.current as unknown as { _leaflet_id?: unknown };
    if (container._leaflet_id) {
      container._leaflet_id = null;
    }

    // Default map center around Fatih Suriçi
    const map = L.map(mapContainerRef.current, {
      center: [41.0048, 28.9337],
      zoom: 15,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | AB Yapı Proje Haritası',
      maxZoom: 19,
    }).addTo(map);

    // Marker Icon Generator:
    // Bitmiş Projeler = Mavi Nokta
    // Devam Eden Projeler = Yanıp Sönen Yeşil Nokta
    const createProjectMarkerIcon = (status: 'completed' | 'ongoing' | string, isSelected: boolean) => {
      const isOngoing = status === 'ongoing';

      if (isOngoing) {
        // Devam Eden: Yanıp Sönen Yeşil Nokta
        const size = isSelected ? 38 : 30;
        return L.divIcon({
          html: `
            <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center;">
              <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: #22c55e; opacity: 0.75; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
              <div style="
                position: relative;
                width: ${size - 8}px;
                height: ${size - 8}px;
                background: linear-gradient(135deg, #10b981, #059669);
                border: 2.5px solid white;
                border-radius: 50%;
                box-shadow: 0 0 12px rgba(16, 185, 129, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
                transition: transform 0.2s ease;
              ">
                <span style="width: 6px; height: 6px; background-color: white; border-radius: 50%;"></span>
              </div>
            </div>
          `,
          className: 'custom-leaflet-marker',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
      }

      // Bitmiş Projeler: Mavi Nokta
      const size = isSelected ? 34 : 26;
      return L.divIcon({
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            border: 2.5px solid white;
            border-radius: 50%;
            box-shadow: 0 3px 10px rgba(37, 99, 235, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transform: ${isSelected ? 'scale(1.25)' : 'scale(1)'};
            transition: transform 0.2s ease;
          ">
            <span style="width: 6px; height: 6px; background-color: white; border-radius: 50%;"></span>
          </div>
        `,
        className: 'custom-leaflet-marker',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    };

    // AB Yapı Genel Merkez Ofisi İkonu (Altın & Lacivert Bina Rozeti)
    const createOfficeMarkerIcon = () => {
      return L.divIcon({
        html: `
          <div style="
            width: 36px;
            height: 36px;
            background: #0f172a;
            border: 2.5px solid #f59e0b;
            border-radius: 50%;
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fbbf24;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
              <path d="M9 22v-4h6v4"/>
              <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
              <path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/>
              <path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
            </svg>
          </div>
        `,
        className: 'custom-leaflet-marker',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
    };

    const bounds = L.latLngBounds([]);

    // 1. Add Office Marker
    const officeLat = 41.004813;
    const officeLng = 28.933724;
    bounds.extend([officeLat, officeLng]);

    const officeMarker = L.marker([officeLat, officeLng], {
      icon: createOfficeMarkerIcon(),
      zIndexOffset: 1000,
    }).addTo(map);

    officeMarker.bindPopup(`
      <div style="font-family: system-ui; width: 200px; text-align: left; padding: 4px;">
        <div style="font-size: 10px; font-weight: 800; color: #d97706; text-transform: uppercase;">🏢 GENEL MERKEZ</div>
        <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">AB Yapı Merkez Ofisi</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Kocamustafapaşa Cad. Çınar Sk. No: 2B, Fatih / İstanbul</div>
      </div>
    `);

    // 2. Add Project Markers (Blue dot for completed, Pulsing Green dot for ongoing)
    filteredProjects.forEach((proj) => {
      bounds.extend([proj.lat, proj.lng]);

      const isSelected = activeProject?.id === proj.id;
      const marker = L.marker([proj.lat, proj.lng], {
        icon: createProjectMarkerIcon(proj.status, isSelected),
      }).addTo(map);

      const statusBadge = proj.status === 'completed'
        ? '<span style="color: #2563eb; font-weight: 700;">🔵 Teslim Edildi (Tamamlandı)</span>'
        : '<span style="color: #10b981; font-weight: 700;">🟢 Devam Eden Şantiye</span>';

      const popupContent = `
        <div style="font-family: system-ui; width: 220px; text-align: left;">
          <img src="${proj.featuredImage}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <div style="font-size: 11px; font-weight: 700; color: #2563eb; text-transform: uppercase;">${proj.district} · ${proj.neighborhood || ''}</div>
          <div style="font-size: 14px; font-weight: 800; color: #0f172a; margin-top: 2px;">${proj.title}</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 4px;">${proj.address}</div>
          <div style="margin-top: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 4px 8px; border-radius: 6px; font-size: 11px;">
            ${statusBadge}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setActiveProject(proj);
        if (onSelectProject) onSelectProject(proj);
      });
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [filteredProjects, activeProject]);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Map Control Bar & Color Legend */}
      <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>AB Yapı Proje Lokasyon Haritası</span>
          </h3>
          <p className="text-xs text-slate-400">
            Fatih Suriçi bölgesindeki kesin koordinatlı projelerimiz ve merkez ofisimiz
          </p>
        </div>

        {/* Legend & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Color Legend */}
          <div className="flex items-center gap-3 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 border border-white shadow-xs"></span>
              <span className="text-slate-300">Bitmiş Proje</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
              </span>
              <span className="text-emerald-300">Devam Eden</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-950 border border-amber-400"></span>
              <span className="text-amber-300">Merkez Ofis</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterType === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tümü ({projects.length})
            </button>
            <button
              onClick={() => setFilterType('completed')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterType === 'completed' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Bitmiş ({projects.filter((p) => p.status === 'completed').length})
            </button>
            <button
              onClick={() => setFilterType('ongoing')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterType === 'ongoing' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Devam Eden ({projects.filter((p) => p.status === 'ongoing').length})
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[500px]">
        {/* Leaflet Map Canvas */}
        <div className="lg:col-span-2 relative h-[400px] lg:h-auto min-h-[460px] bg-slate-100">
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-10" />
        </div>

        {/* Selected Project Card Sidebar */}
        <div className="p-5 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between">
          {activeProject ? (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md group">
                <img
                  src={activeProject.featuredImage}
                  alt={activeProject.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase shadow-md flex items-center gap-1.5 ${
                      activeProject.status === 'completed'
                        ? 'bg-blue-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    {activeProject.status === 'completed' ? 'Bitmiş Proje' : 'Devam Eden'}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                  {activeProject.district} · {activeProject.neighborhood}
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg leading-snug">
                  {activeProject.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{activeProject.address}</span>
                </p>
              </div>

              {activeProject.features && activeProject.features.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {activeProject.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${activeProject.lat},${activeProject.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  Google Haritalar'da Yol Tarifi Al
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Haritadaki mavi veya yeşil noktalardan birine tıklayarak proje detaylarını görüntüleyin.
            </div>
          )}

          {activeProject && onSelectProject && (
            <button
              onClick={() => onSelectProject(activeProject)}
              className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Tüm Projeler Sayfasında İncele</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
