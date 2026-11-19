import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-28 pt-10 space-y-24">
      
      {/* Editorial Project Header */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 space-y-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C4A32] block">
          El Proyecto · 35mm Film Archive
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#141413] leading-[1.1]">
          Dos miradas en película de 35mm: la ruta y el mundo ecuestre.
        </h1>
        <p className="text-base sm:text-lg text-[#6E6A63] leading-relaxed font-light max-w-2xl pt-2">
          JavaOnFilm reúne fotografías capturadas exclusivamente en formato analógico de 35mm. El archivo nace del cruce entre dos mundos que comparten una misma estética: la quietud de los paisajes de viaje y la elegancia atemporal de la equitación y los caballos.
        </p>
      </section>

      {/* Two-Column Visual & Essay */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-y border-[#E6E1DA] py-16">
          
          <div className="lg:col-span-6">
            <div className="bg-[#F4F0EA] border border-[#E6E1DA] p-6 sm:p-10">
              <img
                src="/images/about-camera-film.jpg"
                alt="Cámara análoga Olympus mju I y rollo Kodak Gold 200"
                className="w-full h-[380px] object-cover contrast-[1.02]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C4A32] block">
              Estética & Materialidad
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#141413] leading-snug">
              La textura orgánica de la película química.
            </h2>

            <div className="space-y-4 text-sm text-[#6E6A63] leading-relaxed font-light">
              <p>
                Fotografiar en 35mm exige observar con pausa. A diferencia de la inmediatez digital, cada rollo cuenta con sólo 36 exposiciones donde la luz natural y la emulsión de Kodak Gold 200 construyen tonos cálidos y un grano imposible de imitar artificialmente.
              </p>
              <p>
                Tanto en las series de costa y viajes como en los registros ecuestres, cada fotografía seleccionada del archivo es impresa bajo estándares de galería sobre papel Fine Art de algodón y enmarcada a medida para habitar espacios con carácter y sobriedad.
              </p>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-[#E6E1DA]">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">Cámara</span>
                <span className="text-xs font-mono text-[#141413] mt-1 block">Olympus mju I</span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">Emulsión</span>
                <span className="text-xs font-mono text-[#141413] mt-1 block">Kodak Gold 200</span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">Óptica</span>
                <span className="text-xs font-mono text-[#141413] mt-1 block">35mm f/3.5</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 text-center space-y-6">
        <h2 className="text-3xl font-serif font-normal text-[#141413]">
          Explora las series disponibles en el archivo
        </h2>
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#6E6A63]">
          Ediciones Fine Art impresas y enmarcadas a pedido en Chile
        </p>
        <div className="pt-2">
          <Link
            to="/prints"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#141413] hover:bg-[#2A2A28] text-[#FAF8F5] text-xs font-mono uppercase tracking-[0.2em] transition-colors"
          >
            <span>Ver Archivo 35mm</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </Link>
        </div>
      </section>

    </div>
  );
}
