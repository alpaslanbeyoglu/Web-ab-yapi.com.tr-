/**
 * Generates an architectural blueprint vector SVG placeholder image URL
 * for projects when no custom user photo has been uploaded.
 */
export const getVectorBuildingImage = (title: string, neighborhood: string): string => {
  const cleanTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cleanNh = neighborhood.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" fill="none">
    <!-- Background Blueprint -->
    <rect width="800" height="500" fill="#0f172a"/>
    <rect x="24" y="24" width="752" height="452" rx="20" fill="#1e293b" stroke="#334155" stroke-width="2"/>
    
    <!-- Grid & Dimension Lines -->
    <path d="M100 40 V460 M200 40 V460 M300 40 V460 M400 40 V460 M500 40 V460 M600 40 V460 M700 40 V460" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" opacity="0.3"/>
    <path d="M40 100 H760 M40 200 H760 M40 300 H760 M40 400 H760" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" opacity="0.3"/>
    
    <!-- Ground Line -->
    <path d="M60 400 H740" stroke="#0d9488" stroke-width="3"/>
    
    <!-- Vector Building Front Elevation Blueprint -->
    <rect x="280" y="120" width="240" height="280" rx="4" fill="#0f172a" stroke="#0d9488" stroke-width="3"/>
    <path d="M280 120 L400 60 L520 120 Z" fill="#0d9488" fill-opacity="0.15" stroke="#0d9488" stroke-width="3"/>
    
    <!-- Windows Matrix -->
    <g fill="#38bdf8" fill-opacity="0.8">
      <!-- Floor 3 -->
      <rect x="310" y="150" width="40" height="45" rx="3"/>
      <rect x="380" y="150" width="40" height="45" rx="3"/>
      <rect x="450" y="150" width="40" height="45" rx="3"/>
      
      <!-- Floor 2 -->
      <rect x="310" y="215" width="40" height="45" rx="3"/>
      <rect x="380" y="215" width="40" height="45" rx="3"/>
      <rect x="450" y="215" width="40" height="45" rx="3"/>
      
      <!-- Floor 1 -->
      <rect x="310" y="280" width="40" height="45" rx="3"/>
      <rect x="380" y="280" width="40" height="45" rx="3"/>
      <rect x="450" y="280" width="40" height="45" rx="3"/>
    </g>
    
    <!-- Entrance Door -->
    <rect x="375" y="340" width="50" height="60" rx="3" fill="#d97706" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="415" cy="372" r="3" fill="#ffffff"/>
    
    <!-- Architectural Compass / Badge -->
    <circle cx="100" cy="100" r="30" fill="#0f172a" stroke="#0d9488" stroke-width="2"/>
    <path d="M100 75 L108 95 L100 92 L92 95 Z" fill="#0d9488"/>
    <path d="M100 125 L108 105 L100 108 L92 105 Z" fill="#64748b"/>
    <text x="100" y="104" text-anchor="middle" fill="#f8fafc" font-family="sans-serif" font-size="10" font-weight="bold">AB</text>
    
    <!-- Project Info Card Overlay -->
    <rect x="60" y="380" width="680" height="70" rx="14" fill="#0f172a" stroke="#0d9488" stroke-width="2"/>
    <text x="90" y="412" fill="#f8fafc" font-family="sans-serif" font-size="18" font-weight="extrabold">${cleanTitle}</text>
    <text x="90" y="434" fill="#2dd4bf" font-family="sans-serif" font-size="13" font-weight="bold">${cleanNh} • AB YAPI TAMAMLANAN MİMARİ ESER</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
