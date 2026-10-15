import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import {
  X,
  Home,
  LayoutGrid,
  Heart,
  ShoppingBag,
  Package,
  Bell,
  User,
  Info,
  PhoneCall,
  Settings,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ScreenType } from '../../types';

export const SideMenuDrawer: React.FC = () => {
  const {
    isSideMenuOpen,
    setIsSideMenuOpen,
    navigateTo,
    userProfile,
    wishlist,
    cartItems,
    unreadNotificationsCount,
  } = useApp();

  if (!isSideMenuOpen) return null;

  const menuItems: {
    screen: ScreenType;
    label: string;
    icon: React.ReactNode;
    badge?: number | string;
  }[] = [
    { screen: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { screen: 'categories', label: 'Categories', icon: <LayoutGrid className="w-4 h-4" /> },
    { screen: 'collection', label: 'Featured Collections', icon: <Sparkles className="w-4 h-4" /> },
    { screen: 'wishlist', label: 'My Wishlist', icon: <Heart className="w-4 h-4" />, badge: wishlist.length },
    { screen: 'cart', label: 'Shopping Cart', icon: <ShoppingBag className="w-4 h-4" />, badge: cartItems.length },
    { screen: 'orders', label: 'My Orders', icon: <Package className="w-4 h-4" />, badge: userProfile.ordersCount },
    { screen: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined },
    { screen: 'profile', label: 'My Account', icon: <User className="w-4 h-4" /> },
    { screen: 'about', label: 'About Shreera', icon: <Info className="w-4 h-4" /> },
    { screen: 'contact', label: 'Contact Us', icon: <PhoneCall className="w-4 h-4" /> },
    { screen: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSideMenuOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={() => setIsSideMenuOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div
          onClick={() => {
            navigateTo('profile');
            setIsSideMenuOpen(false);
          }}
          className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/60 flex items-center gap-3 cursor-pointer hover:bg-blue-100/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full ring-2 ring-blue-600/30 overflow-hidden bg-white flex items-center justify-center font-bold text-blue-700 text-lg shadow-xs">
            {userProfile.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {userProfile.name}
            </h4>
            <p className="text-xs text-slate-500 truncate">{userProfile.email}</p>
            <span className="inline-block mt-1 text-[10px] font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
              {userProfile.membershipTier}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Menu Navigation */}
        <div className="flex-1 overflow-y-auto py-2 divide-y divide-slate-50">
          <div className="px-3 py-1 space-y-0.5">
            {menuItems.map((item) => (
              <button
                key={item.screen + item.label}
                onClick={() => {
                  navigateTo(item.screen);
                  setIsSideMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-left text-sm font-medium cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 group-hover:text-blue-600">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-[11px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[11px] text-slate-500 text-center">
            Shreera Pvt. Ltd. · Surat, India
          </p>
          <p className="text-[10px] text-slate-400 text-center mt-0.5">
            Crafted with elegance for you
          </p>
        </div>
      </div>
    </div>
  );
};
