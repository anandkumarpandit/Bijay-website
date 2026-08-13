import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, CheckCircle2, MessageSquareText } from 'lucide-react';

export const CitizenVoiceForm = () => {
  const { t, lang } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ward: '',
    category: 'सडक तथा पूर्वाधार',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/panditbijay105@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `नयाँ नागरिक गुनासो/सुझाव - ${formData.name}`,
          _template: 'table',
          Name: formData.name,
          Phone: formData.phone,
          Ward: formData.ward,
          Category: formData.category,
          Message: formData.message
        })
      });
    } catch (err) {
      console.error("FormSubmit delivery error:", err);
    }

    setSubmitting(false);
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
    <section id="grievance" className="relative py-24 bg-[#032e1f] dark:bg-[#021f15] text-white overflow-hidden transition-colors duration-300">
      
      {/* Background Soft Green Glow & Waves */}
      <div className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[550px] h-[550px] bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-widest border border-emerald-400/30">
              {t.grievance.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4 tracking-tight">
              {t.grievance.title}
            </h2>
            <p className="text-emerald-100/80 text-base sm:text-lg font-medium">
              {t.grievance.subtitle}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-900/80 p-8 sm:p-12 rounded-3xl border border-emerald-500/20 shadow-2xl backdrop-blur-2xl transition-colors duration-300">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {lang === 'ne' ? 'सफलतापूर्वक दर्ता भयो!' : 'Grievance Registered Successfully!'}
                </h3>
                <p className="text-emerald-100/80 text-sm max-w-md font-medium">
                  {t.grievance.form.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-2">
                      {t.grievance.form.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Bijay Sharma"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-sm text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-2">
                      {t.grievance.form.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="98XXXXXXXX"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-sm text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-2">
                      {t.grievance.form.ward} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ward}
                      onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                      placeholder="e.g. Ward No. 5"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-sm text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-2">
                      {t.grievance.form.category} *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
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
                  <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-2">
                    {t.grievance.form.message} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="तपाईंको समस्या वा सुझाव यहाँ लेख्नुहोस्..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-sm text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/30 hover:shadow-emerald-400/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Send className="w-5 h-5 text-slate-950" />
                  <span>{submitting ? (lang === 'ne' ? 'पठाउँदैछ...' : 'Sending...') : t.grievance.form.submit}</span>
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
