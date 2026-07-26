import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';

export const VolunteerModal = ({ isOpen, onClose }) => {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skill: t.volunteer.skillsOptions[0]
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Persist Volunteer Application in localStorage
    try {
      const existing = localStorage.getItem('bijay_volunteers_list');
      const list = existing ? JSON.parse(existing) : [];
      const newEntry = {
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString('ne-NP')
      };
      localStorage.setItem('bijay_volunteers_list', JSON.stringify([newEntry, ...list]));
    } catch (err) {
      console.error("Error saving volunteer to localStorage:", err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 p-8 relative overflow-hidden shadow-2xl text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {lang === 'ne' ? 'अभियानमा स्वागत छ!' : 'Welcome to the Campaign!'}
            </h3>
            <p className="text-slate-600 text-sm">
              {lang === 'ne' ? 'हाम्रो टोलीले शीघ्र सम्पर्क गर्नेछ।' : 'Our volunteer coordination team will get in touch with you.'}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {t.volunteer.title}
                </h3>
                <span className="text-xs text-rose-600 font-bold">{t.volunteer.badge}</span>
              </div>
            </div>

            <p className="text-slate-600 text-xs mb-6 font-medium">
              {t.volunteer.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.volunteer.form.name} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Bijay Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.volunteer.form.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.volunteer.form.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="98XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.volunteer.form.skill} *
                </label>
                <select
                  value={formData.skill}
                  onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-white font-medium"
                >
                  {t.volunteer.skillsOptions.map((sk, idx) => (
                    <option key={idx} value={sk}>{sk}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.volunteer.form.submit}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
