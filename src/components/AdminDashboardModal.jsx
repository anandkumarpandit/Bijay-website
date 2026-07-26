import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Save, LogOut, Plus, Trash2, Edit3, CheckCircle2, UserCheck, Calendar, BookOpen, FileText, Image as ImageIcon, Newspaper, Upload, Video } from 'lucide-react';

export const AdminDashboardModal = ({ isOpen, onClose }) => {
  const { 
    aboutData, updateAboutData, 
    manifestoData, updateManifestoData, 
    galleryData, updateGalleryData,
    newsData, updateNewsData,
    logoutAdmin 
  } = useAdmin();

  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'manifesto' | 'gallery' | 'news'

  const [aboutForm, setAboutForm] = useState(aboutData);
  const [manifestoForm, setManifestoForm] = useState(manifestoData);
  const [galleryForm, setGalleryForm] = useState(galleryData || []);
  const [newsForm, setNewsForm] = useState(newsData || []);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state whenever modal opens or context updates
  useEffect(() => {
    if (isOpen) {
      setAboutForm({
        ...aboutData,
        image: aboutData?.image || '/bijay_pandit_portrait.png',
        videoUrl: aboutData?.videoUrl || ''
      });
      setManifestoForm(manifestoData);
      setGalleryForm(galleryData || []);
      setNewsForm(newsData || []);
    }
  }, [isOpen, aboutData, manifestoData, galleryData, newsData]);

  if (!isOpen) return null;

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    try {
      await updateAboutData(aboutForm);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving about data:', err);
      alert('डाटा सेभ गर्दा समस्या आयो। (Error saving data)');
    }
  };

  const handleSaveManifesto = async (e) => {
    e.preventDefault();
    try {
      await updateManifestoData(manifestoForm);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving manifesto data:', err);
      alert('डाटा सेभ गर्दा समस्या आयो। (Error saving data)');
    }
  };

  const handleSaveGallery = async (e) => {
    e.preventDefault();
    try {
      await updateGalleryData(galleryForm);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving gallery data:', err);
      alert('डाटा सेभ गर्दा समस्या आयो। (Error saving data)');
    }
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    try {
      await updateNewsData(newsForm);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving news data:', err);
      alert('डाटा सेभ गर्दा समस्या आयो। (Error saving data)');
    }
  };

  // Home Hero Leader Image Upload
  const handleHeroPhotoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAboutForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Home Hero Leader Video File Upload
  const handleHeroVideoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAboutForm(prev => ({ ...prev, videoUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleTimelineChange = (index, field, value) => {
    const updated = [...aboutForm.timeline];
    updated[index][field] = value;
    setAboutForm({ ...aboutForm, timeline: updated });
  };

  const addTimelineItem = () => {
    const newItems = [
      ...aboutForm.timeline,
      { year: '२०८३ - नयाँ', title: 'नयाँ योजना/अभियान', desc: 'यस योजनाको विस्तृत विवरण यहाँ थप्नुहोस्।' }
    ];
    setAboutForm({ ...aboutForm, timeline: newItems });
  };

  const deleteTimelineItem = (index) => {
    const updated = aboutForm.timeline.filter((_, i) => i !== index);
    setAboutForm({ ...aboutForm, timeline: updated });
  };

  const handleGalleryChange = (index, field, value) => {
    const updated = [...galleryForm];
    updated[index][field] = value;
    setGalleryForm(updated);
  };

  const handleGalleryFileUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleGalleryChange(index, 'image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addGalleryItem = () => {
    const newPhoto = {
      id: Date.now().toString(),
      titleNe: 'नयाँ ग्यालरी तस्बिर',
      titleEn: 'New Gallery Photo',
      descNe: 'यस तस्बिरको विस्तृत विवरण र सन्देश यहाँ लेख्नुहोस्...',
      descEn: 'Write the story and detailed description for this photo here...',
      image: '/bijay_pandit_rally.png',
      category: 'ग्यालरी',
      date: 'साउन २०, २०८३'
    };
    setGalleryForm([...galleryForm, newPhoto]);
  };

  const deleteGalleryItem = (index) => {
    const updated = galleryForm.filter((_, i) => i !== index);
    setGalleryForm(updated);
  };

  const handleNewsChange = (index, field, value) => {
    const updated = [...newsForm];
    updated[index][field] = value;
    setNewsForm(updated);
  };

  const handleNewsFileUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleNewsChange(index, 'image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleNewsVideoFileUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleNewsChange(index, 'videoUrl', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addNewsItem = () => {
    const newNews = {
      id: Date.now().toString(),
      titleNe: 'नयाँ समाचार तथा प्रेस विज्ञप्ति',
      titleEn: 'New News & Press Release',
      category: 'मुख्य समाचार',
      date: 'साउन २०, २०८३',
      summaryNe: 'समाचारको छोटो सारांश यहाँ लेख्नुहोस्...',
      summaryEn: 'Write a short summary of the news here...',
      fullContentNe: 'समाचारको विस्तृत विवरण र मुख्य बुँदाहरू यहाँ सम्पादन गर्नुहोस्...',
      image: '/bijay_pandit_rally.png',
      videoUrl: ''
    };
    setNewsForm([...newsForm, newNews]);
  };

  const deleteNewsItem = (index) => {
    const updated = newsForm.filter((_, i) => i !== index);
    setNewsForm(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl border border-slate-200 p-6 sm:p-8 relative overflow-hidden shadow-2xl text-slate-900 flex flex-col justify-between">
        
        {/* Header & Tabs */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-md">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {lang === 'ne' ? 'सचिवालय एडमिन बोर्ड' : 'Secretariat Admin Board'}
                </h3>
                <span className="text-xs text-rose-600 font-bold">
                  {lang === 'ne' ? 'विजय पण्डित डिजिटल व्यवस्थापन' : 'Bijay Pandit Content Management'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { logoutAdmin(); onClose(); }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>{lang === 'ne' ? 'लगआउट' : 'Logout'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                activeTab === 'about'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>१. गृह पृष्ठ (Home Photo & Video)</span>
            </button>

            <button
              onClick={() => setActiveTab('manifesto')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                activeTab === 'manifesto'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>२. चुनावी संकल्प पत्र</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                activeTab === 'gallery'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>३. फोटो ग्यालरी बोर्ड</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                activeTab === 'news'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>४. समाचार तथा सूचना बोर्ड</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="my-2 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-3 shadow-sm animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ne' ? 'डाटा सफलतापूर्वक सेभ तथा अपडेट भयो!' : 'Data Saved & Updated Successfully!'}</span>
          </div>
        )}

        {/* Tab 1: About & Bio Form */}
        {activeTab === 'about' && (
          <form onSubmit={handleSaveAbout} className="py-2 overflow-y-auto space-y-6 pr-2">
            
            {/* Leader Name, Photo & Video Form */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-rose-600" />
                <span>गृह पृष्ठ नेता प्रोफाइल, फोटो र भिडियो (Home Photo & Video Editor)</span>
              </h4>

              {/* 1. Leader Photo Upload */}
              <div className="bg-white p-4 rounded-xl border border-slate-300 space-y-2 shadow-sm">
                <label className="block text-xs font-black text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-rose-600">
                    <ImageIcon className="w-4 h-4" />
                    <span>१. गृह पृष्ठको लागि फोटो (Home Leader Photo)</span>
                  </span>
                  {aboutForm?.image && (
                    <span className="text-[11px] text-emerald-600 font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> फोटो उपलब्ध छ
                    </span>
                  )}
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer transition-colors flex-shrink-0 shadow-sm">
                    <Upload className="w-4 h-4" />
                    <span>फोन/कम्प्युटरबाट नयाँ फोटो हाल्नुहोस्</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleHeroPhotoUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </label>

                  <span className="text-slate-400 text-xs font-bold">वा Photo URL:</span>

                  <input
                    type="text"
                    value={aboutForm?.image || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, image: e.target.value })}
                    placeholder="/bijay_pandit_portrait.png"
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-mono"
                  />
                </div>

                {aboutForm?.image && (
                  <div className="mt-2 w-20 h-24 rounded-xl overflow-hidden border border-slate-300 bg-slate-200">
                    <img src={aboutForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* 2. Leader Video Upload / YouTube URL */}
              <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-3 shadow-sm">
                <label className="block text-xs font-black text-rose-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <Video className="w-4 h-4" />
                    <span>२. गृह पृष्ठको लागि भिडियो (Home Leader Video)</span>
                  </span>
                  {aboutForm?.videoUrl && (
                    <span className="text-[11px] text-emerald-600 font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> भिडियो सेट छ
                    </span>
                  )}
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors flex-shrink-0 shadow-sm">
                    <Upload className="w-4 h-4 text-rose-500" />
                    <span>फोन/कम्प्युटरबाट भिडियो फाइल हाल्नुहोस्</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleHeroVideoUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </label>

                  <span className="text-slate-400 text-xs font-bold">वा YouTube Link:</span>

                  <input
                    type="text"
                    value={aboutForm?.videoUrl?.startsWith('data:video/') ? '' : (aboutForm?.videoUrl || '')}
                    onChange={(e) => setAboutForm({ ...aboutForm, videoUrl: e.target.value })}
                    placeholder={
                      aboutForm?.videoUrl?.startsWith('data:video/')
                        ? '[अपलोड गरिएको भिडियो फाइल सेट छ]'
                        : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                    }
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-mono"
                  />
                </div>

                {aboutForm?.videoUrl && (
                  <div className="mt-2 p-3 bg-white rounded-xl border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    {aboutForm.videoUrl.startsWith('data:video/') ? (
                      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                        <video
                          src={aboutForm.videoUrl}
                          controls
                          className="w-full sm:w-48 h-28 rounded-lg object-contain bg-black"
                        />
                        <div className="text-xs text-slate-700 font-bold space-y-1">
                          <p className="text-emerald-700 font-extrabold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> भिडियो फाइल सेभ गर्न तयार छ
                          </p>
                          <p className="text-[11px] text-slate-500 font-normal">
                            IndexedDB भण्डारण क्षमताद्वारा सुरक्षित रूपमा सेभ हुन्छ।
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-700 font-semibold font-mono truncate max-w-md">
                        🔗 {aboutForm.videoUrl}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setAboutForm({ ...aboutForm, videoUrl: '' })}
                      className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold transition-colors flex-shrink-0"
                    >
                      हटाउनुहोस् (Clear)
                    </button>
                  </div>
                )}
              </div>

              {/* Name and Subtitle Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">नेताको नाम (नेपाली) *</label>
                  <input
                    type="text"
                    required
                    value={aboutForm?.nameNe || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, nameNe: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Leader Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={aboutForm?.nameEn || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, nameEn: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">भूमिका / उपशीर्षक (नेपाली)</label>
                  <input
                    type="text"
                    value={aboutForm?.roleNe || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, roleNe: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Role / Subtitle (English)</label>
                  <input
                    type="text"
                    value={aboutForm?.roleEn || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, roleEn: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">मुख्य नारा / Tagline (नेपाली)</label>
                <textarea
                  rows={2}
                  value={aboutForm?.taglineNe || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, taglineNe: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                />
              </div>

            </div>

            {/* Timeline Board */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-600" />
                  <span>जीवनी कार्ययात्रा बोर्ड (Timeline Milestones)</span>
                </h4>

                <button
                  type="button"
                  onClick={addTimelineItem}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>नयाँ वर्ष थप्नुहोस्</span>
                </button>
              </div>

              <div className="space-y-4">
                {aboutForm?.timeline?.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 relative space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        माइलस्टोन #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteTimelineItem(idx)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600">वर्ष (Year)</label>
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => handleTimelineChange(idx, 'year', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs font-bold"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-600">शीर्षक (Title)</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600">विवरण (Description)</label>
                      <textarea
                        rows={2}
                        value={item.desc}
                        onChange={(e) => handleTimelineChange(idx, 'desc', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md transition-transform flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{lang === 'ne' ? 'गृह पृष्ठ फोटो र भिडियो डाटा सेभ गर्नुहोस्' : 'Save Home Photo & Video'}</span>
            </button>
          </form>
        )}

        {/* Tab 2: Manifesto Editor Board */}
        {activeTab === 'manifesto' && (
          <form onSubmit={handleSaveManifesto} className="py-2 overflow-y-auto space-y-6 pr-2">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-600" />
                <span>चुनावी संकल्प पत्र सम्पादन फारम (Manifesto Content Editor)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">संकल्प पत्र शीर्षक (नेपाली)</label>
                  <input
                    type="text"
                    value={manifestoForm.titleNe}
                    onChange={(e) => setManifestoForm({ ...manifestoForm, titleNe: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Manifesto Title (English)</label>
                  <input
                    type="text"
                    value={manifestoForm.titleEn}
                    onChange={(e) => setManifestoForm({ ...manifestoForm, titleEn: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">संक्षिप्त सारांश (Summary)</label>
                <textarea
                  rows={2}
                  value={manifestoForm.summaryNe}
                  onChange={(e) => setManifestoForm({ ...manifestoForm, summaryNe: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  विस्तृत संकल्प पत्र बुँदाहरू (Full Manifesto Points for PDF Download) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={manifestoForm.contentNe}
                  onChange={(e) => setManifestoForm({ ...manifestoForm, contentNe: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono leading-relaxed"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md transition-transform flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{lang === 'ne' ? 'चुनावी संकल्प पत्र सेभ र प्रकाशित गर्नुहोस्' : 'Save & Publish Manifesto'}</span>
            </button>
          </form>
        )}

        {/* Tab 3: Gallery Editor Board */}
        {activeTab === 'gallery' && (
          <form onSubmit={handleSaveGallery} className="py-2 overflow-y-auto space-y-6 pr-2">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-rose-600" />
                  <span>फोटो तथा ग्यालरी व्यवस्थापन बोर्ड (Phone Upload & Image URL)</span>
                </h4>

                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-sm hover:bg-rose-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>नयाँ फोटो थप्नुहोस्</span>
                </button>
              </div>

              <div className="space-y-4">
                {galleryForm.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                        तस्बिर #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteGalleryItem(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">तस्बिरको शीर्षक (Title)</label>
                        <input
                          type="text"
                          required
                          value={item.titleNe}
                          onChange={(e) => handleGalleryChange(idx, 'titleNe', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">मिति (Date)</label>
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) => handleGalleryChange(idx, 'date', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                        />
                      </div>
                    </div>

                    {/* Phone Image Upload & URL Row */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                      <label className="block text-[11px] font-extrabold text-slate-800 flex items-center justify-between">
                        <span>१. फोन / कम्प्युटरबाट फोटो छान्नुहोस् (Upload Photo from Device)</span>
                        {item.image && (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> फोटो सेट भयो
                          </span>
                        )}
                      </label>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer transition-colors flex-shrink-0">
                          <Upload className="w-4 h-4 text-rose-600" />
                          <span>फोनबाट फोटो अपलोड गर्नुहोस्</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleGalleryFileUpload(idx, e.target.files[0])}
                            className="hidden"
                          />
                        </label>

                        <span className="text-slate-400 text-xs font-bold">वा URL:</span>

                        <input
                          type="text"
                          value={item.image}
                          onChange={(e) => handleGalleryChange(idx, 'image', e.target.value)}
                          placeholder="https://example.com/photo.jpg वा /bijay_pandit_rally.png"
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
                        />
                      </div>

                      {/* Image Thumbnail Preview */}
                      {item.image && (
                        <div className="mt-2 w-20 h-16 rounded-xl overflow-hidden border border-slate-300 bg-slate-200">
                          <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        विस्तृत विवरण तथा सन्देश (Full Description & Story) *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={item.descNe}
                        onChange={(e) => handleGalleryChange(idx, 'descNe', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs leading-relaxed"
                      />
                    </div>

                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md transition-transform flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{lang === 'ne' ? 'ग्यालरी फोटो तथा विवरण सेभ गर्नुहोस्' : 'Save Gallery Board'}</span>
            </button>
          </form>
        )}

        {/* Tab 4: News & Notices Editor Board */}
        {activeTab === 'news' && (
          <form onSubmit={handleSaveNews} className="py-2 overflow-y-auto space-y-6 pr-2">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-rose-600" />
                  <span>समाचार, फोटो तथा भिडियो व्यवस्थापन (Video Upload / YouTube Link)</span>
                </h4>

                <button
                  type="button"
                  onClick={addNewsItem}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-sm hover:bg-rose-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>नयाँ समाचार थप्नुहोस्</span>
                </button>
              </div>

              <div className="space-y-4">
                {newsForm.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                        समाचार लेख #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteNewsItem(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete News Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">समाचारको शीर्षक (News Title) *</label>
                        <input
                          type="text"
                          required
                          value={item.titleNe}
                          onChange={(e) => handleNewsChange(idx, 'titleNe', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">मिति (Date)</label>
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) => handleNewsChange(idx, 'date', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">श्रेणी / Category</label>
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => handleNewsChange(idx, 'category', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>

                    {/* Video Upload from Phone/System or YouTube URL */}
                    <div className="bg-rose-50/70 p-3.5 rounded-xl border border-rose-200 space-y-2">
                      <label className="block text-[11px] font-extrabold text-rose-900 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Video className="w-4 h-4 text-rose-600" />
                          <span>भिडियो थप्नुहोस् (Upload Video file from device OR YouTube URL)</span>
                        </span>
                        {item.videoUrl && (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> भिडियो सेट भयो
                          </span>
                        )}
                      </label>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer transition-colors flex-shrink-0 shadow-sm">
                          <Upload className="w-4 h-4" />
                          <span>फोन/कम्प्युटरबाट भिडियो अपलोड गर्नुहोस्</span>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleNewsVideoFileUpload(idx, e.target.files[0])}
                            className="hidden"
                          />
                        </label>

                        <span className="text-slate-400 text-xs font-bold">वा YouTube Link:</span>

                        <input
                          type="text"
                          value={item.videoUrl?.startsWith('data:video/') ? '' : (item.videoUrl || '')}
                          onChange={(e) => handleNewsChange(idx, 'videoUrl', e.target.value)}
                          placeholder={
                            item.videoUrl?.startsWith('data:video/')
                              ? '[भिडियो फाइल अपलोड सेट भयो]'
                              : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                          }
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
                        />
                      </div>

                      {item.videoUrl && (
                        <div className="mt-2 p-2 bg-white rounded-xl border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-2">
                          {item.videoUrl.startsWith('data:video/') ? (
                            <div className="flex items-center gap-2">
                              <video src={item.videoUrl} controls className="w-36 h-20 rounded bg-black object-contain" />
                              <span className="text-xs text-emerald-700 font-bold">स्थानीय भिडियो फाइल लोड भयो</span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-700 font-mono truncate max-w-xs">{item.videoUrl}</span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleNewsChange(idx, 'videoUrl', '')}
                            className="px-2.5 py-1 rounded bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold"
                          >
                            हटाउनुहोस् (Clear)
                          </button>
                        </div>
                      )}
                    </div>

                    {/* News Photo Upload & URL Row */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                      <label className="block text-[11px] font-extrabold text-slate-800 flex items-center justify-between">
                        <span>समाचार थम्बनेल तस्बिर (News Photo URL or Upload)</span>
                        {item.image && (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> तस्बिर सेट भयो
                          </span>
                        )}
                      </label>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer transition-colors flex-shrink-0">
                          <Upload className="w-4 h-4 text-rose-600" />
                          <span>तस्बिर छान्नुहोस् (Upload)</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleNewsFileUpload(idx, e.target.files[0])}
                            className="hidden"
                          />
                        </label>

                        <span className="text-slate-400 text-xs font-bold">वा URL:</span>

                        <input
                          type="text"
                          value={item.image || ''}
                          onChange={(e) => handleNewsChange(idx, 'image', e.target.value)}
                          placeholder="/bijay_pandit_rally.png"
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">संक्षिप्त सारांश (Summary)</label>
                      <textarea
                        rows={2}
                        value={item.summaryNe}
                        onChange={(e) => handleNewsChange(idx, 'summaryNe', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        विस्तृत समाचार सामग्री (Full Article Content) *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={item.fullContentNe}
                        onChange={(e) => handleNewsChange(idx, 'fullContentNe', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs leading-relaxed"
                      />
                    </div>

                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md transition-transform flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{lang === 'ne' ? 'समाचार तथा सूचना सेभ र प्रकाशित गर्नुहोस्' : 'Save & Publish News'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
