import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { useTheme } from '../context/ThemeContext';
import { Globe, Menu, X, Lock, ShieldCheck, Sun, Moon } from 'lucide-react';

export const Navbar = ({ onOpenAdminLogin, onOpenAdminDashboard }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { aboutData, isAdminLoggedIn } = useAdmin();
  const { theme, toggleTheme } = useTheme();
  
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home', 'biography', 'vision', 'impact', 
        'gallery', 'services', 'grievance', 'downloads', 'footer'
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
    { id: 'media', href: '#media', label: t.nav.media },
    { id: 'services', href: '#services', label: t.nav.services },
    { id: 'grievance', href: '#grievance', label: t.nav.complaints },
    { id: 'footer', href: '#contact', label: t.nav.contact },
  ];

  const brandTitle = aboutData?.brandName || (lang === 'ne' ? 'विजय पण्डित.' : 'Bijay Pandit.');

  return (
    <>
      {/* Compact Floating Navbar Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw]">
        
        {/* Sleek Compact Pill Bar */}
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-2xl border border-white/20 dark:border-slate-800 shadow-2xl shadow-slate-950/60 rounded-full px-4 sm:px-6 py-2 text-white transition-all duration-300">
          
          {/* Left: Leader Brand Logo / Name */}
          <a href="#home" className="text-base sm:text-lg font-black text-white font-serif tracking-tight whitespace-nowrap hover:text-cyan-300 transition-colors flex-shrink-0 flex items-center gap-2">
            <span>{brandTitle}</span>
          </a>

          {/* Divider */}
          <div className="hidden lg:block w-[1px] h-4 bg-white/20 mx-1 flex-shrink-0"></div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5 no-scrollbar py-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (item.id === 'home' && activeSection === '');

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-2.5 py-1 text-xs font-bold transition-all rounded-full whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30 font-extrabold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-[1px] h-4 bg-white/20 mx-1 flex-shrink-0"></div>

          {/* Right: Actions (Admin, Theme, Language) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            
            {/* Admin Login / Dashboard */}
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-[11px] font-extrabold transition-all cursor-pointer whitespace-nowrap"
                title="Open Admin Board"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>एडमिन</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                title={lang === 'ne' ? 'एडमिन लगइन' : 'Admin Login'}
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-200 hover:text-white transition-all cursor-pointer"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-indigo-300 fill-indigo-300" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              )}
            </button>

            {/* Language Switcher Pill Button */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold tracking-wider uppercase transition-all hover:scale-105 cursor-pointer shadow-sm"
              title="Switch Language / भाषा परिवर्तन गर्नुहोस्"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'ne' ? 'ENGLISH' : 'नेपाली'}</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-white hover:bg-white/10 transition-colors ml-0.5"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 max-w-7xl mx-auto bg-slate-900/95 backdrop-blur-2xl border border-slate-800 shadow-2xl rounded-3xl p-4 space-y-1.5 text-white animate-fadeIn">
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
                    ? 'bg-cyan-400 text-slate-950 font-black shadow-md'
                    : 'hover:bg-white/10 text-slate-200'
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
