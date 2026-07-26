import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, HeartPulse, Building2, TrendingUp, Trees, CheckCircle2 } from 'lucide-react';

export const VisionPolicy = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t.vision.categories.all },
    { id: 'edu', label: t.vision.categories.edu, icon: BookOpen },
    { id: 'health', label: t.vision.categories.health, icon: HeartPulse },
    { id: 'infra', label: t.vision.categories.infra, icon: Building2 },
    { id: 'economy', label: t.vision.categories.economy, icon: TrendingUp },
    { id: 'env', label: t.vision.categories.env, icon: Trees }
  ];

  const filteredCards = activeCategory === 'all'
    ? t.vision.cards
    : t.vision.cards.filter(card => card.cat === activeCategory);

  return (
    <section id="vision" className="relative py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-extrabold uppercase tracking-widest border border-amber-200 dark:border-amber-900">
            {t.vision.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4 tracking-tight">
            {t.vision.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
            {t.vision.subtitle}
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-105'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map((card, index) => (
            <div
              key={index}
              className="bg-slate-50/80 dark:bg-slate-900/90 p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold">
                    {card.pledge}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {card.progress}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {card.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">
                  <span>संकल्प प्रगति (Pledge Progress)</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">{card.progress}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: card.progress.replace(/[^0-9]/g, '') + '%' || '70%' }}
                  ></div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
