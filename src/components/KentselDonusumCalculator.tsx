import React, { useState, useEffect } from 'react';
import {
  Calculator,
  ShieldCheck,
  Banknote,
  Gift,
  HelpCircle,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  Layers,
  Building,
  CreditCard,
  Check,
} from 'lucide-react';
import { trackWhatsAppClick, trackCalculatorUse } from '../utils/analytics';

interface CalculatorProps {
  rentAssistanceTL: number;
  whatsappNumber: string;
}

export const KentselDonusumCalculator: React.FC<CalculatorProps> = ({
  rentAssistanceTL,
  whatsappNumber,
}) => {
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

  const DEFAULT_USD_PER_SQM = 800; // 800 USD / m2
  const DEFAULT_TL_PER_SQM = Math.round(DEFAULT_USD_PER_SQM * usdRate);

  const [district, setDistrict] = useState('Fatih');
  const [constructionYear, setConstructionYear] = useState<number>(1992);
  const [grossSqM, setGrossSqM] = useState<number>(65);
  const [unitCostPerSqM, setUnitCostPerSqM] = useState<number>(DEFAULT_TL_PER_SQM);
  const [apartmentCount, setApartmentCount] = useState<number>(10);

  // Keep unit cost in sync when usdRate first loads if user hasn't customized it
  useEffect(() => {
    setUnitCostPerSqM(Math.round(800 * usdRate));
  }, [usdRate]);

  // Official Yarısı Bizden Government Incentives Constants
  const GRANT_TL = 875000; // 875 Bin TL Karşılıksız Hibe
  const LOAN_TL = 875000;  // 875 Bin TL Uygun Kredi
  const MOVING_ASSISTANCE_TL = 100000; // 100 Bin TL Taşınma Yardımı
  const TOTAL_GOVT_INCENTIVE = GRANT_TL + LOAN_TL; // 1.750.000 TL

  // Calculations
  const totalConstructionCost = grossSqM * unitCostPerSqM; // m² * birim maliyet
  const netOutofPocket = Math.max(0, totalConstructionCost - TOTAL_GOVT_INCENTIVE);
  const totalBuildingRentSupport = apartmentCount * rentAssistanceTL * 18;

  // Technical Era Summary Generator
  const getEraTechnicalSummary = (year: number) => {
    if (year < 1999) {
      return {
        era: '1999 Öncesi (Marmara Depremi Öncesi Yapı Standartları)',
        riskLevel: 'Yüksek Risk Sınıfı',
        badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
        icon: AlertTriangle,
        summary:
          '1999 öncesi yapılarda düz/nervürsüz demir donatı, şantiyede kürekle karma düşük mukavemetli beton (C10-C16), zorunlu zemin etüdü ve hazır beton standartlarının bulunmaması sebebiyle deprem riski yüksek gruptadır. Acil karot ve risk tespiti önerilir.',
      };
    } else if (year >= 1999 && year <= 2007) {
      return {
        era: '1999 - 2007 Arası Dönem (1998 Deprem Yönetmeliği)',
        riskLevel: 'Orta Risk Sınıfı',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        icon: Info,
        summary:
          '1998 yönetmeliği ile hazır beton ve nervürlü demir kullanımı zorunlu hale gelmiş ancak C30+ yüksek beton mukavemeti ve modern radye jenerasyon temeller henüz yaygınlaşmamıştır.',
      };
    } else if (year > 2007 && year <= 2018) {
      return {
        era: '2007 - 2018 Arası Dönem (2007 Deprem Yönetmeliği)',
        riskLevel: 'Düşük Risk Sınıfı',
        badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        icon: Info,
        summary:
          '2007 yönetmeliğine uygun olarak denetim altında inşa edilmiştir. Yapı performansı ve beton dayanımı 1999 öncesine göre oldukça yüksektir.',
      };
    } else {
      return {
        era: '2018 Sonrası (TBDY 2018 Güncel Deprem Yönetmeliği)',
        riskLevel: 'Güncel Standartlara Tam Uyumlu',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        icon: CheckCircle2,
        summary:
          'Türkiye Bina Deprem Yönetmeliği (TBDY 2018) standartlarına, C30/C40 hazır beton sınıflarına ve radye temellere tabi yüksek dayanımlı yapılardır.',
      };
    }
  };

  const eraInfo = getEraTechnicalSummary(constructionYear);
  const EraIcon = eraInfo.icon;
  const formattedWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  const inquiryText = `Merhaba AB Yapı,\n\nİstanbul ${district} bölgesinde ${constructionYear} yapımı, ${grossSqM} m² brüt alanlı dairemiz için kentsel dönüşüm maliyet hesabı yaptım.\n\nBirim m² maliyeti: ₺${unitCostPerSqM.toLocaleString('tr-TR')}\nTahmini ödeme farkım: ₺${netOutofPocket.toLocaleString('tr-TR')}\n\nYarısı Bizden desteği ve AB Yapı ödeme kolaylıkları hakkında detaylı teklif almak istiyorum.`;

  const [activeTab, setActiveTab] = useState<'inputs' | 'results'>('inputs');

  // ... (rest of the logic remains the same until return)

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-4 md:p-6 shadow-2xl border border-slate-800 relative overflow-hidden">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-teal-500/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simülatör</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold font-outfit">
            Dönüşüm Maliyet Simülasyonu
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('inputs')}
            className={`flex-1 py-2 text-xs font-bold ${activeTab === 'inputs' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400'}`}
          >
            Bilgiler
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex-1 py-2 text-xs font-bold ${activeTab === 'results' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400'}`}
          >
            Sonuçlar
          </button>
        </div>

        <div className="pt-2">
          {activeTab === 'inputs' ? (
            /* Inputs */
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-[11px] font-extrabold uppercase text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Building className="w-3.5 h-3.5" />
                <span>1. Daire & Bina Bilgileri</span>
              </h3>

              {/* Input Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400">İlçe</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-teal-400"
                  >
                    <option value="Fatih">Fatih</option>
                    <option value="Zeytinburnu">Zeytinburnu</option>
                    <option value="Bakırköy">Bakırköy</option>
                    <option value="Beşiktaş">Beşiktaş</option>
                    <option value="Diğer">Diğer (Avrupa Yakası)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Yapım Yılı</label>
                  <input
                    type="number"
                    value={constructionYear}
                    onChange={(e) => setConstructionYear(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-bold text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Daire Sayısı</label>
                  <input
                    type="number"
                    value={apartmentCount}
                    onChange={(e) => setApartmentCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-bold text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Brüt m²</label>
                  <input
                    type="number"
                    value={grossSqM}
                    onChange={(e) => setGrossSqM(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-bold text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Birim Maliyet (₺/m²)</label>
                  <input
                    type="number"
                    value={unitCostPerSqM}
                    onChange={(e) => setUnitCostPerSqM(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-bold text-amber-300"
                  />
                </div>
              </div>
              
              {/* Technical Summary Mini */}
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[10px]">
                <div className={`flex items-center gap-1.5 font-bold ${eraInfo.badgeColor.replace('bg-','text-').replace('/20','').replace('border-','').replace('30','60')}`}>
                  <EraIcon className="w-3 h-3" />
                  {eraInfo.riskLevel}
                </div>
                <p className="text-slate-400 mt-1 leading-snug line-clamp-2">{eraInfo.summary}</p>
              </div>
            </div>
          ) : (
            /* Results */
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-[11px] font-extrabold uppercase text-teal-400 tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <Banknote className="w-3.5 h-3.5" />
                <span>2. Maliyet & Devlet Desteği</span>
              </h3>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span>İnşaat Maliyeti:</span>
                  <span className="font-bold">₺{totalConstructionCost.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span>Devlet Desteği (Hibe+Kredi):</span>
                  <span className="font-bold text-emerald-400">- ₺{TOTAL_GOVT_INCENTIVE.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-amber-900/20 border border-amber-500/30">
                  <span className="font-bold">Cebinizden Çıkacak (Net):</span>
                  <span className="font-black text-amber-400 text-sm">₺{netOutofPocket.toLocaleString('tr-TR')}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(inquiryText)}`}
                onClick={() => {
                  trackCalculatorUse(district, apartmentCount, grossSqM);
                  trackWhatsAppClick('calculator_quote_request', `${district} - ${apartmentCount} Daire`);
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-extrabold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Özel Teklif Al</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
