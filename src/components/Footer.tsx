import React from 'react';
import { COMPANY_CONFIG } from '../data/config';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Heart,
  ExternalLink,
  ChevronUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-24 sm:pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 text-white font-black text-xl">
                S
              </div>
              <span className="text-2xl font-black text-white tracking-tight">SIGNAL</span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              شركة متخصصة في توريد وتركيب وبرمجة كاميرات المراقبة، أنظمة إنذار الحريق والسرقة، شبكات الداتا والسنترالات وأجهزة البصمة.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-sky-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>إشراف: م/ محمد هشام & م/ أحمد سعد</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">خدمات الأنظمة الأمنية</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">متجر الأجهزة والأسعار</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">عروض وباقات التوريد</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">حاسبة تكلفة المنظومة</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">طلب معاينة موقعية</a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">نطاق الخدمة والمعاينات</h4>
            <ul className="space-y-2 text-xs">
              {COMPANY_CONFIG.locations.map((loc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{loc} والمناطق المجاورة</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-500 pt-1">
              خدمة المعاينات الهندسية متوفرة طوال الأسبوع.
            </p>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">بيانات التواصل</h4>
            <div className="space-y-2.5 text-xs">
              <a 
                href={`tel:${COMPANY_CONFIG.phone}`} 
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span dir="ltr">{COMPANY_CONFIG.phone}</span>
              </a>

              <a 
                href={`https://wa.me/2${COMPANY_CONFIG.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span dir="ltr">{COMPANY_CONFIG.whatsapp}</span>
              </a>

              <a 
                href={`mailto:${COMPANY_CONFIG.email}`} 
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>{COMPANY_CONFIG.email}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <span>العودة للأعلى</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SIGNAL للأنظمة الأمنية والتيار الخفيف. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            <span>جودة هندسية معتمدة بأيدي مهندسين متخصصين</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
