import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ImageTag } from '../components/common/ImageTag';
import { HERO_SLIDES, CATEGORIES_LIST } from '../data/mockData';
import { ArrowRight, Heart, Star, Plus, Truck, Banknote, RotateCcw, ShieldCheck, Award, Headphones, CheckCircle2, Sparkles, } from 'lucide-react';
import { Product } from '../types';

export const HomeScreen: React.FC = () => {
  const {
    products,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // State to track which product IDs are currently showing "Added to Cart"
  const [addedProductIds, setAddedProductIds] = useState<{ [key: string]: boolean }>({});

  const handleAddToCartWithTimeout = (prod: Product) => {
    addToCart(prod);

    // Set this product ID to true
    setAddedProductIds((prev) => ({ ...prev, [prod.id]: true }));

    // Revert back after 3 seconds (3000ms)
    setTimeout(() => {
      setAddedProductIds((prev) => ({ ...prev, [prod.id]: false }));
    }, 5000);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 1000); 

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const valueProps = [
    {
      icon: <Truck className="w-5 h-5 text-blue-600" />,
      title: 'FREE SHIPPING',
      desc: 'On orders above ₹999',
    },
    {
      icon: <Banknote className="w-5 h-5 text-blue-600" />,
      title: 'CASH ON DELIVERY',
      desc: 'Pay when you receive',
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-blue-600" />,
      title: 'EASY RETURNS',
      desc: '7 day easy returns',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: 'SECURE PAYMENTS',
      desc: '100% secure checkout',
    },
    {
      icon: <Award className="w-5 h-5 text-blue-600" />,
      title: 'PREMIUM QUALITY',
      desc: 'Finest quality assured',
    },
    {
      icon: <Headphones className="w-5 h-5 text-blue-600" />,
      title: '24X7 SUPPORT',
      desc: 'We are here to help',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 md:pb-4">
      <Header showAnnouncement={true} />
      {/* Hero Banner Carousel (Background Image with Left Text) */}
      <section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)} >
        <div className="relative overflow-hidden rounded-2xl shadow-md min-h-[380px] sm:min-h-[480px] flex flex-col justify-between p-6 sm:p-12">
          
          {/* Absolute Background Image */}
          <div className="absolute inset-0 z-0">
            <ImageTag src={currentSlide.image}
              alt={currentSlide.title} fallbackText={currentSlide.tagline}
              fallbackGradient="from-sky-100 via-blue-50 to-indigo-100"
              className="w-full h-full object-cover object-center"/>
            {/* Dark/Gradient Overlay so text is easily readable over any image */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent" />
          </div>

          {/* Content Layer (Text on the left) */}
          <div className="relative z-10 max-w-xl space-y-4 my-auto">
            <span className="inline-block text-xs font-bold tracking-wider text-blue-300 uppercase bg-blue-950/60 px-3 py-1 rounded-full backdrop-blur-xs">
              {currentSlide.badge}
            </span>
            
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight drop-shadow-sm">
              {currentSlide.title}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed drop-shadow-sm">{currentSlide.subtitle}</p>
            <div className="pt-2">
              <button onClick={() => navigateTo('collection')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <span>{currentSlide.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Pagination Indicator Dots at the bottom */}
          <div className="relative z-10 flex items-center justify-center gap-2 pt-4">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 transition-all rounded-full cursor-pointer shadow-sm ${
                    isActive ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Circular Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="grid grid-cols-6 gap-2 sm:gap-4 text-center max-w-7xl mx-auto">
          {CATEGORIES_LIST.map((cat) => (
            <div key={cat.id}
              onClick={() => {
                if (cat.id === 'sale') navigateTo('collection');
                else navigateTo('categories');
              }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full p-1 border-2 border-slate-200 group-hover:border-blue-500 transition-colors bg-white shadow-sm">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <ImageTag src={cat.image} alt={cat.name} fallbackText={cat.name}
                    fallbackGradient="from-amber-50 to-rose-50" className="w-full h-full object-cover"/>
                </div>
                {cat.isSale && (
                  <div className="absolute inset-0 rounded-full bg-rose-600 text-white flex flex-col items-center justify-center p-1 text-[10px] sm:text-xs md:text-sm font-bold leading-tight shadow-xs">
                    <span>SALE</span>
                    <span>50%</span>
                  </div>
                )}
              </div>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-800 mt-2 group-hover:text-blue-600 transition-colors truncate w-full">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Value Propositions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-6 gap-1 sm:gap-3 p-2 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          {valueProps.map((prop, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-0.5 sm:p-1">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-blue-50 flex items-center justify-center mb-1">
                <div className="scale-75 sm:scale-100">{prop.icon}</div>
              </div>
              <h4 className="text-[9px] sm:text-[11px] font-bold text-slate-900 leading-tight">{prop.title}</h4>
              <p className="text-[8px] sm:text-[10px] text-slate-500 leading-tight mt-0.5 hidden sm:block">{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">Featured Collections</h2>
          <button onClick={() => navigateTo('collection')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >View All</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((prod) => {
            const inWish = isInWishlist(prod.id);
            const isAdded = addedProductIds[prod.id];
            return (
              <div key={prod.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
                <div
                  className="relative aspect-3/4 w-full bg-slate-100 cursor-pointer"
                  onClick={() => navigateTo('product-detail', { productId: prod.id })} >
                  <ImageTag src={prod.image} alt={prod.name} fallbackText={prod.name}
                    className="w-full h-full object-cover" />
                  {prod.isNew && (
                    <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-xs cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        inWish ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div className="cursor-pointer"
                    onClick={() => navigateTo('product-detail', { productId: prod.id })}>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                      {prod.name}
                    </h3>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through tabular-nums">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] font-bold text-rose-600">
                        {prod.discountPercentage}% OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[10px] text-slate-400 ml-1">
                        ({prod.reviewCount})
                      </span>
                    </div>
                  </div>

                  <button onClick={() => handleAddToCartWithTimeout(prod)}
                    className={`mt-3 w-full py-2 border text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
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
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">New Arrivals</h2>
          <button onClick={() => navigateTo('collection')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >View All</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(4, 8).map((prod) => {
            const inWish = isInWishlist(prod.id);
            const isAdded = addedProductIds[prod.id];
            return (
              <div
                key={prod.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
                <div
                  className="relative aspect-3/4 w-full bg-slate-100 cursor-pointer"
                  onClick={() => navigateTo('product-detail', { productId: prod.id })}>
                  <ImageTag src={prod.image} alt={prod.name}
                    fallbackText={prod.name} className="w-full h-full object-cover"/>
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    NEW
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-xs cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${
                        inWish ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div className="cursor-pointer"
                    onClick={() => navigateTo('product-detail', { productId: prod.id })} >
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1"> {prod.name} </h3>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through tabular-nums">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] font-bold text-rose-600">
                        {prod.discountPercentage}% OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-1 text-amber-500">
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
                    className={`mt-3 w-full py-2 border text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
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
      </section>

      {/* Special Offer Banner (50% OFF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative overflow-hidden rounded-2xl shadow-md min-h-[220px] sm:min-h-[280px] flex flex-col justify-between p-6 sm:p-10"> 
          <div className="absolute inset-0 z-0">
            <ImageTag
              src="/src/images/shreera-hero.png"
              alt="Special Offer"
              fallbackText="Special Silk Collection"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/3 via-slate-900/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-2 my-auto text-white">
            <span className="inline-block text-xs sm:text-sm font-medium tracking-wide text-blue-200 uppercase bg-blue-950/60 px-3 py-1 rounded-full backdrop-blur-xs">
              Special Offer
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight drop-shadow-sm">
              UP TO <span className="font-extrabold text-blue-400">50%</span> OFF
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 drop-shadow-sm">
              On Selected Collections
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('collection')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section> 
      
      {/* Trust Badges Footer Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl text-center shadow-xs">
          <div>
            <Sparkles className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <h5 className="text-xs font-bold text-slate-900 leading-tight">1000+ Designs</h5>
            <p className="text-[10px] text-slate-500">For Every Occasion</p>
          </div>
          <div>
            <CheckCircle2 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <h5 className="text-xs font-bold text-slate-900 leading-tight">Trusted By</h5>
            <p className="text-[10px] text-slate-500">50K+ Customers</p>
          </div>
          <div>
            <RotateCcw className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <h5 className="text-xs font-bold text-slate-900 leading-tight">7 Days</h5>
            <p className="text-[10px] text-slate-500">Easy Returns</p>
          </div>
          <div>
            <Heart className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <h5 className="text-xs font-bold text-slate-900 leading-tight">Made For You</h5>
            <p className="text-[10px] text-slate-500">With Love</p>
          </div>
        </div>
        {/* Copyright & Quick Badges Footer Bar */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Shreera. Crafted for the woman you are.</p>
          <div className="flex items-center gap-4">
            <span>Secure payments</span>
            <span>•</span>
            <span>Easy returns</span>
            <span>•</span>
            <span>Customer support</span>
          </div>
        </footer>
      {/* </div> */}
      </section>
    </div>
  );
};