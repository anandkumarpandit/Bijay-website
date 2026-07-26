import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { Image as ImageIcon, Maximize2, Calendar, Tag } from 'lucide-react';

export const MediaGallery = ({ onSelectPhotoIndex }) => {
  const { t, lang } = useLanguage();
  const { galleryData } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('all');

  const photos = galleryData && galleryData.length > 0 ? galleryData : [
    {
      id: '1',
      titleNe: 'युवा, प्रविधि र स्टार्टअप संवाद २०८३',
      titleEn: 'Youth, Innovation & Startup Summit 2026',
      descNe: 'नयाँ बानेश्वरमा हजारौँ युवाहरूको उपस्थितिमा प्रविधिमैत्री रोजगारी र स्टार्टअप कोषबारे सम्बोधन।',
      descEn: 'Bijay Pandit addressing thousands of youth.',
      image: '/bijay_pandit_rally.png',
      category: 'speeches',
      date: 'साउन १५, २०८३'
    },
    {
      id: '2',
      titleNe: 'ज्येष्ठ नागरिक स्वास्थ्य शिविर तथा सम्मान',
      titleEn: 'Senior Citizens Healthcare Camp & Honor',
      descNe: 'स्थानीय वडामा आयोजित निःशुल्क स्वास्थ्य परीक्षण शिविर तथा सम्मान पत्र वितरण।',
      descEn: 'Free medical checkup camp organized for senior elders.',
      image: '/bijay_pandit_portrait.png',
      category: 'gallery',
      date: 'साउन १०, २०८३'
    }
  ];

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  return (
    <section id="media" className="relative py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase tracking-widest border border-rose-200 dark:border-rose-900">
            {t.media.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4 tracking-tight">
            {t.media.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
            {t.media.subtitle}
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, idx) => {
            const title = lang === 'ne' ? (photo.titleNe || photo.titleEn) : (photo.titleEn || photo.titleNe);
            const desc = lang === 'ne' ? (photo.descNe || photo.descEn) : (photo.descEn || photo.descNe);
            const originalIndex = photos.findIndex(p => p.id === photo.id || p.titleNe === photo.titleNe);

            return (
              <div 
                key={photo.id || idx}
                onClick={() => onSelectPhotoIndex(originalIndex !== -1 ? originalIndex : idx)}
                className="bg-white dark:bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                {/* Photo Thumbnail Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={photo.image || '/bijay_pandit_rally.png'}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-lg">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-extrabold backdrop-blur-md border border-white/20">
                    {photo.date || '२०८३'}
                  </div>
                </div>

                {/* Photo Info Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors mb-2 leading-snug">
                      {title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{lang === 'ne' ? 'तस्बिर र विवरण हेर्नुहोस्' : 'View Full Photo & Story'}</span>
                    </span>
                    <span className="p-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
