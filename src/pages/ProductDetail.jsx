import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, FORMAT_OPTIONS, FRAME_OPTIONS, STORE_CONFIG } from '../data/products';
import { Maximize2, ShoppingBag, ArrowLeft, Camera, Film, MapPin, Calendar, MessageCircle, Info } from 'lucide-react';

export default function ProductDetail({ onAddToCart, onOpenZoom }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  // Options State
  const [selectedFormat, setSelectedFormat] = useState(FORMAT_OPTIONS[2]); // Default: Enmarcado 30x45
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[1]);   // Default: Madera natural

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#2A1E17]">Fotografía no encontrada en el archivo</h2>
        <Link to="/prints" className="mt-4 inline-block text-[#C85A32] font-mono text-sm font-bold">Volver al archivo</Link>
      </div>
    );
  }

  const placeName = product.place || product.location?.split(',')[0] || '';
  const countryName = product.country || product.location?.split(',')[1]?.trim() || '';

  // Total price
  const totalCLP = selectedFormat.priceCLP;
  const totalUSD = selectedFormat.priceUSD;

  const handleAddToCart = () => {
    const frameLabel = selectedFormat.requiresFrame ? selectedFrame.name : 'Sin Marco (Lámina Solo)';
    const cartItem = {
      id: product.id,
      cartItemId: `${product.id}-${selectedFormat.id}-${selectedFrame.id}`,
      title: product.title,
      location: `${placeName}, ${countryName}`,
      image: product.image,
      size: selectedFormat.label,
      frame: frameLabel,
      price: totalCLP,
      priceUSD: totalUSD,
      quantity: 1
    };
    onAddToCart(cartItem);
  };

  const handleWhatsAppQuote = () => {
    const fullImageUrl = window.location.origin + product.image;
    const pageUrl = window.location.href;
    const frameText = selectedFormat.requiresFrame ? `Marco: ${selectedFrame.name}` : 'Lámina Fine Art (Sin marco)';
    
    let text = `📸 *SOLICITUD DE COMPRA / ENCARGO — JavaOnFilm*%0A`;
    text += `----------------------------------------%0A`;
    text += `🖼️ *Fotografía:* ${product.title} (${product.archiveCode || 'PHOTO'})%0A`;
    text += `📍 *Lugar:* ${placeName}, ${countryName} (${product.year})%0A`;
    text += `🎞️ *Especificaciones:* Olympus mju I · Kodak Gold 200 · 35mm%0A%0A`;
    text += `📐 *Selección:*%0A`;
    text += `• *Formato:* ${selectedFormat.label}%0A`;
    text += `• *Acabado:* ${frameText}%0A%0A`;
    text += `💰 *Valor:* $${totalCLP.toLocaleString('es-CL')} CLP (~$${totalUSD} USD)%0A%0A`;
    text += `🖼️ *Fotografía HD:* ${fullImageUrl}%0A`;
    text += `🔗 *Enlace:* ${pageUrl}%0A%0A`;
    text += `¡Hola! Quisiera encargar esta fotografía y coordinar el despacho.`;

    const phone = STORE_CONFIG.whatsAppNumber || "56968449779";
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  // Frame Border Helper for display
  const getFrameCssClass = () => {
    if (!selectedFormat.requiresFrame) return 'border-0 shadow-lg';
    switch (selectedFrame.id) {
      case 'black':
        return 'border-[14px] sm:border-[18px] border-[#181411] shadow-2xl';
      case 'natural-wood':
      default:
        return 'border-[14px] sm:border-[18px] border-[#8C6246] shadow-2xl';
    }
  };

  return (
    <div className="pb-24 pt-4">
      
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          to="/prints"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#736B63] hover:text-[#C85A32] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al archivo de fotografías</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP SECTION: PHOTO PROTAGONIST & SELECTION PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: LARGE PROTAGONIST PHOTO DISPLAY */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* LARGE PHOTO CONTAINER */}
            <div className="bg-[#FAF6EE] rounded-2xl border border-[#E4DCD0] p-6 sm:p-10 shadow-sm flex flex-col justify-center relative overflow-hidden transition-all duration-500 min-h-[480px]">
              
              <div className="relative mx-auto max-w-lg w-full py-2 transition-all duration-500">
                
                {/* Frame / Print Container */}
                <div className={`transition-all duration-500 rounded-sm overflow-hidden mx-auto ${getFrameCssClass()}`}>
                  <div className="flex items-center justify-center bg-[#FAF6EE] p-2 sm:p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-auto h-auto max-h-[500px] max-w-full object-contain shadow-sm transition-all duration-500 rounded"
                    />
                  </div>
                </div>

                {/* Full HD Zoom Action Button */}
                <button
                  onClick={() => onOpenZoom(product)}
                  className="absolute top-4 right-4 p-3 bg-[#2A1E17]/85 hover:bg-[#2A1E17] text-white rounded-full backdrop-blur-md shadow-lg transition-transform hover:scale-110"
                  title="Ver Fotografía Completa HD"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>

                <div className="mt-4 text-center space-y-1">
                  <p className="text-xs text-[#2A1E17] font-mono font-bold">
                    {selectedFormat.label} {selectedFormat.requiresFrame ? `· Marco ${selectedFrame.name}` : ''}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: SELECTION & PURCHASING PANEL */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            
            <div className="bg-[#FAF6EE] p-6 sm:p-8 rounded-2xl border border-[#E4DCD0] shadow-sm space-y-6">
              
              {/* Header Info */}
              <div>
                <span className="text-xs font-mono text-[#C85A32] uppercase tracking-widest block font-bold">
                  {product.archiveCode || "PHOTO"} · {placeName}, {countryName}
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1E17] mt-1">
                  {product.title}
                </h1>
                
                {/* Tech Badge Specified by User */}
                <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-[#EFE5D5] border border-[#E4DCD0] rounded-full text-xs font-mono font-semibold text-[#2A1E17]">
                  <Film className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Olympus mju I · Kodak Gold 200 · 35mm</span>
                </div>
              </div>

              {/* Price Computation Display */}
              <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#E4DCD0] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#736B63] uppercase tracking-wider block">Valor de la pieza</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#2A1E17]">
                    ${totalCLP.toLocaleString('es-CL')} <span className="text-xs font-bold text-[#C85A32]">CLP</span>
                  </div>
                  <span className="text-xs font-mono text-[#736B63] block">(~${totalUSD} USD)</span>
                </div>

                <div className="text-right text-[11px] font-mono text-[#6E4B37] bg-[#EFE5D5] px-3 py-1.5 rounded-lg border border-[#E4DCD0]">
                  Pieza física original
                </div>
              </div>

              {/* FORMAT SELECTION */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#2A1E17] block">
                  1. Selección de Formato
                </label>
                <div className="space-y-2">
                  {FORMAT_OPTIONS.map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`w-full p-3 rounded-lg border flex items-center justify-between text-xs transition-all ${
                        selectedFormat.id === fmt.id
                          ? 'border-[#C85A32] bg-[#F6EAE1] ring-2 ring-[#C85A32] font-bold text-[#2A1E17]'
                          : 'border-[#E4DCD0] bg-[#FDFBF7] hover:border-[#C85A32] text-[#2A1E17]'
                      }`}
                    >
                      <span className="font-semibold">{fmt.label}</span>
                      <span className="font-mono text-[11px] text-[#C85A32] font-bold">
                        ${fmt.priceCLP.toLocaleString('es-CL')} CLP
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* FRAME COLOR SELECTION (Shown only when format requires frame) */}
              {selectedFormat.requiresFrame && (
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#2A1E17] block">
                    2. Selección de Marco
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {FRAME_OPTIONS.map((frame) => (
                      <button
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame)}
                        className={`p-3 rounded-lg border flex items-center gap-3 text-xs transition-all ${
                          selectedFrame.id === frame.id
                            ? 'border-[#C85A32] bg-[#F6EAE1] ring-2 ring-[#C85A32] font-bold text-[#2A1E17]'
                            : 'border-[#E4DCD0] bg-[#FDFBF7] hover:border-[#C85A32] text-[#2A1E17]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-[#D5C9B8] shadow-sm shrink-0"
                          style={{ backgroundColor: frame.colorHex }}
                        />
                        <span>{frame.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full py-4 bg-[#C85A32] hover:bg-[#B24B25] text-white font-bold text-sm rounded-lg shadow-md transition flex items-center justify-center gap-2.5 group"
                >
                  <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                  <span>Comprar / Encargar</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-[#FAF6EE] hover:bg-[#EFE5D5] text-[#2A1E17] border border-[#E4DCD0] text-xs font-mono font-semibold rounded-lg transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C85A32]" />
                  <span>Añadir a mi Cotización Múltiple</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: "LA FOTOGRAFÍA" (2-4 LINES ABOUT STORY/LOCATION) */}
        <section className="max-w-4xl mx-auto bg-[#FAF6EE] p-8 sm:p-10 rounded-2xl border border-[#E4DCD0] shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#C85A32] font-mono text-xs font-bold uppercase tracking-widest">
            <Info className="w-4 h-4" />
            <span>La fotografía</span>
          </div>
          
          <h2 className="text-2xl font-serif font-bold text-[#2A1E17]">
            {product.title} — {placeName}, {countryName}
          </h2>

          <p className="text-base text-[#5A4C40] leading-relaxed font-normal">
            {product.story}
          </p>

          <div className="pt-4 border-t border-[#E4DCD0] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#736B63]">
            <div>
              <span className="block text-[10px] uppercase font-bold text-[#2A1E17]">Cámara</span>
              <span>Olympus mju I</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-[#2A1E17]">Película</span>
              <span>Kodak Gold 200</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-[#2A1E17]">Formato</span>
              <span>Película 35mm</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-[#2A1E17]">Año</span>
              <span>{product.year}</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
