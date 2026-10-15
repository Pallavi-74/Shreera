import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { ImageTag } from '../components/common/ImageTag';
import { ArrowRight, SlidersHorizontal, Layers, Sparkles, Crown, Flower2, Wind, Feather, Sun, Shield, Gem } from 'lucide-react';

// Categories list configuration
const CATEGORIES_LIST = [
  { id: 'all', name: 'All Sarees', image: '/src/images/mobile-hero-rose.png' },
  { id: 'soft-silk', name: 'Soft Silk', image: '/src/images/peach-saree.png' },
  { id: 'kanjivaram', name: 'Kanjivaram', image: '/src/images/beige-saree.png' },
  { id: 'organza', name: 'Organza', image: '/src/images/royal-blue-saree.png' },
  { id: 'chiffon', name: 'Chiffon', image: '/src/images/sea-green-saree.png' },
  { id: 'banarasi', name: 'Banarasi', image: '/src/images/lavender-saree.png' },
  { id: 'sale', name: 'Sale', image: '/src/images/mobile-hero-rose.png', isSale: true },
];

// Subcategories dataset
const SUBCATEGORIES_DATA = [
  { id: 'all-sarees', name: 'All Sarees', count: 120, icon: 'layers', popularRank: 1, priceLowRank: 1, newestRank: 1 },
  { id: 'soft-silk', name: 'Soft Silk Sarees', count: 35, icon: 'sparkles', image: '/src/images/peach-saree.png', popularRank: 2, priceLowRank: 4, newestRank: 2 },
  { id: 'kanjivaram', name: 'Kanjivaram Sarees', count: 28, icon: 'crown', image: '/src/images/beige-saree.png', popularRank: 3, priceLowRank: 6, newestRank: 5 },
  { id: 'organza', name: 'Organza Sarees', count: 22, icon: 'wind', image: '/src/images/royal-blue-saree.png', popularRank: 4, priceLowRank: 2, newestRank: 3 },
  { id: 'chiffon', name: 'Chiffon Sarees', count: 18, icon: 'feather', image: '/src/images/sea-green-saree.png', popularRank: 5, priceLowRank: 1, newestRank: 4 },
  { id: 'banarasi', name: 'Banarasi Sarees', count: 15, icon: 'sun', image: '/src/images/lavender-saree.png', popularRank: 6, priceLowRank: 5, newestRank: 6 },
  { id: 'designer', name: 'Designer Sarees', count: 12, icon: 'gem', image: '/src/images/mobile-hero-rose.png', popularRank: 7, priceLowRank: 3, newestRank: 1 },
];

export const CategoriesScreen: React.FC = () => {
  const { navigateTo, setSelectedCategory, setSelectedFabric } = useApp();

  const [activeTopTab, setActiveTopTab] = useState<string>('All Sarees');
  const [activeSubcatId, setActiveSubcatId] = useState<string>('all-sarees');
  const [sortOption, setSortOption] = useState<string>('Popular');

  const getSubcategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'crown':
        return <Crown className="w-4 h-4" />;
      case 'flower':
        return <Flower2 className="w-4 h-4" />;
      case 'wind':
        return <Wind className="w-4 h-4" />;
      case 'feather':
        return <Feather className="w-4 h-4" />;
      case 'sun':
        return <Sun className="w-4 h-4" />;
      case 'layers':
        return <Layers className="w-4 h-4" />;
      case 'shield':
        return <Shield className="w-4 h-4" />;
      case 'gem':
        return <Gem className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  // Sort and Filter logic for category cards grid
  const categoryCards = useMemo(() => {
    let filtered = SUBCATEGORIES_DATA.filter((s) => s.id !== 'all-sarees');

    // Filter cards based on top tab selection if a specific fabric is selected
    if (activeTopTab !== 'All Sarees') {
      filtered = filtered.filter((card) =>
        card.name.toLowerCase().includes(activeTopTab.toLowerCase())
      );
    }

    // Sort cards based on sortOption state
    return [...filtered].sort((a, b) => {
      if (sortOption === 'Price: Low') {
        return a.priceLowRank - b.priceLowRank;
      } else if (sortOption === 'Newest') {
        return a.newestRank - b.newestRank;
      } else {
        // Default: Popular
        return a.popularRank - b.popularRank;
      }
    });
  }, [activeTopTab, sortOption]);

  const handleCardClick = (catName: string) => {
    setSelectedCategory(catName);
    setSelectedFabric(catName.replace(' Sarees', ''));
    navigateTo('collection', { category: catName, fabric: catName.replace(' Sarees', '') });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 md:pb-0">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Title & Sort */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Categories
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore our exclusive collection
            </p>
          </div>

          <button
            onClick={() => {
              const next = sortOption === 'Popular' ? 'Price: Low' : sortOption === 'Price: Low' ? 'Newest' : 'Popular';
              setSortOption(next);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span>Sort: <strong className="text-blue-600">{sortOption}</strong></span>
          </button>
        </div>

        {/* Top category circular pills */}
        <div className="flex items-center justify-start md:justify-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2">
          {CATEGORIES_LIST.slice(0, 5).map((cat) => {
            const isActive = activeTopTab === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTopTab(cat.name)}
                className="flex flex-col items-center shrink-0 cursor-pointer group"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 border-2 transition-all ${
                    isActive ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 group-hover:border-slate-300'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                    <ImageTag
                      src={cat.image}
                      alt={cat.name}
                      fallbackText={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium transition-colors ${
                    isActive ? 'text-blue-600 font-bold' : 'text-slate-600 group-hover:text-slate-900'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Content: Left Subcategories list + Right 3-column cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Subcategory List */}
          <div className="md:col-span-3 space-y-1.5 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs">
            {SUBCATEGORIES_DATA.map((subcat) => {
              const isSelected = activeSubcatId === subcat.id;
              return (
                <button
                  key={subcat.id}
                  onClick={() => {
                    setActiveSubcatId(subcat.id);
                    if (subcat.id !== 'all-sarees') {
                      handleCardClick(subcat.name);
                    }
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isSelected ? 'text-blue-600' : 'text-slate-400'}>
                      {getSubcategoryIcon(subcat.icon)}
                    </span>
                    <span className="text-xs sm:text-sm leading-tight line-clamp-1">
                      {subcat.name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 tabular-nums">
                    {subcat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right 3-column Category Cards Grid */}
          <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categoryCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.name)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
              >
                {/* Image tag */}
                <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                  <ImageTag
                    src={card.image}
                    alt={card.name}
                    fallbackText={card.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title & Item count */}
                <div className="p-3.5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors">
                      {card.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 tabular-nums">
                      {card.count} Items
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// import React, { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { Header } from '../components/common/Header';
// import { ImageTag } from '../components/common/ImageTag';
// import { ArrowRight, SlidersHorizontal, Layers, Sparkles, Crown, Flower2, Wind, Feather, Sun, Shield, Gem } from 'lucide-react';

// // Categories list configuration
// const CATEGORIES_LIST = [
//   { id: 'all', name: 'All Sarees', image: '/src/images/mobile-hero-rose.png' },
//   { id: 'soft-silk', name: 'Soft Silk', image: '/src/images/peach-saree.png' },
//   { id: 'kanjivaram', name: 'Kanjivaram', image: '/src/images/beige-saree.png' },
//   { id: 'organza', name: 'Organza', image: '/src/images/royal-blue-saree.png' },
//   { id: 'chiffon', name: 'Chiffon', image: '/src/images/sea-green-saree.png' },
//   { id: 'banarasi', name: 'Banarasi', image: '/src/images/lavender-saree.png' },
//   { id: 'sale', name: 'Sale', image: '/src/images/mobile-hero-rose.png', isSale: true },
// ];

// // Subcategories dataset
// const SUBCATEGORIES_DATA = [
//   { id: 'all-sarees', name: 'All Sarees', count: 120, icon: 'layers' },
//   { id: 'soft-silk', name: 'Soft Silk Sarees', count: 35, icon: 'sparkles', image: '/src/images/peach-saree.png' },
//   { id: 'kanjivaram', name: 'Kanjivaram Sarees', count: 28, icon: 'crown', image: '/src/images/beige-saree.png' },
//   { id: 'organza', name: 'Organza Sarees', count: 22, icon: 'wind', image: '/src/images/royal-blue-saree.png' },
//   { id: 'chiffon', name: 'Chiffon Sarees', count: 18, icon: 'feather', image: '/src/images/sea-green-saree.png' },
//   { id: 'banarasi', name: 'Banarasi Sarees', count: 15, icon: 'sun', image: '/src/images/lavender-saree.png' },
//   { id: 'designer', name: 'Designer Sarees', count: 12, icon: 'gem', image: '/src/images/mobile-hero-rose.png' },
// ];

// export const CategoriesScreen: React.FC = () => {
//   const { navigateTo, setSelectedCategory, setSelectedFabric } = useApp();

//   const [activeTopTab, setActiveTopTab] = useState<string>('All Sarees');
//   const [activeSubcatId, setActiveSubcatId] = useState<string>('all-sarees');
//   const [sortOption, setSortOption] = useState<string>('Popular');

//   const getSubcategoryIcon = (iconName: string) => {
//     switch (iconName) {
//       case 'sparkles':
//         return <Sparkles className="w-4 h-4" />;
//       case 'crown':
//         return <Crown className="w-4 h-4" />;
//       case 'flower':
//         return <Flower2 className="w-4 h-4" />;
//       case 'wind':
//         return <Wind className="w-4 h-4" />;
//       case 'feather':
//         return <Feather className="w-4 h-4" />;
//       case 'sun':
//         return <Sun className="w-4 h-4" />;
//       case 'layers':
//         return <Layers className="w-4 h-4" />;
//       case 'shield':
//         return <Shield className="w-4 h-4" />;
//       case 'gem':
//         return <Gem className="w-4 h-4" />;
//       default:
//         return <Layers className="w-4 h-4" />;
//     }
//   };

//   const categoryCards = SUBCATEGORIES_DATA.filter((s) => s.id !== 'all-sarees');

//   const handleCardClick = (catName: string) => {
//     setSelectedCategory(catName);
//     setSelectedFabric(catName.replace(' Sarees', ''));
//     navigateTo('collection', { category: catName, fabric: catName.replace(' Sarees', '') });
//   };

//   return (
//     <div className="min-h-screen bg-slate-50/50 pb-24 md:pb-0">
//       <Header />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
//         {/* Title & Sort */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
//               Categories
//             </h1>
//             <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
//               Explore our exclusive collection
//             </p>
//           </div>

//           <button
//             onClick={() => {
//               const next = sortOption === 'Popular' ? 'Price: Low' : sortOption === 'Price: Low' ? 'Newest' : 'Popular';
//               setSortOption(next);
//             }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer"
//           >
//             <SlidersHorizontal className="w-4 h-4 text-slate-500" />
//             <span>Sort</span>
//           </button>
//         </div>

//         {/* Top category circular pills */}
//         <div className="flex items-center justify-start md:justify-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2">
//           {CATEGORIES_LIST.slice(0, 5).map((cat) => {
//             const isActive = activeTopTab === cat.name;
//             return (
//               <button
//                 key={cat.id}
//                 onClick={() => setActiveTopTab(cat.name)}
//                 className="flex flex-col items-center shrink-0 cursor-pointer group"
//               >
//                 <div
//                   className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 border-2 transition-all ${
//                     isActive ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 group-hover:border-slate-300'
//                   }`}
//                 >
//                   <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
//                     <ImageTag
//                       src={cat.image}
//                       alt={cat.name}
//                       fallbackText={cat.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </div>
//                 <span
//                   className={`text-xs mt-1.5 font-medium transition-colors ${
//                     isActive ? 'text-blue-600 font-bold' : 'text-slate-600 group-hover:text-slate-900'
//                   }`}
//                 >
//                   {cat.name}
//                 </span>
//               </button>
//             );
//           })}
//         </div>

//         {/* Main Content: Left Subcategories list + Right 3-column cards grid */}
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
//           {/* Left Subcategory List */}
//           <div className="md:col-span-3 space-y-1.5 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs">
//             {SUBCATEGORIES_DATA.map((subcat) => {
//               const isSelected = activeSubcatId === subcat.id;
//               return (
//                 <button
//                   key={subcat.id}
//                   onClick={() => {
//                     setActiveSubcatId(subcat.id);
//                     if (subcat.id !== 'all-sarees') {
//                       handleCardClick(subcat.name);
//                     }
//                   }}
//                   className={`w-full px-3 py-2.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
//                     isSelected
//                       ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60 shadow-xs'
//                       : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
//                   }`}
//                 >
//                   <div className="flex items-center gap-2.5">
//                     <span className={isSelected ? 'text-blue-600' : 'text-slate-400'}>
//                       {getSubcategoryIcon(subcat.icon)}
//                     </span>
//                     <span className="text-xs sm:text-sm leading-tight line-clamp-1">
//                       {subcat.name}
//                     </span>
//                   </div>
//                   <span className="text-xs text-slate-400 tabular-nums">
//                     {subcat.count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Right 3-column Category Cards Grid */}
//           <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-4">
//             {categoryCards.map((card) => (
//               <div
//                 key={card.id}
//                 onClick={() => handleCardClick(card.name)}
//                 className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
//               >
//                 {/* Image tag */}
//                 <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
//                   <ImageTag
//                     src={card.image}
//                     alt={card.name}
//                     fallbackText={card.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>

//                 {/* Title & Item count */}
//                 <div className="p-3.5 flex items-center justify-between">
//                   <div>
//                     <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors">
//                       {card.name}
//                     </h4>
//                     <p className="text-[11px] text-slate-400 mt-0.5 tabular-nums">
//                       {card.count} Items
//                     </p>
//                   </div>
//                   <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
//                     <ArrowRight className="w-3.5 h-3.5" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };