import React from 'react';
import { Logo } from './Logo';
import { CompanyInfo } from '../types';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  companyInfo: CompanyInfo;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ companyInfo, setActiveTab }) => {
  const formattedWhatsapp = companyInfo.whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" size="lg" logoUrl={companyInfo.logoUrl} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
              AB Yapı; İstanbul genelinde kentsel dönüşüm, yüksek güvenlikli konut ve ticari projeler üreten kurumsal inşaat ve mühendislik firmasıdır. 6306 sayılı kanun kapsamında güvene yükselen yapılar inşa ediyoruz.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-teal-400 font-semibold">
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
                  className="hover:text-teal-400 transition-colors"
                >
                  Anasayfa
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('stats')}
                  className="hover:text-teal-400 transition-colors"
                >
                  İstanbul İstatistikleri
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Projelerimiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('map')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Etkileşimli Proje Haritası
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('guide')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Kentsel Dönüşüm Rehberi
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Guide Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Mevzuat & Rehber
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('guide')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                  <span>6306 Sayılı Kanun %50+1 Çoğunluk</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('guide')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Devlet Kira Yardımı ve Faiz Desteği
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Kalite Politikamız & Çalışma İlkelerimiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-teal-400 transition-colors"
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
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{companyInfo.address}, {companyInfo.district} / {companyInfo.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-white font-semibold">
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
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
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-md transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white text-emerald-600" />
                <span>WhatsApp İletişim Hattı</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {companyInfo.name} ({companyInfo.domain}). Tüm Hakları Saklıdır.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Gizlilik Politikası</span>
            <span className="hover:text-slate-400 cursor-pointer">KVKK Aydınlatma Metni</span>
            <span className="hover:text-slate-400 cursor-pointer">Çerez Politikası</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
