import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { Calendar, ArrowRight, X, Play, Video, ExternalLink, Grid, Search } from 'lucide-react';

// Helper function to parse YouTube & Video URLs
function getEmbedVideoInfo(url) {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // Base64 Data URL or Direct MP4/Video File
  if (trimmed.startsWith('data:video/') || trimmed.endsWith('.mp4') || trimmed.endsWith('.webm') || trimmed.endsWith('.mov') || trimmed.endsWith('.ogg')) {
    return { type: 'direct', src: trimmed };
  }

  // YouTube Regex Matcher
  const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(youtubeRegex);

  if (match && match[2] && match[2].length === 11) {
    const videoId = match[2];
    return {
      type: 'youtube',
      videoId,
      embedSrc: `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    };
  }

  // Standard YouTube Embed fallback
  if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
    return {
      type: 'youtube',
      embedSrc: trimmed.includes('embed/') ? trimmed : `https://www.youtube.com/embed/${trimmed.split('v=')[1] || ''}`,
      watchUrl: trimmed,
      thumbnailUrl: null
    };
  }

  return { type: 'direct', src: trimmed };
}

export const NewsNotices = () => {
  const { lang } = useLanguage();
  const { newsData } = useAdmin();
  
  const [selectedNews, setSelectedNews] = useState(null);
  const [showAllNewsModal, setShowAllNewsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const newsList = newsData && newsData.length > 0 ? newsData : [];
  
  // Show top 3 on front grid
  const initialNews = newsList.slice(0, 3);

  // Filtered list for "See All" modal search
  const filteredNews = newsList.filter(item => {
    const title = (item.titleNe || '') + ' ' + (item.titleEn || '');
    const summary = (item.summaryNe || '') + ' ' + (item.summaryEn || '');
    return title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           summary.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section id="news" className="relative py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase tracking-widest border border-rose-200 dark:border-rose-900">
            {lang === 'ne' ? 'ताजा समाचार र सूचना' : 'NEWS & OFFICIAL NOTICES'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3 mb-3 tracking-tight">
            {lang === 'ne' ? 'समाचार, सूचना तथा भिडियो समाचारहरू' : 'Latest News & Press Releases'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium">
            {lang === 'ne' ? 'विजय पण्डितको सचिवालयबाट जारी गरिएका आधिकारिक निर्णय, तस्बिर तथा भिडियो समाचारहरू' : 'Official press releases, photo news, and video updates from Secretariat.'}
          </p>
        </div>

        {/* Compact Cards Grid (Top 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialNews.map((item, idx) => {
            const title = lang === 'ne' ? (item.titleNe || item.titleEn) : (item.titleEn || item.titleNe);

            const hasVideo = Boolean(item.videoUrl && item.videoUrl.trim() !== '');
            const videoInfo = hasVideo ? getEmbedVideoInfo(item.videoUrl) : null;
            
            const previewImage = videoInfo?.thumbnailUrl || item.image || '/bijay_pandit_rally.png';

            return (
              <div 
                key={item.id || idx}
                onClick={() => setSelectedNews(item)}
                className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 aspect-[16/11] border border-slate-200 bg-slate-950 flex flex-col justify-between"
              >
                {/* Render Video or Image for Preview */}
                {hasVideo && videoInfo?.type === 'direct' ? (
                  <video 
                    src={videoInfo.src} 
                    muted 
                    preload="metadata" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                ) : (
                  <img
                    src={previewImage}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                )}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20 group-hover:via-slate-950/60 transition-colors"></div>

                {/* Top Bar Badges */}
                <div className="relative z-10 p-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-extrabold backdrop-blur-md border border-white/20">
                    {item.category || 'समाचार'}
                  </span>

                  {hasVideo && (
                    <span className="px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[10px] font-extrabold backdrop-blur-md flex items-center gap-1 shadow-sm">
                      <Video className="w-3 h-3" />
                      <span>भिडियो</span>
                    </span>
                  )}
                </div>

                {/* Center Play Icon if Video exists */}
                {hasVideo && (
                  <div className="relative z-10 inset-0 m-auto w-12 h-12 rounded-full bg-rose-600/95 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border border-white/30">
                    <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                  </div>
                )}

                {/* Bottom Overlay Title & Info */}
                <div className="relative z-10 p-5 space-y-1.5 mt-auto">
                  <div className="flex items-center gap-1.5 text-slate-300 text-[11px] font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    <span>{item.date || '२०८३'}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white leading-snug line-clamp-2 drop-shadow-md group-hover:text-rose-300 transition-colors">
                    {title}
                  </h3>

                  <div className="pt-2 flex items-center justify-between text-xs font-extrabold text-rose-400">
                    <span className="flex items-center gap-1">
                      {hasVideo ? (lang === 'ne' ? 'भिडियो हेर्नुहोस्' : 'Watch Video') : (lang === 'ne' ? 'फोटो / समाचार पढ्नुहोस्' : 'Read Story')}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* See More News Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAllNewsModal(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-400 font-black text-sm sm:text-base border-2 border-rose-200 dark:border-rose-800 shadow-md hover:shadow-xl transition-all group"
          >
            <Grid className="w-5 h-5 text-rose-600" />
            <span>{lang === 'ne' ? `सबै समाचार तथा सूचना हेर्नुहोस् (${newsList.length})` : `See All News & Notices (${newsList.length})`}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-rose-600" />
          </button>
        </div>

      </div>

      {/* Pop-up Modal: See All News */}
      {showAllNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl text-slate-900 dark:text-slate-100 max-h-[90vh] flex flex-col justify-between transition-colors duration-300">
            
            {/* Modal Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-md">
                    <Grid className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {lang === 'ne' ? 'सबै समाचार तथा सूचना सङ्ग्रह' : 'All News & Official Notices Archive'}
                    </h3>
                    <span className="text-xs text-rose-600 font-bold">
                      {lang === 'ne' ? `कुल ${newsList.length} वटा प्रकाशित समाचारहरू` : `Total ${newsList.length} published news articles`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowAllNewsModal(false)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'ne' ? 'समाचारको शीर्षक वा विवरण खोज्नुहोस्...' : 'Search news title or content...'}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Modal Grid List */}
            <div className="overflow-y-auto pr-1 my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredNews.map((item, idx) => {
                const title = lang === 'ne' ? (item.titleNe || item.titleEn) : (item.titleEn || item.titleNe);
                const hasVideo = Boolean(item.videoUrl && item.videoUrl.trim() !== '');
                const videoInfo = hasVideo ? getEmbedVideoInfo(item.videoUrl) : null;
                const previewImage = videoInfo?.thumbnailUrl || item.image || '/bijay_pandit_rally.png';

                return (
                  <div
                    key={item.id || idx}
                    onClick={() => setSelectedNews(item)}
                    className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-[16/11] border border-slate-200 bg-slate-950 flex flex-col justify-between"
                  >
                    <img
                      src={previewImage}
                      alt={title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20"></div>

                    <div className="relative z-10 p-3 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-extrabold backdrop-blur-md">
                        {item.category || 'समाचार'}
                      </span>

                      {hasVideo && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-extrabold flex items-center gap-1">
                          <Video className="w-3 h-3" /> भिडियो
                        </span>
                      )}
                    </div>

                    {hasVideo && (
                      <div className="relative z-10 inset-0 m-auto w-10 h-10 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                      </div>
                    )}

                    <div className="relative z-10 p-3.5 space-y-1 mt-auto">
                      <span className="text-slate-300 text-[10px] font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-rose-400" />
                        <span>{item.date}</span>
                      </span>

                      <h4 className="text-xs sm:text-sm font-black text-white leading-snug line-clamp-2">
                        {title}
                      </h4>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 flex justify-end mt-4">
              <button
                onClick={() => setShowAllNewsModal(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold"
              >
                {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close Window'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* News Article & Video Player Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl text-slate-900 dark:text-slate-100 max-h-[90vh] flex flex-col justify-between transition-colors duration-300">
            
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto space-y-4 pr-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-extrabold">
                  {selectedNews.category || 'समाचार'}
                </span>
                <span className="text-slate-500 text-xs font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-600" />
                  <span>{selectedNews.date}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {lang === 'ne' ? (selectedNews.titleNe || selectedNews.titleEn) : (selectedNews.titleEn || selectedNews.titleNe)}
              </h3>

              {/* Priority 1: Render Video if Video URL exists */}
              {selectedNews.videoUrl && selectedNews.videoUrl.trim() !== '' ? (() => {
                const videoInfo = getEmbedVideoInfo(selectedNews.videoUrl);

                if (!videoInfo) return null;

                if (videoInfo.type === 'direct') {
                  return (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-800">
                      <video controls autoPlay src={videoInfo.src} className="w-full h-full object-contain" />
                    </div>
                  );
                }

                if (videoInfo.type === 'youtube') {
                  return (
                    <div className="space-y-2">
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-800">
                        <iframe
                          className="w-full h-full"
                          src={videoInfo.embedSrc}
                          title={selectedNews.titleNe}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>

                      {videoInfo.watchUrl && (
                        <div className="flex justify-end">
                          <a
                            href={videoInfo.watchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline"
                          >
                            <span>{lang === 'ne' ? 'युट्युबमा सिधै हेर्नुहोस्' : 'Open in YouTube App'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
                    <video controls src={videoInfo.src} className="w-full h-full object-contain" />
                  </div>
                );
              })() : (
                /* Priority 2: If NO Video, Render Photo Image */
                selectedNews.image && selectedNews.image.trim() !== '' && (
                  <div className="rounded-2xl overflow-hidden max-h-[350px] border border-slate-200 bg-slate-100">
                    <img src={selectedNews.image} alt="News" className="w-full h-full object-cover max-h-[350px]" />
                  </div>
                )
              )}

              {/* Article Content */}
              <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {lang === 'ne' 
                    ? (selectedNews.fullContentNe || selectedNews.summaryNe) 
                    : (selectedNews.summaryEn || selectedNews.fullContentNe)}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end mt-4">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold"
              >
                {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
