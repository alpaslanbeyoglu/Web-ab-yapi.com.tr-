import React, { useState } from 'react';
import { CompanyInfo, CustomerInquiry } from '../types';
import { Logo } from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';

interface ContactProps {
  companyInfo: CompanyInfo;
  onAddInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const Contact: React.FC<ContactProps> = ({ companyInfo, onAddInquiry }) => {
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    district: 'Fatih',
    buildingAge: 35,
    apartmentCount: 10,
    subject: 'Bina Ön İnceleme ve Kentsel Dönüşüm Teklifi',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    onAddInquiry(formData);
    setSubmitted(true);
  };

  const formattedWhatsapp = companyInfo.whatsapp.replace(/[^0-9]/g, '');

  const translations = {
    tr: {
      badge: 'Merkez Ofis ve İletişim',
      title: 'Bizimle İletişime Geçin',
      desc: 'İstanbul\'daki binanızın kentsel dönüşüm süreçleri, mimari kat planı ve yerinde teknik inceleme talepleriniz için uzman ekibimiz hizmetinizdedir.',
      infoTitle: 'Ofis Bilgilerimiz',
      addressLabel: 'Ofis Adresi:',
      phoneLabel: 'Telefon Hattı:',
      whatsappLabel: 'Hızlı WhatsApp Danışma:',
      emailLabel: 'E-Posta Adresi:',
      hoursLabel: 'Mesai Saatleri:',
      btnWhatsapp: 'Doğrudan WhatsApp Sohbeti Başlat',
      formTitle: 'Bina İnceleme ve Teklif Formu',
      formDesc: 'Formu doldurun, harita & harita analiz uzmanlarımız binanızı yerinde incelesin.',
      successTitle: 'Talebiniz Başarıyla Alındı!',
      successDesc: 'Müşteri danışmanlarımız 24 saat içerisinde tarafınızla iletişime geçerek kentsel dönüşüm ön raporunuzu sunacaktır.',
      newForm: 'Yeni Bir Form Doldur',
      labelName: 'Adınız Soyadınız *',
      labelPhone: 'Telefon Numarası *',
      labelEmail: 'E-Posta',
      labelDistrict: 'Bulunduğu İlçe (Avrupa Yakası)',
      labelCount: 'Daire Sayısı',
      labelMessage: 'Mesajınız / Sorunuz',
      placeholderMessage: 'Binanızın durumu veya kentsel dönüşüm hakkında belirtmek istediğiniz detaylar...',
      btnSubmit: 'Formu Gönder ve Ücretsiz İnceleme İsteyin',
      mapLabel: 'AB Yapı Ofis Konumu',
    },
    en: {
      badge: 'Head Office & Contact',
      title: 'Get In Touch With Us',
      desc: 'Our expert team is at your service for urban transformation processes, architectural floor plans, and on-site technical inspection requests for your building in Istanbul.',
      infoTitle: 'Office Information',
      addressLabel: 'Office Address:',
      phoneLabel: 'Phone Hotline:',
      whatsappLabel: 'Fast WhatsApp Support:',
      emailLabel: 'Email Address:',
      hoursLabel: 'Working Hours:',
      btnWhatsapp: 'Start Direct WhatsApp Chat',
      formTitle: 'Building Inspection & Proposal Form',
      formDesc: 'Fill out the form, and our analysis experts will inspect your building on-site.',
      successTitle: 'Your Request Has Been Received Successfully!',
      successDesc: 'Our client advisors will contact you within 24 hours to present your urban transformation preliminary report.',
      newForm: 'Fill Out Another Form',
      labelName: 'Your Full Name *',
      labelPhone: 'Phone Number *',
      labelEmail: 'Email Address',
      labelDistrict: 'District (European Side)',
      labelCount: 'Number of Apartments',
      labelMessage: 'Your Message / Question',
      placeholderMessage: 'Details you want to specify about the condition of your building or urban transformation...',
      btnSubmit: 'Submit Form and Request Free Inspection',
      mapLabel: 'AB Yapi Office Location',
    },
    ar: {
      badge: 'المكتب الرئيسي والاتصال',
      title: 'تواصل معنا',
      desc: 'فريق الخبراء لدينا في خدمتكم لعمليات التحول الحضري، المخططات المعمارية، وطلبات الفحص الفني الموقعي لمبناكم في إسطنبول.',
      infoTitle: 'معلومات المكتب',
      addressLabel: 'عنوان المكتب:',
      phoneLabel: 'خط الهاتف:',
      whatsappLabel: 'استشارة واتساب سريعة:',
      emailLabel: 'البريد الإلكتروني:',
      hoursLabel: 'ساعات العمل:',
      btnWhatsapp: 'بدء دردشة واتساب مباشرة',
      formTitle: 'نموذج فحص المبنى وطلب العرض',
      formDesc: 'املأ النموذج، وسيقوم خبراء التحليل والخرائط بفحص مبناك في الموقع.',
      successTitle: 'تم استلام طلبك بنجاح!',
      successDesc: 'سيتصل بك مستشارو العملاء لدينا في غضون ٢٤ ساعة لتقديم تقريرك الأولي للتحول الحضري.',
      newForm: 'تعبئة نموذج جديد',
      labelName: 'الاسم الكامل *',
      labelPhone: 'رقم الهاتف *',
      labelEmail: 'البريد الإلكتروني',
      labelDistrict: 'المنطقة (الجانب الأوروبي)',
      labelCount: 'عدد الشقق',
      labelMessage: 'رسالتك / سؤالك',
      placeholderMessage: 'التفاصيل التي تود تحديدها حول حالة مبناك أو التحول الحضري...',
      btnSubmit: 'إرسال النموذج وطلب فحص مجاني',
      mapLabel: 'موقع مكتب إيه بي يابي',
    },
  };

  const activeTrans = translations[language] || translations['tr'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <Phone className="w-3.5 h-3.5" />
            <span>{activeTrans.badge}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-outfit tracking-tight">
            {activeTrans.title}
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            {activeTrans.desc}
          </p>
        </div>

        <Logo variant="light" size="lg" logoUrl={companyInfo.logoUrl} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 space-y-6">
            <h3 className="font-extrabold text-slate-900 text-xl font-outfit border-b border-slate-100 pb-3">
              {activeTrans.infoTitle}
            </h3>

            <div className="space-y-4 text-xs md:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{activeTrans.addressLabel}</div>
                  <div className="text-slate-600 mt-0.5">{companyInfo.address}</div>
                  <div className="text-slate-500 font-semibold">{companyInfo.district} / {companyInfo.city}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{activeTrans.phoneLabel}</div>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    onClick={() => trackPhoneClick('contact_page_phone')}
                    className="text-teal-700 font-extrabold text-base hover:underline"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{activeTrans.whatsappLabel}</div>
                  <a
                    href={`https://wa.me/${formattedWhatsapp}?text=Merhaba%2C%20AB%20Yap%C4%B1%20ile%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum.`}
                    onClick={() => trackWhatsAppClick('contact_page_link')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 font-extrabold text-base hover:underline"
                  >
                    {companyInfo.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{activeTrans.emailLabel}</div>
                  <a href={`mailto:${companyInfo.email}`} className="text-slate-700 hover:underline">
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{activeTrans.hoursLabel}</div>
                  <div className="text-slate-600">
                    {language === 'ar' ? 'الاثنين - السبت: ٠٨:٣٠ - ١٨:٣٠' : language === 'en' ? 'Monday - Saturday: 08:30 - 18:30' : companyInfo.workingHours}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Box */}
            <a
              href={`https://wa.me/${formattedWhatsapp}?text=Merhaba%2C%20AB%20Yap%C4%B1%20kentsel%20d%C3%B6n%C3%BC%C5%9F%C3%BCm%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
              onClick={() => trackWhatsAppClick('contact_page_cta_box')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold p-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
              <span>{activeTrans.btnWhatsapp}</span>
            </a>
          </div>
        </div>

        {/* Contact Form & Location Map */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-xl font-outfit">
                {activeTrans.formTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {activeTrans.formDesc}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-emerald-900 text-lg">{activeTrans.successTitle}</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  {activeTrans.successDesc}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-emerald-900 underline pt-2 cursor-pointer"
                >
                  {activeTrans.newForm}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{activeTrans.labelName}</label>
                    <input
                      type="text"
                      required
                      placeholder="Ahmet Yılmaz"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:outline-none focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{activeTrans.labelPhone}</label>
                    <input
                      type="tel"
                      required
                      placeholder="0532 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{activeTrans.labelEmail}</label>
                    <input
                      type="email"
                      placeholder="ornek@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:outline-none focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{activeTrans.labelDistrict}</label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:outline-none focus:border-teal-600"
                    >
                      <option value="Fatih">Fatih</option>
                      <option value="Zeytinburnu">Zeytinburnu</option>
                      <option value="Eyüpsultan">Eyüpsultan</option>
                      <option value="Bayrampaşa">Bayrampaşa</option>
                      <option value="Beyoğlu">Beyoğlu</option>
                      <option value="Bakırköy">Bakırköy</option>
                      <option value="Güngören">Güngören</option>
                      <option value="Gaziosmanpaşa">Gaziosmanpaşa</option>
                      <option value="Esenler">Esenler</option>
                      <option value="Bahçelievler">Bahçelievler</option>
                      <option value="Şişli">Şişli</option>
                      <option value="Kağıthane">Kağıthane</option>
                      <option value="Beşiktaş">Beşiktaş</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{activeTrans.labelCount}</label>
                    <input
                      type="number"
                      value={formData.apartmentCount}
                      onChange={(e) => setFormData({ ...formData, apartmentCount: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{activeTrans.labelMessage}</label>
                  <textarea
                    rows={3}
                    placeholder={activeTrans.placeholderMessage}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:outline-none focus:border-teal-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{activeTrans.btnSubmit}</span>
                </button>
              </form>
            )}
          </div>

          {/* Map Preview Box */}
          <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 overflow-hidden space-y-2">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-700" />
              <span>{activeTrans.mapLabel} ({companyInfo.district})</span>
            </div>
            <iframe
              title="AB Yapı Merkez Konum"
              src={companyInfo.mapEmbedUrl}
              className="w-full h-56 rounded-xl border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
