import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Maximize2 } from 'lucide-react';

export default function ProductCard({ product, onOpenZoom }) {
  const navigate = useNavigate();

  const placeName = product.place || product.location?.split(',')[0] || '';
  const countryName = product.country || product.location?.split(',')[1]?.trim() || '';

  return (
    <article className="group flex flex-col">
      
      {/* Clean Photo Mat */}
      <div
        onClick={() => navigate(`/prints/${product.id}`)}
        className="relative aspect-[4/5] bg-[#F4F0EA] border border-[#E6E1DA] p-6 sm:p-9 flex items-center justify-center cursor-pointer transition-colors duration-500 group-hover:bg-[#EFEAE2]"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_8px_24px_rgba(20,20,19,0.12)]"
          loading="lazy"
        />

        {/* Zoom Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenZoom(product);
          }}
          className="absolute top-3 right-3 p-1.5 text-[#6E6A63] hover:text-[#141413] opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
          title="Ver en pantalla completa"
        >
          <Maximize2 className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
      </div>

      {/* Minimal Label */}
      <div className="pt-3.5 flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <Link to={`/prints/${product.id}`} className="block">
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#141413] group-hover:text-[#8C4A32] transition-colors truncate">
              {product.title}
            </h3>
          </Link>
          <p className="text-[10px] sm:text-[11px] font-mono text-[#6E6A63] tracking-[0.08em] uppercase mt-0.5 truncate">
            {placeName}, {countryName} · {product.seriesLabel || 'Viajes'}
          </p>
        </div>

        <span className="text-[11px] sm:text-xs font-mono text-[#141413] whitespace-nowrap shrink-0">
          ${(product.price || 24000).toLocaleString('es-CL')} CLP
        </span>
      </div>

    </article>
  );
}
