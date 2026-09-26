import React, { useState, useMemo } from 'react';
import { IstanbulConstructionStats } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  BarChart3,
  AlertTriangle,
  ShieldCheck,
  Search,
  Calendar,
  Building,
  CheckCircle2,
  X,
  ArrowUpDown,
  FileSpreadsheet,
  Info,
} from 'lucide-react';

interface StatisticsProps {
  stats: IstanbulConstructionStats;
  setActiveTab: (tab: string) => void;
}

// European Side districts list for filtering
const EUROPEAN_DISTRICTS = new Set([
  'Fatih', 'Zeytinburnu', 'Avcılar', 'Küçükçekmece', 'Bakırköy', 'Bahçelievler',
  'Güngören', 'Bağcılar', 'Esenler', 'Bayrampaşa', 'Gaziosmanpaşa', 'Sultangazi',
  'Eyüpsultan', 'Beyoğlu', 'Şişli', 'Beşiktaş', 'Kağıthane', 'Sarıyer',
  'Başakşehir', 'Esenyurt', 'Beylikdüzü', 'Büyükçekmece', 'Silivri', 'Çatalca', 'Arnavutköy'
]);

// Helper to normalize Turkish strings for frictionless search (e.g. "kadikoy" -> "kadıköy")
const normalizeText = (text: string): string => {
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
};

export const Statistics: React.FC<StatisticsProps> = ({ stats, setActiveTab }) => {
  const [searchDistrict, setSearchDistrict] = useState('');
  const [sideFilter, setSideFilter] = useState<'all' | 'europe' | 'asia' | 'high-risk'>('all');
  const [sortBy, setSortBy] = useState<'risky' | 'renewed' | 'age' | 'name'>('risky');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const { language } = useLanguage();

  const totalTargetProgressPercent = Math.round(
    (stats.totalRenewedUnits / stats.totalRiskyUnitsTarget) * 100
  );

  const filteredAndSortedDistricts = useMemo(() => {
    const normalizedSearch = normalizeText(searchDistrict.trim());

    return stats.districtBreakdown
      .filter((d) => {
        // Search filter
        if (normalizedSearch) {
          const normName = normalizeText(d.district);
          if (!normName.includes(normalizedSearch)) return false;
        }

        // Side & category filter
        const isEurope = EUROPEAN_DISTRICTS.has(d.district);
        if (sideFilter === 'europe' && !isEurope) return false;
        if (sideFilter === 'asia' && isEurope) return false;
        if (sideFilter === 'high-risk' && d.riskFactor !== 'Yüksek') return false;

        return true;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortBy === 'risky') diff = b.riskyBuildingCount - a.riskyBuildingCount;
        else if (sortBy === 'renewed') diff = b.renewedBuildingCount - a.renewedBuildingCount;
        else if (sortBy === 'age') diff = b.avgBuildingAge - a.avgBuildingAge;
        else if (sortBy === 'name') diff = a.district.localeCompare(b.district, 'tr-TR');

        return sortAsc ? -diff : diff;
      });
  }, [stats.districtBreakdown, searchDistrict, sideFilter, sortBy, sortAsc]);

  const toggleSort = (column: 'risky' | 'renewed' | 'age' | 'name') => {
    if (sortBy === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(column);
      setSortAsc(false);
    }
  };

  const translations = {
    tr: {
      badge: 'Resmi Veri & Sektörel Analiz',
      title: 'İstanbul İnşaat & Kentsel Dönüşüm İstatistikleri',
      desc: 'İstanbul geneli 39 ilçenin İBB Deprem Zemin İnceleme Müdürlüğü ve Çevre, Şehircilik Bakanlığı resmi verilerine dayalı bina envanteri, risk faktörleri ve kentsel dönüşüm ilerleme tablosu.',
      lastUpdated: 'Son Güncelleme:',
      officialSource: 'Kaynak: İBB Deprem Kayıp Tahminleri & TÜİK Yapı Envanteri',
      targetTitle: 'İstanbul Toplam Riskli Yapı Dönüşüm Hedefi',
      targetDesc: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı ve İSKİ/İBB kentsel dönüşüm projeksiyonu',
      completedUnits: 'Konut',
      progressLabel: 'Dönüşüm Tamamlanma Oranı',
      ageTitle: 'İstanbul Bina Yaşı Dağılımı',
      ageDesc: '1999 Deprem Yönetmeliği öncesi ve sonrası durum',
      criticalBadge: 'Kritik Risk Alanı',
      agePre1999: '1999 Öncesi Binalar (Kritik Risk)',
      ageMid: '1999 - 2018 Arası Binalar (Orta Seviye)',
      agePost2018: '2018 Sonrası (Deprem Güvenlikli)',
      noteTitle: 'Önemli Resmi Veri Özeti:',
      noteText: '1999 öncesi inşa edilen binaların büyük kısmında hazır beton ve nervürlü donatı teknolojisi bulunmamaktadır. 6306 sayılı kanun kapsamında salt çoğunlukla (%50+1) hızlı inceleme ve yenileme başlatılabilmektedir.',
      tableTitle: '39 İlçe Bazlı Kentsel Dönüşüm & Risk Tablosu',
      tableDesc: 'İstanbul’un tüm ilçelerindeki tespit edilmiş riskli binalar, yenilenen yapılar ve ortalama bina yaşları',
      searchPlaceholder: 'İlçe ara (Örn: Kadıköy, Bakırköy, Avcılar, Beşiktaş)...',
      filterAll: 'Tüm İlçeler (39)',
      filterEurope: 'Avrupa Yakası (25)',
      filterAsia: 'Anadolu Yakası (14)',
      filterHighRisk: 'Yüksek Riskli İlçeler',
      showingCount: 'ilçe listeleniyor',
      clearSearch: 'Temizle',
      noResults: 'Arama kriterinize uygun ilçe bulunamadı.',
      thDistrict: 'İlçe Adı',
      thRisky: 'Riskli / Öncelikli Bina',
      thRenewed: 'Yenilenen / Ruhsatlı',
      thAge: 'Ort. Bina Yaşı',
      thRiskFactor: 'Risk Faktörü',
      thAction: 'Aksiyon',
      btnAction: 'İnceleme İsteyin',
      years: 'Yıl',
      highRisk: 'Yüksek',
      medHighRisk: 'Orta-Yüksek',
      medRisk: 'Orta',
    },
    en: {
      badge: 'Official Data & Sectoral Analysis',
      title: 'Istanbul Construction & Urban Transformation Statistics',
      desc: 'Building stock inventory, seismic risk factors, and urban transformation progress table for all 39 districts of Istanbul based on official IMM & Ministry data.',
      lastUpdated: 'Last Updated:',
      officialSource: 'Source: IMM Seismic Risk Reports & TURKSTAT Building Inventory',
      targetTitle: 'Istanbul Total Risky Building Transformation Target',
      targetDesc: 'Ministry of Environment, Urbanization and Climate Change & IMM urban transformation projection',
      completedUnits: 'Units',
      progressLabel: 'Transformation Completion Rate',
      ageTitle: 'Istanbul Building Age Distribution',
      ageDesc: 'Situation before and after the 1999 Earthquake Regulations',
      criticalBadge: 'Critical Risk Zone',
      agePre1999: 'Pre-1999 Buildings (Critical Risk)',
      ageMid: '1999 - 2018 Buildings (Medium Risk)',
      agePost2018: 'Post-2018 Buildings (Earthquake Safe)',
      noteTitle: 'Important Official Note:',
      noteText: 'Most buildings constructed before 1999 lack ready-mixed concrete and ribbed rebar. Under Law No. 6306, renewal can be initiated with a simple majority (50%+1).',
      tableTitle: '39 Districts Urban Transformation & Risk Table',
      tableDesc: 'Detected risky buildings, renewed structures, and average building ages across all Istanbul districts',
      searchPlaceholder: 'Search district (e.g. Kadikoy, Bakirkoy, Avcilar)...',
      filterAll: 'All Districts (39)',
      filterEurope: 'European Side (25)',
      filterAsia: 'Asian Side (14)',
      filterHighRisk: 'High Risk Districts',
      showingCount: 'districts shown',
      clearSearch: 'Clear',
      noResults: 'No district matching your search criteria was found.',
      thDistrict: 'District Name',
      thRisky: 'Risky / Priority Buildings',
      thRenewed: 'Renewed / Licensed',
      thAge: 'Avg. Building Age',
      thRiskFactor: 'Risk Factor',
      thAction: 'Action',
      btnAction: 'Request Inspection',
      years: 'Years',
      highRisk: 'High',
      medHighRisk: 'Med-High',
      medRisk: 'Medium',
    },
    ar: {
      badge: 'البيانات الرسمية والتحليل القطاعي',
      title: 'إحصاءات البناء والتحول الحضري في إسطنبول',
      desc: 'جدول جرد المباني وعوامل المخاطر الزلزالية وتقدم التحول الحضري لجميع مناطق إسطنبول الـ 39 بناءً على البيانات الرسمية.',
      lastUpdated: 'آخر تحديث:',
      officialSource: 'المصدر: تقارير مخاطر بلدية إسطنبول وهيئة الإحصاء التركية',
      targetTitle: 'الهدف الإجمالي للتحول للمباني الخطرة في إسطنبول',
      targetDesc: 'إسقاطات التحول الحضري لوزارة البيئة والتطوير العمراني وبلدية إسطنبول الكبرى',
      completedUnits: 'وحدة سكنية',
      progressLabel: 'معدل إنجاز التحول',
      ageTitle: 'توزيع أعمار المباني في إسطنبول',
      ageDesc: 'الوضع قبل وبعد لوائح الزلازل لعام ١٩٩٩',
      criticalBadge: 'منطقة خطر حرج',
      agePre1999: 'مبانٍ قبل عام ١٩٩٩ (خطر حرج)',
      ageMid: 'مبانٍ بين عامي ١٩٩٩ و ٢٠١٨ (خطر متوسط)',
      agePost2018: 'مبانٍ بعد عام ٢٠١٨ (آمنة ضد الزلازل)',
      noteTitle: 'ملاحظة رسمية هامة:',
      noteText: 'تفتقر معظم المباني المشيدة قبل عام ١٩٩٩ إلى الخرسانة الجاهزة وحديد التسليح الحديث. بموجب القانون رقم 6306، يمكن بدء التجديد بالأغلبية البسيطة (٥٠٪+١).',
      tableTitle: 'جدول التحول الحضري والمخاطر لـ ٣٩ منطقة',
      tableDesc: 'المباني الخطرة المكتشفة، الهياكل المجددة، ومتوسط أعمار المباني في جميع مناطق إسطنبول',
      searchPlaceholder: 'البحث عن منطقة (مثال: كاديكوي، باكركوي، أفجيلار)...',
      filterAll: 'جميع المناطق (٣٩)',
      filterEurope: 'الجانب الأوروبي (٢٥)',
      filterAsia: 'الجانب الآسيوي (١٤)',
      filterHighRisk: 'المناطق عالية المخاطر',
      showingCount: 'منطقة معروضة',
      clearSearch: 'مسح',
      noResults: 'لم يتم العثور على أي منطقة تطابق معايير البحث.',
      thDistrict: 'اسم المنطقة',
      thRisky: 'مبانٍ خطرة / أولوية',
      thRenewed: 'مبانٍ مجددة / مرخصة',
      thAge: 'متوسط عمر المبنى',
      thRiskFactor: 'عامل الخطر',
      thAction: 'الإجراء',
      btnAction: 'طلب فحص',
      years: 'عام',
      highRisk: 'مرتفع',
      medHighRisk: 'متوسط-مرتفع',
      medRisk: 'متوسط',
    },
  };

  const activeTrans = translations[language] || translations['tr'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{activeTrans.badge}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-outfit tracking-tight">
            {activeTrans.title}
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            {activeTrans.desc}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-teal-400 font-semibold">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{activeTrans.lastUpdated} {stats.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-teal-900/50 px-2.5 py-1 rounded-lg border border-teal-700/50 text-teal-200">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{activeTrans.officialSource}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Target Progress Gauge */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-xl font-outfit">
              {activeTrans.targetTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {activeTrans.targetDesc}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-teal-700">{stats.totalRenewedUnits.toLocaleString()}</span>
            <span className="text-slate-400 text-xs font-medium"> / {stats.totalRiskyUnitsTarget.toLocaleString()} {activeTrans.completedUnits}</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>{activeTrans.progressLabel}</span>
            <span className="text-teal-700">%{totalTargetProgressPercent}</span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-gradient-to-r from-teal-600 to-emerald-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${totalTargetProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Building Age Distribution Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{activeTrans.ageTitle}</h3>
            <p className="text-xs text-slate-500">{activeTrans.ageDesc}</p>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md">
            {activeTrans.criticalBadge}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
              <span className="flex items-center gap-1.5 text-amber-700">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> {activeTrans.agePre1999}
              </span>
              <span>%{stats.buildingAgeBreakdown.pre1999}</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full"
                style={{ width: `${stats.buildingAgeBreakdown.pre1999}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
              <span>{activeTrans.ageMid}</span>
              <span>%{stats.buildingAgeBreakdown.between1999and2018}</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-slate-500 h-full rounded-full"
                style={{ width: `${stats.buildingAgeBreakdown.between1999and2018}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> {activeTrans.agePost2018}
              </span>
              <span>%{stats.buildingAgeBreakdown.post2018}</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${stats.buildingAgeBreakdown.post2018}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-700" />
            <span>{activeTrans.noteTitle}</span>
          </div>
          <p>{activeTrans.noteText}</p>
        </div>
      </div>

      {/* 39 Districts Breakdown Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 md:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-teal-700" />
              <h3 className="font-extrabold text-slate-900 text-xl font-outfit">
                {activeTrans.tableTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {activeTrans.tableDesc}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={activeTrans.searchPlaceholder}
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 transition-all shadow-xs"
            />
            {searchDistrict && (
              <button
                onClick={() => setSearchDistrict('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                title={activeTrans.clearSearch}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills & Result Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl font-bold">
            <button
              onClick={() => setSideFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                sideFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {activeTrans.filterAll}
            </button>
            <button
              onClick={() => setSideFilter('europe')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                sideFilter === 'europe'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {activeTrans.filterEurope}
            </button>
            <button
              onClick={() => setSideFilter('asia')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                sideFilter === 'asia'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {activeTrans.filterAsia}
            </button>
            <button
              onClick={() => setSideFilter('high-risk')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                sideFilter === 'high-risk'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              {activeTrans.filterHighRisk}
            </button>
          </div>

          <div className="text-xs font-semibold text-slate-500">
            <span className="font-bold text-slate-900">{filteredAndSortedDistricts.length}</span> {activeTrans.showingCount}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/90 text-slate-700 uppercase font-bold border-b border-slate-200 select-none">
              <tr>
                <th
                  onClick={() => toggleSort('name')}
                  className="p-3.5 cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{activeTrans.thDistrict}</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('risky')}
                  className="p-3.5 text-right cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{activeTrans.thRisky}</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('renewed')}
                  className="p-3.5 text-right cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{activeTrans.thRenewed}</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('age')}
                  className="p-3.5 text-center cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>{activeTrans.thAge}</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th className="p-3.5 text-center">{activeTrans.thRiskFactor}</th>
                <th className="p-3.5 text-right">{activeTrans.thAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800 bg-white">
              {filteredAndSortedDistricts.map((d, idx) => {
                const isEurope = EUROPEAN_DISTRICTS.has(d.district);

                return (
                  <tr key={idx} className="hover:bg-teal-50/50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 text-sm">
                      <div className="flex items-center gap-2">
                        <span>{language === 'ar' && d.district === 'Fatih' ? 'الفاتح' : d.district}</span>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {isEurope ? (language === 'tr' ? 'Avrupa' : language === 'ar' ? 'أوروبي' : 'Europe') : (language === 'tr' ? 'Anadolu' : language === 'ar' ? 'آسيوي' : 'Asia')}
                        </span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right tabular-nums text-slate-700 font-semibold">
                      {d.riskyBuildingCount.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-right tabular-nums text-emerald-700 font-extrabold">
                      {d.renewedBuildingCount.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-center tabular-nums font-bold">
                      {d.avgBuildingAge} {activeTrans.years}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          d.riskFactor === 'Yüksek'
                            ? 'bg-red-100 text-red-900 border border-red-200'
                            : d.riskFactor === 'Orta-Yüksek'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {d.riskFactor === 'Yüksek'
                          ? activeTrans.highRisk
                          : d.riskFactor === 'Orta-Yüksek'
                          ? activeTrans.medHighRisk
                          : activeTrans.medRisk}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setActiveTab('contact')}
                        className="bg-teal-50 hover:bg-teal-700 hover:text-white text-teal-800 font-bold px-3 py-1.5 rounded-lg transition-all text-[11px] cursor-pointer shadow-2xs hover:shadow-xs"
                      >
                        {activeTrans.btnAction}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredAndSortedDistricts.length === 0 && (
            <div className="text-center py-12 bg-slate-50 text-slate-500 space-y-3">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold">{activeTrans.noResults}</p>
              <button
                onClick={() => {
                  setSearchDistrict('');
                  setSideFilter('all');
                }}
                className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
              >
                {activeTrans.filterAll}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
