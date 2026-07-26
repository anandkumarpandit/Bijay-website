import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AdminProvider } from './context/AdminContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Biography } from './components/Biography';
import { VisionPolicy } from './components/VisionPolicy';
import { AchievementsImpact } from './components/AchievementsImpact';
import { NewsNotices } from './components/NewsNotices';
import { PhotoGallery } from './components/PhotoGallery';
import { TownHallEvents } from './components/TownHallEvents';
import { PublicServicesDownloads } from './components/PublicServicesDownloads';
import { CitizenVoiceForm } from './components/CitizenVoiceForm';
import { VolunteerModal } from './components/VolunteerModal';
import { DonateModal } from './components/DonateModal';
import { ManifestoModal } from './components/ManifestoModal';
import { GalleryPageModal } from './components/GalleryPageModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Footer } from './components/Footer';

export function MainContent() {
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const handleOpenPhotoPage = (index) => {
    setSelectedPhotoIndex(index);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-rose-500 selection:text-white transition-colors duration-300">
      <Navbar
        onOpenVolunteer={() => setIsVolunteerOpen(true)}
        onOpenDonate={() => setIsDonateOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      <main>
        <Hero
          onOpenVolunteer={() => setIsVolunteerOpen(true)}
          onOpenManifesto={() => setIsManifestoOpen(true)}
        />
        <Biography />
        <VisionPolicy />
        <AchievementsImpact />
        <NewsNotices />
        <PhotoGallery
          onSelectPhotoIndex={handleOpenPhotoPage}
        />
        <TownHallEvents />
        <PublicServicesDownloads
          onOpenManifesto={() => setIsManifestoOpen(true)}
        />
        <CitizenVoiceForm />
      </main>

      <Footer />

      {/* Modals */}
      <VolunteerModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
      />

      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />

      <ManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

      <GalleryPageModal
        photoIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => setIsAdminDashboardOpen(true)}
      />

      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdminProvider>
          <MainContent />
        </AdminProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
