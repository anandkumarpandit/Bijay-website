import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, MapPin, Check, X, Bell } from 'lucide-react';

export const TownHallEvents = () => {
  const { t, lang } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', phone: '', count: '1' });

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedEvent(null);
      setRsvpForm({ name: '', phone: '', count: '1' });
    }, 2500);
  };

  return (
    <section id="townhall" className="relative py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-extrabold uppercase tracking-widest border border-amber-200 dark:border-amber-900">
            {t.townhall.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4 tracking-tight">
            {t.townhall.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
            {t.townhall.subtitle}
          </p>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {t.townhall.events.map((evt, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-950/80 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md glass-panel-hover flex flex-col justify-between glass-card-accent transition-colors duration-300"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-4 py-2 rounded-2xl bg-rose-600 text-white font-extrabold text-xs shadow-md flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="text-xs text-amber-800 dark:text-amber-300 font-bold flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.time}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {evt.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  {evt.desc}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-semibold mb-6">
                  <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{evt.location}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedEvent(evt)}
                className="w-full py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>{t.townhall.rsvpBtn}</span>
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 p-8 relative overflow-hidden shadow-2xl transition-colors duration-300">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center mb-4 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                  {lang === 'ne' ? 'सिट आरक्षित भयो!' : 'RSVP Confirmed!'}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {lang === 'ne' ? 'जनसभामा तपाईँको उपस्थिति सुरक्षित गरियो।' : 'Your attendance has been registered successfully.'}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  RSVP: {selectedEvent.title}
                </h3>
                <p className="text-xs text-rose-600 dark:text-rose-400 font-bold mb-6">
                  {selectedEvent.date} • {selectedEvent.location}
                </p>

                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {lang === 'ne' ? 'पुरा नाम' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      placeholder="e.g. Anand Kumar"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {lang === 'ne' ? 'सम्पर्क नम्बर' : 'Mobile Number'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={rsvpForm.phone}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                      placeholder="98XXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {lang === 'ne' ? 'उपस्थित हुने सङ्ख्या' : 'Number of Attendees'}
                    </label>
                    <select
                      value={rsvpForm.count}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, count: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="1">1 Person / १ जना</option>
                      <option value="2">2 Persons / २ जना</option>
                      <option value="5">5 Persons / ५ जना</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md hover:scale-[1.02] transition-transform mt-4"
                  >
                    {lang === 'ne' ? 'आरक्षित गर्नुहोस्' : 'Confirm RSVP'}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
