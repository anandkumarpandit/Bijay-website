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
  const { lang, toggleLanguage } = useLanguage();
  const { aboutData } = useAdmin();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const leaderBrand = aboutData?.brandName || (lang === 'ne' ? 'विजय पण्डित.' : 'Bijay Pandit.');
  const constituencySub = lang === 'ne' ? (aboutData?.constituencySubNe || 'वडा अध्यक्ष उम्मेदवार') : (aboutData?.constituencySubEn || 'Ward Chairperson Candidate');
  const constituencyArea = lang === 'ne' ? (aboutData?.constituencyAreaNe || 'विश्रामपुर गाउँपालिका - ०५') : (aboutData?.constituencyAreaEn || 'Bishrampur Gaupalika - 05');

  const leaderHeadline = lang === 'ne'
    ? (aboutData?.headlineNe || 'नेतृत्व गर्न तयार।')
    : (aboutData?.headlineEn || 'Ready to Lead.');

  const leaderTagline = lang === 'ne'
    ? (aboutData?.taglineNe || 'परिवर्तन  पारदर्शिता  परिणाम')
    : (aboutData?.taglineEn || 'Change  Transparency  Results');

  // Dynamic Leader Photo (default candidate image)
  const leaderPhoto = (aboutData?.image && !aboutData.image.startsWith('data:image/') && aboutData.image !== '/bijay.jpg')
    ? aboutData.image
    : '/bijayprofile.png';
  // User provided background photo slot
  const userBgPhoto = aboutData?.bgPhoto || null;
  const leaderVideoUrl = aboutData?.videoUrl || '/bijaymp.mp4';

  const videoInfo = leaderVideoUrl ? getEmbedVideoInfo(leaderVideoUrl) : null;

  return (
    <section id="home" className="relative min-h-screen w-full bg-gradient-to-br from-[#021c26] via-[#073948] to-[#0c5163] text-white overflow-hidden flex flex-col justify-between select-none">

      {/* Background Layer: Custom User BG Photo or Political Dynamic Texture */}
      {userBgPhoto ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay z-0 transition-opacity duration-700"
          style={{ backgroundImage: `url(${userBgPhoto})` }}
        />
      ) : (
        /* Wavy Political Backdrop Animation Layer */
        <div className="absolute inset-0 opacity-25 z-0 pointer-events-none overflow-hidden">
          <svg className="w-full h-full object-cover scale-105" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 200C200 150 400 450 800 350C1200 250 1400 500 1600 400V1000H-100V200Z" fill="url(#grad1)" opacity="0.6" />
            <path d="M-100 400C300 300 600 650 1000 500C1400 350 1500 700 1700 600V1000H-100V400Z" fill="url(#grad2)" opacity="0.4" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-black/50"></div>
        </div>
      )}

      {/* Main Hero Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-28 lg:pt-36 pb-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* Left Column: Leadership Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left pt-6 lg:pt-0">

            {/* Candidate Role / Constituency Header */}
            <div className="space-y-1.5 mb-8">
              <p className="text-xs sm:text-sm font-medium text-cyan-200/90 tracking-wide">
                {constituencySub}
              </p>
              <div className="flex items-center gap-3">
                <span className="w-8 h-[2px] bg-cyan-300 rounded-full"></span>
                <p className="text-sm sm:text-base font-bold text-cyan-100 tracking-wide">
                  {constituencyArea}
                </p>
              </div>
              <p className="text-sm sm:text-base font-bold text-amber-300 tracking-wide pl-11">
                {lang === 'ne' ? 'मुसहरवा, वडा नं. ३' : 'Musharwa, Ward No. 3'}
              </p>
            </div>

            {/* Giant Main Headline */}
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[1.08] mb-6 drop-shadow-2xl font-sans">
              {leaderHeadline}
            </h1>

            {/* Sub-headline / Tagline */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-cyan-100/90 tracking-wider leading-relaxed mb-10">
              {leaderTagline}
            </p>

            {/* Desktop Call to Action Buttons */}
            <div className="hidden lg:flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenManifesto}
                className="px-8 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 transition-all cursor-pointer"
              >
                {lang === 'ne' ? 'मेनिफेस्टो हेर्नुहोस्' : 'View Manifesto'}
              </button>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white font-bold text-base transition-all hover:scale-105 shadow-lg cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white text-white" />
                <span>{lang === 'ne' ? 'भिडियो सन्देश' : 'Watch Speech'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: High Quality Standing Candidate Cutout Photo */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center -mt-10 sm:-mt-14 lg:-mt-12">

            {/* Soft Backlight Behind Candidate */}
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-6 w-[400px] sm:w-[580px] h-[400px] sm:h-[580px] bg-cyan-400/25 rounded-full blur-3xl pointer-events-none"></div>

            {/* Candidate Image Container */}
            <div className="relative w-[125%] sm:w-full max-w-none sm:max-w-[620px] lg:max-w-[680px] xl:max-w-[760px] group flex flex-col items-center lg:items-end -translate-y-24 sm:-translate-y-28 lg:-translate-y-16 xl:-translate-y-20 translate-x-0 sm:translate-x-3 lg:translate-x-8 xl:translate-x-12">

              <div className="relative w-full flex flex-col items-center lg:items-end justify-center">
                <img
                  src={leaderPhoto}
                  alt={leaderBrand}
                  className="w-full h-auto max-h-[750px] sm:max-h-[850px] lg:max-h-[900px] object-contain object-bottom scale-130 sm:scale-100 group-hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl"
                />
                
                {/* Current Designation Badge Under Photo */}
                <div className="mt-3 sm:mt-4 z-20 px-2 w-full flex justify-center lg:justify-end">
                  <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl sm:rounded-full bg-slate-950/90 border border-amber-400/40 backdrop-blur-xl shadow-2xl max-w-[90vw] sm:max-w-none text-center">
                    {/* Glowing Blinking Bulb Indicator */}
                    <span className="relative flex h-3 w-3 flex-shrink-0 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 animate-pulse shadow-[0_0_12px_#fbbf24] border border-amber-200"></span>
                    </span>
                    <span className="text-[11px] sm:text-xs md:text-sm font-extrabold text-amber-300 tracking-wide leading-tight sm:leading-normal">
                      {lang === 'ne'
                        ? 'हाल: बिश्रामपुर गाउँपालिकाको कार्यपालिका सदस्य'
                        : 'Currently: Executive Committee Member, Bishrampur Gaupalika'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile Call to Action Buttons (Equal sized, sleek proportioned pills) */}
            <div className="flex lg:hidden flex-row items-center justify-center gap-3 w-full px-4 -mt-16 sm:-mt-20 pb-4 z-20">
              <button
                onClick={onOpenManifesto}
                className="flex-1 max-w-[175px] py-3.5 px-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-400/30 hover:scale-105 transition-all cursor-pointer text-center whitespace-nowrap"
              >
                {lang === 'ne' ? 'मेनिफेस्टो हेर्नुहोस्' : 'View Manifesto'}
              </button>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="flex-1 max-w-[175px] inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-cyan-400/40 backdrop-blur-xl text-cyan-200 font-black text-xs sm:text-sm shadow-xl hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400 flex-shrink-0" />
                <span>{lang === 'ne' ? 'भिडियो सन्देश' : 'Watch Speech'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Subtle Gradient Fade to Next Section */}
      <div className="relative z-10 w-full h-12 bg-gradient-to-b from-transparent to-slate-950/30 pointer-events-none"></div>

      {/* DYNAMIC Video Popup Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-4 sm:p-6">

            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4 px-2">
              {lang === 'ne' ? 'विजय पण्डितको भिडियो सम्बोधन' : 'Bijay Pandit Speech'}
            </h3>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center shadow-inner">
              <video controls autoPlay src="/bijaymp.mp4" className="w-full h-full object-contain" />
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

