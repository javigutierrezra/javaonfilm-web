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
        className="relative aspect-[4/5] bg-[#F4F0EA] border border-[#E6E1DA] p-6 sm:p-9 flex items-center justify-center cursor-pointer transition-colors duration-500 group-hover:bg-[#EFEAE2]"
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
        <div className="absolute top-3.5 left-4 flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] uppercase text-[#9C968E]">
          <span>{product.archiveCode || `35MM · ${product.id}`}</span>
          {product.seriesLabel && (
            <>
              <span>·</span>
              <span className="text-[#8C4A32]">{product.seriesLabel}</span>
            </>
          )}
        </div>

        {/* Film Frame Number Bottom Right on the Mat */}
        {product.frameNumber && (
          <span className="absolute bottom-2.5 right-4 text-[9px] font-mono tracking-[0.18em] text-[#9C968E]">
            [{product.frameNumber}]
          </span>
        )}

        {/* Minimalist Fullscreen Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenZoom(product);
          }}
          className="absolute top-3 right-3 p-2 text-[#6E6A63] hover:text-[#141413] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          title="Ver fotografía en pantalla completa"
        >
          <Maximize2 className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
      </div>

      {/* Exhibition Wall Label Below Mat */}
      <div className="pt-4 space-y-1.5">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <Link to={`/prints/${product.id}`} className="block">
              <h3 className="text-2xl font-serif font-normal text-[#141413] group-hover:text-[#8C4A32] transition-colors leading-snug">
                {product.title}
              </h3>
            </Link>
            <p className="text-[11px] font-mono text-[#6E6A63] tracking-[0.08em] uppercase mt-0.5">
              {product.city || placeName}, {countryName} — {product.year}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#9C968E] block">
              Desde
            </span>
            <span className="text-xs font-mono text-[#141413]">
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
