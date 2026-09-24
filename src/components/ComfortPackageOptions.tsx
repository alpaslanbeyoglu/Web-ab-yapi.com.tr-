import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Flame,
  Wind,
  Filter,
  Bath,
  Droplets,
  Fan,
  Lock,
  Smartphone,
  Info,
  HeartHandshake,
} from 'lucide-react';

export const ComfortPackageOptions: React.FC = () => {
  // Brand-free, benefit-focused 9 high-tech comfort options
  const options = [
    {
      icon: Flame,
      title: 'Sulu Yerden Isıtma Sistemi',
      category: 'Isıtma & Konfor',
      description: 'Zemin altı homojen ısı dağılımı sağlayan, radyatör kalabalığını ortadan kaldırarak estetik ve yüksek yakıt tasarrufu sunan sistem.',
    },
    {
      icon: Wind,
      title: 'Salona 1 Adet Sessiz A++ Inverter Klima',
      category: 'İklimlendirme',
      description: 'Salonda 4 mevsim ideal iklimlendirme sağlayan, düşük ses seviyeli ve minimum elektrik tüketen A++ inverter iklimlendırma ünitesi.',
    },
    {
      icon: Filter,
      title: 'Bina Girişine Merkezi Su Arıtma Sistemi',
      category: 'Su Sağlığı',
      description: 'Tüm binaya giren şebeke suyunu kireçten, tortudan ve klor kokusundan arındırarak tesisatınızı ve sağlığınızı koruyan filtreleme.',
    },
    {
      icon: Bath,
      title: '38°C Sıcaklık Sabitleyicili Emniyetli Duş Bataryası',
      category: 'Banyo Armatürleri',
      description: 'Sudaki ani sıcaklık değişimlerini ve haşlanma riskini önleyen, sabit 38°C emniyet kilitli termostatik batarya teknolojisi.',
    },
    {
      icon: Droplets,
      title: 'Paslanmaz Çelik Uzun Duş Süzgeci ve Koku Engelleyici',
      category: 'Banyo Tesisatı',
      description: 'Hızlı su tahliyesi sağlayan paslanmaz çelik zemin süzgeci ve banyo giderlerinden kötü koku/haşere geçişini önleyen özel vana.',
    },
    {
      icon: Fan,
      title: 'Nem Sensörlü Otomatik Çalışan Sessiz Banyo Fanı',
      category: 'Havalandırma',
      description: 'Banyodaki nem ve buhar seviyesini sensörle otomatik algılayıp devreye girerek rutubet ve küf oluşumunu kökten engelleyen fan.',
    },
    {
      icon: Droplets,
      title: 'Temassız Fotoselli Banyo / Lavabo Muslukları',
      category: 'Hijyen & Tasarruf',
      description: 'Dokunmadan çalışan, maksimum hijyen sunan ve gereksiz su kullanımını önleyerek %50\'ye varan su tasarrufu sağlayan fotoselli sistem.',
    },
    {
      icon: Lock,
      title: 'Parmak İzli, Şifreli & Mobil Akıllı Kapı Kilidi',
      category: 'Giriş Güvenliği',
      description: 'Anahtar taşıma derdine son veren; parmak izi okuma, şifre paneli ve akıllı telefon üzerinden uzaktan erişim imkanı sunan motorlu kilit.',
    },
    {
      icon: Smartphone,
      title: 'Mobil Entegre Akıllı Ev & Uzak Vanalı Kontrol Sistemi',
      category: 'Akıllı Otomasyon',
      description: 'Evde olmasanız bile su vanasını ve kritik tesisatı cep telefonunuzdan uzaktan kapatma güvencesi sunan akıllı ev otomasyonu.',
    },
  ];

  return (
    <section className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-800 space-y-8 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/20 text-amber-300 rounded-full text-xs font-extrabold uppercase tracking-wider border border-amber-500/30">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AB Yapı Konfor Paketi Opsiyonları</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold font-outfit tracking-tight text-white">
          Siz İsteyin, Yaşam Alanınızı İleri Teknoloji ve Konforla Donatalım
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Standart kentsel dönüşüm projelerimizin ötesinde, konforunu bir üst seviyeye taşımak isteyen hak sahiplerimiz için geliştirdiğimiz fayda odaklı donanım opsiyonları.
        </p>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="relative z-10 bg-slate-950 p-4 md:p-5 rounded-2xl border border-amber-500/30 text-xs text-slate-300 space-y-3 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <strong className="text-white text-xs font-bold uppercase tracking-wide block">
              Önemli Paket & Anlaşma Bilgilendirmesi:
            </strong>
            <p className="leading-relaxed text-[11px] text-slate-300">
              Aşağıda listelenen yüksek konfor ve teknoloji özellikleri <strong>standart yapılarımızda yer almayıp</strong>, <strong>'Konfor Paketi'</strong> seçeneği ile opsiyonel olarak sunulmaktadır. Proje anlaşma şartlarına bağlıdır veya ek paket ödemesi gerektirebilir.
            </p>
          </div>
        </div>

        {/* Payment Terms Note */}
        <div className="pt-3 border-t border-slate-800 flex items-center gap-3 text-amber-300 text-[11px] font-semibold">
          <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">Ödeme Kolaylığı:</strong> Cebinizden çıkacak fark ödemelerinde cazip vadeler sunuyoruz. (Vadeler sözleşmede belirlenir.)
          </span>
        </div>
      </div>

      {/* 9 Features Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((opt, idx) => {
          const IconComponent = opt.icon;
          return (
            <div
              key={idx}
              className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3 group flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                    {opt.category}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <h3 className="font-extrabold text-sm text-white leading-snug">
                    {opt.title}
                  </h3>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  {opt.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] text-amber-400/80 font-semibold">
                <span>Opsiyonel Konfor Donanımı</span>
                <span className="text-slate-400">AB Yapı Standartları</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
