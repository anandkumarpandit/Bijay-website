import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Download, FileText, ShieldCheck } from 'lucide-react';

export const PublicServicesDownloads = ({ onOpenManifesto }) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Public Services Section */}
      <section id="services" className="relative py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase tracking-widest border border-rose-200 dark:border-rose-900">
              {t.servicesSection.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4 tracking-tight">
              {t.servicesSection.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
              {t.servicesSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.servicesSection.items.map((item, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900/80 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md glass-panel-hover flex items-start gap-5 transition-colors duration-300">
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 flex-shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="relative py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-extrabold uppercase tracking-widest border border-amber-200 dark:border-amber-900">
              {t.downloadsSection.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4 tracking-tight">
              {t.downloadsSection.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
              {t.downloadsSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.downloadsSection.files.map((file, idx) => {
              const isManifestoCard = file.type?.toLowerCase().includes('manifesto') || file.name?.includes('संकल्प पत्र');

              return (
                <div key={idx} className="bg-white dark:bg-slate-950/80 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between glass-panel-hover transition-colors duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-100 dark:border-rose-900 flex-shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-900">
                        {file.type}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                        {file.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>Size: {file.size}</span>
                    
                    {isManifestoCard ? (
                      <button
                        onClick={onOpenManifesto}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    ) : (
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); alert(`Downloading ${file.name}...`); }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
