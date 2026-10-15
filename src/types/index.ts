export type ScreenType =
  | 'home'
  | 'categories'
  | 'collection'
  | 'product-detail'
  | 'cart'
  | 'wishlist'
  | 'orders'
  | 'order-detail'
  | 'track-order'
  | 'notifications'
  | 'profile'
  | 'search'
  | 'about'
  | 'contact'
  | 'settings'
  | 'checkout'
  | 'auth'
  | 'admin';

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  inStock: boolean;
  colors: {
    name: string;
    hex: string;
    code: string;
  }[];
  selectedColor?: string;
  sizes: string[];
  selectedSize?: string;
  image: string;
  galleryImages: string[];
  fabric: string;
  description: string;
  highlights: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';
  items: OrderItem[];
  totalAmount: number;
  shippingCharge: number;
  discount: number;
  deliveryDate?: string;
  trackingSteps: {
    title: string;
    subtitle: string;
    date?: string;
    completed: boolean;
    current?: boolean;
  }[];
  deliveryAddress: {
    name: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
}

export interface NotificationItem {
  id: string;
  type: 'order' | 'offer' | 'account' | 'update';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  iconType: 'box' | 'truck' | 'percent' | 'heart' | 'star' | 'gift' | 'shield' | 'cake';
  linkScreen?: ScreenType;
}

export interface UserAddress {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  street: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  membershipTier: 'Silver Member' | 'Gold Member' | 'Platinum Member';
  avatarUrl: string;
  ordersCount: number;
  wishlistCount: number;
  addressesCount: number;
  rewardsPoints: number;
}
