export interface Project {
  id: string;
  title: string;
  slug: string;
  district: string; // e.g. Kadıköy, Üsküdar, Beşiktaş, Maltepe, Bakırköy, Ataşehir
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  status: 'ongoing' | 'completed' | 'planned';
  type: 'Kentsel Dönüşüm' | 'Konut' | 'Ticari & Karma';
  progress: number; // 0 - 100 %
  startDate?: string; // e.g. "2024-03"
  deliveryDate?: string; // e.g. "2025-11"
  totalUnits?: number;
  totalAreaSqM?: number;
  featuredImage: string;
  gallery: string[];
  description: string;
  features: string[];
  architectureStyle?: string;
  architect?: string;
  isFeatured?: boolean;
}

export interface DistrictStat {
  district: string;
  riskyBuildingCount: number;
  renewedBuildingCount: number;
  avgBuildingAge: number;
  riskFactor: 'Yüksek' | 'Orta-Yüksek' | 'Orta';
}

export interface IstanbulConstructionStats {
  lastUpdated: string;
  totalRiskyUnitsTarget: number; // e.g. 1500000
  totalRenewedUnits: number; // e.g. 845000
  activeConstructionSites: number; // e.g. 1240
  buildingAgeBreakdown: {
    pre1999: number; // percentage
    between1999and2018: number;
    post2018: number;
  };
  totalGreenCertificatedSqM: number;
  avgRenewalDurationMonths: number;
  rentAssistancePerMonthTL: number;
  districtBreakdown: DistrictStat[];
}

export interface GuideArticle {
  id: string;
  title: string;
  category: 'Yasal Mevzuat' | 'Süreç Rehberi' | 'Finans & Destek' | 'Teknik Standartlar';
  summary: string;
  content: string;
  lawReference?: string; // e.g. "6306 Sayılı Kanun Madde 6"
  steps?: { title: string; desc: string }[];
  date: string;
}

export interface CustomerInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  district: string;
  buildingAge?: number;
  apartmentCount?: number;
  subject: string;
  message: string;
  status: 'Yeni' | 'İnceleniyor' | 'Ulaşıldı' | 'Tamamlandı';
  createdAt: string;
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  domain: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  district: string;
  workingHours: string;
  mapEmbedUrl: string;
  logoUrl?: string;
}
