import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-20 sm:pb-28 pt-6 sm:pt-10 space-y-16 sm:space-y-24">
      
      {/* Editorial Project Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4 sm:space-y-6">
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8C4A32] block">
          El Proyecto · 35mm Film Archive
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#141413] leading-[1.12]">
          Dos miradas en película de 35mm: la ruta y el mundo ecuestre.
        </h1>
        <p className="text-sm sm:text-lg text-[#6E6A63] leading-relaxed font-light max-w-2xl pt-1 sm:pt-2">
          JavaOnFilm reúne fotografías capturadas exclusivamente en formato analógico de 35mm. El archivo nace del cruce entre dos mundos que comparten una misma estética: la quietud de los paisajes de viaje y la elegancia atemporal de la equitación y los caballos.
        </p>
      </section>

      {/* Two-Column Visual & Essay */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-y border-[#E6E1DA] py-12 sm:py-16">
          
          <div className="lg:col-span-6">
            <div className="bg-[#F4F0EA] border border-[#E6E1DA] p-4 sm:p-10">
              <img
                src="/images/about-camera-film.jpg"
                alt="Cámara análoga Olympus mju I y rollo Kodak Gold 200"
                className="w-full h-[260px] sm:h-[380px] object-cover contrast-[1.02]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C4A32] block">
              Estética & Materialidad
            </span>

            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-[#141413] leading-snug">
              La textura orgánica de la película química.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#6E6A63] leading-relaxed font-light">
              <p>
                Fotografiar en 35mm exige observar con pausa. A diferencia de la inmediatez digital, cada rollo cuenta con sólo 36 exposiciones donde la luz natural y la emulsión de Kodak Gold 200 construyen tonos cálidos y un grano imposible de imitar artificialmente.
              </p>
              <p>
                Tanto en las series de costa y viajes como en los registros ecuestres, cada fotografía seleccionada del archivo es impresa bajo estándares de galería sobre papel Fine Art de algodón y enmarcada a medida para habitar espacios con carácter y sobriedad.
              </p>
            </div>

            <div className="pt-5 sm:pt-6 grid grid-cols-3 gap-3 sm:gap-6 border-t border-[#E6E1DA]">
              <div className="min-w-0">
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#9C968E] block">Cámara</span>
                <span className="text-[11px] sm:text-xs font-mono text-[#141413] mt-1 block truncate">Olympus mju I</span>
              </div>
              <div className="min-w-0">
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#9C968E] block">Emulsión</span>
                <span className="text-[11px] sm:text-xs font-mono text-[#141413] mt-1 block truncate">Kodak Gold 200</span>
              </div>
              <div className="min-w-0">
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#9C968E] block">Óptica</span>
                <span className="text-[11px] sm:text-xs font-mono text-[#141413] mt-1 block truncate">35mm f/3.5</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-3xl mx-auto px-4 sm:px-10 text-center space-y-5 sm:space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413]">
          Explora las series disponibles en el archivo
        </h2>
        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] text-[#6E6A63]">
          Ediciones Fine Art impresas y enmarcadas a pedido en Chile
        </p>
        <div className="pt-1 sm:pt-2">
          <Link
            to="/prints"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#141413] hover:bg-[#2A2A28] text-[#FAF8F5] text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-colors"
          >
            <span>Ver Archivo 35mm</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </Link>
        </div>
      </section>

    </div>
  );
}
