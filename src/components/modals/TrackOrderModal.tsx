// // import React from 'react';
// import { useApp } from '../../context/AppContext';
// import {
//   X,
//   Truck,
//   CheckCircle2,
//   MapPin,
//   Clock,
// } from 'lucide-react';

// export const TrackOrderModal: React.FC = () => {
//   const {
//     orders,
//     selectedOrderId,
//     isTrackOrderOpen,
//     setIsTrackOrderOpen,
//   } = useApp();

//   if (!isTrackOrderOpen) return null;

//   const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

//   if (!order) return null;

//   return (
//     // Increased bottom padding to pb-32 to completely clear the bottom navigation bar
//     <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-4 pb-32 md:pb-4">
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
//         onClick={() => setIsTrackOrderOpen(false)}
//       />

//       {/* Modal Dialog */}
//       <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[75vh] sm:max-h-[90vh] flex flex-col mb-16 sm:mb-0">
        
//         {/* Header */}
//         <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
//           <div className="flex items-center gap-2">
//             <Truck className="w-5 h-5 text-blue-600" />
//             <div>
//               <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Live Tracking</span>
//               <h3 className="text-base font-bold text-slate-900 font-mono">
//                 Order #{order.orderNumber || order.id}
//               </h3>
//             </div>
//           </div>
//           <button
//             onClick={() => setIsTrackOrderOpen(false)}
//             className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full transition-colors cursor-pointer"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Scrollable Body */}
//         <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
          
//           {/* Tracking Timeline Steps */}
//           <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-4">
//             <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
//               Shipment Status
//             </h4>

//             <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
//               {order.trackingSteps?.map((step, index) => (
//                 <div key={index} className="flex items-start gap-3 relative">
//                   <div
//                     className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-xs ${
//                       step.completed
//                         ? 'bg-emerald-600 text-white shadow-xs'
//                         : step.current
//                         ? 'bg-blue-600 text-white animate-pulse shadow-xs'
//                         : 'bg-slate-200 text-slate-400'
//                     }`}
//                   >
//                     {step.completed ? (
//                       <CheckCircle2 className="w-3.5 h-3.5" />
//                     ) : (
//                       <Clock className="w-3.5 h-3.5" />
//                     )}
//                   </div>
//                   <div>
//                     <p className={`font-bold ${step.completed || step.current ? 'text-slate-900' : 'text-slate-400'}`}>
//                       {step.title}
//                     </p>
//                     <p className="text-[11px] text-slate-500 mt-0.5">{step.subtitle}</p>
//                     {step.date && <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">{step.date}</span>}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Delivery Address Card */}
//           {order.deliveryAddress && (
//             <div className="border border-slate-200 rounded-xl p-3.5 space-y-1.5 bg-white">
//               <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
//                 <MapPin className="w-3.5 h-3.5 text-blue-600" /> Delivery Address
//               </span>
//               <p className="font-bold text-slate-900">
//                 {order.deliveryAddress.name} <span className="text-slate-500 font-normal">({order.deliveryAddress.phone})</span>
//               </p>
//               <p className="text-slate-600 leading-relaxed text-[11px]">
//                 {order.deliveryAddress.addressLine}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
//               </p>
//             </div>
//           )}

//           {/* Package Contents */}
//           <div className="space-y-2 pb-2">
//             <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
//               Package Contents ({order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'})
//             </span>
//             <div className="space-y-2">
//               {order.items?.map((it, idx) => (
//                 <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
//                       <img
//                         src={it.image || "https://images.pexels.com/photos/28943543/pexels-photo-28943543.jpeg"}
//                         alt={it.name || 'Product'}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div>
//                       <p className="font-bold text-slate-900 text-xs">{it.name || 'Handloom Product'}</p>
//                       <p className="text-[10px] text-slate-500">Color: {it.color || 'Standard'} · Qty: {it.quantity || 1}</p>
//                     </div>
//                   </div>
//                   <span className="font-extrabold text-slate-900 text-xs tabular-nums">
//                     ₹{(it.price ?? 0).toLocaleString('en-IN')}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>

//         {/* Footer Button */}
//         <div className="p-4 border-t border-slate-100 bg-white shrink-0">
//           <button
//             onClick={() => setIsTrackOrderOpen(false)}
//             className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
//           >
//             Close Tracking
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Truck,
  CheckCircle2,
  Package,
  MapPin,
  Clock,
} from 'lucide-react';

export const TrackOrderModal: React.FC = () => {
  const {
    orders,
    selectedOrderId,
    isTrackOrderOpen,
    setIsTrackOrderOpen,
  } = useApp();

  if (!isTrackOrderOpen) return null;

  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-4 pb-24 md:pb-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsTrackOrderOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] sm:max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Live Tracking</span>
              <h3 className="text-base font-bold text-slate-900 font-mono">
                Order #{order.orderNumber || order.id}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsTrackOrderOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto space-y-5 text-xs">
          
          {/* Tracking Timeline Steps */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-4">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Shipment Status
            </h4>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {order.trackingSteps?.map((step, index) => (
                <div key={index} className="flex items-start gap-3 relative">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-xs ${
                      step.completed
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : step.current
                        ? 'bg-blue-600 text-white animate-pulse shadow-xs'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <p className={`font-bold ${step.completed || step.current ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{step.subtitle}</p>
                    {step.date && <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">{step.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Card */}
          {order.deliveryAddress && (
            <div className="border border-slate-200 rounded-xl p-3.5 space-y-1.5 bg-white">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Delivery Address
              </span>
              <p className="font-bold text-slate-900">
                {order.deliveryAddress.name} <span className="text-slate-500 font-normal">({order.deliveryAddress.phone})</span>
              </p>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {order.deliveryAddress.addressLine}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
              </p>
            </div>
          )}

          {/* Package Contents */}
          <div className="space-y-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
              Package Contents ({order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'})
            </span>
            <div className="space-y-2">
              {order.items?.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={it.image || "https://images.pexels.com/photos/28943543/pexels-photo-28943543.jpeg"}
                        alt={it.name || 'Product'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{it.name || 'Handloom Product'}</p>
                      <p className="text-[10px] text-slate-500">Color: {it.color || 'Standard'} · Qty: {it.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 text-xs tabular-nums">
                    ₹{(it.price ?? 0).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <button
            onClick={() => setIsTrackOrderOpen(false)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Close Tracking
          </button>
        </div>

      </div>
    </div>
  );
};