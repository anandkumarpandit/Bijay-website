import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { Play, X, ExternalLink } from 'lucide-react';

// Helper function to parse YouTube & Video URLs
function getEmbedVideoInfo(url) {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('data:video/') || trimmed.endsWith('.mp4') || trimmed.endsWith('.webm') || trimmed.endsWith('.mov')) {
    return { type: 'direct', src: trimmed };
  }

  const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(youtubeRegex);

  if (match && match[2] && match[2].length === 11) {
    const videoId = match[2];
    return {
      type: 'youtube',
      embedSrc: `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`
    };
  }

  if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
    return {
      type: 'youtube',
      embedSrc: trimmed.includes('embed/') ? trimmed : `https://www.youtube.com/embed/${trimmed.split('v=')[1] || ''}`,
      watchUrl: trimmed
    };
  }

  return { type: 'direct', src: trimmed };
}

export const Hero = ({ onOpenVolunteer, onOpenManifesto }) => {
  const { t, lang } = useLanguage();
  const { aboutData } = useAdmin();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const leaderName = lang === 'ne' ? (aboutData?.nameNe || 'विजय पण्डित') : (aboutData?.nameEn || 'Bijay Pandit');
  const leaderRole = lang === 'ne' ? (aboutData?.roleNe || 'जननेता • स्वतन्त्र सुशासन') : (aboutData?.roleEn || "People's Leader • Independent Governance");
  const leaderTagline = lang === 'ne' ? (aboutData?.taglineNe || 'नयाँ पुस्ताको नेतृत्व। पारदर्शी शासन। सबैका लागि समुन्नत नेपाल।') : (aboutData?.taglineEn || 'New generation leadership. Transparent governance. Prosperous Nepal for all.');

  // Dynamic Photo and Video from Admin
  const leaderPhoto = aboutData?.image || '/bijay_pandit_portrait.png';
  const leaderVideoUrl = aboutData?.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  const videoInfo = leaderVideoUrl ? getEmbedVideoInfo(leaderVideoUrl) : null;

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex flex-col justify-between items-center bg-[#FDFDFD] dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Top Capsule Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
              <span>{lang === 'ne' ? 'नयाँ नेपालका लागि' : 'For a New Nepal'}</span>
            </div>

            {/* Giant Bold Name Title */}
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-4">
              {leaderName}
            </h1>

            {/* Role / Subtitle Accent Line */}
            <div className="text-lg sm:text-2xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center justify-center lg:justify-start gap-2">
              <span>{leaderRole}</span>
            </div>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-8 max-w-2xl text-center lg:text-left">
              {leaderTagline}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenManifesto}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-105 transition-all cursor-pointer"
              >
                {lang === 'ne' ? 'मेनिफेस्टो हेर्नुहोस्' : 'View Manifesto'}
              </button>

              <a
                href="#biography"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-slate-800 text-rose-600 dark:text-rose-400 border-2 border-rose-600 dark:border-rose-500 font-bold text-base transition-all hover:scale-105 shadow-sm"
              >
                {lang === 'ne' ? 'जीवनी पढ्नुहोस्' : 'Read Biography'}
              </a>
            </div>

          </div>

          {/* Right Column: Leader Avatar */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[420px] lg:h-[420px] group">

              <div className="absolute inset-0 rounded-full bg-slate-200/60 dark:bg-slate-800/60 scale-105 group-hover:scale-110 transition-transform duration-500"></div>

              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-slate-200 dark:bg-slate-900">
                {/* DYNAMIC IMAGE FROM ADMIN */}
                <img
                  src={leaderPhoto}
                  alt={leaderName}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-slate-900/15 group-hover:bg-slate-900/5 transition-colors"></div>

                {/* DYNAMIC PLAY BUTTON */}
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform group/btn cursor-pointer"
                  title="Watch Speech / भिडियो हेर्नुहोस्"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white ml-1" />
                </button>
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-rose-600 text-white text-xs sm:text-sm font-extrabold shadow-md border-2 border-white dark:border-slate-800 tracking-wide whitespace-nowrap">
                {leaderName}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <a href="#biography" className="relative z-10 mt-12 flex flex-col items-center gap-1 group">
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 flex justify-center pt-2 group-hover:border-rose-500 transition-colors">
          <div className="w-1.5 h-2.5 rounded-full bg-rose-600 animate-bounce"></div>
        </div>
      </a>

      {/* DYNAMIC Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-4">

            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {videoInfo?.type === 'direct' ? (
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <video controls autoPlay src={videoInfo.src} className="w-full h-full object-contain" />
              </div>
            ) : videoInfo?.type === 'youtube' ? (
              <div className="space-y-2">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  <iframe
                    className="w-full h-full"
                    src={videoInfo.embedSrc}
                    title={leaderName}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {videoInfo.watchUrl && (
                  <div className="flex justify-end pt-1">
                    <a
                      href={videoInfo.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:underline"
                    >
                      <span>{lang === 'ne' ? 'युट्युबमा सिधै हेर्नुहोस्' : 'Open in YouTube App'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ) : null}

          </div>
        </div>
      )}

    </section>
  );
};
