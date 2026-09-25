import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Folder } from 'lucide-react';

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
    <div className="space-y-10 pb-24">
      
      {/* Catalog Header - Archival Folder Header */}
      <div className="bg-[#FAF6EE] border-b border-[#E4DCD0] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE5D5] text-[#C85A32] text-[11px] font-mono font-bold tracking-widest uppercase rounded-full">
            <Folder className="w-3.5 h-3.5" />
            <span>ARCHIVAL COLLECTION · 35MM FINE ART</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2A1E17]">
            Colección de Cuadros Análogos
          </h1>
          <p className="text-base text-[#5A4C40] max-w-2xl mx-auto">
            Cada pieza incluye certificado de autenticidad y está impresa en papel fine art de algodón, lista para ser montada en tus espacios.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filters Toolbar - Archival Index Drawer */}
        <div className="bg-[#FAF6EE] p-5 sm:p-6 rounded-xl border border-[#E4DCD0] shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#736B63] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por lugar, título o historia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm focus:outline-none focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] text-[#2A1E17] placeholder:text-[#93887D]"
              />
            </div>

            {/* Select Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              
              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-xs font-mono text-[#2A1E17] focus:outline-none focus:border-[#C85A32]"
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
                className="px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-xs font-mono text-[#2A1E17] focus:outline-none focus:border-[#C85A32]"
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
                className="px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-xs font-mono text-[#2A1E17] focus:outline-none focus:border-[#C85A32]"
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
                  className="text-xs font-mono font-bold text-[#C85A32] hover:underline px-2 py-1"
                >
                  Limpiar filtros
                </button>
              )}

            </div>
          </div>

          <div className="text-xs font-mono text-[#736B63] pt-2 border-t border-[#E4DCD0] flex items-center justify-between">
            <span>MOSTRANDO {filteredProducts.length} DE {PRODUCTS.length} FOTOGRAFÍAS EN ARCHIVO</span>
            <span>JAVAONFILM ARCHIVE INDEX</span>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF6EE] rounded-xl border border-[#E4DCD0] p-8 space-y-4">
            <SlidersHorizontal className="w-10 h-10 text-[#736B63] mx-auto" />
            <h3 className="text-lg font-serif font-bold text-[#2A1E17]">No se encontraron archivos de fotografía</h3>
            <p className="text-xs font-mono text-[#736B63] max-w-md mx-auto">
              Intenta cambiar los términos de búsqueda o restablecer los filtros para explorar el archivo completo.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('all');
                setSelectedFilm('all');
                setSelectedOrientation('all');
              }}
              className="px-5 py-2.5 bg-[#C85A32] text-white font-semibold text-xs rounded-lg hover:bg-[#B24B25] transition"
            >
              Ver todos los cuadros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onOpenZoom={onOpenZoom} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
