// import React, { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { Header } from '../components/common/Header';
// // import { Footer } from '../components/common/Footer';
// import { ImageTag } from '../components/common/ImageTag';
// import { CheckoutModal } from '../components/modals/CheckoutModal';
// import { Trash2, Plus, Minus, Tag, ShieldCheck, CheckCircle, Truck,
//   ArrowRight, ShoppingBag, Sparkles, ChevronRight, RotateCcw, } from 'lucide-react';

// export const CartScreen: React.FC = () => {
//   const {
//     cartItems,
//     updateQuantity,
//     removeFromCart,
//     cartSubtotal: subtotal,
//     couponDiscount: discount,
//     shippingCharge: shippingFee,
//     cartTotal: total,
//     appliedCoupon,
//     applyCoupon,
//     removeCoupon,
//     showToast,
//     navigateTo,
//   } = useApp();

//   const [couponInput, setCouponInput] = useState('');
//   const [isPromoInputOpen, setIsPromoInputOpen] = useState(false);
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

//   const freeShippingThreshold = 999;
//   const freeShippingGap = Math.max(0, freeShippingThreshold - subtotal);
//   const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
//   const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   const handleApplyCoupon = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!couponInput.trim()) return;
//     const success = applyCoupon(couponInput.trim());
//     if (success) {
//       setCouponInput('');
//       setIsPromoInputOpen(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
//       <div>
//         <Header />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
//           {/* Breadcrumb Navigation */}
//           <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
//             <button
//               onClick={() => navigateTo('home')}
//               className="hover:text-blue-600 cursor-pointer"
//             >
//               Home
//             </button>
//             <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
//             <span className="text-slate-900 font-semibold">Shopping Cart</span>
//           </nav>

//           {/* Free Shipping Progress Strip */}
//           <div className="bg-blue-50/90 border border-blue-100 rounded-2xl p-4 shadow-xs">
//             <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
//               <div className="flex items-center gap-2 font-semibold text-blue-900">
//                 <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
//                 {freeShippingGap > 0 ? (
//                   <span>
//                     You are <strong className="text-blue-700">₹{freeShippingGap.toLocaleString('en-IN')}</strong> away from{' '}
//                     <strong className="uppercase">Free Shipping!</strong>
//                   </span>
//                 ) : (
//                   <span className="text-emerald-700 font-bold flex items-center gap-1">
//                     <CheckCircle className="w-4 h-4" />
//                     Congratulations! You unlocked FREE SHIPPING!
//                   </span>
//                 )}
//               </div>
//               <div className="hidden sm:flex items-center gap-1 text-xs text-blue-700 font-medium">
//                 <Truck className="w-4 h-4" />
//                 <span>Free on orders above ₹999</span>
//               </div>
//             </div>

//             {/* Progress bar track */}
//             <div className="w-full bg-blue-200/60 rounded-full h-2 overflow-hidden">
//               <div
//                 className="bg-blue-600 h-full rounded-full transition-all duration-500"
//                 style={{ width: `${progressPercent}%` }}
//               />
//             </div>
//           </div>

//           {/* Heading */}
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
//                 My Shopping Cart ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
//               </h1>
//               <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
//                 Review items, apply festive discounts, and checkout securely
//               </p>
//             </div>

//             <button
//               onClick={() => navigateTo('collection')}
//               className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
//             >
//               <span>Continue Shopping</span>
//               <ArrowRight className="w-3.5 h-3.5" />
//             </button>
//           </div>

//           {/* Cart Content or Empty State */}
//           {cartItems.length === 0 ? (
//             <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-xl mx-auto shadow-xs my-8">
//               <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
//                 <ShoppingBag className="w-10 h-10" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-900 font-serif">
//                 Your Shopping Cart is Empty
//               </h3>
//               <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
//                 Explore our handcrafted silks, Banarasi weaves, and exclusive festive designs to fill your bag.
//               </p>
//               <button
//                 onClick={() => navigateTo('collection')}
//                 className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
//               >
//                 Explore Collections
//               </button>
//             </div>
//           ) : (
//             /* Responsive 2-Column Desktop Grid */
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//               {/* Left Column: Items List & Coupon Box */}
//               <div className="lg:col-span-8 space-y-4">
//                 {/* Cart Items List */}
//                 <div className="space-y-3">
//                   {cartItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row gap-4 relative group"
//                     >
//                       {/* Product Image */}
//                       <div
//                         className="w-24 h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer self-start"
//                         onClick={() =>
//                           navigateTo('product-detail', { productId: item.productId })
//                         }
//                       >
//                         <ImageTag
//                           src={item.product.image}
//                           alt={item.product.name}
//                           fallbackText={item.product.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       </div>

//                       {/* Details */}
//                       <div className="flex-1 flex flex-col justify-between min-w-0 pr-8">
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
//                               {item.product.fabric}
//                             </span>
//                             <span className="text-xs text-slate-400">·</span>
//                             <span className="text-xs text-emerald-600 font-medium">In Stock</span>
//                           </div>

//                           <h3
//                             onClick={() =>
//                               navigateTo('product-detail', { productId: item.productId })
//                             }
//                             className="text-sm sm:text-base font-bold text-slate-900 mt-1 cursor-pointer hover:text-blue-600 transition-colors"
//                           >
//                             {item.product.name}
//                           </h3>

//                           <div className="flex items-baseline gap-2 mt-1">
//                             <span className="text-sm sm:text-base font-bold text-slate-900 tabular-nums">
//                               ₹{item.product.price.toLocaleString('en-IN')}
//                             </span>
//                             <span className="text-xs text-slate-400 line-through tabular-nums">
//                               ₹{item.product.originalPrice.toLocaleString('en-IN')}
//                             </span>
//                             <span className="text-xs font-bold text-rose-600">
//                               {item.product.discountPercentage}% OFF
//                             </span>
//                           </div>

//                           <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
//                             <span>
//                               Colour: <strong className="text-slate-800">{item.selectedColor}</strong>
//                             </span>
//                             <span>·</span>
//                             <span>
//                               Size: <strong className="text-slate-800">{item.selectedSize}</strong>
//                             </span>
//                           </div>
//                         </div>

//                         {/* Quantity Stepper & Subtotal */}
//                         <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
//                           <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
//                               aria-label="Decrease quantity"
//                             >
//                               <Minus className="w-3.5 h-3.5" />
//                             </button>
//                             <span className="px-3 py-1 text-xs font-bold text-slate-900 tabular-nums">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
//                               aria-label="Increase quantity"
//                             >
//                               <Plus className="w-3.5 h-3.5" />
//                             </button>
//                           </div>

//                           <div className="text-right">
//                             <span className="text-xs text-slate-400 block">Subtotal</span>
//                             <span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
//                               ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Delete button top right */}
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
//                         aria-label="Remove item"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Promo Code Box */}
//                 <div className="bg-white rounded-2xl border border-dashed border-blue-300 p-4 shadow-xs">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
//                         <Tag className="w-4 h-4" />
//                       </div>
//                       <div>
//                         <h4 className="text-xs sm:text-sm font-bold text-slate-900">
//                           Have a Promo Code?
//                         </h4>
//                         <p className="text-xs text-slate-500">
//                           Apply coupon <span className="font-mono font-bold text-blue-600">SHREERA10</span> for extra 10% discount
//                         </p>
//                       </div>
//                     </div>

//                     {!appliedCoupon ? (
//                       <button
//                         onClick={() => setIsPromoInputOpen(!isPromoInputOpen)}
//                         className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
//                       >
//                         {isPromoInputOpen ? 'Cancel' : 'Enter Code'}
//                       </button>
//                     ) : (
//                       <button
//                         onClick={removeCoupon}
//                         className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>

//                   {/* Promo Input Dropdown */}
//                   {isPromoInputOpen && !appliedCoupon && (
//                     <form onSubmit={handleApplyCoupon} className="mt-3 flex gap-2 pt-2 border-t border-slate-100">
//                       <input
//                         type="text"
//                         value={couponInput}
//                         onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
//                         placeholder="e.g. SHREERA10, FESTIVE20"
//                         className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-mono font-bold focus:outline-hidden focus:border-blue-600 focus:bg-white"
//                       />
//                       <button
//                         type="submit"
//                         className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
//                       >
//                         Apply
//                       </button>
//                     </form>
//                   )}

//                   {/* Applied Coupon Pill */}
//                   {appliedCoupon && (
//                     <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
//                       <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
//                         <CheckCircle className="w-4 h-4 text-emerald-600" />
//                         <span>Code {appliedCoupon.code} Applied ({appliedCoupon.discountPercent}% OFF)</span>
//                       </div>
//                       <span className="font-bold text-emerald-700 tabular-nums">
//                         -₹{(discount ?? 0).toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Right Column: Sticky Order Summary on Desktop */}
//               <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
//                 <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
//                   <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
//                     Order Summary
//                   </h3>

//                   <div className="space-y-2.5 text-xs sm:text-sm">
//                     <div className="flex items-center justify-between text-slate-600">
//                       <span>Subtotal ({totalItemsCount} items)</span>
//                       <span className="font-bold text-slate-900 tabular-nums">
//                         ₹{(subtotal ?? 0).toLocaleString('en-IN')}
//                       </span>
//                     </div>

//                     {discount > 0 && (
//                       <div className="flex items-center justify-between text-emerald-600 font-semibold">
//                         <span>Coupon Savings</span>
//                         <span className="tabular-nums">-₹{(discount ?? 0).toLocaleString('en-IN')}</span>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between text-slate-600">
//                       <span>Estimated Shipping</span>
//                       <span className="font-bold text-slate-900 tabular-nums">
//                         {(shippingFee ?? 0) === 0 ? (
//                           <span className="text-emerald-600 uppercase font-bold">FREE</span>
//                         ) : (
//                           `₹${shippingFee ?? 0}`
//                         )}
//                       </span>
//                     </div>

//                     <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
//                       <div>
//                         <span className="text-sm font-bold text-slate-900 block">Total Amount</span>
//                         <span className="text-[11px] text-slate-400">Inclusive of all taxes</span>
//                       </div>
//                       <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
//                         ₹{(total ?? 0).toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Proceed to Checkout CTA Button */}
//                   <button
//                     onClick={() => setIsCheckoutOpen(true)}
//                     className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
//                   >
//                     <span>Proceed to Checkout</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </button>

//                   {/* Trust Highlights */}
//                   <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
//                     <div className="flex items-center gap-2">
//                       <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
//                       <span>256-bit SSL Bank-Grade Secure Checkout</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
//                       <span>7-Day Return & Replacement Guarantee</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Truck className="w-4 h-4 text-blue-600 shrink-0" />
//                       <span>Free Express Delivery across India</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Sticky Bottom Checkout Bar (Mobile Only) */}
//       {cartItems.length > 0 && (
//         <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg flex items-center justify-between gap-4">
//           <div>
//             <span className="text-[10px] text-slate-400 block uppercase">Total Amount</span>
//             <span className="text-base font-extrabold text-slate-900 tabular-nums">
//               ₹{(total ?? 0).toLocaleString('en-IN')}
//             </span>
//           </div>

//           <button
//             onClick={() => setIsCheckoutOpen(true)}
//             className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
//           >
//             <span>Proceed to Checkout</span>
//             <ArrowRight className="w-3.5 h-3.5" />
//           </button>
//         </div>
//       )}

//       {/* <Footer /> */}

//       {/* Checkout Modal */}
//       {/* Checkout Modal */}
//       <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
//       {/* {isCheckoutOpen && <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />} */}
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
// import { Footer } from '../components/common/Footer';
import { ImageTag } from '../components/common/ImageTag';
import { CheckoutModal } from '../components/modals/CheckoutModal';
import { Trash2, Plus, Minus, Tag, ShieldCheck, CheckCircle, Truck,
  ArrowRight, ShoppingBag, Sparkles, ChevronRight, RotateCcw, } from 'lucide-react';

export const CartScreen: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartSubtotal: subtotal,
    couponDiscount: discount,
    shippingCharge: shippingFee,
    cartTotal: total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    showToast,
    navigateTo,
    user, // Added user from AppContext to check authentication status
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [isPromoInputOpen, setIsPromoInputOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const freeShippingThreshold = 999;
  const freeShippingGap = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput.trim());
    if (success) {
      setCouponInput('');
      setIsPromoInputOpen(false);
    }
  };

  // Handler to check auth before opening checkout
  const handleProceedToCheckout = () => {
    if (!user) {
      showToast?.('Please log in to proceed to checkout', 'info');
      navigateTo('login'); // Adjust route name ('login' / 'auth') based on your router config
      return;
    }
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">Shopping Cart</span>
          </nav>

          {/* Free Shipping Progress Strip */}
          <div className="bg-blue-50/90 border border-blue-100 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
              <div className="flex items-center gap-2 font-semibold text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                {freeShippingGap > 0 ? (
                  <span>
                    You are <strong className="text-blue-700">₹{freeShippingGap.toLocaleString('en-IN')}</strong> away from{' '}
                    <strong className="uppercase">Free Shipping!</strong>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Congratulations! You unlocked FREE SHIPPING!
                  </span>
                )}
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-blue-700 font-medium">
                <Truck className="w-4 h-4" />
                <span>Free on orders above ₹999</span>
            </div>
          </div>

          <div className="w-full bg-blue-200/60 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              My Shopping Cart ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review items, apply festive discounts, and checkout securely
            </p>
          </div>

          <button
            onClick={() => navigateTo('collection')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-xl mx-auto shadow-xs my-8">
            <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">
              Your Shopping Cart is Empty
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Explore our handcrafted silks, Banarasi weaves, and exclusive festive designs to fill your bag.
            </p>
            <button
              onClick={() => navigateTo('collection')}
              className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
            >
              Explore Collections
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row gap-4 relative group"
                  >
                    <div
                      className="w-24 h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer self-start"
                      onClick={() =>
                        navigateTo('product-detail', { productId: item.productId })
                      }
                    >
                      <ImageTag
                        src={item.product.image}
                        alt={item.product.name}
                        fallbackText={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0 pr-8">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {item.product.fabric}
                          </span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs text-emerald-600 font-medium">In Stock</span>
                        </div>

                        <h3
                          onClick={() =>
                            navigateTo('product-detail', { productId: item.productId })
                        }
                        className="text-sm sm:text-base font-bold text-slate-900 mt-1 cursor-pointer hover:text-blue-600 transition-colors"
                        >
                          {item.product.name}
                        </h3>

                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm sm:text-base font-bold text-slate-900 tabular-nums">
                            ₹{item.product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-slate-400 line-through tabular-nums">
                            ₹{item.product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs font-bold text-rose-600">
                            {item.product.discountPercentage}% OFF
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                          <span>
                            Colour: <strong className="text-slate-800">{item.selectedColor}</strong>
                          </span>
                          <span>·</span>
                          <span>
                            Size: <strong className="text-slate-800">{item.selectedSize}</strong>
                          </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-slate-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Subtotal</span>
                        <span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
            </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-dashed border-blue-300 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Have a Promo Code?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Apply coupon <span className="font-mono font-bold text-blue-600">SHREERA10</span> for extra 10% discount
                  </p>
                </div>
              </div>

              {!appliedCoupon ? (
                <button
                  onClick={() => setIsPromoInputOpen(!isPromoInputOpen)}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  {isPromoInputOpen ? 'Cancel' : 'Enter Code'}
                </button>
              ) : (
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            {isPromoInputOpen && !appliedCoupon && (
              <form onSubmit={handleApplyCoupon} className="mt-3 flex gap-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="e.g. SHREERA10, FESTIVE20"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-mono font-bold focus:outline-hidden focus:border-blue-600 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}

            {appliedCoupon && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Code {appliedCoupon.code} Applied ({appliedCoupon.discountPercent}% OFF)</span>
                </div>
                <span className="font-bold text-emerald-700 tabular-nums">
                  -₹{(discount ?? 0).toLocaleString('en-IN')}
                </span>
              </div>
            )}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h3>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal ({totalItemsCount} items)</span>
              <span className="font-bold text-slate-900 tabular-nums">
                ₹{(subtotal ?? 0).toLocaleString('en-IN')}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 font-semibold">
                <span>Coupon Savings</span>
                <span className="tabular-nums">-₹{(discount ?? 0).toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-slate-600">
              <span>Estimated Shipping</span>
              <span className="font-bold text-slate-900 tabular-nums">
                {(shippingFee ?? 0) === 0 ? (
                  <span className="text-emerald-600 uppercase font-bold">FREE</span>
                ) : (
                  `₹${shippingFee ?? 0}`
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="text-sm font-bold text-slate-900 block">Total Amount</span>
                <span className="text-[11px] text-slate-400">Inclusive of all taxes</span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                ₹{(total ?? 0).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Updated Desktop Proceed to Checkout CTA Button */}
          <button
            onClick={handleProceedToCheckout}
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>256-bit SSL Bank-Grade Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
              <span>7-Day Return & Replacement Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Free Express Delivery across India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  </div>
  </div>

  {/* Sticky Bottom Checkout Bar (Mobile Only) */}
  {cartItems.length > 0 && (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg flex items-center justify-between gap-4">
      <div>
        <span className="text-[10px] text-slate-400 block uppercase">Total Amount</span>
        <span className="text-base font-extrabold text-slate-900 tabular-nums">
          ₹{(total ?? 0).toLocaleString('en-IN')}
        </span>
      </div>

      {/* Updated Mobile Proceed to Checkout Button */}
      <button
        onClick={handleProceedToCheckout}
        className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
    )}

    <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
  </div>
);
};