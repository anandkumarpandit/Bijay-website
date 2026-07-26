import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { Shield, Flame, Compass } from 'lucide-react';

export const Biography = () => {
  const { t } = useLanguage();
  const { aboutData } = useAdmin();

  const timelineItems = (aboutData && aboutData.timeline && aboutData.timeline.length > 0)
    ? aboutData.timeline
    : t.bio.timeline;

  return (
    <section id="biography" className="relative py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase tracking-widest border border-rose-200 dark:border-rose-900">
            {t.bio.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4 tracking-tight">
            {t.bio.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
            {t.bio.subtitle}
          </p>
        </div>

        {/* Dynamic Timeline Grid (Editable from Admin Board) */}
        <div className="relative max-w-4xl mx-auto mb-20">
          
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-rose-500 transform -translate-x-1/2 hidden sm:block"></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col sm:flex-row items-center ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                  
                  {/* Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-rose-600 flex items-center justify-center shadow-md shadow-rose-600/30 z-20 hidden sm:flex">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-600"></div>
                  </div>

                  {/* Card */}
                  <div className={`w-full sm:w-1/2 ${isEven ? 'sm:pl-10' : 'sm:pr-10'}`}>
                    <div className="bg-white dark:bg-slate-950/80 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 transition-all">
                      
                      <div className="inline-block px-3 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-extrabold mb-3">
                        {item.year}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        {item.desc}
                      </p>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Core Values Section */}
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.bio.coreValuesTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {t.bio.values.map((val, idx) => {
              const icons = [<Shield className="w-7 h-7 text-rose-600" />, <Flame className="w-7 h-7 text-amber-500" />, <Compass className="w-7 h-7 text-emerald-600" />];
              return (
                <div key={idx} className="bg-white dark:bg-slate-950/80 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col items-start transition-colors">
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900 mb-5">
                    {icons[idx]}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {val.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
