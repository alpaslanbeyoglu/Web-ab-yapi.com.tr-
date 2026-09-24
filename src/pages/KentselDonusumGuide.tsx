import React, { useState } from 'react';
import { GuideArticle } from '../types';
import { KentselDonusumCalculator } from '../components/KentselDonusumCalculator';
import { ComfortPackageOptions } from '../components/ComfortPackageOptions';
import { FileText, Scale, CheckCircle2, Bot, HelpCircle, ArrowRight, BookOpen, ShieldAlert, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  const categories = ['Tümü', 'Yasal Mevzuat', 'Finans & Destek', 'Teknik Standartlar'];

  const filteredGuides = guides.filter(
    (g) => selectedCategory === 'Tümü' || g.category === selectedCategory
  );

  const faqs = [
    {
      q: '6306 Sayılı Kanuna göre %50+1 çoğunluk kararı nasıl uygulanır?',
      a: 'T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı\'nın yaptığı son yasal düzenleme ile binada kentsel dönüşüm kararı alınabilmesi için arsa payı oranının %50 + 1 (Salt Çoğunluk) şartı getirilmiştir. Karara katılmayan veya muhalif kalan maliklere noter aracılığıyla 15 günlük ihtar gönderilir. Süre sonunda anlaşma sağlanamazsa hisseleri bakanlık il müdürlüğü tarafından diğer paydaşlara açık artırma ile satılır.',
    },
    {
      q: 'İstanbul kentsel dönüşüm kira yardımı ne kadar ve kaç ay ödenir?',
      a: 'İstanbul ilinde riskli yapı olarak tescillenen binalarda ikamet eden hak sahiplerine 18 ay boyunca aylık güncel tutarlarda devlet kira yardımı ödemesi yapılmaktadır. Kiracılara ise bir defaya mahsat taşınma desteği verilir.',
    },
    {
      q: 'Dönüşüm sürecinde noter, tapu ve KDV masrafları ne kadardır?',
      a: '6306 sayılı kanun kapsamında gerçekleştirilen kentsel dönüşüm projelerinde tapu harcı, damga vergisi, noter masrafları ve belediye harçları %100 muaftır. Ayrıca konut teslimlerinde inşaat KDV oranı %1 olarak uygulanır.',
    },
    {
      q: 'AB Yapı ile yapılan kentsel dönüşüm sözleşmesinin garantileri nelerdir?',
      a: 'AB Yapı tüm dönüşüm projelerinde gecikme cezalı tazminat maddeleri, banka teminat mektubu güvencesi ve C40/C50 yüksek dayanımlı beton standartları ile çalışır. İnşaat süresince tüm süreç hak sahipleri tarafından canlı ve şeffaf olarak takip edilebilir.',
    },
  ];

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

      {/* 5-Step Process Roadmap Cards */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-extrabold uppercase text-teal-700 tracking-wider">
            Adım Adım Yol Haritası
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 font-outfit">
            5 Adımda Güvenli Kentsel Dönüşüm Süreci
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              num: '01',
              title: 'Bina Risk Tespiti',
              desc: 'Lisanslı idareden karot ve demir analizi alınarak bina risk raporu hazırlanır.',
            },
            {
              num: '02',
              title: '%50+1 Karar',
              desc: 'Kat malikleri kurulunda salt çoğunluk ile AB Yapı dönüşüm teklifi onaylanır.',
            },
            {
              num: '03',
              title: 'Sözleşme & Proje',
              desc: 'Noter onaylı sıfır riskli kat karşılığı inşaat sözleşmesi imzalanır.',
            },
            {
              num: '04',
              title: 'Yıkım & İnşaat',
              desc: 'Belediye ruhsatı alınır, kira yardımı başlar ve C40 beton ile yapım başlar.',
            },
            {
              num: '05',
              title: 'Anahtar Teslim',
              desc: 'İskan alınır, kat mülkiyeti tapuları ve yeni konutlar hak sahiplerine teslim edilir.',
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative space-y-3 hover:border-teal-500 transition-colors"
            >
              <div className="text-3xl font-black text-teal-600 font-outfit">{step.num}</div>
              <h3 className="font-extrabold text-slate-900 text-sm">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

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

      {/* FAQ Accordion Section */}
      <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 md:p-10 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-extrabold uppercase text-teal-700 tracking-wider">
            Sıkça Sorulan Sorular
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 font-outfit">
            Kentsel Dönüşüm Hakkında Merak Edilenler
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 md:p-5 bg-slate-50 hover:bg-teal-50/50 font-bold text-slate-900 text-sm md:text-base flex justify-between items-center gap-4"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-teal-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 md:p-5 text-xs md:text-sm text-slate-700 leading-relaxed bg-white border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
