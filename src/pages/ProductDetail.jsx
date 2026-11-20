import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, FORMAT_OPTIONS, FRAME_OPTIONS, STORE_CONFIG } from '../data/products';
import { Maximize2, ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function ProductDetail({ onAddToCart, onOpenZoom }) {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  const initialOrientation = product?.orientation || 'horizontal';
  const [selectedOrientation, setSelectedOrientation] = useState(initialOrientation);

  useEffect(() => {
    if (product?.orientation) {
      setSelectedOrientation(product.orientation);
    }
  }, [product]);
  const [selectedFormat, setSelectedFormat] = useState(FORMAT_OPTIONS[2]);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[1]);
  const [fitMode, setFitMode] = useState('margin');
  const [cropPosition, setCropPosition] = useState('center');
  const [previewMode, setPreviewMode] = useState('studio');

  if (!product) return null;

  const placeName = product.place || product.location?.split(',')[0] || '';
  const countryName = product.country || product.location?.split(',')[1]?.trim() || '';
  const isOrientationMismatched = selectedOrientation !== product.orientation;

  const getFormattedSizeLabel = (fmt, orientation) => {
    if (orientation === 'horizontal') {
      switch (fmt.id) {
        case 'print-20x30': return 'Print 30×20 cm';
        case 'print-30x45': return 'Print 45×30 cm';
        case 'frame-30x45': return 'Enmarcado 45×30 cm';
        case 'frame-40x60': return 'Enmarcado 60×40 cm';
        case 'frame-50x75': return 'Enmarcado 75×50 cm';
        default: return fmt.label;
      }
    } else {
      switch (fmt.id) {
        case 'print-20x30': return 'Print 20×30 cm';
        case 'print-30x45': return 'Print 30×45 cm';
        case 'frame-30x45': return 'Enmarcado 30×45 cm';
        case 'frame-40x60': return 'Enmarcado 40×60 cm';
        case 'frame-50x75': return 'Enmarcado 50×75 cm';
        default: return fmt.label;
      }
    }
  };

  const formattedSizeLabel = getFormattedSizeLabel(selectedFormat, selectedOrientation);
  const totalCLP = selectedFormat.priceCLP;
  const totalUSD = selectedFormat.priceUSD;

  const getScalePercentage = (fmtId) => {
    switch (fmtId) {
      case 'print-20x30': return 46;
      case 'print-30x45': return 62;
      case 'frame-30x45': return 68;
      case 'frame-40x60': return 82;
      case 'frame-50x75': return 95;
      default: return 68;
    }
  };

  const currentScalePct = getScalePercentage(selectedFormat.id);

  const getStudioElementStyle = () => {
    const scale = currentScalePct;
    return selectedOrientation === 'horizontal'
      ? { width: `${scale}%`, aspectRatio: '3 / 2', maxHeight: '84%' }
      : { height: `${scale}%`, aspectRatio: '2 / 3', maxWidth: '84%' };
  };

  const getRoomElementStyle = () => {
    const roomScale = currentScalePct * 0.88;
    return selectedOrientation === 'horizontal'
      ? { width: `${roomScale * 0.78}%`, aspectRatio: '3 / 2', maxHeight: '54%' }
      : { height: `${roomScale * 0.68}%`, aspectRatio: '2 / 3', maxWidth: '62%' };
  };

  // Delicate, slim gallery frame profile (using padding on gradient molding for realistic bevel & sheen)
  const getFrameMoldingClass = () => {
    if (!selectedFormat.requiresFrame) {
      return 'p-0 print-only-elevation ring-1 ring-[#E6E1DA] bg-[#FAF8F5]';
    }

    let moldingThickness = 'p-[5px] sm:p-[7px]';
    if (selectedFormat.id === 'frame-30x45') moldingThickness = 'p-[4px] sm:p-[6px]';
    else if (selectedFormat.id === 'frame-40x60') moldingThickness = 'p-[5px] sm:p-[7px]';
    else if (selectedFormat.id === 'frame-50x75') moldingThickness = 'p-[6px] sm:p-[9px]';

    switch (selectedFrame.id) {
      case 'black':
        return `${moldingThickness} frame-molding-black`;
      case 'white':
        return `${moldingThickness} frame-molding-white`;
      default:
        return `${moldingThickness} frame-molding-wood`;
    }
  };

  const getMatPaddingClass = () => {
    if (!selectedFormat.requiresFrame) return 'p-0';
    switch (selectedFormat.id) {
      case 'frame-30x45': return 'p-2.5 sm:p-4';
      case 'frame-40x60': return 'p-3.5 sm:p-5';
      case 'frame-50x75': return 'p-4 sm:p-6';
      default: return 'p-3 sm:p-4';
    }
  };

  const getCropPositionClass = () => {
    switch (cropPosition) {
      case 'top': return 'object-top';
      case 'bottom': return 'object-bottom';
      case 'left': return 'object-left';
      case 'right': return 'object-right';
      default: return 'object-center';
    }
  };

  const handleAddToCart = () => {
    const frameLabel = selectedFormat.requiresFrame ? `Marco ${selectedFrame.name}` : 'Sin marco';
    onAddToCart({
      id: product.id,
      cartItemId: `${product.id}-${selectedOrientation}-${selectedFormat.id}-${selectedFrame.id}-${fitMode}-${cropPosition}`,
      title: product.title,
      location: `${placeName}, ${countryName}`,
      image: product.image,
      size: formattedSizeLabel,
      orientation: selectedOrientation === 'horizontal' ? 'Horizontal' : 'Vertical',
      frame: frameLabel,
      price: totalCLP,
      priceUSD: totalUSD,
      quantity: 1
    });
  };

  const handleWhatsAppQuote = () => {
    const fullImageUrl = window.location.origin + product.image;
    const frameText = selectedFormat.requiresFrame ? `Marco ${selectedFrame.name}` : 'Sin marco';
    let text = `*ENCARGO — JAVA ON FILM*%0A`;
    text += `• *Foto:* ${product.title} (${placeName}, ${countryName})%0A`;
    text += `• *Formato:* ${formattedSizeLabel} (${selectedOrientation})%0A`;
    text += `• *Terminación:* ${frameText}%0A`;
    text += `• *Valor:* $${totalCLP.toLocaleString('es-CL')} CLP%0A`;
    text += `• *Foto:* ${fullImageUrl}%0A%0A`;
    text += `Hola! Quiero encargar este cuadro.`;

    const phone = STORE_CONFIG.whatsAppNumber || "56968449779";
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="pb-20 sm:pb-28 pt-6 sm:pt-8">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-6">
        <Link
          to="/prints"
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#6E6A63] hover:text-[#141413]"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Volver</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: PREVIEW */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E6E1DA] pb-2.5">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setPreviewMode('studio')}
                  className={`text-[11px] font-mono uppercase tracking-[0.16em] pb-1 ${
                    previewMode === 'studio'
                      ? 'text-[#141413] border-b border-[#141413]'
                      : 'text-[#9C968E] hover:text-[#141413]'
                  }`}
                >
                  El Cuadro
                </button>
                <button
                  onClick={() => setPreviewMode('room')}
                  className={`text-[11px] font-mono uppercase tracking-[0.16em] pb-1 ${
                    previewMode === 'room'
                      ? 'text-[#141413] border-b border-[#141413]'
                      : 'text-[#9C968E] hover:text-[#141413]'
                  }`}
                >
                  En Pared
                </button>
              </div>
            </div>
            
            <div className="bg-[#F4F0EA] border border-[#E6E1DA] p-6 sm:p-12 flex flex-col justify-center items-center relative overflow-hidden h-[360px] sm:h-[480px] md:h-[540px]">
              {/* Soft Gallery Spotlight Effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 42%, rgba(255,253,249,0.7) 0%, rgba(244,240,234,0.2) 55%, rgba(230,224,214,0.5) 100%)'
                }}
              />

              {previewMode === 'room' && (
                <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
                  <div className="relative z-0 w-full flex flex-col items-center mb-2 sm:mb-3 px-6 sm:px-12 opacity-60">
                    <div className="w-[86%] sm:w-[76%] h-11 sm:h-16 bg-[#E5DEC9]/40 border-t border-x border-[#BFB8AC] relative flex">
                      <div className="w-full h-full flex divide-x divide-[#BFB8AC]">
                        <div className="flex-1" /><div className="flex-1" /><div className="flex-1" />
                      </div>
                      <div className="absolute -top-4 sm:-top-5 left-0 right-0 h-4 sm:h-5 border-t border-x border-[#BFB8AC] bg-[#EAE4D7]/50" />
                    </div>
                    <div className="w-full h-[1px] bg-[#BFB8AC]" />
                  </div>
                </div>
              )}

              <div className="relative z-10 w-full h-full flex items-center justify-center p-1 sm:p-2">
                <div
                  style={previewMode === 'studio' ? getStudioElementStyle() : getRoomElementStyle()}
                  className="transition-all duration-500 ease-out flex items-center justify-center relative"
                >
                  {/* Slim Gallery Frame Outer Molding */}
                  <div className={`w-full h-full transition-all duration-500 flex items-center justify-center relative ${getFrameMoldingClass()}`}>
                    
                    {/* Clean Mat Board without extra inner rectangle */}
                    <div className={`w-full h-full flex items-center justify-center bg-[#FAF8F5] transition-all duration-500 relative ${getMatPaddingClass()}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className={`w-full h-full transition-all duration-500 ${
                          isOrientationMismatched && fitMode === 'crop'
                            ? `object-cover ${getCropPositionClass()}`
                            : 'object-contain'
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenZoom(product)}
                    className="absolute bottom-2 right-2 p-1.5 bg-[#FAF8F5]/90 hover:bg-[#141413] text-[#141413] hover:text-[#FAF8F5] border border-[#E6E1DA] transition-colors z-20"
                    title="Ver completa"
                  >
                    <Maximize2 className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: OPTIONS */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="border-b border-[#E6E1DA] pb-5 flex items-baseline justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#8C4A32] block">
                  {placeName}, {countryName} · {product.year}
                </span>
                <h1 className="text-3xl font-serif font-normal text-[#141413] mt-0.5">
                  {product.title}
                </h1>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xl font-mono text-[#141413]">
                  ${totalCLP.toLocaleString('es-CL')} CLP
                </div>
                <span className="text-[10px] font-mono text-[#9C968E]">
                  35mm · Kodak Gold
                </span>
              </div>
            </div>

            {/* 1. ORIENTATION */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6E6A63] block">
                Orientación
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setSelectedOrientation('horizontal')}
                  className={`py-2.5 px-3 border text-xs font-mono uppercase tracking-[0.14em] transition-colors ${
                    selectedOrientation === 'horizontal'
                      ? 'border-[#141413] bg-[#141413] text-[#FAF8F5]'
                      : 'border-[#E6E1DA] text-[#141413] hover:border-[#141413]'
                  }`}
                >
                  Horizontal
                </button>
                <button
                  onClick={() => setSelectedOrientation('vertical')}
                  className={`py-2.5 px-3 border text-xs font-mono uppercase tracking-[0.14em] transition-colors ${
                    selectedOrientation === 'vertical'
                      ? 'border-[#141413] bg-[#141413] text-[#FAF8F5]'
                      : 'border-[#E6E1DA] text-[#141413] hover:border-[#141413]'
                  }`}
                >
                  Vertical
                </button>
              </div>
            </div>

            {/* FIT MODE */}
            {isOrientationMismatched && (
              <div className="space-y-2.5 p-3.5 border border-[#E6E1DA] bg-[#F4F0EA]/50">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFitMode('margin')}
                    className={`py-2 px-2.5 border text-[11px] font-mono transition-colors ${
                      fitMode === 'margin' ? 'border-[#141413] bg-[#FAF8F5] text-[#141413]' : 'border-[#E6E1DA] text-[#6E6A63]'
                    }`}
                  >
                    Con margen
                  </button>
                  <button
                    onClick={() => setFitMode('crop')}
                    className={`py-2 px-2.5 border text-[11px] font-mono transition-colors ${
                      fitMode === 'crop' ? 'border-[#141413] bg-[#FAF8F5] text-[#141413]' : 'border-[#E6E1DA] text-[#6E6A63]'
                    }`}
                  >
                    Llenar cuadro
                  </button>
                </div>

                {fitMode === 'crop' && (
                  <div className="flex gap-1.5 pt-1">
                    {(product.orientation === 'horizontal'
                      ? [{ id: 'top', label: 'Arriba' }, { id: 'center', label: 'Centro' }, { id: 'bottom', label: 'Abajo' }]
                      : [{ id: 'left', label: 'Izquierda' }, { id: 'center', label: 'Centro' }, { id: 'right', label: 'Derecha' }]
                    ).map((pos) => (
                      <button
                        key={pos.id}
                        onClick={() => setCropPosition(pos.id)}
                        className={`flex-1 py-1 text-[10px] font-mono uppercase border ${
                          cropPosition === pos.id ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]' : 'text-[#6E6A63] border-[#E6E1DA]'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. SIZE */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6E6A63] block">
                Medida
              </label>
              <div className="divide-y divide-[#E6E1DA] border-y border-[#E6E1DA]">
                {FORMAT_OPTIONS.map((fmt) => {
                  const isSelected = selectedFormat.id === fmt.id;
                  return (
                    <button
                      key={fmt.id}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`w-full py-3 px-2.5 flex items-center justify-between gap-2 text-xs transition-colors ${
                        isSelected ? 'bg-[#F4F0EA] text-[#141413] font-medium' : 'text-[#6E6A63] hover:text-[#141413]'
                      }`}
                    >
                      <span className="truncate">{getFormattedSizeLabel(fmt, selectedOrientation)}</span>
                      <span className="font-mono text-[11px] text-[#141413] whitespace-nowrap">
                        ${fmt.priceCLP.toLocaleString('es-CL')} CLP
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. FRAME */}
            {selectedFormat.requiresFrame && (
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6E6A63] block">
                  Marco
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {FRAME_OPTIONS.map((frame) => {
                    const isSelected = selectedFrame.id === frame.id;
                    return (
                      <button
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame)}
                        className={`py-2.5 px-2 border flex items-center justify-center gap-1.5 transition-colors ${
                          isSelected ? 'border-[#141413] bg-[#F4F0EA] text-[#141413]' : 'border-[#E6E1DA] text-[#6E6A63]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-[#CFC8BC] shrink-0"
                          style={{ backgroundColor: frame.colorHex }}
                        />
                        <span className="text-[11px] font-mono">{frame.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={handleWhatsAppQuote}
                className="w-full py-3.5 bg-[#141413] hover:bg-[#2A2A28] text-[#FAF8F5] text-xs font-mono uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2"
              >
                <span>Encargar por WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-transparent hover:bg-[#F4F0EA] text-[#141413] border border-[#E6E1DA] text-[11px] font-mono uppercase tracking-[0.16em] transition-colors"
              >
                Añadir al Carrito
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
