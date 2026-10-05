import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, FORMAT_OPTIONS, FRAME_OPTIONS, STORE_CONFIG } from '../data/products';
import { Maximize2, ShoppingBag, ArrowLeft, Film, MessageCircle, Info, Layers } from 'lucide-react';

export default function ProductDetail({ onAddToCart, onOpenZoom }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  // Options State
  const initialOrientation = product?.orientation || 'horizontal';
  const [selectedOrientation, setSelectedOrientation] = useState(initialOrientation);
  const [selectedFormat, setSelectedFormat] = useState(FORMAT_OPTIONS[2]); // Default: Enmarcado 30x45 / 45x30
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[1]);   // Default: Madera natural
  
  // Fit Mode State (for when selected orientation differs from native photo orientation)
  const [fitMode, setFitMode] = useState('margin'); // 'margin' (Foto completa con margen) or 'crop' (Recortar para llenar)
  const [cropPosition, setCropPosition] = useState('center'); // 'center', 'top', 'bottom', 'left', 'right'

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
  const isOrientationMismatched = selectedOrientation !== product.orientation;

  // Helper for size label based on selected orientation
  const getFormattedSizeLabel = (fmt, orientation) => {
    if (orientation === 'horizontal') {
      switch (fmt.id) {
        case 'print-20x30': return 'Print Fine Art 30×20 cm';
        case 'print-30x45': return 'Print Fine Art 45×30 cm';
        case 'frame-30x45': return 'Enmarcado 45×30 cm';
        case 'frame-40x60': return 'Enmarcado 60×40 cm';
        case 'frame-50x75': return 'Enmarcado 75×50 cm';
        default: return fmt.label;
      }
    } else {
      switch (fmt.id) {
        case 'print-20x30': return 'Print Fine Art 20×30 cm';
        case 'print-30x45': return 'Print Fine Art 30×45 cm';
        case 'frame-30x45': return 'Enmarcado 30×45 cm';
        case 'frame-40x60': return 'Enmarcado 40×60 cm';
        case 'frame-50x75': return 'Enmarcado 50×75 cm';
        default: return fmt.label;
      }
    }
  };

  const formattedSizeLabel = getFormattedSizeLabel(selectedFormat, selectedOrientation);

  // Total price
  const totalCLP = selectedFormat.priceCLP;
  const totalUSD = selectedFormat.priceUSD;

  const handleAddToCart = () => {
    const frameLabel = selectedFormat.requiresFrame ? selectedFrame.name : 'Sin Marco (Lámina Solo)';
    const fitLabel = isOrientationMismatched
      ? (fitMode === 'margin' ? 'Foto completa con margen' : `Recortar para llenar (${cropPosition})`)
      : 'Encuadre Original';

    const cartItem = {
      id: product.id,
      cartItemId: `${product.id}-${selectedOrientation}-${selectedFormat.id}-${selectedFrame.id}-${fitMode}-${cropPosition}`,
      title: product.title,
      location: `${placeName}, ${countryName}`,
      image: product.image,
      size: formattedSizeLabel,
      orientation: selectedOrientation === 'horizontal' ? 'Horizontal' : 'Vertical',
      frame: frameLabel,
      fitMode: fitLabel,
      price: totalCLP,
      priceUSD: totalUSD,
      quantity: 1
    };
    onAddToCart(cartItem);
  };

  const handleWhatsAppQuote = () => {
    const fullImageUrl = window.location.origin + product.image;
    const pageUrl = window.location.href;
    const orientationText = selectedOrientation === 'horizontal' ? 'Horizontal' : 'Vertical';
    const frameText = selectedFormat.requiresFrame ? `Marco: ${selectedFrame.name}` : 'Lámina Fine Art (Sin marco)';
    const fitText = isOrientationMismatched
      ? (fitMode === 'margin' ? 'Foto completa con margen' : `Recortar para llenar (Enfoque: ${cropPosition})`)
      : 'Encuadre Original';

    let text = `📸 *SOLICITUD DE COMPRA / ENCARGO — JavaOnFilm*%0A`;
    text += `----------------------------------------%0A`;
    text += `🖼️ *Fotografía:* ${product.title} (${product.archiveCode || 'PHOTO'})%0A`;
    text += `📍 *Lugar:* ${placeName}, ${countryName} (${product.year})%0A`;
    text += `🎞️ *Especificaciones:* Olympus mju I · Kodak Gold 200 · 35mm%0A%0A`;
    text += `📐 *Selección del Cliente:*%0A`;
    text += `• *Orientación:* ${orientationText}%0A`;
    text += `• *Formato / Medida:* ${formattedSizeLabel}%0A`;
    text += `• *Acabado:* ${frameText}%0A`;
    text += `• *Ajuste de Imagen:* ${fitText}%0A%0A`;
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
        return 'border-[14px] sm:border-[20px] border-[#181411] shadow-2xl';
      case 'white':
        return 'border-[14px] sm:border-[20px] border-[#FDFBF7] shadow-2xl ring-1 ring-[#D5C9B8]';
      case 'natural-wood':
      default:
        return 'border-[14px] sm:border-[20px] border-[#8C6246] shadow-2xl';
    }
  };

  // Object position helper for crop mode
  const getCropPositionClass = () => {
    switch (cropPosition) {
      case 'top': return 'object-top';
      case 'bottom': return 'object-bottom';
      case 'left': return 'object-left';
      case 'right': return 'object-right';
      case 'center':
      default: return 'object-center';
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
            
            {/* LARGE PHOTO CONTAINER WITH DYNAMIC ASPECT RATIO */}
            <div className="bg-[#FAF6EE] rounded-2xl border border-[#E4DCD0] p-4 sm:p-8 shadow-sm flex flex-col justify-center relative overflow-hidden transition-all duration-500 min-h-[480px]">
              
              <div className={`relative mx-auto w-full py-2 transition-all duration-500 ${
                selectedOrientation === 'horizontal' ? 'max-w-xl aspect-[4/3]' : 'max-w-sm sm:max-w-md aspect-[3/4]'
              }`}>
                
                {/* Frame / Print Container */}
                <div className={`w-full h-full transition-all duration-500 rounded-sm overflow-hidden mx-auto ${getFrameCssClass()}`}>
                  <div className="w-full h-full flex items-center justify-center bg-[#FAF6EE] p-2 sm:p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className={`w-full h-full transition-all duration-500 rounded ${
                        isOrientationMismatched && fitMode === 'crop'
                          ? `object-cover ${getCropPositionClass()}`
                          : 'object-contain'
                      }`}
                    />
                  </div>
                </div>

                {/* Full HD Zoom Action Button */}
                <button
                  onClick={() => onOpenZoom(product)}
                  className="absolute top-4 right-4 p-3 bg-[#2A1E17]/85 hover:bg-[#2A1E17] text-white rounded-full backdrop-blur-md shadow-lg transition-transform hover:scale-110 z-10"
                  title="Ver Fotografía Completa HD"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>

                <div className="mt-4 text-center space-y-1">
                  <p className="text-xs text-[#2A1E17] font-mono font-bold">
                    {formattedSizeLabel} {selectedFormat.requiresFrame ? `· Marco ${selectedFrame.name}` : ''}
                  </p>
                  {isOrientationMismatched && (
                    <p className="text-[11px] font-mono text-[#C85A32]">
                      Ajuste: {fitMode === 'margin' ? 'Foto completa con margen' : `Recortar para llenar (${cropPosition})`}
                    </p>
                  )}
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

              {/* 1. ORIENTATION SELECTION */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#2A1E17] block">
                    1. Orientación del Cuadro
                  </label>
                  {product.orientation && (
                    <span className="text-[10px] font-mono text-[#C85A32] bg-[#EFE5D5] px-2 py-0.5 rounded">
                      Original: {product.orientation === 'horizontal' ? 'Horizontal' : 'Vertical'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedOrientation('horizontal')}
                    className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      selectedOrientation === 'horizontal'
                        ? 'border-[#C85A32] bg-[#F6EAE1] text-[#C85A32] font-bold ring-2 ring-[#C85A32]'
                        : 'border-[#E4DCD0] bg-[#FDFBF7] hover:border-[#C85A32] text-[#2A1E17]'
                    }`}
                  >
                    <span className="w-5 h-3.5 border-2 border-current rounded-sm shrink-0"></span>
                    <span>Horizontal</span>
                  </button>

                  <button
                    onClick={() => setSelectedOrientation('vertical')}
                    className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      selectedOrientation === 'vertical'
                        ? 'border-[#C85A32] bg-[#F6EAE1] text-[#C85A32] font-bold ring-2 ring-[#C85A32]'
                        : 'border-[#E4DCD0] bg-[#FDFBF7] hover:border-[#C85A32] text-[#2A1E17]'
                    }`}
                  >
                    <span className="w-3.5 h-5 border-2 border-current rounded-sm shrink-0"></span>
                    <span>Vertical</span>
                  </button>
                </div>
              </div>

              {/* FIT MODE SELECTION (Shown when selected orientation differs from original photo orientation) */}
              {isOrientationMismatched && (
                <div className="space-y-3 pt-2 bg-[#FDFBF7] p-4 rounded-xl border border-[#E4DCD0]">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#C85A32] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Ajuste de Imagen (Orientación Distinta)</span>
                    </label>
                    <p className="text-[11px] text-[#736B63] leading-tight">
                      La orientación elegida ({selectedOrientation === 'horizontal' ? 'Horizontal' : 'Vertical'}) difiere de la toma original. Elige cómo deseas encuadrar la obra sin deformarla:
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setFitMode('margin')}
                      className={`w-full p-3 rounded-lg border text-left text-xs transition-all ${
                        fitMode === 'margin'
                          ? 'border-[#C85A32] bg-[#F6EAE1] ring-2 ring-[#C85A32] font-bold text-[#2A1E17]'
                          : 'border-[#E4DCD0] bg-[#FAF6EE] hover:border-[#C85A32] text-[#2A1E17]'
                      }`}
                    >
                      <span className="font-semibold block text-xs">Foto completa con margen</span>
                      <span className="text-[10px] text-[#736B63] block font-normal mt-0.5 leading-tight">
                        Conserva el 100% de la fotografía completa agregando un margen para adaptarla al cuadro.
                      </span>
                    </button>

                    <button
                      onClick={() => setFitMode('crop')}
                      className={`w-full p-3 rounded-lg border text-left text-xs transition-all ${
                        fitMode === 'crop'
                          ? 'border-[#C85A32] bg-[#F6EAE1] ring-2 ring-[#C85A32] font-bold text-[#2A1E17]'
                          : 'border-[#E4DCD0] bg-[#FAF6EE] hover:border-[#C85A32] text-[#2A1E17]'
                      }`}
                    >
                      <span className="font-semibold block text-xs">Recortar para llenar</span>
                      <span className="text-[10px] text-[#736B63] block font-normal mt-0.5 leading-tight">
                        Llena el espacio del cuadro permitiendo ajustar qué parte de la fotografía queda visible.
                      </span>
                    </button>
                  </div>

                  {/* Position selector when fitMode === 'crop' */}
                  {fitMode === 'crop' && (
                    <div className="pt-2 space-y-1.5 border-t border-[#E4DCD0] mt-2">
                      <span className="text-[10px] font-mono font-bold text-[#2A1E17] block uppercase">ZONA VISIBLE (ENFOQUE DE ENCUADRE)</span>
                      <div className="grid grid-cols-3 gap-2">
                        {product.orientation === 'horizontal' ? (
                          // Horizontal photo in Vertical frame -> Top, Center, Bottom
                          <>
                            <button
                              onClick={() => setCropPosition('top')}
                              className={`py-1.5 px-2 rounded text-[10px] font-mono font-bold border transition ${cropPosition === 'top' ? 'bg-[#2A1E17] text-white border-[#2A1E17]' : 'bg-[#FAF6EE] text-[#5A4C40] border-[#E4DCD0]'}`}
                            >
                              Arriba
                            </button>
                            <button
                              onClick={() => setCropPosition('center')}
                              className={`py-1.5 px-2 rounded text-[10px] font-mono font-bold border transition ${cropPosition === 'center' ? 'bg-[#2A1E17] text-white border-[#2A1E17]' : 'bg-[#FAF6EE] text-[#5A4C40] border-[#E4DCD0]'}`}
                            >
                              Centro
                            </button>
                            <button
                              onClick={() => setCropPosition('bottom')}
                              className={`py-1.5 px-2 rounded text-[10px] font-mono font-bold border transition ${cropPosition === 'bottom' ? 'bg-[#2A1E17] text-white border-[#2A1E17]' : 'bg-[#FAF6EE] text-[#5A4C40] border-[#E4DCD0]'}`}
                            >
                              Abajo
                            </button>
                          </>
                        ) : (
                          // Vertical photo in Horizontal frame -> Left, Center, Right
                          <>
                            <button
                              onClick={() => setCropPosition('left')}
                              className={`py-1.5 px-2 rounded text-[10px] font-mono font-bold border transition ${cropPosition === 'left' ? 'bg-[#2A1E17] text-white border-[#2A1E17]' : 'bg-[#FAF6EE] text-[#5A4C40] border-[#E4DCD0]'}`}
                            >
                              Izquierda
                            </button>
                            <button
                              onClick={() => setCropPosition('center')}
                              className={`py-1.5 px-2 rounded text-[10px] font-mono font-bold border transition ${cropPosition === 'center' ? 'bg-[#2A1E17] text-white border-[#2A1E17]' : 'bg-[#FAF6EE] text-[#5A4C40] border-[#E4DCD0]'}`}
                            >
                              Centro
                            </button>
                            <button
                              onClick={() => setCropPosition('right')}
                              className={`py-1.5 px-2 rounded text-[10px] font-mono font-bold border transition ${cropPosition === 'right' ? 'bg-[#2A1E17] text-white border-[#2A1E17]' : 'bg-[#FAF6EE] text-[#5A4C40] border-[#E4DCD0]'}`}
                            >
                              Derecha
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. FORMAT SELECTION */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#2A1E17] block">
                  2. Selección de Formato
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
                      <span className="font-semibold">{getFormattedSizeLabel(fmt, selectedOrientation)}</span>
                      <span className="font-mono text-[11px] text-[#C85A32] font-bold">
                        ${fmt.priceCLP.toLocaleString('es-CL')} CLP
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. FRAME COLOR SELECTION (Shown only when format requires frame) */}
              {selectedFormat.requiresFrame && (
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#2A1E17] block">
                    3. Selección de Marco
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {FRAME_OPTIONS.map((frame) => (
                      <button
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame)}
                        className={`p-2.5 sm:p-3 rounded-lg border flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 transition-all ${
                          selectedFrame.id === frame.id
                            ? 'border-[#C85A32] bg-[#F6EAE1] ring-2 ring-[#C85A32] font-bold text-[#2A1E17]'
                            : 'border-[#E4DCD0] bg-[#FDFBF7] hover:border-[#C85A32] text-[#2A1E17]'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-[#D5C9B8] shadow-sm shrink-0"
                          style={{ backgroundColor: frame.colorHex }}
                        />
                        <span className="text-[11px] sm:text-xs text-center sm:text-left leading-tight font-medium">
                          {frame.name}
                        </span>
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
              <span className="block text-[10px] uppercase font-bold text-[#2A1E17]">Formato Original</span>
              <span>35mm ({product.orientation === 'horizontal' ? 'Horizontal' : 'Vertical'})</span>
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
