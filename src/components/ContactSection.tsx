import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../data/config';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  UserCheck, 
  CheckCircle,
  Building,
  Sparkles
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('العاشر من رمضان');
  const [service, setService] = useState('كاميرات مراقبة');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*طلب معاينة فنية وتواصل - SIGNAL*\n👤 *الاسم:* ${name}\n📞 *رقم الهاتف:* ${phone}\n📍 *المدينة:* ${city}\n🛠️ *الخدمة المطلوبة:* ${service}\n📝 *التفاصيل:* ${details || 'لا توجد ملاحظات إضافية'}`;
    const url = `https://wa.me/2${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-900/50 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold">
            <UserCheck className="w-3.5 h-3.5" />
            التواصل المباشر مع المهندسين
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            جاهزون لمعاينة موقعك وتقديم الاستشارة الهندسية
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            تواصل مباشرة مع المهندسين المسؤولين لتحديد موعد المعاينة، أو اطلب عرض سعر فني معتمد لمشروعك.
          </p>
        </div>

        {/* Engineers Cards Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
          {COMPANY_CONFIG.engineers.map((eng, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4 shadow-lg hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center font-black text-lg">
                  {eng.name.split(' ')[2]?.[0] || 'م'}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{eng.name}</h3>
                  <span className="text-xs text-sky-400 font-medium block">{eng.title}</span>
                  <span className="text-[11px] text-slate-400">العاشر من رمضان والقاهرة</span>
                </div>
              </div>

              <a
                href={`tel:${COMPANY_CONFIG.phone}`}
                className="p-3 rounded-xl bg-slate-800 text-sky-400 hover:text-white hover:bg-sky-600 transition-colors"
                title="اتصال مباشر"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="space-y-3">
              {/* Phone */}
              <a
                href={`tel:${COMPANY_CONFIG.phone}`}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 flex items-center gap-3.5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">الهاتف المباشر للإدارة الهندسية:</span>
                  <span className="text-sm font-bold text-white font-mono" dir="ltr">
                    {COMPANY_CONFIG.phone}
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/2${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent('السلام عليكم م/ سيجنال، أود الاستفسار عن الأنظمة الأمنية.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex items-center gap-3.5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">المراسلة الفورية عبر واتساب:</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono" dir="ltr">
                    {COMPANY_CONFIG.whatsapp}
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${COMPANY_CONFIG.email}`}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-3.5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">البريد الإلكتروني الرسمي:</span>
                  <span className="text-sm font-bold text-white font-mono">
                    {COMPANY_CONFIG.email}
                  </span>
                </div>
              </a>
            </div>

            {/* Coverage Areas Chips */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>نطاق التغطية والمعاينات السريعة:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {COMPANY_CONFIG.locations.map((loc, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-800/90 text-xs font-medium text-slate-300 border border-slate-700/60"
                  >
                    {loc}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                * فريق التركيب مجهز لخدمة المصانع بالمناطق الصناعية (A1، B1، C1، المطورين) بالعاشر من رمضان والمشروعات الكبرى.
              </p>
            </div>

            {/* Working Hours */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white block">ساعات العمل والدعم الفني:</span>
                <span className="text-xs text-slate-300 leading-relaxed block mt-0.5">
                  {COMPANY_CONFIG.workingHours}
                </span>
              </div>
            </div>

          </div>

          {/* Site Visit / Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
            <div className="mb-6 space-y-1">
              <h3 className="text-lg font-bold text-white">طلب معاينة موقع أو استشارة هندسية</h3>
              <p className="text-xs text-slate-400">
                املأ البيانات وسيتم تحويل طلبك مباشرة لمكتب المهندس للتواصل معك خلال دقائق.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    الاسم بالكامل / اسم الشركة *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: م/ كريم - مصنع الصفا"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    رقم الهاتف / الواتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    الموقع أو المدينة *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="العاشر من رمضان - منطقة صناعية">العاشر من رمضان (منطقة صناعية)</option>
                    <option value="العاشر من رمضان - سكني / محلات">العاشر من رمضان (سكني / محلات)</option>
                    <option value="القاهرة الجديدة والتجمع">القاهرة الجديدة والتجمع</option>
                    <option value="مدينة بدر">مدينة بدر</option>
                    <option value="مدينة العبور والشروق">مدينة العبور والشروق</option>
                    <option value="مدينة أخرى">مدينة أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    الخدمة المطلوبة
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="كاميرات مراقبة (CCTV)">كاميرات مراقبة (CCTV)</option>
                    <option value="أنظمة إنذار حريق وسرقة">أنظمة إنذار حريق وسرقة</option>
                    <option value="شبكات داتا وسنترالات">شبكات داتا وسنترالات</option>
                    <option value="أجهزة بصمة وتحكم أبواب">أجهزة بصمة وتحكم أبواب</option>
                    <option value="أنظمة صوتيات وإذاعة داخلية">أنظمة صوتيات وإذاعة داخلية</option>
                    <option value="صيانة منظومة قائمة">صيانة منظومة قائمة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  تفاصيل إضافية أو وصف المكان:
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="عدد الكاميرات التقريبي، مساحة المنشأة، أو أي متطلبات خاصة..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>إرسال طلب المعاينة الآن عبر واتساب</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>تم فتح محادثة الواتساب مع المهندس لإرسال الطلب مباشرة!</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
