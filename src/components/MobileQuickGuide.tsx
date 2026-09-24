import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Gift,
  Building2,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Award,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { CompanyInfo, Project } from '../types';

interface MobileQuickGuideProps {
  companyInfo: CompanyInfo;
  projects: Project[];
  rentAssistanceTL: number;
  setActiveTab: (tab: string) => void;
  onSelectProject: (project: Project) => void;
}

export const MobileQuickGuide: React.FC<MobileQuickGuideProps> = ({
  companyInfo,
  projects,
  rentAssistanceTL,
  setActiveTab,
  onSelectProject,
}) => {
  const [activeTab, setActiveTabTab] = useState<'maliyet' | 'devlet' | 'muteahhit' | 'iletisim'>('maliyet');

  const [usdRate, setUsdRate] = useState<number>(42.50);
  const [isLiveRate, setIsLiveRate] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates && data.rates.TRY) {
          setUsdRate(data.rates.TRY);
          setIsLiveRate(true);
        }
      })
      .catch(() => {});
  }, []);

  const [grossSqM, setGrossSqM] = useState<number>(65);
  const [unitCost, setUnitCost] = useState<number>(Math.round(800 * usdRate));

  useEffect(() => {
    setUnitCost(Math.round(800 * usdRate));
  }, [usdRate]);

  const totalCost = grossSqM * unitCost;
  const totalGovtIncentive = 1750000; // 875k hibe + 875k kredi
  const netOutOfPocket = Math.max(0, totalCost - totalGovtIncentive);

  const formattedWhatsapp = companyInfo.whatsapp.replace(/[^0-9]/g, '');

  const inquiryText = `Merhaba AB Yapı,\n\nMobil siteden ${grossSqM} m² dairem için hesaplama yaptım.\nTahmini ödeme farkı: ₺${netOutOfPocket.toLocaleString('tr-TR')}.\nÜcretsiz yerinde inceleme ve detaylı bilgi rica ediyorum.`;

  return (
    <div className="block md:hidden bg-slate-900 text-white rounded-3xl p-5 shadow-xl border border-slate-800 space-y-5">
      {/* Mobile Top Header Banner */}
      <div className="text-center space-y-1.5 border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-[11px] font-extrabold uppercase tracking-wider border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Mobil Hızlı Dönüşüm Rehberi</span>
        </div>
        <h2 className="text-xl font-extrabold font-outfit text-white">
          Sıkça Sorulan 4 Ana Detay
        </h2>
        <p className="text-xs text-slate-300">
          Aşağıdaki butonlara tıklayarak doğrudan merak ettiğiniz konuya ulaşın:
        </p>
      </div>

      {/* 4 Quick Tab Buttons for Mobile Users */}
      <div className="grid grid-cols-2 gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTabTab('maliyet')}
          className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
            activeTab === 'maliyet'
              ? 'bg-teal-600 border-teal-400 text-white shadow-lg'
              : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}
        >
          <Calculator className="w-4 h-4 text-teal-300" />
          <span>1. Evim Ne Kadara Mal Olur?</span>
        </button>

        <button
          onClick={() => setActiveTabTab('devlet')}
          className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
            activeTab === 'devlet'
              ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
              : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}
        >
          <Gift className="w-4 h-4 text-amber-300" />
          <span>2. Devlet Destekleri</span>
        </button>

        <button
          onClick={() => setActiveTabTab('muteahhit')}
          className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
            activeTab === 'muteahhit'
              ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
              : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}
        >
          <Building2 className="w-4 h-4 text-blue-300" />
          <span>3. Müteahhit Geçmişi</span>
        </button>

        <button
          onClick={() => setActiveTabTab('iletisim')}
          className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
            activeTab === 'iletisim'
              ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
              : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}
        >
          <Phone className="w-4 h-4 text-emerald-300" />
          <span>4. Müteahhitten Bilgi Al</span>
        </button>
      </div>

      {/* TAB 1: MALIYET HESAPLAYICI (MOBIL OZET) */}
      {activeTab === 'maliyet' && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-teal-500/30 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-extrabold text-teal-400 uppercase tracking-wide">
              Maliyet & Cebinizden Çıkacak Miktar
            </span>
            <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-md font-bold">
              Yarısı Bizden Düşülmüş
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-300 mb-1">
                <span>Daire Brüt Alanı:</span>
                <span className="text-teal-400">{grossSqM} m²</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={grossSqM}
                onChange={(e) => setGrossSqM(Number(e.target.value))}
                className="w-full accent-teal-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-300">
                  Birim m² İnşaat Maliyeti (₺)
                </label>
                <span className="text-[11px] font-bold text-amber-400">
                  ~ ${(unitCost / usdRate).toFixed(0)} USD / m²
                </span>
              </div>
              <input
                type="number"
                step="1000"
                value={unitCost}
                onChange={(e) => setUnitCost(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-amber-300"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                *Öntanımlı gelen birim maliyet <strong>$800 USD / m²</strong> karşılığı <strong>₺{unitCost.toLocaleString('tr-TR')} / m²</strong> olarak hesaplanmıştır ({isLiveRate ? 'Canlı Kur (Piyasa)' : 'Referans Kur'}: 1 USD = ₺{usdRate.toFixed(2)}).
              </p>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl space-y-1.5 border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Toplam Maliyet:</span>
                <span className="font-bold text-white">₺{totalCost.toLocaleString('tr-TR')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Devlet Desteği (Hibe+Kredi):</span>
                <span className="font-bold text-emerald-400">- ₺1.750.000</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="font-extrabold text-amber-400 text-xs">Cebinizden Çıkacak Miktar:</span>
                <span className="font-black text-amber-400 text-base">
                  ₺{netOutOfPocket.toLocaleString('tr-TR')}
                </span>
              </div>
            </div>

            <a
              href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(inquiryText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
              <span>Bu Maliyet İçin Müteahhitten Bilgi Al</span>
            </a>
          </div>
        </div>
      )}

      {/* TAB 2: DEVLET DESTEKLERI (MOBIL OZET) */}
      {activeTab === 'devlet' && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-3 animate-fadeIn text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold border-b border-slate-800 pb-2">
            <Gift className="w-4 h-4" />
            <span>Resmi Yarısı Bizden & Devlet Teşvikleri</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-400 block">875.000 ₺ Karşılıksız Hibe</strong>
                <span className="text-[11px] text-slate-300">Geri ödemesiz devlet tarafından doğrudan sağlanan nakit destek.</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-teal-300 block">875.000 ₺ Uygun Kredi (10 Yıl Vadeli)</strong>
                <span className="text-[11px] text-slate-300">İlk yıl ödemesiz, düşük faizli uzun vadeli konut yapım kredisi.</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block">100.000 ₺ Taşınma & Kira Desteği</strong>
                <span className="text-[11px] text-slate-300">İnşaat süresince hak sahiplerine verilen taşınma ve aylık destek.</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">%1 KDV & Sıfır Harç / Damga Vergisi</strong>
                <span className="text-[11px] text-slate-300">6306 sayılı kanun kapsamında tüm tapu ve harç muafiyetleri.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MUTEAHHIT GECMISI & AB YAPI (MOBIL OZET) */}
      {activeTab === 'muteahhit' && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-3 animate-fadeIn text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold border-b border-slate-800 pb-2">
            <Building2 className="w-4 h-4" />
            <span>Müteahhit Geçmişi & AB Yapı Güvencesi</span>
          </div>

          <p className="text-slate-300 leading-relaxed text-[11px]">
            AB Yapı, İstanbul Suriçi / Fatih başta olmak üzere tarihi ve merkezi dokuda kentsel dönüşüm alanında uzmanlaşmış köklü bir inşaat firmasıdır.
          </p>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <div className="text-lg font-black text-amber-400">21 Proje</div>
              <div className="text-[10px] text-slate-400">Teslim Edilmiş Eser</div>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <div className="text-lg font-black text-teal-300">%100</div>
              <div className="text-[10px] text-slate-400">Zamanında Teslimat</div>
            </div>
          </div>

          <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-[11px] text-amber-200 space-y-1">
            <strong className="block text-white">🤝 Ödeme Kolaylığı:</strong>
            Cebinizden çıkacak fark ödemelerinde cazip vadeler sunuyoruz. (Vadeler sözleşmede belirlenir.)
          </div>

          <button
            onClick={() => setActiveTab('projects')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs border border-slate-700"
          >
            <span>21 Tamamlanan Projeyi İncele</span>
            <ChevronRight className="w-4 h-4 text-teal-400" />
          </button>
        </div>
      )}

      {/* TAB 4: ILETISIM & MUTEAHHITTEN BILGI AL (MOBIL OZET) */}
      {activeTab === 'iletisim' && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-teal-500/30 space-y-3 animate-fadeIn text-xs">
          <div className="flex items-center gap-2 text-teal-400 font-extrabold border-b border-slate-800 pb-2">
            <Phone className="w-4 h-4" />
            <span>Müteahhitle Doğrudan İletişime Geçin</span>
          </div>

          <p className="text-slate-300 text-[11px]">
            Binanızın durumu veya kentsel dönüşüm şartları hakkında teknik ekibimiz ve müteahhidimizle doğrudan görüşün:
          </p>

          <div className="space-y-2 pt-1">
            <a
              href={`https://wa.me/${formattedWhatsapp}?text=Merhaba%2C%20AB%20Yap%C4%B1%20m%C3%BCteahhidinden%20binam%C4%B1z%20i%C3%A7in%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-teal-600 via-teal-700 to-slate-900 hover:from-teal-500 hover:to-slate-800 text-white font-extrabold p-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md border border-teal-500/30"
            >
              <MessageSquare className="w-4 h-4 fill-amber-400 text-slate-900" />
              <span>WhatsApp İle Müteahhitten Bilgi Al</span>
            </a>

            <a
              href={`tel:${companyInfo.phone}`}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold p-3 rounded-xl flex items-center justify-center gap-2 text-xs border border-slate-700"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Direkt Telefon Et: {companyInfo.phone}</span>
            </a>

            <button
              onClick={() => setActiveTab('contact')}
              className="w-full bg-teal-700/50 hover:bg-teal-700 text-teal-200 font-bold p-3 rounded-xl flex items-center justify-center gap-2 text-xs border border-teal-500/30"
            >
              <span>Ücretsiz Yerinde Teknik İnceleme İste</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
