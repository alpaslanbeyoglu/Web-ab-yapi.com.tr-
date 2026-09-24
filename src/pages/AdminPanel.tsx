import React, { useState } from 'react';
import { Project, IstanbulConstructionStats, CompanyInfo, CustomerInquiry, GuideArticle } from '../types';
import { Shield, Building2, BarChart3, MessageSquare, Save, Plus, Trash2, Edit, RefreshCw, CheckCircle2, Upload, Image } from 'lucide-react';

interface AdminPanelProps {
  stats: IstanbulConstructionStats;
  setStats: React.Dispatch<React.SetStateAction<IstanbulConstructionStats>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  companyInfo: CompanyInfo;
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
  inquiries: CustomerInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<CustomerInquiry[]>>;
  onResetData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  stats,
  setStats,
  projects,
  setProjects,
  companyInfo,
  setCompanyInfo,
  inquiries,
  setInquiries,
  onResetData,
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'projects' | 'inquiries' | 'company'>('stats');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Project Form Modal State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const triggerSuccessAlert = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Save Stats
  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    setStats({ ...stats, lastUpdated: new Date().toISOString().split('T')[0] });
    triggerSuccessAlert();
  };

  // Save Company Info
  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyInfo({ ...companyInfo });
    triggerSuccessAlert();
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    if (confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      setProjects(projects.filter((p) => p.id !== id));
      triggerSuccessAlert();
    }
  };

  // Save or Update Project
  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isAddingProject) {
      setProjects([...projects, { ...editingProject, id: `proj-${Date.now()}` }]);
    } else {
      setProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)));
    }

    setEditingProject(null);
    setIsAddingProject(false);
    triggerSuccessAlert();
  };

  // Open Add Project Modal
  const handleOpenAddProject = () => {
    setEditingProject({
      id: '',
      title: 'AB Yeni Kentsel Dönüşüm Projesi',
      slug: 'ab-yeni-proje',
      district: 'Kadıköy',
      neighborhood: 'Erenköy Mah.',
      address: 'Erenköy Mah. Bağdat Cad. No:100, Kadıköy / İstanbul',
      lat: 40.975,
      lng: 29.075,
      status: 'ongoing',
      type: 'Kentsel Dönüşüm',
      progress: 25,
      startDate: '2025-01',
      deliveryDate: '2026-06',
      totalUnits: 24,
      totalAreaSqM: 3800,
      featuredImage: projects[0]?.featuredImage || '',
      gallery: [projects[0]?.featuredImage || ''],
      description: 'İstanbul Kadıköy Bağdat caddesinde yeni nesil kentsel dönüşüm projemiz.',
      features: ['C40 Yüksek Beton', 'Kapalı Otopark', 'Yerden Isıtma'],
      architectureStyle: 'Modern Çağdaş',
      architect: 'AB Yapı Proje Grubu',
      isFeatured: false,
    });
    setIsAddingProject(true);
  };

  // Update Inquiry Status
  const handleInquiryStatus = (id: string, newStatus: CustomerInquiry['status']) => {
    setInquiries(
      inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    triggerSuccessAlert();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <Shield className="w-3.5 h-3.5" />
            <span>Yönetici Paneli Modu</span>
          </div>
          <h1 className="text-3xl font-extrabold font-outfit">
            AB Yapı Web İçerik Yönetimi
          </h1>
          <p className="text-slate-300 text-xs md:text-sm">
            İstanbul inşaat verilerini, devam eden/tamamlanan projeleri, müşteri taleplerini ve firma bilgilerini güncelleyin.
          </p>
        </div>

        <button
          onClick={onResetData}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors border border-slate-700"
          title="Varsayılan verileri yükle"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Fabrika Verilerine Sıfırla</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg flex items-center gap-3 text-xs md:text-sm font-bold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>Değişiklikler başarıyla kaydedildi ve tüm web sayfalarında canlıya alındı!</span>
        </div>
      )}

      {/* Admin Nav Tabs */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'stats'
              ? 'bg-teal-700 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>İstanbul İstatistikleri ({stats.districtBreakdown.length} İlçe)</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-teal-700 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Proje Kataloğu Yönetimi ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'inquiries'
              ? 'bg-teal-700 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Müşteri Talepleri ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'company'
              ? 'bg-teal-700 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Firma & Adres Ayarları</span>
        </button>
      </div>

      {/* TAB 1: STATISTICS MANAGEMENT */}
      {activeTab === 'stats' && (
        <form onSubmit={handleSaveStats} className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <h3 className="font-extrabold text-slate-900 text-lg">İstanbul Canlı Veri Göstergeleri</h3>
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>İstatistikleri Kaydet</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Toplam Hedef Dönüşüm (Konut)</label>
              <input
                type="number"
                value={stats.totalRiskyUnitsTarget}
                onChange={(e) => setStats({ ...stats, totalRiskyUnitsTarget: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tamamlanan / Yenilenen Bölüm</label>
              <input
                type="number"
                value={stats.totalRenewedUnits}
                onChange={(e) => setStats({ ...stats, totalRenewedUnits: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Aktif Şantiye Sayısı</label>
              <input
                type="number"
                value={stats.activeConstructionSites}
                onChange={(e) => setStats({ ...stats, activeConstructionSites: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Devlet Kira Yardımı (₺/Ay)</label>
              <input
                type="number"
                value={stats.rentAssistancePerMonthTL}
                onChange={(e) => setStats({ ...stats, rentAssistancePerMonthTL: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Ortalama Proje Süresi (Ay)</label>
              <input
                type="number"
                value={stats.avgRenewalDurationMonths}
                onChange={(e) => setStats({ ...stats, avgRenewalDurationMonths: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Çevre Dostu İnşaat Alanı (m²)</label>
              <input
                type="number"
                value={stats.totalGreenCertificatedSqM}
                onChange={(e) => setStats({ ...stats, totalGreenCertificatedSqM: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-900"
              />
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 space-y-6 text-xs">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-lg">Proje Kataloğu Yönetimi</h3>
            <button
              onClick={handleOpenAddProject}
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Proje Ekle</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                <tr>
                  <th className="p-3">Görsel</th>
                  <th className="p-3">Proje Adı</th>
                  <th className="p-3">İlçe / Mahalle</th>
                  <th className="p-3">Durum</th>
                  <th className="p-3 text-center">İlerleme</th>
                  <th className="p-3 text-right">Aksiyon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <img
                        src={proj.featuredImage}
                        alt={proj.title}
                        className="w-12 h-10 object-cover rounded-lg border border-slate-200"
                      />
                    </td>
                    <td className="p-3 font-bold text-slate-900">{proj.title}</td>
                    <td className="p-3">{proj.district} / {proj.neighborhood}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          proj.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {proj.status === 'completed' ? 'Teslim Edildi' : 'Devam Ediyor'}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold">%{proj.progress}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsAddingProject(false);
                        }}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 rounded-lg text-rose-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit/Add Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <h3 className="font-extrabold text-slate-900 text-lg border-b pb-2">
              {isAddingProject ? 'Yeni Proje Oluştur' : 'Projeyi Düzenle'}
            </h3>

            <form onSubmit={handleSaveProjectForm} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Proje Başlığı</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">İlçe</label>
                  <input
                    type="text"
                    required
                    value={editingProject.district}
                    onChange={(e) => setEditingProject({ ...editingProject, district: e.target.value })}
                    className="w-full bg-slate-50 border p-2.5 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mahalle</label>
                  <input
                    type="text"
                    value={editingProject.neighborhood}
                    onChange={(e) => setEditingProject({ ...editingProject, neighborhood: e.target.value })}
                    className="w-full bg-slate-50 border p-2.5 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Durum</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full bg-slate-50 border p-2.5 rounded-xl font-bold"
                  >
                    <option value="ongoing">Devam Ediyor</option>
                    <option value="completed">Teslim Edildi</option>
                    <option value="planned">Planlanan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tamamlanma %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingProject.progress}
                    onChange={(e) => setEditingProject({ ...editingProject, progress: Number(e.target.value) })}
                    className="w-full bg-slate-50 border p-2.5 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teslim Tarihi</label>
                  <input
                    type="text"
                    value={editingProject.deliveryDate}
                    onChange={(e) => setEditingProject({ ...editingProject, deliveryDate: e.target.value })}
                    className="w-full bg-slate-50 border p-2.5 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Proje Açıklaması</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-slate-100 font-bold text-slate-700 rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: INQUIRIES MANAGEMENT */}
      {activeTab === 'inquiries' && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 space-y-6 text-xs">
          <h3 className="font-extrabold text-slate-900 text-lg border-b pb-3">Gelen Müşteri ve Dönüşüm Talepleri</h3>

          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm">{inq.name}</span>
                    <span className="text-slate-500 ml-2">({inq.phone} · {inq.email})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">{inq.createdAt}</span>
                    <select
                      value={inq.status}
                      onChange={(e) => handleInquiryStatus(inq.id, e.target.value as any)}
                      className="bg-white border rounded-lg px-2 py-1 font-bold"
                    >
                      <option value="Yeni">Yeni</option>
                      <option value="İnceleniyor">İnceleniyor</option>
                      <option value="Ulaşıldı">Ulaşıldı</option>
                      <option value="Tamamlandı">Tamamlandı</option>
                    </select>
                  </div>
                </div>

                <div className="font-semibold text-teal-800">İlçe: {inq.district} | Konu: {inq.subject}</div>
                <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">{inq.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COMPANY INFO MANAGEMENT */}
      {activeTab === 'company' && (
        <form onSubmit={handleSaveCompany} className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 space-y-5 text-xs">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-lg">Kurumsal Firma & İletişim Bilgileri</h3>
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Kaydet</span>
            </button>
          </div>

          {/* Logo File Management Section */}
          <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Image className="w-4 h-4 text-teal-700" />
              <span>Kurumsal Logo Dosyası</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-slate-300 shadow-xs min-h-[100px]">
                {companyInfo.logoUrl ? (
                  <img
                    src={companyInfo.logoUrl}
                    alt="Logo Önizleme"
                    className="max-h-20 w-auto object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Logo Görseli Yok</span>
                )}
                <span className="text-[10px] text-slate-400 mt-2 font-mono">Canlı Logo Önizlemesi</span>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Logo Görsel Dosyası Yükle (PNG, SVG, JPG, WEBP)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setCompanyInfo({ ...companyInfo, logoUrl: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-700 file:text-white hover:file:bg-teal-800 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    veya Logo Görsel Yolu / URL
                  </label>
                  <input
                    type="text"
                    value={companyInfo.logoUrl || ''}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, logoUrl: e.target.value })}
                    placeholder="/logo.png veya https://..."
                    className="w-full bg-white border border-slate-300 p-2.5 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Firma Adı</label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                className="w-full bg-slate-50 border p-3 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Slogan</label>
              <input
                type="text"
                value={companyInfo.slogan}
                onChange={(e) => setCompanyInfo({ ...companyInfo, slogan: e.target.value })}
                className="w-full bg-slate-50 border p-3 rounded-xl font-bold text-teal-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Telefon</label>
              <input
                type="text"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                className="w-full bg-slate-50 border p-3 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Numarası</label>
              <input
                type="text"
                value={companyInfo.whatsapp}
                onChange={(e) => setCompanyInfo({ ...companyInfo, whatsapp: e.target.value })}
                className="w-full bg-slate-50 border p-3 rounded-xl font-bold text-emerald-700"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">E-Posta</label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                className="w-full bg-slate-50 border p-3 rounded-xl font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Adres Bilgisi</label>
            <input
              type="text"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
              className="w-full bg-slate-50 border p-3 rounded-xl font-bold"
            />
          </div>
        </form>
      )}
    </div>
  );
};
