import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function FullPhotoModal({ product, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141413]/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-10"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button — Always visible inside viewport on mobile & desktop */}
        <div className="w-full flex justify-end mb-3">
          <button
            onClick={onClose}
            className="text-[#9C968E] hover:text-[#FAF8F5] transition flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] py-1 px-2"
          >
            <span>Cerrar [ESC]</span>
            <X className="w-4 h-4 stroke-[1.25]" />
          </button>
        </div>

        {/* Uncropped Full Resolution Photo with Museum Mat */}
        <div className="bg-[#FAF8F5] p-3 sm:p-7 max-h-[72vh] sm:max-h-[76vh] flex items-center justify-center overflow-hidden shadow-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[64vh] sm:max-h-[66vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Exhibition Caption */}
        <div className="mt-4 sm:mt-6 text-center space-y-1 px-2">
          <span className="text-[9px] sm:text-[10px] font-mono text-[#9C968E] uppercase tracking-[0.18em] sm:tracking-[0.22em] block">
            {product.archiveCode || "ARCHIVE"} — {product.location} ({product.year})
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#FAF8F5] tracking-wide">
            {product.title}
          </h3>
          <p className="text-[10px] sm:text-[11px] font-mono text-[#6E6A63] tracking-[0.12em]">
            {product.camera} · {product.film} · 35mm
          </p>
        </div>
      </div>
    </div>
  );
}
