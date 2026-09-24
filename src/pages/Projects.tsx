import React, { useState } from 'react';
import { Project } from '../types';
import { HISTORICAL_PROJECTS, HistoricalProject } from '../data/historicalProjects';
import {
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
  X,
  MessageSquare,
  History,
  Search,
} from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  whatsappNumber: string;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  selectedProject,
  setSelectedProject,
  whatsappNumber,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'completed' | 'surici'>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('Tümü');
  const [suriciSearch, setSuriciSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const districts = ['Tümü', ...Array.from(new Set(projects.map((p) => p.district)))];

  const filteredProjects = projects.filter((p) => {
    const matchesStatus =
      statusFilter === 'all' ||
      statusFilter === 'surici' ||
      p.status === statusFilter;
    const matchesDistrict = districtFilter === 'Tümü' || p.district === districtFilter;
    return matchesStatus && matchesDistrict;
  });

  const filteredSurici = HISTORICAL_PROJECTS.filter((p) =>
    p.address.toLowerCase().includes(suriciSearch.toLowerCase()) ||
    p.neighborhood.toLowerCase().includes(suriciSearch.toLowerCase())
  );

  const handleCopy = (proj: HistoricalProject) => {
    navigator.clipboard.writeText(proj.address);
    setCopiedId(proj.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formattedWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">
      {/* Page Title Header */}
      <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>Mimaride AB Yapı İmzası</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-outfit tracking-tight">
            Devam Eden ve Tamamlanan Projelerimiz
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            İstanbul'un en değerli semtlerinde radye temel, C40 beton kalitesi ve modern mimari ile yükselen kentsel dönüşüm ve konut projelerimizi inceleyin.
          </p>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-4 md:p-5 rounded-2xl shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        {/* Status Segmented Control */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              statusFilter === 'all'
                ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tüm Projeler ({projects.length})
          </button>
          <button
            onClick={() => setStatusFilter('ongoing')}
            className={`px-4 py-2 rounded-lg transition-all ${
              statusFilter === 'ongoing'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Devam Edenler ({projects.filter((p) => p.status === 'ongoing').length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-all ${
              statusFilter === 'completed'
                ? 'bg-teal-700 text-white font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Teslim Edilenler ({projects.filter((p) => p.status === 'completed').length})
          </button>
          <button
            onClick={() => setStatusFilter('surici')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              statusFilter === 'surici'
                ? 'bg-slate-900 text-amber-400 font-extrabold shadow-sm'
                : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Suriçi Eserlerimiz ({HISTORICAL_PROJECTS.length})</span>
          </button>
        </div>

        {/* District Select Filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700">İlçe Filtresi:</span>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-600"
          >
            {districts.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modern Active Projects Grid */}
      {statusFilter !== 'surici' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl border border-slate-200 overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={project.featuredImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md">
                  {project.district} · {project.type}
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black shadow-md uppercase ${
                      project.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : project.status === 'ongoing'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {project.status === 'completed'
                      ? '✓ Teslim Edildi'
                      : project.status === 'ongoing'
                      ? `%${project.progress} Tamamlandı`
                      : 'Planlanan'}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-teal-700">{project.neighborhood}</div>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-teal-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.status === 'ongoing' && (
                  <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="flex justify-between text-[11px] font-bold text-slate-700">
                      <span>İnşaat İlerlemesi</span>
                      <span className="text-amber-600">%{project.progress}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap gap-1">
                  {project.features.slice(0, 3).map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>

                {(project.deliveryDate || project.totalUnits) && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                    {project.deliveryDate && <span>Teslim: <strong className="text-slate-900">{project.deliveryDate}</strong></span>}
                    {project.totalUnits && <span>{project.totalUnits} Bağımsız Bölüm</span>}
                  </div>
                )}

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full bg-slate-900 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Detaylı Proje & Galeri İncele</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suriçi / Fatih Historical Address Showcase Section */}
      <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-amber-700 tracking-wider">
              <History className="w-4 h-4 text-amber-600" />
              <span>Tarihi Suriçi Mirasımız</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-outfit">
              Son 40 Yılda Suriçi / Fatih'te Ürettiğimiz {HISTORICAL_PROJECTS.length} Adres
            </h2>
            <p className="text-xs text-slate-600">
              Cerrahpaşa, Kocamustafapaşa, Aksaray, Haseki Sultan, Seyyid Ömer, Sümbül Efendi ve Silivrikapı sokaklarındaki yapılarımız.
            </p>
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Adres ara..."
              value={suriciSearch}
              onChange={(e) => setSuriciSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredSurici.map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleCopy(proj)}
              className="bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 rounded-2xl p-3 transition-all cursor-pointer group flex items-start gap-2.5 shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4 fill-red-500 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 group-hover:text-amber-950 leading-snug break-words">
                  {proj.address}
                </p>
                <span className="text-[10px] text-slate-500 font-medium">
                  {proj.neighborhood}
                </span>
              </div>
              {copiedId === proj.id && (
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold shrink-0">
                  Kopyalandı!
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="sticky top-0 z-20 bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-teal-400 uppercase">
                  {selectedProject.district} · {selectedProject.type}
                </span>
                <h3 className="font-extrabold text-xl">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedProject.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${selectedProject.title} Görsel ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-2xl shadow-sm border border-slate-200"
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="font-bold text-slate-900 text-lg">Proje Hakkında</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">Teknik ve Mimari Özellikler:</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {selectedProject.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                  <h5 className="font-bold text-slate-900 text-sm border-b pb-2">Proje Bilgi Kartı</h5>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-400 font-medium block">Adres:</span>
                      <span className="font-bold text-slate-800">{selectedProject.address}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">Durum:</span>
                      <span className="font-bold text-emerald-700">✓ Teslim Edildi (%100)</span>
                    </div>
                    {selectedProject.architectureStyle && (
                      <div>
                        <span className="text-slate-400 font-medium block">Mimari Üslup:</span>
                        <span className="font-bold text-slate-800">{selectedProject.architectureStyle}</span>
                      </div>
                    )}
                    {selectedProject.architect && (
                      <div>
                        <span className="text-slate-400 font-medium block">Mimar / Tasarım:</span>
                        <span className="font-bold text-slate-800">{selectedProject.architect}</span>
                      </div>
                    )}
                    {(selectedProject.startDate || selectedProject.deliveryDate) && (
                      <div>
                        <span className="text-slate-400 font-medium block">Tarih Bilgisi:</span>
                        <span className="font-bold text-slate-800">
                          {selectedProject.startDate ? `${selectedProject.startDate} — ` : ''}{selectedProject.deliveryDate || ''}
                        </span>
                      </div>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/${formattedWhatsapp}?text=Merhaba%2C%20${encodeURIComponent(selectedProject.title)}%20projeniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                    <span>WhatsApp İle Bilgi Al</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
