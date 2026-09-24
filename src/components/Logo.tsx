import React, { useState } from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  logoUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
  logoUrl,
}) => {
  const [imgError, setImgError] = useState(false);

  // Get active logo URL: prop > localStorage companyInfo > fallback logo file
  const activeLogoUrl =
    logoUrl ||
    (() => {
      try {
        const saved = localStorage.getItem('abyapi_companyInfo');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.logoUrl) return parsed.logoUrl;
        }
      } catch (e) {
        // ignore
      }
      return '/logo.png';
    })();

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
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[13px]',
    xl: 'text-[15px]',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Exact Logo Image File Tag */}
      {!imgError && activeLogoUrl ? (
        <img
          src={activeLogoUrl}
          alt="AB Yapı Logo"
          className={`${sizeClasses[size]} w-auto object-contain shrink-0 transition-transform hover:scale-105 duration-300`}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback SVG Emblem if image is missing before upload */
        <div
          className={`${sizeClasses[size]} aspect-square bg-teal-700 text-white flex items-center justify-center font-black rounded-xl text-lg shadow-md shrink-0`}
        >
          AB
        </div>
      )}

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
            className={`font-semibold tracking-[0.25em] uppercase leading-tight mt-1 ${
              subtitleSizes[size]
            } ${variant === 'light' ? 'text-teal-200' : 'text-teal-700'}`}
          >
            GÜVENE YÜKSELEN YAPILAR
          </span>
        </div>
      )}
    </div>
  );
};
