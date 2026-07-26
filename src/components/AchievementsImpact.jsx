import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { Milestone, HeartPulse, GraduationCap, Droplets, Trophy } from 'lucide-react';

export const AchievementsImpact = () => {
  const { t } = useLanguage();
  const { aboutData } = useAdmin();

  const leaderPhoto = aboutData?.image || '/bijay_pandit_portrait.png';

  const iconMap = {
    Road: <Milestone className="w-8 h-8 text-rose-600" />,
    HeartPulse: <HeartPulse className="w-8 h-8 text-amber-500" />,
    GraduationCap: <GraduationCap className="w-8 h-8 text-blue-600" />,
    Droplets: <Droplets className="w-8 h-8 text-emerald-600" />
  };

  return (
    <section id="impact" className="relative py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-widest border border-emerald-200 dark:border-emerald-900">
            {t.impact.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4 tracking-tight">
            {t.impact.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
            {t.impact.subtitle}
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {t.impact.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-950/80 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md glass-panel-hover flex flex-col items-center text-center relative overflow-hidden group transition-colors duration-300"
            >
              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900 mb-6 group-hover:scale-110 transition-transform">
                {iconMap[stat.icon] || <Trophy className="w-8 h-8 text-amber-500" />}
              </div>

              <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-rose-600 transition-colors">
                {stat.value}
              </div>

              <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Quote Glass Card */}
        <div className="mt-16 bg-white dark:bg-slate-950/80 p-8 sm:p-10 rounded-3xl border border-rose-200 dark:border-rose-900 shadow-xl relative overflow-hidden glass-card-accent transition-colors duration-300">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-rose-600 p-0.5 shadow-md flex-shrink-0">
                <img
                  src={leaderPhoto}
                  alt="Bijay Pandit"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white italic">
                  "हाम्रो राजनीति सत्ताका लागि होइन, जनताको सुशासन र समृद्धिको सेवाका लागि हो।"
                </p>
                <p className="text-sm text-rose-600 dark:text-rose-400 font-extrabold mt-1">
                  — विजय पण्डित (Bijay Pandit)
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="flex-shrink-0 px-6 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              सम्पर्क गर्नुहोस्
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
