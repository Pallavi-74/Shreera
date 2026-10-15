import React from 'react';
import { Header } from '../components/common/Header';
// import { Footer } from '../components/common/Footer';
import { ImageTag } from '../components/common/ImageTag';
import { useApp } from '../context/AppContext';
import { Gem, HeartHandshake, ShieldCheck, Truck, Users, Award, Sparkles, ChevronRight, Heart, ArrowRight, } from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const { navigateTo } = useApp();
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
            >Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">About Us</span>
          </nav>

          {/* Hero Header with Model Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-100/90 via-sky-50 to-indigo-100 border border-blue-200/80 p-6 sm:p-10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Our Story & Vision</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">About Shreera</h1>
              <p className="text-sm sm:text-base text-blue-950 font-medium">Crafted for the woman you are.</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Celebrating authentic Indian textiles, preserving centuries-old weaving traditions, and empowering modern women with bespoke elegance.
              </p>
            </div>

            <div className="w-36 h-44 sm:w-56 sm:h-64 rounded-2xl overflow-hidden bg-white shadow-lg border-4 border-white shrink-0">
              <ImageTag src="/images/about/about-hero-model.jpg" alt="Shreera Heritage"
                fallbackText="Traditional Elegance" className="w-full h-full object-cover"/>
            </div>
          </div>

          {/* Our Story & Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-3">
              <h2 className="font-serif text-xl font-bold text-slate-900">The Heritage of Shreera</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Shreera was born from a passion for tradition, elegance, and the modern woman. We believe that every saree tells a story – of heritage, craftsmanship, and the beauty within you.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From handpicked mulberry silks in Varanasi and Kanchipuram to delicate floral organzas, each drape is curated to celebrate timeless grace in every weave.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-3">
              <h2 className="font-serif text-xl font-bold text-slate-900">Direct From Master Weavers</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                By bridging the gap between artisan clusters and discerning connoisseurs, we ensure ethical compensation for traditional weavers while bringing you luxury ethnic wear at fair, transparent pricing.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every purchase directly supports over 1,200 weaver families across traditional handloom hubs in Tamil Nadu, Uttar Pradesh, and Karnataka.
              </p>
            </div>
          </div>

          {/* 4 Feature Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Premium Quality</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pure tested metallic zari and 100% certified silk mark guarantees.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Handpicked Designs</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Exclusive limited-edition festive drops designed for modern weddings.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Trusted Shopping</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                7-day easy returns and safe encrypted checkout with full COD option.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Fast Express Delivery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                24-hour dispatch and pan-India express doorstep delivery with live tracking.
              </p>
            </div>
          </div>

          {/* Key Milestones Bar */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <span className="font-serif text-3xl font-extrabold text-blue-400 block tabular-nums">
                  50,000+
                </span>
                <span className="text-xs text-slate-400 mt-1 block">Happy Customers</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-extrabold text-blue-400 block tabular-nums">
                  1,200+
                </span>
                <span className="text-xs text-slate-400 mt-1 block">Master Artisans</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-extrabold text-blue-400 block tabular-nums">
                  2,500+
                </span>
                <span className="text-xs text-slate-400 mt-1 block">Unique Handloom Designs</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-extrabold text-blue-400 block tabular-nums">
                  4.9★
                </span>
                <span className="text-xs text-slate-400 mt-1 block">Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
