import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-20 sm:pb-28 pt-8 sm:pt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 space-y-14 sm:space-y-16">
        
        {/* Top Intro */}
        <div className="border-b border-[#E6E1DA] pb-8 sm:pb-10 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C4A32] block">
            Sobre mí · JavaOnFilm
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] leading-tight max-w-3xl">
            Entre el código, los viajes y la equitación.
          </h1>
          <p className="text-sm sm:text-base text-[#6E6A63] leading-relaxed font-light max-w-2xl">
            Soy programadora y gran parte de mi día transcurre frente a una pantalla. Por lo mismo, la fotografía analógica en 35mm se transformó en mi contrapeso fuera de lo digital: una forma de guardar en papel dos cosas que me mueven en el día a día, que son viajar para conocer otras culturas y mi práctica en la equitación.
          </p>
        </div>

        {/* Two Cards: Viajes (Plane Sunset) & Caballos (Equestrian) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 border-b border-[#E6E1DA] pb-14 sm:pb-16">
          
          {/* Column 1: Viajes */}
          <div className="space-y-4">
            <img
              src="/images/about-plane-sunset.jpg"
              alt="Vista de avión al atardecer en 35mm"
              className="w-full h-[260px] sm:h-[320px] object-cover"
            />
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C4A32] block">
                01 / Viajes
              </span>
              <h2 className="text-2xl font-serif font-normal text-[#141413]">
                Viajar y conocer otras culturas
              </h2>
              <p className="text-xs sm:text-sm text-[#6E6A63] leading-relaxed font-light">
                Siempre que puedo salgo de viaje para conocer otros lugares, sus ritmos y su gente. Viajar con una cámara compacta de 35mm me permite registrar cada destino sin pantallas de por medio, tal como se vio en ese momento.
              </p>
            </div>
          </div>

          {/* Column 2: Equitación & Caballos */}
          <div className="space-y-4">
            <img
              src="/images/about-horse-film.jpg"
              alt="Fotografía de caballo y equitación en 35mm"
              className="w-full h-[260px] sm:h-[320px] object-cover"
            />
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C4A32] block">
                02 / Caballos
              </span>
              <h2 className="text-2xl font-serif font-normal text-[#141413]">
                Mi práctica en equitación
              </h2>
              <p className="text-xs sm:text-sm text-[#6E6A63] leading-relaxed font-light">
                Hago equitación y paso gran parte de mi tiempo entre caballos. Fotografiarlos en película analógica es una forma muy natural de unir esa disciplina con el archivo visual que voy armando rollo a rollo.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Camera & Gear + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5">
            <img
              src="/images/about-camera-film.jpg"
              alt="Olympus mju I y Kodak Gold 200"
              className="w-full h-[220px] sm:h-[240px] object-cover"
            />
          </div>

          <div className="md:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C4A32] block">
                35mm
              </span>
              <h3 className="text-2xl font-serif font-normal text-[#141413]">
                Del rollo al cuadro
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6A63] leading-relaxed font-light">
                Cada rollo tiene solo 36 disparos y no se puede ver el resultado hasta revelarlo. Las fotos que más me gustan tras cada revelado las subo a esta web para que puedas encargarlas impresas o enmarcadas a medida.
              </p>
            </div>

            <div className="pt-3 grid grid-cols-3 gap-4 border-t border-[#E6E1DA] text-xs font-mono">
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

            <div className="pt-1">
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
