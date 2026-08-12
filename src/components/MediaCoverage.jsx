import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const MediaCoverage = () => {
  const { lang } = useLanguage();
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const scrollRef = useRef(null);

  // Sample media interviews list
  const mediaList = [
    {
      id: 1,
      titleNe: "विश्रामपुरको विकास, सुशासन र युवा नेतृत्वबारे विजय पण्डितको विशेष अन्तरवार्ता",
      titleEn: "Exclusive Fireside Interview with Bijay Pandit on Local Governance & Youth Leadership",
      source: "YOUTUBE • FIRESIDE",
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 2,
      titleNe: "भ्रष्टाचार निवारण र पारदर्शी बजेटबारे विजय पण्डितसँग बहस",
      titleEn: "Rapid Fireside Discussion on Anti-Corruption & Transparent Ward Budgeting",
      source: "YOUTUBE • RECENT",
      thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 3,
      titleNe: "जनताको प्रश्न, विजय पण्डितको उत्तर - वडा अध्यक्षको कार्ययोजना",
      titleEn: "People's Voice & Direct Dialogue: Comprehensive Action Plan for Ward No. 5",
      source: "YOUTUBE • DIALOGUE",
      thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 4,
      titleNe: "शिक्षा, स्वास्थ्य र रोजगार - परिवर्तनको ५ वर्षे दूरदृष्टि",
      titleEn: "Education, Healthcare & Jobs: 5-Year Vision for Community Transformation",
      source: "YOUTUBE • SPECIAL",
      thumbnail: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="media" className="relative py-16 lg:py-24 bg-[#042c64] dark:bg-[#021b3e] text-white overflow-hidden transition-colors duration-300">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-extrabold uppercase tracking-widest text-cyan-300/90 mb-1.5">
            {lang === 'ne' ? 'अन्तरवार्ता तथा मिडिया चर्चा' : 'INTERVIEWS & DISCUSSIONS'}
          </p>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            {lang === 'ne' ? 'मिडिया कभरेज' : 'Media Coverage'}
          </h2>

          <div className="w-12 h-1 bg-amber-400 rounded-full mx-auto"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel px-2 sm:px-6">
          
          {/* Navigation Buttons (Left / Right) */}
          <button
            onClick={scrollLeft}
            className="absolute -left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 border border-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 cursor-pointer shadow-2xl"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 border border-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 cursor-pointer shadow-2xl"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal Scrollable Track */}
          <div 
            ref={scrollRef}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 scroll-smooth"
          >
            {mediaList.map((item) => {
              const itemTitle = lang === 'ne' ? item.titleNe : item.titleEn;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveVideoUrl(item.videoUrl)}
                  className="snap-start flex-shrink-0 w-[270px] sm:w-[320px] group bg-slate-900/70 rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={item.thumbnail}
                      alt={itemTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    />

                    {/* Dark Overlay Tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Circular Translucent Play Button Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-md border border-white/40 group-hover:bg-cyan-400 group-hover:text-slate-950 text-white flex items-center justify-center transition-all duration-300 shadow-2xl group-hover:scale-110">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {/* Source Tag Badge */}
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md border border-white/15 text-[9px] font-extrabold uppercase tracking-widest text-slate-300">
                      {item.source}
                    </div>
                  </div>

                  {/* Title Info */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug group-hover:text-amber-300 transition-colors line-clamp-2">
                      {itemTitle}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            <span className="w-6 h-1.5 bg-amber-400 rounded-full transition-all"></span>
            <span className="w-1.5 h-1.5 bg-white/30 rounded-full transition-all"></span>
            <span className="w-1.5 h-1.5 bg-white/30 rounded-full transition-all"></span>
          </div>

        </div>

      </div>

      {/* Video Popup Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-white/15 shadow-2xl p-4 sm:p-6">
            
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-video rounded-2xl overflow-hidden mt-8 bg-black">
              <iframe
                src={activeVideoUrl}
                title="Media Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
