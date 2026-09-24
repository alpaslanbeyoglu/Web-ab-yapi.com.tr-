import React, { useState } from 'react';
import { CompanyInfo } from '../types';
import { Logo } from '../components/Logo';
import { HISTORICAL_PROJECTS, HistoricalProject } from '../data/historicalProjects';
import { useLanguage } from '../context/LanguageContext';
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
} from 'lucide-react';

interface AboutProps {
  companyInfo: CompanyInfo;
  setActiveTab: (tab: string) => void;
}

export const AboutUs: React.FC<AboutProps> = ({ companyInfo, setActiveTab }) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { language } = useLanguage();

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

  // Dedicated component translations to ensure 100% translations in TR, EN and AR
  const pageTranslations = {
    tr: {
      badge: 'Kurumsal Profil & Köklü Geçmiş',
      title: 'Yarım Asrı Aşan Güven Mirası',
      desc: '1960’lardan bugüne İstanbul’un tarihi Fatih dokusundan modern kentsel dönüşüm alanlarına uzanan 3 kuşaklık inşaat ve yapım tecrübesi.',
      historyTitle: 'BİZ KİMİZ? ŞİRKET TARİHÇEMİZ',
      historySub: 'Gelenekten Geleceğe',
      historyP1: "1960'lı yıllarda kurucumuz Emin Ahmetbeyoğlu'nun vizyonuyla temelleri atılan inşaat serüvenimiz, yarım asrı aşan tecrübesiyle sektördeki köklü yürüyüşünü sürdürmektedir. İkinci kuşak temsilcilerimiz Faruk Ahmetbeyoğlu ve aile büyüklerimizin öncülüğünde; Laleli, Fatih, Kocamustafapaşa, Silivrikapı, Samatya ve Yedikule gibi İstanbul'un tarihi Fatih bölgelerinde onlarca nitelikli projeye imza atarak şehrin dokusuna kalıcı değerler kattık.",
      historyP2: "2010'lu yıllarda piyasa dinamiklerindeki değişimleri doğru okuyarak kurumsal yatırımlarımızı sağlık ve tarım gibi stratejik sektörlere de yönlendirdik ve vizyonumuzu daha da genişlettik. Bugün ise edindiğimiz bu çok yönlü kurumsal tecrübe ve artan sektörel talepler doğrultusunda, üçüncü nesil olarak inşaat markamızı çağın gereksinimlerine uygun, dinamik ve yenilikçi bir altyapıyla yeniden yapılandırıyoruz.",
      historyQuote: '"Geçmişten aldığımız güven mirasını, geleceğin teknolojileriyle harmanlayarak kaldığımız yerden, daha güçlü bir şekilde üretmeye devam ediyoruz."',
      focusRegions: 'Odak Hizmet Bölgelerimiz',
      missionTitle: 'MİSYONUMUZ',
      missionText: 'Köklerimizden aldığımız tecrübeyi modern yapı standartlarımızla birleştirerek; insan odaklı, yapısal güvenliği merkeze alan ve yaşam standartlarını daima yukarı taşıyan projeler üretmektir.',
      visionTitle: 'VİZYONUMUZ',
      visionText: 'Geleneksel inşaat kültürümüzü günümüzün ileri yapı standartlarıyla birleştirerek, hak sahiplerimiz için yüksek kaliteli, sağlam, depreme dayanıklı ve huzurlu yaşam alanları inşa eden güvenilir ve köklü bir marka olmaktır.',
      qualityTitle: 'Yüksek Yapı & Kalite Güvencesi',
      qualityText: 'Projelerimiz, yürürlükteki en güncel deprem ve inşaat yönetmeliklerine tam uyumlu olarak 1. sınıf standartlarda inşa edilir.',
      qualityCheck: 'TBDY 2018 Deprem Yönetmeliği\'ne %100 Statik Uyum',
      portfolioBadge: 'Tarihi Yapı Mirasımız',
      portfolioTitle: '📍 SON 40 YILDA ÜRETTİKLERİMİZ',
      portfolioDesc: 'Emin ve Faruk Ahmetbeyoğlu öncülüğünde İstanbul Fatih bölgesinde (Cerrahpaşa, Kocamustafapaşa, Silivrikapı, Aksaray, Haseki Sultan, Seyyid Ömer, Sümbül Efendi) başarıyla tamamlanan yapılardan örnek adreslerimiz.',
      portfolioCount: 'Kayıtlı Yapı Adresi',
      searchPlaceholder: 'Sokak veya mahalle ara...',
      copySuccess: 'Kopyalandı!',
      noResults: 'Arama kriterlerine uygun tamamlanan proje adresi bulunamadı.',
      portfolioNote: '* Listelenen tüm yapılar AB Yapı / Ahmetbeyoğlu Ailesi güvencesiyle inşa edilip teslim edilmiştir.',
      btnShowMap: 'Haritada Proje Konumlarını Göster',
      standardsBadge: 'Kurumsal Güvence Şeffaflığı',
      standardsTitle: '3 Kuşaklık Tecrübe İle İnşaat Standartlarımız',
      standard1Title: 'C40/50 Beton & Radye Temel',
      standard1Text: 'En güncel Türkiye Deprem Yönetmeliği\'ne (TBDY 2018) tam uyumlu, statik mühendislik onaylı projeler.',
      standard2Title: 'Zamanında Teslim Garantisi',
      standard2Text: 'Resmi kat paylaşım sözleşmelerinde taahhüt edilen teslim süresi ve şeffaf şantiye takip modeli.',
      standard3Title: 'Şeffaf Hak Sahipliği',
      standard3Text: '6306 sayılı kanun kapsamında kat maliklerine adil, net ve dürüst sözleşme şartları.',
      btnContact: 'Kentsel Dönüşüm & Proje Görüşmesi İçin İletişime Geçin',
    },
    en: {
      badge: 'Corporate Profile & Heritage',
      title: 'A Safe Legacy Over Half a Century',
      desc: '3 generations of construction and building experience from 1960 to the present, extending from the historical texture of Istanbul Fatih to modern urban transformation areas.',
      historyTitle: 'WHO ARE WE? OUR HISTORY',
      historySub: 'From Tradition to Future',
      historyP1: "Our construction journey, whose foundations were laid in the 1960s with the vision of our founder Emin Ahmetbeyoglu, continues its well-established march in the sector with over half a century of experience. Under the leadership of our second-generation representatives Faruk Ahmetbeyoglu and our family elders; We have added permanent value to the texture of the city by signing dozens of qualified projects in the historical Fatih regions of Istanbul such as Laleli, Fatih, Kocamustafapasa, Silivrikapi, Samatya and Yedikule.",
      historyP2: "By reading the changes in market dynamics correctly in the 2010s, we expanded our vision by directing our corporate investments to strategic sectors such as health and agriculture. Today, in line with this multi-faceted corporate experience and increasing sectoral demands, we are restructuring our construction brand as the third generation with a dynamic and innovative infrastructure suitable for the requirements of the age.",
      historyQuote: '"We continue to build stronger from where we left off, blending the heritage of trust we received from the past with the technologies of the future."',
      focusRegions: 'Our Focus Service Regions',
      missionTitle: 'OUR MISSION',
      missionText: 'To produce human-oriented projects that focus on structural safety and always raise living standards by combining our heritage with modern building standards.',
      visionTitle: 'OUR VISION',
      visionText: 'To be a reliable and deep-rooted brand that constructs high-quality, solid, earthquake-resistant and peaceful living spaces for our right holders by combining traditional construction culture with advanced building standards.',
      qualityTitle: 'High Structural & Quality Assurance',
      qualityText: 'Our projects are built in 1st class standards in full compliance with the most up-to-date earthquake and construction regulations.',
      qualityCheck: '100% Static Compliance with TBDY 2018 Earthquake Regulations',
      portfolioBadge: 'Our Historical Building Heritage',
      portfolioTitle: '📍 COMPLETED IN LAST 40 YEARS',
      portfolioDesc: 'Examples of our buildings successfully completed under the leadership of Emin and Faruk Ahmetbeyoglu in Istanbul Fatih region (Cerrahpasa, Kocamustafapasa, Silivrikapi, Aksaray, Haseki Sultan, Seyyid Omer, Sumbul Efendi).',
      portfolioCount: 'Registered Address',
      searchPlaceholder: 'Search street or neighborhood...',
      copySuccess: 'Copied!',
      noResults: 'No completed project address found matching search criteria.',
      portfolioNote: '* All listed buildings were constructed and delivered under the guarantee of AB Yapi / Ahmetbeyoglu Family.',
      btnShowMap: 'Show Project Locations on Map',
      standardsBadge: 'Corporate Assurance & Transparency',
      standardsTitle: 'Our Building Standards with 3 Generations of Experience',
      standard1Title: 'C40/50 Concrete & Raft Foundation',
      standard1Text: 'Statics engineering approved projects fully compliant with the latest Turkish Earthquake Code (TBDY 2018).',
      standard2Title: 'On-time Delivery Guarantee',
      standard2Text: 'The delivery period committed in official flat sharing contracts and transparent site tracking model.',
      standard3Title: 'Transparent Right Ownership',
      standard3Text: 'Fair, clear and honest contract conditions for flat owners under Law No. 6306.',
      btnContact: 'Contact Us for Urban Transformation & Project Meeting',
    },
    ar: {
      badge: 'الملف التعريفي والماضي العريق',
      title: 'إرث من الثقة يتجاوز نصف قرن',
      desc: 'ثلاثة أجيال من الخبرة في البناء والتشييد منذ عام ١٩٦٠ وحتى اليوم، تمتد من النسيج التاريخي لمنطقة الفاتح بإسطنبول إلى مناطق التحول الحضري الحديثة.',
      historyTitle: 'من نحن؟ تاريخ شركتنا',
      historySub: 'من التقليد إلى المستقبل',
      historyP1: "تأسست رحلتنا في البناء في ستينيات القرن الماضي برؤية مؤسسنا أمين أحمد بك أوغلو، وتستمر مسيرتنا العريقة في القطاع بأكثر من نصف قرن من الخبرة. تحت قيادة ممثلي الجيل الثاني فاروق أحمد بك أوغلو وكبار عائلتنا؛ لقد أضفنا قيمة دائمة لنسيج المدينة من خلال تنفيذ عشرات المشاريع في مناطق الفاتح التاريخية في إسطنبول مثل لاليلي، الفاتح، كوجامصطفى باشا، سيليفريكابي، ساماتيا ويديكولي.",
      historyP2: "من خلال قراءة التغيرات في ديناميكيات السوق بشكل صحيح في العقد الأول من القرن الحادي والعشرين، وجهنا استثماراتنا المؤسسية إلى قطاعات استراتيجية مثل الصحة والزراعة، ووسعنا رؤيتنا. اليوم، وبما يتماشى مع هذه الخبرة المؤسسية متعددة الأوجه والطلب المتزايد في القطاع، فإننا نعيد هيكلة علامتنا التجارية الإنشائية كجيل ثالث ببنية تحتية ديناميكية ومبتكرة تتناسب مع متطلبات العصر.",
      historyQuote: '"نواصل الإنتاج بشكل أقوى من حيث توقفنا، ممتزجين بين إرث الثقة الذي تلقيناه من الماضي وتكنولوجيا المستقبل."',
      focusRegions: 'مناطق الخدمة التي نركز عليها',
      missionTitle: 'مهمتنا',
      missionText: 'دمج الخبرة التي اكتسبناها من جذورنا مع معايير البناء الحديثة لإنتاج مشاريع تتمحور حول الإنسان، وتركز على السلامة الهيكلية وترتقي دائمًا بمستويات المعيشة.',
      visionTitle: 'رؤيتنا',
      visionText: 'دمج ثقافة البناء التقليدية لدينا مع معايير البناء المتقدمة اليوم لبناء علامة تجارية موثوقة وعميقة تبني مساحات معيشية عالية الجودة ومتينة ومقاومة للزلازل وهادئة لأصحاب الحقوق.',
      qualityTitle: 'الهيكل العالي وضمان الجودة',
      qualityText: 'يتم بناء مشاريعنا وفقًا لمعايير الدرجة الأولى في الامتثال الكامل لأحدث لوائح الزلازل والبناء الحالية.',
      qualityCheck: 'امتثال استاتيكي ١٠٠٪ لأنظمة الزلازل TBDY 2018',
      portfolioBadge: 'تراثنا الإنشائي التاريخي',
      portfolioTitle: '📍 مشاريعنا المنجزة خلال ٤٠ عاماً الماضية',
      portfolioDesc: 'أمثلة على المباني التي تم الانتهاء منها بنجاح تحت قيادة أمين وفاروق أحمد بك أوغلو في منطقة الفاتح في إسطنبول (جرّاح باشا، كوجامصطفى باشا، سيليفريكابي، أكساراي، هاسكي سلطان، سيد عمر، سنبل أفندي).',
      portfolioCount: 'عنوان مسجل',
      searchPlaceholder: 'البحث عن شارع أو حي...',
      copySuccess: 'تم النسخ!',
      noResults: 'لم يتم العثور على عنوان مشروع مكتمل يطابق معايير البحث.',
      portfolioNote: '* تم بناء وتسليم جميع المباني المدرجة تحت ضمان شركة إيه بي يابي وعائلة أحمد بك أوغلو.',
      btnShowMap: 'عرض مواقع المشاريع على الخريطة',
      standardsBadge: 'شفافية الضمان المؤسسي',
      standardsTitle: 'معايير البناء لدينا مع خبرة ٣ أجيال',
      standard1Title: 'خرسانة C40/50 وأساسات لبشة',
      standard1Text: 'مشاريع معتمدة من الهندسة الإنشائية متوافقة تمامًا مع أحدث قوانين الزلازل التركية (TBDY 2018).',
      standard2Title: 'ضمان التسليم في الوقت المحدد',
      standard2Text: 'فترة التسليم الملتزم بها في عقود تقاسم الشقق الرسمية ونموذج تتبع الموقع الشفاف.',
      standard3Title: 'ملكية واضحة وشفافة لأصحاب الحقوق',
      standard3Text: 'شروط عقد عادلة وواضحة وصادقة لمالكي الشقق بموجب القانون رقم 6306.',
      btnContact: 'اتصل بنا للحصول على التحول الحضري واجتماع المشروع',
    },
  };

  const activeTrans = pageTranslations[language] || pageTranslations['tr'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Corporate Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-teal-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>{activeTrans.badge}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-outfit tracking-tight">
            {activeTrans.title}
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            {activeTrans.desc}
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

      {/* Main History & Mission/Vision Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Biz Kimiz? Şirket Tarihçemiz (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-md border border-slate-200/80 space-y-6 relative">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0 shadow-sm">
              <History className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase text-teal-600 tracking-wider">
                {activeTrans.historySub}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-outfit">
                {activeTrans.historyTitle}
              </h2>
            </div>
          </div>

          <div className="space-y-5 text-slate-700 text-sm md:text-base leading-relaxed font-normal">
            <p>{activeTrans.historyP1}</p>
            <p>{activeTrans.historyP2}</p>

            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-1">
              <p className="text-slate-200 text-sm italic font-medium leading-relaxed">
                {activeTrans.historyQuote}
              </p>
            </div>
          </div>

          {/* Focus Area Badges */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>{activeTrans.focusRegions}</span>
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
                {activeTrans.missionTitle}
              </h3>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed pl-1">
              {activeTrans.missionText}
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
                {activeTrans.visionTitle}
              </h3>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed pl-1">
              {activeTrans.visionText}
            </p>
          </div>

          {/* Yüksek Yapı Standartları & Kalite Güvencesi Card */}
          <div className="bg-slate-50 p-7 rounded-3xl shadow-sm border border-slate-200 space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <h4 className="text-base md:text-lg font-extrabold text-slate-900 font-outfit">
                {activeTrans.qualityTitle}
              </h4>
            </div>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              {activeTrans.qualityText}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-teal-800">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{activeTrans.qualityCheck}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Section: Son 40 Yılda Ürettiklerimiz */}
      <section className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200/90 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200">
              <History className="w-3.5 h-3.5 text-amber-600" />
              <span>{activeTrans.portfolioBadge}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 font-outfit">
              {activeTrans.portfolioTitle}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              {activeTrans.portfolioDesc}
            </p>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-2xl text-center shrink-0 border border-slate-800">
            <div className="text-2xl md:text-3xl font-black text-amber-400 font-outfit">
              {HISTORICAL_PROJECTS.length}+
            </div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-300">
              {activeTrans.portfolioCount}
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedNeighborhood === nh
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {nh === 'Tümü' ? (language === 'tr' ? 'Tümü' : language === 'ar' ? 'الكل' : 'All') : nh}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={activeTrans.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
        </div>

        {/* Interactive Address Grid */}
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
                  {activeTrans.copySuccess}
                </span>
              ) : null}
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
            {activeTrans.noResults}
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <span>{activeTrans.portfolioNote}</span>
          <button
            onClick={() => setActiveTab('map')}
            className="text-teal-700 hover:text-teal-800 font-bold inline-flex items-center gap-1.5 self-end sm:self-auto cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>{activeTrans.btnShowMap}</span>
          </button>
        </div>
      </section>

      {/* Core Engineering & Work Principles */}
      <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase text-teal-400 tracking-wider">
            {activeTrans.standardsBadge}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-outfit">
            {activeTrans.standardsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-lg">{activeTrans.standard1Title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeTrans.standard1Text}
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-lg">{activeTrans.standard2Title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeTrans.standard2Text}
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-lg">{activeTrans.standard3Title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeTrans.standard3Text}
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('contact')}
            className="bg-teal-600 hover:bg-teal-500 text-white font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>{activeTrans.btnContact}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
