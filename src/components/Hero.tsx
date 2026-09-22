import React from 'react';
import { COMPANY_CONFIG } from '../data/config';
import { 
  ShieldCheck, 
  Video, 
  Flame, 
  Network, 
  PhoneCall, 
  MessageSquare, 
  Calculator, 
  CheckCircle2, 
  Award, 
  MapPin, 
  ArrowLeft,
  Wrench
} from 'lucide-react';

interface HeroProps {
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCalculator }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-800/60">
      {/* Background Decorative Tech Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges: Engineers & Coverage */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-sky-400 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>إشراف هندسي معتمد: م/ محمد هشام & م/ أحمد سعد</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>العاشر من رمضان • القاهرة • بدر • العبور</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            حلول متكاملة في{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">
              الأنظمة الأمنية والتيار الخفيف
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            توريد وتركيب وبرمجة <strong className="text-white">كاميرات المراقبة التناظرية والـ IP</strong>، وأنظمة <strong className="text-white">إنذار الحريق والسرقة</strong>، وشبكات الداتا وأجهزة البصمة بأعلى كفاءة وضمان يصل إلى عامين.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {/* WhatsApp Quote */}
            <a
              href={`https://wa.me/2${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent('السلام عليكم م/ سيجنال، أرغب في طلب معاينة فنية ومقايسة للأنظمة الأمنية.')}`}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-5 h-5" />
              <span>طلب معاينة ومقايسة مجانية</span>
            </a>

            {/* Instant Calculator */}
            <button
              onClick={onOpenCalculator}
              id="hero-calc-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/50 text-white font-bold text-sm sm:text-base transition-all hover:scale-[1.02]"
            >
              <Calculator className="w-5 h-5 text-sky-400" />
              <span>حاسبة التكلفة الفورية</span>
            </button>

            {/* Catalog direct link */}
            <a
              href="#catalog"
              id="hero-catalog-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900/60 font-semibold text-sm transition-colors"
            >
              <span>قائمة الأجهزة والأسعار</span>
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 text-right space-y-1.5 transition-all hover:border-slate-700">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-white">ضمان معتمد رسمي</h2>
            <p className="text-xs text-slate-400">ضمان استبدال حقيقي للأجهزة حتى عامين كاملين</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 text-right space-y-1.5 transition-all hover:border-slate-700">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-white">أجهزة أصلية 100%</h2>
            <p className="text-xs text-slate-400">هيكفيجن، يوني فيو، إيمو من الوكلاء المعتمدين</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 text-right space-y-1.5 transition-all hover:border-slate-700">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-white">معاينة وتركيب هندسي</h2>
            <p className="text-xs text-slate-400">تمديد احترافي بدون تشويه للديكورات والأسطح</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 text-right space-y-1.5 transition-all hover:border-slate-700">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-white">دعم فني وصيانة</h2>
            <p className="text-xs text-slate-400">خدمة طوارئ واستجابة سريعة للأعطال 24/7</p>
          </div>
        </div>

      </div>
    </section>
  );
};
