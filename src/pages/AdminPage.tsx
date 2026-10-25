import React, { useState } from 'react';
import {
  Project,
  IstanbulConstructionStats,
  GuideArticle,
  CompanyInfo,
  CustomerInquiry,
  DistrictStat,
} from '../types';
import {
  ADMIN_PASSCODE,
  setAdminAuthenticated,
  resetAllDataToDefaults,
} from '../services/adminStorage';
import {
  Building2,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Search,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  FileText,
  MapPin,
  Users,
  BarChart3,
  Settings,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  Save,
  X,
  ExternalLink,
  Phone,
  Mail,
  Sliders,
  Check,
  Layers,
  Upload,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import { getVectorBuildingImage } from '../utils/vectorImage';
import { Logo } from '../components/Logo';

interface AdminPageProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  stats: IstanbulConstructionStats;
  setStats: React.Dispatch<React.SetStateAction<IstanbulConstructionStats>>;
  guides: GuideArticle[];
  setGuides: React.Dispatch<React.SetStateAction<GuideArticle[]>>;
  inquiries: CustomerInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<CustomerInquiry[]>>;
  companyInfo: CompanyInfo;
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
  isAdminAuth: boolean;
  setIsAdminAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: (tab: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  projects,
  setProjects,
  stats,
  setStats,
  guides,
  setGuides,
  inquiries,
  setInquiries,
  companyInfo,
  setCompanyInfo,
  isAdminAuth,
  setIsAdminAuth,
  setActiveTab,
}) => {
  // Login State
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Admin Active Sub-Tab
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<
    'projects' | 'stats' | 'guides' | 'inquiries' | 'company'
  >('projects');

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Reset Modal State
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Search & Filter States
  const [projectSearch, setProjectSearch] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState<string>('all');
  const [districtSearch, setDistrictSearch] = useState('');
  const [guideSearch, setGuideSearch] = useState('');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');

  // Modal States for Editing / Creating
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const [editingDistrict, setEditingDistrict] = useState<Partial<DistrictStat> | null>(null);
  const [isNewDistrict, setIsNewDistrict] = useState(false);

  const [editingGuide, setEditingGuide] = useState<Partial<GuideArticle> | null>(null);
  const [isNewGuide, setIsNewGuide] = useState(false);

  // Local Form state for Istanbul Overall Stats editing
  const [statsForm, setStatsForm] = useState<IstanbulConstructionStats>(stats);

  // Local Form state for Company Info editing
  const [companyForm, setCompanyForm] = useState<CompanyInfo>(companyInfo);

  // Sync form state when props change
  React.useEffect(() => {
    setStatsForm(stats);
  }, [stats]);

  React.useEffect(() => {
    setCompanyForm(companyInfo);
  }, [companyInfo]);

  // Handle Login Attempt
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      setAdminAuthenticated(true, true);
      setIsAdminAuth(true);
      setLoginError('');
      showToast('Yönetici girişi başarılı.');
    } else {
      setLoginError('Hatalı şifre! Lütfen tekrar deneyiniz.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAdminAuth(false);
    showToast('Çıkış yapıldı.');
  };

  // Handle Factory Reset
  const handleResetDefaults = () => {
    const restored = resetAllDataToDefaults();
    setProjects(restored.projects);
    setStats(restored.stats);
    setGuides(restored.guides);
    setInquiries(restored.inquiries);
    setCompanyInfo(restored.company);
    setShowResetConfirm(false);
    showToast('Tüm veriler fabrika ayarlarına ve varsayılan içeriklere sıfırlandı.');
  };

  // ---------------------------------------------------------------------------
  // PROJECT CRUD HANDLERS
  // ---------------------------------------------------------------------------
  const handleOpenProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProject({ ...proj });
      setIsNewProject(false);
    } else {
      setEditingProject({
        id: `proj-${Date.now()}`,
        title: '',
        slug: '',
        district: 'Fatih',
        neighborhood: 'Cerrahpaşa Mah.',
        address: '',
        lat: 41.0048,
        lng: 28.9337,
        status: 'ongoing',
        type: 'Konut',
        progress: 15,
        startDate: '2026-01',
        deliveryDate: '2026-12',
        totalUnits: 10,
        totalAreaSqM: 1200,
        featuredImage: getVectorBuildingImage('Yeni Yapı', 'Fatih'),
        gallery: [],
        description: '',
        features: ['Deprem Yönetmeliğine Uyumlu', 'C40 Beton Kalitesi'],
        isFeatured: true,
      });
      setIsNewProject(true);
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    // Auto generate slug if missing
    const generatedSlug =
      editingProject.slug ||
      editingProject.title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');

    const projectToSave: Project = {
      id: editingProject.id || `proj-${Date.now()}`,
      title: editingProject.title,
      slug: generatedSlug,
      district: editingProject.district || 'Fatih',
      neighborhood: editingProject.neighborhood || '',
      address: editingProject.address || `${editingProject.title}, ${editingProject.district}`,
      lat: editingProject.lat || 41.0048,
      lng: editingProject.lng || 28.9337,
      status: editingProject.status || 'ongoing',
      type: editingProject.type || 'Konut',
      progress: editingProject.progress ?? 50,
      startDate: editingProject.startDate,
      deliveryDate: editingProject.deliveryDate,
      totalUnits: editingProject.totalUnits,
      totalAreaSqM: editingProject.totalAreaSqM,
      featuredImage:
        editingProject.featuredImage ||
        getVectorBuildingImage(editingProject.title, editingProject.district || 'Fatih'),
      gallery: editingProject.gallery || [],
      description: editingProject.description || '',
      features: editingProject.features || [],
      architectureStyle: editingProject.architectureStyle,
      architect: editingProject.architect,
      isFeatured: editingProject.isFeatured ?? false,
    };

    if (isNewProject) {
      setProjects((prev) => [projectToSave, ...prev]);
      showToast('Yeni proje başarıyla eklendi.');
    } else {
      setProjects((prev) => prev.map((p) => (p.id === projectToSave.id ? projectToSave : p)));
      showToast('Proje güncellendi.');
    }
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Proje silindi.');
    }
  };

  // ---------------------------------------------------------------------------
  // STATS & DISTRICT CRUD HANDLERS
  // ---------------------------------------------------------------------------
  const handleSaveOverallStats = (e: React.FormEvent) => {
    e.preventDefault();
    setStats(statsForm);
    showToast('İstanbul genel inşaat ve dönüşüm istatistikleri güncellendi.');
  };

  const handleOpenDistrictModal = (dist?: DistrictStat) => {
    if (dist) {
      setEditingDistrict({ ...dist });
      setIsNewDistrict(false);
    } else {
      setEditingDistrict({
        district: '',
        riskyBuildingCount: 10000,
        renewedBuildingCount: 2000,
        avgBuildingAge: 35,
        riskFactor: 'Orta-Yüksek',
      });
      setIsNewDistrict(true);
    }
  };

  const handleSaveDistrict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDistrict || !editingDistrict.district) return;

    const districtToSave: DistrictStat = {
      district: editingDistrict.district,
      riskyBuildingCount: Number(editingDistrict.riskyBuildingCount) || 0,
      renewedBuildingCount: Number(editingDistrict.renewedBuildingCount) || 0,
      avgBuildingAge: Number(editingDistrict.avgBuildingAge) || 30,
      riskFactor: editingDistrict.riskFactor || 'Yüksek',
    };

    const updatedList = isNewDistrict
      ? [...stats.districtBreakdown, districtToSave]
      : stats.districtBreakdown.map((d) =>
          d.district.toLowerCase() === districtToSave.district.toLowerCase() ? districtToSave : d
        );

    const updatedStats = {
      ...stats,
      districtBreakdown: updatedList,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setStats(updatedStats);
    setEditingDistrict(null);
    showToast(`${districtToSave.district} verileri kaydedildi.`);
  };

  const handleDeleteDistrict = (districtName: string) => {
    if (window.confirm(`${districtName} ilçesini listeden çıkarmak istediğinize emin misiniz?`)) {
      const updatedList = stats.districtBreakdown.filter((d) => d.district !== districtName);
      setStats({ ...stats, districtBreakdown: updatedList });
      showToast(`${districtName} silindi.`);
    }
  };

  // ---------------------------------------------------------------------------
  // GUIDE ARTICLE CRUD HANDLERS
  // ---------------------------------------------------------------------------
  const handleOpenGuideModal = (article?: GuideArticle) => {
    if (article) {
      setEditingGuide({ ...article });
      setIsNewGuide(false);
    } else {
      setEditingGuide({
        id: `guide-${Date.now()}`,
        title: '',
        category: 'Yasal Mevzuat',
        summary: '',
        content: '',
        lawReference: '6306 Sayılı Kanun',
        date: new Date().toISOString().split('T')[0],
        steps: [
          { title: '1. Adım', desc: 'Süreç açıklaması...' },
          { title: '2. Adım', desc: 'İkinci adım açıklaması...' },
        ],
      });
      setIsNewGuide(true);
    }
  };

  const handleSaveGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuide || !editingGuide.title) return;

    const guideToSave: GuideArticle = {
      id: editingGuide.id || `guide-${Date.now()}`,
      title: editingGuide.title,
      category: editingGuide.category || 'Yasal Mevzuat',
      summary: editingGuide.summary || '',
      content: editingGuide.content || '',
      lawReference: editingGuide.lawReference,
      steps: editingGuide.steps || [],
      date: editingGuide.date || new Date().toISOString().split('T')[0],
    };

    if (isNewGuide) {
      setGuides((prev) => [guideToSave, ...prev]);
      showToast('Rehber makalesi eklendi.');
    } else {
      setGuides((prev) => prev.map((g) => (g.id === guideToSave.id ? guideToSave : g)));
      showToast('Rehber makalesi güncellendi.');
    }
    setEditingGuide(null);
  };

  const handleDeleteGuide = (id: string) => {
    if (window.confirm('Bu rehber makalesini silmek istediğinize emin misiniz?')) {
      setGuides((prev) => prev.filter((g) => g.id !== id));
      showToast('Makale silindi.');
    }
  };

  // ---------------------------------------------------------------------------
  // INQUIRY STATUS HANDLERS
  // ---------------------------------------------------------------------------
  const handleUpdateInquiryStatus = (id: string, status: CustomerInquiry['status']) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
    showToast('Talep durumu güncellendi.');
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Bu müşteri talebini silmek istediğinize emin misiniz?')) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      showToast('Talep silindi.');
    }
  };

  // ---------------------------------------------------------------------------
  // COMPANY INFO & LOGO HANDLER
  // ---------------------------------------------------------------------------
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Lütfen geçerli bir görsel dosyası (PNG, JPG, SVG, WebP vb.) seçiniz.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Görsel boyutu 5MB\'dan küçük olmalıdır.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCompanyForm((prev) => ({ ...prev, logoUrl: result }));
        showToast('Firma logosu yüklendi! "Firma Bilgilerini Kaydet" butonuna basarak kaydediniz.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    setCompanyForm((prev) => ({ ...prev, logoUrl: '/logo.png' }));
    showToast('Firma logosu varsayılana sıfırlandı.');
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyInfo(companyForm);
    showToast('Firma ve iletişim bilgileri başarıyla güncellendi ve site genelinde uygulandı.');
  };

  // ===========================================================================
  // RENDER: LOGIN SCREEN (When not authenticated)
  // ===========================================================================
  if (!isAdminAuth) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-900 text-slate-100">
        <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mb-2 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">AB Yapı Yönetici Paneli</h1>
            <p className="text-xs text-slate-400">
              İçerik, proje ve istatistik yönetim sistemine erişmek için şifrenizi giriniz.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Yönetici Şifresi (Passcode)
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden transition-all pr-12 font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs animate-shake">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Giriş Yap</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // FILTERED DATASETS
  // ===========================================================================
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.district.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(projectSearch.toLowerCase());
    const matchesStatus = projectStatusFilter === 'all' || p.status === projectStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredDistricts = stats.districtBreakdown.filter((d) =>
    d.district.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const filteredGuides = guides.filter(
    (g) =>
      g.title.toLowerCase().includes(guideSearch.toLowerCase()) ||
      g.category.toLowerCase().includes(guideSearch.toLowerCase()) ||
      g.summary.toLowerCase().includes(guideSearch.toLowerCase())
  );

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.includes(inquirySearch) ||
      inq.district.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.subject.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'Yeni').length;

  // ===========================================================================
  // RENDER: DASHBOARD (When authenticated)
  // ===========================================================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-400 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideUp">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-white">Yönetici Paneli</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  Canlı Yayında
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                AB Yapı Web Sitesi İçerik & Veri Yönetim Merkezi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('home')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Siteyi Gör</span>
            </button>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-3.5 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Varsayılan Verilere Sıfırla"
            >
              <RefreshCw className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Varsayılanlara Sıfırla</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Toplam Proje
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">{projects.length}</p>
              <p className="text-[11px] text-teal-600 font-semibold mt-0.5">
                {projects.filter((p) => p.status === 'ongoing').length} Devam Eden
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Kapsanan İlçe
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {stats.districtBreakdown.length}
              </p>
              <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
                İstanbul Kentsel Dönüşüm
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Rehber Makaleleri
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">{guides.length}</p>
              <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">
                Mevzuat & Bilgilendirme
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Müşteri Talepleri
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">{inquiries.length}</p>
              {newInquiriesCount > 0 ? (
                <p className="text-[11px] text-amber-600 font-bold mt-0.5 animate-pulse">
                  {newInquiriesCount} Yeni Yanıtsız
                </p>
              ) : (
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                  Tümü İncelendi
                </p>
              )}
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 relative">
              <Users className="w-6 h-6" />
              {newInquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
                  {newInquiriesCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Admin Section Tabs Navigation */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto gap-1">
          <button
            onClick={() => setActiveAdminSubTab('projects')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeAdminSubTab === 'projects'
                ? 'bg-slate-900 text-amber-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Projeler Yönetimi</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-white text-[10px] font-mono">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('stats')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeAdminSubTab === 'stats'
                ? 'bg-slate-900 text-amber-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>İstatistikler & İlçeler</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('guides')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeAdminSubTab === 'guides'
                ? 'bg-slate-900 text-amber-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Kentsel Dönüşüm Rehberi</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-white text-[10px] font-mono">
              {guides.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('inquiries')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeAdminSubTab === 'inquiries'
                ? 'bg-slate-900 text-amber-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Müşteri Talepleri</span>
            {newInquiriesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                {newInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminSubTab('company')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeAdminSubTab === 'company'
                ? 'bg-slate-900 text-amber-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Firma & Ayarlar</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* SUB-TAB 1: PROJECTS MANAGEMENT */}
        {/* =================================================================== */}
        {activeAdminSubTab === 'projects' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Proje adı, ilçe veya mahalle ara..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-teal-500"
                  />
                </div>

                <select
                  value={projectStatusFilter}
                  onChange={(e) => setProjectStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="ongoing">Devam Eden</option>
                  <option value="completed">Tamamlanan</option>
                  <option value="planned">Planlanan</option>
                </select>
              </div>

              <button
                onClick={() => handleOpenProjectModal()}
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Proje Ekle</span>
              </button>
            </div>

            {/* Projects Table / List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                      <th className="py-3.5 px-4">Proje / Görsel</th>
                      <th className="py-3.5 px-4">Konum</th>
                      <th className="py-3.5 px-4">Durum / İlerleme</th>
                      <th className="py-3.5 px-4">Tür & Birim</th>
                      <th className="py-3.5 px-4 text-center">Öne Çıkan</th>
                      <th className="py-3.5 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.featuredImage}
                              alt={p.title}
                              className="w-12 h-10 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-100"
                            />
                            <div>
                              <p className="font-extrabold text-slate-900 text-sm">{p.title}</p>
                              <p className="text-[11px] text-slate-400 font-mono">/{p.slug}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-800">
                            {p.district} / {p.neighborhood}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
                            {p.address}
                          </p>
                        </td>

                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                p.status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : p.status === 'ongoing'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                              }`}
                            >
                              {p.status === 'completed'
                                ? 'Tamamlandı'
                                : p.status === 'ongoing'
                                ? 'Devam Ediyor'
                                : 'Planlanan'}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className="bg-teal-600 h-1.5 rounded-full"
                                  style={{ width: `${p.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-[11px] font-bold text-slate-500">
                                %{p.progress}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-800">{p.type}</p>
                          <p className="text-[11px] text-slate-400">
                            {p.totalUnits ? `${p.totalUnits} Bağımsız Bölüm` : 'Belirtilmedi'}
                          </p>
                        </td>

                        <td className="py-3 px-4 text-center">
                          {p.isFeatured ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
                              ★ Evet
                            </span>
                          ) : (
                            <span className="text-slate-300 text-xs">-</span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenProjectModal(p)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                              title="Düzenle"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredProjects.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-slate-400">
                          Aramanızla eşleşen proje bulunamadı.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SUB-TAB 2: STATISTICS & DISTRICTS */}
        {/* =================================================================== */}
        {activeAdminSubTab === 'stats' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Overall Istanbul Construction Stats Form */}
            <form
              onSubmit={handleSaveOverallStats}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-base text-slate-900">
                    İstanbul Genel İnşaat & Dönüşüm Metrikleri
                  </h3>
                </div>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>İstatistikleri Kaydet</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Hedef Riskli Konut / Bağımsız Bölüm
                  </label>
                  <input
                    type="number"
                    value={statsForm.totalRiskyUnitsTarget}
                    onChange={(e) =>
                      setStatsForm({
                        ...statsForm,
                        totalRiskyUnitsTarget: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Yenilenen Toplam Konut Sayısı
                  </label>
                  <input
                    type="number"
                    value={statsForm.totalRenewedUnits}
                    onChange={(e) =>
                      setStatsForm({
                        ...statsForm,
                        totalRenewedUnits: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Devam Eden Şantiye / Şantiye Alanı Sayısı
                  </label>
                  <input
                    type="number"
                    value={statsForm.activeConstructionSites}
                    onChange={(e) =>
                      setStatsForm({
                        ...statsForm,
                        activeConstructionSites: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Devlet Kira Yardımı Destek Tutarı (TL / Ay)
                  </label>
                  <input
                    type="number"
                    value={statsForm.rentAssistancePerMonthTL}
                    onChange={(e) =>
                      setStatsForm({
                        ...statsForm,
                        rentAssistancePerMonthTL: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Ortalama Dönüşüm / Teslimat Süresi (Ay)
                  </label>
                  <input
                    type="number"
                    value={statsForm.avgRenewalDurationMonths}
                    onChange={(e) =>
                      setStatsForm({
                        ...statsForm,
                        avgRenewalDurationMonths: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Yeşil Sertifikalı Toplam Alan (m²)
                  </label>
                  <input
                    type="number"
                    value={statsForm.totalGreenCertificatedSqM}
                    onChange={(e) =>
                      setStatsForm({
                        ...statsForm,
                        totalGreenCertificatedSqM: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Building Age Breakdown % */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700 mb-2">
                  Bina Yaşı Dağılım Yüzdeleri (%)
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium">
                      1999 Öncesi Yapılar (%)
                    </label>
                    <input
                      type="number"
                      value={statsForm.buildingAgeBreakdown.pre1999}
                      onChange={(e) =>
                        setStatsForm({
                          ...statsForm,
                          buildingAgeBreakdown: {
                            ...statsForm.buildingAgeBreakdown,
                            pre1999: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium">
                      1999 - 2018 Arası (%)
                    </label>
                    <input
                      type="number"
                      value={statsForm.buildingAgeBreakdown.between1999and2018}
                      onChange={(e) =>
                        setStatsForm({
                          ...statsForm,
                          buildingAgeBreakdown: {
                            ...statsForm.buildingAgeBreakdown,
                            between1999and2018: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium">
                      2018 Sonrası Yeni Yapılar (%)
                    </label>
                    <input
                      type="number"
                      value={statsForm.buildingAgeBreakdown.post2018}
                      onChange={(e) =>
                        setStatsForm({
                          ...statsForm,
                          buildingAgeBreakdown: {
                            ...statsForm.buildingAgeBreakdown,
                            post2018: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* District Breakdown Table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  <h3 className="font-extrabold text-base text-slate-900">
                    İlçe Bazlı Risk & Dönüşüm Verileri ({stats.districtBreakdown.length} İlçe)
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={districtSearch}
                      onChange={(e) => setDistrictSearch(e.target.value)}
                      placeholder="İlçe ara..."
                      className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
                    />
                  </div>

                  <button
                    onClick={() => handleOpenDistrictModal()}
                    className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>İlçe Ekle</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                      <th className="py-3 px-4">İlçe Adı</th>
                      <th className="py-3 px-4">Riskli Yapı Sayısı</th>
                      <th className="py-3 px-4">Yenilenen Yapı Sayısı</th>
                      <th className="py-3 px-4">Ort. Bina Yaşı</th>
                      <th className="py-3 px-4">Risk Faktörü</th>
                      <th className="py-3 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredDistricts.map((d) => (
                      <tr key={d.district} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 font-bold text-slate-900">{d.district}</td>
                        <td className="py-2.5 px-4 font-mono text-red-600 font-semibold">
                          {d.riskyBuildingCount.toLocaleString('tr-TR')}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-emerald-600 font-semibold">
                          {d.renewedBuildingCount.toLocaleString('tr-TR')}
                        </td>
                        <td className="py-2.5 px-4">{d.avgBuildingAge} Yıl</td>
                        <td className="py-2.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              d.riskFactor === 'Yüksek'
                                ? 'bg-red-100 text-red-800'
                                : d.riskFactor === 'Orta-Yüksek'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {d.riskFactor}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenDistrictModal(d)}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                              title="Düzenle"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteDistrict(d.district)}
                              className="p-1 rounded bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SUB-TAB 3: GUIDE ARTICLES */}
        {/* =================================================================== */}
        {activeAdminSubTab === 'guides' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={guideSearch}
                  onChange={(e) => setGuideSearch(e.target.value)}
                  placeholder="Rehber başlığı veya mevzuat maddesi ara..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden"
                />
              </div>

              <button
                onClick={() => handleOpenGuideModal()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Makale Ekle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGuides.map((g) => (
                <div
                  key={g.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold">
                        {g.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{g.date}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                      {g.title}
                    </h4>

                    {g.lawReference && (
                      <p className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 inline-block">
                        ⚖️ {g.lawReference}
                      </p>
                    )}

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {g.summary}
                    </p>

                    {g.steps && g.steps.length > 0 && (
                      <p className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded inline-block">
                        ✓ {g.steps.length} İşlem Adımı Tanımlı
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenGuideModal(g)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                      <span>Düzenle</span>
                    </button>
                    <button
                      onClick={() => handleDeleteGuide(g.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Sil</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SUB-TAB 4: CUSTOMER INQUIRIES */}
        {/* =================================================================== */}
        {activeAdminSubTab === 'inquiries' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="İsim, telefon, ilçe veya konu ara..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden"
                  />
                </div>

                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="Yeni">Yeni</option>
                  <option value="İnceleniyor">İnceleniyor</option>
                  <option value="Ulaşıldı">Ulaşıldı</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`p-5 rounded-2xl border shadow-2xs transition-all space-y-3 ${
                    inq.status === 'Yeni'
                      ? 'bg-amber-50/50 border-amber-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-base">{inq.name}</h4>
                        {inq.status === 'Yeni' && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider animate-pulse">
                            Yeni
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                        <a
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1 hover:text-teal-700 font-bold text-slate-800"
                        >
                          <Phone className="w-3.5 h-3.5 text-teal-600" />
                          <span>{inq.phone}</span>
                        </a>
                        <a
                          href={`mailto:${inq.email}`}
                          className="flex items-center gap-1 hover:text-teal-700"
                        >
                          <Mail className="w-3.5 h-3.5 text-teal-600" />
                          <span>{inq.email}</span>
                        </a>
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          <span>{inq.district}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400 font-mono">{inq.createdAt}</span>
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleUpdateInquiryStatus(
                            inq.id,
                            e.target.value as CustomerInquiry['status']
                          )
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border focus:outline-hidden cursor-pointer ${
                          inq.status === 'Yeni'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : inq.status === 'İnceleniyor'
                            ? 'bg-blue-100 text-blue-900 border-blue-300'
                            : inq.status === 'Ulaşıldı'
                            ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                            : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        }`}
                      >
                        <option value="Yeni">Yeni</option>
                        <option value="İnceleniyor">İnceleniyor</option>
                        <option value="Ulaşıldı">Ulaşıldı</option>
                        <option value="Tamamlandı">Tamamlandı</option>
                      </select>

                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                        title="Talebi Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-xs text-slate-800">
                      Konu: <span className="text-teal-800">{inq.subject}</span>
                    </p>
                    {(inq.buildingAge || inq.apartmentCount) && (
                      <div className="flex gap-4 text-xs text-slate-500 font-medium">
                        {inq.buildingAge && <span>Mevcut Bina Yaşı: {inq.buildingAge} Yıl</span>}
                        {inq.apartmentCount && (
                          <span>Daire / Malik Sayısı: {inq.apartmentCount}</span>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed mt-2">
                      "{inq.message}"
                    </p>
                  </div>
                </div>
              ))}

              {filteredInquiries.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400">
                  Henüz bir müşteri talebi bulunmuyor.
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SUB-TAB 5: COMPANY INFO */}
        {/* =================================================================== */}
        {activeAdminSubTab === 'company' && (
          <form
            onSubmit={handleSaveCompany}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5 animate-fadeIn"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-teal-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Kurumsal Firma & İletişim Bilgileri
                </h3>
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Firma Bilgilerini Kaydet</span>
              </button>
            </div>

            {/* Logo Customization Card */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-amber-600" />
                  <h4 className="font-extrabold text-sm text-slate-900">Firma Logosu Yönetimi & Özelleştirme</h4>
                </div>
                <div className="flex items-center gap-2">
                  {companyForm.logoUrl && companyForm.logoUrl !== '/logo.png' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                      <Check className="w-3.5 h-3.5" /> Özel Logo Aktif
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleResetLogo}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                    title="Varsayılan orijinal logoya geri dön"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Varsayılana Sıfırla</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Live Preview */}
                <div className="md:col-span-5 space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Canlı Logo Önizlemesi</label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Light background preview */}
                    <div className="p-3 bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center min-h-[90px] text-center shadow-xs">
                      <span className="text-[10px] text-slate-400 font-bold mb-1.5">Açık Tema (Header)</span>
                      <Logo variant="full" size="sm" logoUrl={companyForm.logoUrl} />
                    </div>
                    {/* Dark background preview */}
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center min-h-[90px] text-center shadow-xs">
                      <span className="text-[10px] text-slate-400 font-bold mb-1.5">Koyu Tema (Footer)</span>
                      <Logo variant="light" size="sm" logoUrl={companyForm.logoUrl} />
                    </div>
                  </div>
                </div>

                {/* Right: Upload controls */}
                <div className="md:col-span-7 space-y-4">
                  {/* File Upload Button */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cihazınızdan Logo Görseli Yükleyin (PNG, JPG, SVG, WebP)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-sm">
                        <Upload className="w-4 h-4" />
                        <span>Bilgisayardan veya Telefondan Logo Seç</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      * Yüklediğiniz logo anında kaydedilip sitenizin üst ve alt menülerinde gösterilir. Şeffaf PNG önerilir.
                    </p>
                  </div>

                  {/* Or Direct URL Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Veya Görsel Bağlantı Adresi (URL)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={companyForm.logoUrl || ''}
                        onChange={(e) => setCompanyForm({ ...companyForm, logoUrl: e.target.value })}
                        placeholder="Örn: https://domain.com/logo.png veya data:image/png;base64,..."
                        className="w-full p-2.5 pr-8 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                      />
                      {companyForm.logoUrl && (
                        <button
                          type="button"
                          onClick={() => setCompanyForm({ ...companyForm, logoUrl: '' })}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          title="Temizle"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Kısa Marka Adı
                </label>
                <input
                  type="text"
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Tam Resmi Ticaret Unvanı
                </label>
                <input
                  type="text"
                  value={companyForm.fullName || ''}
                  onChange={(e) => setCompanyForm({ ...companyForm, fullName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Kurumsal Slogan
                </label>
                <input
                  type="text"
                  value={companyForm.slogan}
                  onChange={(e) => setCompanyForm({ ...companyForm, slogan: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Telefon Numarası
                </label>
                <input
                  type="text"
                  value={companyForm.phone}
                  onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  WhatsApp Numarası
                </label>
                <input
                  type="text"
                  value={companyForm.whatsapp}
                  onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1">Açık Adres</label>
                <input
                  type="text"
                  value={companyForm.address}
                  onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Çalışma Saatleri</label>
                <input
                  type="text"
                  value={companyForm.workingHours}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, workingHours: e.target.value })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Google Harita Embed Bağlantısı (iframe URL)
                </label>
                <input
                  type="text"
                  value={companyForm.mapEmbedUrl}
                  onChange={(e) => setCompanyForm({ ...companyForm, mapEmbedUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </form>
        )}
      </div>

      {/* ======================================================================= */}
      {/* MODAL 1: PROJECT ADD / EDIT MODAL */}
      {/* ======================================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base">
                  {isNewProject ? 'Yeni Proje Ekle' : 'Proje Detaylarını Düzenle'}
                </h3>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Proje Başlığı *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="Örn: Çınar Sk. No: 12 Binası"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">İlçe</label>
                  <input
                    type="text"
                    value={editingProject.district || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, district: e.target.value })
                    }
                    placeholder="Örn: Fatih"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mahalle</label>
                  <input
                    type="text"
                    value={editingProject.neighborhood || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, neighborhood: e.target.value })
                    }
                    placeholder="Örn: Cerrahpaşa Mah."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Tam Adres</label>
                  <input
                    type="text"
                    value={editingProject.address || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, address: e.target.value })
                    }
                    placeholder="Sokak, Bina No, Mahalle, İlçe"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Proje Durumu</label>
                  <select
                    value={editingProject.status || 'ongoing'}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.value as Project['status'],
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="ongoing">Devam Ediyor</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="planned">Planlanan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Proje Türü</label>
                  <select
                    value={editingProject.type || 'Konut'}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        type: e.target.value as Project['type'],
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="Kentsel Dönüşüm">Kentsel Dönüşüm</option>
                    <option value="Konut">Konut</option>
                    <option value="Ticari & Karma">Ticari & Karma</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    İlerleme Yüzdesi (%{editingProject.progress ?? 0})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingProject.progress ?? 0}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, progress: Number(e.target.value) })
                    }
                    className="w-full accent-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Toplam Bağımsız Bölüm</label>
                  <input
                    type="number"
                    value={editingProject.totalUnits || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        totalUnits: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Başlangıç Tarihi</label>
                  <input
                    type="text"
                    value={editingProject.startDate || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, startDate: e.target.value })
                    }
                    placeholder="Örn: 2024-03"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teslim Tarihi</label>
                  <input
                    type="text"
                    value={editingProject.deliveryDate || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, deliveryDate: e.target.value })
                    }
                    placeholder="Örn: 2025-11"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Enlem (Latitude)</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={editingProject.lat || 41.0048}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, lat: Number(e.target.value) })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Boylam (Longitude)</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={editingProject.lng || 28.9337}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, lng: Number(e.target.value) })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Öne Çıkan Görsel URL</label>
                  <input
                    type="text"
                    value={editingProject.featuredImage || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, featuredImage: e.target.value })
                    }
                    placeholder="Görsel URL veya SVG data URL"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Proje Açıklaması</label>
                  <textarea
                    rows={3}
                    value={editingProject.description || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    placeholder="Proje hakkında detaylı bilgi..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFeaturedToggle"
                    checked={editingProject.isFeatured ?? false}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <label
                    htmlFor="isFeaturedToggle"
                    className="font-extrabold text-slate-900 cursor-pointer"
                  >
                    Anasayfada Öne Çıkan Proje Olarak Göster
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL 2: DISTRICT ADD / EDIT MODAL */}
      {/* ======================================================================= */}
      {editingDistrict && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <h3 className="font-extrabold text-base">
                {isNewDistrict ? 'Yeni İlçe Verisi Ekle' : `${editingDistrict.district} Düzenle`}
              </h3>
              <button
                onClick={() => setEditingDistrict(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDistrict} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">İlçe Adı *</label>
                <input
                  type="text"
                  required
                  value={editingDistrict.district || ''}
                  onChange={(e) => setEditingDistrict({ ...editingDistrict, district: e.target.value })}
                  placeholder="Örn: Kadıköy"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Riskli Yapı Sayısı</label>
                <input
                  type="number"
                  value={editingDistrict.riskyBuildingCount ?? 0}
                  onChange={(e) =>
                    setEditingDistrict({
                      ...editingDistrict,
                      riskyBuildingCount: Number(e.target.value),
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Yenilenen Yapı Sayısı</label>
                <input
                  type="number"
                  value={editingDistrict.renewedBuildingCount ?? 0}
                  onChange={(e) =>
                    setEditingDistrict({
                      ...editingDistrict,
                      renewedBuildingCount: Number(e.target.value),
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ortalama Bina Yaşı</label>
                <input
                  type="number"
                  value={editingDistrict.avgBuildingAge ?? 35}
                  onChange={(e) =>
                    setEditingDistrict({
                      ...editingDistrict,
                      avgBuildingAge: Number(e.target.value),
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Risk Faktörü Seviyesi</label>
                <select
                  value={editingDistrict.riskFactor || 'Orta-Yüksek'}
                  onChange={(e) =>
                    setEditingDistrict({
                      ...editingDistrict,
                      riskFactor: e.target.value as DistrictStat['riskFactor'],
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option value="Yüksek">Yüksek Risk</option>
                  <option value="Orta-Yüksek">Orta-Yüksek Risk</option>
                  <option value="Orta">Orta Risk</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDistrict(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL 3: GUIDE ARTICLE ADD / EDIT MODAL */}
      {/* ======================================================================= */}
      {editingGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <h3 className="font-extrabold text-base">
                {isNewGuide ? 'Yeni Rehber Makalesi Ekle' : 'Rehber Makalesini Düzenle'}
              </h3>
              <button
                onClick={() => setEditingGuide(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGuide} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Makale Başlığı *</label>
                  <input
                    type="text"
                    required
                    value={editingGuide.title || ''}
                    onChange={(e) => setEditingGuide({ ...editingGuide, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={editingGuide.category || 'Yasal Mevzuat'}
                    onChange={(e) =>
                      setEditingGuide({
                        ...editingGuide,
                        category: e.target.value as GuideArticle['category'],
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="Yasal Mevzuat">Yasal Mevzuat</option>
                    <option value="Süreç Rehberi">Süreç Rehberi</option>
                    <option value="Finans & Destek">Finans & Destek</option>
                    <option value="Teknik Standartlar">Teknik Standartlar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kanun / Mevzuat Referansı</label>
                  <input
                    type="text"
                    value={editingGuide.lawReference || ''}
                    onChange={(e) =>
                      setEditingGuide({ ...editingGuide, lawReference: e.target.value })
                    }
                    placeholder="Örn: 6306 Sayılı Kanun Madde 6"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Kısa Özet</label>
                  <textarea
                    rows={2}
                    value={editingGuide.summary || ''}
                    onChange={(e) =>
                      setEditingGuide({ ...editingGuide, summary: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Detaylı İçerik Metni</label>
                  <textarea
                    rows={6}
                    value={editingGuide.content || ''}
                    onChange={(e) =>
                      setEditingGuide({ ...editingGuide, content: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingGuide(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL 4: RESET CONFIRMATION DIALOG */}
      {/* ======================================================================= */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-red-500/50 text-white rounded-3xl p-6 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-7 h-7 shrink-0" />
              <h3 className="font-black text-lg">Fabrika Ayarlarına Sıfırla?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tüm eklenen yeni projeler, düzenlenen ilçe istatistikleri ve rehber makaleleri silinerek varsayılan orijinal içeriklere dönülecektir. Bu işlem geri alınamaz.
            </p>
            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
              >
                Vazgeç
              </button>
              <button
                onClick={handleResetDefaults}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Evet, Tümünü Sıfırla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
