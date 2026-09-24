import React, { useState } from 'react';
import {
  FileText,
  ShieldAlert,
  Truck,
  Building2,
  Key,
  Scale,
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileCheck2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Landmark,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { trackEvent, trackWhatsAppClick } from '../utils/analytics';

export interface TimelineStep {
  id: string;
  stepNumber: string;
  shortTitle: string;
  title: string;
  tagline: string;
  duration: string;
  responsible: string;
  icon: React.ElementType;
  legalAspect: {
    summary: string;
    items: string[];
    lawRef: string;
  };
  technicalAspect: {
    summary: string;
    items: string[];
    standard: string;
  };
  requiredDocuments: string[];
  keyMilestone: string;
  tipsForResidents: string;
  whatsAppInquiry: string;
}

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 'basvuru',
    stepNumber: '01',
    shortTitle: 'Başvuru & Uzlaşma',
    title: '1. Başvuru, Malikler Uzlaşması & Ön Proje',
    tagline: 'Binadaki kat maliklerinin bir araya gelerek kentsel dönüşüm sürecini resmen başlatması.',
    duration: '2 - 4 Hafta',
    responsible: 'Kat Malikleri Kurulu & AB Yapı Mimarlık Grubu',
    icon: FileText,
    legalAspect: {
      summary: '6306 sayılı kanunun güncel hükümlerine göre bina kararı için arsa payı çoğunluğu aranır.',
      items: [
        'Kat malikleri genel kurulunda arsa payı %50+1 salt çoğunluk kararı alınır ve karar defterine işlenir.',
        'Binayı temsil etmek üzere 3 kişilik malikler temsil heyeti belirlenir.',
        'Toplantıya katılmayan veya muhalif kalan maliklere noter aracılığıyla 15 günlük resmi ihtarname tebliğ edilir.',
        'Noter taslak sözleşmesi hazırlanarak tüm bağımsız bölüm sahiplerinin incelemesine sunulur.',
      ],
      lawRef: '6306 Sayılı Kanun Madde 6 (Salt Çoğunluk Hükmü)',
    },
    technicalAspect: {
      summary: 'Binanın mevcut durumu ile imar potansiyelinin teknik olarak etüt edilmesi.',
      items: [
        'İlgili ilçe belediyesinden güncel imar çapı (imar durumu belgesi) ve yol kotu tutanağı temin edilir.',
        'Mevcut binanın rölöve ölçümleri yapılarak mevcut bağımsız bölüm m² tablosu çıkarılır.',
        'Arsanın emsal, kat yüksekliği ve TAKS/KAKS katsayılarına göre avan mimari kütle çalışması yapılır.',
        'SPK lisanslı şerefiye kriterlerine göre adil daire paylaşım matrisi hazırlanır.',
      ],
      standard: 'İlçe İmar Yönetmeliği & İmar Durum Belgesi',
    },
    requiredDocuments: [
      'Tüm bağımsız bölümlere ait güncel tapu senedi fotokopileri',
      'Kat maliklerinin T.C. kimlik fotokopileri ve iletişim bilgileri',
      'Binaya ait karar defteri ve toplantı katılım tutanağı',
      'Belediyeden alınacak güncel İmar Çapı Belgesi',
    ],
    keyMilestone: 'Kat maliklerinin %50+1 arsa payı çoğunluğu ile AB Yapı dönüşüm teklifini onaylaması.',
    tipsForResidents: 'Tüm komşuların katıldığı şeffaf bir bilgilendirme toplantısı organize edin. AB Yapı uzmanları bu toplantıya ücretsiz katılarak merak edilenleri yanıtlar.',
    whatsAppInquiry: 'Merhaba AB Yapı, binamızda kentsel dönüşüm için komşularımızla ön görüşme yapmak istiyoruz, toplantı ve ön proje desteği alabilir miyiz?',
  },
  {
    id: 'tespit',
    stepNumber: '02',
    shortTitle: 'Riskli Yapı Tespiti',
    title: '2. Riskli Yapı Tespiti & Karot Testi',
    tagline: 'Binanın deprem dayanımının bakanlık lisanslı laboratuvar tarafından resmen belgelenmesi.',
    duration: '15 - 30 Gün',
    responsible: 'Bakanlık Lisanslı Yapı Laboratuvarı & Kentsel Dönüşüm Başkanlığı',
    icon: ShieldAlert,
    legalAspect: {
      summary: 'Bina risk tespiti için bina kararı veya çoğunluk gerekmez; süreç tek malikle başlayabilir.',
      items: [
        'Apartmandaki tek bir kat malikinin bakanlık lisanslı kuruluşa başvurması yasal olarak yeterlidir.',
        'Hazırlanan Riskli Yapı Tespit Raporu Çevre, Şehircilik ve İklim Değişikliği İl Müdürlüğü onayına sunulur.',
        'Bakanlık onayı ile tapu kütüğüne "6306 Sayılı Kanun Gereğince Riskli Yapıdır" şerhi işlenir.',
        'Tapu şerhinin tebliğinden itibaren maliklerin 15 gün içinde teknik heyete itiraz hakkı bulunur.',
      ],
      lawRef: '6306 Sayılı Kanun Madde 3 (Riskli Yapı Tespiti ve İtiraz)',
    },
    technicalAspect: {
      summary: 'Binanın taşıyıcı sistemi laboratuvar testleriyle röntgenlenir ve sismik analizi yapılır.',
      items: [
        'Taşıyıcı kolon ve perde betonlardan elmas uçlu özel karot cihazıyla silindir beton numuneleri alınır.',
        'Laboratuvarda 7 ve 28 günlük basınç kırılma dayanım testleri (MPa) uygulanır.',
        'Ferroscan (donatı röntgeni) ile kolon içindeki demir çapları, etriye sıklığı ve paspayı korozyonu ölçülür.',
        '2018 Türkiye Bina Deprem Yönetmeliği (TBDY) esas alınarak binanın 3 boyutlu statik bilgisayar modeli çözümlenir.',
      ],
      standard: '2018 Türkiye Bina Deprem Yönetmeliği (TBDY) Standardı',
    },
    requiredDocuments: [
      'Lisanslı Kuruluş Riskli Yapı Tespit Başvuru Dilekçesi',
      'Başvuran malikin güncel tapu kaydı örneği',
      'Belediye arşivinden temin edilen onaylı eski statik/mimari proje (varsa)',
    ],
    keyMilestone: 'Riskli yapı raporunun bakanlıkça onaylanarak tapu kütüğüne tescil edilmesi.',
    tipsForResidents: 'Karot alma işlemi binaya zarar vermez; alınan numune yerleri yüksek mukavemetli tamir harçlarıyla anında kapatılır.',
    whatsAppInquiry: 'Merhaba AB Yapı, binamız için riskli yapı tespiti ve karot analizi süreci hakkında bilgi almak istiyoruz.',
  },
  {
    id: 'tahliye',
    stepNumber: '03',
    shortTitle: 'Tahliye & Yıkım',
    title: '3. Tahliye, Yıkım & Devlet Kira Desteği',
    tagline: 'Binanın güvenle boşaltılması, 18 ay kira yardımı başlangıcı ve kontrollü yıkım işlemi.',
    duration: '60 - 90 Gün',
    responsible: 'İlçe Belediyesi İmar/Yıkım Müdürlüğü, Kat Malikleri & AB Yapı',
    icon: Truck,
    legalAspect: {
      summary: 'Tahliye süreci yasal koruma altındadır; hak sahiplerine kira ve vergi destekleri tanımlanır.',
      items: [
        'Riskli yapı şerhi kesinleşince belediye tarafından maliklere 60 gün yasal tahliye süresi verilir (gerekirse +30 gün ek süre).',
        'Tahliye edilen bağımsız bölümlerdeki ev sahipleri için 18 ay boyunca geri ödemesiz devlet kira desteği başlar.',
        'Kiracılara tek seferlik taşınma yardımı desteği sağlanır.',
        'Tüm maliklerle noter tasdikli Kat Karşılığı / İnşaat Taahhüt Sözleşmesi imzalanır ve banka teminat mektubu verilir.',
      ],
      lawRef: '6306 Sayılı Kanun Madde 5 & Kira Yardımı Uygulama Kılavuzu',
    },
    technicalAspect: {
      summary: 'Çevre ve iş güvenliği önlemleri altında profesyonel yıkım ve hafriyat yönetimi.',
      items: [
        'İSKİ, İGDAŞ, BEDAŞ ve telekom hatları resmi tutanakla kesilip mühürlenerek şantiye güvenliği sağlanır.',
        'Asbest ve tehlikeli madde tespiti yapılarak yetkili bertaraf raporu alınır.',
        'İlçe belediyesinden onaylı Yıkım Ruhsatı çıkarılır.',
        'Toz bastırmalı sulama sistemli uzun bomlu hidrolik yıkım makineleri ile çevre binalara zarar vermeden kontrollü yıkım yapılır.',
      ],
      standard: 'Binaların Yıkılması Hakkında Yönetmelik & İSG Güvenlik Protokolü',
    },
    requiredDocuments: [
      'İSKİ, İGDAŞ ve BEDAŞ ilişik kesme / sayaç söküm tutanakları',
      'Tahliye bildirim taahhütnameleri',
      'Kira yardımı müracaat formu ve hak sahibi IBAN bilgileri',
      'Noter Onaylı İnşaat Sözleşmesi',
    ],
    keyMilestone: 'Eski binanın tamamen yıkılarak arsa haline gelmesi ve kira yardımlarının hesaplara yatması.',
    tipsForResidents: 'Kira yardımı başvurularınızı e-Devlet üzerinden veya ilçe kentsel dönüşüm irtibat ofislerinden gecikmeden yapın.',
    whatsAppInquiry: 'Merhaba AB Yapı, tahliye süreci ve kira yardımı başvuruları hakkında danışmanlık almak istiyorum.',
  },
  {
    id: 'yapim',
    stepNumber: '04',
    shortTitle: 'Yeniden Yapım',
    title: '4. Ruhsatlı Yeniden Yapım & Mühendislik',
    tagline: 'Depreme tam dayanıklı C40 hazır beton ve sismik radye temel ile yeni binanın inşası.',
    duration: '12 - 18 Ay',
    responsible: 'AB Yapı Şantiye Şefliği, Bağımsız Yapı Denetim & Belediye',
    icon: Building2,
    legalAspect: {
      summary: '6306 sayılı kanun kapsamında belediye harç ve vergi muafiyetli resmi ruhsatlandırma.',
      items: [
        'Yeni binaya ait mimari, statik, mekanik ve elektrik projeleri ilgili belediyeye sunulur.',
        '6306 kanunu gereğince noter harcı, tapu tescil harcı ve belediye otopark vergilerinden %100 muafiyet sağlanır.',
        'Belediyeden resmi Yapı Ruhsatı (İnşaat İzin Belgesi) alınır.',
        'Çevre ve Şehircilik Bakanlığı Ulusal Yapı Denetim Sistemi üzerinden bağımsız denetim kuruluşu denetimi yürütür.',
      ],
      lawRef: '3194 İmar Kanunu & 4708 Yapı Denetimi Hakkında Kanun',
    },
    technicalAspect: {
      summary: '1. sınıf sismik mühendislik, C40 beton ve zengin konfor paketi donanımları.',
      items: [
        'Zemin mekaniği raporuna göre gerekirse jet-grouting veya fore kazık zemin iyileştirmesi uygulanır.',
        'Bohçalama su yalıtımlı kalın radye jeneral temel ve sismik perde duvarlar imal edilir.',
        'C35 / C40 / C50 yüksek dayanımlı hazır beton ve nervürlü B420C çelik kullanılır; her dökümde akredite kırım testleri yapılır.',
        'Dış cephede A1 sınıfı taşyünü ısı-ses yalıtımı, kompozit mimari kaplama ve opsiyonel Konfor Paketi (jeneratör, porselen tezgah, yerden ısıtma) montajı tamamlanır.',
      ],
      standard: 'TS 500 Betonarme Tasarımı & 2018 Deprem Yönetmeliği',
    },
    requiredDocuments: [
      'Belediye Onaylı Mimari, Statik, Elektrik ve Mekanik Projeler',
      'Akredite Zemin Etüt Jeolojik Raporu',
      'Resmi Yapı Ruhsatı Belgesi',
      'Bakanlık Yapı Denetim Hizmet Sözleşmesi',
    ],
    keyMilestone: 'Kaba ve ince inşaatın teknik şartnameye ve mimari projeye %100 uygun olarak tamamlanması.',
    tipsForResidents: 'AB Yapı şeffaf şantiye ilkesiyle hak sahiplerine düzenli aylık görsel ilerleme raporları ve beton döküm laboratuvar sonuçlarını sunar.',
    whatsAppInquiry: 'Merhaba AB Yapı, inşaat teknik standartlarınız ve projelerinizin yapım süreci hakkında bilgi almak istiyorum.',
  },
  {
    id: 'teslim',
    stepNumber: '05',
    shortTitle: 'İskan & Teslim',
    title: '5. İskan, Kat Mülkiyeti Tapusu & Anahtar Teslim',
    tagline: 'Resmi iskan belgesinin alınması, ferdi daire tapularının teslimi ve yeni yuvaya taşınma.',
    duration: '1 - 2 Ay',
    responsible: 'Tapu ve Kadastro Müdürlüğü, İlçe Belediyesi & AB Yapı',
    icon: Key,
    legalAspect: {
      summary: 'Arsa payından bağımsız bölüm kat mülkiyetine geçiş ve KDV muafiyetli tapu devri.',
      items: [
        'Belediye teknik heyeti inşaatı yerinde inceleyerek Yapı Kullanma İzin Belgesi (İSKAN) onayını verir.',
        'Cins tashihi yapılarak tapular "Arsa Paylı" durumdan numaralı "Kat Mülkiyeti Tapusu"na dönüştürülür.',
        'Dönüşüm kanunu kapsamında konut tesliminde KDV %20 yerine yalnızca %1 olarak uygulanır.',
        'İnşaat sözleşmesi karşılıklı eksiksiz yerine getirilerek teminat mektubu ibrası gerçekleştirilir.',
      ],
      lawRef: '634 Sayılı Kat Mülkiyeti Kanunu & 6306 Sayılı Kanun Madde 7',
    },
    technicalAspect: {
      summary: 'Kusursuz daire teslimi, asansör yeşil etiketleri ve ortak alan sistem devreye alma.',
      items: [
        'Tüm daire içi mekanik, elektrik, doğalgaz ve sıhhi tesisat basınç sızdırmazlık testleri yapılır.',
        'Bina jeneratörü, hidrofor ve su arıtma sistemleri tam otomatik devreye girme testlerinden geçirilir.',
        'Asansörler A Tipi Akredite Muayene Kuruluşu tarafından test edilerek Yeşil Etiket (Kusursuz) belgesi alır.',
        'Daire sahipleriyle birlikte yerinde teknik kabul protokolü tutularak anahtarlar teslim edilir.',
      ],
      standard: 'Yapı Kullanma İzni (İskan) & Asansör Yeşil Bilgi Etiketi Standartları',
    },
    requiredDocuments: [
      'Belediye Onaylı İskan (Yapı Kullanma İzin) Belgesi',
      'İtfaiye ve Sığınak Uygunluk Raporları',
      'Yeni Kat Mülkiyeti Tapu Senetleri',
      'Zorunlu Deprem Sigortası (DASK) Poliçeleri',
      'Daire Teslim & Kabul Tutanakları',
    ],
    keyMilestone: 'Kat maliklerinin depreme dayanıklı, sıfır, lüks yeni evlerinin anahtarlarını teslim alarak taşınması.',
    tipsForResidents: 'Yeni dairenize taşınmadan önce bireysel elektrik ve su aboneliklerinizi yeni kat mülkiyeti tapunuz ve DASK poliçenizle 1 günde açtırabilirsiniz.',
    whatsAppInquiry: 'Merhaba AB Yapı, tamamlanan projelerinizin teslim süreci ve iskan güvenceleri hakkında bilgi almak istiyorum.',
  },
];

interface KentselDonusumTimelineProps {
  whatsappNumber?: string;
  defaultStepId?: string;
}

export const KentselDonusumTimeline: React.FC<KentselDonusumTimelineProps> = ({
  whatsappNumber = '905322813536',
  defaultStepId = 'basvuru',
}) => {
  const [activeStepId, setActiveStepId] = useState<string>(defaultStepId);
  const [viewMode, setViewMode] = useState<'stepDetail' | 'fullFlow'>('stepDetail');
  const [activeTabSub, setActiveTabSub] = useState<'all' | 'legal' | 'technical'>('all');
  const [selectedStageForQuiz, setSelectedStageForQuiz] = useState<string>('01');

  const formattedWhatsapp = whatsappNumber.replace(/\D/g, '');

  const activeStep =
    TIMELINE_STEPS.find((s) => s.id === activeStepId) || TIMELINE_STEPS[0];
  const activeStepIndex = TIMELINE_STEPS.findIndex((s) => s.id === activeStep.id);

  const handleStepSelect = (stepId: string) => {
    setActiveStepId(stepId);
    trackEvent('timeline_step_select', {
      step_id: stepId,
      step_number: TIMELINE_STEPS.find((s) => s.id === stepId)?.stepNumber,
    });
  };

  const handleNextStep = () => {
    const nextIdx = (activeStepIndex + 1) % TIMELINE_STEPS.length;
    handleStepSelect(TIMELINE_STEPS[nextIdx].id);
  };

  const handlePrevStep = () => {
    const prevIdx =
      (activeStepIndex - 1 + TIMELINE_STEPS.length) % TIMELINE_STEPS.length;
    handleStepSelect(TIMELINE_STEPS[prevIdx].id);
  };

  return (
    <section
      id="kentsel-donusum-zaman-cizelgesi"
      className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-10 space-y-8 scroll-mt-24"
    >
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-teal-700" />
            <span>Hukuki & Teknik Süreç Rehberi</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Kentsel Dönüşümün 5 Aşamalı Zaman Çizelgesi
          </h2>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl leading-relaxed">
            Başvuru ve %50+1 malikler uzlaşmasından riskli yapı karot tespitine, 60+30 gün tahliye ve kira hibesinden depreme dayanıklı inşaata ve iskanlı anahtar teslime kadar tüm yasal ve teknik yol haritası.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start lg:self-end">
          <button
            onClick={() => {
              setViewMode('stepDetail');
              trackEvent('timeline_view_mode', { mode: 'stepDetail' });
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              viewMode === 'stepDetail'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            İnteraktif Adım İncelemesi
          </button>
          <button
            onClick={() => {
              setViewMode('fullFlow');
              trackEvent('timeline_view_mode', { mode: 'fullFlow' });
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              viewMode === 'fullFlow'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tüm Süreç Akışı (Özet)
          </button>
        </div>
      </div>

      {/* Visual Timeline Track / Stepper (Always Clickable) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Aşama {activeStepIndex + 1} / {TIMELINE_STEPS.length}: {activeStep.shortTitle}</span>
          <span className="hidden sm:inline">Toplam Tahmini Süre: ~14 - 22 Ay</span>
        </div>

        {/* Desktop / Tablet Horizontal Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {TIMELINE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep.id === step.id;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => handleStepSelect(step.id)}
                className={`relative flex flex-col text-left p-3.5 rounded-2xl border transition-all text-xs group ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white border-slate-900 shadow-lg shadow-slate-900/15 scale-[1.02]'
                    : isCompleted
                    ? 'bg-teal-50/60 border-teal-200 text-slate-800 hover:bg-teal-50'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between gap-1 w-full mb-2">
                  <span
                    className={`font-outfit font-black text-sm ${
                      isSelected ? 'text-teal-400' : isCompleted ? 'text-teal-700' : 'text-slate-400'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-teal-500 text-slate-950'
                        : isCompleted
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted && !isSelected ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                <div className="font-extrabold text-[13px] leading-tight line-clamp-1">
                  {step.shortTitle}
                </div>
                <div
                  className={`text-[10px] mt-1 flex items-center gap-1 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>{step.duration}</span>
                </div>

                {/* Active Indicator Arrow */}
                {isSelected && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45 border-r border-b border-slate-900 hidden sm:block" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: STEP DETAIL (DEEP DIVE) */}
      {viewMode === 'stepDetail' && (
        <div className="space-y-6 pt-2">
          {/* Active Step Hero Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-4 shadow-lg border border-slate-800 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
                  <span>Adım {activeStep.stepNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {activeStep.duration}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeStep.responsible}</span>
                </div>
                <h3 className="text-xl md:text-3xl font-extrabold font-outfit tracking-tight text-white">
                  {activeStep.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {activeStep.tagline}
                </p>
              </div>

              {/* Prev / Next Step Navigation */}
              <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                <button
                  onClick={handlePrevStep}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                  aria-label="Önceki Adım"
                >
                  Önceki
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1 shadow-md"
                  aria-label="Sonraki Adım"
                >
                  <span>Sonraki</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sub-Focus Filter Tabs (Hukuki vs. Teknik vs. Hepsi) */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mr-1">
                Detay Odaklanması:
              </span>
              <button
                onClick={() => setActiveTabSub('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  activeTabSub === 'all'
                    ? 'bg-teal-500 text-slate-950 font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Hukuki & Teknik Birlikte
              </button>
              <button
                onClick={() => setActiveTabSub('legal')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 ${
                  activeTabSub === 'legal'
                    ? 'bg-amber-400 text-slate-950 font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                Sadece Hukuki Boyut
              </button>
              <button
                onClick={() => setActiveTabSub('technical')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 ${
                  activeTabSub === 'technical'
                    ? 'bg-teal-400 text-slate-950 font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                Sadece Teknik Boyut
              </button>
            </div>
          </div>

          {/* Legal and Technical Comparison Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Legal Column */}
            {(activeTabSub === 'all' || activeTabSub === 'legal') && (
              <div
                className={`bg-white rounded-2xl border p-6 space-y-4 shadow-sm transition-all ${
                  activeTabSub === 'legal' ? 'lg:col-span-2 border-amber-300 ring-2 ring-amber-100' : 'border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm md:text-base">
                        Hukuki Süreç & Haklarınız
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Kanuni dayanak, çoğunluk kararı ve malik hakları
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    Mevzuat
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                  {activeStep.legalAspect.summary}
                </p>

                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Yasal Prosedürler:
                  </div>
                  <ul className="space-y-2">
                    {activeStep.legalAspect.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-amber-900 font-bold bg-amber-50/70 p-3 rounded-xl border border-amber-200/70">
                  <Landmark className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Resmi Dayanak: {activeStep.legalAspect.lawRef}</span>
                </div>
              </div>
            )}

            {/* Technical Column */}
            {(activeTabSub === 'all' || activeTabSub === 'technical') && (
              <div
                className={`bg-white rounded-2xl border p-6 space-y-4 shadow-sm transition-all ${
                  activeTabSub === 'technical' ? 'lg:col-span-2 border-teal-300 ring-2 ring-teal-100' : 'border-teal-200'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-teal-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm md:text-base">
                        Teknik & Mühendislik Süreci
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Saha çalışmaları, zemin etüdü, statik hesaplar ve şantiye
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                    Şantiye & Statik
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                  {activeStep.technicalAspect.summary}
                </p>

                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Uygulanan Mühendislik Standartları:
                  </div>
                  <ul className="space-y-2">
                    {activeStep.technicalAspect.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-teal-900 font-bold bg-teal-50/70 p-3 rounded-xl border border-teal-200/70">
                  <Layers className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>Teknik Standart: {activeStep.technicalAspect.standard}</span>
                </div>
              </div>
            )}
          </div>

          {/* Documents & Resident Advice Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Required Documents */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                <FileCheck2 className="w-4 h-4 text-teal-700" />
                <span>Bu Aşamada Kat Maliklerinden İstenen Evraklar</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeStep.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resident Advice & Key Milestone */}
            <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 font-extrabold text-amber-900 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Hak Sahipleri İçin Önemli Tavsiye & Hedef</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeStep.tipsForResidents}
              </p>
              <div className="pt-2 border-t border-amber-200/60 text-xs font-semibold text-amber-950 flex items-center gap-2">
                <span className="font-extrabold text-amber-800">Hedef Çıktı:</span>
                <span>{activeStep.keyMilestone}</span>
              </div>
            </div>
          </div>

          {/* Action Row for This Step */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-teal-50 via-slate-50 to-teal-50 border border-teal-200">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="text-xs font-bold text-teal-900">
                Bu aşamayla ilgili aklınıza takılan sorular mı var?
              </div>
              <div className="text-[11px] text-slate-600">
                AB Yapı kentsel dönüşüm koordinatörü ve statik mühendislerimizle anında görüşün.
              </div>
            </div>

            <a
              href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(activeStep.whatsAppInquiry)}`}
              onClick={() => trackWhatsAppClick(`timeline_step_${activeStep.id}`, activeStep.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all shrink-0 hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Bu Aşama İçin Danışın</span>
            </a>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: FULL FLOW (SUMMARY INFOGRAPHIC ROADMAP) */}
      {viewMode === 'fullFlow' && (
        <div className="space-y-4 pt-2">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-500/40 space-y-8 my-4">
            {TIMELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative group">
                  {/* Timeline Node Circle */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-8 h-8 rounded-xl bg-slate-900 text-teal-400 border-2 border-teal-500 flex items-center justify-center shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60">
                      <div>
                        <div className="text-xs font-extrabold text-teal-700 font-outfit uppercase tracking-wider">
                          Aşama {step.stepNumber} · {step.duration}
                        </div>
                        <h4 className="text-base md:text-lg font-extrabold text-slate-900">
                          {step.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-center">
                        {step.responsible}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.tagline}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                      <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60">
                        <div className="font-extrabold text-amber-900 text-[11px] mb-1 flex items-center gap-1">
                          <Scale className="w-3 h-3 text-amber-700" />
                          <span>Hukuki Özeti:</span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          {step.legalAspect.summary}
                        </p>
                      </div>

                      <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200/60">
                        <div className="font-extrabold text-teal-900 text-[11px] mb-1 flex items-center gap-1">
                          <Wrench className="w-3 h-3 text-teal-700" />
                          <span>Teknik Özeti:</span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          {step.technicalAspect.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => {
                          setActiveStepId(step.id);
                          setViewMode('stepDetail');
                        }}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                      >
                        <span>Tüm Hukuki & Teknik Maddeleri Gör</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-[11px] text-slate-500">
                        Dayanak: {step.legalAspect.lawRef}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Helper: "Binanız Şu An Hangi Aşamada?" */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Süreç Teşhis Rehberi</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold font-outfit text-white">
            Binanız şu an kentsel dönüşümün hangi aşamasında?
          </h3>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl">
            Aşağıdan binanızın mevcut durumunu seçin; sıradaki kritik adımı ve yapılması gereken hazırlığı anında görüntüleyin.
          </p>
        </div>

        {/* Stage Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: '01', label: '1. Henüz Başlamadık / Konuşuyoruz' },
            { id: '02', label: '2. Karot / Risk Tespiti Aşaması' },
            { id: '03', label: '3. Risk Kesinleşti / Tahliye Bekleniyor' },
            { id: '04', label: '4. Müteahhit & Sözleşme Aranıyor' },
            { id: '05', label: '5. Yıkıldı / İnşaat Başlayacak' },
          ].map((stage) => (
            <button
              key={stage.id}
              onClick={() => {
                setSelectedStageForQuiz(stage.id);
                trackEvent('stage_quiz_select', { stage_id: stage.id });
              }}
              className={`p-3 rounded-xl text-xs font-bold text-left transition-all ${
                selectedStageForQuiz === stage.id
                  ? 'bg-teal-500 text-slate-950 font-black shadow-md scale-[1.02]'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>

        {/* Diagnosis & Next Action Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 space-y-4">
          {selectedStageForQuiz === '01' && (
            <div className="space-y-3">
              <div className="font-extrabold text-teal-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Önerilen Öncelikli Adım: Bilgilendirme Toplantısı & İmar Çapı İncelemesi</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Komşularınızla bir araya gelerek kentsel dönüşüm niyetinizi netleştirin. Belediyeden arsanızın güncel imar durumunu öğrenin. AB Yapı olarak apartman toplantınıza mimar ve uzmanlarımızla katılarak arsanızın haklarını ve güncel %50+1 yasasını ücretsiz anlatabiliriz.
              </p>
            </div>
          )}

          {selectedStageForQuiz === '02' && (
            <div className="space-y-3">
              <div className="font-extrabold text-teal-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Önerilen Öncelikli Adım: Lisanslı Kuruluş Seçimi & İtiraz Takvimi Takibi</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tek bir kat malikinin başvurusuyla bakanlık lisanslı laboratuvardan karot ve zemin analizi yaptırabilirsiniz. Rapor onaylanıp tapuya şerh düştüğünde 15 günlük itiraz süresi başlar; bu sürede avan proje ve müteahhit tekliflerini toplamaya başlamak zaman kazandırır.
              </p>
            </div>
          )}

          {selectedStageForQuiz === '03' && (
            <div className="space-y-3">
              <div className="font-extrabold text-teal-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Önerilen Öncelikli Adım: 60 Günlük Tahliye Tebligatı & 18 Ay Kira Yardımı Başvurusu</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tahliye tebligatı geldikten sonra elektrik, su, doğalgaz sayaç kapatma tutanaklarını alın. e-Devlet üzerinden devlet kira yardımına müracaat edin. Müteahhit ile noter tasdikli sözleşme ve banka teminat mektubu olmadan binayı boşaltmayın.
              </p>
            </div>
          )}

          {selectedStageForQuiz === '04' && (
            <div className="space-y-3">
              <div className="font-extrabold text-teal-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Önerilen Öncelikli Adım: Güvenilir Müteahhit & Banka Teminat Mektubu Kriteri</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Müteahhit seçerken C40 beton sınıfı standardı, bağımsız yapı denetim garantisi, net teslim süresi ve gecikme cezası şartlarını arayın. AB Yapı olarak resmi noter sözleşmesi ve banka teminat mektubuyla binanızı güvence altına alıyoruz.
              </p>
            </div>
          )}

          {selectedStageForQuiz === '05' && (
            <div className="space-y-3">
              <div className="font-extrabold text-teal-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Önerilen Öncelikli Adım: Zemin Etüdü Onayı & Ruhsat Takvimi</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Yıkım sonrası belediye imar ve fen işlerinden ruhsat çıkarma süreci başlar. 6306 sayılı kanun kapsamında belediye harçlarından muaf olduğunuzu kontrol edin. Zemin iyileştirmesi ve radye temel dökümü ile şantiye imalatı başlar.
              </p>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              Mevcut durumunuza özel resmi yol haritası ve fizibilite raporu hazırlayalım.
            </span>
            <a
              href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(`Merhaba AB Yapı, binamız kentsel dönüşümde ${selectedStageForQuiz}. aşamada bulunuyor. Sonraki adımlar için destek almak istiyoruz.`)}`}
              onClick={() => trackWhatsAppClick('timeline_diagnosis_cta', `Stage ${selectedStageForQuiz}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow flex items-center gap-1.5 transition-all shrink-0 hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Aşamanıza Özel Destek Alın</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
