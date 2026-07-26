import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { useTheme } from '../context/ThemeContext';
import { Globe, Menu, X, Lock, ShieldCheck, Sun, Moon } from 'lucide-react';

export const Navbar = ({ onOpenAdminLogin, onOpenAdminDashboard }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { isAdminLoggedIn } = useAdmin();
  const { theme, toggleTheme } = useTheme();
  
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home', 'biography', 'vision', 'impact', 
        'news', 'gallery', 'services', 'grievance', 'downloads', 'footer'
      ];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', href: '#home', label: t.nav.home },
    { id: 'biography', href: '#biography', label: t.nav.about },
    { id: 'vision', href: '#vision', label: t.nav.vision },
    { id: 'impact', href: '#impact', label: t.nav.development },
    { id: 'news', href: '#news', label: t.nav.news },
    { id: 'gallery', href: '#gallery', label: t.nav.gallery },
    { id: 'services', href: '#services', label: t.nav.services },
    { id: 'grievance', href: '#grievance', label: t.nav.complaints },
    { id: 'downloads', href: '#downloads', label: t.nav.downloads },
    { id: 'footer', href: '#contact', label: t.nav.contact },
  ];

  return (
    <>
      {/* Floating Centered Pill Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[96vw]">
        
        {/* Desktop & Laptop Pill Bar */}
        <div className="hidden lg:flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-300/40 dark:shadow-slate-950/60 rounded-full px-8 py-2.5 transition-colors duration-300">
          
          {/* Link Row */}
          <div className="flex items-center gap-1.5 no-scrollbar py-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (item.id === 'home' && activeSection === '');

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3.5 py-1.5 text-xs xl:text-sm font-bold transition-all rounded-full whitespace-nowrap ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'text-slate-800 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2 flex-shrink-0"></div>

          {/* Admin Login / Dashboard Button */}
          {isAdminLoggedIn ? (
            <button
              onClick={onOpenAdminDashboard}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold transition-all hover:scale-105 flex-shrink-0 whitespace-nowrap cursor-pointer"
              title="Open Admin Board"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>एडमिन बोर्ड</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-600 transition-all flex-shrink-0 cursor-pointer"
              title={lang === 'ne' ? 'एडमिन लगइन' : 'Admin Login'}
            >
              <Lock className="w-4.5 h-4.5" />
            </button>
          )}

          {/* Theme Toggle Button (Light / Dark Mode) */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all shadow-sm cursor-pointer border flex-shrink-0 ${
              theme === 'dark'
                ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                : 'bg-amber-50 text-slate-800 border-amber-200 hover:bg-amber-100'
            }`}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'dark' ? (
              <>
                <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400 flex-shrink-0" />
                <span className="hidden xl:inline text-[11px]">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                <span className="hidden xl:inline text-[11px]">Light</span>
              </>
            )}
          </button>

          {/* Language Globe Button */}
          <button
            onClick={toggleLanguage}
            className="p-2.5 rounded-full hover:bg-rose-50 dark:hover:bg-slate-800 text-rose-600 dark:text-rose-400 transition-all hover:scale-110 flex items-center justify-center flex-shrink-0 cursor-pointer"
            title={`Language: ${lang === 'ne' ? 'नेपाली' : 'English'}`}
          >
            <Globe className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>

        </div>

        {/* Mobile & Tablet Stretched Header */}
        <div className="flex lg:hidden items-center justify-between gap-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl rounded-full px-6 py-3 min-w-[290px] sm:min-w-[380px]">
          
          <a href="#home" className="text-base font-black text-slate-900 dark:text-white whitespace-nowrap flex-shrink-0 tracking-tight">
             विजय पण्डित
          </a>

          <div className="flex items-center gap-2 flex-shrink-0">
            
            {/* Theme Toggle Button Mobile */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                theme === 'dark'
                  ? 'bg-slate-800 text-amber-300 border-slate-700'
                  : 'bg-amber-50 text-slate-800 border-amber-200'
              }`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              )}
            </button>

            {/* Language Switcher Mobile */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800"
              title="Switch Language"
            >
              <Globe className="w-4.5 h-4.5" />
            </button>

            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold whitespace-nowrap"
              >
                एडमिन
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Admin Login"
              >
                <Lock className="w-4.5 h-4.5" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 ml-1"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl p-5 space-y-2 animate-fadeIn text-slate-900 dark:text-white">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  activeSection === item.id
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

      </header>
    </>
  );
};
