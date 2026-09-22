import React, { useState } from 'react';
import { CartItem } from '../types';
import { COMPANY_CONFIG } from '../data/config';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  Phone, 
  ShoppingBag, 
  ShieldCheck, 
  Send,
  MapPin,
  User,
  ArrowRight
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientLocation, setClientLocation] = useState('العاشر من رمضان');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSendWhatsApp = () => {
    let message = `*طلب مقايسة رسمية - SIGNAL للأنظمة الأمنية*\n`;
    if (clientName) message += `👤 *العميل:* ${clientName}\n`;
    if (clientPhone) message += `📞 *رقم الهاتف:* ${clientPhone}\n`;
    message += `📍 *الموقع / المدينة:* ${clientLocation}\n`;
    if (notes) message += `📝 *ملاحظات:* ${notes}\n`;
    
    message += `\n*قائمة الأجهزة والمكونات المطلوبة:*\n`;
    cart.forEach((item, index) => {
      const subtotal = item.product.price * item.quantity;
      message += `${index + 1}. ${item.product.name} \n   (العدد: ${item.quantity} × ${item.product.price.toLocaleString('ar-EG')} = ${subtotal.toLocaleString('ar-EG')} ج.م)\n`;
    });

    message += `\n💰 *الإجمالي الكلي التقديري:* ${totalPrice.toLocaleString('ar-EG')} ج.م\n`;
    message += `\nأرجو من المهندس المختص مراجعة المقايسة والتواصل معي لتحديد موعد المعاينة وتأكيد الأسعار والتوريد.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/2${COMPANY_CONFIG.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">سلة المقايسة والطلب</h3>
                <span className="text-xs text-slate-400">
                  {totalItemsCount} {totalItemsCount === 1 ? 'عنصر' : 'عناصر'} مضافة
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="p-2 text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1 rounded-lg hover:bg-slate-800"
                  title="تفريغ السلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                aria-label="إغلاق السلة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">السلة فارغة حالياً</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    تصفح قائمة الكاميرات والأجهزة أو استخدم حاسبة التكلفة لإضافة الأجهزة للمقايسة.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-500 transition-colors"
                >
                  <span>استعراض الأجهزة</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {cart.map((item) => {
                    const subtotal = item.product.price * item.quantity;
                    return (
                      <div
                        key={item.product.id}
                        className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 flex flex-col gap-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400">
                              {item.product.brand}
                            </span>
                            <h4 className="text-xs font-bold text-white leading-tight">
                              {item.product.name}
                            </h4>
                            <span className="text-[11px] text-slate-400">
                              {item.product.price.toLocaleString('ar-EG')} ج.م / للقطعة
                            </span>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                            aria-label="حذف العنصر"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                          {/* Quantity control */}
                          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-left">
                            <span className="text-xs font-bold text-white font-mono">
                              {subtotal.toLocaleString('ar-EG')} ج.م
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Client info inputs for WhatsApp proposal */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-300 block">
                    بياناتك لتجهيز المقايسة (اختياري):
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="اسم حضرتك أو الشركة"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    <input
                      type="tel"
                      placeholder="رقم الهاتف"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <select
                    value={clientLocation}
                    onChange={(e) => setClientLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="العاشر من رمضان">الموقع: العاشر من رمضان</option>
                    <option value="القاهرة والتجمع">الموقع: القاهرة والتجمع</option>
                    <option value="مدينة بدر">الموقع: مدينة بدر</option>
                    <option value="مدينة العبور">الموقع: مدينة العبور</option>
                    <option value="الشروق ومدينتي">الموقع: الشروق ومدينتي</option>
                    <option value="محافظة أخرى">الموقع: محافظة أخرى</option>
                  </select>

                  <textarea
                    rows={2}
                    placeholder="أي ملاحظات خاصة بالمكان أو التركيب..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with Actions */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3 pb-safe">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">إجمالي المقايسة:</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">
                    {totalPrice.toLocaleString('ar-EG')}
                  </span>
                  <span className="text-xs font-bold text-sky-400">ج.م</span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.01]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>إرسال المقايسة الرسمية عبر واتساب</span>
              </button>

              {/* Direct call option */}
              <a
                href={`tel:${COMPANY_CONFIG.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>أو اتصل مباشرة بالمهندس: {COMPANY_CONFIG.phone}</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ضمان معتمد رسمي • فواتير رسمية للشركات والمصانع</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
