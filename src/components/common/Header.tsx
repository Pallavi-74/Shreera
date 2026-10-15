import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { ImageTag } from './ImageTag';
import { ArrowLeft, Menu, Search, Heart, ShoppingBag, Truck } from 'lucide-react';
import { ScreenType } from '../../types';

interface HeaderProps {
  showAnnouncement?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showAnnouncement = false }) => {
  const {
    currentScreen,
    goBack,
    navigateTo,
    setIsSideMenuOpen,
    wishlist,
    cartItems,
    userProfile,
  } = useApp();

  const isHome = currentScreen === 'home';
  const cartBadgeCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistBadgeCount = wishlist.length;

  const desktopNavLinks: { label: string; screen: ScreenType }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Sarees', screen: 'categories' },
    { label: 'Collections', screen: 'collection' },
    { label: 'Our Story', screen: 'about' },
    { label: 'Contact', screen: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top promotional announcement banner */}
      {(showAnnouncement || isHome) && (
        <div className="bg-slate-50 border-b border-slate-200/60 px-3 py-1.5 text-center text-xs text-slate-800 font-medium flex items-center justify-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate">
            <span className="font-bold">FREE SHIPPING</span> on orders above ₹999 | Use Code:{' '}
            <span className="font-bold text-blue-700 bg-white px-1.5 py-0.5 rounded border border-blue-200">
              SHREERA10
            </span>
          </span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile Hamburger / Back Button + Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center md:hidden">
            {isHome ? (
              <button
                onClick={() => setIsSideMenuOpen(true)}
                className="p-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={goBack}
                className="p-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('home')} 
            className="w-30 h-12 cursor-pointer flex items-center overflow-hidden"
          >
            <ImageTag
              src="/src/images/shreera-logo.png" 
              alt="Shreera Logo"
              fallbackText="SHREERA"
              className="w-full h-full object-contain object-left"
            />
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {desktopNavLinks.map((link) => {
            const isActive =
              (link.screen === 'home' && currentScreen === 'home') ||
              (link.screen === 'categories' && currentScreen === 'categories') ||
              (link.screen === 'collection' && currentScreen === 'collection') ||
              (link.screen === 'about' && currentScreen === 'about') ||
              (link.screen === 'contact' && currentScreen === 'contact');

            return (
              <button
                key={link.label}
                onClick={() => navigateTo(link.screen)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  isActive ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search, Wishlist, Cart, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={() => navigateTo('search')}
            className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => navigateTo('wishlist')}
            className="relative p-2 text-slate-700 hover:text-rose-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistBadgeCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {wishlistBadgeCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => navigateTo('cart')}
            className="relative p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartBadgeCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {cartBadgeCount}
              </span>
            )}
          </button>

          {/* Desktop User Avatar & Greeting */}
          <div
            onClick={() => navigateTo('profile')}
            className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200 group-hover:ring-blue-500 transition-all">
              <ImageTag
                src="/src/images/beige-saree.png"
                alt="profile-image"
                fallbackText="Anjali"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
              Hi, Anjali
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

