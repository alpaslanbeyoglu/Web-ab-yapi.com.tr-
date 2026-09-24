import React from 'react';
import { Project, IstanbulConstructionStats, CompanyInfo } from '../types';
import { IstanbulMap } from '../components/IstanbulMap';
import { KentselDonusumCalculator } from '../components/KentselDonusumCalculator';
import { MobileQuickGuide } from '../components/MobileQuickGuide';
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
  Users
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
  const featuredProjects = projects.filter((p) => p.isFeatured || p.status === 'ongoing').slice(0, 3);
  const formattedWhatsapp = companyInfo.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden">
        {/* Hero Background Image with Scrim Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={projects[0]?.gallery[0] || '/src/assets/images/hero_istanbul_architecture_1790192956199.jpg'}
            alt="AB Yapı İstanbul Kentsel Dönüşüm"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-400/30 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Kentsel Dönüşüm & Güvenli Yapı Hizmetleri</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-outfit tracking-tight leading-tight text-white drop-shadow-sm">
              İstanbul'un Geleceğine <span className="text-teal-400">Güvene Yükselen</span> Çağdaş Yapılar
            </h1>

            <p className="text-base md:text-lg text-slate-200 leading-relaxed max-w-xl">
              AB Yapı olarak 6306 sayılı Kentsel Dönüşüm Kanunu kapsamında İstanbul'un değerli lokasyonlarında yüksek deprem güvenlikli, estetik ve zamanında teslim garantili yaşam alanları inşa ediyoruz.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('projects')}
                className="bg-teal-600 hover:bg-teal-500 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm"
              >
                <span>Proje & Eserlerimiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openAIConsultant}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold px-5 py-3.5 rounded-xl transition-all flex items-center gap-2 text-sm"
              >
                <Bot className="w-4 h-4 text-teal-300" />
                <span>AI Dönüşüm Danışmanı</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Dedicated Summary Guide (Mobil Özel Hızlı Rehber) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-6">
        <MobileQuickGuide
          companyInfo={companyInfo}
          projects={projects}
          rentAssistanceTL={stats.rentAssistancePerMonthTL}
          setActiveTab={setActiveTab}
          onSelectProject={onSelectProject}
        />
      </section>

      {/* Official Government Kentsel Dönüşüm Statistics Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-4">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-4">
          <div className="text-center">
            <span className="text-[11px] font-extrabold text-teal-700 uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Çevre, Şehircilik ve İklim Değişikliği Bakanlığı & Resmi Devlet Verileri
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pt-2">
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-black text-amber-600 font-outfit">
                ₺1.850.000
              </div>
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Yarısı Bizden Destek Paketi (Hibe+Kredi)
              </div>
            </div>
            <div className="space-y-1 border-l border-slate-200">
              <div className="text-2xl md:text-3xl font-black text-teal-700 font-outfit">
                {stats.totalRenewedUnits.toLocaleString('tr-TR')}+
              </div>
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Resmi Yenilenen Bölüm
              </div>
            </div>
            <div className="space-y-1 border-l border-slate-200">
              <div className="text-2xl md:text-3xl font-black text-slate-900 font-outfit">
                1.500.000
              </div>
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Bakanlık Dönüşüm Hedefi
              </div>
            </div>
            <div className="space-y-1 border-l border-slate-200">
              <div className="text-2xl md:text-3xl font-black text-emerald-600 font-outfit">
                ₺{(stats.rentAssistancePerMonthTL || 7000).toLocaleString('tr-TR')} / Ay
              </div>
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Aylık Devlet Kira Desteği
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Explanation Breakdown Card for Official Stats */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 space-y-6 text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold uppercase tracking-wider text-xs border-b border-slate-800 pb-3">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Resmi Veri Açıklamaları & Devlet Teşvik Şartları</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1.850.000 TL Content Breakdown */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="font-extrabold text-amber-400 text-sm flex items-center justify-between">
                <span>1.850.000 ₺ Paketin İçeriği</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">Yarısı Bizden</span>
              </div>
              <ul className="text-slate-300 space-y-1.5 leading-relaxed">
                <li>• <strong>875.000 ₺ Karşılıksız Hibe:</strong> Geri ödemesiz doğrudan devlet nakit katkısı.</li>
                <li>• <strong>875.000 ₺ Uygun Kredi:</strong> 10 yıl vadeli, ilk 1 yıl ödemesiz düşük faizli konut yapım kredisi.</li>
                <li>• <strong>100.000 ₺ Taşınma Desteği:</strong> Hak sahiplerine verilen tek seferlik taşınma yardımı.</li>
              </ul>
            </div>

            {/* 890.000 Source Citation */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="font-extrabold text-teal-400 text-sm flex items-center justify-between">
                <span>890.000+ Bölüm Kaynağı</span>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">Resmi Kaynak</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Çevre, Şehircilik ve İklim Değişikliği Bakanlığı & Kentsel Dönüşüm Başkanlığı</strong> resmi verilerine dayanmaktadır. 6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkındaki Kanun kapsamında İstanbul genelinde günümüze kadar yenilenen bağımsız bölüm sayısıdır.
              </p>
            </div>

            {/* Rent Support Amount and Conditions */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="font-extrabold text-emerald-400 text-sm flex items-center justify-between">
                <span>Kira Desteği & Şartları</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">7.000 ₺ / Ay</span>
              </div>
              <ul className="text-slate-300 space-y-1.5 leading-relaxed">
                <li>• <strong>Destek Miktarı:</strong> İstanbul için aylık <strong>7.000 ₺</strong> (18 Ay boyunca ödenir).</li>
                <li>• <strong>Şart 1:</strong> Binanın yetkili kurumlarca <strong>"Riskli Yapı Raporu"</strong> almış olması.</li>
                <li>• <strong>Şart 2:</strong> Binanın tahliye edilip yıkım sürecine girmesi.</li>
                <li>• <strong>Şart 3:</strong> e-Devlet veya İstatistiki idare üzerinden kira yardımı başvurusu yapılması.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Urban Transformation Simulator */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <KentselDonusumCalculator
          rentAssistanceTL={stats.rentAssistancePerMonthTL}
          whatsappNumber={companyInfo.whatsapp}
        />
      </section>

      {/* Featured Projects Catalogue Preview */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase text-amber-600 tracking-wider">
            Öne Çıkan Projelerimiz
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-outfit">
            Tamamlanan ve Devam Eden Kentsel Dönüşüm Yapılarımız
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={proj.featuredImage}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md">
                  {proj.district} / {proj.type}
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                      proj.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-slate-950 font-black'
                    }`}
                  >
                    {proj.status === 'completed' ? '✓ Teslim Edildi' : `%${proj.progress} Tamamlandı`}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-teal-700 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {(proj.deliveryDate || proj.totalUnits) && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
                    {proj.deliveryDate && <span>Teslim: <strong className="text-slate-900">{proj.deliveryDate}</strong></span>}
                    {proj.totalUnits && <span>{proj.totalUnits} Bağımsız Bölüm</span>}
                  </div>
                )}

                <button
                  onClick={() => onSelectProject(proj)}
                  className="w-full mt-2 bg-slate-100 hover:bg-teal-700 hover:text-white text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Proje İncele & Kat Planı</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistant Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-teal-700/40">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider">
              <Bot className="w-4 h-4 text-teal-400" />
              <span>Yapay Zeka Destekli Mevzuat Asistanı</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold font-outfit">
              6306 Sayılı Kanun Hakkında Aklınıza Takılanı Sorun
            </h3>
            <p className="text-xs md:text-sm text-teal-100/90 leading-relaxed">
              %50+1 çoğunluk kararı, tahliye süreleri, devlet kira yardımı miktarı veya anlaşmayan maliklerin hisse satışı durumları hakkında anında resmi mevzuat yanıtları alın.
            </p>
          </div>

          <button
            onClick={openAIConsultant}
            className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold px-6 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <Sparkles className="w-5 h-5 text-teal-900" />
            <span>AI Mevzuat Danışmanını Başlat</span>
          </button>
        </div>
      </section>
    </div>
  );
};
