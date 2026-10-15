import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { collection, doc, onSnapshot, query, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, adminEmails, firebaseConfigured } from '../firebase';
import { ScreenType, Product, CartItem, Order, NotificationItem, UserAddress, UserProfile, } from '../types';
import { INITIAL_ORDERS, INITIAL_NOTIFICATIONS, INITIAL_ADDRESSES, INITIAL_USER, RECENT_SEARCHES_DEFAULT, } from '../data/mockData';

interface AppContextType {
  authUser: User | null;
  authReady: boolean;
  isAdmin: boolean;
  signOutUser: () => Promise<void>;
  currentScreen: ScreenType;
  screenHistory: ScreenType[];
  navigateTo: (screen: ScreenType, params?: { productId?: string; orderId?: string; category?: string; fabric?: string }) => void;
  goBack: () => void;
  
  // Selected entities
  selectedProductId: string;
  selectedOrderId: string;
  selectedCategory: string;
  selectedFabric: string;
  setSelectedProductId: (id: string) => void;
  setSelectedOrderId: (id: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedFabric: (fabric: string) => void;

  // Products
  products: Product[];
  getProductById: (id: string) => Product | undefined;

  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, color?: string, size?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  couponDiscount: number;
  shippingCharge: number;
  freeShippingGap: number;
  cartTotal: number;
  totalSavings: number;
  appliedCoupon: { code: string; discountPercent: number; discountAmount: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  clearWishlist: () => void;

  // Orders
  orders: Order[];
  getOrderById: (id: string) => Order | undefined;
  placeOrder: (paymentMethod: string, address: UserAddress) => Order;
  cancelOrder: (orderId: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Profile & Addresses
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addresses: UserAddress[];
  addAddress: (addr: Omit<UserAddress, 'id'>) => void;
  setDefaultAddress: (id: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Modals & Drawers
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isTrackOrderOpen: boolean;
  setIsTrackOrderOpen: (open: boolean) => void;
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;

  // Preferences
  darkMode: boolean;
  toggleDarkMode: () => void;
  notificationsEnabled: boolean;
  toggleNotificationsEnabled: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;

  // Feedback Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(!firebaseConfigured);
  const isAdmin = Boolean(authUser?.email && adminEmails.includes(authUser.email.toLowerCase()));
  const [cartCloudReady, setCartCloudReady] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['home']);

  const [selectedProductId, setSelectedProductId] = useState<string>('prod-1');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ord-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Sarees');
  const [selectedFabric, setSelectedFabric] = useState<string>('Soft Silk');

  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);
  const [addresses, setAddresses] = useState<UserAddress[]>(INITIAL_ADDRESSES);

  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    discountAmount: number;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('saree');
  const [recentSearches, setRecentSearches] = useState<string[]>(RECENT_SEARCHES_DEFAULT);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('English');
  const [currency, setCurrency] = useState<string>('INR (₹)');

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (user) => { 
      setAuthUser(user); 
      setAuthReady(true); 
      setCartCloudReady(false); 
    });
  }, []);
  
  useEffect(() => {
    if (!db) {
      setProducts([]);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        const liveProducts: Product[] = snapshot.docs.map((d) => {
          const raw = d.data() as Partial<Product>;

          return {
            id: d.id,
            name: raw.name ?? 'Untitled Product',
            category: raw.category ?? '',
            subCategory: raw.subCategory ?? '',
            price: raw.price ?? 0,
            originalPrice: raw.originalPrice ?? raw.price ?? 0,
            discountPercentage: raw.discountPercentage ?? 0,
            rating: raw.rating ?? 0,
            reviewCount: raw.reviewCount ?? 0,
            isNew: raw.isNew ?? false,
            inStock: raw.inStock ?? true,
            colors: raw.colors ?? [],
            selectedColor: raw.selectedColor ?? raw.colors?.[0]?.name ?? '',
            sizes: raw.sizes ?? ['Free Size'],
            selectedSize: raw.selectedSize ?? 'Free Size',
            image: raw.image ?? '',
            galleryImages: raw.galleryImages ?? (raw.image ? [raw.image] : []),
            fabric: raw.fabric ?? '',
            description: raw.description ?? '',
            highlights: raw.highlights ?? [],
          };
        });

        setProducts(liveProducts);
      },
      (error) => {
        console.error('Firestore products listener:', error);
      }
    );

    return unsubscribe;
  }, []);

  // Sync user profile data, cart items, and wishlist from Firestore on login or page refresh
  useEffect(() => {
    if (!db || !authUser) { 
      setCartCloudReady(false); 
      return; 
    }
    const userRef = doc(db, 'users', authUser.uid);
    return onSnapshot(userRef, (snapshot) => {
      const data = snapshot.data();
      setCartItems(data?.cartItems && Array.isArray(data.cartItems) ? data.cartItems as CartItem[] : []);
      if (data?.wishlistIds && Array.isArray(data.wishlistIds)) {
        setWishlist(products.filter((p) => (data.wishlistIds as string[]).includes(p.id)));
      } else {
        setWishlist([]);
      }
      setUserProfile((prev) => ({ 
        ...prev, 
        name: data?.name || authUser.displayName || prev.name, 
        email: authUser.email || prev.email 
      }));
      setCartCloudReady(true);
    }, (error) => { 
      console.error('User data listener:', error); 
      setCartCloudReady(true); 
    });
  }, [authUser?.uid, products]);

  // Debounced cloud sync to automatically store cart and wishlist changes to Firestore
  useEffect(() => {
    if (!db || !authUser || !cartCloudReady) return;
    const userRef = doc(db, 'users', authUser.uid);
    const handler = setTimeout(() => {
      void setDoc(userRef, { 
        name: authUser.displayName || userProfile.name || 'User',
        email: authUser.email,
        cartItems, 
        wishlistIds: wishlist.map((p) => p.id), 
        updatedAt: serverTimestamp() 
      }, { merge: true })
        .catch((error) => console.error('Could not save user cart/wishlist:', error));
    }, 1000);

    return () => clearTimeout(handler);
  }, [authUser?.uid, cartCloudReady, cartItems, wishlist, authUser?.displayName, userProfile.name, authUser?.email]);

  useEffect(() => {
    if (!authUser?.uid) return;
    const q = query(collection(db, 'users', authUser.uid, 'orders'));
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const fetchedOrders = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as Order[];
        setOrders(fetchedOrders);
      }, 
      (error) => {
        console.error('Orders listener error:', error);
      }
    );

    return () => unsubscribe();
  }, [authUser?.uid]);
  const signOutUser = async () => { 
    if (auth) await signOut(auth); 
    setCartCloudReady(false); 
    setCartItems([]);    // Clears local cart items on sign out
    setWishlist([]);     // Clears local wishlist items on sign out
    setAppliedCoupon(null); // Clears any applied discount coupons
    navigateTo('home');  // Redirects user to home page upon logout
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const navigateTo = (
    screen: ScreenType,
    params?: { productId?: string; orderId?: string; category?: string; fabric?: string }
  ) => {
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.orderId) setSelectedOrderId(params.orderId);
    if (params?.category) setSelectedCategory(params.category);
    if (params?.fabric) setSelectedFabric(params.fabric);

    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    setIsSideMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProductById = (id: string) => products.find((p) => p.id === id);
  const getOrderById = (id: string) => orders.find((o) => o.id === id);

  const addToCart = (product: Product, color?: string, size?: string, quantity: number = 1) => {
    const chosenColor = color || product.selectedColor || product.colors[0]?.name || 'Standard';
    const chosenSize = size || product.selectedSize || product.sizes[0] || 'Free Size';

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === product.id &&
          item.selectedColor === chosenColor &&
          item.selectedSize === chosenSize
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          productId: product.id,
          product,
          quantity,
          selectedColor: chosenColor,
          selectedSize: chosenSize,
        },
      ];
    });

    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Added to Wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.some((p) => p.id === productId);

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared', 'info');
  };

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartOriginalTotal = cartItems.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const baseDiscount = cartOriginalTotal - cartSubtotal;

  const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const cartDiscount = baseDiscount + couponDiscount;

  const freeShippingThreshold = 999;
  const freeShippingGap = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingCharge = cartItems.length === 0 ? 0 : cartSubtotal >= freeShippingThreshold ? 0 : 99;

  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + shippingCharge);
  const totalSavings = cartDiscount;

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SHREERA10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedCoupon({ code: 'SHREERA10', discountPercent: 10, discountAmount: discount });
      showToast('Code SHREERA10 applied! 10% discount added.', 'success');
      return true;
    } else if (clean === 'SAVE5') {
      const discount = Math.round(cartSubtotal * 0.05);
      setAppliedCoupon({ code: 'SAVE5', discountPercent: 5, discountAmount: discount });
      showToast('Code SAVE5 applied! 5% discount added.', 'success');
      return true;
    } else {
      showToast('Invalid coupon code. Try SHREERA10 or SAVE5', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const placeOrder = (paymentMethod: string, address: UserAddress): Order => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `SHR${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Processing',
      totalAmount: cartTotal,
      shippingCharge,
      discount: cartDiscount,
      paymentMethod,
      items: cartItems.map((c) => ({
        productId: c.productId,
        name: c.product.name,
        price: c.product.price,
        quantity: c.quantity,
        color: c.selectedColor,
        image: c.product.image,
      })),
      deliveryAddress: {
        name: address.name,
        phone: address.phone,
        addressLine: address.street + ', ' + address.locality,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },
      trackingSteps: [
        { title: 'Order Placed', subtitle: 'Order received and confirmed', date: 'Just now', completed: true, current: true },
        { title: 'Quality Check & Packing', subtitle: 'Checking handloom weaves', completed: false },
        { title: 'Shipped', subtitle: 'Handover to courier partner', completed: false },
        { title: 'Delivered', subtitle: 'Delivery to your door', completed: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    if (db && authUser) { 
      void addDoc(collection(db, 'users', authUser.uid, 'orders'), { ...newOrder, createdAt: serverTimestamp() }).catch((error) => { 
        console.error('Order save failed:', error); 
        showToast('Order could not be saved to Firebase. Please contact support.', 'error'); 
      }); 
    }
    clearCart();
    setUserProfile((prev) => ({ ...prev, ordersCount: prev.ordersCount + 1 }));
    setSelectedOrderId(newOrder.id);
    showToast('Order placed successfully!', 'success');
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'Cancelled',
              deliveryDate: `Cancelled on ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
              trackingSteps: [
                ...ord.trackingSteps,
                { title: 'Order Cancelled', subtitle: 'Refund will be credited within 24 hours', completed: true, current: true },
              ],
            }
          : ord
      )
    );
    showToast('Order cancelled', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read', 'info');
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    showToast('Profile updated', 'success');
  };

  const addAddress = (addr: Omit<UserAddress, 'id'>) => {
    const newAddr: UserAddress = {
      ...addr,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [newAddr, ...prev]);
    setUserProfile((prev) => ({ ...prev, addressesCount: prev.addressesCount + 1 }));
    showToast('New address saved', 'success');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === id }))
    );
    showToast('Default address updated', 'info');
  };

  const addRecentSearch = (query: string) => {
    const clean = query.trim();
    if (!clean) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== clean.toLowerCase());
      return [clean, ...filtered].slice(0, 8);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    showToast('Recent searches cleared', 'info');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleNotificationsEnabled = () => {
    setNotificationsEnabled((prev) => !prev);
    showToast(
      !notificationsEnabled ? 'Notifications enabled' : 'Notifications muted',
      'info'
    );
  };

  useEffect(() => {
    setUserProfile((prev) => ({
      ...prev,
      wishlistCount: wishlist.length,
      ordersCount: orders.length,
    }));
  }, [wishlist.length, orders.length]);

  return (
    <AppContext.Provider
      value={{
        authUser, authReady, isAdmin, signOutUser,
        currentScreen,
        screenHistory,
        navigateTo,
        goBack,
        selectedProductId,
        selectedOrderId,
        selectedCategory,
        selectedFabric,
        setSelectedProductId,
        setSelectedOrderId,
        setSelectedCategory,
        setSelectedFabric,
        products,
        getProductById,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        couponDiscount,
        shippingCharge,
        freeShippingGap,
        cartTotal,
        totalSavings,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        clearWishlist,
        orders,
        getOrderById,
        placeOrder,
        cancelOrder,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,
        userProfile,
        updateUserProfile,
        addresses,
        addAddress,
        setDefaultAddress,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isSideMenuOpen,
        setIsSideMenuOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        darkMode,
        toggleDarkMode,
        notificationsEnabled,
        toggleNotificationsEnabled,
        language,
        setLanguage,
        currency,
        setCurrency,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};