import React from 'react';
import { Link } from 'react-router-dom';
import { FilmCanisterIcon } from './Header';

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E6E1DA] py-10 sm:py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <Link to="/" className="flex items-center gap-3">
          <div className="w-7 h-7 border border-[#E6E1DA] bg-[#F4F0EA] flex items-center justify-center text-[#141413]">
            <FilmCanisterIcon className="w-4 h-4" />
          </div>
          <span className="text-base font-serif font-medium tracking-[0.06em] text-[#141413]">
            JAVA ON FILM
          </span>
        </Link>

        <div className="flex items-center gap-6 text-[11px] font-mono uppercase tracking-[0.16em] text-[#6E6A63]">
          <a
            href="https://instagram.com/javaonfilm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#141413] transition-colors"
          >
            @javaonfilm
          </a>
          <span>·</span>
          <a
            href="mailto:javaonfilm@gmail.com"
            className="hover:text-[#141413] transition-colors"
          >
            Email
          </a>
        </div>

        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#9C968E]">
          &copy; {new Date().getFullYear()} JavaOnFilm · 35mm
        </span>

      </div>
    </footer>
  );
}
