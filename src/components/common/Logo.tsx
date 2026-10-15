import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  onClick,
  className = '',
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 select-none cursor-pointer group ${className}`}
    >
      {/* Lotus / Silk Petal motif emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 100 80"
          className={isSm ? 'w-6 h-5' : isLg ? 'w-10 h-8' : 'w-8 h-6'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized layered lotus petals */}
          <path
            d="M50 10 C35 30 25 55 50 75 C75 55 65 30 50 10 Z"
            fill="url(#lotus-grad-1)"
          />
          <path
            d="M38 25 C20 40 10 58 35 72 C45 60 48 40 38 25 Z"
            fill="url(#lotus-grad-2)"
            opacity="0.85"
          />
          <path
            d="M62 25 C80 40 90 58 65 72 C55 60 52 40 62 25 Z"
            fill="url(#lotus-grad-3)"
            opacity="0.85"
          />
          <path
            d="M26 40 C10 50 5 65 25 72 C35 65 36 50 26 40 Z"
            fill="url(#lotus-grad-2)"
            opacity="0.65"
          />
          <path
            d="M74 40 C90 50 95 65 75 72 C65 65 64 50 74 40 Z"
            fill="url(#lotus-grad-3)"
            opacity="0.65"
          />
          <defs>
            <linearGradient id="lotus-grad-1" x1="50" y1="10" x2="50" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset="1" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="lotus-grad-2" x1="20" y1="25" x2="45" y2="72" gradientUnits="userSpaceOnUse">
              <stop stopColor="#93c5fd" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="lotus-grad-3" x1="80" y1="25" x2="55" y2="72" gradientUnits="userSpaceOnUse">
              <stop stopColor="#93c5fd" />
              <stop offset="1" stopColor="#1e40af" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-serif tracking-tight font-bold text-slate-900 group-hover:text-blue-700 transition-colors ${
            isSm ? 'text-base' : isLg ? 'text-2xl' : 'text-xl'
          }`}
          style={{ letterSpacing: '0.01em' }}
        >
          Shreera
        </span>
        {showTagline && (
          <span
            className={`font-sans tracking-tight text-slate-500 font-medium ${
              isSm ? 'text-[7px]' : isLg ? 'text-[10px]' : 'text-[8px]'
            }`}
          >
            Crafted For The Woman You Are
          </span>
        )}
      </div>
    </div>
  );
};
