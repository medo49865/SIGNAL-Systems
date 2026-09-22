import React from 'react';
import { SERVICES_LIST, COMPANY_CONFIG } from '../data/config';
import { 
  Camera, 
  Flame, 
  Network, 
  ShieldCheck, 
  Volume2, 
  Wrench, 
  Check, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-6 h-6 text-sky-400" />,
  Flame: <Flame className="w-6 h-6 text-rose-400" />,
  Network: <Network className="w-6 h-6 text-indigo-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
  Volume2: <Volume2 className="w-6 h-6 text-amber-400" />,
  Wrench: <Wrench className="w-6 h-6 text-cyan-400" />,
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-900/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold">
            مجالات العمل والتخصص
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            خدمات الأنظمة الأمنية وشبكات التيار الخفيف
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            نقدم حلولاً هندسية متطورة تلبي متطلبات الشركات، المصانع، الفيلات، والمشروعات التجارية في العاشر من رمضان وكافة المدن المجاورة.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition-all duration-300 hover:shadow-xl hover:shadow-sky-950/20 group"
            >
              <div>
                {/* Card Top Icon & Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/50 group-hover:scale-110 transition-transform">
                    {iconMap[service.iconName] || <Camera className="w-6 h-6 text-sky-400" />}
                  </div>
                  {service.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-sky-400/90 mb-3">
                  {service.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80 mb-6">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a
                href={`https://wa.me/2${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(`السلام عليكم م/ سيجنال، أود الاستفسار وطلب مقايسة لخدمة: ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-emerald-600 text-slate-200 hover:text-white font-bold text-xs transition-all duration-200"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>طلب معاينة ومقايسة لهذه الخدمة</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
