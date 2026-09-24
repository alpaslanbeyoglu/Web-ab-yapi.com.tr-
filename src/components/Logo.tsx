import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'light' | 'vertical';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  logoUrl?: string;
}

/**
 * AB YAPI Official 3D Vector Emblem
 * Accurately reproduces the 3-pillar architectural logo from IMG_4811:
 * - Slate/Charcoal left pillar
 * - Tall Teal/Turquoise central pillar
 * - Warm Amber/Gold right pillar
 * with 3D isometric bevels and realistic depth.
 */
export const EmblemSVG: React.FC<{ className?: string }> = ({ className = 'h-full w-auto' }) => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} drop-shadow-[0_6px_10px_rgba(0,0,0,0.16)] shrink-0`}
  >
    <defs>
      {/* Pillar Soft Under-Shadow */}
      <radialGradient id="embFloorShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.38" />
        <stop offset="60%" stopColor="#0f172a" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>

      {/* 1. Left Pillar (Slate / Charcoal) */}
      <linearGradient id="embSlateL" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#222c3b" />
        <stop offset="100%" stopColor="#2c384a" />
      </linearGradient>
      <linearGradient id="embSlateR" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#37455a" />
        <stop offset="100%" stopColor="#43546e" />
      </linearGradient>
      <linearGradient id="embSlateCapL" x1="0%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stopColor="#3d4d64" />
        <stop offset="100%" stopColor="#4e6280" />
      </linearGradient>
      <linearGradient id="embSlateCapR" x1="50%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4a5d79" />
        <stop offset="100%" stopColor="#5f779b" />
      </linearGradient>

      {/* 2. Center Pillar (Tall Vibrant Teal) */}
      <linearGradient id="embTealL" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#145d6b" />
        <stop offset="100%" stopColor="#1c7586" />
      </linearGradient>
      <linearGradient id="embTealR" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#248a9c" />
        <stop offset="100%" stopColor="#2d9eb2" />
      </linearGradient>
      <linearGradient id="embTealCapL" x1="0%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stopColor="#2c94a6" />
        <stop offset="100%" stopColor="#3cb0c5" />
      </linearGradient>
      <linearGradient id="embTealCapR" x1="50%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#39a9bd" />
        <stop offset="100%" stopColor="#53cbe0" />
      </linearGradient>

      {/* 3. Right Pillar (Warm Amber / Gold Ochre) */}
      <linearGradient id="embAmberL" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#c97c1a" />
        <stop offset="100%" stopColor="#db8d26" />
      </linearGradient>
      <linearGradient id="embAmberR" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#e69b30" />
        <stop offset="100%" stopColor="#f6a93d" />
      </linearGradient>
      <linearGradient id="embAmberCapL" x1="0%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stopColor="#eea134" />
        <stop offset="100%" stopColor="#fbb651" />
      </linearGradient>
      <linearGradient id="embAmberCapR" x1="50%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f5b047" />
        <stop offset="100%" stopColor="#ffcf72" />
      </linearGradient>
    </defs>

    {/* Realistic Base Ambient Shadow */}
    <ellipse cx="120" cy="225" rx="80" ry="12" fill="url(#embFloorShadow)" />

    {/* LEFT PILLAR (Slate/Navy) */}
    <g id="emb-pillar-slate">
      <polygon points="53,94 70,78 70,94" fill="url(#embSlateCapL)" />
      <polygon points="70,78 87,94 70,94" fill="url(#embSlateCapR)" />
      <polygon points="53,94 70,94 70,204 53,190" fill="url(#embSlateL)" />
      <polygon points="70,94 87,94 87,190 70,204" fill="url(#embSlateR)" />
    </g>

    {/* RIGHT PILLAR (Amber/Gold) */}
    <g id="emb-pillar-amber">
      <polygon points="153,86 170,70 170,86" fill="url(#embAmberCapL)" />
      <polygon points="170,70 187,86 170,86" fill="url(#embAmberCapR)" />
      <polygon points="153,86 170,86 170,206 153,192" fill="url(#embAmberL)" />
      <polygon points="170,86 187,86 187,192 170,206" fill="url(#embAmberR)" />
    </g>

    {/* CENTER PILLAR (Tall Teal - In Front) */}
    <g id="emb-pillar-teal">
      <polygon points="98,62 120,42 120,62" fill="url(#embTealCapL)" />
      <polygon points="120,42 142,62 120,62" fill="url(#embTealCapR)" />
      <polygon points="98,62 120,62 120,224 98,206" fill="url(#embTealL)" />
      <polygon points="120,62 142,62 142,206 120,224" fill="url(#embTealR)" />
    </g>
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10 md:h-12',
    lg: 'h-14 md:h-16',
    xl: 'h-20 md:h-24',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const subtitleSizes = {
    sm: 'text-[8.5px]',
    md: 'text-[10.5px]',
    lg: 'text-[12.5px]',
    xl: 'text-[14.5px]',
  };

  // If vertical variant (e.g. for hero or about sections)
  if (variant === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <div className={sizeClasses[size]}>
          <EmblemSVG className="h-full w-auto" />
        </div>
        <div className="flex flex-col items-center mt-2">
          <span className={`font-black tracking-wider uppercase font-outfit leading-none text-slate-900 ${textSizes[size]}`}>
            AB YAPI
          </span>
          <span className={`font-bold tracking-[0.22em] uppercase leading-tight mt-1 text-slate-600 ${subtitleSizes[size]}`}>
            GÜVENE YÜKSELEN YAPILAR
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 md:gap-3 select-none ${className}`}>
      {/* 3D Architectural Emblem */}
      <div className={`${sizeClasses[size]} shrink-0 flex items-center justify-center`}>
        <EmblemSVG className="h-full w-auto" />
      </div>

      {/* Typography: AB YAPI + GÜVENE YÜKSELEN YAPILAR */}
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-black tracking-wider uppercase font-outfit leading-none ${
              textSizes[size]
            } ${variant === 'light' ? 'text-white' : 'text-slate-900'}`}
          >
            AB YAPI
          </span>
          <span
            className={`font-bold tracking-[0.22em] uppercase leading-tight mt-1 ${
              subtitleSizes[size]
            } ${variant === 'light' ? 'text-teal-200' : 'text-teal-800'}`}
          >
            GÜVENE YÜKSELEN YAPILAR
          </span>
        </div>
      )}
    </div>
  );
};
