import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, FRAME_OPTIONS } from '../data/products';
import { Maximize2, ShoppingBag, ArrowLeft, Camera, Film, MapPin, Calendar, ExternalLink } from 'lucide-react';

export default function ProductDetail({ onAddToCart, onOpenZoom }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  // Customization Options
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[0]);
  const [hasPassepartout, setHasPassepartout] = useState(true);

  // Update selected size if product changes
  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Cuadro no encontrado</h2>
        <Link to="/prints" className="mt-4 inline-block text-brand font-bold">Volver al catálogo</Link>
      </div>
    );
  }

  // Calculate live total prices
  const totalCLP = selectedSize.priceCLP + selectedFrame.priceAddCLP;
  const totalUSD = selectedSize.priceUSD + selectedFrame.priceAddUSD;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      cartItemId: `${product.id}-${selectedSize.id}-${selectedFrame.id}-${hasPassepartout}`,
      title: product.title,
      location: product.location,
      image: product.image,
      size: selectedSize.label,
      frame: selectedFrame.name,
      hasPassepartout: hasPassepartout,
      price: totalCLP,
      priceUSD: totalUSD,
      purchaseUrl: product.purchaseUrl,
      quantity: 1
    };
    onAddToCart(cartItem);
  };

  const handleDirectBuy = () => {
    if (product.purchaseUrl) {
      window.open(product.purchaseUrl, '_blank');
    } else {
      handleAddToCart();
    }
  };

  // Get frame border CSS class for live photo display
  const getFrameCssClass = () => {
    switch (selectedFrame.id) {
      case 'black':
        return 'border-[14px] sm:border-[18px] border-slate-900 shadow-2xl';
      case 'oak':
        return 'border-[14px] sm:border-[18px] border-[#8B5A2B] shadow-2xl';
      case 'walnut':
        return 'border-[14px] sm:border-[18px] border-[#3A2012] shadow-2xl';
      case 'white':
        return 'border-[14px] sm:border-[18px] border-[#F1F3F5] shadow-2xl';
      default:
        return 'border-0 shadow-xl';
    }
  };

  return (
    <div className="pb-24 pt-4">
      
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          to="/prints"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la colección</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: FINE ART PRINT DISPLAY WITH DYNAMIC FRAME */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm flex flex-col justify-center relative overflow-hidden">
              
              <div className="relative mx-auto max-w-lg w-full py-4 transition-all duration-500">
                
                {/* Frame container */}
                <div className={`transition-all duration-300 rounded-sm overflow-hidden ${getFrameCssClass()}`}>
                  <div className={hasPassepartout && selectedFrame.id !== 'none' ? 'bg-[#FDFBF7] p-6 sm:p-10 transition-all shadow-inner' : 'p-0'}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={`w-full ${product.orientation === 'vertical' ? 'h-[460px] sm:h-[520px]' : 'h-[360px] sm:h-[420px]'} object-cover shadow-sm transition-transform duration-500`}
                    />
                  </div>
                </div>

                {/* Full HD Zoom Action Button */}
                <button
                  onClick={() => onOpenZoom(product)}
                  className="absolute top-8 right-4 p-3 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full backdrop-blur-md shadow-lg transition-transform hover:scale-110"
                  title="Ver Fotografía Completa HD en pantalla completa"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>

                <p className="text-center text-xs text-slate-400 font-mono mt-5">
                  Vista previa de cuadro: <span className="font-bold text-slate-700">{selectedFrame.name}</span> {hasPassepartout && selectedFrame.id !== 'none' ? '(Con Paspartú Blanco Galería)' : '(Sin Paspartú)'}
                </p>
              </div>

            </div>

            {/* AUTHENTIC TRAVEL STORY BOX */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-brand font-bold text-xs uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                <span>La Historia detrás de esta Fotografía</span>
              </div>

              <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                “{product.story}”
              </h3>

              {/* Film & Technical Metadata Tags */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Ubicación</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-brand" />
                    {product.location}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Película (35mm)</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Film className="w-3.5 h-3.5 text-brand" />
                    {product.film}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Cámara</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{product.camera}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Año</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-brand" />
                    {product.year}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: SELECTION & PURCHASING PANEL */}
          <div className="lg:col-span-5 space-y-8 sticky top-24">
            
            {/* Title & Price Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-bold">
                  {product.location} · {product.year}
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
                  {product.title}
                </h1>
                <p className="text-xs text-brand font-semibold mt-1">
                  Fotografía Análoga 35mm Fine Art
                </p>
              </div>

              {/* Price computation display */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Precio Total</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    ${totalCLP.toLocaleString('es-CL')} <span className="text-xs font-bold text-brand">CLP</span>
                  </div>
                  <span className="text-xs text-slate-500 block">(~${totalUSD} USD)</span>
                </div>

                <div className="text-right text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60">
                  Envíos a todo Chile y global
                </div>
              </div>

              {/* SIZE SELECTION */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 block">
                  1. Selecciona la Medida del Cuadro
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedSize(sz)}
                      className={`p-3 rounded-xl text-center border transition-all ${
                        selectedSize.id === sz.id
                          ? 'border-brand bg-indigo-50/60 text-brand ring-2 ring-brand'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="block text-xs font-bold text-slate-900">{sz.label}</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">${sz.priceCLP.toLocaleString('es-CL')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* FRAME COLOR SELECTION */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 block">
                  2. Selecciona el Color de Marco
                </label>
                <div className="space-y-2">
                  {FRAME_OPTIONS.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                        selectedFrame.id === frame.id
                          ? 'border-brand bg-indigo-50/60 ring-2 ring-brand font-bold text-slate-900'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-5 h-5 rounded-full border border-slate-300 shadow-sm shrink-0"
                          style={{ backgroundColor: frame.colorHex }}
                        />
                        <span>{frame.name}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {frame.priceAddCLP > 0 ? `+$${frame.priceAddCLP.toLocaleString('es-CL')} CLP` : 'Incluido'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PASSEPARTOUT TOGGLE */}
              {selectedFrame.id !== 'none' && (
                <div className="pt-2">
                  <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/80 transition-colors">
                    <span className="text-xs font-bold text-slate-800">
                      Incluir Paspartú Blanco Galería (Borde Blanco)
                    </span>
                    <input
                      type="checkbox"
                      checked={hasPassepartout}
                      onChange={(e) => setHasPassepartout(e.target.checked)}
                      className="w-4 h-4 text-brand rounded focus:ring-brand"
                    />
                  </label>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-brand hover:bg-brand-hover text-white text-sm font-bold rounded-xl shadow-lg shadow-brand/20 transition flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Añadir Cuadro al Carrito</span>
                </button>

                <button
                  onClick={handleDirectBuy}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2"
                >
                  <span>Comprar Directo (Mercado Pago / Shopify)</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-400 font-medium">
                  Impresión fine art pigmentada de larga duración · Envíos seguros en caja de madera protectora.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
