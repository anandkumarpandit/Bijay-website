import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Image as ImageIcon } from 'lucide-react';

export const GalleryPageModal = ({ isOpen, selectedPhotoIndex, onClose, onSelectPhotoIndex }) => {
  const { lang } = useLanguage();
  const { galleryData } = useAdmin();

  if (!isOpen || selectedPhotoIndex === null || !galleryData || galleryData.length === 0) return null;

  const photo = galleryData[selectedPhotoIndex] || galleryData[0];

  const handlePrev = () => {
    const prevIdx = (selectedPhotoIndex - 1 + galleryData.length) % galleryData.length;
    onSelectPhotoIndex(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = (selectedPhotoIndex + 1) % galleryData.length;
    onSelectPhotoIndex(nextIdx);
  };

  const title = lang === 'ne' ? (photo.titleNe || photo.titleEn) : (photo.titleEn || photo.titleNe);
  const desc = lang === 'ne' ? (photo.descNe || photo.descEn) : (photo.descEn || photo.descNe);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-lg animate-fadeIn">
      
      {/* Outer Card Container */}
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden border border-slate-200 shadow-2xl relative flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white shadow-lg transition-transform hover:scale-110"
          title="Close Photo View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo Viewport */}
        <div className="relative w-full md:w-3/5 bg-slate-950 flex items-center justify-center min-h-[280px] sm:min-h-[380px] overflow-hidden group">
          <img
            src={photo.image || '/bijay_pandit_rally.png'}
            alt={title}
            className="w-full h-full object-cover object-center max-h-[550px]"
          />
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none"></div>

          {/* Navigation Arrows */}
          {galleryData.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all hover:scale-110"
                title="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all hover:scale-110"
                title="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Photo Counter Badge */}
          <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-bold backdrop-blur-md border border-white/20">
            {selectedPhotoIndex + 1} / {galleryData.length}
          </div>
        </div>

        {/* Right Side: Detailed Photo Story Page */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            {/* Category Tag & Date */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-extrabold border border-rose-200 uppercase tracking-wider">
                <Tag className="w-3 h-3" />
                <span>{photo.category || 'ग्यालरी'}</span>
              </span>

              {photo.date && (
                <span className="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-rose-600" />
                  <span>{photo.date}</span>
                </span>
              )}
            </div>

            {/* Photo Title */}
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-4">
              {title}
            </h3>

            {/* Full Story Description */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                {desc}
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-bold">
            <span className="flex items-center gap-1.5 text-rose-600">
              <ImageIcon className="w-4 h-4" />
              <span>विजय पण्डित आधिकारिक ग्यालरी</span>
            </span>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold transition-colors"
            >
              {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
