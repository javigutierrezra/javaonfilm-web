import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Compass, Film, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function Home({ onOpenZoom }) {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS.slice(0, 4);
  const heroProduct = PRODUCTS[0];

  return (
    <div className="space-y-24 pb-20">

      {/* HERO SECTION MINIMALISTA & EDITORIAL */}
      <section className="relative pt-6 pb-16 md:pt-14 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-brand text-xs font-bold uppercase tracking-wider">
                <Film className="w-3.5 h-3.5" />
                <span>35mm Analog Travel Photography</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-slate-900 leading-[1.12]">
                Fotografías de lugares en los que estuve.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Cuadros fine art impresos en calidad de galería a partir de fotografías tomadas en película de 35mm durante viajes alrededor del mundo.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/prints"
                  className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-hover text-white font-bold text-sm rounded-xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explorar Cuadros</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-semibold rounded-xl transition text-center"
                >
                  Sobre
                </Link>
              </div>

              {/* Guarantees */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/60 text-left">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Película 35mm Real</span>
                  <span className="text-[11px] text-slate-500">Grano analógico auténtico</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Papel Fine Art</span>
                  <span className="text-[11px] text-slate-500">Papel algodón 240g</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Marcos de Madera</span>
                  <span className="text-[11px] text-slate-500">Listos para colgar</span>
                </div>
              </div>

            </div>

            {/* Hero Featured Travel Print */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div 
                  className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-200/80 group cursor-pointer"
                  onClick={() => navigate(`/prints/${heroProduct.id}`)}
                >
                  <div className="border-[14px] border-slate-900 shadow-2xl overflow-hidden">
                    <div className="bg-[#FDFBF7] p-5">
                      <img
                        src={heroProduct.image}
                        alt={heroProduct.title}
                        className="w-full h-[380px] object-cover shadow-sm group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                        {heroProduct.location}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-slate-900 mt-0.5">
                        {heroProduct.title}
                      </h3>
                      <p className="text-xs text-brand font-semibold">
                        {heroProduct.camera} · {heroProduct.film} ({heroProduct.year})
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/prints/${heroProduct.id}`);
                      }}
                      className="px-4 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1"
                    >
                      <span>Ver Cuadro</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED PRINTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200/80">
          <div>
            <span className="text-xs font-extrabold text-brand uppercase tracking-widest block mb-1">Selección del Autor</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Cuadros Destacados</h2>
          </div>
          <Link
            to="/prints"
            className="mt-4 sm:mt-0 text-sm font-bold text-brand hover:text-brand-hover flex items-center gap-1"
          >
            <span>Ver toda la colección</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onOpenZoom={onOpenZoom} />
          ))}
        </div>
      </section>

      {/* ABOUT BRIEF SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-10 sm:p-14 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="w-12 h-12 bg-indigo-50 text-brand rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Compass className="w-6 h-6" />
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-snug">
            “JavaOnFilm nace de fotografías análogas tomadas durante viajes, momentos y lugares que quise conservar más allá del rollo. Algunas de ellas ahora pueden vivir también en tus espacios.”
          </h3>

          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand hover:text-brand-hover"
            >
              <span>Conoce la historia detrás de la marca</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
