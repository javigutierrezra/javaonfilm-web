import React from 'react';
import { Instagram, Film } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF6EE] border-t border-[#E4DCD0] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2A1E17] text-[#C85A32] rounded flex items-center justify-center border border-[#6E4B37]/30">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <span className="text-lg font-serif font-bold tracking-tight text-[#2A1E17] block leading-none">
                JavaOnFilm
              </span>
              <p className="text-[10px] font-mono text-[#736B63] mt-1 uppercase tracking-wider">
                35MM ANALOG TRAVEL ARCHIVE
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/javaonfilm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#4A3E35] hover:text-[#C85A32] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#C85A32]" />
              <span>@javaonfilm</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs font-mono text-[#736B63]">
            &copy; {new Date().getFullYear()} JavaOnFilm. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}
