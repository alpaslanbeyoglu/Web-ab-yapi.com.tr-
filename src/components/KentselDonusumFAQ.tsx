import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Scale,
  BadgePercent,
  Building2,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { trackEvent, trackWhatsAppClick } from '../utils/analytics';

export interface FAQItem {
  id: string;
  category: 'Yasal Süreç' | 'Devlet Desteği & Kira' | 'Maliyet & Ödeme' | 'İnşaat Güvenliği & Konfor' | 'Sözleşme & Haklar';
  question: string;
  answer: string;
  lawRef?: string;
  badge?: string;
  highlightPoints?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'yasal-50-arti-1',
    category: 'Yasal Süreç',
    question: '6306 Sayılı Kanun\'a göre kentsel dönüşüm kararı için %50+1 salt çoğunluk nasıl hesaplanır?',
    answer:
      'Kasım 2023\'te yürürlüğe giren yeni yasal düzenlemeyle kentsel dönüşümde aranan 2/3 (üçte iki) oy çokluğu şartı kaldırılmıştır. Artık riskli binanın yıkımı, yeniden inşası veya müteahhit seçimi için hisse (arsa payı) sahiplerinin salt çoğunluğunun (%50 + 1 pay) kararı yeterlidir. Bina toplantısında karar alındıktan sonra karara katılmayan veya muhalif kalan maliklere noter veya kentsel dönüşüm başkanlığı aracılığıyla 15 günlük tebligat yapılır. Kabul etmeyenlerin hisseleri öncelikle diğer paydaşlara rayiç bedelle açık artırmada satılır.',
    lawRef: '6306 Sayılı Kanun Madde 6 (Resmi Gazete No: 32364)',
    badge: 'Kritik Değişiklik',
    highlightPoints: [
      'Arsa payı toplamının %50\'sini aşan çoğunluk yeterlidir.',
      'İmzalamayan maliklere 15 gün noter süresi verilir.',
      'Süreç tek bir daire sahibinin itirazıyla kilitlenemez.',
    ],
  },
  {
    id: 'yasal-karot-ve-risk',
    category: 'Yasal Süreç',
    question: 'Binamız için riskli bina tespiti (karot testi) yaptırmak için tüm maliklerin onayı gerekir mi?',
    answer:
      'Hayır, tüm maliklerin onayı gerekmez. Apartmandaki tek bir kat malikinin veya kanuni vekilinin Çevre, Şehircilik ve İklim Değişikliği Bakanlığı lisanslı kuruluşlarına başvurması yeterlidir. Test için bina yönetim kurulu kararı veya çoğunluk aranmaz. Tespitten sonra bina riskli ilan edilirse tapuya şerh düşülür ve dönüşüm takvimi resmen başlar.',
    lawRef: '6306 Sayılı Kanun Madde 3',
    badge: 'Tek Malik Yeterli',
  },
  {
    id: 'destek-kira-yardimi',
    category: 'Devlet Desteği & Kira',
    question: 'İstanbul\'da kentsel dönüşüm kira yardımı ne kadar, kimlere verilir ve kaç ay ödenir?',
    answer:
      'İstanbul genelinde riskli yapı olarak tespit edilen ve tahliyesi gerçekleşen binalardaki hak sahibi ev sahiplerine Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından 18 ay boyunca her ay geri ödemesiz kira desteği ödenir. Kiracılara ise taşınma masraflarını hafifletmek amacıyla tek seferlik nakit taşınma yardımı sunulur.',
    badge: '18 Ay Boyunca',
    highlightPoints: [
      'Geri ödemesiz (hibe) devlet desteğidir.',
      'Ev sahiplerine 18 ay boyunca düzenli yatar.',
      'Kiracılara tek seferlik taşınma yardımı ödenir.',
    ],
  },
  {
    id: 'destek-yarisi-bizden',
    category: 'Devlet Desteği & Kira',
    question: '\'Yarısı Bizden\' kampanyası nedir ve şartları nelerdir?',
    answer:
      'İstanbul için başlatılan \'Yarısı Bizden\' kampanyasında devlet, hak sahiplerine bağımsız bölüm başına hibe (karşılıksız destek), düşük faizli uzun vadeli kredi ve ilave tahliye/kira katkısı sağlamaktadır. Kampanyadan faydalanmak için bina sakinlerinin salt çoğunlukla (%50+1) uzlaşarak e-Devlet üzerinden veya ilçe dönüşüm ofislerinden başvuru yapması gerekmektedir.',
    lawRef: 'Cumhurbaşkanlığı Kararnamesi No: 8201',
    badge: 'Bakanlık Desteği',
  },
  {
    id: 'maliyet-kdv-muafiyeti',
    category: 'Maliyet & Ödeme',
    question: 'Kentsel dönüşümde noter masrafları, tapu harcı ve KDV oranları nasıldır?',
    answer:
      '6306 Sayılı Kanun kapsamında yürütülen projeler büyük mali muafiyetlere tabidir. Hak sahiplerinin yeni dairelerini teslim alırken ödeyeceği KDV oranı %20 yerine yalnızca %1 olarak uygulanır. Ayrıca tapu tescil harçları, noter sözleşme masrafları, damga vergisi ve belediye otopark/harç giderlerinden %100 oranında tam muafiyet sağlanır.',
    badge: '%100 Vergi Muafiyeti',
    highlightPoints: [
      'İnşaat ve konut tesliminde KDV yalnızca %1.',
      'Tapu devir ve intikal harçları 0 TL.',
      'Noter ve belediye ruhsat damga vergisi muafiyeti.',
    ],
  },
  {
    id: 'maliyet-kat-karsiligi-ve-borclanma',
    category: 'Maliyet & Ödeme',
    question: 'Binamızı \'Kat Karşılığı\' mı yoksa \'İnşaat Maliyetini Ödeyerek (Taahhüt)\' mi yaptırmalıyız?',
    answer:
      'Arsanızda imar artışı veya ilave kat hakkı varsa, fazla çıkan daireler müteahhide verilerek sıfır maliyetle (kat karşılığı) yeni dairenize kavuşabilirsiniz. Eğer arsanızda emsal artışı yoksa ve mevcut m²\'nizi birebir korumak isterseniz, daire başına maliyet paylaşımlı inşaat taahhüt sözleşmesi yapılır. AB Yapı olarak bütçenize göre vadeli taksitlendirme ve banka destekli kentsel dönüşüm kredisi modelleri sunuyoruz.',
    badge: 'Ödeme Kolaylığı',
  },
  {
    id: 'guvenlik-beton-standart',
    category: 'İnşaat Güvenliği & Konfor',
    question: 'AB Yapı projelerinde kullanılan beton sınıfı ve deprem güvenliği standartları nelerdir?',
    answer:
      'Projelerimizde güncel Türkiye Deprem Tehlike Haritası ve 2018 Türkiye Bina Deprem Yönetmeliği (TBDY) esas alınır. Eski binalarda kullanılan C14-C16 sınıfı kalitesiz betonların aksine; projelerimizde zemin etüt raporuna göre radye temel üzerine minimum C35, C40 veya C50 yüksek dayanımlı hazır beton ve nervürlü B420C çelik donatı kullanılmaktadır. Tüm dökümler bağımsız yapı denetim ve akredite laboratuvar numune kırma testleriyle belgelenir.',
    badge: 'C40 / C50 Beton',
    highlightPoints: [
      'Radye jeneral temel ve sismik perde duvar tasarımı.',
      'Akredite laboratuvar onaylı 7 ve 28 günlük beton kırma testleri.',
      'Sertifikalı nervürlü B420C çelik kullanımı.',
    ],
  },
  {
    id: 'guvenlik-konfor-paketi',
    category: 'İnşaat Güvenliği & Konfor',
    question: 'Opsiyonel \'Konfor Paketi\' nedir ve daire sahipleri bunu nasıl talep edebilir?',
    answer:
      'Konfor Paketi; hak sahiplerimizin yeni evlerinde birinci sınıf lüks yaşam standardı sürmesi için sunduğumuz opsiyonel donanımlar bütünüdür. İçeriğinde: Tam otomatik devreye giren bina jeneratörü, çizilmez & ısıya dayanıklı porselen mutfak tezgahı, sulu yerden ısıtma, A++ inverter multi klima, merkezi bina su yumuşatma arıtma sistemi, 38°C emniyet kilitli duş bataryası, nem sensörlü banyo aspiratörü ve parmak izli akıllı çelik kapı kilitleri yer alır. Sözleşme aşamasında daire bazlı veya bina geneli olarak seçilebilir.',
    badge: 'Gerçek Donanım',
  },
  {
    id: 'sozlesme-teminat-mektubu',
    category: 'Sözleşme & Haklar',
    question: 'İnşaatın zamanında bitmesi ve yarım kalmaması için ne gibi garantiler veriyorsunuz?',
    answer:
      'AB Yapı, hak sahiplerinin haklarını ve huzurunu garanti altına almak amacıyla sözleşmede banka teminat mektubu, resmi noter tasdikli teknik şartname ve gecikme cezalı teslim taahhüdü sunar. Belirlenen inşaat süresi (örneğin 12-18 ay) aşıldığı takdirde her geçen ay için hak sahiplerine güncel piyasa rayici üzerinde kira cezası ödenmesi sözleşmeye bağlayıcı olarak eklenir.',
    badge: 'Banka Teminatı',
    highlightPoints: [
      'Resmi Noter Onaylı İnşaat Sözleşmesi.',
      'Gecikme cezası ve kira tazminatı garantisi.',
      'Adım adım hak ediş ve şeffaf denetim raporlaması.',
    ],
  },
  {
    id: 'sozlesme-belediye-ruhsat',
    category: 'Sözleşme & Haklar',
    question: 'Yıkım ruhsatı ve inşaat yapı ruhsatı alma sürecini kim takip eder?',
    answer:
      'Müteahhitlik firması olarak mimari, statik, mekanik, zemin etüt ve elektrik projelerinin hazırlanmasından; ilgili ilçe belediyesi ve kadastro müdürlüklerindeki tüm ruhsat ve izin süreçlerine kadar tamamını AB Yapı\'nın uzman mimar ve mühendis kadrosu yürütür. Hak sahipleri bürokratik işlemlerle uğraşmak zorunda kalmaz.',
    badge: 'Anahtar Teslim',
  },
  {
    id: 'destek-tasinma-ve-esya',
    category: 'Devlet Desteği & Kira',
    question: 'Eski binamızın yıkımından önce taşınma süresi ne kadardır?',
    answer:
      'Riskli yapı tespiti kesinleştikten sonra belediye veya kentsel dönüşüm müdürlüğü hak sahiplerine tahliye için genellikle 60 gün süre tanır. Bu sürede tahliye gerçekleşmezse 30 günden az olmamak üzere ek süre verilir. AB Yapı olarak hak sahiplerine taşınma ve nakliye lojistiğinde anlaşmalı firmalarla kolaylık sağlamaktayız.',
    badge: '60 + 30 Gün Süre',
  },
  {
    id: 'maliyet-pay-oranlari',
    category: 'Maliyet & Ödeme',
    question: 'Yeni binada dairelerin kat ve cephe paylaşımı (şerefiye) nasıl yapılır?',
    answer:
      'Mevcut binadaki hak sahiplerinin mevcut kat, cephe ve m² durumları SPK lisanslı gayrimenkul değerleme uzmanlarının hazırladığı şerefiye raporları ile objektif olarak değerlendirilir. Hak sahiplerinin kazanılmış hakları korunarak adil bir kat planlaması ve noter onaylı paylaşım sözleşmesi hazırlanır.',
    badge: 'Şerefiye Garantisi',
  },
];

type CategoryFilter = 'Tümü' | FAQItem['category'];

const CATEGORIES: CategoryFilter[] = [
  'Tümü',
  'Yasal Süreç',
  'Devlet Desteği & Kira',
  'Maliyet & Ödeme',
  'İnşaat Güvenliği & Konfor',
  'Sözleşme & Haklar',
];

interface KentselDonusumFAQProps {
  whatsappNumber?: string;
  onSelectCategory?: (category: string) => void;
}

export const KentselDonusumFAQ: React.FC<KentselDonusumFAQProps> = ({
  whatsappNumber = '905322813536',
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['yasal-50-arti-1']));

  const formattedWhatsapp = whatsappNumber.replace(/\D/g, '');

  const toggleItem = (id: string, questionTitle: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        trackEvent('faq_accordion_open', {
          faq_id: id,
          faq_title: questionTitle,
          faq_category: selectedCategory,
        });
      }
      return next;
    });
  };

  const handleCategoryChange = (cat: CategoryFilter) => {
    setSelectedCategory(cat);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    trackEvent('faq_category_filter', {
      selected_category: cat,
    });
  };

  const toggleAll = (expand: boolean) => {
    if (expand) {
      setOpenIds(new Set(filteredFaqs.map((f) => f.id)));
      trackEvent('faq_toggle_all', { action: 'expand' });
    } else {
      setOpenIds(new Set());
      trackEvent('faq_toggle_all', { action: 'collapse' });
    }
  };

  // Filtered FAQ list by category and search term
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Tümü' || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchQ = item.question.toLowerCase().includes(q);
      const matchA = item.answer.toLowerCase().includes(q);
      const matchLaw = item.lawRef?.toLowerCase().includes(q);
      const matchBadge = item.badge?.toLowerCase().includes(q);

      return matchQ || matchA || matchLaw || matchBadge;
    });
  }, [selectedCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Tümü: FAQ_DATA.length };
    FAQ_DATA.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section
      id="sikca-sorulan-sorular"
      className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-10 space-y-8 scroll-mt-24 transition-all"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
            <span>Kentsel Dönüşüm Soru & Cevap Rehberi</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Sıkça Sorulan Sorular ve Yasal Cevapları
          </h2>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl">
            Kat maliklerinin merak ettiği 6306 sayılı kanun, %50+1 çoğunluk, kira hibesi, vergi muafiyeti ve AB Yapı sözleşme güvenceleri hakkında uzman yanıtları.
          </p>
        </div>

        {/* Global Expand / Collapse Control */}
        <div className="flex items-center gap-2 self-start md:self-end shrink-0">
          <button
            onClick={() => toggleAll(true)}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors border border-teal-200"
          >
            Tümünü Aç
          </button>
          <button
            onClick={() => toggleAll(false)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Sorularda, kanun maddelerinde veya konularda ara (ör: %50+1, kira yardımı, C40 beton, noter)..."
          className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
            aria-label="Aramayı Temizle"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dynamic Topic / Category Filter Pills */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <span>Konuya Göre Filtrele:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-teal-500 text-white font-extrabold'
                      : 'bg-white text-slate-600 font-semibold border border-slate-200'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion FAQ Items List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">
              Aramanızla eşleşen soru bulunamadı.
            </div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              "{searchQuery}" araması için sonuç bulunamadı. Filtreyi sıfırlayabilir veya uzmanımıza doğrudan WhatsApp üzerinden sorabilirsiniz.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Tümü');
                }}
                className="text-xs font-bold text-teal-700 bg-teal-50 px-4 py-2 rounded-xl hover:bg-teal-100"
              >
                Filtreleri Sıfırla
              </button>
              <a
                href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(`Merhaba AB Yapı, kentsel dönüşüm hakkında bir sorum olacaktı: "${searchQuery}"`)}`}
                onClick={() => trackWhatsAppClick('faq_empty_search', searchQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp'tan Sor
              </a>
            </div>
          </div>
        ) : (
          filteredFaqs.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-teal-300 bg-white shadow-md ring-1 ring-teal-200'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id, item.question)}
                  className="w-full text-left p-4 md:p-5 flex items-start justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm md:text-base leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div className="shrink-0 pt-1">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                        isOpen
                          ? 'bg-teal-700 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 md:px-5 md:pb-6 text-xs md:text-sm text-slate-700 space-y-3.5 border-t border-slate-100 pt-3 animate-in fade-in-50 duration-200">
                    <p className="leading-relaxed text-slate-700 font-normal">
                      {item.answer}
                    </p>

                    {item.highlightPoints && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">
                          Önemli Maddeler:
                        </div>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {item.highlightPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.lawRef && (
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-semibold bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-200/80">
                        <Scale className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Resmi Mevzuat: {item.lawRef}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom CTA for Unanswered Questions */}
      <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Binanıza Özel Danışmanlık</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold font-outfit">
            Aklınıza takılan başka bir kentsel dönüşüm sorusu mu var?
          </h3>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl">
            Binanızın mevcut imar durumu, kat malikleri uzlaşması ve güncel hibe/kredi şartları için inşaat mühendislerimiz ve hukuk danışmanlarımızla hemen görüşebilirsiniz.
          </p>
        </div>

        <a
          href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent('Merhaba AB Yapı, binamızın kentsel dönüşümü hakkında teknik ve yasal detayları danışmak istiyorum.')}`}
          onClick={() => trackWhatsAppClick('faq_bottom_expert_cta')}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs md:text-sm px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Uzmanımıza Danışın</span>
        </a>
      </div>
    </section>
  );
};
