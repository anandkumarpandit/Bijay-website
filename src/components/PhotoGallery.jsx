import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { Maximize2, Calendar, ArrowRight, Grid, X, Search } from 'lucide-react';

export const PhotoGallery = ({ onSelectPhotoIndex }) => {
  const { lang } = useLanguage();
  const { galleryData } = useAdmin();
  
  const [showAllGalleryModal, setShowAllGalleryModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const photos = galleryData && galleryData.length > 0 ? galleryData : [];
  
  // Show top 3 on front grid
  const initialPhotos = photos.slice(0, 3);

  // Filtered list for "See All Gallery" search
  const filteredPhotos = photos.filter(photo => {
    const title = (photo.titleNe || '') + ' ' + (photo.titleEn || '');
    const desc = (photo.descNe || '') + ' ' + (photo.descEn || '');
    return title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           desc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section id="gallery" className="relative py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase tracking-widest border border-rose-200 dark:border-rose-900">
            {lang === 'ne' ? 'फोटो ग्यालरी' : 'PHOTO GALLERY'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3 mb-3 tracking-tight">
            {lang === 'ne' ? 'विजय पण्डित मिडिया र तस्बिरहरू' : 'Bijay Pandit Activity Photo Gallery'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium">
            {lang === 'ne' 
              ? 'विजय पण्डितका महत्वपूर्ण कार्यक्रम, भ्रमण तथा तस्बिरहरू (तस्बिर क्लिक गरी विस्तृत विवरण हेर्नुहोस्)' 
              : 'Explore activity photos and click on any photo to read full description and details.'}
          </p>
        </div>

        {/* Compact Media Cards Grid (Top 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialPhotos.map((photo, idx) => {
            const title = lang === 'ne' ? (photo.titleNe || photo.titleEn) : (photo.titleEn || photo.titleNe);

            return (
              <div 
                key={photo.id || idx}
                onClick={() => onSelectPhotoIndex(idx)}
                className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 aspect-[16/11] border border-slate-200 bg-slate-950 flex flex-col justify-between"
              >
                {/* Background Image */}
                <img
                  src={photo.image || '/bijay_pandit_rally.png'}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20 group-hover:via-slate-950/60 transition-colors"></div>

                {/* Top Date Badge */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-extrabold backdrop-blur-md border border-white/20">
                    {photo.category || 'ग्यालरी'}
                  </span>

                  <span className="p-2 rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                {/* Bottom Overlay Title & Details */}
                <div className="relative z-10 p-5 space-y-1.5 mt-auto">
                  {photo.date && (
                    <div className="flex items-center gap-1.5 text-slate-300 text-[11px] font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      <span>{photo.date}</span>
                    </div>
                  )}

                  <h3 className="text-base sm:text-lg font-black text-white leading-snug line-clamp-2 drop-shadow-md group-hover:text-rose-300 transition-colors">
                    {title}
                  </h3>

                  <div className="pt-2 flex items-center justify-between text-xs font-extrabold text-rose-400">
                    <span>{lang === 'ne' ? 'फोटो र विवरण हेर्नुहोस्' : 'Open Photo & Story'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* See More Photo Gallery Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAllGalleryModal(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-rose-600 font-black text-sm sm:text-base border-2 border-rose-200 shadow-md hover:shadow-xl transition-all group"
          >
            <Grid className="w-5 h-5 text-rose-600" />
            <span>{lang === 'ne' ? `सबै फोटो ग्यालरी हेर्नुहोस् (${photos.length})` : `See All Photo Gallery (${photos.length})`}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-rose-600" />
          </button>
        </div>

      </div>

      {/* Pop-up Modal: See All Photo Gallery */}
      {showAllGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-white w-full max-w-5xl rounded-3xl border border-slate-200 p-6 sm:p-8 relative overflow-hidden shadow-2xl text-slate-900 max-h-[90vh] flex flex-col justify-between">
            
            {/* Modal Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-md">
                    <Grid className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {lang === 'ne' ? 'सबै फोटो ग्यालरी सङ्ग्रह' : 'All Photo Gallery Collection'}
                    </h3>
                    <span className="text-xs text-rose-600 font-bold">
                      {lang === 'ne' ? `कुल ${photos.length} वटा ग्यालरी तस्बिरहरू` : `Total ${photos.length} gallery photos`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowAllGalleryModal(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200"
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
                  placeholder={lang === 'ne' ? 'तस्बिरको शीर्षक वा विवरण खोज्नुहोस्...' : 'Search photo title or description...'}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Modal Grid List */}
            <div className="overflow-y-auto pr-1 my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredPhotos.map((photo, idx) => {
                const title = lang === 'ne' ? (photo.titleNe || photo.titleEn) : (photo.titleEn || photo.titleNe);
                const originalIndex = photos.findIndex(p => p.id === photo.id);

                return (
                  <div
                    key={photo.id || idx}
                    onClick={() => {
                      setShowAllGalleryModal(false);
                      onSelectPhotoIndex(originalIndex >= 0 ? originalIndex : idx);
                    }}
                    className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-[16/11] border border-slate-200 bg-slate-950 flex flex-col justify-between"
                  >
                    <img
                      src={photo.image || '/bijay_pandit_rally.png'}
                      alt={title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20"></div>

                    <div className="relative z-10 p-3 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-extrabold backdrop-blur-md">
                        {photo.category || 'ग्यालरी'}
                      </span>

                      <span className="p-1.5 rounded-full bg-white/20 text-white backdrop-blur-md">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="relative z-10 p-3.5 space-y-1 mt-auto">
                      {photo.date && (
                        <span className="text-slate-300 text-[10px] font-semibold flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-rose-400" />
                          <span>{photo.date}</span>
                        </span>
                      )}

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
                onClick={() => setShowAllGalleryModal(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
              >
                {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close Window'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
