// Google Analytics 4 (GA4) helper for AB Yapı
export const GA_MEASUREMENT_ID = 'G-2S754T5TQW';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Tracks a page / screen view when the user changes tabs or routes in the SPA
 */
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath.startsWith('/') ? pagePath : `/${pagePath}`,
      send_to: GA_MEASUREMENT_ID,
    });
  }
};

/**
 * Generic custom event tracker for Google Analytics 4
 */
export const trackEvent = (
  action: string,
  params?: Record<string, string | number | boolean | undefined | null>
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // Filter out undefined values
    const cleanParams: Record<string, string | number | boolean> = {};
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          cleanParams[key] = val;
        }
      });
    }
    window.gtag('event', action, cleanParams);
  }
};

/**
 * Tracks WhatsApp button / chat interactions
 */
export const trackWhatsAppClick = (source: string, topic?: string) => {
  trackEvent('whatsapp_click', {
    event_category: 'contact',
    event_label: source,
    source,
    topic: topic || 'Genel',
  });
};

/**
 * Tracks direct telephone call clicks
 */
export const trackPhoneClick = (source: string) => {
  trackEvent('phone_call_click', {
    event_category: 'contact',
    event_label: source,
    source,
  });
};

/**
 * Tracks usage of the interactive urban transformation cost calculator
 */
export const trackCalculatorUse = (district: string, apartmentCount: number, grossSqM: number) => {
  trackEvent('calculator_interaction', {
    event_category: 'engagement',
    district,
    apartment_count: apartmentCount,
    gross_sqm: grossSqM,
  });
};

/**
 * Tracks when a user opens or examines project details
 */
export const trackProjectView = (projectName: string, status?: string) => {
  trackEvent('project_view', {
    event_category: 'projects',
    project_name: projectName,
    project_status: status || 'bilinmiyor',
  });
};

/**
 * Tracks form inquiry submissions
 */
export const trackInquirySubmit = (subject: string, district?: string) => {
  trackEvent('generate_lead', {
    event_category: 'form_submission',
    subject,
    district: district || 'Belirtilmedi',
  });
};
