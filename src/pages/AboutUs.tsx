import React, { useState } from 'react';
import { CompanyInfo } from '../types';
import { Logo } from '../components/Logo';
import { HISTORICAL_PROJECTS, HistoricalProject } from '../data/historicalProjects';
import {
  Building2,
  History,
  Target,
  Rocket,
  Star,
  ShieldCheck,
  Award,
  Users,
  MapPin,
  Sparkles,
  CheckCircle2,
  Search,
  Filter,
  Check,
  ExternalLink,
} from 'lucide-react';

interface AboutProps {
  companyInfo: CompanyInfo;
  setActiveTab: (tab: string) => void;
}

export const AboutUs: React.FC<AboutProps> = ({ companyInfo, setActiveTab }) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const neighborhoods = ['Tümü', ...Array.from(new Set(HISTORICAL_PROJECTS.map((p) => p.neighborhood)))];

  const filteredProjects = HISTORICAL_PROJECTS.filter((proj) => {
    const matchesNeighborhood = selectedNeighborhood === 'Tümü' || proj.neighborhood === selectedNeighborhood;
    const matchesSearch =
      proj.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesNeighborhood && matchesSearch;
  });

  const handleCopyAddress = (proj: HistoricalProject) => {
    navigator.clipboard.writeText(proj.address);
    setCopiedId(proj.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Corporate Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-teal-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Kurumsal Profil & Köklü Geçmiş</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-outfit tracking-tight">
            Yarım Asrı Aşan Güven Mirası
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            1960’lardan bugüne İstanbul’un tarihi suriçi dokusundan modern kentsel dönüşüm alanlarına uzanan 3 kuşaklık inşaat ve yapım tecrübesi.
          </p>
        </div>

        {/* Corporate Brand Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 space-y-3 relative z-10">
          <Logo variant="light" size="xl" logoUrl={companyInfo.logoUrl} />
          <div className="text-xs text-teal-300 font-semibold uppercase tracking-widest pt-1">
            Alpaslan Beyoğlu Yapı Ltd. Şti.
          </div>
        </div>
      </div>

      {/* Main History & Mission/Vision Grid (Matching Authentic Document) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Biz Kimiz? Şirket Tarihçemiz (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-md border border-slate-200/80 space-y-6 relative">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0 shadow-sm">
              <History className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase text-teal-600 tracking-wider">
                Gelenekten Geleceğe
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-outfit">
                BİZ KİMİZ? ŞİRKET TARİHÇEMİZ
              </h2>
            </div>
          </div>

          <div className="space-y-5 text-slate-700 text-sm md:text-base leading-relaxed font-normal">
            <p>
              <strong className="text-slate-900 font-semibold">1960'lı yıllarda</strong> kurucumuz <strong className="text-slate-900 font-semibold">Emin Ahmetbeyoğlu</strong>'nun vizyonuyla temelleri atılan inşaat serüvenimiz, yarım asrı aşan tecrübesiyle sektördeki köklü yürüyüşünü sürdürmektedir. İkinci kuşak temsilcilerimiz <strong className="text-slate-900 font-semibold">Faruk Ahmetbeyoğlu</strong> ve aile büyüklerimizin öncülüğünde; <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded font-medium border border-amber-200/60">Laleli, Fatih, Kocamustafapaşa, Silivrikapı, Samatya ve Yedikule</span> gibi İstanbul'un tarihi suriçi bölgelerinde onlarca nitelikli projeye imza atarak şehrin dokusuna kalıcı değerler kattık.
            </p>

            <p>
              <strong className="text-slate-900 font-semibold">2010'lu yıllarda</strong> piyasa dinamiklerindeki değişimleri doğru okuyarak kurumsal yatırımlarımızı sağlık ve tarım gibi stratejik sektörlere de yönlendirdik ve vizyonumuzu daha da genişlettik. Bugün ise edindiğimiz bu çok yönlü kurumsal tecrübe ve artan sektörel talepler doğrultusunda, <strong className="text-teal-800 font-semibold">üçüncü nesil</strong> olarak inşaat markamızı çağın gereksinimlerine uygun, dinamik ve yenilikçi bir altyapıyla yeniden yapılandırıyoruz.
            </p>

            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-1">
              <p className="text-slate-200 text-sm italic font-medium leading-relaxed">
                "Geçmişten aldığımız güven mirasını, geleceğin teknolojileriyle harmanlayarak kaldığımız yerden, daha güçlü bir şekilde üretmeye devam ediyoruz."
              </p>
            </div>
          </div>

          {/* Suriçi Highlights Badges */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>Tarihi Suriçi ve Odak Hizmet Bölgelerimiz</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <span className="px-3 py-1 bg-slate-100 rounded-lg">Laleli</span>
              <span className="px-3 py-1 bg-slate-100 rounded-lg">Fatih</span>
              <span className="px-3 py-1 bg-slate-100 rounded-lg">Kocamustafapaşa</span>
              <span className="px-3 py-1 bg-slate-100 rounded-lg">Silivrikapı</span>
              <span className="px-3 py-1 bg-slate-100 rounded-lg">Samatya</span>
              <span className="px-3 py-1 bg-slate-100 rounded-lg">Yedikule</span>
              <span className="px-3 py-1 bg-amber-50 text-amber-900 font-bold rounded-lg border border-amber-200/80">Cerrahpaşa</span>
              <span className="px-3 py-1 bg-amber-50 text-amber-900 font-bold rounded-lg border border-amber-200/80">Aksaray</span>
              <span className="px-3 py-1 bg-amber-50 text-amber-900 font-bold rounded-lg border border-amber-200/80">Haseki Sultan</span>
              <span className="px-3 py-1 bg-amber-50 text-amber-900 font-bold rounded-lg border border-amber-200/80">Seyyid Ömer</span>
              <span className="px-3 py-1 bg-amber-50 text-amber-900 font-bold rounded-lg border border-amber-200/80">Sümbül Efendi</span>
            </div>
          </div>
        </div>

        {/* Right Column: Misyon, Vizyon, Yüksek Mühendislik (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Misyonumuz Card */}
          <div className="bg-white p-7 rounded-3xl shadow-md border-2 border-purple-200/80 hover:border-purple-300 transition-all space-y-3 relative overflow-hidden group">
            <div className="w-1.5 h-full bg-purple-600 absolute left-0 top-0 bottom-0" />
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">
                🎯 MİSYONUMUZ
              </h3>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed pl-1">
              Köklerimizden aldığımız tecrübeyi modern yapı standartlarımızla birleştirerek; insan odaklı, yapısal güvenliği merkeze alan ve yaşam standartlarını daima yukarı taşıyan projeler üretmektir.
            </p>
          </div>

          {/* Vizyonumuz Card */}
          <div className="bg-white p-7 rounded-3xl shadow-md border-2 border-indigo-200/80 hover:border-indigo-300 transition-all space-y-3 relative overflow-hidden group">
            <div className="w-1.5 h-full bg-indigo-600 absolute left-0 top-0 bottom-0" />
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight">
                🚀 VİZYONUMUZ
              </h3>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed pl-1">
              Geleneksel inşaat kültürümüzü günümüzün ileri yapı standartlarıyla birleştirerek, hak sahiplerimiz için yüksek kaliteli, sağlam, depreme dayanıklı ve huzurlu yaşam alanları inşa eden güvenilir ve köklü bir marka olmaktır.
            </p>
          </div>

          {/* Yüksek Yapı Standartları & Kalite Güvencesi Card */}
          <div className="bg-slate-50 p-7 rounded-3xl shadow-sm border border-slate-200 space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <h4 className="text-base md:text-lg font-extrabold text-slate-900 font-outfit">
                Yüksek Yapı & Kalite Güvencesi
              </h4>
            </div>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Projelerimiz, yürürlükteki en güncel deprem ve inşaat yönetmeliklerine tam uyumlu olarak 1. sınıf standartlarda inşa edilir.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-teal-800">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>TBDY 2018 Deprem Yönetmeliği'ne %100 Statik Uyum</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Section: Son 40 Yılda Ürettiklerimiz (Historical Suriçi/Fatih Portfolio) */}
      <section className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200/90 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200">
              <History className="w-3.5 h-3.5 text-amber-600" />
              <span>Tarihi Suriçi Yapı Mirasımız</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 font-outfit">
              📍 SON 40 YILDA ÜRETTİKLERİMİZ
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Emin ve Faruk Ahmetbeyoğlu öncülüğünde İstanbul Fatih Suriçi bölgesinde (Cerrahpaşa, Kocamustafapaşa, Silivrikapı, Aksaray, Haseki Sultan, Seyyid Ömer, Sümbül Efendi) başarıyla tamamlanan yapılardan örnek adreslerimiz.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-2xl text-center shrink-0 border border-slate-800">
            <div className="text-2xl md:text-3xl font-black text-amber-400 font-outfit">
              {HISTORICAL_PROJECTS.length}+
            </div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-300">
              Kayıtlı Suriçi Yapısı
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Neighborhood Pill Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {neighborhoods.map((nh) => (
              <button
                key={nh}
                onClick={() => setSelectedNeighborhood(nh)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedNeighborhood === nh
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {nh}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Sokak veya mahalle ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
        </div>

        {/* Interactive Address Grid (Matching exact style of uploaded reference pin badges) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleCopyAddress(proj)}
              className="bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 rounded-2xl p-3.5 transition-all cursor-pointer group flex items-start gap-2.5 shadow-xs hover:shadow-md relative"
              title="Adresi kopyalamak için tıklayın"
            >
              <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4 fill-red-500 text-white" />
              </div>
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-xs font-bold text-slate-800 group-hover:text-teal-900 leading-snug break-words">
                  {proj.address}
                </p>
                <div className="text-[10px] text-slate-500 font-medium">
                  {proj.neighborhood} • {proj.district}
                </div>
              </div>
              {copiedId === proj.id ? (
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold animate-pulse shrink-0">
                  Kopyalandı!
                </span>
              ) : null}
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
            Arama kriterlerine uygun tamamlanan proje adresi bulunamadı.
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <span>
            * Listelenen tüm yapılar <strong>AB Yapı / Ahmetbeyoğlu Ailesi</strong> güvencesiyle inşa edilip teslim edilmiştir.
          </span>
          <button
            onClick={() => setActiveTab('map')}
            className="text-teal-700 hover:text-teal-800 font-bold inline-flex items-center gap-1.5 self-end sm:self-auto"
          >
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Haritada Proje Konumlarını Göster</span>
          </button>
        </div>
      </section>

      {/* Core Engineering & Work Principles */}
      <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase text-teal-400 tracking-wider">
            Kurumsal Güvence Şeffaflığı
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-outfit">
            3 Kuşaklık Tecrübe İle İnşaat Standartlarımız
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-lg">C40/50 Beton & Radye Temel</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              En güncel Türkiye Deprem Yönetmeliği'ne (TBDY 2018) tam uyumlu, statik mühendislik onaylı projeler.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-lg">Zamanında Teslim Garantisi</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Resmi kat paylaşım sözleşmelerinde taahhüt edilen teslim süresi ve şeffaf şantiye takip modeli.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-lg">Şeffaf Hak Sahipliği</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              6306 sayılı kanun kapsamında kat maliklerine adil, net ve dürüst sözleşme şartları.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('contact')}
            className="bg-teal-600 hover:bg-teal-500 text-white font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>Kentsel Dönüşüm & Proje Görüşmesi İçin İletişime Geçin</span>
          </button>
        </div>
      </div>
    </div>
  );
};
