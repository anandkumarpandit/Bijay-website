import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Lock, Phone, Key, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const { loginAdmin } = useAdmin();
  const { lang } = useLanguage();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = loginAdmin(phone, password);
    if (res.success) {
      setPhone('');
      setPassword('');
      onClose();
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 p-8 relative overflow-hidden shadow-2xl text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-900">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {lang === 'ne' ? 'एडमिन लगइन' : 'Admin Login'}
            </h3>
            <span className="text-xs text-rose-600 font-bold">
              {lang === 'ne' ? 'सचिवालय लगइन पोर्टल' : 'Secretariat Portal'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
          {lang === 'ne' 
            ? 'कृपया आफ्नो दर्ता गरिएको मोबाइल नम्बर र पासवर्ड प्रविष्ट गर्नुहोस्।' 
            : 'Enter authorized admin mobile number and password.'}
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-rose-600" />
              <span>{lang === 'ne' ? 'फोन नम्बर' : 'Mobile Number'}</span>
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={lang === 'ne' ? 'फोन नम्बर राख्नुहोस्...' : 'Enter Mobile Number...'}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-rose-600" />
              <span>{lang === 'ne' ? 'पासवर्ड' : 'Password'}</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-semibold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md hover:scale-[1.01] transition-transform mt-4 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'ne' ? 'लगइन गर्नुहोस्' : 'Login to Admin Dashboard'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
