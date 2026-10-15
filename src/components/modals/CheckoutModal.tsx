// import React, { useState } from 'react';
// import { useApp } from '../../context/AppContext';
// import {
//   X,
//   ShieldCheck,
//   CheckCircle,
//   MapPin,
//   CreditCard,
//   Banknote,
//   QrCode,
//   Truck,
//   PackageCheck,
//   ArrowRight,
//   Plus,
// } from 'lucide-react';
// import { Order } from '../../types';

// interface CheckoutModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
//   const {
//     cartItems,
//     cartTotal,
//     cartSubtotal,
//     cartDiscount,
//     shippingCharge,
//     appliedCoupon,
//     addresses,
//     placeOrder,
//     navigateTo,
//     setSelectedOrderId,
//     setIsTrackOrderOpen,
//   } = useApp();

//   const [selectedAddressId, setSelectedAddressId] = useState<string>(
//     addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ''
//   );
//   const [paymentMethod, setPaymentMethod] = useState<string>('Cash on Delivery (COD)');
//   const [isSuccess, setIsSuccess] = useState<boolean>(false);
//   const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

//   if (!isOpen) return null;

//   const currentAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

//   const handlePlaceOrder = () => {
//     if (!currentAddress) return;
//     const order = placeOrder(paymentMethod, currentAddress);
//     setCreatedOrder(order);
//     setIsSuccess(true);
//   };

//   const handleViewOrder = () => {
//     if (createdOrder) {
//       setSelectedOrderId(createdOrder.id);
//       onClose();
//       setIsSuccess(false);
//       navigateTo('orders');
//     }
//   };

//   const handleTrackLive = () => {
//     if (createdOrder) {
//       setSelectedOrderId(createdOrder.id);
//       onClose();
//       setIsSuccess(false);
//       setIsTrackOrderOpen(true);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
//         onClick={() => {
//           if (!isSuccess) onClose();
//         }}
//       />

//       {/* Modal Dialog */}
//       <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
//         {!isSuccess ? (
//           <>
//             {/* Header */}
//             <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
//               <div className="flex items-center gap-2">
//                 <ShieldCheck className="w-5 h-5 text-blue-600" />
//                 <h3 className="text-base font-bold text-slate-900">
//                   Secure Checkout
//                 </h3>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full transition-colors cursor-pointer"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Form & Overview */}
//             <div className="p-4 overflow-y-auto space-y-4 text-xs">
//               {/* Delivery Address */}
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
//                     <MapPin className="w-3.5 h-3.5 text-blue-600" /> Deliver to
//                   </span>
//                   <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
//                     {addresses.length} Saved
//                   </span>
//                 </div>

//                 <div className="space-y-2">
//                   {addresses.map((addr) => {
//                     const isSelected = addr.id === selectedAddressId;
//                     return (
//                       <div
//                         key={addr.id}
//                         onClick={() => setSelectedAddressId(addr.id)}
//                         className={`p-3 rounded-xl border transition-all cursor-pointer ${
//                           isSelected
//                             ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
//                             : 'border-slate-200 hover:border-slate-300 bg-white'
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span className="font-bold text-slate-900 flex items-center gap-1.5">
//                             {addr.name}
//                             <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
//                               {addr.type}
//                             </span>
//                           </span>
//                           <input
//                             type="radio"
//                             checked={isSelected}
//                             onChange={() => setSelectedAddressId(addr.id)}
//                             className="text-blue-600 focus:ring-blue-500"
//                           />
//                         </div>
//                         <p className="text-slate-600 mt-1 line-clamp-1">
//                           {addr.street}, {addr.locality}
//                         </p>
//                         <p className="text-slate-500 text-[11px]">
//                           {addr.city}, {addr.state} - {addr.pincode} · {addr.phone}
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Payment Method */}
//               <div>
//                 <span className="font-bold text-slate-800 uppercase tracking-wider block mb-2">
//                   Choose Payment Method
//                 </span>
//                 <div className="space-y-2">
//                   {[
//                     {
//                       id: 'Cash on Delivery (COD)',
//                       label: 'Cash on Delivery (COD)',
//                       desc: 'Pay in cash or UPI when order is delivered',
//                       icon: <Banknote className="w-4 h-4 text-emerald-600" />,
//                     },
//                     {
//                       id: 'UPI (Google Pay / PhonePe / Paytm)',
//                       label: 'UPI (GPay / PhonePe / Paytm)',
//                       desc: 'Instant and 100% secure UPI payment',
//                       icon: <QrCode className="w-4 h-4 text-blue-600" />,
//                     },
//                     {
//                       id: 'Credit / Debit Card',
//                       label: 'Credit / Debit Card',
//                       desc: 'Visa, Mastercard, RuPay cards accepted',
//                       icon: <CreditCard className="w-4 h-4 text-indigo-600" />,
//                     },
//                   ].map((method) => {
//                     const isSelected = paymentMethod === method.id;
//                     return (
//                       <div key={method.id} onClick={() => setPaymentMethod(method.id)}
//                         className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
//                           isSelected
//                             ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
//                             : 'border-slate-200 hover:border-slate-300'
//                         }`}
//                       >
//                         <div className="flex items-center gap-2.5">
//                           <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">{method.icon}</div>
//                           <div>
//                             <p className="font-bold text-slate-900">{method.label}</p>
//                             <p className="text-[10px] text-slate-500">{method.desc}</p>
//                           </div>
//                         </div>
//                         <input type="radio" checked={isSelected} onChange={() => setPaymentMethod(method.id)} className="text-blue-600" />
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Bill Details */}
//               <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5">
//                 <span className="font-bold text-slate-800 uppercase tracking-wider block text-[11px] mb-1">Payment Summary</span>
//                 <div className="flex justify-between text-slate-600">
//                   <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
//                   <span className="font-medium tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
//                 </div>
//                 {cartDiscount > 0 && (
//                   <div className="flex justify-between text-emerald-600 font-medium">
//                     <span>Discount {appliedCoupon ? `(${appliedCoupon.code})` : ''}</span>
//                     <span className="tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between text-slate-600">
//                   <span>Shipping Fee</span>
//                   <span className="font-medium tabular-nums">
//                     {shippingCharge === 0 ? <span className="text-emerald-600">FREE</span> : `₹${shippingCharge}`}
//                   </span>
//                 </div>
//                 <div className="border-t border-slate-200 pt-1.5 flex justify-between font-bold text-slate-900 text-sm">
//                   <span>Total Amount</span>
//                   <span className="text-blue-700 tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Footer Place Order Button */}
//             <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
//               <div className="flex-1">
//                 <span className="text-[10px] text-slate-500 block">Total to Pay</span>
//                 <span className="text-base font-extrabold text-slate-900 tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
//               </div>
//               <button onClick={handlePlaceOrder}
//                 className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
//               ><span>Confirm & Place Order</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </>
//         ) : (
//           /* Order Placed Success View */
//           <div className="p-6 text-center space-y-4">
//             <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
//               <CheckCircle className="w-10 h-10" />
//             </div>

//             <div>
//               <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Order Confirmed!</span>
//               <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">Thank You For Your Order</h3>
//               <p className="text-xs text-slate-500 mt-1">
//                 We have received your order{' '}
//                 <span className="font-bold text-slate-800">#{createdOrder?.orderNumber}</span>
//                 . A confirmation has been sent to your registered contact.
//               </p>
//             </div>

//             <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left space-y-1.5 text-xs">
//               <div className="flex justify-between">
//                 <span className="text-slate-500">Order ID:</span>
//                 <span className="font-bold text-slate-900">#{createdOrder?.orderNumber}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-500">Total Paid:</span>
//                 <span className="font-bold text-blue-700 tabular-nums"> ₹{createdOrder?.totalAmount.toLocaleString('en-IN')}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-500">Payment:</span>
//                 <span className="font-semibold text-slate-800">{createdOrder?.paymentMethod}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-500">Est. Delivery:</span>
//                 <span className="font-semibold text-emerald-600">3-5 Business Days</span>
//               </div>
//             </div>

//             <div className="space-y-2 pt-2">
//               <button onClick={handleTrackLive}
//                 className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
//               >Track Order Live
//               </button>
//               <button onClick={handleViewOrder}
//                 className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
//               >View My Orders
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };




import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  CheckCircle,
  MapPin,
  CreditCard,
  Banknote,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { Order } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cartItems,
    cartTotal,
    cartSubtotal,
    cartDiscount,
    shippingCharge,
    appliedCoupon,
    addresses,
    placeOrder,
    navigateTo,
    setSelectedOrderId,
    setIsTrackOrderOpen,
  } = useApp();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ''
  );
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash on Delivery (COD)');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const currentAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handlePlaceOrder = () => {
    if (!currentAddress) return;
    const order = placeOrder(paymentMethod, currentAddress);
    setCreatedOrder(order);
    setIsSuccess(true);
  };

  const handleViewOrder = () => {
    if (createdOrder) {
      setSelectedOrderId(createdOrder.id);
      onClose();
      setIsSuccess(false);
      navigateTo('orders');
    }
  };

  const handleTrackLive = () => {
    if (createdOrder) {
      setSelectedOrderId(createdOrder.id);
      onClose();
      setIsSuccess(false);
      setIsTrackOrderOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-4 pb-20 md:pb-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (!isSuccess) onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] sm:max-h-[92vh] flex flex-col">
        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Secure Checkout
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form & Overview */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs">
              {/* Delivery Address */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> Deliver to
                  </span>
                  <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
                    {addresses.length} Saved
                  </span>
                </div>

                <div className="space-y-2">
                  {addresses.map((addr) => {
                    const isSelected = addr.id === selectedAddressId;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 flex items-center gap-1.5">
                            {addr.name}
                            <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                              {addr.type}
                            </span>
                          </span>
                          <input
                            type="radio"
                            checked={isSelected}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <p className="text-slate-600 mt-1 line-clamp-1">
                          {addr.street}, {addr.locality}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          {addr.city}, {addr.state} {addr.pincode} · {addr.phone}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  Choose Payment Method
                </span>
                <div className="space-y-2">
                  {[
                    {
                      id: 'Cash on Delivery (COD)',
                      label: 'Cash on Delivery (COD)',
                      desc: 'Pay in cash or UPI when order is delivered',
                      icon: <Banknote className="w-4 h-4 text-emerald-600" />,
                    },
                    {
                      id: 'UPI (Google Pay / PhonePe / Paytm)',
                      label: 'UPI (GPay / PhonePe / Paytm)',
                      desc: 'Instant and 100% secure UPI payment',
                      icon: <QrCode className="w-4 h-4 text-blue-600" />,
                    },
                    {
                      id: 'Credit / Debit Card',
                      label: 'Credit / Debit Card',
                      desc: 'Visa, Mastercard, RuPay cards accepted',
                      icon: <CreditCard className="w-4 h-4 text-indigo-600" />,
                    },
                  ].map((method) => {
                    const isSelected = paymentMethod === method.id;
                    return (
                      <div key={method.id} onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">{method.icon}</div>
                          <div>
                            <p className="font-bold text-slate-900">{method.label}</p>
                            <p className="text-[10px] text-slate-500">{method.desc}</p>
                          </div>
                        </div>
                        <input type="radio" checked={isSelected} onChange={() => setPaymentMethod(method.id)} className="text-blue-600" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bill Details */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-800 uppercase tracking-wider block text-[11px] mb-1">Payment Summary</span>
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                  <span className="font-medium tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount {appliedCoupon ? `(${appliedCoupon.code})` : ''}</span>
                    <span className="tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Fee</span>
                  <span className="font-medium tabular-nums">
                    {shippingCharge === 0 ? <span className="text-emerald-600">FREE</span> : `₹${shippingCharge}`}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-1.5 flex justify-between font-bold text-slate-900 text-sm">
                  <span>Total Amount</span>
                  <span className="text-blue-700 tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Footer Place Order Button */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
              <div className="flex-1">
                <span className="text-[10px] text-slate-500 block">Total to Pay</span>
                <span className="text-base font-extrabold text-slate-900 tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <button onClick={handlePlaceOrder}
                className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              ><span>Confirm & Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          /* Order Placed Success View */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Order Confirmed!</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">Thank You For Your Order</h3>
              <p className="text-xs text-slate-500 mt-1">
                We have received your order{' '}
                <span className="font-bold text-slate-800">#{createdOrder?.orderNumber}</span>
                . A confirmation has been sent to your registered contact.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-bold text-slate-900">#{createdOrder?.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Paid:</span>
                <span className="font-bold text-blue-700 tabular-nums"> ₹{createdOrder?.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-semibold text-slate-800">{createdOrder?.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Est. Delivery:</span>
                <span className="font-semibold text-emerald-600">3-5 Business Days</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button onClick={handleTrackLive}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >Track Order Live
              </button>
              <button onClick={handleViewOrder}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >View My Orders
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};