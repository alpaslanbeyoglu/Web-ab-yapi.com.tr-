import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { HISTORICAL_PROJECTS, HistoricalProject } from '../data/historicalProjects';
import { MapPin, Building, Calendar, ArrowRight, History } from 'lucide-react';
import L from 'leaflet';

interface IstanbulMapProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
  selectedDistrict?: string;
}

export const IstanbulMap: React.FC<IstanbulMapProps> = ({
  projects,
  onSelectProject,
  selectedDistrict = 'Tümü',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(projects[0] || null);
  const [activeHistorical, setActiveHistorical] = useState<HistoricalProject | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [showHistoricalPins, setShowHistoricalPins] = useState<boolean>(true);

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

    const container = mapContainerRef.current as any;
    if (container._leaflet_id) {
      container._leaflet_id = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [41.005, 28.938],
      zoom: 14,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | AB Yapı Proje Haritası',
      maxZoom: 18,
    }).addTo(map);

    const createCustomIcon = (status: string, isSelected: boolean) => {
      const color = status === 'completed' ? '#0D9488' : status === 'ongoing' ? '#D97706' : '#243342';
      const size = isSelected ? 42 : 34;

      const svgHtml = `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
          transition: transform 0.2s ease;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `;

      return L.divIcon({
        html: svgHtml,
        className: 'custom-leaflet-marker',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    };

    const createHistoricalIcon = () => {
      return L.divIcon({
        html: `
          <div style="
            width: 28px;
            height: 28px;
            background-color: #dc2626;
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `,
        className: 'custom-historical-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
    };

    const bounds = L.latLngBounds([]);

    // Modern Projects
    filteredProjects.forEach((proj) => {
      bounds.extend([proj.lat, proj.lng]);

      const isSelected = activeProject?.id === proj.id;
      const marker = L.marker([proj.lat, proj.lng], {
        icon: createCustomIcon(proj.status, isSelected),
      }).addTo(map);

      const popupContent = `
        <div style="font-family: system-ui; width: 220px; text-align: left;">
          <img src="${proj.featuredImage}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <div style="font-size: 11px; font-weight: 700; color: #0D9488; text-transform: uppercase;">${proj.district} · ${proj.type}</div>
          <div style="font-size: 14px; font-weight: 800; color: #0f172a; margin-top: 2px;">${proj.title}</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 4px;">${proj.neighborhood}</div>
          <div style="margin-top: 8px; background-color: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; color: #334155;">
            ${proj.status === 'completed' ? '✓ Teslim Edildi' : `%${proj.progress} İlerleme (${proj.deliveryDate})`}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setActiveProject(proj);
        setActiveHistorical(null);
        if (onSelectProject) onSelectProject(proj);
      });
    });

    // Historical Suriçi Pins
    if (showHistoricalPins) {
      HISTORICAL_PROJECTS.forEach((hProj) => {
        bounds.extend([hProj.lat, hProj.lng]);

        const hMarker = L.marker([hProj.lat, hProj.lng], {
          icon: createHistoricalIcon(),
        }).addTo(map);

        const hPopup = `
          <div style="font-family: system-ui; width: 200px;">
            <div style="font-size: 10px; font-weight: 800; color: #dc2626; text-transform: uppercase;">📍 AB Yapı Suriçi Eseri (Son 40 Yıl)</div>
            <div style="font-size: 12px; font-weight: 800; color: #0f172a; margin-top: 4px;">${hProj.address}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${hProj.neighborhood} / Fatih</div>
          </div>
        `;

        hMarker.bindPopup(hPopup);

        hMarker.on('click', () => {
          setActiveHistorical(hProj);
          setActiveProject(null);
        });
      });
    }

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [filteredProjects, activeProject, showHistoricalPins]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Map Control Bar */}
      <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-400" />
            <span>İstanbul Proje Etkileşimli Haritası</span>
          </h3>
          <p className="text-xs text-slate-400">
            Kentsel dönüşüm, modern rezidanslar ve son 40 yılda üretilen Suriçi yapılarımız
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowHistoricalPins(!showHistoricalPins)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
              showHistoricalPins
                ? 'bg-red-600 text-white border-red-500 shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Suriçi 40 Yıl Pinleri ({HISTORICAL_PROJECTS.length})</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterType === 'all' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tüm Projeler
            </button>
            <button
              onClick={() => setFilterType('ongoing')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterType === 'ongoing' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Devam Eden
            </button>
            <button
              onClick={() => setFilterType('completed')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterType === 'completed' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Teslim Edilenler
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[480px]">
        {/* Leaflet Container */}
        <div className="lg:col-span-2 relative h-[380px] lg:h-auto min-h-[420px] bg-slate-100">
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-10" />
        </div>

        {/* Sidebar Project Detail */}
        <div className="p-5 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between">
          {activeProject ? (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden shadow-md group">
                <img
                  src={activeProject.featuredImage}
                  alt={activeProject.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase shadow-md ${
                      activeProject.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : activeProject.status === 'ongoing'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {activeProject.status === 'completed'
                      ? 'Teslim Edildi'
                      : activeProject.status === 'ongoing'
                      ? 'Devam Ediyor'
                      : 'Planlanan'}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-teal-700 uppercase tracking-wide">
                  {activeProject.district} / {activeProject.neighborhood}
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg leading-snug">
                  {activeProject.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {activeProject.description}
                </p>
              </div>

              {activeProject.status === 'ongoing' && (
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>İnşaat İlerleme Oranı</span>
                    <span className="text-amber-600">%{activeProject.progress}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${activeProject.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="text-slate-400 font-medium flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-teal-600" /> Bağımsız Bölüm
                  </div>
                  <div className="font-bold text-slate-900 mt-0.5">{activeProject.totalUnits} Konut / Ofis</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="text-slate-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" /> Teslim Tarihi
                  </div>
                  <div className="font-bold text-slate-900 mt-0.5">{activeProject.deliveryDate}</div>
                </div>
              </div>
            </div>
          ) : activeHistorical ? (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 p-4 rounded-2xl space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-700 uppercase">
                  <History className="w-4 h-4 text-red-600" />
                  <span>Son 40 Yıl Suriçi Eserimiz</span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">
                  {activeHistorical.address}
                </h4>
                <div className="text-xs text-slate-600 font-medium">
                  {activeHistorical.neighborhood} / Fatih, İstanbul
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bu yapı, Faruk Ahmetbeyoğlu ve aile büyüklerimizin öncülüğünde Fatih tarihi suriçi bölgesinde inşa edilen nitelikli binalarımızdan biridir.
              </p>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Haritadaki pini seçerek proje detaylarını görüntüleyin.
            </div>
          )}

          {activeProject && onSelectProject && (
            <button
              onClick={() => onSelectProject(activeProject)}
              className="mt-4 w-full bg-slate-900 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Detaylı Proje Sayfasına Git</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
