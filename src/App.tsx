import React, { useState, useEffect } from 'react';
import { Product, CartItem, PackageOffer } from './types';
import { PRODUCTS_DATABASE } from './data/config';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProductCatalog } from './components/ProductCatalog';
import { QuotationCalculator } from './components/QuotationCalculator';
import { PackagesSection } from './components/PackagesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Local storage persisted quotation cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('signal_quotation_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('signal_quotation_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error storing cart:', e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`تمت إضافة "${product.name}" للمقايسة (${quantity} قطعة)`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('تم حذف العنصر من المقايسة');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('تم تفريغ سلة المقايسة بالكامل');
  };

  const handleAddPackageToCart = (pkg: PackageOffer) => {
    // Represent the package as a dedicated product item in the quotation
    const packageAsProduct: Product = {
      id: `pkg-${pkg.id}-${Date.now()}`,
      name: `${pkg.title} (عرض شامل)`,
      nameEn: `Package: ${pkg.title}`,
      brand: 'Hikvision',
      category: 'camera_outdoor',
      price: pkg.price,
      stock: 50,
      specs: pkg.items,
      features: ['شامل التوريد والتركيب والبرمجة', pkg.warranty],
      warranty: pkg.warranty,
    };
    handleAddToCart(packageAsProduct, 1);
    setIsCartOpen(true);
  };

  const handleAddCustomSetupToCart = (description: string, total: number) => {
    const customProduct: Product = {
      id: `custom-setup-${Date.now()}`,
      name: description,
      nameEn: 'Custom Tailored Security Setup',
      brand: 'Hikvision',
      category: 'camera_outdoor',
      price: total,
      stock: 50,
      specs: ['منظومة مخصصة عبر الحاسبة الذكية'],
      features: ['تشمل الكاميرات والـ DVR والهارد والملحقات'],
      warranty: 'ضمان عامين معتمد',
    };
    handleAddToCart(customProduct, 1);
    setIsCartOpen(true);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-sky-500/50 text-white shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2 backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Navbar
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        onOpenCalculator={scrollToCalculator}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenCalculator={scrollToCalculator} />

        {/* Low Voltage & Security Services */}
        <ServicesSection />

        {/* Products & Prices Catalog */}
        <ProductCatalog
          onAddToCart={handleAddToCart}
          onViewProductDetails={(prod) => setSelectedProduct(prod)}
        />

        {/* Turnkey Ready Packages */}
        <PackagesSection onAddPackageToCart={handleAddPackageToCart} />

        {/* Interactive Instant Quotation Calculator */}
        <QuotationCalculator
          onAddCustomSetupToCart={handleAddCustomSetupToCart}
        />

        {/* Contact, Team & Location Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileQuickBar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCalculator={scrollToCalculator}
      />

      {/* Quotation Drawer / Cart Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Technical Details Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
