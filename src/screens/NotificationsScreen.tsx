import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import {
  Package,
  Truck,
  Percent,
  Heart,
  Star,
  Gift,
  Shield,
  Cake,
  Bell,
  CheckCheck,
  ChevronRight,
} from 'lucide-react';
import { NotificationItem } from '../types';

export const NotificationsScreen: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'order' | 'offer' | 'account' | 'update'>('all');

  const filtered = notifications.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const getIconWrapper = (iconType: NotificationItem['iconType']) => {
    switch (iconType) {
      case 'box':
        return (
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
        );
      case 'truck':
        return (
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
        );
      case 'percent':
        return (
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <Percent className="w-5 h-5" />
          </div>
        );
      case 'heart':
        return (
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5" />
          </div>
        );
      case 'star':
        return (
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5" />
          </div>
        );
      case 'gift':
        return (
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5" />
          </div>
        );
      case 'shield':
        return (
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
        );
      case 'cake':
        return (
          <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
            <Cake className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Header />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
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
              onClick={() => navigateTo('profile')}
              className="hover:text-blue-600 cursor-pointer"
            >
              My Account
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">Notifications</span>
          </nav>

          {/* Heading & Mark Read */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Notifications
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Stay updated with orders, tracking, festive offers and alerts
              </p>
            </div>

            <button
              onClick={markAllNotificationsRead}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer shadow-2xs"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All', count: notifications.length },
              { id: 'order', label: 'Orders', count: notifications.filter((n) => n.type === 'order').length },
              { id: 'offer', label: 'Offers', count: notifications.filter((n) => n.type === 'offer').length },
              { id: 'account', label: 'Account', count: notifications.filter((n) => n.type === 'account').length },
              { id: 'update', label: 'Updates', count: notifications.filter((n) => n.type === 'update').length },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationRead(item.id);
                  if (item.actionScreen) navigateTo(item.actionScreen);
                }}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                  !item.read
                    ? 'bg-blue-50/40 border-blue-200/80 shadow-2xs'
                    : 'bg-white border-slate-200/80 shadow-2xs hover:bg-slate-50/50'
                }`}
              >
                {getIconWrapper(item.iconType)}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.message}
                  </p>

                  {item.actionLabel && (
                    <div className="mt-2">
                      <span className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                        <span>{item.actionLabel}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>

                {!item.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
