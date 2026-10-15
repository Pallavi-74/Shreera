import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react';
import { ScreenType } from '../../types';

interface BottomNavProps {
  forceVisible?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ forceVisible = false }) => {
  const { currentScreen, navigateTo, wishlist, cartItems } = useApp();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navItems: {
    screen: ScreenType;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    {
      screen: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
    },
    {
      screen: 'categories',
      label: 'Categories',
      icon: <LayoutGrid className="w-5 h-5" />,
    },
    {
      screen: 'wishlist',
      label: 'Wishlist',
      icon: <Heart className="w-5 h-5" />,
      badge: wishlistCount,
    },
    {
      screen: 'cart',
      label: 'Cart',
      icon: <ShoppingBag className="w-5 h-5" />,
      badge: cartCount,
    },
    {
      screen: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
    },
  ];

  // Helper to determine if current tab is active
  const isActive = (itemScreen: ScreenType) => {
    if (itemScreen === 'home' && currentScreen === 'home') return true;
    if (itemScreen === 'categories' && (currentScreen === 'categories' || currentScreen === 'collection')) return true;
    if (itemScreen === 'wishlist' && currentScreen === 'wishlist') return true;
    if (itemScreen === 'cart' && currentScreen === 'cart') return true;
    if (itemScreen === 'profile' && (currentScreen === 'profile' || currentScreen === 'settings' || currentScreen === 'orders' || currentScreen === 'notifications' || currentScreen === 'about' || currentScreen === 'contact')) return true;
    return false;
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 max-w-md mx-auto shadow-lg ${
      forceVisible ? 'block' : 'md:hidden'
    }`}>
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const active = isActive(item.screen);
          return (
            <button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className={`relative flex flex-col items-center justify-center py-1 transition-colors group cursor-pointer ${
                active ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium transition-transform ${
                  active ? 'font-semibold' : ''
                }`}
              >
                {item.label}
              </span>
              {active && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
