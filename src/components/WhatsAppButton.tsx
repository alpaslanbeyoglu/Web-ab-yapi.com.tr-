import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

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
    const text = `Merhaba AB Yapı Yetkilisi,\n\n${customTopic} hakkında bilgi almak istiyorum.\n\nNot: ${userNote || 'Binamız için ön görüşme talep ediyorum.'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${formattedWhatsapp}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Pop-up Chat Box */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                AB
              </div>
              <div>
                <h4 className="font-bold text-sm">AB Yapı WhatsApp Hattı</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  Çevrimiçi · Müşteri Danışmanı
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-slate-700 shadow-2xs">
              👋 Merhaba! AB Yapı kentsel dönüşüm uzmanlarımızla doğrudan iletişim kurmak için konuyu seçip mesaja tıklayın.
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Görüşme Konusu:</label>
              <select
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-hidden focus:border-emerald-600"
              >
                {topics.map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Notunuz (İsteğe Bağlı):</label>
              <textarea
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Örn: Kadıköy'de 10 dairelik apartmanımız var..."
                rows={2}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp Sohbeti Başlat</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="WhatsApp Canlı Danışma"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
        <MessageSquare className="w-6 h-6 fill-white text-emerald-600" />
        <span className="hidden sm:inline font-bold text-sm">Hızlı WhatsApp</span>
      </button>
    </div>
  );
};
