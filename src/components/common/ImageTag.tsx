// import React, { useState } from 'react';
// import { Sparkles, Shirt } from 'lucide-react';

// interface ImageTagProps extends React.ImgHTMLAttributes<HTMLImageElement> {
//   fallbackText?: string;
//   fallbackGradient?: string;
//   badgeText?: string;
//   className?: string;
//   containerClassName?: string;
// }

// export const ImageTag: React.FC<ImageTagProps> = ({
//   src,
//   alt = 'Product image',
//   className = 'w-full h-full object-cover',
//   containerClassName = '',
//   fallbackText,
//   fallbackGradient = 'from-blue-50 via-slate-50 to-indigo-50',
//   badgeText,
//   ...props
// }) => {
//   const [hasError, setHasError] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);

//   return (
//     <div
//       className={`relative overflow-hidden bg-slate-100 flex items-center justify-center ${containerClassName}`}
//     >
//       {/* Real img tag as requested by user */}
//       <img
//         src={src}
//         alt={alt}
//         className={`${className} transition-opacity duration-300 ${
//           hasError ? 'hidden' : isLoaded ? 'opacity-100' : 'opacity-80'
//         }`}
//         onLoad={() => setIsLoaded(true)}
//         onError={() => setHasError(true)}
//         {...props}
//       />

//       {/* Elegant fallback placeholder whenever desktop images haven't been copied yet */}
//       {hasError && (
//         <div
//           className={`w-full h-full min-h-[120px] bg-gradient-to-br ${fallbackGradient} flex flex-col items-center justify-center p-3 text-center select-none`}
//         >
//           <div className="w-10 h-10 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-blue-600 mb-1.5">
//             <Shirt className="w-5 h-5" />
//           </div>
//           <span className="text-[11px] font-medium text-slate-700 line-clamp-2 px-1">
//             {fallbackText || alt}
//           </span>
//           <span className="text-[9px] text-slate-400 mt-0.5 tracking-tight flex items-center gap-1">
//             <Sparkles className="w-2.5 h-2.5 text-blue-500" /> Shreera Authentic
//           </span>
//         </div>
//       )}

//       {badgeText && (
//         <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">
//           {badgeText}
//         </span>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Sparkles, Shirt } from 'lucide-react';

interface ImageTagProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackGradient?: string;
  badgeText?: string;
  className?: string;
  containerClassName?: string;
}

export const ImageTag: React.FC<ImageTagProps> = ({
  src,
  alt = 'Product image',
  className = 'w-full h-full object-cover',
  containerClassName = '',
  fallbackText,
  fallbackGradient = 'from-blue-50 via-slate-50 to-indigo-50',
  badgeText,
  ...props
}) => {
  const [hasError, setHasError] = useState(!src?.trim());
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset image state whenever the image URL changes.
  useEffect(() => {
    setHasError(!src?.trim());
    setIsLoaded(false);
  }, [src]);

  const showFallback = !src?.trim() || hasError;

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 flex items-center justify-center ${containerClassName}`}
    >
      {!showFallback && (
        <img
          {...props}
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-80'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {showFallback && (
        <div
          className={`w-full h-full min-h-[120px] bg-gradient-to-br ${fallbackGradient} flex flex-col items-center justify-center p-3 text-center select-none`}
        >
          <div className="w-10 h-10 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-blue-600 mb-1.5">
            <Shirt className="w-5 h-5" />
          </div>

          <span className="text-[11px] font-medium text-slate-700 line-clamp-2 px-1">
            {fallbackText || alt}
          </span>

          <span className="text-[9px] text-slate-400 mt-0.5 tracking-tight flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-blue-500" />
            Shreera Authentic
          </span>
        </div>
      )}

      {badgeText && (
        <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">
          {badgeText}
        </span>
      )}
    </div>
  );
};
