// import React, { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { Header } from '../components/common/Header';
// import { Footer } from '../components/common/Footer';
// import { ImageTag } from '../components/common/ImageTag';
// import { TrackOrderModal } from '../components/modals/TrackOrderModal';
// import {
//   SlidersHorizontal,
//   ChevronRight,
//   Truck,
//   CheckCircle2,
//   Clock,
//   XCircle,
//   Package,
//   Calendar,
//   RotateCcw,
// } from 'lucide-react';
// import { Order } from '../types';

// export const OrdersScreen: React.FC = () => {
//   const {
//     orders,
//     setSelectedOrderId,
//     setIsTrackOrderOpen,
//     navigateTo,
//   } = useApp();

//   const [activeTab, setActiveTab] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Returns'>('All');

//   const filteredOrders = orders.filter((order) => {
//     if (activeTab === 'All') return true;
//     if (activeTab === 'Processing') return order.status === 'Processing';
//     if (activeTab === 'Shipped') return order.status === 'Shipped';
//     if (activeTab === 'Delivered') return order.status === 'Delivered';
//     if (activeTab === 'Returns') return order.status === 'Returned' || order.status === 'Cancelled';
//     return true;
//   });

//   const getStatusBadge = (status: Order['status']) => {
//     switch (status) {
//       case 'Delivered':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
//             <span className="w-2 h-2 rounded-full bg-emerald-500" />
//             Delivered
//           </span>
//         );
//       case 'Shipped':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
//             <span className="w-2 h-2 rounded-full bg-blue-500" />
//             Shipped & Out for Delivery
//           </span>
//         );
//       case 'Processing':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
//             <span className="w-2 h-2 rounded-full bg-amber-500" />
//             Processing at Warehouse
//           </span>
//         );
//       case 'Cancelled':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
//             <span className="w-2 h-2 rounded-full bg-slate-400" />
//             Cancelled
//           </span>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleOpenTracking = (orderId: string) => {
//     setSelectedOrderId(orderId);
//     setIsTrackOrderOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
//       <div>
//         <Header />

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
//           {/* Breadcrumb Navigation */}
//           <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
//             <button
//               onClick={() => navigateTo('home')}
//               className="hover:text-blue-600 cursor-pointer"
//             >
//               Home
//             </button>
//             <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
//             <button
//               onClick={() => navigateTo('profile')}
//               className="hover:text-blue-600 cursor-pointer"
//             >
//               My Account
//             </button>
//             <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
//             <span className="text-slate-900 font-semibold">My Orders</span>
//           </nav>

//           {/* Heading & Filters */}
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div>
//               <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
//                 My Orders
//               </h1>
//               <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
//                 Track, manage and view status for all your purchases
//               </p>
//             </div>

//             <button
//               onClick={() => navigateTo('collection')}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
//             >
//               Continue Shopping
//             </button>
//           </div>

//           {/* Status Tabs with Counts */}
//           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
//             {[
//               { id: 'All', label: 'All Orders', count: orders.length },
//               { id: 'Processing', label: 'Processing', count: orders.filter((o) => o.status === 'Processing').length },
//               { id: 'Shipped', label: 'Shipped', count: orders.filter((o) => o.status === 'Shipped').length },
//               { id: 'Delivered', label: 'Delivered', count: orders.filter((o) => o.status === 'Delivered').length },
//               { id: 'Returns', label: 'Returns & Cancelled', count: orders.filter((o) => o.status === 'Returned' || o.status === 'Cancelled').length },
//             ].map((tab) => {
//               const active = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id as typeof activeTab)}
//                   className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
//                     active
//                       ? 'bg-blue-600 text-white shadow-xs font-bold'
//                       : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
//                   }`}
//                 >
//                   <span>{tab.label}</span>
//                   <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
//                     active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
//                   }`}>
//                     {tab.count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Orders List */}
//           <div className="space-y-4">
//             {filteredOrders.length === 0 ? (
//               <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-md mx-auto shadow-xs">
//                 <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                 <h3 className="text-base font-bold text-slate-900 font-serif">
//                   No orders found in this category
//                 </h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Try switching to another tab or browse our collections.
//                 </p>
//               </div>
//             ) : (
//               filteredOrders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow space-y-4"
//                 >
//                   {/* Top Bar: Order ID, Date, Status */}
//                   <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
//                     <div className="flex items-center gap-3">
//                       <span className="font-mono text-sm font-bold text-slate-900">
//                         {order.id}
//                       </span>
//                       <span className="text-xs text-slate-400">·</span>
//                       <div className="flex items-center gap-1.5 text-xs text-slate-500">
//                         <Calendar className="w-3.5 h-3.5 text-slate-400" />
//                         <span>{order.date}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       {getStatusBadge(order.status)}
//                     </div>
//                   </div>

//                   {/* Items list in order */}
//                   <div className="space-y-3">
//                     {order.items.map((it) => (
//                       <div
//                         key={it.id}
//                         className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
//                             <ImageTag
//                               // src={it.product.image}
//                               src = "https://images.pexels.com/photos/28943543/pexels-photo-28943543.jpeg"
//                               alt={it.product.name}
//                               fallbackText={it.product.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>

//                           <div>
//                             <h4 className="text-xs sm:text-sm font-bold text-slate-900">
//                               {it.product.name}
//                             </h4>
//                             <div className="text-xs text-slate-500 mt-0.5">
//                               <span>Colour: {it.selectedColor}</span>
//                               <span className="mx-1.5">·</span>
//                               <span>Size: {it.selectedSize}</span>
//                               <span className="mx-1.5">·</span>
//                               <span>Qty: {it.quantity}</span>
//                             </div>
//                             <span className="text-xs font-bold text-slate-900 mt-1 block">
//                               ₹{it.product.price.toLocaleString('en-IN')}
//                             </span>
//                           </div>
//                         </div>

//                         {/* Order actions */}
//                         <div className="flex items-center gap-2 self-end sm:self-center">
//                           <button
//                             onClick={() => handleOpenTracking(order.id)}
//                             className="px-3.5 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
//                           >
//                             <Truck className="w-3.5 h-3.5" />
//                             <span>Track Package</span>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Bottom Footer: Total, tracking status text */}
//                   <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
//                     <div className="text-slate-500">
//                       Payment via <strong className="text-slate-700">{order.paymentMethod}</strong> · Tracking ID:{' '}
//                       <span className="font-mono text-slate-700">{order.trackingNumber}</span>
//                     </div>

//                     <div className="flex items-baseline gap-2">
//                       <span className="text-slate-500">Order Total:</span>
//                       <span className="text-base font-extrabold text-slate-900 tabular-nums">
//                         ₹{order.totalAmount.toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* <Footer /> */}

//       {/* Tracking Modal */}
//       <TrackOrderModal />
//     </div>
//   );
// };



// import React, { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { Header } from '../components/common/Header';
// import { ImageTag } from '../components/common/ImageTag';
// import { TrackOrderModal } from '../components/modals/TrackOrderModal';
// import { ChevronRight, Truck, Package, Calendar, } from 'lucide-react';
// import { Order } from '../types';

// export const OrdersScreen: React.FC = () => {
//   const { orders, setSelectedOrderId, setIsTrackOrderOpen, navigateTo, } = useApp();
//   const [activeTab, setActiveTab] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Returns'>('All');

//   const filteredOrders = orders.filter((order) => {
//     if (activeTab === 'All') return true;
//     if (activeTab === 'Processing') return order.status === 'Processing';
//     if (activeTab === 'Shipped') return order.status === 'Shipped';
//     if (activeTab === 'Delivered') return order.status === 'Delivered';
//     if (activeTab === 'Returns') return order.status === 'Returned' || order.status === 'Cancelled';
//     return true;
//   });

//   const getStatusBadge = (status: Order['status']) => {
//     switch (status) {
//       case 'Delivered':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
//             <span className="w-2 h-2 rounded-full bg-emerald-500" />Delivered</span>
//         );
//       case 'Shipped':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
//             <span className="w-2 h-2 rounded-full bg-blue-500" />Shipped & Out for Delivery</span>
//         );
//       case 'Processing':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
//             <span className="w-2 h-2 rounded-full bg-amber-500" />Processing at Warehouse</span>
//         );
//       case 'Cancelled':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
//             <span className="w-2 h-2 rounded-full bg-slate-400" />Cancelled</span>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleOpenTracking = (orderId: string) => {
//     setSelectedOrderId(orderId);
//     setIsTrackOrderOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
//       <div>
//         <Header />

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
//           {/* Breadcrumb Navigation */}
//           <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
//             <button onClick={() => navigateTo('home')} className="hover:text-blue-600 cursor-pointer" >Home</button>
//             <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
//             <button onClick={() => navigateTo('profile')} className="hover:text-blue-600 cursor-pointer">My Account</button>
//             <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
//             <span className="text-slate-900 font-semibold">My Orders</span>
//           </nav>

//           {/* Heading & Filters */}
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div>
//               <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">My Orders</h1>
//               <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Track, manage and view status for all your purchases</p>
//             </div>

//             <button onClick={() => navigateTo('collection')}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
//             >Continue Shopping</button>
//           </div>

//           {/* Status Tabs with Counts */}
//           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
//             {[
//               { id: 'All', label: 'All Orders', count: orders.length },
//               { id: 'Processing', label: 'Processing', count: orders.filter((o) => o.status === 'Processing').length },
//               { id: 'Shipped', label: 'Shipped', count: orders.filter((o) => o.status === 'Shipped').length },
//               { id: 'Delivered', label: 'Delivered', count: orders.filter((o) => o.status === 'Delivered').length },
//               { id: 'Returns', label: 'Returns & Cancelled', count: orders.filter((o) => o.status === 'Returned' || o.status === 'Cancelled').length },
//             ].map((tab) => {
//               const active = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id as typeof activeTab)}
//                   className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
//                     active
//                       ? 'bg-blue-600 text-white shadow-xs font-bold'
//                       : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
//                   }`}
//                 >
//                   <span>{tab.label}</span>
//                   <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
//                     active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
//                   }`}>
//                     {tab.count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Orders List */}
//           <div className="space-y-4">
//             {filteredOrders.length === 0 ? (
//               <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-md mx-auto shadow-xs">
//                 <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                 <h3 className="text-base font-bold text-slate-900 font-serif">
//                   No orders found in this category
//                 </h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Try switching to another tab or browse our collections.
//                 </p>
//               </div>
//             ) : (
//               filteredOrders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow space-y-4"
//                 >
//                   {/* Top Bar: Order ID, Date, Status */}
//                   <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
//                     <div className="flex items-center gap-3">
//                       <span className="font-mono text-sm font-bold text-slate-900">
//                         {order.orderNumber || order.id}
//                       </span>
//                       <span className="text-xs text-slate-400">·</span>
//                       <div className="flex items-center gap-1.5 text-xs text-slate-500">
//                         <Calendar className="w-3.5 h-3.5 text-slate-400" />
//                         <span>{order.date}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       {getStatusBadge(order.status)}
//                     </div>
//                   </div>

//                   {/* Items list in order */}
//                   <div className="space-y-3">
//                     {order.items?.map((it, idx) => (
//                       <div
//                         key={it.productId || it.id || idx}
//                         className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
//                             <ImageTag 
//                               src={it.image || it.product?.image || "https://images.pexels.com/photos/28943543/pexels-photo-28943543.jpeg"}
//                               alt={it.name || it.product?.name || 'Product'}
//                               fallbackText={it.name || it.product?.name || 'Product'}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>

//                           <div>
//                             <h4 className="text-xs sm:text-sm font-bold text-slate-900">
//                               {it.name || it.product?.name || 'Handloom Product'}
//                             </h4>
//                             <div className="text-xs text-slate-500 mt-0.5">
//                               <span>Colour: {it.color || it.selectedColor || 'Standard'}</span>
//                               <span className="mx-1.5">·</span>
//                               <span>Size: {it.size || it.selectedSize || 'Free Size'}</span>
//                               <span className="mx-1.5">·</span>
//                               <span>Qty: {it.quantity || 1}</span>
//                             </div>
//                             <span className="text-xs font-bold text-slate-900 mt-1 block tabular-nums">
//                               ₹{(it.price ?? it.product?.price ?? 0).toLocaleString('en-IN')}
//                             </span>
//                           </div>
//                         </div>

//                         {/* Order actions */}
//                         <div className="flex items-center gap-2 self-end sm:self-center">
//                           <button
//                             onClick={() => handleOpenTracking(order.id)}
//                             className="px-3.5 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
//                           >
//                             <Truck className="w-3.5 h-3.5" />
//                             <span>Track Package</span>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Bottom Footer: Total, tracking status text */}
//                   <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
//                     <div className="text-slate-500">
//                       Payment via <strong className="text-slate-700">{order.paymentMethod || 'Online'}</strong> · Tracking ID:{' '}
//                       <span className="font-mono text-slate-700">{order.trackingNumber || 'SHR-TRK-9821'}</span>
//                     </div>

//                     <div className="flex items-baseline gap-2">
//                       <span className="text-slate-500">Order Total:</span>
//                       <span className="text-base font-extrabold text-slate-900 tabular-nums">
//                         ₹{(order.totalAmount ?? 0).toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Tracking Modal */}
//       <TrackOrderModal />
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { ImageTag } from '../components/common/ImageTag';
import { TrackOrderModal } from '../components/modals/TrackOrderModal';
import { ChevronRight, Truck, Package, Calendar } from 'lucide-react';
import { Order } from '../types';

export const OrdersScreen: React.FC = () => {
  const { orders, setSelectedOrderId, setIsTrackOrderOpen, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Returns'>('All');

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Processing') return order.status === 'Processing';
    if (activeTab === 'Shipped') return order.status === 'Shipped';
    if (activeTab === 'Delivered') return order.status === 'Delivered';
    if (activeTab === 'Returns') return order.status === 'Returned' || order.status === 'Cancelled';
    return true;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500" />Shipped & Out for Delivery
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500" />Processing at Warehouse
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-slate-400" />Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const handleOpenTracking = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsTrackOrderOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Header />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 pb-24">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <button onClick={() => navigateTo('home')} className="hover:text-blue-600 cursor-pointer">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button onClick={() => navigateTo('profile')} className="hover:text-blue-600 cursor-pointer">My Account</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">My Orders</span>
          </nav>

          {/* Heading & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">My Orders</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Track, manage and view status for all your purchases</p>
            </div>

            <button onClick={() => navigateTo('collection')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >Continue Shopping</button>
          </div>

          {/* Status Tabs with Counts */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'All', label: 'All Orders', count: orders.length },
              { id: 'Processing', label: 'Processing', count: orders.filter((o) => o.status === 'Processing').length },
              { id: 'Shipped', label: 'Shipped', count: orders.filter((o) => o.status === 'Shipped').length },
              { id: 'Delivered', label: 'Delivered', count: orders.filter((o) => o.status === 'Delivered').length },
              { id: 'Returns', label: 'Returns & Cancelled', count: orders.filter((o) => o.status === 'Returned' || o.status === 'Cancelled').length },
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

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-md mx-auto shadow-xs">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  No orders found in this category
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try switching to another tab or browse our collections.
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow space-y-4"
                >
                  {/* Top Bar: Order ID, Date, Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-slate-900">
                        {order.orderNumber || order.id}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{order.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Items list in order */}
                  <div className="space-y-3">
                    {order.items?.map((it, idx) => (
                      <div
                        key={it.productId || it.id || idx}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                            <ImageTag 
                              src={it.image || it.product?.image || "https://images.pexels.com/photos/28943543/pexels-photo-28943543.jpeg"}
                              alt={it.name || it.product?.name || 'Product'}
                              fallbackText={it.name || it.product?.name || 'Product'}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                              {it.name || it.product?.name || 'Handloom Product'}
                            </h4>
                            <div className="text-xs text-slate-500 mt-0.5">
                              <span>Colour: {it.color || it.selectedColor || 'Standard'}</span>
                              <span className="mx-1.5">·</span>
                              <span>Size: {it.size || it.selectedSize || 'Free Size'}</span>
                              <span className="mx-1.5">·</span>
                              <span>Qty: {it.quantity || 1}</span>
                            </div>
                            <span className="text-xs font-bold text-slate-900 mt-1 block tabular-nums">
                              ₹{(it.price ?? it.product?.price ?? 0).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Order actions */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => handleOpenTracking(order.id)}
                            className="px-3.5 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Track Package</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Footer: Total, tracking status text */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-500">
                      Payment via <strong className="text-slate-700">{order.paymentMethod || 'Online'}</strong> · Tracking ID:{' '}
                      <span className="font-mono text-slate-700">{order.trackingNumber || 'SHR-TRK-9821'}</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-slate-500">Order Total:</span>
                      <span className="text-base font-extrabold text-slate-900 tabular-nums">
                        ₹{(order.totalAmount ?? 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Tracking Modal */}
      <TrackOrderModal />
    </div>
  );
};