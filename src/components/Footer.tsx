import React, { useState } from 'react';
import { Logo } from './Logo';
import { CompanyInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, X, FileText } from 'lucide-react';

interface FooterProps {
  companyInfo: CompanyInfo;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ companyInfo, setActiveTab }) => {
  const formattedWhatsapp = companyInfo.whatsapp.replace(/[^0-9]/g, '');
  const [activeModal, setActiveModal] = useState<'privacy' | 'kvkk' | 'cookies' | null>(null);
  const { language, t } = useLanguage();

  const footerTranslations = {
    tr: {
      desc: 'AB Yapı; Fatih ve İstanbul genelinde kentsel dönüşüm, yüksek güvenlikli konut ve ticari projeler üreten kurumsal inşaat firmasıdır. 6306 sayılı kanun kapsamında güvene yükselen yapılar inşa ediyoruz.',
      badge: '6306 Sayılı Kanun Uyumlu & Deprem Standartlarına Uygun Yapılar',
      titleQuick: 'Hızlı Erişim',
      titleService: 'Mevzuat & Hizmet',
      titleContact: 'İletişim & Merkez',
      linkHome: 'Anasayfa',
      linkProjects: 'Projelerimiz',
      linkMap: 'Proje Haritası',
      linkStats: 'İstanbul İstatistikleri',
      linkGuide: 'Kentsel Dönüşüm Rehberi',
      leg1: '6306 Sayılı Kanun %50+1 Çoğunluk',
      leg2: 'Devlet Kira Yardımı ve Faiz Desteği',
      leg3: 'Hakkımızda & Çalışma İlkelerimiz',
      leg4: 'Ücretsiz Bina Ön İnceleme Talebi',
      btnWhatsapp: 'WhatsApp İletişim Hattı',
      allRights: 'Tüm Hakları Saklıdır.',
      privacyTitle: 'Gizlilik Politikası',
      kvkkTitle: 'KVKK Aydınlatma Metni',
      cookiesTitle: 'Çerez Politikası',
      btnClose: 'Anladım & Kapat',
      hours: companyInfo.workingHours,
    },
    en: {
      desc: 'AB Yapi is a corporate construction company producing urban transformation, high-security residential and commercial projects across Fatih and Istanbul. We build safe structures that rise with confidence under Law No. 6306.',
      badge: 'Law No. 6306 Compliant & Earthquake Standard Approved Buildings',
      titleQuick: 'Quick Access',
      titleService: 'Legislation & Service',
      titleContact: 'Contact & Location',
      linkHome: 'Home',
      linkProjects: 'Our Projects',
      linkMap: 'Project Map',
      linkStats: 'Istanbul Statistics',
      linkGuide: 'Urban Transformation Guide',
      leg1: 'Law No. 6306 50%+1 Majority',
      leg2: 'State Rent & Interest Support',
      leg3: 'About Us & Work Principles',
      leg4: 'Free Building Inspection Request',
      btnWhatsapp: 'WhatsApp Support Line',
      allRights: 'All Rights Reserved.',
      privacyTitle: 'Privacy Policy',
      kvkkTitle: 'KVKK Clarification Text',
      cookiesTitle: 'Cookie Policy',
      btnClose: 'Understood & Close',
      hours: 'Monday - Saturday: 08:30 - 18:30',
    },
    ar: {
      desc: 'إيه بي يابي (AB Yapı) هي شركة إنشاءات مؤسسية تنتج مشاريع التحول الحضري والمشاريع السكنية والتجارية عالية الأمان في الفاتح وإسطنبول. نقوم ببناء هياكل آمنة ترتفع بثقة بموجب القانون رقم 6306.',
      badge: 'مبانٍ متوافقة مع القانون رقم 6306 ومعتمدة من معايير الزلازل',
      titleQuick: 'وصول سريع',
      titleService: 'التشريعات والخدمات',
      titleContact: 'الاتصال والموقع',
      linkHome: 'الصفحة الرئيسية',
      linkProjects: 'مشاريعنا',
      linkMap: 'خريطة المشاريع',
      linkStats: 'إحصاءات إسطنبول',
      linkGuide: 'دليل التحول الحضري',
      leg1: 'أغلبية ٥٠٪+١ في القانون رقم 6306',
      leg2: 'دعم الإيجار والفوائد الحكومية',
      leg3: 'معلومات عنا ومبادئ العمل',
      leg4: 'طلب فحص مجاني للمبنى',
      btnWhatsapp: 'خط دعم واتساب',
      allRights: 'جميع الحقوق محفوظة.',
      privacyTitle: 'سياسة الخصوصية',
      kvkkTitle: 'نص قانون حماية البيانات الشخصية (KVKK)',
      cookiesTitle: 'سياسة ملفات الارتباط',
      btnClose: 'موافق وإغلاق',
      hours: 'الاثنين - السبت: ٠٨:٣٠ - ١٨:٣٠',
    },
  };

  const activeTrans = footerTranslations[language] || footerTranslations['tr'];

  const policyContents = {
    privacy: {
      title: activeTrans.privacyTitle,
      content: language === 'ar' ? `نحن في شركة إيه بي يابي (${companyInfo.fullName || 'Alpaslan Beyoğlu Yapı Ltd. Şti.'} - ${companyInfo.domain}) نولي أهمية قصوى لخصوصية زوارنا وعملائنا.

١. البيانات التي يتم جمعها: يتم معالجة نماذج الاتصال، المكالمات الهاتفية، وطلبات الواتساب التي تشاركها عبر موقعنا الإلكتروني فقط لأغراض التحول الحضري والاستشارات الإنشائية.
٢. أطراف ثالثة: لا يتم مشاركة معلوماتك أو بيعها لأي جهة خارجية أو منظمات إعلانية تحت أي ظرف من الظروف.
٣. الأمان: موقعنا محمي بروتوكولات تشفير SSL/TLS ومعايير أمان الويب الحديثة.` : language === 'en' ? `As AB Yapi (${companyInfo.fullName || 'Alpaslan Beyoğlu Yapı Ltd. Şti.'} - ${companyInfo.domain}), we attach great importance to the privacy of our visitors and customers.

1. Collected Data: Contact forms, telephone and WhatsApp requests shared on our website are only processed for urban transformation and construction consultancy.
2. Third Parties: Under no circumstances will your information be shared with or sold to third parties or advertising organizations.
3. Security: Our website is protected by SSL/TLS encryption protocols and up-to-date web security standards.` : `AB Yapı (${companyInfo.fullName || 'Alpaslan Beyoğlu Yapı Ltd. Şti.'} - ${companyInfo.domain}) olarak ziyaretçilerimizin ve müşterilerimizin gizliliğine azami önem vermekteyiz. 

1. Toplanan Veriler: Web sitemiz üzerinden paylaştığınız iletişim formları, telefon ve WhatsApp talepleri yalnızca kentsel dönüşüm ve inşaat danışmanlığı amacıyla işlenir.
2. Üçüncü Taraflar: Bilgileriniz hiçbir koşulda üçüncü şahıs veya reklam kuruluşlarıyla paylaşılmaz ya da satılmaz.
3. Güvenlik: Web sitemiz SSL/TLS şifreleme protokolleri ve güncel web güvenlik standartları ile korunmaktadır.`,
    },
    kvkk: {
      title: activeTrans.kvkkTitle,
      content: language === 'ar' ? `الإفصاح بموجب قانون حماية البيانات الشخصية رقم 6698 (KVKK):

مسؤول البيانات: ${companyInfo.fullName || 'Alpaslan Beyoğlu Yapı Ltd. Şti.'} (الفاتح / إسطنبول)

يتم معالجة بياناتك الشخصية (الاسم، اللقب، الهاتف، العنوان، معلومات المبنى) من أجل الرد على طلبات الفحص المبدئي للمبنى بموجب قانون التحول الحضري رقم 6306، وتسيير عمليات تحديد الحقوق والاتصال المباشر معك.

حقوقك: بموجب المادة ١١ من القانون، يمكنك التقدم بطلب لشركتنا في أي وقت لطلب حذف بياناتك أو تصحيحها أو معرفة الغرض من معالجتها.` : language === 'en' ? `Information under Personal Data Protection Law No. 6698 (KVKK):

Data Controller: ${companyInfo.fullName || 'Alpaslan Beyoğlu Yapı Ltd. Şti.'} (Fatih / Istanbul)

Your personal data (name, surname, telephone, address, building info) is processed to respond to your preliminary building inspection requests under Urban Transformation Law No. 6306, manage right ownership processes, and communicate directly with you.

Your Rights: In accordance with Article 11 of the Law, you can apply to our company at any time to request the deletion or correction of your data, or to learn the purpose of processing.` : `6698 Sayılı Kişisel Verilerin Kurunması Kanunu (KVKK) Kapsamında Bilgilendirme:

Veri Sorumlusu: ${companyInfo.fullName || 'Alpaslan Beyoğlu Yapı Ltd. Şti.'} (Fatih / İstanbul)

Kişisel verileriniz (ad, soyad, telefon, adres, bina bilgisi); 6306 sayılı Kentsel Dönüşüm Kanunu kapsamındaki bina ön inceleme taleplerinizi yanıtlamak, hak sahipliği tespit süreçlerini yürütmek ve sizinle doğrudan kurumsal iletişim kurmak amacıyla işlenmektedir.

Haklarınız: Kanun'un 11. maddesi uyarınca dilediğiniz zaman şirketimize başvurarak verilerinizin silinmesini, düzeltilmesini veya işlenme amacını öğrenmeyi talep edebilirsiniz.`,
    },
    cookies: {
      title: activeTrans.cookiesTitle,
      content: language === 'ar' ? `يتم استخدام ملفات الارتباط (Cookies) الأساسية على موقعنا الإلكتروني من أجل تحسين تجربة المستخدم وتحسين أداء الصفحة.

١. ملفات الارتباط الإلزامية: مطلوبة للتشغيل الآمن والصحيح للموقع.
٢. ملفات الارتباط التحليلية: تُستخدم لقياس حركة الزوار بشكل مجهول وتحليل أكثر المشاريع تصفحًا.
٣. ملفات الارتباط التفضيلية: تتيح لنا تذكر تفضيلات اللغة والمظهر الخاصة بك.

يمكنك تغيير تفضيلات ملفات الارتباط الخاصة بك أو حذفها في أي وقت من إعدادات المتصفح الخاص بك.` : language === 'en' ? `Basic cookies are used on our website to improve the user experience and optimize page performance.

1. Essential Cookies: Required for the safe and correct operation of the website.
2. Analytical Cookies: Used to anonymously measure visitor traffic and the most viewed projects.
3. Preference Cookies: Allow us to remember your language and theme preferences.

You can change or delete your cookie preferences at any time from your browser settings.` : `Web sitemizde kullanıcı deneyimini iyileştirmek ve sayfa performansını optimize etmek amacıyla temel düzeyde çerezler kullanılmaktadır.

1. Zorunlu Çerezler: Sayfanın güvenli ve doğru çalışması için gereklidir.
2. Analitik Çerezler: Ziyaretçi trafiğini ve en çok incelenen projeleri anonim olarak ölçümlemek amacıyla kullanılır.
3. Tercih Çerezleri: Dil ve tema tercihlerinizi hatırlamamızı sağlar.

Tarayıcı ayarlarınızdan çerez tercihlerinizi dilediğiniz zaman değiştirebilir veya silebilirsiniz.`,
    },
  };

  return (
    <>
      {/* Footer with generous bottom padding so floating widgets NEVER cover links */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-28 sm:pb-32 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <Logo variant="light" size="lg" logoUrl={companyInfo.logoUrl} />
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
                {activeTrans.desc}
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{activeTrans.badge}</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
                {activeTrans.titleQuick}
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-400">
                <li>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {activeTrans.linkHome}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {activeTrans.linkProjects}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {activeTrans.linkMap}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {activeTrans.linkStats}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {activeTrans.linkGuide}
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal & Guide Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
                {activeTrans.titleService}
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-400">
                <li>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {activeTrans.leg1}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {activeTrans.leg2}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('about')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {activeTrans.leg3}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {activeTrans.leg4}
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
                {activeTrans.titleContact}
              </h4>
              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{companyInfo.address}, {companyInfo.district} / {companyInfo.city}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`tel:${companyInfo.phone}`} className="hover:text-white font-semibold">
                    {companyInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`mailto:${companyInfo.email}`} className="hover:text-white">
                    {companyInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{activeTrans.hours}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${formattedWhatsapp}?text=Merhaba%2C%20AB%20Yap%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white text-emerald-600" />
                  <span>{activeTrans.btnWhatsapp}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Cleanly centered & safely elevated above floating elements */}
          <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} {companyInfo.name} ({companyInfo.domain}). {activeTrans.allRights}
            </div>
            
            {/* Interactive Functional Policy Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold">
              <button
                onClick={() => setActiveModal('privacy')}
                className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer py-1 px-1.5 rounded"
              >
                {activeTrans.privacyTitle}
              </button>
              <button
                onClick={() => setActiveModal('kvkk')}
                className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer py-1 px-1.5 rounded"
              >
                {activeTrans.kvkkTitle}
              </button>
              <button
                onClick={() => setActiveModal('cookies')}
                className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer py-1 px-1.5 rounded"
              >
                {activeTrans.cookiesTitle}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Policy Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">
                  {policyContents[activeModal].title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed custom-scrollbar whitespace-pre-line">
              {policyContents[activeModal].content}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                {activeTrans.btnClose}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
