import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Camera, Heart, Globe, ArrowRight, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-24 pt-8 space-y-16">
      
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-brand text-xs font-bold uppercase tracking-wider">
          <Film className="w-3.5 h-3.5" />
          <span>La Historia Detrás del Rollo</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
          Capturar el mundo en 35mm para transformarlo en arte cotidiano.
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed font-normal">
          JavaOnFilm es una marca de fotografía analógica independiente nacida de viajes, curiosidad por la luz y el deseo de preservar momentos únicos en soporte físico fine art.
        </p>
      </section>

      {/* Main Narrative Image & Text */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm">
          
          <div className="lg:col-span-6 relative">
            <img
              src="/olympus-mju.jpg"
              alt="Cámara análoga Olympus µ[mju:] I 35mm"
              className="w-full h-[440px] object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-500 bg-slate-100"
            />
            <div className="absolute -bottom-4 -right-4 bg-brand text-white p-4 rounded-2xl shadow-xl hidden sm:block max-w-xs">
              <p className="text-xs font-mono font-bold">"Toda la colección de JavaOnFilm está capturada con la Olympus µ[mju:] I."</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              ¿Por qué Fotografía Análoga?
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              En una era dominada por pantallas y ráfagas digitales instantáneas, la fotografía en película química nos obliga a desacelerar. Solamente tenemos 36 exposiciones por rollo. Cada encuadre es medido, cada sombra es observada y la luz queda físicamente grabada en haluros de plata.
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              Ese grano característico, los tonos orgánicos de la película Kodak y Fujifilm, y la óptica cristalina de 35mm le otorgan a cada cuadro una textura viva e irrepetible.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-100 text-xs">
              <div>
                <span className="font-bold text-slate-900 text-sm block">100% Auténtico</span>
                <span className="text-slate-500">Película química 35mm sin filtros</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">Cámara Signature</span>
                <span className="text-slate-500">Olympus µ[mju:] I</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Equipment Highlight: Olympus mju I */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-brand uppercase tracking-widest block">La Cámara</span>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Olympus µ[mju:] I</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            La legendaria point-and-shoot de 35mm lanzada en 1991 que acompaña cada uno de mis viajes.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 bg-brand text-white rounded-2xl flex items-center justify-center font-mono font-bold text-lg shadow-md shrink-0">
              µ
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Olympus µ[mju:] I (35mm f/3.5)</h3>
              <p className="text-xs text-brand font-semibold">Diseño Cápsula Ultracompacto · Japón 1991</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block text-sm">Óptica Cristalina 35mm</span>
              <p className="leading-relaxed">
                Su lente fija de 35mm f/3.5 entrega una nitidez legendaria, contraste vibrante y viñeteado orgánico sutil en los bordes.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block text-sm">Agilidad de Viaje</span>
              <p className="leading-relaxed">
                Su diseño tipo concha protectora permite llevarla en el bolsillo a todos lados y capturar momentos instantáneos sin llamar la atención.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block text-sm">Carácter Analógico Único</span>
              <p className="leading-relaxed">
                La combinación de su enfoque preciso con películas Kodak Portra, Gold y CineStill produce la firma estética de JavaOnFilm.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 text-white p-10 sm:p-14 rounded-3xl space-y-6 shadow-2xl">
          <h2 className="text-3xl font-serif font-bold">Lleva un trozo de viaje a tus muros</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Explora la colección de cuadros de JavaOnFilm capturados en película de 35mm.
          </p>
          <div className="pt-2">
            <Link
              to="/prints"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand hover:bg-brand-hover text-white font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <span>Ver Colección de Cuadros</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
