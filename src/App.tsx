import React, { useState, useEffect } from 'react';
import {
  Project,
  IstanbulConstructionStats,
  GuideArticle,
  CompanyInfo,
  CustomerInquiry,
} from './types';
import {
  getProjects,
  saveProjects,
  getStats,
  saveStats,
  getGuides,
  saveGuides,
  getInquiries,
  saveInquiries,
  getCompanyInfo,
  saveCompanyInfo,
  checkIsAdminAuthenticated,
} from './services/adminStorage';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LiveCompassRadar } from './components/LiveCompassRadar';
import { AIConsultantModal } from './components/AIConsultantModal';

import { Home } from './pages/Home';
import { Statistics } from './pages/Statistics';
import { Projects } from './pages/Projects';
import { MapView } from './pages/MapView';
import { KentselDonusumGuide } from './pages/KentselDonusumGuide';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { AdminPage } from './pages/AdminPage';
import { trackPageView, trackInquirySubmit } from './utils/analytics';

const TAB_METADATA: Record<string, { path: string; title: string }> = {
  home: { path: '/', title: 'AB Yapı | Güvene Yükselen Yapılar' },
  guide: { path: '/kentsel-donusum-rehberi', title: 'AB Yapı | Kentsel Dönüşüm Rehberi & 6306 Kanun' },
  stats: { path: '/istatistikler', title: 'AB Yapı | İstanbul İnşaat & Dönüşüm İstatistikleri' },
  projects: { path: '/projelerimiz', title: 'AB Yapı | Projelerimiz' },
  map: { path: '/proje-haritasi', title: 'AB Yapı | İnteraktif Proje Haritası' },
  about: { path: '/hakkimizda', title: 'AB Yapı | Hakkımızda & Vizyonumuz' },
  contact: { path: '/iletisim', title: 'AB Yapı | İletişim & Teklif Talebi' },
  admin: { path: '/admin', title: 'AB Yapı | Yönetici Paneli & İçerik Yönetimi' },
};

export default function App() {
  const validTabs = ['home', 'stats', 'projects', 'map', 'guide', 'about', 'contact', 'admin'];

  const [activeTab, setActiveTab] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('p');
      if (p) {
        const cleaned = p.replace('/', '');
        if (validTabs.includes(cleaned)) return cleaned;
      }
      const hash = window.location.hash.replace('#', '');
      if (validTabs.includes(hash)) return hash;
    } catch {
      // ignore
    }
    return 'home';
  });

  const [isAIConsultantOpen, setIsAIConsultantOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Admin authentication state
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(() => checkIsAdminAuthenticated());

  // Dynamic Persistent Data States with localStorage Sync
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => getCompanyInfo());
  const [stats, setStats] = useState<IstanbulConstructionStats>(() => getStats());
  const [projects, setProjects] = useState<Project[]>(() => getProjects());
  const [guides, setGuides] = useState<GuideArticle[]>(() => getGuides());
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => getInquiries());

  // Sync state changes with localStorage
  useEffect(() => {
    saveCompanyInfo(companyInfo);
  }, [companyInfo]);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  useEffect(() => {
    saveGuides(guides);
  }, [guides]);

  useEffect(() => {
    saveInquiries(inquiries);
  }, [inquiries]);

  // Google Analytics 4 page view tracking on tab/navigation switch
  useEffect(() => {
    const meta = TAB_METADATA[activeTab] || {
      path: `/${activeTab}`,
      title: `AB Yapı - ${activeTab}`,
    };
    trackPageView(meta.path, meta.title);
  }, [activeTab]);

  // Handle new customer inquiry from contact form or calculator
  const handleAddInquiry = (
    newInquiryData: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>
  ) => {
    const newInquiry: CustomerInquiry = {
      ...newInquiryData,
      id: `inq-${Date.now()}`,
      status: 'Yeni',
      createdAt: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
    };
    // Track Google Analytics conversion lead
    trackInquirySubmit(newInquiryData.subject || 'Form Başvurusu', newInquiryData.district);
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        whatsappNumber={companyInfo.whatsapp}
        phoneNumber={companyInfo.phone}
        logoUrl={companyInfo.logoUrl}
      />

      {/* Main Page Router View */}
      <main className="flex-1">
        {activeTab === 'admin' ? (
          <AdminPage
            projects={projects}
            setProjects={setProjects}
            stats={stats}
            setStats={setStats}
            guides={guides}
            setGuides={setGuides}
            inquiries={inquiries}
            setInquiries={setInquiries}
            companyInfo={companyInfo}
            setCompanyInfo={setCompanyInfo}
            isAdminAuth={isAdminAuth}
            setIsAdminAuth={setIsAdminAuth}
            setActiveTab={setActiveTab}
          />
        ) : activeTab === 'stats' ? (
          <Statistics
            stats={stats}
            setActiveTab={setActiveTab}
          />
        ) : activeTab === 'projects' ? (
          <Projects
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            whatsappNumber={companyInfo.whatsapp}
          />
        ) : activeTab === 'map' ? (
          <MapView
            projects={projects}
            setSelectedProject={setSelectedProject}
            setActiveTab={setActiveTab}
          />
        ) : activeTab === 'guide' ? (
          <KentselDonusumGuide
            guides={guides}
            rentAssistanceTL={stats.rentAssistancePerMonthTL}
            whatsappNumber={companyInfo.whatsapp}
            openAIConsultant={() => setIsAIConsultantOpen(true)}
          />
        ) : activeTab === 'about' ? (
          <AboutUs companyInfo={companyInfo} setActiveTab={setActiveTab} />
        ) : activeTab === 'contact' ? (
          <Contact companyInfo={companyInfo} onAddInquiry={handleAddInquiry} />
        ) : (
          <Home
            stats={stats}
            projects={projects}
            companyInfo={companyInfo}
            setActiveTab={setActiveTab}
            onSelectProject={(proj) => {
              setSelectedProject(proj);
              setActiveTab('projects');
            }}
            openAIConsultant={() => setIsAIConsultantOpen(true)}
          />
        )}
      </main>

      {/* Floating Interactive WhatsApp Widget */}
      <WhatsAppButton whatsappNumber={companyInfo.whatsapp} />

      {/* Real-time Compass & Proximity Radar */}
      <LiveCompassRadar
        projects={projects}
        companyInfo={companyInfo}
        onSelectProject={(proj) => {
          setSelectedProject(proj);
          setActiveTab('projects');
        }}
        setActiveTab={setActiveTab}
      />

      {/* AI Kentsel Dönüşüm Consultant Modal */}
      <AIConsultantModal
        isOpen={isAIConsultantOpen}
        onClose={() => setIsAIConsultantOpen(false)}
        whatsappNumber={companyInfo.whatsapp}
      />

      {/* Corporate Footer */}
      <Footer companyInfo={companyInfo} setActiveTab={setActiveTab} />
    </div>
  );
}
