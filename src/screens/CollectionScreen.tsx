// import React, { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { Header } from '../components/common/Header';
// // import { Footer } from '../components/common/Footer';
// import { ImageTag } from '../components/common/ImageTag';
// import { FABRIC_LIST } from '../data/mockData';
// import {
//   SlidersHorizontal,
//   ArrowUpDown,
//   LayoutGrid,
//   X,
//   Heart,
//   Star,
//   Plus,
//   Award,
//   RotateCcw,
//   Truck,
//   ShieldCheck,
//   ChevronRight,
//   Filter,
//   CheckCircle2,
// } from 'lucide-react';
// import { Product } from '../types';

// export const CollectionScreen: React.FC = () => {
//   const {
//     products,
//     selectedCategory,
//     selectedFabric,
//     setSelectedFabric,
//     navigateTo,
//     addToCart,
//     toggleWishlist,
//     isInWishlist,
//   } = useApp();

//   const [activeFabric, setActiveFabric] = useState<string>(selectedFabric || 'Soft Silk');
//   const [activeFilters, setActiveFilters] = useState<string[]>([
//     'Soft Silk',
//     'Sarees',
//     'In Stock',
//     'Under ₹5000',
//   ]);
//   const [sortOption, setSortOption] = useState<'Popular' | 'PriceLow' | 'PriceHigh'>('Popular');

//   // State to track which product IDs are currently showing "Added to Cart"
//   const [addedProductIds, setAddedProductIds] = useState<{ [key: string]: boolean }>({});

//   const handleAddToCartWithTimeout = (prod: Product) => {
//     addToCart(prod);
//     setAddedProductIds((prev) => ({ ...prev, [prod.id]: true }));
//     setTimeout(() => {
//       setAddedProductIds((prev) => ({ ...prev, [prod.id]: false }));
//     }, 3000);
//   };

//   const removeFilter = (tag: string) => {
//     setActiveFilters((prev) => prev.filter((f) => f !== tag));
//   };

//   const clearAllFilters = () => {
//     setActiveFilters([]);
//   };

//   let displayProducts = [...products];

//   if (sortOption === 'PriceLow') {
//     displayProducts.sort((a, b) => a.price - b.price);
//   } else if (sortOption === 'PriceHigh') {
//     displayProducts.sort((a, b) => b.price - a.price);
//   }

//   return (
//     <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
//       <div>
//         <Header />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
//           {/* Breadcrumb Navigation */}
//           <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
//             <button
//               onClick={() => navigateTo('home')}
//               className="hover:text-blue-600 cursor-pointer"
//             >
//               Home
//             </button>
//             <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
//             <button
//               onClick={() => navigateTo('categories')}
//               className="hover:text-blue-600 cursor-pointer"
//             >
//               Categories
//             </button>
//             <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
//             <span className="text-slate-900 font-semibold">{activeFabric} Sarees</span>
//           </nav>

//           {/* Collection Hero Banner */}
//           <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-100/80 via-sky-50 to-indigo-100 border border-blue-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
//             <div className="space-y-2 max-w-xl text-center sm:text-left">
//               <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
//                 Heritage Handlooms Collection
//               </span>
//               <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
//                 {activeFabric ? `${activeFabric} Sarees` : 'Soft Silk Sarees'}
//               </h1>
//               <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
//                 Explore our elegant collection of {activeFabric.toLowerCase()} sarees, handcrafted with pure zari borders, rich pallus, and festive sheen.
//               </p>
//             </div>

//             <div className="w-32 h-36 sm:w-48 sm:h-52 rounded-2xl overflow-hidden bg-white shadow-md border-2 border-white shrink-0">
//               <ImageTag
//                 src="/images/categories/soft-silk-banner-model.jpg"
//                 alt="Soft Silk Sarees"
//                 fallbackText="Soft Silk Model"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>

//           {/* 4 Trust Props Strip */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-white rounded-2xl border border-slate-200 text-center shadow-2xs">
//             <div className="p-2 flex items-center justify-center gap-2">
//               <Award className="w-4 h-4 text-blue-600 shrink-0" />
//               <span className="text-xs font-bold text-slate-800">
//                 100% Pure Silk Certified
//               </span>
//             </div>
//             <div className="p-2 flex items-center justify-center gap-2">
//               <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
//               <span className="text-xs font-bold text-slate-800">
//                 7-Day Easy Returns
//               </span>
//             </div>
//             <div className="p-2 flex items-center justify-center gap-2">
//               <Truck className="w-4 h-4 text-blue-600 shrink-0" />
//               <span className="text-xs font-bold text-slate-800">
//                 Free Express Delivery
//               </span>
//             </div>
//             <div className="p-2 flex items-center justify-center gap-2">
//               <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
//               <span className="text-xs font-bold text-slate-800">
//                 Secure COD Available
//               </span>
//             </div>
//           </div>

//           {/* Shop by Fabric Filter Carousel */}
//           <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xs sm:text-sm font-bold text-slate-900">
//                 Shop By Fabric / Weave
//               </h3>
//               <span className="text-xs text-slate-400">
//                 Select fabric to refine styles
//               </span>
//             </div>

//             <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
//               {FABRIC_LIST.map((fab) => {
//                 const isSelected = activeFabric === fab.name;
//                 return (
//                   <button
//                     key={fab.id}
//                     onClick={() => {
//                       setActiveFabric(fab.name);
//                       setSelectedFabric(fab.name);
//                     }}
//                     className="flex flex-col items-center shrink-0 cursor-pointer group"
//                   >
//                     <div
//                       className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 border-2 transition-all ${
//                         isSelected
//                           ? 'border-blue-600 ring-2 ring-blue-100 shadow-xs'
//                           : 'border-slate-200 group-hover:border-slate-300'
//                       }`}
//                     >
//                       <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
//                         <ImageTag
//                           src={fab.image}
//                           alt={fab.name}
//                           fallbackText={fab.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </div>
//                     <span
//                       className={`text-xs mt-1.5 font-medium transition-colors ${
//                         isSelected ? 'text-blue-600 font-bold' : 'text-slate-600'
//                       }`}
//                     >
//                       {fab.name}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Control Strip: Sort, Filter, View */}
//           <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => {
//                   const next =
//                     sortOption === 'Popular'
//                       ? 'PriceLow'
//                       : sortOption === 'PriceLow'
//                       ? 'PriceHigh'
//                       : 'Popular';
//                   setSortOption(next);
//                 }}
//                 className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 cursor-pointer"
//               >
//                 <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
//                 <span>
//                   Sort: <strong className="text-blue-600">{sortOption === 'Popular' ? 'Popularity' : sortOption === 'PriceLow' ? 'Price: Low to High' : 'Price: High to Low'}</strong>
//                 </span>
//               </button>

//               <button
//                 onClick={() => {
//                   if (activeFilters.length === 0) {
//                     setActiveFilters(['Soft Silk', 'Sarees', 'In Stock', 'Under ₹5000']);
//                   } else {
//                     setActiveFilters([]);
//                   }
//                 }}
//                 className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 cursor-pointer"
//               >
//                 <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
//                 <span>Filters {activeFilters.length > 0 && `(${activeFilters.length})`}</span>
//               </button>
//             </div>

//             <span className="text-xs text-slate-500 font-medium">
//               Showing <strong>{displayProducts.length}</strong> Handloom Sarees
//             </span>
//           </div>

//           {/* Active Filter Pills */}
//           {activeFilters.length > 0 && (
//             <div className="flex flex-wrap items-center gap-2">
//               {activeFilters.map((filt, idx) => (
//                 <span
//                   key={idx}
//                   className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium shadow-2xs"
//                 >
//                   <span>{filt}</span>
//                   <button
//                     onClick={() => removeFilter(filt)}
//                     className="hover:text-rose-500 cursor-pointer"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </span>
//               ))}
//               <button
//                 onClick={clearAllFilters}
//                 className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer ml-1"
//               >
//                 Clear All
//               </button>
//             </div>
//           )}

//           {/* Responsive Product Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
//             {displayProducts.map((prod) => {
//               const inWish = isInWishlist(prod.id);
//               const isAdded = addedProductIds[prod.id];
//               return (
//                 <div
//                   key={prod.id}
//                   className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
//                 >
//                   <div
//                     className="relative aspect-3/4 w-full bg-slate-100 cursor-pointer overflow-hidden"
//                     onClick={() => navigateTo('product-detail', { productId: prod.id })}
//                   >
//                     <ImageTag
//                       src={prod.image}
//                       alt={prod.name}
//                       fallbackText={prod.name}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
//                       NEW
//                     </span>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleWishlist(prod);
//                       }}
//                       className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-xs cursor-pointer"
//                       aria-label="Wishlist"
//                     >
//                       <Heart
//                         className={`w-4 h-4 ${
//                           inWish ? 'fill-rose-500 text-rose-500' : ''
//                         }`}
//                       />
//                     </button>
//                   </div>

//                   <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
//                     <div>
//                       <span className="text-[10px] font-bold uppercase text-blue-600">
//                         {prod.fabric}
//                       </span>
//                       <h4
//                         onClick={() => navigateTo('product-detail', { productId: prod.id })}
//                         className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 mt-0.5 cursor-pointer hover:text-blue-600"
//                       >
//                         {prod.name}
//                       </h4>
//                       <div className="flex items-baseline gap-2 mt-1">
//                         <span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
//                           ₹{prod.price.toLocaleString('en-IN')}
//                         </span>
//                         <span className="text-xs text-slate-400 line-through tabular-nums">
//                           ₹{prod.originalPrice.toLocaleString('en-IN')}
//                         </span>
//                         <span className="text-xs font-bold text-rose-600">
//                           {prod.discountPercentage}% OFF
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1 mt-1 text-amber-500">
//                         {[...Array(5)].map((_, i) => (
//                           <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
//                         ))}
//                         <span className="text-[10px] text-slate-400 ml-1">
//                           ({prod.reviewCount})
//                         </span>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => handleAddToCartWithTimeout(prod)}
//                       className={`mt-3 w-full py-2 border text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
//                         isAdded
//                           ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
//                           : 'bg-white border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-800 hover:text-blue-700'
//                       }`}
//                     >
//                       {isAdded ? (
//                         <>
//                           <CheckCircle2 className="w-3.5 h-3.5" />
//                           <span>Added to Cart</span>
//                         </>
//                       ) : (
//                         <>
//                           <Plus className="w-3.5 h-3.5" />
//                           <span>Add to Cart</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { ImageTag } from '../components/common/ImageTag';
import {
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Heart,
  Star,
  Plus,
  Award,
  RotateCcw,
  Truck,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Product } from '../types';

// Local fabric list configuration
const FABRIC_LIST = [
  { id: 'soft-silk', name: 'Soft Silk', image: '/src/images/shreera-hero.png' },
  { id: 'kanjivaram', name: 'Kanjivaram', image: '/src/images/shreera-hero.png' },
  { id: 'organza', name: 'Organza', image: '/src/images/shreera-hero.png' },
  { id: 'chiffon', name: 'Chiffon', image: '/src/images/shreera-hero.png' },
  { id: 'banarasi', name: 'Banarasi', image: '/src/images/shreera-hero.png' },
];

export const CollectionScreen: React.FC = () => {
  const {
    products,
    selectedFabric,
    setSelectedFabric,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  const [activeFabric, setActiveFabric] = useState<string>(selectedFabric || 'Soft Silk');
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'Soft Silk',
    'Sarees',
    'In Stock',
    'Under ₹5000',
  ]);
  const [sortOption, setSortOption] = useState<'Popular' | 'PriceLow' | 'PriceHigh'>('Popular');

  // State to track which product IDs are currently showing "Added to Cart"
  const [addedProductIds, setAddedProductIds] = useState<{ [key: string]: boolean }>({});

  const handleAddToCartWithTimeout = (prod: Product) => {
    addToCart(prod);
    setAddedProductIds((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedProductIds((prev) => ({ ...prev, [prod.id]: false }));
    }, 3000);
  };

  const removeFilter = (tag: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== tag));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  let displayProducts = [...products];

  if (sortOption === 'PriceLow') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'PriceHigh') {
    displayProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button
              onClick={() => navigateTo('categories')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Categories
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">{activeFabric} Sarees</span>
          </nav>

          {/* Collection Hero Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-100/80 via-sky-50 to-indigo-100 border border-blue-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Heritage Handlooms Collection
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {activeFabric ? `${activeFabric} Sarees` : 'Soft Silk Sarees'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore our elegant collection of {activeFabric.toLowerCase()} sarees, handcrafted with pure zari borders, rich pallus, and festive sheen.
              </p>
            </div>

            <div className="w-32 h-36 sm:w-48 sm:h-52 rounded-2xl overflow-hidden bg-white shadow-md border-2 border-white shrink-0">
              <ImageTag
                src="/src/images/shreera-hero.png"
                alt="Soft Silk Sarees"
                fallbackText="Soft Silk Model"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 4 Trust Props Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-white rounded-2xl border border-slate-200 text-center shadow-2xs">
            <div className="p-2 flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                100% Pure Silk Certified
              </span>
            </div>
            <div className="p-2 flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                7-Day Easy Returns
              </span>
            </div>
            <div className="p-2 flex items-center justify-center gap-2">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                Free Express Delivery
              </span>
            </div>
            <div className="p-2 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                Secure COD Available
              </span>
            </div>
          </div>

          {/* Shop by Fabric Filter Carousel */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Shop By Fabric / Weave
              </h3>
              <span className="text-xs text-slate-400">
                Select fabric to refine styles
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
              {FABRIC_LIST.map((fab) => {
                const isSelected = activeFabric === fab.name;
                return (
                  <button
                    key={fab.id}
                    onClick={() => {
                      setActiveFabric(fab.name);
                      setSelectedFabric(fab.name);
                    }}
                    className="flex flex-col items-center shrink-0 cursor-pointer group"
                  >
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 border-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 ring-2 ring-blue-100 shadow-xs'
                          : 'border-slate-200 group-hover:border-slate-300'
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                        <ImageTag
                          src={fab.image}
                          alt={fab.name}
                          fallbackText={fab.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <span
                      className={`text-xs mt-1.5 font-medium transition-colors ${
                        isSelected ? 'text-blue-600 font-bold' : 'text-slate-600'
                      }`}
                    >
                      {fab.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Control Strip: Sort, Filter, View */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const next =
                    sortOption === 'Popular'
                      ? 'PriceLow'
                      : sortOption === 'PriceLow'
                      ? 'PriceHigh'
                      : 'Popular';
                  setSortOption(next);
                }}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  Sort: <strong className="text-blue-600">{sortOption === 'Popular' ? 'Popularity' : sortOption === 'PriceLow' ? 'Price: Low to High' : 'Price: High to Low'}</strong>
                </span>
              </button>

              <button
                onClick={() => {
                  if (activeFilters.length === 0) {
                    setActiveFilters(['Soft Silk', 'Sarees', 'In Stock', 'Under ₹5000']);
                  } else {
                    setActiveFilters([]);
                  }
                }}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span>Filters {activeFilters.length > 0 && `(${activeFilters.length})`}</span>
              </button>
            </div>

            <span className="text-xs text-slate-500 font-medium">
              Showing <strong>{displayProducts.length}</strong> Handloom Sarees
            </span>
          </div>

          {/* Active Filter Pills */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.map((filt, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium shadow-2xs"
                >
                  <span>{filt}</span>
                  <button
                    onClick={() => removeFilter(filt)}
                    className="hover:text-rose-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer ml-1"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Responsive Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
            {displayProducts.map((prod) => {
              const inWish = isInWishlist(prod.id);
              const isAdded = addedProductIds[prod.id];
              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  <div
                    className="relative aspect-3/4 w-full bg-slate-100 cursor-pointer overflow-hidden"
                    onClick={() => navigateTo('product-detail', { productId: prod.id })}
                  >
                    <ImageTag
                      src={prod.image}
                      alt={prod.name}
                      fallbackText={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      NEW
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-xs cursor-pointer"
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          inWish ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-600">
                        {prod.fabric}
                      </span>
                      <h4
                        onClick={() => navigateTo('product-detail', { productId: prod.id })}
                        className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 mt-0.5 cursor-pointer hover:text-blue-600"
                      >
                        {prod.name}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.originalPrice > prod.price && (
                          <span className="text-xs text-slate-400 line-through tabular-nums">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {prod.discountPercentage > 0 && (
                          <span className="text-xs font-bold text-rose-600">
                            {prod.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-[10px] text-slate-400 ml-1">
                          ({prod.reviewCount})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCartWithTimeout(prod)}
                      className={`mt-3 w-full py-2 border text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                          : 'bg-white border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-800 hover:text-blue-700'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};