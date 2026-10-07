import React, { useState } from 'react';
import { Calendar, Building, Users, ArrowRight, Clock } from 'lucide-react';

export const TransformationTimelineCalculator: React.FC = () => {
  const [floors, setFloors] = useState<number>(5);
  const [apartments, setApartments] = useState<number>(10);

  // Calculation Logic
  // Base: 14 months
  // +1 month per 3 floors
  // +1 month per 10 apartments
  const estimateMonths = 14 + Math.floor(floors / 3) + Math.floor(apartments / 10);

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-slate-200 space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-slate-900 font-outfit flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-700" />
          Dönüşüm Takvimi Hesaplayıcı
        </h3>
        <p className="text-sm text-slate-600">
          Binanızın kat adedini ve daire sayısını girerek tahmini dönüşüm süresini hesaplayın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Kat Adedi</label>
            <input
              type="number"
              value={floors}
              onChange={(e) => setFloors(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Daire Sayısı (Bina Büyüklüğü)</label>
            <input
              type="number"
              value={apartments}
              onChange={(e) => setApartments(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/40"
            />
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-2 shadow-inner">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Tahmini Süre</span>
          <div className="text-5xl font-black text-white font-outfit">
            {estimateMonths}
            <span className="text-xl text-teal-400 font-semibold ml-1">Ay</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            İzinler, yıkım ve inşaat dahil <br/> toplam anahtar teslim süresi.
          </p>
        </div>
      </div>
    </div>
  );
};
