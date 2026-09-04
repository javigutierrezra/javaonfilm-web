import React from 'react';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer class="bg-white border-t border-slate-200/80 py-12 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Logo & Tagline */}
          <div>
            <span class="text-xl font-bold font-serif tracking-tight text-slate-900 block">
              JavaOnFilm
            </span>
            <p class="text-xs text-slate-500 mt-1 font-medium tracking-wide">
              Analog photography · 35mm · Travel prints
            </p>
          </div>

          {/* Social Links */}
          <div class="flex items-center gap-6">
            <a
              href="https://instagram.com/javaonfilm"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand transition-colors"
            >
              <Instagram class="w-4 h-4 text-brand" />
              <span>@javaonfilm</span>
            </a>
          </div>

          {/* Copyright */}
          <div class="text-xs text-slate-400 font-normal">
            &copy; {new Date().getFullYear()} JavaOnFilm. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}
