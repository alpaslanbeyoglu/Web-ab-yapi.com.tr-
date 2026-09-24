import React, { useState } from 'react';
import { Logo } from './Logo';
import { CompanyInfo } from '../types';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, X, FileText } from 'lucide-react';

interface FooterProps {
  companyInfo: CompanyInfo;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ companyInfo, setActiveTab }) => {
  const formattedWhatsapp = companyInfo.whatsapp.replace(/[^0-9]/g, '');
  const [activeModal, setActiveModal] = useState<'privacy' | 'kvkk' | 'cookies' | null>(null);

  const policyContents = {
    privacy: {
      title: 'Gizlilik Politikası',
      content: `AB Yapı (${companyInfo.fullName || 'Alpaslan Beyoğlu Yapı Ltd. Şti.'} - ${companyInfo.domain}) olarak ziyaretçilerimizin ve müşterilerimizin gizliliğine azami önem vermekteyiz. 

1. Toplanan Veriler: Web sitemiz üzerinden paylaştığınız iletişim formları, telefon ve WhatsApp talepleri yalnızca kentsel dönüşüm ve inşaat danışmanlığı amacıyla işlenir.
2. Üçüncü Taraflar: Bilgileriniz hiçbir koşulda üçüncü şahıs veya reklam kuruluşlarıyla paylaşılmaz ya da satılmaz.
3. Güvenlik: Web sitemiz SSL/TLS şifreleme protokolleri ve güncel web güvenlik standartları ile korunmaktadır.`,
    },
    kvkk: {
      title: 'KVKK Aydınlatma Metni',
      content: `6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) Kapsamında Bilgilendirme:

Veri Sorumlusu: ${companyInfo.fullName || 'Alpaslan Beyoğlu Yapı Ltd. Şti.'} (Fatih / İstanbul)

Kişisel verileriniz (ad, soyad, telefon, adres, bina bilgisi); 6306 sayılı Kentsel Dönüşüm Kanunu kapsamındaki bina ön inceleme taleplerinizi yanıtlamak, hak sahipliği tespit süreçlerini yürütmek ve sizinle doğrudan kurumsal iletişim kurmak amacıyla işlenmektedir.

Haklarınız: Kanun'un 11. maddesi uyarınca dilediğiniz zaman şirketimize başvurarak verilerinizin silinmesini, düzeltilmesini veya işlenme amacını öğrenmeyi talep edebilirsiniz.`,
    },
    cookies: {
      title: 'Çerez (Cookie) Politikası',
      content: `Web sitemizde kullanıcı deneyimini iyileştirmek ve sayfa performansını optimize etmek amacıyla temel düzeyde çerezler kullanılmaktadır.

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
                AB Yapı; Fatih Suriçi ve İstanbul genelinde kentsel dönüşüm, yüksek güvenlikli konut ve ticari projeler üreten kurumsal inşaat firmasıdır. 6306 sayılı kanun kapsamında güvene yükselen yapılar inşa ediyoruz.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>6306 Sayılı Kanun Uyumlu & Deprem Standartlarına Uygun Yapılar</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
                Hızlı Erişim
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    Anasayfa
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    Projelerimiz
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    Proje Haritası
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    İstanbul İstatistikleri
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    Kentsel Dönüşüm Rehberi
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal & Guide Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
                Mevzuat & Hizmet
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    6306 Sayılı Kanun %50+1 Çoğunluk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    Devlet Kira Yardımı ve Faiz Desteği
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('about')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    Hakkımızda & Çalışma İlkelerimiz
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    Ücretsiz Bina Ön İnceleme Talebi
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
                İletişim & Merkez
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
                  <span>{companyInfo.workingHours}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${formattedWhatsapp}?text=Merhaba%2C%20AB%20Yap%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white text-emerald-600" />
                  <span>WhatsApp İletişim Hattı</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Cleanly centered & safely elevated above floating elements */}
          <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} {companyInfo.name} ({companyInfo.domain}). Tüm Hakları Saklıdır.
            </div>
            
            {/* Interactive Functional Policy Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
              <button
                onClick={() => setActiveModal('privacy')}
                className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer py-1 px-1.5 rounded"
              >
                Gizlilik Politikası
              </button>
              <button
                onClick={() => setActiveModal('kvkk')}
                className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer py-1 px-1.5 rounded"
              >
                KVKK Aydınlatma Metni
              </button>
              <button
                onClick={() => setActiveModal('cookies')}
                className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer py-1 px-1.5 rounded"
              >
                Çerez Politikası
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
                Anladım & Kapat
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
