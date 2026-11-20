import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, SERIES_CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Prints({ onOpenZoom }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSeries = searchParams.get('serie') || 'all';
  const [selectedSeries, setSelectedSeries] = useState(initialSeries);

  useEffect(() => {
    const serieParam = searchParams.get('serie');
    setSelectedSeries(serieParam || 'all');
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

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      return selectedSeries === 'all' || p.series === selectedSeries;
    });
  }, [selectedSeries]);

  return (
    <div className="pb-20 sm:pb-28 pt-8 sm:pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Simple Header + Category Filter */}
        <div className="border-b border-[#E6E1DA] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C4A32] block mb-1">
              35mm
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#141413]">
              Fotografías
            </h1>
          </div>

          {/* Filter: Todo / Viajes / Caballos */}
          <div className="flex items-center gap-2">
            {SERIES_CATEGORIES.map((cat) => {
              const active = selectedSeries === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSeriesChange(cat.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.16em] border transition-colors ${
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
        </div>

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 border border-[#E6E1DA] bg-[#F4F0EA]/40 px-4">
            <p className="text-xl font-serif text-[#141413]">
              Próximamente fotografías de Caballos
            </p>
            <button
              onClick={() => handleSeriesChange('all')}
              className="px-6 py-3 bg-[#141413] text-[#FAF8F5] text-xs font-mono uppercase tracking-[0.18em]"
            >
              Ver todas las fotografías
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onOpenZoom={onOpenZoom} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
