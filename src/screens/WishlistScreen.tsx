import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ImageTag } from '../components/common/ImageTag';
import { CheckoutModal } from '../components/modals/CheckoutModal';
import {
  Heart,
  Trash2,
  ShoppingBag,
  Zap,
  ChevronRight,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Product } from '../types';

export const WishlistScreen: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    moveToCartFromWishlist,
    clearWishlist,
    navigateTo,
    addToCart,
  } = useApp();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    setIsCheckoutOpen(true);
  };

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
            <span className="text-slate-900 font-semibold">My Wishlist</span>
          </nav>

          {/* Title & Clear All */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Your favourite styles, weaves, and festive looks saved in one place
              </p>
            </div>

            {wishlist.length > 0 && (
              <button
                onClick={clearWishlist}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer shadow-2xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>
            )}
          </div>

          {/* Wishlist Items List or Empty State */}
          {wishlist.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-xl mx-auto shadow-xs my-8">
              <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                Save your favourite sarees, Banarasi weaves, and traditional styles to view or purchase them later.
              </p>
              <button
                onClick={() => navigateTo('collection')}
                className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
              >
                Explore Sarees
              </button>
            </div>
          ) : (
            /* Responsive Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {wishlist.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group relative"
                >
                  {/* Image tag with NEW badge */}
                  <div
                    className="relative aspect-3/4 w-full bg-slate-100 shrink-0 cursor-pointer overflow-hidden"
                    onClick={() => navigateTo('product-detail', { productId: prod.id })}
                  >
                    <ImageTag
                      src={prod.image}
                      alt={prod.name}
                      fallbackText={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {prod.isNew && (
                      <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        NEW
                      </span>
                    )}

                    {/* Remove Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-rose-500 hover:bg-rose-50 shadow-xs cursor-pointer transition-colors"
                      title="Remove from wishlist"
                    >
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-600">
                        {prod.fabric}
                      </span>
                      <h3
                        onClick={() => navigateTo('product-detail', { productId: prod.id })}
                        className="text-sm font-bold text-slate-900 line-clamp-1 mt-0.5 cursor-pointer hover:text-blue-600"
                      >
                        {prod.name}
                      </h3>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base font-extrabold text-slate-900 tabular-nums">
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

                    {/* Actions */}
                    <div className="pt-4 flex gap-2 border-t border-slate-100 mt-3">
                      <button
                        onClick={() => moveToCartFromWishlist(prod)}
                        className="flex-1 py-2.5 px-3 bg-white border border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        onClick={() => handleBuyNow(prod)}
                        className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 fill-white" />
                        <span>Buy</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* <Footer /> */}

      {/* Checkout Modal if Buy Now clicked */}
      {isCheckoutOpen && <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
};
