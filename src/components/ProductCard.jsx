import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Maximize2, ArrowRight } from 'lucide-react';

export default function ProductCard({ product, onOpenZoom }) {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative">
      
      {/* Photo Container */}
      <div 
        className="relative overflow-hidden bg-slate-100 aspect-[4/5] cursor-pointer"
        onClick={() => navigate(`/prints/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex gap-2">
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase bg-slate-900/80 backdrop-blur-md text-white rounded-full shadow-sm">
            {product.location}
          </span>
        </div>

        {/* Fullscreen Zoom Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenZoom(product);
          }}
          className="absolute top-3.5 right-3.5 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all shadow-md hover:scale-110"
          title="Ver Fotografía Completa HD"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* 35mm film tag badge */}
        <div className="absolute bottom-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-[11px] font-mono text-slate-700 font-semibold">
          {product.film} · {product.year}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/prints/${product.id}`} className="block group-hover:text-brand transition-colors">
            <h3 className="text-xl font-bold font-serif text-slate-900 mt-0.5">
              {product.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {product.location}
            </p>
          </Link>
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Desde</span>
            <span className="text-lg font-extrabold text-slate-900">
              ${product.price.toLocaleString('es-CL')} <span className="text-xs font-bold text-brand">CLP</span>
            </span>
            <span className="text-[11px] text-slate-400 block font-normal">(~${product.priceUSD} USD)</span>
          </div>

          <Link
            to={`/prints/${product.id}`}
            className="px-4 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <span>Ver Cuadro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
