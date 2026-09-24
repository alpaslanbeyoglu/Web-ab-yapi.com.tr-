import React, { useState } from 'react';
import { Project } from '../types';
import { IstanbulMap } from '../components/IstanbulMap';
import { MapPin, Navigation, Building2, CheckCircle2 } from 'lucide-react';

interface MapViewProps {
  projects: Project[];
  setSelectedProject: (project: Project | null) => void;
  setActiveTab: (tab: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ projects, setSelectedProject, setActiveTab }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Tümü');

  const districts = ['Tümü', ...Array.from(new Set(projects.map((p) => p.district)))];

  const handleSelect = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('projects');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
      {/* Page Title Header */}
      <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/30">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Fatih Suriçi Proje & Şantiye Veritabanı</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold font-outfit tracking-tight">
          Tamamlanan ve Devam Eden Projelerimiz Haritada
        </h1>
        <p className="text-slate-300 text-sm md:text-base max-w-2xl">
          AB Yapı'nın Fatih tarihi Suriçi bölgesinde inşa ettiği ve teslim ettiği depreme dayanıklı modern konut yapılarını ve devam eden şantiyelerimizi etkileşimli harita üzerinde keşfedin.
        </p>
      </div>

      {/* District Filter Chips */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-slate-500 shrink-0 mr-2 flex items-center gap-1">
          <Navigation className="w-3.5 h-3.5 text-teal-600" /> İlçeye Göre Filtrele:
        </span>
        {districts.map((d, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDistrict(d)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
              selectedDistrict === d
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Interactive Map Component */}
      <IstanbulMap
        projects={projects}
        onSelectProject={handleSelect}
        selectedDistrict={selectedDistrict}
      />
    </div>
  );
};
