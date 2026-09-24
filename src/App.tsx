import React, { useState, useEffect } from 'react';
import {
  Project,
  IstanbulConstructionStats,
  GuideArticle,
  CompanyInfo,
  CustomerInquiry,
} from './types';
import {
  INITIAL_COMPANY_INFO,
  INITIAL_STATS,
  INITIAL_PROJECTS,
  INITIAL_GUIDES,
  INITIAL_INQUIRIES,
} from './data/initialData';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AIConsultantModal } from './components/AIConsultantModal';
import { GoogleAdminAuthModal, AdminUser } from './components/GoogleAdminAuthModal';

import { Home } from './pages/Home';
import { Statistics } from './pages/Statistics';
import { Projects } from './pages/Projects';
import { MapView } from './pages/MapView';
import { KentselDonusumGuide } from './pages/KentselDonusumGuide';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { AdminPanel } from './pages/AdminPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('abyapi_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('abyapi_admin_user');
      return !!saved;
    } catch {
      return false;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAIConsultantOpen, setIsAIConsultantOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Persistent States in localStorage with Initial Defaults
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem('abyapi_companyInfo');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.district === 'Beşiktaş' || parsed.address?.includes('Beşiktaş') || parsed.address?.includes('Barbaros')) {
          localStorage.setItem('abyapi_companyInfo', JSON.stringify(INITIAL_COMPANY_INFO));
          return INITIAL_COMPANY_INFO;
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_COMPANY_INFO;
  });

  const [stats, setStats] = useState<IstanbulConstructionStats>(() => {
    try {
      const saved = localStorage.getItem('abyapi_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeConstructionSites > 1000 || !parsed.rentAssistancePerMonthTL || parsed.rentAssistancePerMonthTL === 0) {
          localStorage.setItem('abyapi_stats', JSON.stringify(INITIAL_STATS));
          return INITIAL_STATS;
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_STATS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('abyapi_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((p: Project) => p.title?.includes('Üsküdar Panoramik') || p.title?.includes('Kadıköy Park') || p.title?.includes('Apartmanı') || p.title?.includes('Yapısı') || p.title?.includes('Binası') || p.featuredImage?.includes('.jpg'))) {
          localStorage.setItem('abyapi_projects', JSON.stringify(INITIAL_PROJECTS));
          return INITIAL_PROJECTS;
        }
        return Array.isArray(parsed) ? parsed : INITIAL_PROJECTS;
      }
    } catch {
      // fallback
    }
    return INITIAL_PROJECTS;
  });

  const [guides] = useState<GuideArticle[]>(INITIAL_GUIDES);

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('abyapi_inquiries');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : INITIAL_INQUIRIES;
      }
    } catch {
      // fallback
    }
    return INITIAL_INQUIRIES;
  });

  // Sync states to localStorage on changes
  useEffect(() => {
    localStorage.setItem('abyapi_companyInfo', JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem('abyapi_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('abyapi_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('abyapi_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

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
    setInquiries([newInquiry, ...inquiries]);
  };

  // Reset to factory seed data
  const handleResetData = () => {
    if (confirm('Tüm özelleştirilmiş içerikleri ve demoları sıfırlamak istiyor musunuz?')) {
      localStorage.clear();
      setCompanyInfo(INITIAL_COMPANY_INFO);
      setStats(INITIAL_STATS);
      setProjects(INITIAL_PROJECTS);
      setInquiries(INITIAL_INQUIRIES);
      alert('Sistem başarıyla fabrika ayarlarına döndürüldü.');
    }
  };

  // Handle Google Admin Login Success
  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setIsAdmin(true);
    localStorage.setItem('abyapi_admin_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    setActiveTab('admin');
  };

  // Handle Logout
  const handleLogout = () => {
    setAdminUser(null);
    setIsAdmin(false);
    localStorage.removeItem('abyapi_admin_user');
    if (activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Top Navbar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        adminUser={adminUser}
        openAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        whatsappNumber={companyInfo.whatsapp}
        phoneNumber={companyInfo.phone}
        logoUrl={companyInfo.logoUrl}
      />

      {/* Main Page Router View */}
      <main className="flex-1">
        {activeTab === 'home' && (
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

        {activeTab === 'stats' && (
          <Statistics
            stats={stats}
            isAdmin={isAdmin}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'projects' && (
          <Projects
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            whatsappNumber={companyInfo.whatsapp}
          />
        )}

        {activeTab === 'map' && (
          <MapView
            projects={projects}
            setSelectedProject={setSelectedProject}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'guide' && (
          <KentselDonusumGuide
            guides={guides}
            rentAssistanceTL={stats.rentAssistancePerMonthTL}
            whatsappNumber={companyInfo.whatsapp}
            openAIConsultant={() => setIsAIConsultantOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutUs companyInfo={companyInfo} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'contact' && (
          <Contact companyInfo={companyInfo} onAddInquiry={handleAddInquiry} />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            stats={stats}
            setStats={setStats}
            projects={projects}
            setProjects={setProjects}
            companyInfo={companyInfo}
            setCompanyInfo={setCompanyInfo}
            inquiries={inquiries}
            setInquiries={setInquiries}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Floating Interactive WhatsApp Widget */}
      <WhatsAppButton whatsappNumber={companyInfo.whatsapp} />

      {/* AI Kentsel Dönüşüm Consultant Modal */}
      <AIConsultantModal
        isOpen={isAIConsultantOpen}
        onClose={() => setIsAIConsultantOpen(false)}
        whatsappNumber={companyInfo.whatsapp}
      />

      {/* Google Admin Authentication Modal */}
      <GoogleAdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        adminUser={adminUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* Corporate Footer */}
      <Footer companyInfo={companyInfo} setActiveTab={setActiveTab} />
    </div>
  );
}
