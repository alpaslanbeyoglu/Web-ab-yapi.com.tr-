import React, { useState } from 'react';
import { IstanbulConstructionStats } from '../types';
import { BarChart3, TrendingUp, AlertTriangle, Building, ShieldCheck, CheckCircle2, ArrowUpRight, Search, Calendar } from 'lucide-react';

interface StatisticsProps {
  stats: IstanbulConstructionStats;
  setActiveTab: (tab: string) => void;
}

export const Statistics: React.FC<StatisticsProps> = ({ stats, setActiveTab }) => {
  const [searchDistrict, setSearchDistrict] = useState('');

  const filteredDistricts = stats.districtBreakdown.filter((d) =>
    d.district.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  const totalTargetProgressPercent = Math.round(
    (stats.totalRenewedUnits / stats.totalRiskyUnitsTarget) * 100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Resmi Veri & Sektörel Analiz</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-outfit tracking-tight">
            İstanbul İnşaat & Kentsel Dönüşüm İstatistikleri
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            İstanbul genelinde yapı stoğu yaş dağılımı, risk haritası, kentsel yenileme hedefleri ve ilçe bazlı kentsel dönüşüm göstergeleri.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs text-teal-400 font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Son Güncelleme Tarihi: {stats.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Main Target Progress Gauge */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-xl font-outfit">
              İstanbul Toplam Riskli Yapı Dönüşüm Hedefi
            </h3>
            <p className="text-xs text-slate-500">
              Çevre, Şehircilik ve İklim Değişikliği Bakanlığı ve İSKİ/İBB kentsel dönüşüm projeksiyonu
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-teal-700">{stats.totalRenewedUnits.toLocaleString('tr-TR')}</span>
            <span className="text-slate-400 text-xs font-medium"> / {stats.totalRiskyUnitsTarget.toLocaleString('tr-TR')} Konut</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Dönüşüm Tamamlanma Oranı</span>
            <span className="text-teal-700">%{totalTargetProgressPercent}</span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-gradient-to-r from-teal-600 to-emerald-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${totalTargetProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Building Age Distribution Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">İstanbul Bina Yaşı Dağılımı</h3>
            <p className="text-xs text-slate-500">1999 Deprem Yönetmeliği öncesi ve sonrası durum</p>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md">
            Kritik Risk Alanı
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
              <span className="flex items-center gap-1.5 text-amber-700">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> 1999 Öncesi Binalar (Kritik Risk)
              </span>
              <span>%{stats.buildingAgeBreakdown.pre1999}</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full"
                style={{ width: `${stats.buildingAgeBreakdown.pre1999}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
              <span>1999 - 2018 Arası Binalar (Orta Seviye)</span>
              <span>%{stats.buildingAgeBreakdown.between1999and2018}</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-slate-500 h-full rounded-full"
                style={{ width: `${stats.buildingAgeBreakdown.between1999and2018}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 2018 Sonrası (Deprem Güvenlikli)
              </span>
              <span>%{stats.buildingAgeBreakdown.post2018}</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${stats.buildingAgeBreakdown.post2018}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="font-bold">Önemli Not:</div>
          <p>
            1999 öncesi inşa edilen binaların yaklaşık %72'sinde deniz kumu kullanımı ve yetersiz donatı detayları tespit edilmiştir. Bu binaların 6306 sayılı kanun kapsamında acilen yenilenmesi gerekmektedir.
          </p>
        </div>
      </div>

      {/* District Breakdown Table */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-xl font-outfit">
              İlçe Bazlı Kentsel Dönüşüm & Risk Tablosu
            </h3>
            <p className="text-xs text-slate-500">
              İstanbul ilçelerine göre tespit edilen riskli binalar ve ortalama bina yaşları
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="İlçe Ara (Örn: Kadıköy)..."
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-teal-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">İlçe Adı</th>
                <th className="p-3.5 text-right">Riskli Bina Sayısı</th>
                <th className="p-3.5 text-right">Yenilenen Bina</th>
                <th className="p-3.5 text-center">Ort. Bina Yaşı</th>
                <th className="p-3.5 text-center">Risk Faktörü</th>
                <th className="p-3.5 text-right">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredDistricts.map((d, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 text-sm">{d.district}</td>
                  <td className="p-3.5 text-right tabular-nums text-slate-700 font-semibold">
                    {d.riskyBuildingCount.toLocaleString('tr-TR')}
                  </td>
                  <td className="p-3.5 text-right tabular-nums text-emerald-700 font-extrabold">
                    {d.renewedBuildingCount.toLocaleString('tr-TR')}
                  </td>
                  <td className="p-3.5 text-center tabular-nums font-bold">
                    {d.avgBuildingAge} Yıl
                  </td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        d.riskFactor === 'Yüksek'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {d.riskFactor}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="bg-teal-50 hover:bg-teal-700 hover:text-white text-teal-800 font-bold px-3 py-1.5 rounded-lg transition-colors text-[11px]"
                    >
                      İnceleme İsteyin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
