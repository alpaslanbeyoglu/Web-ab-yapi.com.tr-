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

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <Calculator className="w-4 h-4 text-teal-400" />
            <span>Resmi Devlet Teşvikleri & Dönüşüm Simülatörü</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold font-outfit tracking-tight">
            Binanızın Dönüşüm ve Maliyet Simülasyonu
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Dairenizin yapım yılını ve brüt alanını girin; o dönemin inşaat teknik analizini görün, resmi **Yarısı Bizden (875 Bin Hibe + 875 Bin Kredi)** desteğiyle cebinizden çıkacak net miktarı hesaplayın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: User Inputs */}
          <div className="lg:col-span-6 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-sm font-extrabold uppercase text-amber-400 tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building className="w-4 h-4 text-amber-400" />
              <span>1. Daire ve Bina Bilgilerinizi Girin</span>
            </h3>

            {/* District Selection (Sadece Avrupa Yakası - Fatih & Komşu İlçeler Öncelikli) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Bulunduğu İlçe (Avrupa Yakası)
                </label>
                <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  Fatih & Komşu İlçeler Öncelikli
                </span>
              </div>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm font-bold text-white focus:outline-none focus:border-teal-400"
              >
                <optgroup label="📍 Fatih ve Doğrudan Komşu / Yakın İlçeler (Öncelikli Bölge)">
                  <option value="Fatih">Fatih (Tarihi Suriçi - Merkez Faaliyet Alanı)</option>
                  <option value="Zeytinburnu">Zeytinburnu (Fatih Komşusu)</option>
                  <option value="Eyüpsultan">Eyüpsultan (Haliç / Fatih Komşusu)</option>
                  <option value="Bayrampaşa">Bayrampaşa (Fatih Komşusu)</option>
                  <option value="Beyoğlu">Beyoğlu (Haliç Karşısı / Komşu)</option>
                  <option value="Bakırköy">Bakırköy (Sahil Aksı / Yakın)</option>
                  <option value="Güngören">Güngören (Yakın Bölge)</option>
                  <option value="Gaziosmanpaşa">Gaziosmanpaşa (Yakın Bölge)</option>
                  <option value="Esenler">Esenler (Yakın Bölge)</option>
                  <option value="Bahçelievler">Bahçelievler (Yakın Bölge)</option>
                  <option value="Şişli">Şişli (Merkez Aks)</option>
                  <option value="Kağıthane">Kağıthane (Merkez Aks)</option>
                  <option value="Beşiktaş">Beşiktaş (Merkez Aks)</option>
                </optgroup>
                <optgroup label="🏢 Diğer Avrupa Yakası İlçeleri">
                  <option value="Bağcılar">Bağcılar</option>
                  <option value="Sultangazi">Sultangazi</option>
                  <option value="Küçükçekmece">Küçükçekmece</option>
                  <option value="Avcılar">Avcılar</option>
                  <option value="Başakşehir">Başakşehir</option>
                  <option value="Beylikdüzü">Beylikdüzü</option>
                  <option value="Esenyurt">Esenyurt</option>
                  <option value="Büyükçekmece">Büyükçekmece</option>
                  <option value="Sarıyer">Sarıyer</option>
                  <option value="Arnavutköy">Arnavutköy</option>
                  <option value="Silivri">Silivri</option>
                  <option value="Çatalca">Çatalca</option>
                </optgroup>
              </select>
              {['Fatih', 'Zeytinburnu', 'Eyüpsultan', 'Bayrampaşa', 'Beyoğlu', 'Bakırköy', 'Güngören'].includes(district) && (
                <p className="text-[11px] text-teal-400 mt-1.5 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  <span>Seçilen ilçe AB Yapı'nın merkez şantiye ve suriçi lojistik ağı dahilindedir.</span>
                </p>
              )}
            </div>

            {/* Building Construction Year */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Binanızın Yapım Yılı
                </label>
                <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                  {constructionYear} Yılı Yapımı
                </span>
              </div>
              <input
                type="number"
                min="1950"
                max="2026"
                value={constructionYear}
                onChange={(e) => setConstructionYear(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm font-bold text-white focus:outline-none focus:border-teal-400"
              />
            </div>

            {/* Real Technical Summary Card Based on Construction Year */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Yapım Dönemi Teknik Özeti:
                </span>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${eraInfo.badgeColor}`}>
                  <EraIcon className="w-3 h-3" />
                  {eraInfo.riskLevel}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {eraInfo.summary}
              </p>
            </div>

            {/* Gross SqM */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Daire Brüt Alanı (m²)
                </label>
                <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-md border border-teal-500/20">
                  {grossSqM} m²
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="250"
                step="5"
                value={grossSqM}
                onChange={(e) => setGrossSqM(Number(e.target.value))}
                className="w-full accent-teal-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Editable Unit Cost Per SqM with USD Live FX Reference */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Birim m² İnşaat Maliyeti (₺ / m²)
                </label>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                  ~ ${(unitCostPerSqM / usdRate).toFixed(0)} USD / m²
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="1000"
                  min="10000"
                  max="100000"
                  value={unitCostPerSqM}
                  onChange={(e) => setUnitCostPerSqM(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 pr-16 text-sm font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  ₺/m²
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                *Öntanımlı birim maliyet <strong>$800 USD / m²</strong> karşılığı olarak <strong>₺{unitCostPerSqM.toLocaleString('tr-TR')} / m²</strong> hesaplanmıştır ({isLiveRate ? 'Canlı Kur (Piyasa)' : 'Referans Kur'}: 1 USD = ₺{usdRate.toFixed(2)}). Dilerseniz değiştirebilirsiniz.
              </p>
            </div>
          </div>

          {/* Right Column: Government Incentives & Payment Calculation */}
          <div className="lg:col-span-6 space-y-6">
            {/* Government Official Grant Package Display */}
            <div className="bg-gradient-to-br from-teal-950/80 to-slate-900 p-6 rounded-2xl border border-teal-500/40 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-teal-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-teal-400" />
                  <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
                    Yarısı Bizden Devlet Teşvik Paketi
                  </h4>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full">
                  Resmi Desteğe Tabi
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-teal-500/20 space-y-1">
                  <span className="text-slate-400 text-[11px] block font-medium">1. Devlet Hibesi (Karşılıksız):</span>
                  <span className="text-lg font-black text-emerald-400">
                    ₺{GRANT_TL.toLocaleString('tr-TR')}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Geri ödemesiz nakit hibe</span>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-teal-500/20 space-y-1">
                  <span className="text-slate-400 text-[11px] block font-medium">2. Uygun Faizli Devlet Kredisi:</span>
                  <span className="text-lg font-black text-teal-300">
                    ₺{LOAN_TL.toLocaleString('tr-TR')}
                  </span>
                  <span className="text-[10px] text-slate-400 block">10 yıl vadeli / 1 yıl ödemesiz</span>
                </div>
              </div>

              <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 flex items-center justify-between text-xs">
                <span className="text-slate-200 font-semibold">Taşınma / Kira Desteği Desteği:</span>
                <span className="font-extrabold text-amber-300">₺{MOVING_ASSISTANCE_TL.toLocaleString('tr-TR')}</span>
              </div>
            </div>

            {/* Estimated Out of Pocket Cost Calculation */}
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-amber-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  Maliyet & Ödeme Farkı Hesabı
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {grossSqM} m² × ₺{unitCostPerSqM.toLocaleString('tr-TR')}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span>Toplam Yaklaşık İnşaat Maliyeti:</span>
                  <span className="font-extrabold text-white text-sm">
                    ₺{totalConstructionCost.toLocaleString('tr-TR')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span>Düşülecek Devlet Desteği (Hibe + Kredi):</span>
                  <span className="font-extrabold text-emerald-400 text-sm">
                    - ₺{TOTAL_GOVT_INCENTIVE.toLocaleString('tr-TR')}
                  </span>
                </div>

                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-300 text-xs font-medium block">Cebinizden Çıkacak Yaklaşık Ödeme Farkı:</span>
                    <span className="text-[10px] text-amber-300/80">
                      {netOutofPocket === 0 ? 'Devlet teşviki toplam inşaat maliyetini tamamen karşılamaktadır!' : 'Devlet desteği düşüldükten sonra kalan net borçlanma miktarı'}
                    </span>
                  </div>
                  <div className="text-xl md:text-2xl font-black text-amber-400 shrink-0">
                    ₺{netOutofPocket.toLocaleString('tr-TR')}
                  </div>
                </div>
              </div>
            </div>

            {/* AB Yapı Payment Flexibilities & Malik Facilitation Banner */}
            <div className="p-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 rounded-2xl border border-amber-500/40 space-y-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-white text-xs uppercase tracking-wide">
                    AB Yapı Ödeme Kolaylıkları & Malik Destek Paketi
                  </h5>
                  <span className="text-[11px] text-amber-300 font-medium">
                    Fark ödemelerinde maliklere özel esnek finansman imkanı
                  </span>
                </div>
              </div>

              <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800 pt-3">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Cebinizden çıkacak fark ödemelerinde cazip vadeler sunuyoruz. (Vadeler sözleşmede belirlenir.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Dükkan/kat paylaşım modelli <strong>sıfır peşinatlı başlama opsiyonu</strong>.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>6306 Kentsel Dönüşüm kapsamında <strong>%1 KDV ve tüm harç/damga muafiyetleri</strong> yönetimi.</span>
                </li>
              </ul>

              <a
                href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(inquiryText)}`}
                onClick={() => {
                  trackCalculatorUse(district, apartmentCount, grossSqM);
                  trackWhatsAppClick('calculator_quote_request', `${district} - ${apartmentCount} Daire`);
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 bg-gradient-to-r from-teal-600 via-teal-700 to-slate-900 hover:from-teal-500 hover:to-slate-800 text-white font-extrabold py-3 px-4 rounded-xl shadow-lg border border-teal-500/30 flex items-center justify-center gap-2 text-xs transition-all hover:scale-[1.01]"
              >
                <MessageSquare className="w-4 h-4 fill-amber-400 text-slate-900" />
                <span>Bu Hesaplama İçin Özel Teklif Talebi Gönder</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
