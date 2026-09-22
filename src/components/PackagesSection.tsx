import React from 'react';
import { TURNKEY_PACKAGES, COMPANY_CONFIG } from '../data/config';
import { PackageOffer } from '../types';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  ArrowLeft,
  Flame,
  Tag
} from 'lucide-react';

interface PackagesSectionProps {
  onAddPackageToCart: (pkg: PackageOffer) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onAddPackageToCart }) => {
  return (
    <section id="packages" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            عروض التوريد والتركيب الجاهزة
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            باقات أمنية متكاملة شاملة التوريد والتركيب
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            وفر وقتك وتكلفتك مع باقات سيجنال المجهزة هندسياً، جاهزة للتسليم والتشغيل المباشر مع برمجة الموبايل مجاناً.
          </p>
        </div>

        {/* Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TURNKEY_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-sky-500 shadow-2xl shadow-sky-950/40 lg:-translate-y-2'
                  : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Popular / Best value badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>الأعلى مبيعاً وطلباً</span>
                </div>
              )}

              <div>
                {/* Title & Audience */}
                <div className="mb-4">
                  {pkg.badge && !pkg.popular && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700 mb-2">
                      {pkg.badge}
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl font-black text-white mb-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    مناسبة لـ: <span className="text-sky-300">{pkg.targetAudience}</span>
                  </p>
                </div>

                {/* Price Display */}
                <div className="py-4 my-4 border-y border-slate-800/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block line-through">
                      السعر السابق: {pkg.originalPrice.toLocaleString('ar-EG')} ج.م
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl font-black text-white">
                        {pkg.price.toLocaleString('ar-EG')}
                      </span>
                      <span className="text-xs font-bold text-sky-400">جنيه</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-black">
                    وفر {(pkg.originalPrice - pkg.price).toLocaleString('ar-EG')} ج.م
                  </span>
                </div>

                {/* Warranty */}
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 mb-5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{pkg.warranty}</span>
                </div>

                {/* Components Included List */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-xs font-bold text-slate-300 block mb-1">محتويات الباقة بالتفصيل:</span>
                  {pkg.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                <a
                  href={`https://wa.me/2${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(`السلام عليكم م/ سيجنال، أود حجز وطلب: ${pkg.title} بسعر ${pkg.price} ج.م`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all ${
                    pkg.popular
                      ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-950/60'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>طلب الباقة عبر واتساب فوراً</span>
                </a>

                <button
                  onClick={() => onAddPackageToCart(pkg)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  إضافة لمقايستي المجمعة
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
