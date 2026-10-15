import React from 'react';
import { useApp } from '../../context/AppContext';
import { ImageTag } from './ImageTag';
import { ScreenType } from '../../types';
import {
  User,
  Package,
  Bell,
  Heart,
  MapPin,
  Settings,
  HelpCircle,
  ChevronRight,
  Shield,
} from 'lucide-react';

interface ProfileSidebarProps {
  activeItem?: 'profile' | 'orders' | 'notifications' | 'wishlist' | 'settings' | 'help';
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeItem = 'profile' }) => {
  const { userProfile, navigateTo } = useApp();

  const menuItems: {
    id: string;
    screen: ScreenType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'profile', screen: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'orders', screen: 'orders', label: 'My Orders', icon: <Package className="w-4 h-4" /> },
    { id: 'notifications', screen: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'wishlist', screen: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
    { id: 'addresses', screen: 'settings', label: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
    { id: 'settings', screen: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'help', screen: 'contact', label: 'Help & Support', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="w-64 shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
      {/* Profile Header Box */}
      <div className="text-center pb-4 border-b border-slate-100">
        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto bg-slate-100 ring-2 ring-blue-500/20 shadow-xs mb-2">
          <ImageTag
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            fallbackText={userProfile.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-serif text-base font-bold text-slate-900">
          {userProfile.name}
        </h3>
        <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
          <Shield className="w-3 h-3 text-blue-600" />
          {userProfile.membershipTier}
        </span>
      </div>

      {/* Navigation List */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.screen)}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${
                  isActive ? 'text-blue-600' : 'text-slate-300'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
};
