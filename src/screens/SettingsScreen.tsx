import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
// import { Footer } from '../components/common/Footer';
import { User, MapPin, CreditCard, Lock, ShieldCheck,
  Bell, Moon, Globe, Coins, HelpCircle, PhoneCall,
  FileText, Info, LogOut, ChevronRight, Check, } from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    darkMode,
    toggleDarkMode,
    notificationsEnabled,
    toggleNotificationsEnabled,
    language,
    setLanguage,
    currency,
    setCurrency,
    navigateTo,
    showToast,
  } = useApp();

  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const languages = ['English', 'Hindi (हिंदी)', 'Gujarati (ગુજરાતી)', 'Marathi (मराठी)', 'Tamil (தமிழ்)'];
  const currencies = ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)', 'AED (د.إ)'];

  const handleSignOut = () => {
    setIsSignOutModalOpen(false);
    showToast('Signed out successfully. Guest session active.', 'info');
    navigateTo('home');
  };

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
            <button
              onClick={() => navigateTo('profile')}
              className="hover:text-blue-600 cursor-pointer"
            >
              My Account
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">Settings</span>
          </nav>

          {/* Title */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Account Settings & Preferences
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Customize language, currency, push notifications, and security
            </p>
          </div>

          {/* Desktop 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Account & Security */}
            <div className="lg:col-span-6 space-y-6">
              {/* Account Settings */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                <h3 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Account & Addresses</span>
                </h3>

                <div className="space-y-1">
                  <button
                    onClick={() => navigateTo('profile')}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        Edit Profile Details
                      </h4>
                      <p className="text-xs text-slate-500">
                        Update full name, phone number, and email address
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>

                  <button
                    onClick={() => showToast('Address manager: 2 addresses saved (Primary: Bengaluru)', 'info')}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        Saved Delivery Addresses
                      </h4>
                      <p className="text-xs text-slate-500">
                        Manage home and workplace delivery destinations
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>

                  <button
                    onClick={() => showToast('Payment methods: UPI ID linked & 1 Saved Card', 'info')}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        Saved Payment Methods
                      </h4>
                      <p className="text-xs text-slate-500">
                        Manage cards, UPI VPA handles, and auto-refund bank account
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Security & Privacy */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                <h3 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Security & Authentication</span>
                </h3>

                <div className="space-y-1">
                  <button
                    onClick={() => showToast('Password reset link sent to your verified email', 'success')}
                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        Change Password
                      </h4>
                      <p className="text-xs text-slate-500">
                        Last updated 45 days ago
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>

                  <div className="p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-xs text-slate-500">
                        SMS & OTP verification for high-value orders
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Preferences & Policies */}
            <div className="lg:col-span-6 space-y-6">
              {/* App Preferences */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                <h3 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <span>App Preferences</span>
                </h3>

                <div className="space-y-3">
                  {/* Push Notifications Toggle */}
                  <div className="flex items-center justify-between p-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        Order & Offer Notifications
                      </h4>
                      <p className="text-xs text-slate-500">
                        Get instant alerts when your saree is out for delivery
                      </p>
                    </div>
                    <button
                      onClick={toggleNotificationsEnabled}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        notificationsEnabled ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center justify-between p-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        Regional Language
                      </h4>
                      <p className="text-xs text-slate-500">
                        Currently: <strong className="text-blue-700">{language}</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => setIsLangModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  {/* Currency Selector */}
                  <div className="flex items-center justify-between p-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        Display Currency
                      </h4>
                      <p className="text-xs text-slate-500">
                        Currently: <strong className="text-blue-700">{currency}</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCurrencyModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Sign Out Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                <button
                  onClick={() => setIsSignOutModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}

      {/* Language Modal */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-3 shadow-xl">
            <h3 className="font-serif text-base font-bold text-slate-900">
              Select Language
            </h3>
            <div className="space-y-1">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLanguage(l);
                    setIsLangModalOpen(false);
                    showToast(`Language set to ${l}`, 'success');
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    language === l ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{l}</span>
                  {language === l && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsLangModalOpen(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Currency Modal */}
      {isCurrencyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-3 shadow-xl">
            <h3 className="font-serif text-base font-bold text-slate-900">
              Select Currency
            </h3>
            <div className="space-y-1">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCurrency(c);
                    setIsCurrencyModalOpen(false);
                    showToast(`Currency set to ${c}`, 'success');
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    currency === c ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{c}</span>
                  {currency === c && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsCurrencyModalOpen(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Sign Out?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to sign out of your account? Your cart and wishlist will remain saved.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsSignOutModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 rounded-xl text-xs font-bold text-white cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
