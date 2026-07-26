import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DonateModal = ({ isOpen, onClose }) => {
  const { t, lang } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('esewa');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const amounts = ['500', '1000', '5000', '10000'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const activeAmount = customAmount || selectedAmount;

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
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {lang === 'ne' ? 'सहयोगको लागि मुरी मुरी धन्यवाद!' : 'Thank you for your Contribution!'}
            </h3>
            <p className="text-slate-600 text-sm">
              {lang === 'ne' ? `रु. ${activeAmount} को सहयोग सफलतापूर्वक दर्ता भयो।` : `Contribution of NPR ${activeAmount} logged.`}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-md">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {t.donate.title}
                </h3>
                <span className="text-xs text-rose-600 font-bold">{t.donate.badge}</span>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
              {t.donate.desc}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Preset Amounts */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {t.donate.amountLabel}
                </label>
                <div className="grid grid-cols-4 gap-2.5 mb-3">
                  {amounts.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                      className={`py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                        selectedAmount === amt && !customAmount
                          ? 'bg-rose-600 text-white shadow-md border border-rose-600 scale-105'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      रु. {amt}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  placeholder={t.donate.customAmount}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              {/* Payment Gateways Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {lang === 'ne' ? 'भुक्तानी माध्यम छान्नुहोस्' : 'Select Payment Gateway'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('esewa')}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'esewa'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-500 font-extrabold'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    eSewa (इसेवा)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('khalti')}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'khalti'
                        ? 'bg-purple-50 text-purple-700 border-purple-500 font-extrabold'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Khalti (खल्टी)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'bank'
                        ? 'bg-blue-50 text-blue-700 border-blue-500 font-extrabold'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Bank (बैंक)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{lang === 'ne' ? '१००% सार्वजनिक लेखापरीक्षण ट्र्याकिङ।' : '100% Audited & Publicly Tracked Campaign Fund.'}</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md hover:scale-[1.01] transition-transform"
              >
                {t.donate.submit} (रु. {activeAmount || '0'})
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
