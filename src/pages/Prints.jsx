import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export default function Prints({ onOpenZoom }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedFilm, setSelectedFilm] = useState('all');
  const [selectedOrientation, setSelectedOrientation] = useState('all');

  // Extract unique filter options
  const locations = useMemo(() => {
    const set = new Set(PRODUCTS.map(p => p.location.split(',')[0]));
    return Array.from(set);
  }, []);

  const films = useMemo(() => {
    const set = new Set(PRODUCTS.map(p => p.film));
    return Array.from(set);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.story.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = selectedLocation === 'all' || p.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesFilm = selectedFilm === 'all' || p.film === selectedFilm;
      const matchesOrientation = selectedOrientation === 'all' || p.orientation === selectedOrientation;

      return matchesSearch && matchesLocation && matchesFilm && matchesOrientation;
    });
  }, [searchTerm, selectedLocation, selectedFilm, selectedOrientation]);

  return (
    <div className="space-y-12 pb-24">
      
      {/* Catalog Header */}
      <div className="bg-white border-b border-slate-200/70 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-extrabold text-brand uppercase tracking-widest block">
            Catálogo Fine Art 35mm
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900">
            Colección de Cuadros Análogos
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Cada pieza incluye certificado de autenticidad y está lista para ser montada en tu hogar u oficina.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filters Toolbar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por lugar, título o historia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Select Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              
              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand"
              >
                <option value="all">Todas las ubicaciones</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              {/* Film Stock Filter */}
              <select
                value={selectedFilm}
                onChange={(e) => setSelectedFilm(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand"
              >
                <option value="all">Todas las películas (35mm)</option>
                {films.map(film => (
                  <option key={film} value={film}>{film}</option>
                ))}
              </select>

              {/* Orientation Filter */}
              <select
                value={selectedOrientation}
                onChange={(e) => setSelectedOrientation(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand"
              >
                <option value="all">Orientación (Todas)</option>
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>

              {/* Clear Filters */}
              {(searchTerm || selectedLocation !== 'all' || selectedFilm !== 'all' || selectedOrientation !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedLocation('all');
                    setSelectedFilm('all');
                    setSelectedOrientation('all');
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-brand px-3 py-2"
                >
                  Limpiar filtros
                </button>
              )}

            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Mostrando {filteredProducts.length} de {PRODUCTS.length} fotografías análogas</span>
            <span className="font-mono text-slate-400">JavaOnFilm Fine Art Catalog</span>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 p-8 space-y-4">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No encontramos cuadros con esos criterios</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Intenta cambiar la búsqueda o restablecer los filtros para explorar la colección completa.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('all');
                setSelectedFilm('all');
                setSelectedOrientation('all');
              }}
              className="px-5 py-2.5 bg-brand text-white font-bold text-xs rounded-xl hover:bg-brand-hover transition"
            >
              Ver todos los cuadros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onOpenZoom={onOpenZoom} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
