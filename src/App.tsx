/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

import { HomeScreen } from './screens/HomeScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { CartScreen } from './screens/CartScreen';
import { WishlistScreen } from './screens/WishlistScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SearchScreen } from './screens/SearchScreen';
import { CollectionScreen } from './screens/CollectionScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ContactScreen } from './screens/ContactScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AuthScreen } from './screens/AuthScreen';
import { AdminScreen } from './screens/AdminScreen';

import { BottomNav } from './components/common/BottomNav';
import MobileBottomNav  from './components/common/MobileBottomNav';
import { SideMenuDrawer } from './components/modals/SideMenuDrawer';
import { Toast } from './components/common/Toast';

const MainAppContent: React.FC = () => {
  const {
    currentScreen,
    darkMode,
    navigateTo,
    cartItems,
    wishlist,
  } = useApp();

  // Screen map
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;

      case 'categories':
        return <CategoriesScreen />;

      case 'cart':
        return <CartScreen />;

      case 'wishlist':
        return <WishlistScreen />;

      case 'orders':
        return <OrdersScreen />;

      case 'notifications':
        return <NotificationsScreen />;

      case 'product-detail':
        return <ProductDetailScreen />;

      case 'profile':
        return <ProfileScreen />;

      case 'search':
        return <SearchScreen />;

      case 'collection':
        return <CollectionScreen />;

      case 'about':
        return <AboutScreen />;

      case 'contact':
        return <ContactScreen />;

      case 'settings':
        return <SettingsScreen />;

      case 'auth':
        return <AuthScreen />;

      case 'admin':
        return <AdminScreen />;

      default:
        return <HomeScreen />;
    }
  };

  const showNavigation = ![
    'product-detail',
    'auth',
    'admin',
  ].includes(currentScreen);

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode
          ? 'bg-slate-950 text-slate-100'
          : 'bg-slate-100 text-slate-900'
      }`}
    >
      <main className="w-full min-h-screen">
        <div className="w-full min-h-screen bg-white">
          <div className="w-full relative">
            {renderScreen()}

            {showNavigation && (
              <>
                {/* Mobile navigation: visible on mobile only */}
                <MobileBottomNav
                  currentScreen={currentScreen}
                  onNavigate={(screen) =>
                    navigateTo(screen as any)
                  }
                  cartCount={cartItems.length}
                  wishlistCount={wishlist.length}
                />

                {/* Existing navigation for desktop */}
                <div className="desktop-bottom-nav">
                  <BottomNav />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Global Modals & Drawers */}
      <SideMenuDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
