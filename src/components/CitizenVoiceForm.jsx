import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, CheckCircle2 } from 'lucide-react';

export const CitizenVoiceForm = () => {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ward: '',
    category: 'सडक तथा पूर्वाधार',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Persist Complaint Submission in localStorage
    try {
      const existing = localStorage.getItem('bijay_citizens_complaints');
      const list = existing ? JSON.parse(existing) : [];
      const newEntry = {
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString('ne-NP')
      };
      localStorage.setItem('bijay_citizens_complaints', JSON.stringify([newEntry, ...list]));
    } catch (err) {
      console.error("Error saving complaint to localStorage:", err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        ward: '',
        category: 'सडक तथा पूर्वाधार',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="grievance" className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase tracking-widest border border-rose-200 dark:border-rose-900">
              {t.grievance.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4 tracking-tight">
              {t.grievance.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
              {t.grievance.subtitle}
            </p>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-900/80 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl glass-card-accent transition-colors duration-300">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {lang === 'ne' ? 'सफलतापूर्वक दर्ता भयो!' : 'Grievance Registered Successfully!'}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md font-medium">
                  {t.grievance.form.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {t.grievance.form.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Bijay Sharma"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {t.grievance.form.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="98XXXXXXXX"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {t.grievance.form.ward} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ward}
                      onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                      placeholder="e.g. Ward No. 5"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {t.grievance.form.category} *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="सडक तथा पूर्वाधार">सडक तथा पूर्वाधार (Roads & Infrastructure)</option>
                      <option value="खानेपानी तथा ढल">खानेपानी तथा ढल (Water & Sanitation)</option>
                      <option value="स्वास्थ्य तथा शिक्षा">स्वास्थ्य तथा शिक्षा (Health & Education)</option>
                      <option value="भ्रष्टाचार / ढिलासुस्ती">भ्रष्टाचार / ढिलासुस्ती (Anti-Corruption)</option>
                      <option value="अन्य">अन्य गुनासो (Others)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {t.grievance.form.message} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="तपाईंको समस्या वा सुझाव यहाँ लेख्नुहोस्..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Send className="w-5 h-5 text-white" />
                  <span>{t.grievance.form.submit}</span>
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
