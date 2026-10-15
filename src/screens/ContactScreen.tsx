// import React, { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { Header } from '../components/common/Header';
// // import { Footer } from '../components/common/Footer';
// // import { FAQS } from '../data/mockData';
// import { Headphones, Phone, Mail, MessageCircle, MapPin, ChevronRight, ChevronDown, Send, HelpCircle, CheckCircle, } from 'lucide-react';

// export const ContactScreen: React.FC = () => {
//   const { showToast, navigateTo } = useApp();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     queryType: 'Order Status & Tracking',
//     message: '',
//   });

//   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
//       showToast('Please fill in required fields', 'error');
//       return;
//     }

//     setIsSubmitting(true);
//     setTimeout(() => {
//       setIsSubmitting(false);
//       showToast('Message sent! Our support team will respond within 2 hours.', 'success');
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         queryType: 'Order Status & Tracking',
//         message: '',
//       });
//     }, 600);
//   };

//   const toggleFaq = (idx: number) => {
//     setOpenFaqIndex(openFaqIndex === idx ? null : idx);
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
//             <span className="text-slate-900 font-semibold">Contact & Support</span>
//           </nav>

//           {/* Need Help Banner */}
//           <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-100/90 via-sky-50 to-indigo-100 border border-blue-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="space-y-1.5 text-center sm:text-left">
//               <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
//                 24x7 Customer Care
//               </span>
//               <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
//                 We're Here For You
//               </h1>
//               <p className="text-xs sm:text-sm text-slate-600">
//                 Have questions about your order, custom drape styling, or returns? Reach out anytime.
//               </p>
//             </div>

//             <div className="w-16 h-16 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-md shrink-0">
//               <Headphones className="w-8 h-8" />
//             </div>
//           </div>

//           {/* Contact Methods Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-2 text-center sm:text-left">
//               <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto sm:mx-0">
//                 <Phone className="w-5 h-5" />
//               </div>
//               <h3 className="text-sm font-bold text-slate-900">Phone Support</h3>
//               <p className="text-xs text-slate-500">+91 98765 43210</p>
//               <p className="text-[11px] text-slate-400">Mon - Sat: 9 AM - 8 PM IST</p>
//             </div>

//             <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-2 text-center sm:text-left">
//               <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto sm:mx-0">
//                 <MessageCircle className="w-5 h-5" />
//               </div>
//               <h3 className="text-sm font-bold text-slate-900">WhatsApp Chat</h3>
//               <p className="text-xs text-slate-500">+91 98765 43211</p>
//               <p className="text-[11px] text-emerald-600 font-medium">Instant reply in ~5 mins</p>
//             </div>

//             <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-2 text-center sm:text-left">
//               <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto sm:mx-0">
//                 <Mail className="w-5 h-5" />
//               </div>
//               <h3 className="text-sm font-bold text-slate-900">Email Inquiries</h3>
//               <p className="text-xs text-slate-500">support@shreera.com</p>
//               <p className="text-[11px] text-slate-400">Response within 2 hours</p>
//             </div>
//           </div>

//           {/* Desktop 2-Column: Form on Left, FAQs on Right */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//             {/* Left: Contact Form */}
//             <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
//               <div>
//                 <h2 className="font-serif text-lg font-bold text-slate-900">
//                   Send Us a Direct Message
//                 </h2>
//                 <p className="text-xs text-slate-500 mt-0.5">
//                   Our dedicated concierge team is eager to assist you
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="text-xs font-semibold text-slate-700 block mb-1">
//                     Your Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="e.g. Anjali Sharma"
//                     className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50/50 focus:outline-hidden focus:border-blue-600 focus:bg-white"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-xs font-semibold text-slate-700 block mb-1">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       placeholder="anjali@example.com"
//                       className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50/50 focus:outline-hidden focus:border-blue-600 focus:bg-white"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-xs font-semibold text-slate-700 block mb-1">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       placeholder="+91 98765 43210"
//                       className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50/50 focus:outline-hidden focus:border-blue-600 focus:bg-white"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-xs font-semibold text-slate-700 block mb-1">
//                     Query Type
//                   </label>
//                   <select
//                     value={formData.queryType}
//                     onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
//                     className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50/50 focus:outline-hidden focus:border-blue-600 focus:bg-white"
//                   >
//                     <option>Order Status & Tracking</option>
//                     <option>Return & Replacement Request</option>
//                     <option>Product Sizing & Fabric Inquiry</option>
//                     <option>Custom Bridal Weave Order</option>
//                     <option>Payment & Refund</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-xs font-semibold text-slate-700 block mb-1">
//                     Your Message *
//                   </label>
//                   <textarea
//                     rows={4}
//                     required
//                     value={formData.message}
//                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                     placeholder="Please describe how we can assist you..."
//                     className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50/50 focus:outline-hidden focus:border-blue-600 focus:bg-white resize-none"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   <Send className="w-4 h-4" />
//                   <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
//                 </button>
//               </form>
//             </div>

//             {/* Right: FAQs Accordion */}
//             <div className="lg:col-span-6 space-y-4">
//               <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
//                 <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
//                   <HelpCircle className="w-5 h-5 text-blue-600" />
//                   <h2 className="font-serif text-lg font-bold text-slate-900">
//                     Frequently Asked Questions
//                   </h2>
//                 </div>

//                 <div className="space-y-3">
//                   {FAQS.map((faq, idx) => {
//                     const isOpen = openFaqIndex === idx;
//                     return (
//                       <div
//                         key={idx}
//                         className="border border-slate-200 rounded-xl overflow-hidden transition-all"
//                       >
//                         <button
//                           onClick={() => toggleFaq(idx)}
//                           className="w-full px-4 py-3 text-left bg-slate-50/60 hover:bg-slate-100/80 flex items-center justify-between gap-3 cursor-pointer"
//                         >
//                           <span className="text-xs sm:text-sm font-bold text-slate-900">
//                             {faq.q}
//                           </span>
//                           <ChevronDown
//                             className={`w-4 h-4 text-slate-400 transition-transform ${
//                               isOpen ? 'rotate-180 text-blue-600' : ''
//                             }`}
//                           />
//                         </button>
//                         {isOpen && (
//                           <div className="px-4 py-3 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-100">
//                             {faq.a}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Head Office Address Box */}
//               <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
//                 <div className="text-xs">
//                   <h4 className="font-bold text-slate-900">
//                     Shreera Flagship Boutique & Headquarters
//                   </h4>
//                   <p className="text-slate-500 mt-1 leading-relaxed">
//                     14/2, MG Road, Near 100 Ft Road Junction, Indiranagar, Bengaluru, Karnataka 560038
//                   </p>
//                   <p className="text-slate-400 mt-1">Open 7 days a week: 10:30 AM – 9:00 PM</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <Footer /> */}
//     </div>
//   );
// };



import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

// Local FAQ dataset
const FAQS = [
  {
    question: 'How long does shipping take across India?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping delivers within 1-2 business days across metro cities.',
  },
  {
    question: 'What is your return & exchange policy?',
    answer: 'We offer a 7-day hassle-free return and exchange policy from the date of delivery. Items must be unused with tags intact.',
  },
  {
    question: 'Are all your sarees 100% authentic pure silk?',
    answer: 'Yes! All our silk sarees come with Silk Mark Certification guaranteeing 100% pure silk and genuine zari weaving.',
  },
  {
    question: 'Do you offer Cash on Delivery (COD)?',
    answer: 'Yes, Cash on Delivery is available for order totals up to ₹15,000 across 25,000+ pincodes in India.',
  },
];

export const ContactScreen: React.FC = () => {
  const { navigateTo, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Thank you! Your message has been sent successfully.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 1200);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">Contact Us</span>
          </nav>

          {/* Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-950 to-indigo-950 p-6 sm:p-10 text-white shadow-md">
            <div className="max-w-xl space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-800/40 px-3 py-1 rounded-full">
                Customer Support 24/7
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                We'd Love to Hear From You
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                Have questions about custom saree stitching, order status, or wholesale inquiries? Get in touch with our team.
              </p>
            </div>
          </div>

          {/* Contact Details Grid + Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Info Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" /> Get In Touch
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Phone & WhatsApp</p>
                      <p className="text-slate-600 mt-0.5">+91 98765 43210</p>
                      <p className="text-[11px] text-slate-400">Mon-Sat from 9am to 7pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Email Address</p>
                      <p className="text-slate-600 mt-0.5">support@shreera.com</p>
                      <p className="text-[11px] text-slate-400">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Flagship Boutique</p>
                      <p className="text-slate-600 mt-0.5">
                        Shreera Silks, Heritage Handloom Tower, Visakhapatnam, Andhra Pradesh - 530003
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Working Hours</p>
                      <p className="text-slate-600 mt-0.5">Monday to Saturday: 9:30 AM – 8:30 PM</p>
                      <p className="text-slate-600">Sunday: 10:00 AM – 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                Send Us A Message
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Fill out the form below and our team will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anjali Rao"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. anjali@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 00000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white"
                    >
                      <option>General Inquiry</option>
                      <option>Order Status & Tracking</option>
                      <option>Returns & Refunds</option>
                      <option>Custom Blouse Stitching</option>
                      <option>Bulk & Wholesale</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message or inquiry here..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200/80 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};