import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Compass, Film, Award, ShieldCheck, Tag } from 'lucide-react';

export default function Home({ onOpenZoom }) {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS.slice(0, 4);
  const heroProduct = PRODUCTS[0];

  return (
    <div className="space-y-20 pb-20">

      {/* HERO SECTION EDITORIAL & ARCHIVO DE VIAJES */}
      <section className="relative pt-4 pb-12 md:pt-10 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE5D5] border border-[#E4DCD0] text-[#C85A32] text-xs font-mono tracking-wider uppercase">
                <Film className="w-3.5 h-3.5" />
                <span>35mm Chemical Film Archive</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#2A1E17] leading-[1.12]">
                Fotografías de lugares en los que estuve.
              </h1>

              <p className="text-base sm:text-lg text-[#5A4C40] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Cuadros fine art impresos en calidad de galería a partir de fotografías tomadas en película de 35mm durante viajes alrededor del mundo.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/prints"
                  className="w-full sm:w-auto px-8 py-4 bg-[#C85A32] hover:bg-[#B24B25] text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explorar Archivo de Cuadros</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-6 py-4 bg-[#FAF6EE] hover:bg-[#EFE5D5] text-[#2A1E17] border border-[#E4DCD0] text-sm font-semibold rounded-lg transition text-center"
                >
                  Sobre el Archivo
                </Link>
              </div>

              {/* Archival Guarantees */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E4DCD0] text-left">
                <div>
                  <span className="text-xs font-mono font-bold text-[#2A1E17] block">35MM REAL</span>
                  <span className="text-[11px] text-[#736B63]">Grano analógico químico</span>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#2A1E17] block">PAPEL FINE ART</span>
                  <span className="text-[11px] text-[#736B63]">Algodón 240g de galería</span>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#2A1E17] block">MARCOS MADERA</span>
                  <span className="text-[11px] text-[#736B63]">Listos para colgar</span>
                </div>
              </div>

            </div>

            {/* Hero Featured Travel Print with Archival Mat & Wood Frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Archival Folder Card */}
                <div 
                  className="bg-[#FAF6EE] p-6 sm:p-8 rounded-2xl shadow-xl border border-[#E4DCD0] group cursor-pointer relative"
                  onClick={() => navigate(`/prints/${heroProduct.id}`)}
                >
                  {/* Photo Frame Container */}
                  <div className="border-[14px] border-[#362317] shadow-2xl bg-[#FDFBF7] p-4 sm:p-6 outline outline-1 outline-[#1F130B]">
                    <div className="relative overflow-hidden aspect-[4/5] bg-[#EFE8DC]">
                      <img
                        src={heroProduct.image}
                        alt={heroProduct.title}
                        className="w-full h-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  
                  {/* Photo Archival Metadata Stamp */}
                  <div className="mt-5 pt-3 border-t border-[#E4DCD0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#C85A32] font-bold uppercase tracking-wider">
                        <span>{heroProduct.archiveCode || "PHOTO 001"}</span>
                        <span>·</span>
                        <span>{heroProduct.location}</span>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-[#2A1E17] mt-0.5">
                        {heroProduct.title}
                      </h3>
                      <p className="text-xs font-mono text-[#736B63] mt-0.5">
                        {heroProduct.camera} · {heroProduct.film} ({heroProduct.year})
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/prints/${heroProduct.id}`);
                      }}
                      className="px-4 py-2.5 bg-[#C85A32] hover:bg-[#B24B25] text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 shrink-0"
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

      {/* FEATURED PRINTS GRID EDITORIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E4DCD0]">
          <div>
            <span className="text-xs font-mono font-bold text-[#C85A32] uppercase tracking-widest block mb-1">
              SELECCIÓN DEL ARCHIVO
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2A1E17]">Cuadros Destacados</h2>
          </div>
          <Link
            to="/prints"
            className="mt-4 sm:mt-0 text-xs font-mono font-bold text-[#C85A32] hover:text-[#B24B25] flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Ver colección completa</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onOpenZoom={onOpenZoom} />
          ))}
        </div>
      </section>

      {/* ABOUT BRIEF SECTION - DIARIO DE VIAJE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#FAF6EE] p-8 sm:p-12 rounded-2xl border border-[#E4DCD0] shadow-sm space-y-6 relative overflow-hidden">
          
          <div className="w-12 h-12 bg-[#EFE5D5] text-[#C85A32] rounded-xl flex items-center justify-center mx-auto shadow-inner border border-[#E4DCD0]">
            <Compass className="w-6 h-6" />
          </div>
          
          <blockquote className="text-xl sm:text-2xl font-serif font-bold text-[#2A1E17] leading-relaxed max-w-2xl mx-auto">
            “JavaOnFilm nace de fotografías análogas tomadas durante viajes, momentos y lugares que quise conservar más allá del rollo. Algunas de ellas ahora pueden vivir también en tus espacios.”
          </blockquote>

          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#C85A32] hover:text-[#B24B25]"
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
