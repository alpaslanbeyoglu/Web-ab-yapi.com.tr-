import React, { useState } from 'react';
import {
  ShieldAlert,
  FileText,
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
  ChevronLeft,
  Landmark,
  Layers,
  HardHat,
  Award,
  Calendar,
  Users,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent, trackWhatsAppClick } from '../utils/analytics';

export interface TimelineStepData {
  id: string;
  stepNumber: string;
  progressPercent: number;
  icon: React.ElementType;
  tr: {
    shortTitle: string;
    title: string;
    tagline: string;
    duration: string;
    responsible: string;
    legalSummary: string;
    legalItems: string[];
    lawRef: string;
    techSummary: string;
    techItems: string[];
    techStandard: string;
    requiredDocuments: string[];
    keyMilestone: string;
    residentTips: string;
    whatsAppInquiry: string;
    nextActionAdvice: string;
  };
  en: {
    shortTitle: string;
    title: string;
    tagline: string;
    duration: string;
    responsible: string;
    legalSummary: string;
    legalItems: string[];
    lawRef: string;
    techSummary: string;
    techItems: string[];
    techStandard: string;
    requiredDocuments: string[];
    keyMilestone: string;
    residentTips: string;
    whatsAppInquiry: string;
    nextActionAdvice: string;
  };
  ar: {
    shortTitle: string;
    title: string;
    tagline: string;
    duration: string;
    responsible: string;
    legalSummary: string;
    legalItems: string[];
    lawRef: string;
    techSummary: string;
    techItems: string[];
    techStandard: string;
    requiredDocuments: string[];
    keyMilestone: string;
    residentTips: string;
    whatsAppInquiry: string;
    nextActionAdvice: string;
  };
}

export const TIMELINE_STEPS: TimelineStepData[] = [
  {
    id: 'risk-tespiti',
    stepNumber: '01',
    progressPercent: 20,
    icon: ShieldAlert,
    tr: {
      shortTitle: 'Risk Tespiti & Karot',
      title: '1. Lisanslı Risk Tespiti & Statik Karot Analizi',
      tagline: 'Binanın deprem güvenliğinin bakanlık lisanslı laboratuvar tarafından resmen incelenip tapuya işlenmesi.',
      duration: '15 - 30 Gün',
      responsible: 'Lisanslı Yapı Laboratuvarı & Kentsel Dönüşüm Başkanlığı',
      legalSummary: 'Başvuru için bina çoğunluğuna gerek yoktur; tek bir kat malikinin talebi yasal olarak yeterlidir.',
      legalItems: [
        'Kat maliklerinden herhangi birinin Çevre ve Şehircilik Bakanlığı lisanslı kuruluşuna başvurmasıyla süreç resmen başlar.',
        'Hazırlanan teknik rapor Bakanlık İl Müdürlüğü tarafından incelenir ve onaylanır.',
        'Onaylanan rapor ile tapu siciline "6306 Sayılı Kanun Kapsamında Riskli Yapıdır" şerhi tescil edilir.',
        'Tapu tebligatının tüm kat maliklerine ulaşmasından itibaren 15 gün içinde teknik heyete resmi itiraz hakkı vardır.',
      ],
      lawRef: '6306 Sayılı Kanun Madde 3 (Riskli Yapı Tespiti ve İtiraz)',
      techSummary: 'Taşıyıcı kolonlardan karot beton silindiri alınır, donatılar röntgenlenir ve sismik bilgisayar modeli simüle edilir.',
      techItems: [
        'Kritik kat kolon ve perdelerinden elmas uçlu karot makinesiyle numune silindirler alınır.',
        'Laboratuvar ortamında 7 ve 28 günlük basınç kırılma dayanımı (MPa) testleri uygulanır.',
        'Ferroscan cihazıyla kolon içindeki demir çapı, etriye sıklığı ve korozyon (paslanma) payı ölçülür.',
        '2018 Türkiye Bina Deprem Yönetmeliği (TBDY) uyarınca 3 boyutlu statik performans analizi çıkarılır.',
      ],
      techStandard: '2018 Türkiye Bina Deprem Yönetmeliği (TBDY 2018)',
      requiredDocuments: [
        'Başvuru yapan malikin güncel tapu senedi örneği',
        'T.C. Kimlik fotokopisi ve iletişim bilgileri',
        'Belediye imar arşivinden temin edilen onaylı eski statik/mimari proje (varsa)',
      ],
      keyMilestone: 'Riskli yapı tespit raporunun onaylanması ve tapu kütüğüne resmi risk şerhinin tescili.',
      residentTips: 'Karot alma işlemi binaya kesinlikle zarar vermez; boşaltılan silindir yuvaları yüksek mukavemetli grout harcı ile kapatılır.',
      whatsAppInquiry: 'Merhaba AB Yapı, binamız için lisanslı riskli yapı tespiti ve karot analizi hakkında bilgi almak istiyoruz.',
      nextActionAdvice: 'Rapor onaylandığında 15 günlük itiraz süresini beklerken, apartman komşularınızla bir araya gelip mimari teklifleri toplamaya başlayın.',
    },
    en: {
      shortTitle: 'Risk Assessment & Core Test',
      title: '1. Licensed Seismic Risk Assessment & Core Sampling',
      tagline: 'Official determination of structural safety by a ministry-licensed laboratory and registration onto the title deed.',
      duration: '15 - 30 Days',
      responsible: 'Ministry Licensed Testing Laboratory & Urban Transformation Directorate',
      legalSummary: 'No apartment majority is needed for application; a request by a single title owner is legally sufficient.',
      legalItems: [
        'The process is legally initiated upon application by any property owner to a ministry-certified laboratory.',
        'The structural risk report is submitted to the Provincial Directorate of Urbanization for verification.',
        'Upon approval, a formal annotation stating "Risky Structure under Law No. 6306" is entered into the land registry.',
        'Owners have a legal right of appeal to a technical university committee within 15 days of receiving notice.',
      ],
      lawRef: 'Law No. 6306 Article 3 (Risky Building Determination)',
      techSummary: 'Core samples are extracted from structural columns, rebars scanned, and a 3D earthquake simulation is performed.',
      techItems: [
        'Concrete core cylinders are extracted from load-bearing columns and shear walls using diamond-tipped drillers.',
        'Laboratory pressure failure tests (MPa) are conducted to measure concrete compression strength.',
        'Ferroscan electromagnetic scanning measures internal rebar diameter, stirrup spacing, and corrosion.',
        'A comprehensive 3D static computational simulation is solved according to 2018 Turkish Seismic Building Code.',
      ],
      techStandard: '2018 Turkish Building Earthquake Code (TBDY 2018)',
      requiredDocuments: [
        'Recent title deed copy of the applicant owner',
        'ID copy and verified contact information',
        'Archived architectural & structural plans from municipality records (if available)',
      ],
      keyMilestone: 'Official registration of the risky building annotation on the property registry.',
      residentTips: 'Core drilling does not weaken columns; test cavities are immediately sealed with ultra-high-strength repair grout.',
      whatsAppInquiry: 'Hello AB Yapi, we would like to get information regarding licensed building risk assessment and core testing.',
      nextActionAdvice: 'While the report is being approved, gather your building neighbors to start reviewing architectural renewal options.',
    },
    ar: {
      shortTitle: 'تقييم المخاطر وعينات الخرسانة',
      title: '١. تقييم المخاطر الإنشائية المرخص واختبار عينات الخرسانة',
      tagline: 'الفحص الرسمي لسلامة المبنى من الزلازل بواسطة مختبر مرخص من الوزارة وتسجيله في السجل العقاري.',
      duration: '١٥ - ٣٠ يوماً',
      responsible: 'مختبر فحص مرخص ومديرية التحول الحضري',
      legalSummary: 'لا يشترط وجود أغلبية للتقديم؛ يكفي قانوناً تقديم طلب من مالك حصة عقارية واحد فقط.',
      legalItems: [
        'تبدأ الإجراءات قانونياً بطلب من أي مالك شقة إلى مؤسسة مرخصة من وزارة البيئة والتطوير العمراني.',
        'يقوم المختبر بإعداد التقرير الفني واعتماده من مديرية الوزارة المختصة.',
        'يتم وضع إشارة "مبنى خطر بموجب القانون رقم 6306" رسمياً على صحيفة الطابو في السجل العقاري.',
        'يحق للمالكين الاعتراض أمام لجنة فنية خلال ١٥ يوماً من تاريخ التبليغ الرسمي.',
      ],
      lawRef: 'القانون رقم 6306 المادة 3 (تحديد المباني الخطرة والاعتراض)',
      techSummary: 'يتم استخراج أسطوانات خرسانية من الأعمدة وفحص حديد التسليح وحل نموذج زلزالي ثلاثي الأبعاد.',
      techItems: [
        'أخذ عينات أسطوانية من خرسانة الأعمدة الحاملة باستخدام أجهزة الكور الماسية.',
        'إجراء اختبارات مقاومة الضغط والكسر (MPa) في المختبرات المعتمدة.',
        'فحص أقطار حديد التسليح والكانات ونسبة الصدأ والتآكل بواسطة جهاز فيروسكان.',
        'إجراء تحليل حسابي ثلاثي الأبعاد وفقاً للائحة الزلازل التركية لعام ٢٠١٨.',
      ],
      techStandard: 'كود الزلازل التركي للمباني لعام 2018 (TBDY 2018)',
      requiredDocuments: [
        'نسخة من سند الملكية (الطابو) للمالك المتقدم بالطلب',
        'صورة الهوية وبيانات التواصل المعتمدة',
        'المخططات المعمارية والإنشائية القديمة من أرشيف البلدية (إن وجدت)',
      ],
      keyMilestone: 'اعتماد تقرير المبنى الخطر رسمياً وتثبيت الإشارة في سجل الطابو.',
      residentTips: 'أخذ عينات الكور لا يؤثر على سلامة الأعمدة؛ حيث يتم ملء الفجوات فوراً بمونة إسمنتية عالية القوة.',
      whatsAppInquiry: 'مرحباً إيه بي يابي، نود الحصول على استشارة بخصوص اختبار الكور وتقييم مخاطر المبنى.',
      nextActionAdvice: 'أثناء فترة انتظار تثبيت التقرير، اجتمع مع جيرانك في البناء لبدء استعراض العروض المعمارية والمقاولين.',
    },
  },
  {
    id: 'uzlasma-sozlesme',
    stepNumber: '02',
    progressPercent: 40,
    icon: FileText,
    tr: {
      shortTitle: '%50+1 Uzlaşma & Sözleşme',
      title: '2. Kat Malikleri %50+1 Çoğunluk Kararı & Noter Sözleşmesi',
      tagline: 'Kat malikleri kurulunda arsa payı salt çoğunluğu ile dönüşüm kararı alınması ve müteahhit sözleşmesinin imzalanması.',
      duration: '30 - 60 Gün',
      responsible: 'Kat Malikleri Kurulu & AB Yapı Hukuk & Mimarlık Heyeti',
      legalSummary: 'Eski 2/3 kuralı kalkmıştır; 6306 sayılı kanunda yapılan güncel değişiklikle arsa payının %50+1 salt çoğunluğu yeterlidir.',
      legalItems: [
        'Kat malikleri genel kurulunda arsa payı %50+1 çoğunluk ile AB Yapı mimari teklifi ve paylaşım sözleşmesi onaylanır.',
        'Alınan karar bina karar defterine imzalatılarak resmiyet kazanır.',
        'Anlaşmaya katılmayan veya imza vermeyen maliklere noter aracılığıyla 15 günlük yasal ihtarname tebliğ edilir.',
        'Süresi içinde katılmayan paylar, Bakanlık/Belediye gözetiminde diğer paydaşlara açık artırmayla satılabilir.',
        'Tüm anlaşan maliklerle noter tasdikli Kat Karşılığı / İnşaat Taahhüt Sözleşmesi imzalanır ve teminat mektubu teslim edilir.',
      ],
      lawRef: '6306 Sayılı Kanun Madde 6 (Salt Çoğunluk Hükmü)',
      techSummary: 'İmar çapı, yol kotu ve avan mimari kütle planları çıkarılarak bağımsız bölümlerin şerefiye paylaşım matrisi belirlenir.',
      techItems: [
        'İlçe belediyesinden güncel imar durum belgesi (imar çapı) ve aplikasyon krokisi temin edilir.',
        'Arsanın emsal, kat yüksekliği ve TAKS/KAKS katsayılarına göre modern avan mimari proje çizilir.',
        'SPK lisanslı şerefiye değerleme kriterlerine göre adil daire dağılım tablosu oluşturulur.',
        'Kat maliklerinin iç mekan isteklerine göre (oda sayısı, balkon, banyo vb.) mimari kat planları netleştirilir.',
      ],
      techStandard: 'İmar Yönetmeliği & SPK Lisanslı Şerefiye Dağılım İlkeleri',
      requiredDocuments: [
        'Tüm bağımsız bölümlere ait güncel tapu senedi fotokopileri',
        'Kat Malikleri Karar Defteri ve toplantı imza tutanağı',
        'Noterden onaylı yetkilendirme ve sözleşme imza beyannameleri',
        'Belediye güncel İmar Çapı Belgesi',
      ],
      keyMilestone: '%50+1 arsa payı salt çoğunluğu ile noter onaylı resmi inşaat sözleşmesinin imzalanması.',
      residentTips: 'Şeffaf ve huzurlu bir süreç için AB Yapı mimar ve hukukçularını apartman toplantınıza davet edin; tüm maliklerin hakları noter sözleşmesiyle korunur.',
      whatsAppInquiry: 'Merhaba AB Yapı, apartmanımızda %50+1 çoğunluk toplantısı ve kat paylaşım sözleşmesi için toplantı desteği rica ediyoruz.',
      nextActionAdvice: 'Noter sözleşmesi tamamlandığında, tahliye tebligatı sürecine ve devlet kira yardımı evraklarının hazırlanmasına geçin.',
    },
    en: {
      shortTitle: '50%+1 Agreement & Contract',
      title: '2. 50%+1 Simple Majority Decision & Notarized Contract',
      tagline: 'Approval of the urban renewal proposal with simple majority of land shares and signing the formal notarized contract.',
      duration: '30 - 60 Days',
      responsible: 'Board of Flat Owners & AB Yapi Legal and Architecture Team',
      legalSummary: 'The previous 2/3 majority requirement was repealed; 50%+1 simple majority of land shares is now fully sufficient.',
      legalItems: [
        'The reconstruction proposal is approved with 50%+1 land share majority at the general assembly of property owners.',
        'The decision is officially recorded and signed in the apartment building decision ledger.',
        'A 15-day formal notarized notice is served to any dissenting or non-attending property owners.',
        'Shares of owners who fail to participate within 15 days can be auctioned to the remaining co-owners under official supervision.',
        'A Notarized Flat-for-Land Construction Contract is executed along with bank performance guarantee letters.',
      ],
      lawRef: 'Law No. 6306 Article 6 (Simple Majority Clause)',
      techSummary: 'Zoning permits and preliminary architectural layouts are drafted to establish fair property allocation matrices.',
      techItems: [
        'Official zoning status certificates and road elevation markers are procured from the municipality.',
        'Architectural preliminary mass models are designed taking into account parcel floor-area ratios (FAR).',
        'A transparent flat distribution matrix is established based on certified valuation and goodwill criteria.',
        'Floor plans are refined to accommodate owners\' spatial preferences (rooms, open balconies, layouts).',
      ],
      techStandard: 'Municipal Zoning Regulations & Certified Appraisal Standards',
      requiredDocuments: [
        'Updated title deed copies for all units',
        'Building Owners\' Meeting Decision Ledger with attendance signatures',
        'Notarized Power of Attorney / representation forms',
        'Official Zoning Certificate issued by district municipality',
      ],
      keyMilestone: 'Execution of the notarized construction agreement with 50%+1 simple majority.',
      residentTips: 'Invite AB Yapi architectural and legal teams to your apartment meeting for clear, binding, and transparent terms.',
      whatsAppInquiry: 'Hello AB Yapi, we need meeting assistance and contract formulation for our 50%+1 apartment majority.',
      nextActionAdvice: 'Once the notarized contract is executed, begin preparing eviction notices and rental subsidy application documents.',
    },
    ar: {
      shortTitle: 'أغلبية ٥٠٪+١ والعقد',
      title: '٢. قرار أغلبية ٥٠٪+١ في حصص الأرض وتوقيع عقد النوتر',
      tagline: 'اتخاذ قرار التحول الحضري بالأغلبية البسيطة لأسهم الأرض وتوقيع عقد البناء الرسمي لدى كاتب العدل.',
      duration: '٣٠ - ٦٠ يوماً',
      responsible: 'مجلس مالكي الشقق والفريق القانوني والمعماري لشركة إيه بي يابي',
      legalSummary: 'تم إلغاء شرط أغلبية الثلثين القديم؛ يكفي الآن قانوناً الأغلبية البسيطة (٥٠٪+١) من أسهم الأرض.',
      legalItems: [
        'الموافقة على العرض المعماري وتقاسم الشقق في اجتماع المالكين بنسبة ٥٠٪+١ من حصص الأرض.',
        'تسجيل القرار وتوقيعه رسمياً في دفتر قرارات البناء.',
        'إرسال إخطار عدلي رسمي (نوتر) لمدة ١٥ يوماً للمالكين المعارضين أو الغائبين.',
        'يمكن بيع حصص غير الموافقين بالمزاد العلني بين المالكين الآخرين بإشراف رسمي من الوزارة أو البلدية.',
        'توقيع عقد البناء الرسمي الموثق لدى كاتب العدل (النوتر) وتقديم خطاب ضمان بنكي للمالكين.',
      ],
      lawRef: 'القانون رقم 6306 المادة 6 (حكم الأغلبية البسيطة)',
      techSummary: 'استخراج المخطط التنظيمي وحساب المساحات وتصميم المساقط المعمارية وتوزيع الشقق بعدالة.',
      techItems: [
        'استخراج وثيقة المخطط التنظيمي والإحداثيات من بلدية المنطقة.',
        'رسم المخطط المعماري الأولي الحديث وفقاً لمعامل البناء والارتفاع المسموح.',
        'إعداد جدول تقاسم الحصص والشقق وفق معايير التقييم العقاري المعتمدة.',
        'تحديد توزيع الغرف والمساحات الداخلية بالتوافق مع رغبات مالكي الشقق.',
      ],
      techStandard: 'لائحة التنظيم العمراني ومعايير التقييم العقاري المعتمدة',
      requiredDocuments: [
        'نسخ حديثة من سندات الملكية (الطابو) لجميع الشقق',
        'دفتر قرارات البناء ومحضر توقيع اجتماع المالكين',
        'وكالات وتوكيلات كاتب العدل المعتمدة',
        'وثيقة المخطط التنظيمي الصادرة من البلدية',
      ],
      keyMilestone: 'توقيع عقد البناء الموثق لدى النوتر بأغلبية ٥٠٪+١ من حصص الأرض.',
      residentTips: 'احرص على دعوة مهندسي ومحامي إيه بي يابي لاجتماع البناء لضمان الشفافية الكاملة وتوثيق حقوق الجميع.',
      whatsAppInquiry: 'مرحباً إيه بي يابي، نود تنظيم اجتماع لمالكي البناء وتجهيز مسودة عقد النوتر لأغلبية ٥٠٪+١.',
      nextActionAdvice: 'بعد إتمام العقد، ابدأ في تجهيز إجراءات الإخلاء والتقديم على دعم الإيجار الحكومي لمدة ١٨ شهراً.',
    },
  },
  {
    id: 'tahliye-yikim',
    stepNumber: '03',
    progressPercent: 60,
    icon: Truck,
    tr: {
      shortTitle: 'Tahliye & Yıkım',
      title: '3. Güvenli Tahliye, Devlet Kira Desteği & Kontrollü Yıkım',
      tagline: 'Binanın boşaltılması, 18 aylık geri ödemesiz kira hibesinin başlaması ve güvenli çevre önlemleriyle yıkım.',
      duration: '60 - 90 Gün',
      responsible: 'İlçe Belediyesi İmar/Yıkım Müdürlüğü, Kat Malikleri & AB Yapı Yıkım Ekibi',
      legalSummary: 'Tahliye süreci yasal koruma altındadır; ev sahiplerine 18 ay kira desteği, kiracılara ise taşınma yardımı verilir.',
      legalItems: [
        'Riskli yapı kesinleşince belediye tarafından maliklere 60 gün yasal tahliye süresi verilir (gerekirse +30 gün ek süre).',
        'Tahliye edilen bağımsız bölümlerdeki ev sahipleri için 18 ay boyunca geri ödemesiz devlet kira desteği başlar.',
        'Kiracılara tek seferlik taşınma yardımı desteği sağlanır.',
        'Tüm bağımsız bölümlere noter, tapu tescil harcı ve damga vergisi muafiyeti tanımlanır.',
      ],
      lawRef: '6306 Sayılı Kanun Madde 5 & Çevre ve Şehircilik Bakanlığı Kira Yardımı Kılavuzu',
      techSummary: 'Altyapı hatları kesilir, asbest bertaraf edilir ve sulamalı iş makineleriyle komşu binalar korunarak yıkım yapılır.',
      techItems: [
        'İSKİ, İGDAŞ, BEDAŞ ve telekomünikasyon hatları resmi tutanakla kapatılıp mühürlenir.',
        'Lisanslı uzmanlarca asbest ve tehlikeli madde tespiti yapılarak bertaraf raporu düzenlenir.',
        'Belediyeden onaylı resmi Yıkım Ruhsatı çıkarılır.',
        'Toz bastırmalı basınçlı sulama sistemleri ve çevre güvenlik bariyerleri eşliğinde kontrollü yıkım tamamlanır.',
        'Hafriyat molozları lisanslı döküm sahalarına taşınarak arsa inşaata hazır zemin kotuna getirilir.',
      ],
      techStandard: 'Binaların Yıkılması Hakkında Yönetmelik & İSG Şantiye Güvenliği',
      requiredDocuments: [
        'İSKİ, İGDAŞ ve BEDAŞ sayaç söküm / ilişik kesme tutanakları',
        'e-Devlet veya Bakanlık üzerinden yapılan Kira Yardımı Müracaat Formu',
        'Hak sahibi IBAN bilgileri ve ikametgah belgesi',
        'Belediye Yıkım Ruhsatı Belgesi',
      ],
      keyMilestone: 'Eski riskli binanın yıkılarak arsa haline gelmesi ve kira yardımlarının banka hesaplarına yatması.',
      residentTips: 'Kira yardımı başvurunuzu bina tahliye edilir edilmez e-Devlet üzerinden yapın; ilk ödeme genellikle yıkım ruhsatını takip eden ay başlar.',
      whatsAppInquiry: 'Merhaba AB Yapı, tahliye süreci, belediye yıkım ruhsatı ve devlet kira yardımı başvuruları hakkında bilgi almak istiyorum.',
      nextActionAdvice: 'Yıkım tamamlanıp arsa düzleştirildiğinde belediyeden yeni inşaat ruhsatı (Yapı Ruhsatı) alma aşamasına geçilir.',
    },
    en: {
      shortTitle: 'Eviction & Demolition',
      title: '3. Safe Eviction, Government Rent Aid & Controlled Demolition',
      tagline: 'Vacating the building, activating 18-month non-refundable state rent subsidies, and controlled eco-safe demolition.',
      duration: '60 - 90 Days',
      responsible: 'District Municipality Demolition Directorate, Owners & AB Yapi Demolition Crew',
      legalSummary: 'Eviction is legally protected; home owners receive 18 months of rent grants and tenants receive relocation assistance.',
      legalItems: [
        'Municipal authorities grant owners 60 days of legal evacuation time (+30 days extension if required).',
        '18 months of monthly non-refundable government rent aid is activated for evacuated resident property owners.',
        'Tenants receive a one-time relocation moving allowance.',
        'Exemptions from notary fees, land registry fees, and municipal stamp duties are applied under Law No. 6306.',
      ],
      lawRef: 'Law No. 6306 Article 5 & Ministry Rental Assistance Guidelines',
      techSummary: 'Utilities are disconnected, hazardous asbestos abated, and dust-suppressed hydraulic machinery razes the building safely.',
      techItems: [
        'Water, gas, electricity, and telecommunication lines are disconnected and officially sealed.',
        'Hazardous materials and asbestos surveys are performed by certified laboratories prior to razing.',
        'A formal Municipal Demolition Permit is issued.',
        'Controlled hydraulic demolition with pressurized mist dust suppression prevents disturbance to adjoining properties.',
        'Debris is transported to licensed disposal sites, preparing clean ground for structural excavation.',
      ],
      techStandard: 'Demolition of Structures Regulation & Occupational Site Safety Standards',
      requiredDocuments: [
        'Utility clearance certificates (Water, Electricity, Natural Gas meter removal)',
        'Government Rental Aid Application filed via e-Government or provincial directorate',
        'Title owner IBAN and residence certificate',
        'Municipal Demolition Permit',
      ],
      keyMilestone: 'Total razing of the hazard, conversion to clean building land, and commencement of state rent subsidies.',
      residentTips: 'Submit your rental subsidy application on e-Government immediately after vacating; initial deposits usually arrive following demolition verification.',
      whatsAppInquiry: 'Hello AB Yapi, we need guidance on eviction timelines, demolition permits, and government rental subsidies.',
      nextActionAdvice: 'Once demolition is complete and the site is leveled, proceed to ground improvement engineering and Building Permit issuance.',
    },
    ar: {
      shortTitle: 'الإخلاء والهدم',
      title: '٣. الإخلاء الآمن، دعم الإيجار الحكومي والهدم المحكوم',
      tagline: 'إخلاء المبنى بأمان، بدء صرف دعم الإيجار الحكومي لمدة ١٨ شهراً، والهدم تحت تدابير السلامة البيئية.',
      duration: '٦٠ - ٩٠ يوماً',
      responsible: 'مديرية الهدم في البلدية، الملاك، وفريق هدم إيه بي يابي',
      legalSummary: 'إجراءات الإخلاء خاضعة للحماية القانونية؛ يحصل أصحاب الشقق على دعم إيجار لمدة ١٨ شهراً، والمستأجرون على بدل نقل.',
      legalItems: [
        'تمنح البلدية مهلة قانونية مدتها ٦٠ يوماً للإخلاء بعد اعتماد المبنى كخطر (مع إمكانية تمديد ٣٠ يوماً).',
        'يبدأ صرف دعم إيجار شهري غير مسترد من الدولة لمدة ١٨ شهراً لمالكي الشقق المقيمين.',
        'يحصل المستأجرون في المبنى على مساعدة نقل وانتقال تُدفع لمرة واحدة.',
        'إعفاء كامل بنسبة ١٠٠٪ من رسوم النوتر، رسوم الطابو، ورسوم البلدية بموجب القانون رقم 6306.',
      ],
      lawRef: 'القانون رقم 6306 المادة 5 ودليل دعم الإيجار لوزارة البيئة والتطوير العمراني',
      techSummary: 'فصل شبكات البنية التحتية، إزالة الأسبستوس، وهدم محكوم بآلات مجهزة برشاشات مياه لمنع الغبار.',
      techItems: [
        'فصل وتشميع عدادات الغاز الطبيعي والماء والكهرباء والاتصالات بمحاضر رسمية.',
        'إجراء فحص الأسبستوس والمواد الخطرة بواسطة خبراء مرخصين والحصول على تقرير التخلص الآمن.',
        'استخراج رخصة الهدم الرسمية المعتمدة من البلدية.',
        'تنفيذ الهدم المحكوم بآليات متطورة مع رش المياه المضغوطة لحماية الأبنية المجاورة من الغبار والاهتزاز.',
        'نقل الردم إلى المقالب المعتمدة وتجهيز منسوب الأرض للحفر الإنشائي.',
      ],
      techStandard: 'لائحة هدم المباني وبروتوكولات السلامة والصحة المهنية',
      requiredDocuments: [
        'محاضر فك العدادات وبراءة الذمة من شركات الماء والغاز والكهرباء',
        'نموذج طلب دعم الإيجار الحكومي عبر بوابة الحكومة الإلكترونية (e-Devlet)',
        'بيانات الحساب البنكي (IBAN) للمالك وسند الإقامة',
        'رخصة الهدم الرسمية الصادرة من البلدية',
      ],
      keyMilestone: 'هدم البناء الخطر بالكامل، تسوية قطعة الأرض، وبدء إيداع دفعات الإيجار في الحسابات.',
      residentTips: 'قدّم على دعم الإيجار فور إخلاء الشقة عبر بوابة e-Devlet؛ حيث تبدأ الدفعات عادة بعد استخراج رخصة الهدم.',
      whatsAppInquiry: 'مرحباً إيه بي يابي، نود الاستفسار عن تفاصيل مهلة الإخلاء، رخصة الهدم، والتقديم على دعم الإيجار الحكومي.',
      nextActionAdvice: 'بمجرد تنظيف الأرض، نبدأ فوراً في استخراج رخصة البناء الجديدة واختبارات تحسين التربة.',
    },
  },
  {
    id: 'ruhsatli-insaat',
    stepNumber: '04',
    progressPercent: 80,
    icon: Building2,
    tr: {
      shortTitle: 'Ruhsat & C40 İnşaat',
      title: '4. Resmi Yapı Ruhsatı & Depreme Dayanıklı C40 İnşaat',
      tagline: 'Sismik radye temel, C40/50 hazır beton ve bağımsız yapı denetim ile sıfırdan depreme tam güvenli inşaat.',
      duration: '12 - 18 Ay',
      responsible: 'AB Yapı Şantiye Şefliği, Bağımsız Yapı Denetim Firması & Belediye Fen İşleri',
      legalSummary: '3194 İmar Kanunu ve 6306 vergi muafiyetleriyle belediye onaylı yasal Yapı Ruhsatı çıkarılır.',
      legalItems: [
        'Mimari, statik, mekanik, elektrik ve zemin etüt projeleri belediye teknik kurullarınca onaylanır.',
        '6306 kanunu güvencesiyle belediye harçları ve otopark vergilerinden %100 muafiyet uygulanır.',
        'Resmi Yapı Ruhsatı (İnşaat İzin Belgesi) tescil edilir.',
        'T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Ulusal Yapı Denetim Sistemi üzerinden atanan bağımsız yapı denetim firması her aşamayı denetler.',
      ],
      lawRef: '3194 İmar Kanunu & 4708 Yapı Denetimi Kanunu',
      techSummary: 'Radye temel, C40 beton sınıfı, perde duvarlar, A1 sınıfı taşyünü yalıtım ve Konfor Paketi imalatı.',
      techItems: [
        'Zemin mekaniği raporuna göre gerekirse jet-grouting veya fore kazık zemin iyileştirmesi uygulanır.',
        'Su yalıtımlı bohçalamalı radye jeneral temel ve sismik perde kolonlar imal edilir.',
        'C35 / C40 / C50 yüksek dayanımlı hazır beton ve B420C nervürlü çelik kullanılır; her dökümde laboratuvar kırım testleri yapılır.',
        'A1 sınıfı taşyünü ses ve ısı yalıtımlı modern dış cephe kaplamaları uygulanır.',
        'Opsiyonel Konfor Paketi donanımları (yerden ısıtma, jeneratör, porselen tezgah, akıllı diafon) monte edilir.',
      ],
      techStandard: 'TS 500 Betonarme Tasarımı & 2018 Türkiye Bina Deprem Yönetmeliği',
      requiredDocuments: [
        'Belediye Onaylı Ruhsat Projeleri (Mimari, Statik, Mekanik, Elektrik)',
        'Akredite Jeolojik Zemin Etüt Raporu',
        'Resmi Yapı Ruhsatı Belgesi',
        'Bakanlık Yapı Denetim Sözleşmesi ve Hakediş Tutanakları',
      ],
      keyMilestone: 'Kaba ve ince inşaatın statik şartnameye ve mimari projeye %100 uygun olarak eksiksiz tamamlanması.',
      residentTips: 'AB Yapı şeffaf şantiye modeliyle hak sahiplerine aylık görüntülü ilerleme raporları ve beton laboratuvar kırım raporlarını düzenli olarak iletir.',
      whatsAppInquiry: 'Merhaba AB Yapı, C40 betonarme inşaat standartlarınız, yapı denetim süreçleri ve şantiye takviminiz hakkında bilgi almak istiyorum.',
      nextActionAdvice: 'İnşaatın ince işleri bittiğinde daire kabul kontrollerine ve belediyeden iskan (Yapı Kullanma İzni) müracaatına geçilir.',
    },
    en: {
      shortTitle: 'Permit & C40 Construction',
      title: '4. Official Building Permit & C40 Seismic Construction',
      tagline: 'Constructing the brand new earthquake-proof building with raft foundations, C40 concrete, and certified building inspection.',
      duration: '12 - 18 Months',
      responsible: 'AB Yapi Site Management, Independent Building Inspection Firm & Municipality Engineers',
      legalSummary: 'Building permit is issued under Law No. 3194 with 100% municipal tax and fee exemptions under Law No. 6306.',
      legalItems: [
        'Architectural, structural, mechanical, electrical, and geotechnical designs are approved by municipal boards.',
        '100% exemption from municipality building fees and parking taxes is granted under Law No. 6306.',
        'Official Building Permit (Construction License) is registered.',
        'An independent building inspection firm appointed via the Ministry\'s National Inspection Registry audits every phase.',
      ],
      lawRef: 'Zoning Law No. 3194 & Building Inspection Law No. 4708',
      techSummary: 'Heavy raft foundation, C40 concrete, seismic shear walls, class A1 acoustic/thermal rockwool, and premium comfort finishes.',
      techItems: [
        'Soil engineering measures such as jet-grouting or bored piles are installed if ground mechanics demand reinforcement.',
        'Tanked waterproofed continuous raft foundation and lateral seismic shear walls are cast.',
        'C35 / C40 / C50 high-strength ready-mix concrete and ribbed B420C steel are utilized; laboratory crush tests certify every pour.',
        'Non-combustible Class A1 rockwool thermal and acoustic exterior facade systems are installed.',
        'Optional Comfort Package amenities (underfloor heating, building backup generator, porcelain countertops) are installed.',
      ],
      techStandard: 'TS 500 Reinforced Concrete Design & 2018 Seismic Building Code',
      requiredDocuments: [
        'Approved Architectural, Structural, Mechanical & Electrical Design Sets',
        'Certified Geotechnical Soil Survey Report',
        'Official Building Permit Certificate',
        'Ministry Building Inspection Contract and Milestone Progress Deeds',
      ],
      keyMilestone: '100% structural and architectural completion strictly abiding by the engineering specification.',
      residentTips: 'AB Yapi operates a transparent construction model, sending monthly photographic progress reports and concrete laboratory break test certificates to all owners.',
      whatsAppInquiry: 'Hello AB Yapi, we would like detailed information regarding your C40 seismic concrete standards and construction schedule.',
      nextActionAdvice: 'As finishing touches near completion, schedule on-site flat inspection walks and apply for the Municipal Occupancy Permit (İskan).',
    },
    ar: {
      shortTitle: 'الرخصة وبناء خرسانة C40',
      title: '٤. رخصة البناء الرسمية والتشييد المقاوم للزلازل بخرسانة C40',
      tagline: 'بناء المبنى الجديد بأحدث معايير الأمان الزلزالي وأساسات الحصيرة وخرسانة C40/50 ورقابة هندسية مستقلة.',
      duration: '١٢ - ١٨ شهراً',
      responsible: 'إدارة الموقع في إيه بي يابي، شركة فحص البناء المستقلة، وقسم الشؤون الفنية في البلدية',
      legalSummary: 'استخراج رخصة البناء الرسمية بموجب قانون الإعمار 3194 مع إعفاء كامل من رسوم البلدية بموجب القانون 6306.',
      legalItems: [
        'اعتماد المخططات المعمارية والإنشائية والميكانيكية والكهربائية وفحص التربة من لجان البلدية الفنية.',
        'إعفاء كامل بنسبة ١٠٠٪ من ضرائب ورسوم البلدية ومواقف السيارات بموجب القانون رقم 6306.',
        'إصدار رخصة البناء الرسمية (تصريح بدء التشييد).',
        'تتولى شركة تدقيق هندسي مستقلة معينة عبر نظام فحص المباني الوطني التابع للوزارة مراقبة وتوثيق كل مرحلة صب.',
      ],
      lawRef: 'قانون الإعمار رقم 3194 وقانون الرقابة على المباني رقم 4708',
      techSummary: 'أساسات حصيرة معزولة، خرسانة مسلحة C40، عزل حراري وصوتي بصوف صخري، ومواصفات حزمة الراحة.',
      techItems: [
        'تنفيذ أعمال تحسين التربة (أوتاد حفرية أو حقن) في حال أظهرت تقارير ميكانيكا التربة حاجة لذلك.',
        'صب أساسات حصيرة عامة مع عزل مائي كامل وجدران قص زلزالية محيطية.',
        'استخدام خرسانة جاهزة عالية المقاومة من فئة C35/C40/C50 وحديد تسليح حلزوني عالي المتانة B420C مع اختبارات كسر معملية لكل صبة.',
        'تركيب واجهات معمارية عازلة للحرارة والصوت باستخدام الصوف الصخري المقاوم للحريق من فئة A1.',
        'تركيب تجهيزات حزمة الراحة الاختيارية (تدفئة أرضية، مولد كهربائي، أسطح بورسلين، اتصال ذكي).',
      ],
      techStandard: 'كود تصميم الخرسانة المسلحة TS 500 وكود الزلازل التركي 2018',
      requiredDocuments: [
        'مجموعات المخططات المعتمدة من البلدية (معماري، إنشائي، ميكانيكي، كهربائي)',
        'تقرير فحص التربة الجيولوجي المعتمد',
        'وثيقة رخصة البناء الرسمية الصادرة من البلدية',
        'عقد التدقيق الهندسي للوزارة ومحاضر تقدم مراحل الإنجاز',
      ],
      keyMilestone: 'إتمام الهيكل الإنشائي والتشطيبات بالكامل بنسبة ١٠٠٪ وفق المواصفات الفنية المعتمدة.',
      residentTips: 'تعتمد إيه بي يابي مبدأ الموقع الشفاف؛ حيث ترسل للمالكين تقارير مصورة شهرية مع نتائج اختبارات كسر الخرسانة المعملية بانتظام.',
      whatsAppInquiry: 'مرحباً إيه بي يابي، نود الاطلاع على المعايير الهندسية لخرسانة C40 وجدول مراحل البناء الزمني لديكم.',
      nextActionAdvice: 'مع انتهاء التشطيبات الداخلية، ننتقل مباشرة إلى مرحلة الفحص الميداني واستخراج رخصة السكن (الإسكان).',
    },
  },
  {
    id: 'iskan-anahtar-teslim',
    stepNumber: '05',
    progressPercent: 100,
    icon: Key,
    tr: {
      shortTitle: 'İskan & Anahtar Teslim',
      title: '5. Resmi İskan (Yapı Kullanma İzni), Kat Mülkiyeti & Anahtar Teslim',
      tagline: 'Resmi iskan belgesinin alınması, bağımsız kat mülkiyeti tapularının dağıtılması ve yeni güvenli yuvaya taşınma.',
      duration: '1 - 2 Ay',
      responsible: 'Tapu ve Kadastro Müdürlüğü, İlçe Belediyesi İmar Heyeti & AB Yapı',
      legalSummary: 'Arsa payından ferdi kat mülkiyetine geçilir; kentsel dönüşüm kanunu gereğince KDV yalnızca %1 olarak uygulanır.',
      legalItems: [
        'Belediye teknik heyeti inşaatı yerinde denetleyerek onaylı projeye %100 uyumu tespit eder ve resmi Yapı Kullanma İzin Belgesi (İSKAN) verir.',
        'Tapu dairesinde cins tashihi yapılarak arsa paylı tapular bağımsız bölüm "Kat Mülkiyeti Tapusu"na dönüştürülür.',
        '6306 sayılı kanun kapsamında konut teslimlerinde genel KDV (%20) yerine indirimli %1 KDV avantajı uygulanır.',
        'İnşaat sözleşmesinde taahhüt edilen şartlar eksiksiz yerine getirilerek karşılıklı ibraname ve teminat mektubu iadesi yapılır.',
      ],
      lawRef: '634 Sayılı Kat Mülkiyeti Kanunu & 6306 Sayılı Kanun Madde 7',
      techSummary: 'Tüm mekanik, elektrik ve asansör sistemleri test edilir; yeşil etiket onayları ile daire anahtarları teslim edilir.',
      techItems: [
        'Tüm daire içi mekanik, elektrik, sıhhi tesisat ve doğalgaz boruları basınç sızdırmazlık testlerinden geçirilir.',
        'Bina jeneratörü, hidrofor ve yangın duman tahliye sistemlerinin tam otomatik devreye girme testleri yapılır.',
        'Asansörler A Tipi Akredite Muayene Kuruluşunca denetlenerek Kusursuz (Yeşil Etiket) belgesi alır.',
        'Kat maliki ile birlikte yerinde bağımsız bölüm teknik kabul tutanağı düzenlenerek anahtarlar teslim edilir.',
      ],
      techStandard: 'Yapı Kullanma İzni (İskan) & Asansör Yeşil Bilgi Etiketi Standartları',
      requiredDocuments: [
        'Belediye Onaylı İskan (Yapı Kullanma İzin) Belgesi',
        'İtfaiye ve Sığınak Uygunluk Raporları',
        'Bağımsız Bölüm Kat Mülkiyeti Tapu Senetleri',
        'Zorunlu Deprem Sigortası (DASK) Poliçeleri',
        'Daire Teslim & Kabul Protokol Tutanakları',
      ],
      keyMilestone: 'Kat maliklerinin sıfır, depreme dayanıklı, iskanlı ve kat mülkiyetli yeni evlerinin anahtarlarını alıp taşınması.',
      residentTips: 'Yeni evinize taşınmadan önce bireysel elektrik, su ve doğalgaz aboneliklerinizi yeni kat mülkiyeti tapunuz ve DASK poliçenizle aynı gün açtırabilirsiniz.',
      whatsAppInquiry: 'Merhaba AB Yapı, tamamlanan projelerinizin teslim standartları, iskan garantisi ve yeni projeleriniz hakkında bilgi almak istiyorum.',
      nextActionAdvice: 'Tebrikler! Güvene yükselen, depreme tam dayanıklı yeni yuvanızda ailenizle huzurla yaşayabilirsiniz.',
    },
    en: {
      shortTitle: 'Occupancy & Key Delivery',
      title: '5. Official Occupancy Permit (İskan), Title Deeds & Key Handover',
      tagline: 'Procuring the official occupancy permit, delivering individualized freehold title deeds, and moving into your earthquake-safe home.',
      duration: '1 - 2 Months',
      responsible: 'Land Registry Office, District Municipality Inspection Directorate & AB Yapi',
      legalSummary: 'Land shares convert into separate freehold property titles; VAT is reduced to just 1% under urban transformation laws.',
      legalItems: [
        'Municipal technical engineers conduct on-site audits, certifying 100% adherence to blueprints to grant the Occupancy Permit (İskan).',
        'Land registry titles are converted from raw shared ground titles to individualized Freehold Condominium Deeds (Kat Mülkiyeti).',
        'Instead of the standard 20% VAT, a preferential 1% VAT rate is applied to residential unit handovers under Law No. 6306.',
        'Mutual release covenants are executed and bank performance guarantees are released upon total contractual fulfillment.',
      ],
      lawRef: 'Condominium Law No. 634 & Urban Renewal Law No. 6306 Article 7',
      techSummary: 'Pressure seal tests, elevator green tag certification, and automatic backup generators are commissioned prior to handover.',
      techItems: [
        'Gas, electrical, and plumbing circuits undergo rigorous high-pressure seal and electrical insulation testing.',
        'Building backup generator, booster water pumps, and fire smoke evacuation systems are automated and verified.',
        'Elevators are inspected by accredited Type-A certification bodies, earning the Green Safety Sticker (Flawless).',
        'A comprehensive room-by-room technical acceptance walkthrough is conducted with each owner prior to key turnover.',
      ],
      techStandard: 'Municipal Occupancy Permit (İskan) & Accredited Green Tag Elevator Standards',
      requiredDocuments: [
        'Municipality Approved Occupancy Permit (İskan)',
        'Fire Brigade & Shelter Safety Compliance Approvals',
        'Individual Condominium Title Deeds (Kat Mülkiyeti)',
        'Mandatory Earthquake Insurance (DASK) Policies',
        'Unit Handover & Acceptance Deeds',
      ],
      keyMilestone: 'Owners receiving the keys to their brand-new, earthquake-resistant, fully licensed, and deeded apartments.',
      residentTips: 'You can connect personal electricity, water, and natural gas utility accounts in a single day using your new title deed and DASK policy.',
      whatsAppInquiry: 'Hello AB Yapi, we would like information about your occupancy permit guarantees and handover standards.',
      nextActionAdvice: 'Congratulations! You and your family can now move peacefully into your safe, code-compliant, modern home.',
    },
    ar: {
      shortTitle: 'رخصة السكن وتسليم المفتاح',
      title: '٥. رخصة السكن الرسمية (الإسكان)، سندات الملكية التامة وتسليم المفاتيح',
      tagline: 'استخراج وثيقة الإسكان الرسمية، توزيع سندات الملكية التامة (Kat Mülkiyeti)، والانتقال للمنزل الجديد المقاوم للزلازل.',
      duration: '١ - ٢ شهر',
      responsible: 'مديرية الطابو والسجل العقاري، قسم الإشراف في البلدية، وشركة إيه بي يابي',
      legalSummary: 'التحويل من حصة أرض إلى طابو ملكية تامة مستقل؛ وتخفيض ضريبة القيمة المضافة (KDV) إلى ١٪ فقط.',
      legalItems: [
        'تقوم لجنة البلدية الفنية بفحص المبنى في الموقع والتأكد من مطابقته للمخططات بنسبة ١٠٠٪ لمنح رخصة السكن (الإسكان).',
        'تحويل سندات الملكية في الطابو من حصص أرض إلى سندات ملكية تامة للشقق (Kat Mülkiyeti).',
        'تطبيق نسبة ضريبة قيمة مضافة مخفضة ١٪ بدلاً من ٢٠٪ على تسليم الوحدات السكنية بموجب القانون رقم 6306.',
        'إتمام بنود عقد البناء بالكامل وتبادل براءات الذمة واسترداد خطابات الضمان البنكية بعد الوفاء بجميع الالتزامات.',
      ],
      lawRef: 'قانون الملكية الطابقية رقم 634 والقانون رقم 6306 المادة 7',
      techSummary: 'فحص ضغط التمديدات، ترخيص المصاعد بالملصق الأخضر، وتشغيل المولدات والمضخات وتسليم المفاتيح.',
      techItems: [
        'إجراء اختبارات ضغط وعزل شبكات الغاز الطبيعي والماء والكهرباء في كل شقة.',
        'تشغيل واختبار المولد الكهربائي الاحتياطي للمبنى ومضخات المياه وأنظمة إخلاء الدخان أوتوماتيكياً.',
        'فحص المصاعد من قبل هيئة فحص معتمدة من الفئة (A) والحصول على الملصق الأخضر (ممتاز وخالٍ من العيوب).',
        'إجراء جولة استلام فني للشقة مع كل مالك وتوقيع محضر الاستلام الرسمي وتسليم مفاتيح المنزل.',
      ],
      techStandard: 'رخصة استخدام المبنى (الإسكان) ومعايير الملصق الأخضر للمصاعد',
      requiredDocuments: [
        'رخصة السكن الرسمية (الإسكان) المعتمدة من البلدية',
        'تقارير مطابقة الإطفاء والملاجئ والسلامة العامة',
        'سندات الملكية التامة للشقق (Kat Mülkiyeti)',
        'وثائق تأمين الزلازل الإلزامي (DASK)',
        'محاضر استلام وتسليم الشقق الرسمية',
      ],
      keyMilestone: 'استلام المالكين مفاتيح شققهم الجديدة، المرخصة والآمنة تماماً ضد مخاطر الزلازل.',
      residentTips: 'يمكنك فتح اشتراكات الكهرباء والماء والغاز للشقة في نفس اليوم باستخدام سند الملكية الجديد ووثيقة تأمين DASK.',
      whatsAppInquiry: 'مرحباً إيه بي يابي، نود الاستفسار عن معايير تسليم المشاريع وضمانات استخراج رخصة السكن لديكم.',
      nextActionAdvice: 'تهانينا! يمكنك الآن العيش بأمان وراحة بال مع عائلتك في منزلك الحديث المقاوم للزلازل.',
    },
  },
];

interface KentselDonusumTimelineProps {
  whatsappNumber?: string;
  defaultStepId?: string;
}

export const KentselDonusumTimeline: React.FC<KentselDonusumTimelineProps> = ({
  whatsappNumber = '905510102200',
  defaultStepId = 'risk-tespiti',
}) => {
  const { language } = useLanguage();
  const [activeStepId, setActiveStepId] = useState<string>(defaultStepId);
  const [viewMode, setViewMode] = useState<'stepDetail' | 'fullFlow'>('stepDetail');
  const [activeAspect, setActiveAspect] = useState<'all' | 'legal' | 'technical'>('all');
  const [selectedUserStageId, setSelectedUserStageId] = useState<string>('risk-tespiti');

  const formattedWhatsapp = whatsappNumber.replace(/\D/g, '');

  const activeStep =
    TIMELINE_STEPS.find((s) => s.id === activeStepId) || TIMELINE_STEPS[0];
  const activeStepIndex = TIMELINE_STEPS.findIndex((s) => s.id === activeStep.id);

  const selectedUserStage =
    TIMELINE_STEPS.find((s) => s.id === selectedUserStageId) || TIMELINE_STEPS[0];
  const selectedUserStageIndex = TIMELINE_STEPS.findIndex(
    (s) => s.id === selectedUserStage.id
  );

  const lang = (language === 'en' || language === 'ar' ? language : 'tr') as 'tr' | 'en' | 'ar';
  const content = activeStep[lang];
  const userStageContent = selectedUserStage[lang];

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

  const uiTexts = {
    tr: {
      badge: '6306 Sayılı Kanun Kapsamında Adım Adım Rehber',
      mainTitle: 'Risk Tespitinden Anahtar Teslime 5 Aşamalı Kentsel Dönüşüm',
      mainDesc: 'Lisanslı karot analizinden %50+1 malikler uzlaşmasına, devlet kira hibesinden C40 sismik inşaata ve iskanlı tapu teslimine kadar tüm yasal ve teknik yol haritası.',
      btnInteractive: 'İnteraktif Adım İncelemesi',
      btnRoadmap: 'Tüm Süreç Akışı (Özet)',
      overallProgress: 'Süreç Tamamlanma Yol Haritası',
      stageLabel: 'Aşama',
      estimatedTotal: 'Ortalama Toplam Süre: ~14 - 22 Ay',
      prevBtn: 'Önceki Aşama',
      nextBtn: 'Sonraki Aşama',
      focusAll: 'Hukuki & Teknik Birlikte',
      focusLegal: 'Sadece Hukuki Boyut (6306)',
      focusTech: 'Sadece Teknik & Mühendislik',
      legalTitle: 'Hukuki Süreç & Hak Sahipliği',
      legalSubtitle: '6306 Kanun Hükümleri & Sözleşme Hakları',
      legalTag: 'Yasal Prosedürler',
      techTitle: 'Teknik & Statik Mühendislik Süreci',
      techSubtitle: 'TBDY 2018 Standartları, Zemin & C40 Beton',
      techTag: 'Mühendislik Standartları',
      docsTitle: 'Bu Aşamada Kat Maliklerinden İstenen Evraklar',
      tipsTitle: 'Hak Sahipleri İçin Kritik Tavsiye & Hedef Çıktı',
      targetOutput: 'Hedef Çıktı:',
      askQuestionTitle: 'Bu aşamayla ilgili hukuki veya teknik sorunuz mu var?',
      askQuestionDesc: 'AB Yapı kentsel dönüşüm koordinatörü ve statik mühendislerimizle anında görüşün.',
      btnAskConsultant: 'Bu Aşama İçin Ücretsiz Danışın',
      lawRefPrefix: 'Resmi Dayanak:',
      techStdPrefix: 'Teknik Standart:',
      simulatorBadge: 'İnteraktif Durum Teşhisi',
      simulatorTitle: 'Binanız şu an hangi aşamada?',
      simulatorDesc: 'Aşağıdan binanızın mevcut durumunu seçin; anahtar teslime kadar kalan adımları ve yapılması gereken acil hazırlığı anında görüntüleyin.',
      remainingSteps: 'Kalan Aşama Sayısı:',
      remainingEst: 'Kalan Tahmini Süre:',
      immediateActionTitle: 'Hemen Yapılması Gereken Öncelikli Eylem:',
      btnSimulatorCta: 'Aşamanıza Özel Resmi Yol Haritası Alın',
      markThisStage: 'Binamız Şu An Bu Aşamada',
    },
    en: {
      badge: 'Step-by-Step Guide under Law No. 6306',
      mainTitle: '5-Stage Urban Renewal Process: From Risk Assessment to Key Delivery',
      mainDesc: 'Complete legal and technical roadmap from licensed core sampling to 50%+1 owner agreement, rent subsidies, C40 seismic construction, and occupancy deed handover.',
      btnInteractive: 'Interactive Step Deep Dive',
      btnRoadmap: 'Full Flow Roadmap (Overview)',
      overallProgress: 'Overall Process Completion Roadmap',
      stageLabel: 'Stage',
      estimatedTotal: 'Estimated Total Timeline: ~14 - 22 Months',
      prevBtn: 'Previous Stage',
      nextBtn: 'Next Stage',
      focusAll: 'Legal & Technical Combined',
      focusLegal: 'Legal Framework (Law 6306)',
      focusTech: 'Technical & Engineering Standards',
      legalTitle: 'Legal Procedures & Property Rights',
      legalSubtitle: 'Provisions of Law No. 6306 & Contract Protection',
      legalTag: 'Statutory Procedures',
      techTitle: 'Technical & Structural Engineering',
      techSubtitle: 'Seismic Building Code 2018, Soil & C40 Concrete',
      techTag: 'Engineering Standards',
      docsTitle: 'Documents Required from Owners in this Stage',
      tipsTitle: 'Crucial Advice & Milestone Target for Residents',
      targetOutput: 'Key Milestone Target:',
      askQuestionTitle: 'Have questions about this renewal stage?',
      askQuestionDesc: 'Connect directly with AB Yapi urban transformation coordinators and structural engineers.',
      btnAskConsultant: 'Consult Free on This Stage',
      lawRefPrefix: 'Official Law Reference:',
      techStdPrefix: 'Technical Standard:',
      simulatorBadge: 'Interactive Status Diagnostic',
      simulatorTitle: 'Where does your building stand right now?',
      simulatorDesc: 'Select your current building status below to see the remaining stages until key delivery and immediate recommended actions.',
      remainingSteps: 'Remaining Stages:',
      remainingEst: 'Estimated Remaining Time:',
      immediateActionTitle: 'Immediate Priority Action Recommended:',
      btnSimulatorCta: 'Get Custom Renewal Roadmap for Your Stage',
      markThisStage: 'Our Building is Currently Here',
    },
    ar: {
      badge: 'دليل خطوة بخطوة بموجب القانون رقم 6306',
      mainTitle: '٥ مراحل للتحول الحضري: من فحص المخاطر إلى تسليم المفاتيح',
      mainDesc: 'خريطة الطريق القانونية والهندسية الكاملة من فحص عينات الكور المرخص إلى اتفاق أغلبية ٥٠٪+١، دعم الإيجار، تشييد خرسانة C40 المقاومة للزلازل وتسليم سندات الملكية.',
      btnInteractive: 'فحص المراحل تفاعلياً',
      btnRoadmap: 'المسار الكامل للمشروع (ملخص)',
      overallProgress: 'مخطط التقدم الإجمالي للمشروع',
      stageLabel: 'المرحلة',
      estimatedTotal: 'المدة الإجمالية التقديرية: ~١٤ - ٢٢ شهراً',
      prevBtn: 'المرحلة السابقة',
      nextBtn: 'المرحلة التالية',
      focusAll: 'القانوني والتقني معاً',
      focusLegal: 'المسار القانوني (القانون 6306)',
      focusTech: 'المعايير الهندسية والإنشائية',
      legalTitle: 'الإجراءات القانونية وحقوق الملكية',
      legalSubtitle: 'أحكام القانون رقم 6306 وحماية عقود المالكين',
      legalTag: 'الإجراءات القانونية',
      techTitle: 'المعايير الهندسية والإنشائية',
      techSubtitle: 'كود الزلازل 2018، التربة وخرسانة C40 المسلحة',
      techTag: 'المعايير الهندسية',
      docsTitle: 'الوثائق المطلوبة من مالكي الشقق في هذه المرحلة',
      tipsTitle: 'نصيحة هامة للمالكين والهدف الإنجازي',
      targetOutput: 'المخرج الإنجازي المستهدف:',
      askQuestionTitle: 'هل لديك استفسار قانوني أو فني حول هذه المرحلة؟',
      askQuestionDesc: 'تواصل مباشرة مع منسقي التحول الحضري والمهندسين الإنشائيين في إيه بي يابي.',
      btnAskConsultant: 'استشر مجاناً حول هذه المرحلة',
      lawRefPrefix: 'السند القانوني الرسمي:',
      techStdPrefix: 'المعيار الهندسي المعتمد:',
      simulatorBadge: 'التشخيص التفاعلي لحالة المبنى',
      simulatorTitle: 'في أي مرحلة يقع مبناكم حالياً؟',
      simulatorDesc: 'حدد الوضع الحالي لمبناكم أدناه لمعرفة المراحل المتبقية حتى استلام المفتاح والخطوات الفورية المطلوبة.',
      remainingSteps: 'عدد المراحل المتبقية:',
      remainingEst: 'المدة التقديرية المتبقية:',
      immediateActionTitle: 'الإجراء الأولي الموصى به فوراً:',
      btnSimulatorCta: 'احصل على خطة طريق مخصصة لمرحلة مبناكم',
      markThisStage: 'مبناكم يمر بهذه المرحلة حالياً',
    },
  };

  const ui = uiTexts[lang];

  return (
    <section
      id="kentsel-donusum-zaman-cizelgesi"
      className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 md:p-10 space-y-10 scroll-mt-24"
    >
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-teal-700" />
            <span>{ui.badge}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
            {ui.mainTitle}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            {ui.mainDesc}
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start lg:self-end shrink-0">
          <button
            onClick={() => {
              setViewMode('stepDetail');
              trackEvent('timeline_view_mode', { mode: 'stepDetail' });
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              viewMode === 'stepDetail'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {ui.btnInteractive}
          </button>
          <button
            onClick={() => {
              setViewMode('fullFlow');
              trackEvent('timeline_view_mode', { mode: 'fullFlow' });
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              viewMode === 'fullFlow'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {ui.btnRoadmap}
          </button>
        </div>
      </div>

      {/* Visual Connected Step Progress Bar */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 font-semibold px-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">
              {ui.stageLabel} {activeStep.stepNumber} / 05:
            </span>
            <span className="text-teal-700 font-bold">{content.shortTitle}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="tabular-nums font-bold text-slate-800">
              %{activeStep.progressPercent} {ui.overallProgress}
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-slate-500 font-normal">{ui.estimatedTotal}</span>
          </div>
        </div>

        {/* Dynamic Continuous Progress Track */}
        <div className="relative w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/80">
          <div
            className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500 ease-out shadow-xs"
            style={{ width: `${activeStep.progressPercent}%` }}
          />
        </div>

        {/* 5-Node Interactive Stepper Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          {TIMELINE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep.id === step.id;
            const isCompleted = idx < activeStepIndex;
            const stepContent = step[lang];

            return (
              <button
                key={step.id}
                onClick={() => handleStepSelect(step.id)}
                className={`relative flex flex-col text-left p-3.5 rounded-2xl border transition-all text-xs cursor-pointer group ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white border-slate-900 shadow-xl shadow-slate-900/15 scale-[1.03] z-10'
                    : isCompleted
                    ? 'bg-teal-50/80 border-teal-200 text-slate-800 hover:bg-teal-100/60'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                {/* Node Top Row: Number & Icon */}
                <div className="flex items-center justify-between gap-1 w-full mb-2">
                  <span
                    className={`font-outfit font-black text-sm tabular-nums ${
                      isSelected ? 'text-teal-300' : isCompleted ? 'text-teal-700' : 'text-slate-400'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isSelected
                        ? 'bg-teal-400 text-slate-950 font-bold shadow-xs'
                        : isCompleted
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted && !isSelected ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                </div>

                <div className="font-extrabold text-[12px] sm:text-[13px] leading-snug line-clamp-1">
                  {stepContent.shortTitle}
                </div>

                <div
                  className={`text-[10px] mt-1 flex items-center gap-1 font-medium ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>{stepContent.duration}</span>
                </div>

                {/* Progress Percentage Badge */}
                <div
                  className={`text-[9px] font-bold mt-2 pt-1 border-t ${
                    isSelected
                      ? 'border-slate-700 text-teal-300'
                      : isCompleted
                      ? 'border-teal-200 text-teal-800'
                      : 'border-slate-200 text-slate-400'
                  }`}
                >
                  %{step.progressPercent}
                </div>

                {/* Triangle Arrow indicator when selected */}
                {isSelected && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-slate-800 rotate-45 border-r border-b border-slate-900 hidden sm:block" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: STEP DETAIL (DEEP DIVE INTERACTIVE) */}
      {viewMode === 'stepDetail' && (
        <div className="space-y-8 pt-2">
          {/* Active Step Hero Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 space-y-5 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-teal-400">
                  <span className="bg-teal-500/20 px-2 py-0.5 rounded-md text-teal-300 border border-teal-500/30">
                    {ui.stageLabel} {activeStep.stepNumber}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {content.duration}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Users className="w-3.5 h-3.5 text-teal-400" /> {content.responsible}
                  </span>
                </div>

                <h3 className="text-xl md:text-3xl font-extrabold font-outfit tracking-tight text-white">
                  {content.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {content.tagline}
                </p>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2 shrink-0 self-start md:self-center relative z-10">
                <button
                  onClick={handlePrevStep}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label={ui.prevBtn}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{ui.prevBtn}</span>
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black rounded-xl transition-all flex items-center gap-1 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  aria-label={ui.nextBtn}
                >
                  <span>{ui.nextBtn}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sub-Focus Segmented Control (Hukuki vs. Teknik vs. Hepsi) */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/90 text-xs relative z-10">
              <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mr-1">
                Filtre:
              </span>
              <button
                onClick={() => setActiveAspect('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeAspect === 'all'
                    ? 'bg-teal-400 text-slate-950 font-black shadow-xs'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                {ui.focusAll}
              </button>
              <button
                onClick={() => setActiveAspect('legal')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeAspect === 'legal'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{ui.focusLegal}</span>
              </button>
              <button
                onClick={() => setActiveAspect('technical')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeAspect === 'technical'
                    ? 'bg-emerald-400 text-slate-950 font-black shadow-xs'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>{ui.focusTech}</span>
              </button>
            </div>
          </div>

          {/* Legal and Technical Breakdown Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Legal Column */}
            {(activeAspect === 'all' || activeAspect === 'legal') && (
              <div
                className={`bg-white rounded-3xl border p-6 md:p-7 space-y-4 shadow-sm transition-all ${
                  activeAspect === 'legal'
                    ? 'lg:col-span-2 border-amber-300 ring-2 ring-amber-100'
                    : 'border-amber-200/80'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {ui.legalTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {ui.legalSubtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                    {ui.legalTag}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                  {content.legalSummary}
                </p>

                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Kanuni Maddeler & Prosedür:
                  </div>
                  <ul className="space-y-2">
                    {content.legalItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-amber-900 font-bold bg-amber-50/70 p-3 rounded-2xl border border-amber-200/70">
                  <Landmark className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{ui.lawRefPrefix} {content.lawRef}</span>
                </div>
              </div>
            )}

            {/* Technical Column */}
            {(activeAspect === 'all' || activeAspect === 'technical') && (
              <div
                className={`bg-white rounded-3xl border p-6 md:p-7 space-y-4 shadow-sm transition-all ${
                  activeAspect === 'technical'
                    ? 'lg:col-span-2 border-teal-300 ring-2 ring-teal-100'
                    : 'border-teal-200/80'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-teal-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {ui.techTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {ui.techSubtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg">
                    {ui.techTag}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                  {content.techSummary}
                </p>

                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Uygulanan Standartlar & Denetim:
                  </div>
                  <ul className="space-y-2">
                    {content.techItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-teal-900 font-bold bg-teal-50/70 p-3 rounded-2xl border border-teal-200/70">
                  <Layers className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>{ui.techStdPrefix} {content.techStandard}</span>
                </div>
              </div>
            )}
          </div>

          {/* Documents & Resident Advice Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Required Documents */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/90 space-y-3.5">
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                <FileCheck2 className="w-4 h-4 text-teal-700" />
                <span>{ui.docsTitle}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {content.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-teal-600 font-black">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resident Advice & Key Milestone */}
            <div className="bg-amber-50/70 rounded-3xl p-6 border border-amber-200/90 space-y-3.5 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 font-extrabold text-amber-950 text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>{ui.tipsTitle}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {content.residentTips}
                </p>
              </div>

              <div className="pt-3 border-t border-amber-200/80 text-xs font-semibold text-amber-950 flex items-start gap-2 bg-white/70 p-3 rounded-xl">
                <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-amber-900 mr-1">{ui.targetOutput}</span>
                  <span>{content.keyMilestone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row for This Step */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-teal-50 via-slate-50 to-teal-50 border border-teal-200 shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-extrabold text-teal-950">
                {ui.askQuestionTitle}
              </div>
              <div className="text-[11px] text-slate-600">
                {ui.askQuestionDesc}
              </div>
            </div>

            <a
              href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(content.whatsAppInquiry)}`}
              onClick={() => trackWhatsAppClick(`timeline_step_${activeStep.id}`, content.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{ui.btnAskConsultant}</span>
            </a>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: FULL FLOW (SUMMARY INFOGRAPHIC ROADMAP) */}
      {viewMode === 'fullFlow' && (
        <div className="space-y-6 pt-2">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-500/40 space-y-8 my-4">
            {TIMELINE_STEPS.map((step) => {
              const Icon = step.icon;
              const stepContent = step[lang];
              const isSelected = activeStep.id === step.id;

              return (
                <div key={step.id} className="relative group">
                  {/* Timeline Node Circle */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-2 w-8 h-8 rounded-xl border-2 flex items-center justify-center shadow-md transition-all ${
                      isSelected
                        ? 'bg-teal-500 text-slate-950 border-teal-400 scale-110'
                        : 'bg-slate-900 text-teal-400 border-teal-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="bg-slate-50 hover:bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-300 transition-all shadow-xs hover:shadow-md space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70">
                      <div>
                        <div className="text-xs font-black text-teal-700 font-outfit uppercase tracking-wider flex items-center gap-2">
                          <span>{ui.stageLabel} {step.stepNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span>{stepContent.duration}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-500 font-normal">%{step.progressPercent} İlerleme</span>
                        </div>
                        <h4 className="text-base md:text-lg font-extrabold text-slate-900 mt-1">
                          {stepContent.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 bg-white px-3 py-1 rounded-xl border border-slate-200 self-start sm:self-center shadow-2xs">
                        {stepContent.responsible}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {stepContent.tagline}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                      <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/70 space-y-1">
                        <div className="font-extrabold text-amber-900 text-[11px] flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-amber-700" />
                          <span>Hukuki Özeti:</span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          {stepContent.legalSummary}
                        </p>
                      </div>

                      <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-200/70 space-y-1">
                        <div className="font-extrabold text-teal-900 text-[11px] flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5 text-teal-700" />
                          <span>Teknik Özeti:</span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          {stepContent.techSummary}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setActiveStepId(step.id);
                          setViewMode('stepDetail');
                        }}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Tüm Detayları, Evrakları ve Hakları İncele</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-[11px] text-slate-500 font-medium">
                        {stepContent.lawRef}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Progress Diagnostic Tool: "Binanız Şu An Hangi Aşamada?" */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl border border-teal-900/60">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{ui.simulatorBadge}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold font-outfit text-white">
            {ui.simulatorTitle}
          </h3>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
            {ui.simulatorDesc}
          </p>
        </div>

        {/* Stage Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {TIMELINE_STEPS.map((stage) => {
            const isSelected = selectedUserStageId === stage.id;
            const stageText = stage[lang];

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setSelectedUserStageId(stage.id);
                  trackEvent('stage_quiz_select', { stage_id: stage.id });
                }}
                className={`p-3 rounded-2xl text-xs font-bold text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  isSelected
                    ? 'bg-teal-400 text-slate-950 font-black shadow-lg scale-[1.03]'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                <div className="text-[11px] font-black uppercase opacity-75">
                  Aşama {stage.stepNumber}
                </div>
                <div className="text-xs leading-tight line-clamp-2">
                  {stageText.shortTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Diagnosis & Next Action Card */}
        <div className="bg-slate-800/95 border border-slate-700/90 rounded-2xl p-6 space-y-4 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/80 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{ui.remainingSteps}</span>
              <span className="text-teal-400 font-extrabold tabular-nums">
                {Math.max(0, 5 - selectedUserStageIndex)} / 5
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{ui.remainingEst}</span>
              <span className="text-amber-400 font-extrabold">
                {selectedUserStageIndex === 0
                  ? '~14 - 22 Ay'
                  : selectedUserStageIndex === 1
                  ? '~12 - 20 Ay'
                  : selectedUserStageIndex === 2
                  ? '~11 - 18 Ay'
                  : selectedUserStageIndex === 3
                  ? '~1 - 2 Ay'
                  : '0 Ay (Teslim Aşamasındasınız!)'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-extrabold text-teal-300 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{ui.immediateActionTitle}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pl-6">
              {userStageContent.nextActionAdvice}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-slate-400 text-center sm:text-left">
              Binanızın mevcut imar ve hak sahipliği durumuna göre resmi fizibilite raporu hazırlayalım.
            </span>
            <a
              href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
                `Merhaba AB Yapı, binamız kentsel dönüşüm sürecinde "${selectedUserStage.stepNumber}. ${userStageContent.shortTitle}" aşamasında bulunuyor. Sonraki adımlar için resmi danışmanlık almak istiyoruz.`
              )}`}
              onClick={() =>
                trackWhatsAppClick(
                  'timeline_diagnosis_cta',
                  `Stage ${selectedUserStage.stepNumber} - ${userStageContent.shortTitle}`
                )
              }
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{ui.btnSimulatorCta}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
