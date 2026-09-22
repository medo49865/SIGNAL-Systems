import React from 'react';
import { COMPANY_CONFIG } from '../data/config';
import { CartItem } from '../types';
import { Phone, MessageSquare, Calculator, ShoppingBag } from 'lucide-react';

interface MobileQuickBarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenCalculator: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  cart,
  onOpenCart,
  onOpenCalculator,
}) => {
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-4 gap-1 p-2">
        {/* Direct Call */}
        <a
          href={`tel:${COMPANY_CONFIG.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-sky-400 mb-0.5">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">اتصال</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/2${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent('السلام عليكم م/ سيجنال، أود الاستفسار عن عروض كاميرات المراقبة.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-slate-900 active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-0.5">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">واتساب</span>
        </a>

        {/* Interactive Calculator */}
        <button
          onClick={onOpenCalculator}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-indigo-400 mb-0.5">
            <Calculator className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">الحاسبة</span>
        </button>

        {/* Quotation Cart */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center py-2 px-1 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 active:scale-95 transition-all"
        >
          <div className="relative w-8 h-8 rounded-full bg-sky-500/15 flex items-center justify-center text-sky-400 mb-0.5">
            <ShoppingBag className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-500 text-white text-[9px] font-black flex items-center justify-center animate-bounce">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">المقايسة</span>
        </button>
      </div>
    </div>
  );
};
