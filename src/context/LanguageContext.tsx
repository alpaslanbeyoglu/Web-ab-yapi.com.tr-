import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Language = 'tr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Nav Links
    'nav.home': 'Anasayfa',
    'nav.guide': 'Kentsel Dönüşüm',
    'nav.stats': 'İstatistikler',
    'nav.projects': 'Projelerimiz',
    'nav.map': 'Proje Haritası',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    'nav.consult': 'Bize Danışın',
    'nav.whatsapp': 'WhatsApp Danışma',
    'nav.title': 'İstanbul Kentsel Dönüşüm Uzmanlığı',

    // Hero / Header
    'hero.badge': 'Fatih Kentsel Dönüşüm & İnşaat',
    'hero.title': "İstanbul'un Geleceğine Güvene Yükselen Sağlam Yapılar",
    'hero.desc': '6306 sayılı kanun kapsamında Fatih bölgesinde depreme tam dayanıklı, modern mimarili ve zamanında teslim garantili yaşam alanları inşa ediyoruz.',
    'hero.btnProjects': 'Projelerimiz',
    'hero.btnMap': 'İnteraktif Proje Haritası',
    'hero.btnAI': 'AI Dönüşüm Danışmanı',

    // Stats Bar
    'stats.halfUs': 'Yarısı Bizden Hibe + Kredi',
    'stats.totalProjects': 'Fatih\'te Tamamlanan Yapılarımız',
    'stats.rentAssistance': 'Devlet Kira Yardımı Desteği',
    'stats.safety': 'C40/50 Deprem Güvenliği',
    'stats.safetyTitle': '%100 Güven',

    // Home / Projects section
    'home.projectsTitle': 'Projelerimiz & Şantiyelerimiz',
    'home.projectsSubtitle': 'Fatih\'te Tamamlanan Eserlerimiz',
    'home.viewAll': 'Tüm Projeleri Gör',
    'home.completed': 'Teslim Edildi',
    'home.direction': 'Yol Tarifi Al',
    'home.map': 'Harita',

    // Footer
    'footer.desc': 'AB Yapı; Fatih ve İstanbul genelinde kentsel dönüşüm, yüksek güvenlikli konut ve ticari projeler üreten kurumsal inşaat firmasıdır.',
    'footer.aboutTitle': 'Hakkımızda & Çalışma İlkelerimiz',
    'footer.quickAccess': 'Hızlı Erişim',
    'footer.serviceTitle': 'Mevzuat & Hizmet',
    'footer.contactTitle': 'İletişim & Merkez',
    'footer.preInquiry': 'Ücretsiz Bina Ön İnceleme Talebi',
    'footer.whatsappLine': 'WhatsApp İletişim Hattı',
    'footer.rights': 'Tüm Hakları Saklıdır.',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.kvkk': 'KVKK Aydınlatma Metni',
    'footer.cookies': 'Çerez Politikası',

    // General Office Translation
    'office.name': 'AB Yapı Kocamustafapaşa Ofisi',
    'office.tag': 'OFİSİMİZ',
  },
  en: {
    // Nav Links
    'nav.home': 'Home',
    'nav.guide': 'Urban Transformation',
    'nav.stats': 'Statistics',
    'nav.projects': 'Our Projects',
    'nav.map': 'Project Map',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.consult': 'Consult Us',
    'nav.whatsapp': 'WhatsApp Consultant',
    'nav.title': 'Istanbul Urban Transformation Expertise',

    // Hero / Header
    'hero.badge': 'Fatih Urban Transformation & Construction',
    'hero.title': 'Safe Structures Rising with Confidence for Istanbul’s Future',
    'hero.desc': 'We construct fully earthquake-resistant, modern, and on-time guaranteed living spaces in the Fatih region under Law No. 6306.',
    'hero.btnProjects': 'Our Projects',
    'hero.btnMap': 'Interactive Project Map',
    'hero.btnAI': 'AI Transformation Advisor',

    // Stats Bar
    'stats.halfUs': 'Half is from Us Grant + Credit',
    'stats.totalProjects': 'Completed in Fatih',
    'stats.rentAssistance': 'Government Rent Support',
    'stats.safety': 'C40/50 Earthquake Safety',
    'stats.safetyTitle': '100% Secure',

    // Home / Projects section
    'home.projectsTitle': 'Our Projects & Construction Sites',
    'home.projectsSubtitle': 'Our Completed Works in Fatih',
    'home.viewAll': 'View All Projects',
    'home.completed': 'Delivered',
    'home.direction': 'Get Directions',
    'home.map': 'Map',

    // Footer
    'footer.desc': 'AB Yapi is a corporate construction company producing urban transformation, high-security residential and commercial projects in Fatih and across Istanbul.',
    'footer.aboutTitle': 'About Us & Work Principles',
    'footer.quickAccess': 'Quick Access',
    'footer.serviceTitle': 'Legislation & Service',
    'footer.contactTitle': 'Contact & Location',
    'footer.preInquiry': 'Free Building Inspection Request',
    'footer.whatsappLine': 'WhatsApp Support Line',
    'footer.rights': 'All Rights Reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.kvkk': 'KVKK Clarification Text',
    'footer.cookies': 'Cookie Policy',

    // General Office Translation
    'office.name': 'AB Yapi Kocamustafapasa Office',
    'office.tag': 'OUR OFFICE',
  },
  ar: {
    // Nav Links
    'nav.home': 'الصفحة الرئيسية',
    'nav.guide': 'التحول الحضري',
    'nav.stats': 'الإحصائيات',
    'nav.projects': 'مشاريعنا',
    'nav.map': 'خريطة المشاريع',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.consult': 'استشرنا',
    'nav.whatsapp': 'استشارة واتساب',
    'nav.title': 'خبرة التحول الحضري في إسطنبول',

    // Hero / Header
    'hero.badge': 'الفاتح للتحول الحضري والبناء',
    'hero.title': 'مبانٍ متينة ترتفع بثقة لمستقبل إسطنبول',
    'hero.desc': 'نحن نبني مساحات معيشية مقاومة للزلازل بالكامل، حديثة ومضمونة التسليم في الوقت المحدد في منطقة الفاتح بموجب القانون رقم 6306.',
    'hero.btnProjects': 'مشاريعنا',
    'hero.btnMap': 'خريطة تفاعلية للمشاريع',
    'hero.btnAI': 'مستشار التحول بالذكاء الاصطناعي',

    // Stats Bar
    'stats.halfUs': 'منحة حكومية ونصف التكلفة قرض',
    'stats.totalProjects': 'منجزة في الفاتح',
    'stats.rentAssistance': 'دعم الإيجار الحكومي',
    'stats.safety': 'أمان الزلازل C40/50',
    'stats.safetyTitle': 'آمن ١٠٠٪',

    // Home / Projects section
    'home.projectsTitle': 'مشاريعنا ومواقع البناء لدينا',
    'home.projectsSubtitle': 'أعمالنا المنجزة في الفاتح',
    'home.viewAll': 'عرض جميع المشاريع',
    'home.completed': 'تم التسليم',
    'home.direction': 'احصل على الاتجاهات',
    'home.map': 'الخريطة',

    // Footer
    'footer.desc': 'إيه بي يابي (AB Yapı) هي شركة إنشاءات مؤسسية تنتج مشاريع التحول الحضري والمشاريع السكنية والتجارية عالية الأمان في الفاتح وفي جميع أنحاء إسطنبول.',
    'footer.aboutTitle': 'معلومات عنا ومبادئ العمل',
    'footer.quickAccess': 'وصول سريع',
    'footer.serviceTitle': 'التشريعات والخدمات',
    'footer.contactTitle': 'الاتصال والموقع',
    'footer.preInquiry': 'طلب فحص مبدئي مجاني للمبنى',
    'footer.whatsappLine': 'خط دعم واتساب',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.kvkk': 'نص قانون حماية البيانات الشخصية',
    'footer.cookies': 'سياسة ملفات الارتباط',

    // General Office Translation
    'office.name': 'إيه بي يابي مكتب كوجامصطفى باشا',
    'office.tag': 'مكتبنا',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('abyapi_lang');
      if (saved === 'en' || saved === 'ar' || saved === 'tr') return saved;
    } catch {
      // ignore
    }
    return 'tr';
  });

  const isRtl = language === 'ar';

  useEffect(() => {
    try {
      localStorage.setItem('abyapi_lang', language);
    } catch {
      // ignore
    }
    // Update html dir and lang attributes
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  }, [language, isRtl]);

  const t = (key: string): string => {
    return translations[language][key] || translations['tr'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
