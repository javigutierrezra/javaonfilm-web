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
      className="fixed inset-0 z-50 bg-[#141413]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 sm:p-12"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-[#9C968E] hover:text-[#FAF8F5] transition flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em]"
        >
          <span>Cerrar [ESC]</span>
          <X className="w-4 h-4 stroke-[1.25]" />
        </button>

        {/* Uncropped Full Resolution Photo with Museum Mat */}
        <div className="bg-[#FAF8F5] p-4 sm:p-8 max-h-[78vh] flex items-center justify-center overflow-hidden shadow-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[68vh] w-auto object-contain"
          />
        </div>

        {/* Exhibition Caption */}
        <div className="mt-6 text-center space-y-1">
          <span className="text-[10px] font-mono text-[#9C968E] uppercase tracking-[0.22em] block">
            {product.archiveCode || "ARCHIVE"} — {product.location} ({product.year})
          </span>
          <h3 className="text-2xl font-serif font-normal text-[#FAF8F5] tracking-wide">
            {product.title}
          </h3>
          <p className="text-[11px] font-mono text-[#6E6A63] tracking-[0.12em]">
            {product.camera} · {product.film} · 35mm
          </p>
        </div>
      </div>
    </div>
  );
}
