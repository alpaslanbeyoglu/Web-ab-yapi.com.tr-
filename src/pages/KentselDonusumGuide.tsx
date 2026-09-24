import React, { useState } from 'react';
import { GuideArticle } from '../types';
import { KentselDonusumCalculator } from '../components/KentselDonusumCalculator';
import { ComfortPackageOptions } from '../components/ComfortPackageOptions';
import { KentselDonusumFAQ } from '../components/KentselDonusumFAQ';
import { KentselDonusumTimeline } from '../components/KentselDonusumTimeline';
import { FileText, Scale, CheckCircle2, Bot, HelpCircle, ArrowRight, BookOpen, ShieldAlert, Sparkles } from 'lucide-react';

interface GuideProps {
  guides: GuideArticle[];
  rentAssistanceTL: number;
  whatsappNumber: string;
  openAIConsultant: () => void;
}

export const KentselDonusumGuide: React.FC<GuideProps> = ({
  guides,
  rentAssistanceTL,
  whatsappNumber,
  openAIConsultant,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  const categories = ['Tümü', 'Yasal Mevzuat', 'Finans & Destek', 'Teknik Standartlar'];

  const filteredGuides = guides.filter(
    (g) => selectedCategory === 'Tümü' || g.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30">
          <Scale className="w-3.5 h-3.5" />
          <span>6306 Sayılı Yasal Mevzuat & Rehber</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold font-outfit tracking-tight">
          Kentsel Dönüşüm Süreçleri ve Haklarınız
        </h1>
        <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
          Evini yenilemek isteyen kat maliklerinin bilmesi gereken yasal aşamalar, devlet destekleri, çoğunluk kararları ve teknik standartlar rehberi.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={openAIConsultant}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold px-5 py-3 rounded-xl shadow-md text-xs flex items-center gap-2 transition-all"
          >
            <Bot className="w-4 h-4 text-slate-950" />
            <span>AI Mevzuat Asistanına Soru Sor</span>
          </button>
        </div>
      </div>

      {/* Visual Hukuki & Teknik Kentsel Dönüşüm Zaman Çizelgesi */}
      <KentselDonusumTimeline whatsappNumber={whatsappNumber} />

      {/* Guide Articles Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold text-slate-900 font-outfit">
            Mevzuat ve Uzman Makaleleri
          </h2>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedCategory === cat ? 'bg-teal-700 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="bg-teal-50 text-teal-800 font-bold px-2.5 py-1 rounded-md border border-teal-200">
                    {guide.category}
                  </span>
                  <span className="text-slate-400">{guide.date}</span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                  {guide.title}
                </h3>

                {guide.lawReference && (
                  <div className="text-[11px] text-amber-800 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200">
                    ⚖️ Referans: {guide.lawReference}
                  </div>
                )}

                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {guide.summary}
                </p>
              </div>

              {guide.steps && (
                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-800">Süreç Aşamaları:</div>
                  {guide.steps.slice(0, 3).map((st, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong>{st.title}:</strong> {st.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Calculator Component Embed */}
      <KentselDonusumCalculator
        rentAssistanceTL={rentAssistanceTL}
        whatsappNumber={whatsappNumber}
      />

      {/* Hak Sahiplerine Sunulan Opsiyonel Konfor Paketi */}
      <ComfortPackageOptions />

      {/* Dynamically Filterable FAQ Accordion Component */}
      <KentselDonusumFAQ whatsappNumber={whatsappNumber} />
    </div>
  );
};
