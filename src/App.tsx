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

import { Home } from './pages/Home';
import { Statistics } from './pages/Statistics';
import { Projects } from './pages/Projects';
import { MapView } from './pages/MapView';
import { KentselDonusumGuide } from './pages/KentselDonusumGuide';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';

export default function App() {
  const validTabs = ['home', 'stats', 'projects', 'map', 'guide', 'about', 'contact'];

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

  // Security cleanup: remove any obsolete admin session data
  useEffect(() => {
    try {
      localStorage.removeItem('abyapi_admin_user');
    } catch {
      // ignore
    }
  }, []);

  // Company and project data states
  const [companyInfo] = useState<CompanyInfo>(INITIAL_COMPANY_INFO);
  const [stats] = useState<IstanbulConstructionStats>(INITIAL_STATS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
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

  useEffect(() => {
    try {
      localStorage.setItem('abyapi_inquiries', JSON.stringify(inquiries));
    } catch {
      // ignore
    }
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
        {activeTab === 'stats' ? (
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
