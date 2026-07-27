import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { MapPin, Phone, Mail, Facebook, Twitter, Youtube, Instagram, Send } from 'lucide-react';

export const Footer = () => {
  const { t, lang } = useLanguage();
  const { aboutData } = useAdmin();

  const leaderPhoto = aboutData?.image || '/bijay.jpg';
  const leaderName = lang === 'ne' ? (aboutData?.nameNe || 'विजय पण्डित') : (aboutData?.nameEn || 'Bijay Pandit');

  return (
    <footer id="contact" className="relative bg-slate-100 dark:bg-slate-950 pt-16 pb-12 border-t border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-rose-600 p-0.5 shadow-md flex-shrink-0">
                <img
                  src={leaderPhoto}
                  alt={leaderName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{leaderName}</h3>
                <span className="text-xs text-rose-600 font-bold">{lang === 'ne' ? 'Bijay Pandit' : 'विजय पण्डित'}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
              {t.footer.tagline}
            </p>

            <div className="flex items-center gap-3">
              <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors shadow-sm">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><a href="#home" className="hover:text-rose-600 transition-colors">{t.nav.home}</a></li>
              <li><a href="#biography" className="hover:text-rose-600 transition-colors">{t.nav.about}</a></li>
              <li><a href="#vision" className="hover:text-rose-600 transition-colors">{t.nav.vision}</a></li>
              <li><a href="#impact" className="hover:text-rose-600 transition-colors">{t.nav.development}</a></li>
              <li><a href="#gallery" className="hover:text-rose-600 transition-colors">{t.nav.gallery}</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>+९७७-९८२५३४२१६१</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>secretariat@bijaypandit.org.np</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              {t.footer.newsletterTitle}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 font-medium">
              {t.footer.newsletterDesc}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="तपाईंको इमेल..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>सदस्य बन्नुहोस्</span>
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-semibold">
          <p>© २०८३ विजय पण्डित डिजिटल सचिवालय। सर्वाधिकार सुरक्षित।</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-rose-600 transition-colors">गोपनीयता नीति</a>
            <a href="#" className="hover:text-rose-600 transition-colors">प्रयोगका सर्तहरू</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
