import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function FilmCanisterIcon({ className = "w-7 h-7" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M7 4.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 4.5V7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12.5 4.5V7" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5.5" y="7" width="11" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5.5" y1="11" x2="16.5" y2="11" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="5.5" y1="21" x2="16.5" y2="21" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M8 27H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 25V27" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16.5 10H26.5C27.0523 10 27.5 10.4477 27.5 11V19.5C27.5 20.0523 27.0523 20.5 26.5 20.5H23.5L21.5 22.5H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="19.5" cy="12.5" r="0.85" fill="#8C4A32" />
      <circle cx="22.5" cy="12.5" r="0.85" fill="#8C4A32" />
      <circle cx="25.5" cy="12.5" r="0.85" fill="#8C4A32" />
      <circle cx="19.5" cy="18" r="0.85" fill="#8C4A32" />
      <circle cx="22.5" cy="18" r="0.85" fill="#8C4A32" />
    </svg>
  );
}

export default function Header({ cartCount, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Fotografías', path: '/prints' },
    { name: 'Sobre mí', path: '/about' },
    { name: 'Contacto', path: '/contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-[#E6E1DA] py-3.5 sm:py-4'
          : 'bg-[#FAF8F5] border-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-2">
          
          {/* Analog Film Roll Logo + Wordmark */}
          <Link to="/" className="group flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 border border-[#E6E1DA] bg-[#F4F0EA] group-hover:border-[#141413] transition-colors flex items-center justify-center text-[#141413] shrink-0">
              <FilmCanisterIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-lg sm:text-2xl font-serif font-medium tracking-[0.04em] text-[#141413] block leading-none truncate">
                JAVA ON FILM
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-[#6E6A63] tracking-[0.15em] sm:tracking-[0.2em] uppercase block mt-1 truncate">
                35MM · VIAJES & CABALLOS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 shrink-0">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-xs uppercase tracking-[0.16em] transition-colors duration-200 py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-[#141413] font-medium'
                      : 'text-[#6E6A63] hover:text-[#141413]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#141413]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-5 shrink-0">
            <button
              onClick={onOpenCart}
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[#141413] hover:text-[#6E6A63] transition-colors flex items-center gap-1.5 py-1.5 px-1 whitespace-nowrap"
              aria-label="Ver Carrito"
            >
              <span>Carrito</span>
              <span className="text-[11px] font-mono text-[#8C4A32]">
                ({cartCount})
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#141413] hover:text-[#6E6A63] focus:outline-none"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.25]" /> : <Menu className="w-5 h-5 stroke-[1.25]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E6E1DA] bg-[#FAF8F5] px-5 py-6 mt-3.5 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-xs uppercase tracking-[0.2em] py-1 transition-colors ${
                location.pathname === link.path
                  ? 'text-[#141413] font-semibold'
                  : 'text-[#6E6A63] hover:text-[#141413]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
