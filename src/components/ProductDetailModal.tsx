import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  ShieldCheck, 
  Check, 
  ShoppingBag, 
  HardDrive, 
  Video, 
  Wifi, 
  Plus, 
  Minus,
  Sparkles,
  Layers
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 text-right">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-5 top-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Stock */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 rounded-md text-xs font-black tracking-wide ${
            product.brand === 'Hikvision' 
              ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
              : product.brand === 'UNV'
              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}>
            {product.brand}
          </span>

          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
            متوفر بالمخزن ({product.stock} وحدة)
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-white mb-1">
          {product.name}
        </h3>
        <p className="text-xs font-mono text-slate-400 mb-4">
          {product.nameEn}
        </p>

        {/* Visual spec cards */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">الدقة والجودة:</span>
            <span className="text-xs font-bold text-sky-400">
              {product.resolution || (product.ports ? `${product.ports} مخارج HD` : 'Full HD 1080p')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">الرؤية الليلية / الأداء:</span>
            <span className="text-xs font-bold text-white">
              {product.nightVision || 'معالجة رقمية متقدمة'}
            </span>
          </div>
        </div>

        {/* Full Specifications */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs font-bold text-slate-300">المواصفات الفنية المعتمدة:</h4>
          <ul className="space-y-2 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-300">
            {product.specs.map((spec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Warranty Badge */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300 mb-6">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{product.warranty} من الوكيل المعتمد مباشرة</span>
        </div>

        {/* Price & Quantity & Add */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 block">السعر:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">
                {(product.price * qty).toLocaleString('ar-EG')}
              </span>
              <span className="text-xs font-bold text-sky-400">ج.م</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quantity */}
            <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-white">
                {qty}
              </span>
              <button
                onClick={() => setQty(Math.min(50, qty + 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAdd}
              className={`flex items-center gap-2 py-3 px-5 rounded-xl font-bold text-xs transition-all ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-950/50'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تمت الإضافة للمقايسة</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>إضافة للمقايسة</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
