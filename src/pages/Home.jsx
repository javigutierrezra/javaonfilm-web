import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Compass, Film, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: '/images/hero-framed-print.jpg',
    badge: 'MARQUERÍA & MADERA',
    title: 'Enmarcado Real en Madera Natural',
    subtitle: 'Detalle de impresión fine art en papel de algodón con paspartú'
  },
  {
    image: '/images/hero-room-surf.jpg',
    badge: 'ESCALA EN ESPACIO',
    title: 'Cuadro Gran Formato en Galería',
    subtitle: 'Fotografía Análoga Ocean Surf 35mm en muro principal'
  },
  {
    image: '/images/hero-room-couch.jpg',
    badge: 'ESCALA EN LIVING',
    title: 'Harmonía Fine Art en Espacios',
    subtitle: 'Enmarcado horizontal fine art sobre sofás y salas de estar'
  },
  {
    image: '/images/hero-room-porsche.jpg',
    badge: 'GRAN FORMATO APOYADO',
    title: 'Formato XL Classic B&W',
    subtitle: 'Fotografía análoga enmarcada apoyada sobre piso de madera'
  }
];

export default function Home({ onOpenZoom }) {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const featuredProducts = PRODUCTS.slice(0, 4);
  const activeSlide = HERO_SLIDES[currentSlideIndex];

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

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
                Fotografía analógica en 35mm, capturada durante viajes y convertida en piezas para conservar, enmarcar y llevar a tus espacios.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/prints"
                  className="w-full sm:w-auto px-8 py-4 bg-[#C85A32] hover:bg-[#B24B25] text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explorar el archivo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-6 py-4 bg-[#FAF6EE] hover:bg-[#EFE5D5] text-[#2A1E17] border border-[#E4DCD0] text-sm font-semibold rounded-lg transition text-center"
                >
                  Sobre JavaOnFilm
                </Link>
              </div>

              {/* Archival Guarantees */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E4DCD0] text-left">
                <div>
                  <span className="text-xs font-mono font-bold text-[#2A1E17] block">CÁMARA</span>
                  <span className="text-[11px] text-[#736B63]">Olympus mju I</span>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#2A1E17] block">PELÍCULA</span>
                  <span className="text-[11px] text-[#736B63]">Kodak Gold 200</span>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#2A1E17] block">FORMATO</span>
                  <span className="text-[11px] text-[#736B63]">35mm Film Original</span>
                </div>
              </div>

            </div>

            {/* Hero Featured Travel Prints Carousel Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Archival Folder Card Showcase */}
                <div 
                  className="bg-[#FAF6EE] p-4 sm:p-6 rounded-2xl shadow-xl border border-[#E4DCD0] group relative"
                >
                  {/* Main Image Viewport */}
                  <div 
                    className="relative overflow-hidden rounded-xl h-[360px] sm:h-[420px] bg-[#EFE5D5]/70 border border-[#E4DCD0] shadow-md cursor-pointer group/img flex items-center justify-center p-3"
                    onClick={() => navigate('/prints')}
                  >
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.title}
                      className="max-w-full max-h-full object-contain group-hover/img:scale-105 transition-transform duration-700 shadow-sm"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-[#2A1E17]/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-mono tracking-wider shadow">
                      {activeSlide.badge}
                    </div>

                    {/* Carousel Navigation Arrows */}
                    <button
                      onClick={handlePrevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2A1E17]/60 hover:bg-[#2A1E17] text-white flex items-center justify-center backdrop-blur-sm transition opacity-80 hover:opacity-100 z-10"
                      title="Ver foto anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2A1E17]/60 hover:bg-[#2A1E17] text-white flex items-center justify-center backdrop-blur-sm transition opacity-80 hover:opacity-100 z-10"
                      title="Ver siguiente foto"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Slide Counter Indicator */}
                    <div className="absolute bottom-3 right-3 bg-[#2A1E17]/75 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono">
                      {currentSlideIndex + 1} / {HERO_SLIDES.length}
                    </div>
                  </div>
                  
                  {/* Thumbnails Row */}
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {HERO_SLIDES.map((slide, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`relative rounded-lg overflow-hidden h-20 bg-[#EFE5D5]/70 border-2 transition-all p-1 flex items-center justify-center ${
                          currentSlideIndex === idx
                            ? 'border-[#C85A32] ring-2 ring-[#C85A32]/30 scale-105'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={slide.image} alt={slide.title} className="max-w-full max-h-full object-contain" />
                      </button>
                    ))}
                  </div>

                  {/* Metadata & CTA */}
                  <div className="mt-4 pt-3 border-t border-[#E4DCD0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#C85A32] font-bold uppercase tracking-wider">
                        <span>35MM FILM ARCHIVE</span>
                        <span>·</span>
                        <span>PIEZAS ENMARCADAS</span>
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#2A1E17] mt-0.5">
                        {activeSlide.title}
                      </h3>
                      <p className="text-xs font-mono text-[#736B63] mt-0.5">
                        {activeSlide.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate('/prints')}
                      className="px-4 py-2.5 bg-[#C85A32] hover:bg-[#B24B25] text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <span>Explorar el archivo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN: ÚLTIMAS FOTOGRAFÍAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E4DCD0]">
          <div>
            <span className="text-xs font-mono font-bold text-[#C85A32] uppercase tracking-widest block mb-1">
              ARCHIVO DE VIAJES
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2A1E17]">Últimas fotografías</h2>
          </div>
          <Link
            to="/prints"
            className="mt-4 sm:mt-0 text-xs font-mono font-bold text-[#C85A32] hover:text-[#B24B25] flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Ver archivo completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} onOpenZoom={onOpenZoom} />
          ))}
        </div>
      </section>

      {/* SECCIÓN: DEL ROLLO A TU PARED */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#FAF6EE] p-8 sm:p-12 rounded-2xl border border-[#E4DCD0] shadow-sm space-y-5 relative overflow-hidden">
          
          <div className="w-12 h-12 bg-[#EFE5D5] text-[#C85A32] rounded-xl flex items-center justify-center mx-auto shadow-inner border border-[#E4DCD0]">
            <Compass className="w-6 h-6" />
          </div>

          <span className="text-xs font-mono font-bold text-[#C85A32] uppercase tracking-widest block">
            EL PROCESO
          </span>
          
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1E17]">
            Del rollo a tu pared.
          </h2>

          <p className="text-base sm:text-lg text-[#5A4C40] leading-relaxed max-w-2xl mx-auto font-normal">
            Cada imagen comienza en película de 35mm. Fotografío, revelo y selecciono las imágenes que pasan a formar parte del archivo JavaOnFilm.
          </p>

          <div className="pt-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#C85A32] hover:text-[#B24B25]"
            >
              <span>Conoce más sobre JavaOnFilm</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
