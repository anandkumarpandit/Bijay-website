import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { X, Download, FileText, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export const ManifestoModal = ({ isOpen, onClose }) => {
  const { t, lang } = useLanguage();
  const { manifestoData } = useAdmin();
  const [downloaded, setDownloaded] = useState(false);
  const [citizenForm, setCitizenForm] = useState({ name: '', phone: '' });

  if (!isOpen) return null;

  const manifestoTitle = lang === 'ne' 
    ? (manifestoData?.titleNe || 'विजय पण्डित ५-वर्षे चुनावी संकल्प पत्र २०८३')
    : (manifestoData?.titleEn || 'Bijay Pandit 5-Year Election Manifesto 2026');

  const manifestoSummary = lang === 'ne'
    ? (manifestoData?.summaryNe || 'पारदर्शी शासन, युवा स्वरोजगार, निःशुल्क स्वास्थ्य र प्रविधिमैत्री शिक्षाका लागि ५-वर्षे विस्तृत मार्गचित्र।')
    : (manifestoData?.summaryEn || 'A comprehensive 5-year roadmap for transparent governance, youth employment, and digital infrastructure.');

  const manifestoContent = lang === 'ne'
    ? (manifestoData?.contentNe || '')
    : (manifestoData?.contentEn || manifestoData?.contentNe || '');

  const handlePdfDownload = (e) => {
    e.preventDefault();

    // Persist Citizen Manifesto Download registration in localStorage
    try {
      const existing = localStorage.getItem('bijay_manifesto_downloads');
      const list = existing ? JSON.parse(existing) : [];
      const newEntry = {
        ...citizenForm,
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString('ne-NP')
      };
      localStorage.setItem('bijay_manifesto_downloads', JSON.stringify([newEntry, ...list]));
    } catch (err) {
      console.error("Error saving manifesto download to localStorage:", err);
    }

    setDownloaded(true);

    const pdfText = `
=====================================================
${manifestoTitle}
=====================================================

नागरिक नाम: ${citizenForm.name || 'Anonymous'}
सम्पर्क नम्बर: ${citizenForm.phone || 'N/A'}
मिति: ${new Date().toLocaleDateString()}

-----------------------------------------------------
संकल्प पत्र सारांश (SUMMARY):
-----------------------------------------------------
${manifestoSummary}

-----------------------------------------------------
विस्तृत नीति तथा संकल्प बुँदाहरू (MANIFESTO POINTS):
-----------------------------------------------------
${manifestoContent}

-----------------------------------------------------
केन्द्रीय सचिवालय: बानेश्वर, काठमाडौँ, नेपाल
फोन: +९७७-०१-४४३३२२१ | इमेल: info@bijaypandit.org.np
=====================================================
    `;

    const blob = new Blob([pdfText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bijay_Pandit_Official_Manifesto_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloaded(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 p-6 sm:p-8 relative overflow-hidden shadow-2xl text-slate-900 max-h-[90vh] flex flex-col justify-between">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {manifestoTitle}
                </h3>
                <span className="text-xs text-rose-600 font-bold">
                  {lang === 'ne' ? 'विजय पण्डित आधिकारिक ५-वर्षे मार्गचित्र' : 'Official 5-Year Governance Roadmap'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Manifesto Scrollable Content Body */}
          <div className="overflow-y-auto max-h-[42vh] pr-2 space-y-4 mb-4">
            
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <p className="font-bold text-slate-900 mb-1">{lang === 'ne' ? 'संक्षिप्त सारांश (Summary):' : 'Summary:'}</p>
              {manifestoSummary}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono leading-relaxed whitespace-pre-wrap">
              {manifestoContent}
            </div>

          </div>
        </div>

        {/* Citizen PDF Download Form */}
        <div className="pt-4 border-t border-slate-200">
          {downloaded ? (
            <div className="py-4 text-center flex items-center justify-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold">
                {lang === 'ne' ? 'संकल्प पत्र फाइल सफलतापूर्वक डाउनलोड भयो!' : 'Manifesto Document Downloaded Successfully!'}
              </span>
            </div>
          ) : (
            <form onSubmit={handlePdfDownload} className="space-y-3">
              <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span>{lang === 'ne' ? 'निःशुल्क PDF डाउनलोड फारम (Citizen PDF Download)' : 'Register & Download Official PDF'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={citizenForm.name}
                  onChange={(e) => setCitizenForm({ ...citizenForm, name: e.target.value })}
                  placeholder={lang === 'ne' ? 'तपाईंको नाम...' : 'Your Name...'}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-medium"
                />

                <input
                  type="tel"
                  required
                  value={citizenForm.phone}
                  onChange={(e) => setCitizenForm({ ...citizenForm, phone: e.target.value })}
                  placeholder={lang === 'ne' ? 'सम्पर्क नम्बर...' : 'Phone Number...'}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{lang === 'ne' ? 'संकल्प पत्र PDF फाइल डाउनलोड गर्नुहोस्' : 'Download Election Manifesto (PDF)'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
