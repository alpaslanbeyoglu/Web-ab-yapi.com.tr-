import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';

interface WhatsAppButtonProps {
  whatsappNumber: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ whatsappNumber }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customTopic, setCustomTopic] = useState('Kentsel Dönüşüm Detay Bilgisi');
  const [userNote, setUserNote] = useState('');

  const formattedWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  const topics = [
    'Kentsel Dönüşüm Binası İnceleme Talebi',
    'Devam Eden Projeler / Daire Fiyatları',
    'Kat Karşılığı Müteahhitlik Teklifi',
    '6306 Sayılı Kanun Danışmanlığı',
  ];

  const handleSend = () => {
    trackWhatsAppClick('floating_widget_send', customTopic);
    const text = `Merhaba AB Yapı Yetkilisi,\n\n${customTopic} hakkında bilgi almak istiyorum.\n\nNot: ${userNote || 'Binamız için ön görüşme talep ediyorum.'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${formattedWhatsapp}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end select-none">
      {/* Pop-up Chat Box */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_30px_rgba(16,185,129,0.3)] border border-emerald-500/30 overflow-hidden animate-fadeIn transform origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-400/20 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center font-black text-lg shadow-inner">
                AB
              </div>
              <div>
                <h4 className="font-extrabold text-sm tracking-tight text-white drop-shadow-xs">AB Yapı WhatsApp Hattı</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  Çevrimiçi · Müşteri Danışmanı
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 bg-slate-50/90 space-y-3.5 text-xs">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 text-slate-700 shadow-sm leading-relaxed">
              👋 Merhaba! AB Yapı kentsel dönüşüm uzmanlarımızla doğrudan iletişim kurmak için konuyu seçip mesaja tıklayın.
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Görüşme Konusu:</label>
              <select
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-emerald-600 cursor-pointer shadow-2xs"
              >
                {topics.map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Notunuz (İsteğe Bağlı):</label>
              <textarea
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Örn: Fatih Cerrahpaşa'da binamız var, dönüşüm şartlarını öğrenmek istiyorum..."
                rows={2}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-emerald-600 shadow-2xs resize-none"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp Sohbeti Başlat</span>
            </button>
          </div>
        </div>
      )}

      {/* 3D Elevated Holographic Floating Trigger Button */}
      <button
        onClick={() => {
          if (!isOpen) trackWhatsAppClick('floating_widget_open');
          setIsOpen(!isOpen);
        }}
        className="group relative flex items-center gap-2.5 bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 hover:from-emerald-600 hover:to-teal-400 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_15px_35px_-5px_rgba(5,150,105,0.6),0_0_20px_rgba(16,185,129,0.4)] border-t border-emerald-300/40 ring-1 ring-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-float-slow"
        aria-label="WhatsApp Canlı Danışma"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-emerald-600 shadow-xs"></span>
        </span>
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-emerald-600 drop-shadow-xs" />
        <span className="hidden sm:inline font-extrabold text-xs sm:text-sm tracking-wide drop-shadow-xs">
          WhatsApp Hattı
        </span>
      </button>
    </div>
  );
};
