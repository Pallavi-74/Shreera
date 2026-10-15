import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
// import { Footer } from '../components/common/Footer';
import { ImageTag } from '../components/common/ImageTag';
import { Camera, Shield, Package, Heart, MapPin, Sparkles,ChevronRight,
  User, CreditCard, Lock, Bell, Gift, Ticket, HelpCircle, PhoneCall, Info, Truck,
  RotateCcw, Clock, CheckCircle2, } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { userProfile, navigateTo, authUser, isAdmin, signOutUser } = useApp();

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Header />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">My Account</span>
          </nav>

          {/* Title */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Account Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your personal details, order tracking, and preferences
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            {authUser ? <>
              <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-900">Signed in</p><p className="truncate text-xs text-slate-500">{authUser.email}</p></div>
              {isAdmin && <button onClick={() => navigateTo('admin')} className="rounded-xl bg-rose-800 px-4 py-2 text-sm font-medium text-white">Admin panel</button>}
              <button onClick={() => void signOutUser()} className="rounded-xl border px-4 py-2 text-sm">Sign out</button>
            </> : <><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-900">Save your cart and orders</p><p className="text-xs text-slate-500">Sign in to sync your account across devices.</p></div><button onClick={() => navigateTo('auth')} className="rounded-xl bg-rose-800 px-4 py-2 text-sm font-medium text-white">Sign in / Sign up</button></>}
          </div>

          {/* Desktop 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: User Card & Membership */}
            <div className="md:col-span-5 lg:col-span-4 space-y-4">
              {/* Profile Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200/80 p-5 shadow-xs">
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white ring-4 ring-blue-500/20 shadow-md">
                      <ImageTag
                        src={userProfile.avatarUrl}
                        alt={userProfile.name}
                        fallbackText={userProfile.name}
                        fallbackGradient="from-blue-200 to-indigo-200"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white text-blue-600 shadow-md flex items-center justify-center border border-slate-200 cursor-pointer hover:bg-slate-50"
                      aria-label="Edit avatar"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900">
                    {userProfile.name}
                  </h2>
                  <p className="text-xs text-slate-500">{userProfile.email}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{userProfile.phone}</p>

                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-white/95 border border-blue-200 px-3 py-1 rounded-full shadow-2xs">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    <span>{userProfile.membershipTier} Member</span>
                  </div>
                </div>
              </div>

              {/* 4 Quick Stat Tiles */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => navigateTo('orders')}
                  className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-slate-900 block tabular-nums">
                    {userProfile.ordersCount}
                  </span>
                  <span className="text-xs text-slate-500">Total Orders</span>
                </div>

                <div
                  onClick={() => navigateTo('wishlist')}
                  className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-slate-900 block tabular-nums">
                    {userProfile.wishlistCount}
                  </span>
                  <span className="text-xs text-slate-500">Wishlist Items</span>
                </div>

                <div
                  onClick={() => navigateTo('settings')}
                  className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-slate-900 block tabular-nums">
                    {userProfile.savedAddressesCount}
                  </span>
                  <span className="text-xs text-slate-500">Addresses</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-center">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-slate-900 block tabular-nums">
                    {userProfile.rewardPoints}
                  </span>
                  <span className="text-xs text-slate-500">Reward Points</span>
                </div>
              </div>
            </div>

            {/* Right Column: Account Navigation Cards */}
            <div className="md:col-span-7 lg:col-span-8 space-y-4">
              {/* Orders & Tracking Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                <h3 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span>Orders & Delivery</span>
                </h3>

                <div className="space-y-1">
                  <button
                    onClick={() => navigateTo('orders')}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        My Orders
                      </h4>
                      <p className="text-xs text-slate-500">
                        View order history, track shipments, and request returns
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>

                  <button
                    onClick={() => navigateTo('notifications')}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        Notifications & Tracking Updates
                      </h4>
                      <p className="text-xs text-slate-500">
                        Order status alerts, festive coupons, and price drops
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Account Settings Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                <h3 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Account Details & Preferences</span>
                </h3>

                <div className="space-y-1">
                  <button
                    onClick={() => navigateTo('settings')}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        Profile & Delivery Addresses
                      </h4>
                      <p className="text-xs text-slate-500">
                        Manage saved home/office addresses and payment methods
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>

                  <button
                    onClick={() => navigateTo('settings')}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        App Preferences & Security
                      </h4>
                      <p className="text-xs text-slate-500">
                        Change language, currencies, passwords, and dark mode
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Support & Brand Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                <h3 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Help & Brand Story</span>
                </h3>

                <div className="space-y-1">
                  <button
                    onClick={() => navigateTo('contact')}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        24x7 Customer Care & FAQs
                      </h4>
                      <p className="text-xs text-slate-500">
                        Need help with sizing, returns, or order inquiries?
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>

                  <button
                    onClick={() => navigateTo('about')}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        About Shreera Heritage
                      </h4>
                      <p className="text-xs text-slate-500">
                        Crafted for the woman you are · Our master artisans
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
