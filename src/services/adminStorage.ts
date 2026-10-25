import { Project, IstanbulConstructionStats, GuideArticle, CompanyInfo, CustomerInquiry, DistrictStat } from '../types';
import {
  INITIAL_COMPANY_INFO,
  INITIAL_STATS,
  INITIAL_PROJECTS,
  INITIAL_GUIDES,
  INITIAL_INQUIRIES,
} from '../data/initialData';

const KEYS = {
  PROJECTS: 'abyapi_projects_v2',
  STATS: 'abyapi_stats_v2',
  GUIDES: 'abyapi_guides_v2',
  INQUIRIES: 'abyapi_inquiries_v2',
  COMPANY: 'abyapi_company_v2',
  AUTH: 'abyapi_admin_auth_v2',
};

// Default master admin passcode
export const ADMIN_PASSCODE = '347111';

// Read Projects with fallback
export function getProjects(): Project[] {
  try {
    const raw = localStorage.getItem(KEYS.PROJECTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Error reading projects from localStorage:', err);
  }
  return INITIAL_PROJECTS;
}

// Save Projects
export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Error saving projects to localStorage:', err);
  }
}

// Read Stats with fallback
export function getStats(): IstanbulConstructionStats {
  try {
    const raw = localStorage.getItem(KEYS.STATS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.districtBreakdown)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading stats from localStorage:', err);
  }
  return INITIAL_STATS;
}

// Save Stats
export function saveStats(stats: IstanbulConstructionStats): void {
  try {
    localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
  } catch (err) {
    console.error('Error saving stats to localStorage:', err);
  }
}

// Read Guides with fallback
export function getGuides(): GuideArticle[] {
  try {
    const raw = localStorage.getItem(KEYS.GUIDES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Error reading guides from localStorage:', err);
  }
  return INITIAL_GUIDES;
}

// Save Guides
export function saveGuides(guides: GuideArticle[]): void {
  try {
    localStorage.setItem(KEYS.GUIDES, JSON.stringify(guides));
  } catch (err) {
    console.error('Error saving guides to localStorage:', err);
  }
}

// Read Customer Inquiries with fallback
export function getInquiries(): CustomerInquiry[] {
  try {
    const raw = localStorage.getItem(KEYS.INQUIRIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading inquiries from localStorage:', err);
  }
  return INITIAL_INQUIRIES;
}

// Save Customer Inquiries
export function saveInquiries(inquiries: CustomerInquiry[]): void {
  try {
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
  } catch (err) {
    console.error('Error saving inquiries to localStorage:', err);
  }
}

// Read Company Info with fallback
export function getCompanyInfo(): CompanyInfo {
  try {
    const raw = localStorage.getItem(KEYS.COMPANY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.name) {
        return {
          ...INITIAL_COMPANY_INFO,
          ...parsed,
        };
      }
    }
  } catch (err) {
    console.error('Error reading company info from localStorage:', err);
  }
  return INITIAL_COMPANY_INFO;
}

// Save Company Info
export function saveCompanyInfo(info: CompanyInfo): void {
  try {
    localStorage.setItem(KEYS.COMPANY, JSON.stringify(info));
  } catch (err) {
    console.error('Error saving company info to localStorage:', err);
  }
}

// Reset all data to factory initial defaults
export function resetAllDataToDefaults(): {
  projects: Project[];
  stats: IstanbulConstructionStats;
  guides: GuideArticle[];
  inquiries: CustomerInquiry[];
  company: CompanyInfo;
} {
  try {
    localStorage.removeItem(KEYS.PROJECTS);
    localStorage.removeItem(KEYS.STATS);
    localStorage.removeItem(KEYS.GUIDES);
    localStorage.removeItem(KEYS.INQUIRIES);
    localStorage.removeItem(KEYS.COMPANY);
  } catch (err) {
    console.error('Error resetting data:', err);
  }
  return {
    projects: INITIAL_PROJECTS,
    stats: INITIAL_STATS,
    guides: INITIAL_GUIDES,
    inquiries: INITIAL_INQUIRIES,
    company: INITIAL_COMPANY_INFO,
  };
}

// Admin Auth State
export function checkIsAdminAuthenticated(): boolean {
  try {
    const raw = sessionStorage.getItem(KEYS.AUTH) || localStorage.getItem(KEYS.AUTH);
    return raw === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(authenticated: boolean, remember: boolean = true): void {
  try {
    if (authenticated) {
      if (remember) {
        localStorage.setItem(KEYS.AUTH, 'true');
      } else {
        sessionStorage.setItem(KEYS.AUTH, 'true');
      }
    } else {
      localStorage.removeItem(KEYS.AUTH);
      sessionStorage.removeItem(KEYS.AUTH);
    }
  } catch (err) {
    console.error('Error setting admin auth:', err);
  }
}
