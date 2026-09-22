import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../data/config';
import { 
  Calculator, 
  Check, 
  HelpCircle, 
  HardDrive, 
  Camera, 
  Wrench, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck,
  PlusCircle
} from 'lucide-react';

interface CalculatorProps {
  onAddCustomSetupToCart: (itemsDescription: string, total: number) => void;
}

export const QuotationCalculator: React.FC<CalculatorProps> = ({ onAddCustomSetupToCart }) => {
  // Config states
  const [cameraCount, setCameraCount] = useState<number>(4);
  const [cameraType, setCameraType] = useState<'hikvision_colorvu' | 'hikvision_standard' | 'unv_color' | 'imou_wireless'>('hikvision_colorvu');
  const [hardDrive, setHardDrive] = useState<'none' | '500gb' | '1tb' | '2tb'>('1tb');
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Pricing Matrix based on catalog
  const cameraPrices = {
    hikvision_colorvu: { price: 950, name: 'كاميرا هيكفيجن 2MP ColorVu ليلية ملونة' },
    hikvision_standard: { price: 600, name: 'كاميرا هيكفيجن 2MP Standard' },
    unv_color: { price: 550, name: 'كاميرا يوني فيو UNV 2MP Color' },
    imou_wireless: { price: 1300, name: 'كاميرا إيمو Imou واي فاي 3MP متحركة' },
  };

  const hardDrivePrices = {
    none: { price: 0, name: 'بدون هارد ديسك' },
    '500gb': { price: 650, name: 'هارد ديسك 500 جيجابايت ساتا' },
    '1tb': { price: 1450, name: 'هارد ديسك 1 تيرابايت مخصص للمراقبة (WD Purple)' },
    '2tb': { price: 2200, name: 'هارد ديسك 2 تيرابايت مخصص للمراقبة (WD Purple)' },
  };

  // DVR selection
  const isWireless = cameraType === 'imou_wireless';
  let dvrPrice = 0;
  let dvrName = 'لا يحتاج DVR (تسجيل على كروت ذاكرة/سحابة)';

  if (!isWireless) {
    if (cameraCount <= 4) {
      dvrPrice = 1650;
      dvrName = 'جهاز تسجيل DVR هيكفيجن 4 قنوات 2MP';
    } else if (cameraCount <= 8) {
      dvrPrice = 2800;
      dvrName = 'جهاز تسجيل DVR هيكفيجن 8 قنوات Full HD';
    } else {
      dvrPrice = 4600;
      dvrName = 'جهاز تسجيل DVR هيكفيجن 16 قناة Full HD';
    }
  }

  // Camera subtotal
  const camerasSubtotal = cameraCount * cameraPrices[cameraType].price;
  const hddPrice = isWireless ? 0 : hardDrivePrices[hardDrive].price;

  // Power supply & Accessories
  const accessoriesCost = isWireless ? 0 : Math.round(cameraCount * 120 + 250); // 120 EGP per camera for BNC/Power Jacks/Boxes + central PSU

  // Installation fee (average 150-200 EGP per point including cables & setup)
  const installationCost = includeInstallation 
    ? (isWireless ? cameraCount * 100 : cameraCount * 220 + 200) 
    : 0;

  const totalCalculated = camerasSubtotal + (isWireless ? 0 : dvrPrice) + hddPrice + accessoriesCost + installationCost;

  // WhatsApp formatted proposal
  const generateWhatsAppMessage = () => {
    const text = `السلام عليكم م/ سيجنال،
أرغب في الحصول على مقايسة منظومة كاميرات حسب المواصفات التالية:
- عدد الكاميرات: ${cameraCount} كاميرات
- نوع الكاميرا: ${cameraPrices[cameraType].name}
- جهاز التسجيل: ${dvrName}
- سعة التخزين: ${isWireless ? 'كروت ذاكرة' : hardDrivePrices[hardDrive].name}
- ملحقات الكابلات والباور: ${isWireless ? 'محولات أصلية' : 'باور سبلاي + علب حماية وتوصيلات'}
- التركيب والبرمجة: ${includeInstallation ? 'نعم، يشمل التركيب والبرمجة والربط على الموبايل' : 'توريد أجهزة فقط بدون تركيب'}

💰 التكلفة التقديرية الإجمالية: ${totalCalculated.toLocaleString('ar-EG')} ج.م
أرجو التواصل لتحديد موعد المعاينة وتأكيد الطلب. شكراً لكم.`;

    return encodeURIComponent(text);
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-slate-900/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            حاسبة التكلفة الذكية الفورية
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            احسب تكلفة منظومة الكاميرات بالكامل في دقيقة
          </h2>
          <p className="text-sm text-slate-400">
            حدد احتياجات منزلك، محلك، أو مصنعك، وشاهد التكلفة التقديرية الحقيقية مع خيار إرسال المقايسة للمهندس فوراً.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
            
            {/* Step 1: Camera Count */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                1. حدد عدد الكاميرات المطلوبة:
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[2, 4, 8, 16].map((count) => (
                  <button
                    key={count}
                    onClick={() => setCameraCount(count)}
                    className={`py-3 px-2 rounded-xl text-center font-bold text-sm transition-all ${
                      cameraCount === count
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-950 border border-sky-400'
                        : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span className="block text-lg font-black">{count}</span>
                    <span className="text-[11px] font-normal opacity-90">كاميرات</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Camera Type */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                2. اختر نوع وجودة الكاميرات:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'hikvision_colorvu',
                    title: 'هيكفيجن ColorVu (ألوان ليلاً)',
                    desc: 'أعلى وضوح، تصوير ملون في الظلام',
                    price: 950,
                    tag: 'الأفضل جودة',
                  },
                  {
                    id: 'hikvision_standard',
                    title: 'هيكفيجن Standard (أشعة تحت الحمراء)',
                    desc: 'تصوير ليلي أبيض وأسود عالي الدقة',
                    price: 600,
                    tag: 'الأكثر شيوعاً',
                  },
                  {
                    id: 'unv_color',
                    title: 'يوني فيو UNV Color Hunter',
                    desc: 'تصوير ملون اقتصادي ومتحمل للحرارة',
                    price: 550,
                    tag: 'قيمة اقتصادية',
                  },
                  {
                    id: 'imou_wireless',
                    title: 'إيمو Imou واي فاي متحركة 360°',
                    desc: 'لاسلكية بدون أسلاك، صوت وصورة',
                    price: 1300,
                    tag: 'بدون تكسير',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setCameraType(item.id as any)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      cameraType === item.id
                        ? 'bg-sky-500/10 border-sky-500 shadow-sm'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-white">{item.title}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{item.desc}</p>
                    <div className="text-xs font-bold text-sky-400">
                      {item.price} ج.م / للكاميرا
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Hard Drive Storage (if not wireless) */}
            {!isWireless && (
              <div>
                <label className="block text-sm font-bold text-white mb-3">
                  3. سعة هارد ديسك التخزين المستمر:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'none', label: 'بدون هارد', time: 'بدون تسجيل' },
                    { id: '500gb', label: '500 جيجابايت', time: '~ 7-10 أيام' },
                    { id: '1tb', label: '1 تيرابايت WD', time: '~ 2-3 أسابيع' },
                    { id: '2tb', label: '2 تيرابايت WD', time: '~ شهر+' },
                  ].map((hdd) => (
                    <button
                      key={hdd.id}
                      onClick={() => setHardDrive(hdd.id as any)}
                      className={`p-2.5 rounded-xl text-center border transition-all ${
                        hardDrive === hdd.id
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="block font-bold text-xs text-white">{hdd.label}</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{hdd.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Installation toggle */}
            <div className="pt-2 border-t border-slate-800">
              <label 
                onClick={() => setIncludeInstallation(!includeInstallation)}
                className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={includeInstallation}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-sky-500 focus:ring-0 focus:ring-offset-0 bg-slate-900 border-slate-700"
                />
                <div className="text-right flex-1">
                  <span className="text-xs sm:text-sm font-bold text-white block">
                    إضافة التمديد والتركيب الهندسي والبرمجة على الهاتف
                  </span>
                  <span className="text-xs text-slate-400">
                    تشمل كابلات نحاسية، سويتشات/باور منظم، وتدريب كامل على التشغيل
                  </span>
                </div>
              </label>
            </div>

          </div>

          {/* Quotation Summary Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 p-6 sm:p-7 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-base text-white">ملخص المقايسة الفورية</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                أسعار رسمية محدثة
              </span>
            </div>

            {/* Breakdown line items */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-slate-300">
                <span>{cameraCount} × {cameraPrices[cameraType].name.split(' ')[1]} ({cameraPrices[cameraType].name.split('(')[0]}):</span>
                <span className="font-mono font-bold text-white">{camerasSubtotal.toLocaleString('ar-EG')} ج.م</span>
              </div>

              {!isWireless && (
                <>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>جهاز التسجيل ({dvrName.split(' ')[2]} {dvrName.split(' ')[3]}):</span>
                    <span className="font-mono font-bold text-white">{dvrPrice.toLocaleString('ar-EG')} ج.م</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>الهارد ديسك ({hardDrivePrices[hardDrive].name}):</span>
                    <span className="font-mono font-bold text-white">{hddPrice.toLocaleString('ar-EG')} ج.م</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>باور سبلاي منظم + سوكيتات وعلب حماية:</span>
                    <span className="font-mono font-bold text-white">{accessoriesCost.toLocaleString('ar-EG')} ج.م</span>
                  </div>
                </>
              )}

              {includeInstallation && (
                <div className="flex justify-between items-center text-slate-300">
                  <span>التركيب والبرمجة والتوصيل بالهاتف:</span>
                  <span className="font-mono font-bold text-white">{installationCost.toLocaleString('ar-EG')} ج.م</span>
                </div>
              )}
            </div>

            {/* Total Price Banner */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">التكلفة التقديرية الإجمالية للمنظومة:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
                  {totalCalculated.toLocaleString('ar-EG')}
                </span>
                <span className="text-sm font-bold text-sky-400">جنيه مصري</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                * المقايسة تشمل ضمان معتمد حتى عامين كاملين ومعاينة مجانية للموقع.
              </p>
            </div>

            {/* Direct Actions */}
            <div className="space-y-2.5 pt-2">
              {/* WhatsApp direct dispatch */}
              <a
                href={`https://wa.me/2${COMPANY_CONFIG.whatsapp}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>إرسال هذه المقايسة للمهندس واتساب</span>
              </a>

              {/* Add to quotation cart */}
              <button
                onClick={() => {
                  const desc = `منظومة مكونة من ${cameraCount} كاميرات (${cameraPrices[cameraType].name}) + ${dvrName} + ${hardDrivePrices[hardDrive].name}`;
                  onAddCustomSetupToCart(desc, totalCalculated);
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-colors border border-slate-700"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">تمت الإضافة لسلة المقايسة بنجاح</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 text-sky-400" />
                    <span>إضافة هذه المنظومة لسلة المقايسة العامة</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>مهندسون معتمدون: م/ محمد هشام & م/ أحمد سعد</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
