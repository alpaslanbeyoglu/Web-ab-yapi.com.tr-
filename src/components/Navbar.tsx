import React, { useState } from 'react';
import { Logo } from './Logo';
import { MessageSquare, Shield, Menu, X, Phone, Building2, LogOut, CheckCircle2 } from 'lucide-react';
import { AdminUser } from './GoogleAdminAuthModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  adminUser: AdminUser | null;
  openAuthModal: () => void;
  onLogout: () => void;
  whatsappNumber: string;
  phoneNumber: string;
  logoUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isAdmin,
  adminUser,
  openAuthModal,
  onLogout,
  whatsappNumber,
  phoneNumber,
  logoUrl,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Anasayfa' },
    { id: 'guide', label: 'Kentsel Dönüşüm' },
    { id: 'stats', label: 'İstatistikler' },
    { id: 'projects', label: 'Projelerimiz' },
    { id: 'map', label: 'Proje Haritası' },
    { id: 'about', label: 'Hakkımızda' },
    { id: 'contact', label: 'İletişim' },
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
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              İstanbul Kentsel Dönüşüm Uzmanlığı
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline">6306 Sayılı Kanun Kapsamında Güvenli Projeler</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-teal-400" />
              <span className="font-semibold text-slate-200">{phoneNumber}</span>
            </a>
            {isAdmin && adminUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('admin')}
                  className="flex items-center gap-1.5 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded text-[11px] font-bold hover:bg-amber-400 transition-colors"
                  title="Yönetim Paneline Git"
                >
                  <Shield className="w-3 h-3" />
                  <span className="hidden md:inline">{adminUser.email}</span>
                  <span className="md:hidden">Yönetim</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-1 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded transition-colors"
                  title="Güvenli Çıkış Yap"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
                title="Google Hesabı ile Yönetici Girişi"
              >
                {/* Small Google G Icon */}
                <svg className="w-3 h-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google ile Yönetici Girişi</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-hidden"
        >
          <Logo size="md" logoUrl={logoUrl} />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-teal-700 bg-teal-50/80 font-bold border-b-2 border-teal-600'
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
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
            <span>WhatsApp Danışma</span>
          </a>

          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'admin'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Yönetim</span>
            </button>
          )}

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
                  ? 'bg-teal-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          {isAdmin && adminUser ? (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold bg-amber-500 text-slate-950 flex items-center justify-between"
            >
              <span>Yönetici Paneli</span>
              <span className="text-[11px] font-mono opacity-80">{adminUser.email}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal();
              }}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold bg-slate-800 text-white flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google ile Yönetici Girişi</span>
            </button>
          )}
          <a
            href={`https://wa.me/${formattedWhatsapp}?text=Merhaba%2C%20AB%20Yap%C4%B1%20kentsel%20d%C3%B6n%C3%BC%C5%9F%C3%BCm%20ve%20projeleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white py-3 rounded-lg font-bold text-sm"
          >
            <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
            <span>Hızlı WhatsApp Mesajı</span>
          </a>
        </div>
      )}
    </header>
  );
};
