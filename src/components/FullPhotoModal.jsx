import React from 'react';
import { X } from 'lucide-react';

export default function FullPhotoModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#181411]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="relative max-w-5xl w-full flex flex-col items-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition flex items-center gap-1.5 text-xs font-mono"
        >
          <X className="w-5 h-5 text-[#C85A32]" />
          <span>CERRAR [ESC]</span>
        </button>

        {/* Uncropped Full Resolution Photo with Passpartout Mat */}
        <div className="bg-[#FAF6EE] p-3 sm:p-4 rounded-xl border border-[#362317] max-h-[80vh] flex items-center justify-center overflow-hidden shadow-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[72vh] w-auto object-contain shadow-md"
          />
        </div>

        {/* Travel Specs Subtitle */}
        <div className="mt-4 text-center text-[#DFCEB5] space-y-1">
          <div className="text-xs font-mono text-[#C85A32] uppercase tracking-wider font-bold">
            {product.archiveCode || "PHOTO"} · {product.location}
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#FAF6EE]">{product.title}</h3>
          <p className="text-xs font-mono text-[#A99D92]">
            35MM / {product.film} · {product.camera} · {product.year}
          </p>
        </div>

      </div>
    </div>
  );
}
