import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../data/config';
import { CartItem } from '../types';
import { 
  Phone, 
  MessageSquare, 
  ShoppingBag, 
  Menu, 
  X, 
  ShieldCheck, 
  Calculator, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, setIsCartOpen, onOpenCalculator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const navLinks = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'خدماتنا', href: '#services' },
    { label: 'المنتجات والأسعار', href: '#catalog' },
    { label: 'باقات متكاملة', href: '#packages' },
    { label: 'احسب مقايستك', href: '#calculator', onClick: onOpenCalculator },
    { label: 'فريق العمل وتواصل', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <a href="#hero" className="flex items-center gap-3.5 group text-right">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 shadow-lg shadow-sky-500/20 text-white font-black text-xl tracking-wider transition-transform group-hover:scale-105">
              <span className="relative z-10">S</span>
              <div className="absolute -inset-1 rounded-xl bg-sky-500/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                  SIGNAL
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  أنظمة أمنية
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                للتيار الخفيف وكاميرات المراقبة
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-900/90 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Quick Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone quick call */}
            <a
              href={`tel:${COMPANY_CONFIG.phone}`}
              id="nav-call-btn"
              title="اتصل بالمهندس"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span dir="ltr">{COMPANY_CONFIG.phone}</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/2${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent('السلام عليكم م/ سيجنال، أود الاستفسار عن الأنظمة الأمنية وعروض الأسعار.')}`}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-btn"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>واتساب سريع</span>
            </a>

            {/* Cart / Quotation Bag button */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="nav-cart-trigger"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-sky-950/50 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>المقايسة</span>
              {totalItemsCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-black rounded-full bg-white text-sky-700 animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Cart + Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white"
              aria-label="عرض المقايسة"
            >
              <ShoppingBag className="w-5 h-5 text-sky-400" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-black rounded-full bg-sky-500 text-white shadow">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-menu-toggle"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          <div className="py-2 px-1 text-xs text-slate-400 flex items-center justify-between border-b border-slate-800/80 mb-2">
            <span>م/ محمد هشام & م/ أحمد سعد</span>
            <span className="text-sky-400 font-bold">العاشر من رمضان والقاهرة</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <a
              href={`tel:${COMPANY_CONFIG.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-800 text-white font-bold text-xs"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>اتصال هاتفي</span>
            </a>
            <a
              href={`https://wa.me/2${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent('السلام عليكم م/ سيجنال، أود الاستفسار عن الأنظمة وعروض الأسعار.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>واتساب المهندس</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
