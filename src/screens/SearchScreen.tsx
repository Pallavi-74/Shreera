import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ImageTag } from '../components/common/ImageTag';
import {
  Search as SearchIcon,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Star,
  Plus,
  Clock,
  Heart,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { Product } from '../types';

export const SearchScreen: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  const [inputVal, setInputVal] = useState(searchQuery || 'saree');
  const [activeSort, setActiveSort] = useState<'Popular' | 'LowToHigh' | 'HighToLow'>('Popular');

  const popularTags = [
    'Soft Silk',
    'Banarasi Saree',
    'Kanjeevaram',
    'Party Wear Saree',
    'Wedding Silk',
    'Chanderi Cotton',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSearchQuery(inputVal.trim());
      addRecentSearch(inputVal.trim());
    }
  };

  const handleSelectTag = (tag: string) => {
    setInputVal(tag);
    setSearchQuery(tag);
    addRecentSearch(tag);
  };

  // Filter products by search query
  const queryLower = (searchQuery || inputVal).toLowerCase();
  let searchResults = products.filter(
    (p) =>
      p.name.toLowerCase().includes(queryLower) ||
      p.category.toLowerCase().includes(queryLower) ||
      p.subCategory.toLowerCase().includes(queryLower) ||
      p.fabric.toLowerCase().includes(queryLower)
  );

  // If no match, show all products to give rich browsing
  if (searchResults.length === 0) {
    searchResults = products;
  }

  // Sort
  if (activeSort === 'LowToHigh') {
    searchResults = [...searchResults].sort((a, b) => a.price - b.price);
  } else if (activeSort === 'HighToLow') {
    searchResults = [...searchResults].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">Search Sarees</span>
          </nav>

          {/* Search Input Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Search soft silk, Banarasi, Kanjeevaram, festive wear..."
                className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-sm"
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={() => {
                    setInputVal('');
                    setSearchQuery('');
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>

          {/* Recent & Popular Tags */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4 max-w-4xl mx-auto">
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Recent Searches
                  </span>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectTag(s)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl text-xs text-slate-700 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                    >
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" /> Popular Trends
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectTag(tag)}
                    className="px-3 py-1.5 bg-blue-50/60 border border-blue-200/60 hover:bg-blue-100/80 rounded-xl text-xs font-medium text-blue-800 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Header with Sort & Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Showing results for <span className="text-blue-600">"{searchQuery || inputVal || 'saree'}"</span>
              </h3>
              <span className="text-xs text-slate-400">
                ({searchResults.length} Products Found)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const next =
                    activeSort === 'Popular'
                      ? 'LowToHigh'
                      : activeSort === 'LowToHigh'
                      ? 'HighToLow'
                      : 'Popular';
                  setActiveSort(next);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort: {activeSort === 'Popular' ? 'Popular' : activeSort === 'LowToHigh' ? 'Price: Low to High' : 'Price: High to Low'}</span>
              </button>

              <button
                onClick={() => navigateTo('collection')}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Responsive Products Results Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
            {searchResults.map((prod) => {
              const inWish = isInWishlist(prod.id);
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
                        <span className="text-xs text-slate-400 line-through tabular-nums">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-rose-600">
                          {prod.discountPercentage}% OFF
                        </span>
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
                      onClick={() => addToCart(prod)}
                      className="mt-3 w-full py-2 bg-white border border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
