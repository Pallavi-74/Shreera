import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ImageTag } from '../components/common/ImageTag';
import { SizeGuideModal } from '../components/modals/SizeGuideModal';
import { CheckoutModal } from '../components/modals/CheckoutModal';
import {
  Heart,
  Share2,
  Star,
  CheckCircle2,
  Tag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Banknote,
  ShoppingBag,
  Zap,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const ProductDetailScreen: React.FC = () => {
  const {
    selectedProductId,
    getProductById,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    applyCoupon,
    showToast,
    navigateTo,
  } = useApp();

  const product = getProductById(selectedProductId) || getProductById('prod-1')!;

  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.selectedColor || product.colors[0]?.name || 'Royal Blue');
  const [selectedSize, setSelectedSize] = useState(product.selectedSize || product.sizes[0] || 'Free Size');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Gallery images array
  const gallery = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image, product.image, product.image];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this stunning ${product.name} on Shreera!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 sm:mb-6 overflow-x-auto no-scrollbar">
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
              {product.category}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button
              onClick={() => navigateTo('collection', { fabric: product.fabric })}
              className="hover:text-blue-600 cursor-pointer"
            >
              {product.fabric}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-md">
              {product.name}
            </span>
          </nav>

          {/* Desktop 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Image Gallery & Thumbnails */}
            <div className="md:col-span-6 lg:col-span-6 space-y-4">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs aspect-4/5 w-full">
                <ImageTag
                  src={gallery[selectedGalleryIndex] || product.image}
                  alt={product.name}
                  fallbackText={product.name}
                  className="w-full h-full object-cover"
                />

                {/* 29% OFF Badge */}
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-sm">
                  {product.discountPercentage}% OFF
                </span>

                {/* Wishlist & Share buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs shadow-md flex items-center justify-center text-slate-700 hover:text-rose-600 transition-colors cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs shadow-md flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                    aria-label="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryIndex(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      idx === selectedGalleryIndex
                        ? 'border-blue-600 ring-2 ring-blue-100 shadow-xs'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ImageTag
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fallbackText={`Thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Info, Options & Purchase Actions */}
            <div className="md:col-span-6 lg:col-span-6 space-y-6">
              {/* Title & Brand */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                    {product.fabric}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 font-medium">
                    SKU: {product.id}
                  </span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-800">
                      {product.rating}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({product.reviewCount} Reviews)
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock (Ready to Dispatch)
                  </span>
                </div>
              </div>

              {/* Price Details */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base text-slate-400 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Save {product.discountPercentage}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Inclusive of all taxes · Free delivery on this order
                </p>

                {/* Instant Coupon Strip */}
                <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-blue-50/80 border border-blue-200/70">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-blue-900 block">
                        Get Extra 10% OFF with code{' '}
                        <span className="text-blue-700 underline font-mono">SHREERA10</span>
                      </span>
                      <span className="text-[10px] text-blue-700">
                        Applicable at checkout
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      applyCoupon('SHREERA10');
                      showToast('Coupon SHREERA10 copied and applied!', 'success');
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Colour: <strong className="text-blue-700">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-blue-600 bg-blue-50/60 font-bold text-blue-900 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Select Size: <strong className="text-blue-700">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Direct Purchase CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => addToCart(product, selectedColor, selectedSize)}
                  className="flex-1 py-3.5 px-6 rounded-xl border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* 4 Feature Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
                  <Truck className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">Free Shipping</span>
                  <span className="text-[10px] text-slate-400">All India</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
                  <RotateCcw className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">7 Day Returns</span>
                  <span className="text-[10px] text-slate-400">No questions asked</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
                  <Banknote className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">Cash on Delivery</span>
                  <span className="text-[10px] text-slate-400">Available</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">Pure Silk</span>
                  <span className="text-[10px] text-slate-400">Authentic Mark</span>
                </div>
              </div>

              {/* Product Specifications & Details */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
                <h3 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Product Specifications & Highlights
                </h3>

                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <div className="text-slate-500">Fabric</div>
                  <div className="font-semibold text-slate-800">{product.fabric} Handloom</div>

                  <div className="text-slate-500">Saree Length</div>
                  <div className="font-semibold text-slate-800">5.5 Metres</div>

                  <div className="text-slate-500">Blouse Piece</div>
                  <div className="font-semibold text-slate-800">0.8 Metres (Unstitched)</div>

                  <div className="text-slate-500">Zari Type</div>
                  <div className="font-semibold text-slate-800">Pure Tested Metallic Zari</div>

                  <div className="text-slate-500">Wash Care</div>
                  <div className="font-semibold text-slate-800">Dry Clean Only</div>

                  <div className="text-slate-500">Dispatch Time</div>
                  <div className="font-semibold text-emerald-700">Ships within 24 Hours</div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions Bar (Mobile View Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg flex items-center gap-3">
        <button
          onClick={() => toggleWishlist(product)}
          className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-rose-600 cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        <button
          onClick={() => addToCart(product, selectedColor, selectedSize)}
          className="flex-1 py-3 rounded-xl border-2 border-blue-600 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Buy Now</span>
        </button>
      </div>

      {/* <Footer /> */}

      {/* Modals */}
      <SizeGuideModal />
      {isCheckoutOpen && <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
};
