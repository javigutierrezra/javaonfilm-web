import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-20 sm:pb-28 pt-8 sm:pt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center border-b border-[#E6E1DA] pb-14">
          
          <div className="md:col-span-6">
            <div className="bg-[#F4F0EA] border border-[#E6E1DA] p-4 sm:p-6">
              <img
                src="/images/about-camera-film.jpg"
                alt="Olympus mju I y Kodak Gold 200"
                className="w-full h-[260px] sm:h-[340px] object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6 space-y-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C4A32] block">
              JavaOnFilm
            </span>

            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#141413] leading-snug">
              Viajes y caballos en 35mm.
            </h1>

            <p className="text-sm text-[#6E6A63] leading-relaxed font-light">
              JavaOnFilm reúne mis fotografías analógicas favoritas tomadas en viajes y en equitación. Cada imagen es capturada en película de 35mm y está disponible impresa o enmarcada a medida.
            </p>

            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#E6E1DA] text-xs font-mono">
              <div>
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#9C968E] block">Cámara</span>
                <span className="text-[#141413] mt-1 block">Olympus mju I</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#9C968E] block">Rollo</span>
                <span className="text-[#141413] mt-1 block">Kodak Gold 200</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#9C968E] block">Formato</span>
                <span className="text-[#141413] mt-1 block">35mm</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/prints"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#141413] hover:bg-[#2A2A28] text-[#FAF8F5] text-xs font-mono uppercase tracking-[0.18em] transition-colors"
              >
                <span>Ver Fotografías</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
