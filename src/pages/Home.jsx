import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Home({ onOpenZoom }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 sm:pb-28">

      {/* HERO SECTION — SIMPLE & CLEAN */}
      <section className="pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-[#E6E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C4A32] block">
                  Fotografía Analógica 35mm
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#141413] leading-[1.08]">
                  Viajes y caballos en 35mm.
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#6E6A63] leading-relaxed max-w-md font-light">
                Fotografías en película analógica disponibles como láminas y cuadros enmarcados a pedido.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/prints"
                  className="px-8 py-4 bg-[#141413] hover:bg-[#2A2A28] text-[#FAF8F5] text-xs font-mono uppercase tracking-[0.2em] transition-colors inline-flex items-center gap-3 group"
                >
                  <span>Ver Fotografías</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
                </Link>
              </div>

              <div className="pt-6 flex items-center gap-6 border-t border-[#E6E1DA] text-[11px] font-mono text-[#6E6A63]">
                <span>Olympus mju I</span>
                <span>·</span>
                <span>Kodak Gold 200</span>
                <span>·</span>
                <span>35mm</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div
                onClick={() => navigate('/prints')}
                className="group cursor-pointer overflow-hidden max-w-md w-full"
              >
                <img
                  src="/images/hero-photographer.jpg"
                  alt="JavaOnFilm 35mm"
                  className="w-full h-auto max-h-[520px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DOS CATEGORÍAS: VIAJES Y CABALLOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <button
            onClick={() => navigate('/prints?serie=viajes')}
            className="group text-left border border-[#E6E1DA] bg-[#F4F0EA]/60 hover:bg-[#F4F0EA] p-7 sm:p-9 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C4A32] block mb-1">
                01
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413]">
                Viajes
              </h2>
            </div>
            <ArrowRight className="w-4 h-4 text-[#141413] group-hover:translate-x-1 transition-transform stroke-[1.5]" />
          </button>

          <button
            onClick={() => navigate('/prints?serie=caballos')}
            className="group text-left border border-[#E6E1DA] bg-[#F4F0EA]/60 hover:bg-[#F4F0EA] p-7 sm:p-9 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C4A32] block mb-1">
                02
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413]">
                Caballos
              </h2>
            </div>
            <ArrowRight className="w-4 h-4 text-[#141413] group-hover:translate-x-1 transition-transform stroke-[1.5]" />
          </button>

        </div>
      </section>

      {/* FOTOGRAFÍAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#E6E1DA]">
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413]">
            Fotografías
          </h2>
          <Link
            to="/prints"
            className="text-xs font-mono uppercase tracking-[0.16em] text-[#141413] hover:text-[#8C4A32] flex items-center gap-2 transition-colors"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onOpenZoom={onOpenZoom} />
          ))}
        </div>
      </section>

    </div>
  );
}
