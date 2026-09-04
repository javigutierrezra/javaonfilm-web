import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Film } from 'lucide-react';

export default function Header({ cartCount, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Cuadros (Prints)', path: '/prints' },
    { name: 'Sobre', path: '/about' },
    { name: 'Contacto', path: '/contact' }
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-4' : 'bg-[#FAF8F5]/80 backdrop-blur-sm py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo JavaOnFilm con Rollo Analógico 35mm */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-bold font-serif tracking-tight text-slate-900 group-hover:text-brand transition-colors block leading-none">
                JavaOnFilm
              </span>
              <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase block mt-1">
                Fine Art 35mm Prints
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative transition-colors duration-200 hover:text-brand ${isActive ? 'text-brand font-bold' : ''}`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-700 hover:text-brand transition-colors rounded-xl hover:bg-slate-100/80"
              aria-label="Ver Carrito de Compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-brand focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-md px-6 py-5 mt-3 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-base font-semibold transition-colors ${location.pathname === link.path ? 'text-brand font-bold' : 'text-slate-700 hover:text-brand'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
