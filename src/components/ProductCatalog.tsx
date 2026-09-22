import React, { useState } from 'react';
import { PRODUCTS_DATABASE } from '../data/config';
import { Product } from '../types';
import { 
  Search, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Info, 
  ShieldCheck, 
  Sparkles, 
  Video, 
  HardDrive, 
  Wifi,
  PackageCheck
} from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onViewProductDetails: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
  onAddToCart, 
  onViewProductDetails 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const getQuantity = (id: string) => quantities[id] || 1;

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, Math.min(50, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const handleAdd = (product: Product) => {
    const qty = getQuantity(product.id);
    onAddToCart(product, qty);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  // Filter products
  const filteredProducts = PRODUCTS_DATABASE.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = 
      selectedBrand === 'all' || product.brand === selectedBrand;

    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'dvr' && product.category === 'dvr') ||
      (selectedCategory === 'cameras' && (product.category === 'camera_indoor' || product.category === 'camera_outdoor')) ||
      (selectedCategory === 'wireless' && product.category === 'wireless');

    return matchesSearch && matchesBrand && matchesCategory;
  });

  return (
    <section id="catalog" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold">
              متجر الأجهزة والأسعار الرسمية
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              قائمة الكاميرات وأجهزة التسجيل المعتمدة
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              جميع الأسعار شاملة الضمان المعتمد، ومتوفرة للتسليم الفوري من مخازن الشركة بالعاشر من رمضان والقاهرة.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو الموديل (مثل: ColorVu)..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                مسح
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-bold text-slate-400 ml-1">تصفية حسب:</span>
          
          {/* Brand Filter Buttons */}
          {[
            { id: 'all', label: 'كافة الماركات' },
            { id: 'Hikvision', label: 'هيكفيجن Hikvision' },
            { id: 'UNV', label: 'يوني فيو UNV' },
            { id: 'Imou', label: 'إيمو Imou' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedBrand(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedBrand === tab.id
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-950'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <span className="w-px h-5 bg-slate-800 mx-1 hidden sm:inline-block" />

          {/* Type Filter Buttons */}
          {[
            { id: 'all', label: 'جميع الأنواع' },
            { id: 'dvr', label: 'أجهزة تسجيل DVR' },
            { id: 'cameras', label: 'كاميرات مراقبة' },
            { id: 'wireless', label: 'كاميرات وايرلس' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const qty = getQuantity(product.id);
            const isAdded = addedAnimationId === product.id;

            return (
              <div
                key={product.id}
                className="flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 transition-all duration-300 p-5 group shadow-lg hover:shadow-sky-950/20"
              >
                <div>
                  {/* Top Tags Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-black tracking-wide ${
                        product.brand === 'Hikvision' 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                          : product.brand === 'UNV'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {product.brand}
                      </span>
                      {product.isPopular && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          مميز
                        </span>
                      )}
                    </div>

                    {/* Stock status indicator */}
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>متوفر ({product.stock} قطعة)</span>
                    </div>
                  </div>

                  {/* Product Visual Mock / Icon Header */}
                  <div className="py-4 px-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                        {product.category === 'dvr' ? (
                          <HardDrive className="w-6 h-6 text-indigo-400" />
                        ) : product.category === 'wireless' ? (
                          <Wifi className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Video className="w-6 h-6 text-sky-400" />
                        )}
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          {product.nameEn}
                        </span>
                        <span className="text-xs font-bold text-sky-400">
                          {product.resolution || (product.ports ? `${product.ports} قنوات` : '2MP HD')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onViewProductDetails(product)}
                      className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 text-xs flex items-center gap-1"
                      title="عرض المواصفات التفصيلية"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {product.name}
                  </h3>

                  {/* Specs Snapshot */}
                  <ul className="space-y-1.5 text-xs text-slate-300 mb-4 min-h-[70px]">
                    {product.specs.slice(0, 3).map((spec, index) => (
                      <li key={index} className="flex items-start gap-1.5 line-clamp-1">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Warranty Tag */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{product.warranty}</span>
                  </div>
                </div>

                {/* Card Bottom: Price, Quantity & Add Button */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">السعر النقدي للقطعة:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-black text-white">
                        {product.price.toLocaleString('ar-EG')}
                      </span>
                      <span className="text-xs font-bold text-sky-400">ج.م</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
                        aria-label="إنقاص الكمية"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
                        aria-label="زيادة الكمية"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add to Quotation Button */}
                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                        isAdded 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-950/40 hover:scale-[1.02]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>تمت الإضافة للمقايسة</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>أضف للمقايسة</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">لم يتم العثور على أجهزة مطابقة للبحث.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrand('all');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-bold text-sky-400 hover:underline"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
