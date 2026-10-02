import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Camera, ArrowRight, Compass } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-24 pt-6 space-y-16">
      
      {/* Header Editorial */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE5D5] border border-[#E4DCD0] text-[#C85A32] text-xs font-mono tracking-wider uppercase">
          <Film className="w-3.5 h-3.5" />
          <span>Sobre JavaOnFilm</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2A1E17] leading-tight">
          Un archivo de lugares, momentos y rollos.
        </h1>

        <p className="text-lg text-[#5A4C40] leading-relaxed font-normal max-w-2xl mx-auto">
          JavaOnFilm nace de mi forma de guardar los lugares por los que he pasado. Fotografío en película de 35mm porque me gusta no saber exactamente qué quedó registrado hasta revelar el rollo. Algunas de esas imágenes terminan aquí, convertidas en piezas físicas.
        </p>
      </section>

      {/* Main Image & Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#FAF6EE] p-8 sm:p-12 rounded-2xl border border-[#E4DCD0] shadow-sm">
          
          <div className="lg:col-span-6 relative">
            <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#EBE3D5] shadow-md">
              <img
                src="/images/about-camera-film.jpg"
                alt="Cámara análoga Olympus mju I y rollo Kodak Gold 200"
                className="w-full h-[380px] object-cover rounded-lg shadow-inner bg-[#EFE8DC]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono text-[#C85A32] font-bold uppercase tracking-widest block">
              ESTÉTIKA & PROCESO
            </span>

            <h2 className="text-3xl font-serif font-bold text-[#2A1E17]">
              Fotografía real de viajes
            </h2>

            <p className="text-[#5A4C40] text-base leading-relaxed">
              Cada fotografía del archivo es capturada en viajes personales. La película de 35mm entrega tonos cálidos, textura viva y una cualidad tangible que preserva la atmósfera original del momento.
            </p>

            <p className="text-[#5A4C40] text-base leading-relaxed">
              Las imágenes son seleccionadas con cuidado para transformarse en prints y piezas enmarcadas listas para acompañar tus espacios.
            </p>

            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#E4DCD0] text-xs font-mono">
              <div>
                <span className="font-bold text-[#2A1E17] block text-sm">Mi cámara</span>
                <span className="text-[#736B63]">Olympus mju I</span>
              </div>
              <div>
                <span className="font-bold text-[#2A1E17] block text-sm">Película habitual</span>
                <span className="text-[#736B63]">Kodak Gold 200</span>
              </div>
              <div>
                <span className="font-bold text-[#2A1E17] block text-sm">Formato</span>
                <span className="text-[#736B63]">35mm</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Equipment Specs summary card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] p-8 sm:p-10 rounded-2xl border border-[#E4DCD0] shadow-sm space-y-6">
          <div className="flex items-center gap-4 border-b border-[#E4DCD0] pb-5">
            <div className="w-12 h-12 bg-[#2A1E17] text-[#C85A32] rounded-xl flex items-center justify-center font-mono font-bold text-base shadow-md shrink-0 border border-[#6E4B37]/30">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#2A1E17]">Especificaciones del Archivo</h3>
              <p className="text-xs font-mono text-[#C85A32]">Equipo compacto & película analógica de 35mm</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#5A4C40]">
            <div className="space-y-1 bg-[#FDFBF7] p-4 rounded-xl border border-[#E4DCD0]">
              <span className="font-bold text-[#2A1E17] block text-sm font-serif">Mi cámara</span>
              <p className="font-mono text-[#C85A32] font-bold text-base">Olympus mju I</p>
              <p className="text-[11px] text-[#736B63] mt-1">Cámara compacta de 35mm de lente fijo 35mm f/3.5.</p>
            </div>

            <div className="space-y-1 bg-[#FDFBF7] p-4 rounded-xl border border-[#E4DCD0]">
              <span className="font-bold text-[#2A1E17] block text-sm font-serif">Película habitual</span>
              <p className="font-mono text-[#C85A32] font-bold text-base">Kodak Gold 200</p>
              <p className="text-[11px] text-[#736B63] mt-1">Tonos cálidos, grano sutil y calidez natural.</p>
            </div>

            <div className="space-y-1 bg-[#FDFBF7] p-4 rounded-xl border border-[#E4DCD0]">
              <span className="font-bold text-[#2A1E17] block text-sm font-serif">Formato</span>
              <p className="font-mono text-[#C85A32] font-bold text-base">35mm</p>
              <p className="text-[11px] text-[#736B63] mt-1">Formato analógico original sin retoque digital excesivo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#2A1E17] text-white p-10 sm:p-12 rounded-2xl space-y-5 shadow-xl border border-[#6E4B37]/30">
          <h2 className="text-3xl font-serif font-bold text-[#FAF6EE]">Explora el archivo de fotografías</h2>
          <p className="text-[#DFCEB5] text-sm max-w-xl mx-auto font-mono">
            Descubre las fotografías disponibles como prints y piezas enmarcadas.
          </p>
          <div className="pt-2">
            <Link
              to="/prints"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C85A32] hover:bg-[#B24B25] text-white font-semibold text-sm rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <span>Ir al Archivo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
