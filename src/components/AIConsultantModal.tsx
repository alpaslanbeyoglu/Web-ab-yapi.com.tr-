import React, { useState } from 'react';
import { Bot, Send, X, Loader2, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

interface AIConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIConsultantModal: React.FC<AIConsultantModalProps> = ({
  isOpen,
  onClose,
  whatsappNumber,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Merhaba! Ben AB Yapı Kentsel Dönüşüm ve 6306 Sayılı Kanun Yapay Zeka Danışmanıyım. İstanbul\'daki mülkünüz, bina risk tespiti, %50+1 çoğunluk kararı, kira yardımı veya projelerimiz hakkında merak ettiğiniz her şeyi sorabilirsiniz.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    '6306 sayılı kanuna göre %50+1 kararı nasıl alınır?',
    'İstanbul için güncel kentsel dönüşüm kira yardımı ne kadar?',
    'Binamızın riskli yapı tespiti için ilk adım ne olmalı?',
    'Kat karşılığı dönüşümde KDV muafiyeti var mı?',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: query };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/kentsel-donusum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: newMessages.slice(0, -1),
        }),
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setMessages([...newMessages, { role: 'assistant', content: data.text }]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content:
              'Üzgünüm, bir bağlantı sorunu oluştu. Lütfen sorunuzu tekrar yazınız veya doğrudan WhatsApp hattımızdan teknik ekibimize ulaşınız.',
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            'AI Danışman sunucusuna erişilemedi. Lütfen bağlantınızı kontrol ediniz veya WhatsApp hattımızı kullanınız.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formattedWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-between border-b border-teal-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg flex items-center gap-2">
                <span>AB Yapı Kentsel Dönüşüm Danışmanı</span>
                <span className="text-[10px] bg-teal-500/30 text-teal-200 px-2 py-0.5 rounded-full uppercase font-bold border border-teal-400/20">
                  AI Powered
                </span>
              </h3>
              <p className="text-xs text-teal-200/80">
                6306 Yasal Mevzuat, Haklar & Teknik Süreç Asistanı
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Questions Chips */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap self-center flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Sık Sorulanlar:
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={loading}
              className="text-xs bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap transition-colors shadow-2xs font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs shadow-xs">
                  AB
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none shadow-md'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 items-center text-xs text-slate-500 italic">
              <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
                AB
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                <span>6306 mevzuat veritabanı taranıyor ve yanıt hazırlanıyor...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar & Footer */}
        <div className="p-3 md:p-4 bg-white border-t border-slate-200 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Kentsel dönüşüm, mevzuat veya binanız hakkında soru sorun..."
              className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-800 focus:outline-hidden focus:border-teal-600 focus:bg-white transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white px-5 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <span>Gönder</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-500" /> Resmi karar öncesi teknik uzmanlarımızla yerinde inceleme önerilir.
            </span>
            <a
              href={`https://wa.me/${formattedWhatsapp}?text=Merhaba%2C%20AB%20Yap%C4%B1%20uzman%C4%B1yla%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3" /> WhatsApp Uzmanına Bağlan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
