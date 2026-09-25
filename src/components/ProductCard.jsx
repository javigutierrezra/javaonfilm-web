import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Maximize2, ArrowRight } from 'lucide-react';

export default function ProductCard({ product, onOpenZoom }) {
  const navigate = useNavigate();

  return (
    <div className="group bg-[#FAF6EE] rounded-xl border border-[#E4DCD0] p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative">
      
      {/* Top Archival Metadata Stamp */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#736B63] mb-2 px-1 tracking-wider uppercase">
        <span className="font-bold text-[#C85A32]">
          {product.archiveCode || `PHOTO ${product.id}`}
        </span>
        <span className="truncate max-w-[150px]" title={product.location}>
          {product.location}
        </span>
      </div>

      {/* Photo Container with Fine Art Mat Backing */}
      <div 
        className="relative overflow-hidden bg-[#FDFBF7] p-2.5 rounded-lg border border-[#EBE3D5] shadow-inner cursor-pointer"
        onClick={() => navigate(`/prints/${product.id}`)}
      >
        <div className="relative overflow-hidden aspect-[4/5] bg-[#EFE8DC]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Fullscreen Zoom Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenZoom(product);
            }}
            className="absolute top-2.5 right-2.5 p-2 bg-[#2A1E17]/75 hover:bg-[#2A1E17] text-white rounded-full backdrop-blur-md transition-all shadow-md hover:scale-110"
            title="Ver Fotografía Completa HD"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Film Roll Metadata Notation */}
        <div className="mt-2.5 pt-1.5 border-t border-[#EBE3D5] flex items-center justify-between text-[10px] font-mono text-[#736B63]">
          <span>35MM / {product.film}</span>
          <span>{product.year}</span>
        </div>
      </div>
      
      {/* Card Content & Pricing */}
      <div className="mt-4 flex-1 flex flex-col justify-between px-1">
        <div>
          <Link to={`/prints/${product.id}`} className="block group-hover:text-[#C85A32] transition-colors">
            <h3 className="text-lg font-serif font-bold text-[#2A1E17] leading-snug">
              {product.title}
            </h3>
            <p className="text-xs text-[#6E4B37] font-medium mt-0.5">
              {product.location}
            </p>
          </Link>
        </div>
        
        <div className="mt-5 pt-3 border-t border-[#E4DCD0] flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono text-[#736B63] uppercase tracking-wider block">Desde</span>
            <span className="text-base font-extrabold text-[#2A1E17]">
              ${product.price.toLocaleString('es-CL')} <span className="text-[10px] font-bold text-[#C85A32]">CLP</span>
            </span>
            <span className="text-[10px] text-[#736B63] block font-normal">(~${product.priceUSD} USD)</span>
          </div>

          <Link
            to={`/prints/${product.id}`}
            className="px-3.5 py-2 bg-[#C85A32] hover:bg-[#B24B25] text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            <span>Ver Cuadro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
