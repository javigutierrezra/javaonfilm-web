import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Maximize2 } from 'lucide-react';

export default function ProductCard({ product, onOpenZoom }) {
  const navigate = useNavigate();

  const placeName = product.place || product.location?.split(',')[0] || '';
  const countryName = product.country || product.location?.split(',')[1]?.trim() || '';

  return (
    <article className="group flex flex-col">
      
      {/* Fine Art Exhibition Mat Container */}
      <div
        onClick={() => navigate(`/prints/${product.id}`)}
        className="relative aspect-[4/5] bg-[#F4F0EA] border border-[#E6E1DA] px-5 py-9 sm:p-9 flex items-center justify-center cursor-pointer transition-colors duration-500 group-hover:bg-[#EFEAE2]"
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_8px_24px_rgba(20,20,19,0.12)]"
            loading="lazy"
          />
        </div>

        {/* Archive Code & Series Tag Top Left */}
        <div className="absolute top-2.5 sm:top-3.5 left-3.5 sm:left-4 right-12 flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[9px] font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#9C968E] truncate">
          <span className="shrink-0">{product.archiveCode || `35MM · ${product.id}`}</span>
          {product.seriesLabel && (
            <>
              <span className="shrink-0">·</span>
              <span className="text-[#8C4A32] truncate">{product.seriesLabel}</span>
            </>
          )}
        </div>

        {/* Film Frame Number Bottom Right on the Mat */}
        {product.frameNumber && (
          <span className="absolute bottom-2 sm:bottom-2.5 right-3.5 sm:right-4 text-[8px] sm:text-[9px] font-mono tracking-[0.16em] text-[#9C968E]">
            [{product.frameNumber}]
          </span>
        )}

        {/* Minimalist Fullscreen Trigger — Accessible on touch & desktop */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenZoom(product);
          }}
          className="absolute top-2 sm:top-3 right-2.5 sm:right-3 p-1.5 sm:p-2 text-[#6E6A63] hover:text-[#141413] opacity-75 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
          title="Ver fotografía en pantalla completa"
        >
          <Maximize2 className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
      </div>

      {/* Exhibition Wall Label Below Mat */}
      <div className="pt-3.5 sm:pt-4 space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/prints/${product.id}`} className="block">
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#141413] group-hover:text-[#8C4A32] transition-colors leading-snug truncate">
                {product.title}
              </h3>
            </Link>
            <p className="text-[10px] sm:text-[11px] font-mono text-[#6E6A63] tracking-[0.06em] sm:tracking-[0.08em] uppercase mt-0.5 truncate">
              {product.city || placeName}, {countryName} — {product.year}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.14em] text-[#9C968E] block">
              Desde
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-[#141413] whitespace-nowrap">
              ${(product.price || 24000).toLocaleString('es-CL')} CLP
            </span>
          </div>
        </div>

        {product.caption && (
          <p className="text-xs text-[#6E6A63] font-light leading-relaxed pt-1">
            {product.caption}
          </p>
        )}
      </div>

    </article>
  );
}
