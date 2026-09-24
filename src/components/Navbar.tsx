import React, { useState } from 'react';
import { Logo } from './Logo';
import { MessageSquare, Menu, X, Phone, Globe } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';
import { useLanguage, Language } from '../context/LanguageContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  whatsappNumber: string;
  phoneNumber: string;
  logoUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  whatsappNumber,
  phoneNumber,
  logoUrl,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isRtl } = useLanguage();

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'guide', label: t('nav.guide') },
    { id: 'stats', label: t('nav.stats') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'map', label: t('nav.map') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formattedWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification / Contact Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-2 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1.5 font-bold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t('nav.title')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${phoneNumber}`}
              onClick={() => trackPhoneClick('navbar_top_phone')}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-extrabold text-slate-200">{phoneNumber}</span>
            </a>

            {/* Language Switcher Buttons */}
            <div className="flex items-center bg-slate-850 rounded-lg p-0.5 border border-slate-800 text-[10px] font-black">
              <button
                onClick={() => setLanguage('tr')}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  language === 'tr' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                TR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  language === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  language === 'ar' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-hidden"
        >
          <Logo variant="full" size="md" logoUrl={logoUrl} />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-teal-950 bg-amber-400 font-extrabold shadow-sm'
                    : 'text-slate-700 hover:text-teal-700 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${formattedWhatsapp}?text=Merhaba%2C%20AB%20Yap%C4%B1%20kentsel%20d%C3%B6n%C3%BC%C5%9F%C3%BCm%20ve%20projeleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
            onClick={() => trackWhatsAppClick('navbar_main_btn')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
            <span>{t('nav.whatsapp')}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-teal-700 focus:outline-hidden"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === link.id
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={`https://wa.me/${formattedWhatsapp}?text=Merhaba%2C%20AB%20Yap%C4%B1%20kentsel%20d%C3%B6n%C3%BC%C5%9F%C3%BCm%20ve%20projeleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white py-3 rounded-lg font-bold text-sm"
          >
            <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
            <span>{t('nav.whatsapp')}</span>
          </a>
        </div>
      )}
    </header>
  );
};
