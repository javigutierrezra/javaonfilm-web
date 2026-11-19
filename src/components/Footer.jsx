import React from 'react';
import { Link } from 'react-router-dom';
import { FilmCanisterIcon } from './Header';

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E6E1DA] py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E6E1DA]">
          
          {/* Brand Column with 35mm Roll Logo */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#E6E1DA] bg-[#F4F0EA] flex items-center justify-center text-[#141413]">
                <FilmCanisterIcon className="w-5 h-5" />
              </div>
              <span className="text-xl font-serif font-medium tracking-[0.06em] text-[#141413] block">
                JAVA ON FILM
              </span>
            </div>
            <p className="text-xs text-[#6E6A63] max-w-sm leading-relaxed font-light">
              Archivo de fotografía analógica en 35mm enfocado en dos mundos: paisajes de viajes y fotografía ecuestre. Obras impresas en papel Fine Art de algodón y enmarcadas a medida en Chile.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">
              Explorar
            </span>
            <ul className="space-y-2 text-xs text-[#6E6A63]">
              <li><Link to="/" className="hover:text-[#141413] transition-colors">Inicio</Link></li>
              <li><Link to="/prints" className="hover:text-[#141413] transition-colors">Archivo 35mm (Viajes & Ecuestre)</Link></li>
              <li><Link to="/about" className="hover:text-[#141413] transition-colors">El Proyecto & Equipo</Link></li>
              <li><Link to="/contact" className="hover:text-[#141413] transition-colors">Encargos & Contacto</Link></li>
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">
              Contacto
            </span>
            <ul className="space-y-2 text-xs text-[#6E6A63]">
              <li>
                <a
                  href="https://instagram.com/javaonfilm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#141413] transition-colors"
                >
                  Instagram — @javaonfilm
                </a>
              </li>
              <li>
                <a
                  href="mailto:javaonfilm@gmail.com"
                  className="hover:text-[#141413] transition-colors"
                >
                  javaonfilm@gmail.com
                </a>
              </li>
              <li className="text-[#9C968E] font-mono text-[11px] pt-1">
                Santiago, Chile
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.16em] text-[#9C968E]">
          <span>&copy; {new Date().getFullYear()} JavaOnFilm. Todos los derechos reservados.</span>
          <span>Olympus mju I · Kodak Gold 200 · 35mm</span>
        </div>
      </div>
    </footer>
  );
}
