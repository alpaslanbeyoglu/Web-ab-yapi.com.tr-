import React, { useState } from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'light' | 'vertical';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  logoUrl?: string;
}

/**
 * AB YAPI Official Logo
 * - Embedded original high-resolution transparent asset from corporate branding
 * - Features the 3 iconic architectural towers:
 *   Left (Charcoal/Slate), Center (Tall Petroleum Teal), Right (Warm Amber Gold)
 * - Typography: "AB YAPI" + "GÜVENE YÜKSELEN YAPILAR"
 * - 100% transparent background, tightly cropped, enlarged for commanding visibility
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
  logoUrl,
}) => {
  const [imageError, setImageError] = useState(false);

  // Enlarged size classes (as requested: "Logoyu daha da büyüt")
  const sizeClasses = {
    sm: 'h-11 md:h-13',
    md: 'h-15 md:h-19 lg:h-22',
    lg: 'h-20 md:h-28 lg:h-32',
    xl: 'h-32 md:h-44 lg:h-52',
  };

  const isLight = variant === 'light';

  // Determine the exact image source based on variant
  let imageSrc = isLight ? '/logo-horizontal-light.png' : '/logo-horizontal.png';
  if (variant === 'vertical') {
    imageSrc = isLight ? '/logo-light.png' : '/logo.png';
  } else if (variant === 'icon') {
    imageSrc = '/favicon.svg';
  }

  // If a custom logoUrl is provided and not errored
  if (logoUrl && !imageError) {
    imageSrc = logoUrl;
  }

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      style={{ userSelect: 'none' }}
    >
      {!imageError ? (
        <img
          src={imageSrc}
          alt="AB YAPI - Güvene Yükselen Yapılar"
          className={`${sizeClasses[size]} w-auto max-w-full object-contain shrink-0 transition-transform duration-200 hover:scale-[1.02] drop-shadow-xs`}
          draggable={false}
          onError={() => setImageError(true)}
        />
      ) : (
        /* Resilient Vector Fallback in case of image load delay */
        <div className={`flex items-center gap-3 ${sizeClasses[size]}`}>
          <svg
            viewBox="0 0 196 206"
            className="h-full w-auto shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="0,74 28,52 28,196 0,182" fill="#222F37" />
            <polygon points="28,52 56,74 56,182 28,196" fill="#435560" />
            <polygon points="64,26 98,0 98,206 64,190" fill="#146F7C" />
            <polygon points="98,0 132,26 132,190 98,206" fill="#2397A7" />
            <polygon points="140,62 168,38 168,196 140,182" fill="#D78416" />
            <polygon points="168,38 196,62 196,182 168,196" fill="#F4A52B" />
          </svg>
          {variant !== 'icon' && (
            <div className="flex flex-col">
              <span
                className={`font-black tracking-wider uppercase font-outfit leading-none text-2xl md:text-3xl ${
                  isLight ? 'text-white' : 'text-slate-900'
                }`}
              >
                AB YAPI
              </span>
              <span
                className={`font-bold tracking-[0.22em] uppercase leading-tight mt-1 text-[11px] md:text-xs ${
                  isLight ? 'text-teal-200' : 'text-teal-800'
                }`}
              >
                GÜVENE YÜKSELEN YAPILAR
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
