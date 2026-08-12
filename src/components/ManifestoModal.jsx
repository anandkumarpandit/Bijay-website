import React from 'react';
import { X } from 'lucide-react';

export const ManifestoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md animate-fadeIn p-2 sm:p-6">
      <div className="relative w-full h-full max-w-5xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 flex flex-col">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer flex items-center justify-center shadow-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pure PDF Viewer Overlay */}
        <iframe
          src="/manifestobijay.pdf#toolbar=1"
          title="Bijay Pandit Manifesto PDF"
          className="w-full h-full border-none"
        ></iframe>

      </div>
    </div>
  );
};
