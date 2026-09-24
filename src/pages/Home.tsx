import React, { useState, useEffect, useRef } from 'react';
import { Project, IstanbulConstructionStats, CompanyInfo } from '../types';
import { KentselDonusumCalculator } from '../components/KentselDonusumCalculator';
import {
  Building2,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Sparkles,
  Bot,
  FileText,
  Phone,
  CheckCircle2,
  TrendingUp,
  Award,
  Compass,
  Layers,
  Sparkle,
} from 'lucide-react';

interface HomeProps {
  stats: IstanbulConstructionStats;
  projects: Project[];
  companyInfo: CompanyInfo;
  setActiveTab: (tab: string) => void;
  onSelectProject: (project: Project) => void;
  openAIConsultant: () => void;
}

export const Home: React.FC<HomeProps> = ({
  stats,
  projects,
  companyInfo,
  setActiveTab,
  onSelectProject,
  openAIConsultant,
}) => {
  const featuredProjects = projects.slice(0, 3);

  // 3D Gyroscope & Mouse Parallax Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hasGyro, setHasGyro] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Gyroscope Device Orientation Tilt Listener (Mobile)
  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId: number;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        setHasGyro(true);
        // Clamp angles: gamma (-45 to 45), beta (0 to 90)
        const g = Math.max(-35, Math.min(35, e.gamma));
        const b = Math.max(15, Math.min(75, e.beta)) - 45; // center around 45 deg tilt
        targetX = (g / 35) * 16; // +/- 16px max shift
        targetY = (b / 30) * 16;
      }
    };

    // Desktop Mouse Move Fallback
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetX = ((e.clientX - centerX) / (rect.width / 2)) * 14;
      targetY = ((e.clientY - centerY) / (rect.height / 2)) * 14;
    };

    // Smooth Lerp loop for buttery 60fps 3D motion
    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setTilt({
        x: Math.round(currentX * 100) / 100,
        y: Math.round(currentY * 100) / 100,
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="space-y-10 pb-10 select-none">
      
      {/* 1. HERO SECTION WITH 3D GYROSCOPIC SPATIAL PARALLAX */}
      <section
        ref={heroRef}
        className="relative bg-slate-950 text-white min-h-[500px] md:min-h-[540px] flex items-center overflow-hidden perspective-[1200px]"
      >
        {/* Deep 3D Parallax Architectural Background Image */}
        <div
          className="absolute -inset-8 z-0 transition-transform duration-75 ease-out will-change-transform pointer-events-none"
          style={{
            transform: `translate3d(${-tilt.x * 1.8}px, ${-tilt.y * 1.8}px, 0) scale(1.08) rotateY(${-tilt.x * 0.25}deg) rotateX(${tilt.y * 0.25}deg)`,
          }}
        >
          <img
            src={projects[0]?.gallery[0] || '/src/assets/images/hero_istanbul_architecture_1790192956199.jpg'}
            alt="AB Yapı Kentsel Dönüşüm Mimari"
            className="w-full h-full object-cover object-center filter brightness-75 contrast-110 saturate-105"
          />
          {/* Spatial Vignette & Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/90" />
        </div>

        {/* Floating Ambient 3D Light Layer */}
        <div
          className="absolute -inset-10 z-1 pointer-events-none transition-transform duration-100 ease-out opacity-60"
          style={{
            transform: `translate3d(${tilt.x * 2.2}px, ${tilt.y * 2.2}px, 0)`,
          }}
        >
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Foreground Content with Counter-Parallax */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 w-full transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${tilt.x * 0.6}px, ${tilt.y * 0.6}px, 0)`,
          }}
        >
          <div className="max-w-2xl space-y-5">
            
            {/* Top Pill with 3D Depth */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/80 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/40 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Fatih Suriçi Kentsel Dönüşüm & İnşaat</span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-5.5xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              İstanbul'un Geleceğine{' '}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
                Güvene Yükselen
              </span>{' '}
              Sağlam Yapılar
            </h1>

            {/* Hero Subtitle */}
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl drop-shadow-sm">
              6306 sayılı kanun kapsamında Fatih Suriçi bölgesinde depreme tam dayanıklı, modern mimarili ve zamanında teslim garantili yaşam alanları inşa ediyoruz.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('projects')}
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2 text-xs md:text-sm cursor-pointer active:scale-95"
              >
                <span>Projelerimiz ({projects.length} Eser)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('map')}
                className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 backdrop-blur-md font-bold px-5 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-xs md:text-sm cursor-pointer shadow-lg active:scale-95"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>İnteraktif Proje Haritası</span>
              </button>

              <button
                onClick={openAIConsultant}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold px-4 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-xs md:text-sm cursor-pointer active:scale-95"
              >
                <Bot className="w-4 h-4 text-amber-300" />
                <span>AI Dönüşüm Danışmanı</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPACT OFFICIAL STATS & BENEFITS BAR (4 Sleek Cards) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          
          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-black shrink-0">
              ₺
            </div>
            <div>
              <div className="text-lg md:text-xl font-black text-slate-900 font-outfit">
                ₺1.850.000
              </div>
              <p className="text-[11px] font-semibold text-slate-500 leading-tight">
                Yarısı Bizden Hibe + Kredi
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg md:text-xl font-black text-slate-900 font-outfit">
                21+ Proje
              </div>
              <p className="text-[11px] font-semibold text-slate-500 leading-tight">
                Fatih Suriçi Tamamlanan
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg md:text-xl font-black text-slate-900 font-outfit">
                ₺7.000 / Ay
              </div>
              <p className="text-[11px] font-semibold text-slate-500 leading-tight">
                Devlet Kira Yardımı Desteği
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg md:text-xl font-black text-slate-900 font-outfit">
                %100 Güven
              </div>
              <p className="text-[11px] font-semibold text-slate-500 leading-tight">
                C40/50 Deprem Güvenliği
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURED PROJECTS (Clean 3-Card Grid) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-[11px] font-black uppercase text-amber-600 tracking-wider">
              Projelerimiz & Şantiyelerimiz
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-outfit">
              Fatih Suriçi Tamamlanan Eserlerimiz
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('projects')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Tüm Projeleri Gör ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={proj.featuredImage}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  {proj.neighborhood || proj.district}
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-600 text-white shadow-md">
                    ✓ Teslim Edildi
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{proj.address}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${proj.lat},${proj.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold py-2 px-3 rounded-xl text-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Yol Tarifi Al</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs transition-colors"
                    title="Haritada İncele"
                  >
                    Harita
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FAST URBAN TRANSFORMATION CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <KentselDonusumCalculator
          rentAssistanceTL={stats.rentAssistancePerMonthTL}
          whatsappNumber={companyInfo.whatsapp}
        />
      </section>

      {/* 5. COMPACT AI CONSULTANT & DIRECT CONTACT PROMPT */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-500/30">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Bot className="w-4 h-4" />
              <span>Yapay Zeka Destekli 6306 Kanun Danışmanı</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black font-outfit">
              Binanızın Kentsel Dönüşüm Şartlarını Öğrenin
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              %50+1 çoğunluk kararı, hibe ve kredi şartları ile güncel kira yardımları hakkında anında bilgi alın.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={openAIConsultant}
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-5 py-3 rounded-xl shadow-lg transition-transform active:scale-95 text-xs flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>AI Danışmanı Aç</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-xl border border-white/20 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>İletişime Geç</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
