import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, SERIES_CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

export default function Prints({ onOpenZoom }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSeries = searchParams.get('serie') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState(initialSeries);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedOrientation, setSelectedOrientation] = useState('all');

  useEffect(() => {
    const serieParam = searchParams.get('serie');
    if (serieParam) {
      setSelectedSeries(serieParam);
    }
  }, [searchParams]);

  const handleSeriesChange = (seriesId) => {
    setSelectedSeries(seriesId);
    if (seriesId === 'all') {
      searchParams.delete('serie');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ serie: seriesId });
    }
  };

  const locations = useMemo(() => {
    const set = new Set(PRODUCTS.map(p => p.country || p.location.split(',')[1]?.trim() || p.location.split(',')[0]));
    return Array.from(set);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.story.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeries =
        selectedSeries === 'all' || p.series === selectedSeries;

      const matchesLocation =
        selectedLocation === 'all' ||
        p.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        (p.country && p.country.toLowerCase() === selectedLocation.toLowerCase());

      const matchesOrientation =
        selectedOrientation === 'all' || p.orientation === selectedOrientation;

      return matchesSearch && matchesSeries && matchesLocation && matchesOrientation;
    });
  }, [searchTerm, selectedSeries, selectedLocation, selectedOrientation]);

  const hasFilters = searchTerm || selectedSeries !== 'all' || selectedLocation !== 'all' || selectedOrientation !== 'all';

  return (
    <div className="pb-20 sm:pb-28 pt-6 sm:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-12">
        
        {/* Minimalist Exhibition Header */}
        <div className="border-b border-[#E6E1DA] pb-8 sm:pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#8C4A32] block">
              Catálogo 35mm · Viajes & Mundo Ecuestre
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413]">
              Archivo Fotográfico
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6A63] max-w-md font-light leading-relaxed">
            Obras en película de 35mm divididas entre fotografía de viajes y fotografía ecuestre. Configura cada pieza como lámina Fine Art o cuadro enmarcado.
          </p>
        </div>

        {/* Series Tabs + Filters Bar */}
        <div className="space-y-5 sm:space-y-6 pb-6 border-b border-[#E6E1DA]">
          
          {/* Primary Series Selector (Viajes vs Ecuestre) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {SERIES_CATEGORIES.map((cat) => {
              const active = selectedSeries === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSeriesChange(cat.id)}
                  className={`px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] border transition-colors ${
                    active
                      ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                      : 'bg-transparent text-[#6E6A63] border-[#E6E1DA] hover:border-[#141413] hover:text-[#141413]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Filters Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-1">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#9C968E]">
                  Origen:
                </span>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-mono">
                  <button
                    onClick={() => setSelectedLocation('all')}
                    className={`uppercase tracking-wider transition-colors ${
                      selectedLocation === 'all'
                        ? 'text-[#141413] underline underline-offset-4'
                        : 'text-[#6E6A63] hover:text-[#141413]'
                    }`}
                  >
                    Todos
                  </button>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`uppercase tracking-wider transition-colors ${
                        selectedLocation === loc
                          ? 'text-[#141413] underline underline-offset-4'
                          : 'text-[#6E6A63] hover:text-[#141413]'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <span className="hidden sm:inline text-[#E6E1DA]">|</span>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#9C968E]">
                  Orientación:
                </span>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-mono">
                  {[
                    { id: 'all', label: 'Todas' },
                    { id: 'horizontal', label: 'Horizontal' },
                    { id: 'vertical', label: 'Vertical' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOrientation(opt.id)}
                      className={`uppercase tracking-wider transition-colors ${
                        selectedOrientation === opt.id
                          ? 'text-[#141413] underline underline-offset-4'
                          : 'text-[#6E6A63] hover:text-[#141413]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Minimalist Search Input */}
            <div className="flex items-center justify-between sm:justify-start gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#9C968E] absolute left-0 top-1/2 -translate-y-1/2 stroke-[1.5]" />
                <input
                  type="text"
                  placeholder="Buscar obra o lugar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-6 pr-2 py-1.5 bg-transparent border-b border-[#E6E1DA] text-xs font-mono text-[#141413] placeholder:text-[#9C968E] focus:outline-none focus:border-[#141413] transition-colors"
                />
              </div>

              {hasFilters && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    handleSeriesChange('all');
                    setSelectedLocation('all');
                    setSelectedOrientation('all');
                  }}
                  className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#6E6A63] hover:text-[#141413] underline shrink-0"
                >
                  Restablecer
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Works Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 sm:py-24 text-center space-y-4 border border-[#E6E1DA] bg-[#F4F0EA]/40 px-4 sm:px-6">
            <p className="text-xl sm:text-2xl font-serif text-[#141413]">
              {selectedSeries === 'ecuestre'
                ? 'Próximamente nuevas obras de la Serie Ecuestre & Caballos'
                : 'No se encontraron obras con los criterios seleccionados'}
            </p>
            <p className="text-xs text-[#6E6A63] max-w-md mx-auto font-light leading-relaxed">
              {selectedSeries === 'ecuestre'
                ? 'Actualmente estamos digitalizando y preparando las nuevas copias en 35mm de equitación y caballos. Puedes explorar la Serie Viajes o consultar directamente por encargos ecuestres.'
                : 'Intenta restablecer los filtros para explorar todo el catálogo.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchTerm('');
                  handleSeriesChange('all');
                  setSelectedLocation('all');
                  setSelectedOrientation('all');
                }}
                className="px-6 py-3 bg-[#141413] text-[#FAF8F5] text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em]"
              >
                Ver todo el archivo disponible
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-12 sm:gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onOpenZoom={onOpenZoom} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
