import React from 'react';
import { X } from 'lucide-react';

export default function FullPhotoModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
      <div class="relative max-w-5xl w-full flex flex-col items-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          class="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition flex items-center gap-1.5 text-xs font-bold"
        >
          <X class="w-5 h-5" />
          <span>Cerrar</span>
        </button>

        {/* Uncropped Full Resolution Photo */}
        <div class="bg-black/40 p-2 rounded-2xl border border-white/10 max-h-[80vh] flex items-center justify-center overflow-hidden shadow-2xl">
          <img
            src={product.image}
            alt={product.title}
            class="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Travel Specs Subtitle */}
        <div class="mt-4 text-center text-white space-y-1">
          <h3 class="text-xl font-bold font-serif">{product.title}</h3>
          <p class="text-xs text-indigo-200 font-medium">
            {product.location} · {product.camera} · {product.film} ({product.year})
          </p>
        </div>

      </div>
    </div>
  );
}
