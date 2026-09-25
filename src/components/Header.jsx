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
    { name: 'Sobre el Archivo', path: '/about' },
    { name: 'Contacto', path: '/contact' }
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#E4DCD0] shadow-sm py-3.5' : 'bg-[#F6F1E7]/80 backdrop-blur-sm py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo JavaOnFilm con Rollo Analógico 35mm & Estampa de Archivo */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 bg-[#2A1E17] text-[#C85A32] rounded-lg border border-[#6E4B37]/30 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold tracking-tight text-[#2A1E17] group-hover:text-[#C85A32] transition-colors block leading-none">
                JavaOnFilm
              </span>
              <span className="text-[10px] font-mono text-[#736B63] tracking-widest uppercase block mt-1">
                ARCHIVAL FINE ART · 35MM
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A3E35]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative transition-colors duration-200 hover:text-[#C85A32] ${isActive ? 'text-[#C85A32] font-semibold' : ''}`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#C85A32] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-[#2A1E17] hover:text-[#C85A32] transition-colors rounded-lg hover:bg-[#EFE5D5]/60 border border-transparent hover:border-[#E4DCD0]"
              aria-label="Ver Carrito de Compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C85A32] text-white text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2A1E17] hover:text-[#C85A32] focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4DCD0] bg-[#FAF6EE]/98 backdrop-blur-md px-6 py-5 mt-3 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-base transition-colors ${location.pathname === link.path ? 'text-[#C85A32] font-bold' : 'text-[#4A3E35] hover:text-[#C85A32]'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
