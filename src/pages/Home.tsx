import React, { useState, useEffect, useRef } from 'react';
import { Project, IstanbulConstructionStats, CompanyInfo } from '../types';
import { KentselDonusumCalculator } from '../components/KentselDonusumCalculator';
import { useLanguage } from '../context/LanguageContext';
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
  const { t, language } = useLanguage();

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
        // Clamp angles: gamma (-35 to 45), beta (0 to 90)
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
              <span>{t('hero.badge')}</span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-5.5xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {t('hero.title')}
            </h1>

            {/* Hero Subtitle */}
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl drop-shadow-sm">
              {t('hero.desc')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('projects')}
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2 text-xs md:text-sm cursor-pointer active:scale-95"
              >
                <span>{t('hero.btnProjects')} ({projects.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('map')}
                className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 backdrop-blur-md font-bold px-5 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-xs md:text-sm cursor-pointer shadow-lg active:scale-95"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{t('hero.btnMap')}</span>
              </button>

              <button
                onClick={openAIConsultant}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold px-4 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-xs md:text-sm cursor-pointer active:scale-95"
              >
                <Bot className="w-4 h-4 text-amber-300" />
                <span>{t('hero.btnAI')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPACT OFFICIAL STATS & BENEFITS BAR (4 Sleek Cards) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8" aria-labelledby="home-stats-heading">
        <h2 id="home-stats-heading" className="sr-only">
          {language === 'tr' ? 'Fatih Kentsel Dönüşüm Destekleri ve Güvence Özeti' : language === 'ar' ? 'ملخص دعم وضمانات التحول الحضري' : 'Fatih Urban Transformation Support and Assurance Summary'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          
          <div className="bg-white rounded-xl p-3 md:p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-black shrink-0">
              ₺
            </div>
            <div>
              <div className="text-sm md:text-md font-black text-slate-900 font-outfit">
                ₺1.875.000
              </div>
              <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                {t('stats.halfUs')}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 md:p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm md:text-md font-black text-slate-900 font-outfit">
                21+ Proje
              </div>
              <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                {t('stats.totalProjects')}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 md:p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm md:text-md font-black text-slate-900 font-outfit">
                {language === 'tr' ? 'Resmi Destekler' : language === 'ar' ? 'الدعم الرسمي' : 'Official Support'}
              </div>
              <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                {t('stats.rentAssistance')}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 md:p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm md:text-md font-black text-slate-900 font-outfit">
                {t('stats.safetyTitle')}
              </div>
              <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                {t('stats.safety')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SERVICES & TECHNICAL STANDARDS SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 md:px-8" aria-labelledby="home-standards-heading">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">
                {language === 'tr' ? 'Kurumsal Müteahhitlik & Mühendislik' : language === 'ar' ? 'المقاولات المؤسسية والهندسة' : 'Corporate Contracting & Engineering'}
              </span>
              <h2 id="home-standards-heading" className="text-xl md:text-2xl font-black text-slate-900 font-outfit">
                {language === 'tr'
                  ? 'Fatih Kentsel Dönüşüm Hizmetlerimiz ve Teknik Standartlarımız'
                  : language === 'ar'
                  ? 'خدمات التحول الحضري في الفاتح ومعاييرنا الفنية'
                  : 'Fatih Urban Transformation Services & Technical Standards'}
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('about')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>{language === 'tr' ? 'Tüm Standartları İncele' : language === 'ar' ? 'عرض جميع المعايير' : 'View All Standards'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-teal-600/10 text-teal-700 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-sm md:text-base font-extrabold text-slate-900 font-outfit">
                {language === 'tr'
                  ? '6306 Sayılı Kanun & Kat Karşılığı İnşaat'
                  : language === 'ar'
                  ? 'القانون رقم 6306 والبناء بنظام الشراكة'
                  : 'Law No. 6306 & Land-Share Construction'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'tr'
                  ? 'Fatih genelinde %50+1 salt çoğunluk kararından riskli yapı tespitine kadar şeffaf kat paylaşım sözleşmeleriyle güvenli dönüşüm.'
                  : language === 'ar'
                  ? 'تحول آمن في الفاتح بعقود تقاسم واضحة بدءاً من قرار الأغلبية ٥٠٪+١ وحتى فحص المباني.'
                  : 'Transparent land-share agreements across Fatih from 50%+1 majority decisions to licensed structural risk assessments.'}
              </p>
            </article>

            <article className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-sm md:text-base font-extrabold text-slate-900 font-outfit">
                {language === 'tr'
                  ? 'Anahtar Teslim Müteahhitlik'
                  : language === 'ar'
                  ? 'مقاولات تسليم المفتاح'
                  : 'Turnkey General Contracting'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'tr'
                  ? 'Ruhsat, yıkım, kaba ve ince inşaat ile iskan süreçlerini kapsayan, sözleşme takvimine sadık zamanında teslim garantisi.'
                  : language === 'ar'
                  ? 'إدارة كاملة للتراخيص والهدم والبناء حتى تسليم السكن في الموعد المحدد.'
                  : 'End-to-end management covering permits, demolition, structural and finishing works with on-time delivery assurance.'}
              </p>
            </article>

            <article className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm md:text-base font-extrabold text-slate-900 font-outfit">
                {language === 'tr'
                  ? 'C30+ Beton, Radye Temel & 1. Sınıf Malzeme'
                  : language === 'ar'
                  ? 'خرسانة C30+ وأساس حصيري ومواد درجة أولى'
                  : 'C30+ Concrete, Raft Foundation & 1st Class Material'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'tr'
                  ? 'Zemin etüdü ve statik projeye uygun minimum C30 ve üzeri beton sınıfı, radye jeneral temel ve 1. sınıf malzeme taahhüdü.'
                  : language === 'ar'
                  ? 'خرسانة C30 وما فوق حسب الدراسة الإنشائية، أساس حصيري مقاوم للزلازل، والتزام بمواد البناء من الدرجة الأولى.'
                  : 'Project-specific C30 and higher concrete grades, raft foundation engineering under TBDY 2018, and 1st class certified materials.'}
              </p>
            </article>
          </div>
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
              <span>{t('hero.btnAI')}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-outfit">
              {language === 'tr' ? 'Binanızın Kentsel Dönüşüm Şartlarını Öğrenin' : language === 'ar' ? 'تعرف على شروط التحول الحضري لمبناك' : 'Learn the Urban Transformation Conditions of Your Building'}
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              {language === 'tr' ? '%50+1 çoğunluk kararı, hibe ve kredi şartları ile resmi dönüşüm süreçleri hakkında anında bilgi alın.' : language === 'ar' ? 'احصل على معلومات فورية حول قرار الأغلبية ٥٠٪+١، وشروط المنح والقروض وإجراءات التحول الرسمية.' : 'Get instant information about the 50%+1 majority decision, grant and loan conditions, and official transformation procedures.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={openAIConsultant}
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-5 py-3 rounded-xl shadow-lg transition-transform active:scale-95 text-xs flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{t('hero.btnAI')}</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-xl border border-white/20 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t('nav.contact')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
