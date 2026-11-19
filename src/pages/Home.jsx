import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Home({ onOpenZoom }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-28 pb-20 sm:pb-28">

      {/* HERO SECTION — TRAVEL & EQUESTRIAN 35MM ARCHIVE */}
      <section className="pt-6 pb-12 sm:pt-12 sm:pb-20 md:pt-14 md:pb-24 border-b border-[#E6E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-center">
            
            {/* Hero Editorial Copy */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-2.5 sm:space-y-3">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.24em] text-[#8C4A32] block">
                  Archivo Fotográfico 35mm · Viajes & Mundo Ecuestre
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-normal tracking-tight text-[#141413] leading-[1.1]">
                  Viajes, paisajes y caballos en película de 35mm.
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#6E6A63] leading-relaxed max-w-lg font-light">
                Una selección curada de fotografía analógica dividida en dos pasiones: la quietud de los lugares recorridos en viajes y la nobleza del mundo ecuestre. Obras impresas en papel Fine Art y enmarcadas a medida para tus espacios.
              </p>

              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                <Link
                  to="/prints"
                  className="px-7 sm:px-8 py-3.5 sm:py-4 bg-[#141413] hover:bg-[#2A2A28] text-[#FAF8F5] text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-colors flex items-center justify-center gap-3 group"
                >
                  <span>Explorar el Archivo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
                </Link>
                <Link
                  to="/about"
                  className="px-6 sm:px-7 py-3.5 sm:py-4 bg-transparent hover:bg-[#F4F0EA] text-[#141413] border border-[#E6E1DA] text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-colors text-center"
                >
                  El Proyecto
                </Link>
              </div>

              {/* Technical Specifications Footer */}
              <div className="pt-6 sm:pt-8 grid grid-cols-3 gap-3 sm:gap-6 border-t border-[#E6E1DA]">
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#9C968E] block">
                    Cámara
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-[#141413] mt-1 block truncate">
                    Olympus mju I
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#9C968E] block">
                    Película
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-[#141413] mt-1 block truncate">
                    Kodak Gold 200
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#9C968E] block">
                    Series
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-[#141413] mt-1 block truncate">
                    Viajes & Ecuestre
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Exhibition Frame Showcase */}
            <div className="lg:col-span-6">
              <div
                onClick={() => navigate('/prints')}
                className="group cursor-pointer bg-[#F4F0EA] border border-[#E6E1DA] p-5 sm:p-10 transition-colors duration-500 hover:bg-[#EFEAE2]"
              >
                <div className="relative h-[280px] sm:h-[380px] md:h-[430px] flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/hero-photographer.jpg"
                    alt="Archivo analógico 35mm JavaOnFilm"
                    className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.015] shadow-[0_12px_30px_rgba(20,20,19,0.14)]"
                  />
                </div>

                <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#E6E1DA] flex flex-wrap items-baseline justify-between gap-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[#6E6A63]">
                  <span>35mm Negative Film · Fine Art</span>
                  <span className="text-[#141413] group-hover:underline">Ver colección →</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: THE TWO SERIES (VIAJES & ECUESTRE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Serie 01: Viajes */}
          <div
            onClick={() => navigate('/prints?serie=viajes')}
            className="group cursor-pointer border border-[#E6E1DA] bg-[#F4F0EA]/60 hover:bg-[#F4F0EA] p-6 sm:p-10 transition-colors flex flex-col justify-between space-y-5 sm:space-y-6"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C4A32] block">
                Serie 01 · Bitácora de Ruta
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413]">
                Fotografía de Viajes & Costa
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6A63] font-light leading-relaxed">
                Costas, horizontes abiertos y arquitectura natural capturados alrededor de Chile, Brasil y nuevos destinos en película de 35mm.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E6E1DA] flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#141413]">
              <span>Explorar Serie Viajes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
            </div>
          </div>

          {/* Serie 02: Ecuestre & Caballos */}
          <div
            onClick={() => navigate('/prints?serie=ecuestre')}
            className="group cursor-pointer border border-[#E6E1DA] bg-[#F4F0EA]/60 hover:bg-[#F4F0EA] p-6 sm:p-10 transition-colors flex flex-col justify-between space-y-5 sm:space-y-6"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C4A32] block">
                Serie 02 · Equitación & Campo
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413]">
                Mundo Ecuestre & Caballos
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6A63] font-light leading-relaxed">
                La estética de la equitación, el movimiento, la textura y la calma de los caballos retratados con la calidez clásica del grano analógico.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E6E1DA] flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#141413]">
              <span>Explorar Serie Ecuestre</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: CURATED WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 pb-4 sm:pb-5 border-b border-[#E6E1DA] gap-3">
          <div>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C4A32] block mb-1">
              Selección del Archivo
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#141413]">
              Obras Destacadas
            </h2>
          </div>
          <Link
            to="/prints"
            className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#141413] hover:text-[#8C4A32] flex items-center gap-2 transition-colors"
          >
            <span>Ver archivo completo ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-12 sm:gap-y-16">
          {PRODUCTS.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} onOpenZoom={onOpenZoom} />
          ))}
        </div>
      </section>

      {/* SECTION: CRAFTSMANSHIP & PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="border-y border-[#E6E1DA] py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C4A32] block">
              Oficio & Materialidad
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-[#141413] leading-snug">
              Del negativo de 35mm al cuadro en tu pared.
            </h2>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            <div className="space-y-2">
              <span className="text-[11px] sm:text-xs font-mono text-[#8C4A32]">01 / PELÍCULA QUÍMICA</span>
              <h3 className="text-lg font-serif text-[#141413]">Grano y luz natural</h3>
              <p className="text-xs text-[#6E6A63] leading-relaxed font-light">
                Cada imagen es capturada en rollo de 35mm sin filtros ni artificios digitales. La emulsión Kodak Gold 200 entrega tonos tierra, verdes profundos y una atmósfera atemporal ideal para decoración.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] sm:text-xs font-mono text-[#8C4A32]">02 / IMPRESIÓN & MARCO</span>
              <h3 className="text-lg font-serif text-[#141413]">Producción Fine Art a pedido</h3>
              <p className="text-xs text-[#6E6A63] leading-relaxed font-light">
                Impresión en papel de algodón libre de ácido y enmarcado artesanal en madera natural, negro o blanco, listo para colgar y conservar por décadas.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
