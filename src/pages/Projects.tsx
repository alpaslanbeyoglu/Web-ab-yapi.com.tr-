import React, { useState } from 'react';
import { Project } from '../types';
import {
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Navigation,
  ExternalLink,
  SlidersHorizontal,
  X,
  MessageSquare,
  Search,
  Copy,
  Check,
} from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  whatsappNumber: string;
  setActiveTab?: (tab: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  selectedProject,
  setSelectedProject,
  whatsappNumber,
  setActiveTab,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const districts = ['Tümü', ...Array.from(new Set(projects.map((p) => p.district)))];

  const filteredProjects = projects.filter((p) => {
    const matchesStatus =
      statusFilter === 'all' || p.status === statusFilter;
    const matchesDistrict = districtFilter === 'Tümü' || p.district === districtFilter;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.neighborhood && p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesDistrict && matchesSearch;
  });

  const handleCopy = (proj: Project) => {
    navigator.clipboard.writeText(proj.address);
    setCopiedId(proj.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openGoogleMaps = (proj: Project) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${proj.lat},${proj.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10 space-y-8 select-none">
      
      {/* Page Title Header */}
      <div className="bg-slate-950 text-white p-6 md:p-10 rounded-3xl shadow-xl relative overflow-hidden border border-slate-800">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Fatih Suriçi Yapılarımız & Lokasyonları</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black font-outfit tracking-tight">
            AB Yapı Proje & Lokasyon Rehberi
          </h1>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Fatih Suriçi bölgesinde inşa ettiğimiz ve teslim ettiğimiz projelerimizin kesin sokak adresleri ve koordinatları.
          </p>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        {/* Status Filter */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tümü ({projects.length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              statusFilter === 'completed'
                ? 'bg-blue-600 text-white font-black shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tamamlanan ({projects.filter((p) => p.status === 'completed').length})
          </button>
          <button
            onClick={() => setStatusFilter('ongoing')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              statusFilter === 'ongoing'
                ? 'bg-emerald-600 text-white font-black shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Devam Eden ({projects.filter((p) => p.status === 'ongoing').length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Sokak veya mahalle ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
          />
        </div>
      </div>

      {/* Projects Grid (Focused purely on location & navigation) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between transition-all duration-300 group"
          >
            {/* Project Photo with Location Overlay */}
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
              <img
                src={project.featuredImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                {project.neighborhood || project.district}
              </div>
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase shadow-md flex items-center gap-1 ${
                    project.status === 'completed'
                      ? 'bg-blue-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  {project.status === 'completed' ? 'Teslim Edildi' : 'Devam Eden Şantiye'}
                </span>
              </div>
            </div>

            {/* Location Information Body */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider">
                  {project.district} · {project.neighborhood}
                </div>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                  {project.title}
                </h3>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold block">{project.address}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      Koordinat: {project.lat.toFixed(5)}, {project.lng.toFixed(5)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {/* 1. Google Maps Navigation Button */}
                <button
                  onClick={() => openGoogleMaps(project)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Haritalar'da Yol Tarifi Al</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </button>

                {/* 2. Copy Address & Map Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(project)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === project.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Adres Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Adresi Kopyala</span>
                      </>
                    )}
                  </button>

                  {setActiveTab && (
                    <button
                      onClick={() => setActiveTab('map')}
                      className="bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 font-bold py-2 px-3 rounded-xl text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      title="Harita Sayfasında Gör"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>Haritada Gör</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
