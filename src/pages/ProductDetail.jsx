import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, FORMAT_OPTIONS, FRAME_OPTIONS, STORE_CONFIG } from '../data/products';
import { Maximize2, ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function ProductDetail({ onAddToCart, onOpenZoom }) {
  const { id } = useParams();

  // Find product
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  // Options State
  const initialOrientation = product?.orientation || 'horizontal';
  const [selectedOrientation, setSelectedOrientation] = useState(initialOrientation);
  const [selectedFormat, setSelectedFormat] = useState(FORMAT_OPTIONS[2]); // Default: Enmarcado 30x45 / 45x30
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[1]);   // Default: Madera natural

  // Fit Mode State (for when selected orientation differs from native photo orientation)
  const [fitMode, setFitMode] = useState('margin'); // 'margin' or 'crop'
  const [cropPosition, setCropPosition] = useState('center');

  // View Mode: 'studio' vs 'room'
  const [previewMode, setPreviewMode] = useState('studio');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center space-y-4">
        <h2 className="text-2xl font-serif text-[#141413]">Obra no encontrada en el archivo</h2>
        <Link to="/prints" className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[#141413] underline">
          Volver a la colección
        </Link>
      </div>
    );
  }

  const placeName = product.place || product.location?.split(',')[0] || '';
  const countryName = product.country || product.location?.split(',')[1]?.trim() || '';
  const isOrientationMismatched = selectedOrientation !== product.orientation;

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

  const totalCLP = selectedFormat.priceCLP;
  const totalUSD = selectedFormat.priceUSD;

  const getScalePercentage = (fmtId) => {
    switch (fmtId) {
      case 'print-20x30': return 44;
      case 'print-30x45': return 60;
      case 'frame-30x45': return 66;
      case 'frame-40x60': return 82;
      case 'frame-50x75': return 96;
      default: return 66;
    }
  };

  const currentScalePct = getScalePercentage(selectedFormat.id);

  const getStudioElementStyle = () => {
    const scale = currentScalePct;
    if (selectedOrientation === 'horizontal') {
      return {
        width: `${scale}%`,
        aspectRatio: '3 / 2',
        maxHeight: '84%'
      };
    } else {
      return {
        height: `${scale}%`,
        aspectRatio: '2 / 3',
        maxWidth: '84%'
      };
    }
  };

  const getRoomElementStyle = () => {
    const roomScale = currentScalePct * 0.88;
    if (selectedOrientation === 'horizontal') {
      return {
        width: `${roomScale * 0.78}%`,
        aspectRatio: '3 / 2',
        maxHeight: '54%'
      };
    } else {
      return {
        height: `${roomScale * 0.68}%`,
        aspectRatio: '2 / 3',
        maxWidth: '62%'
      };
    }
  };

  const getFrameCssClass = () => {
    if (!selectedFormat.requiresFrame) {
      return 'border-0 frame-shadow ring-1 ring-[#E6E1DA]';
    }
    
    let borderThickness = 'border-[10px] sm:border-[14px]';
    if (selectedFormat.id === 'frame-30x45') {
      borderThickness = 'border-[8px] sm:border-[11px]';
    } else if (selectedFormat.id === 'frame-40x60') {
      borderThickness = 'border-[11px] sm:border-[15px]';
    } else if (selectedFormat.id === 'frame-50x75') {
      borderThickness = 'border-[14px] sm:border-[19px]';
    }

    switch (selectedFrame.id) {
      case 'black':
        return `${borderThickness} border-[#181716] frame-shadow`;
      case 'white':
        return `${borderThickness} border-[#FAF8F5] frame-shadow ring-1 ring-[#DED8CE]`;
      case 'natural-wood':
      default:
        return `${borderThickness} border-[#7D5A3F] frame-shadow`;
    }
  };

  const getMatPaddingClass = () => {
    if (!selectedFormat.requiresFrame) return 'p-0';
    switch (selectedFormat.id) {
      case 'frame-30x45': return 'p-2.5 sm:p-3.5';
      case 'frame-40x60': return 'p-4 sm:p-5';
      case 'frame-50x75': return 'p-5 sm:p-7';
      default: return 'p-3 sm:p-4';
    }
  };

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

  const handleAddToCart = () => {
    const frameLabel = selectedFormat.requiresFrame ? `Marco ${selectedFrame.name}` : 'Papel Fine Art (Sin Marco)';
    const fitLabel = isOrientationMismatched
      ? (fitMode === 'margin' ? 'Completa con margen' : `Recorte lleno (${cropPosition})`)
      : 'Proporción Original';

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
    const frameText = selectedFormat.requiresFrame ? `Marco ${selectedFrame.name}` : 'Papel Fine Art (Sin marco)';
    const fitText = isOrientationMismatched
      ? (fitMode === 'margin' ? 'Obra completa con margen' : `Cubrir formato (${cropPosition})`)
      : 'Encuadre Original';

    let text = `*SOLICITUD DE OBRA — JAVA ON FILM*%0A`;
    text += `----------------------------------------%0A`;
    text += `• *Obra:* ${product.title} (${product.archiveCode || 'ARCHIVE'})%0A`;
    text += `• *Ubicación:* ${placeName}, ${countryName} (${product.year})%0A`;
    text += `• *Negativo:* Olympus mju I · Kodak Gold 200 · 35mm%0A%0A`;
    text += `*Configuración Seleccionada:*%0A`;
    text += `• *Orientación:* ${orientationText}%0A`;
    text += `• *Formato:* ${formattedSizeLabel}%0A`;
    text += `• *Terminación:* ${frameText}%0A`;
    text += `• *Encuadre:* ${fitText}%0A%0A`;
    text += `*Valor:* $${totalCLP.toLocaleString('es-CL')} CLP (~$${totalUSD} USD)%0A%0A`;
    text += `• *Referencia:* ${fullImageUrl}%0A`;
    text += `• *Ficha:* ${pageUrl}%0A%0A`;
    text += `Hola, me gustaría encargar esta obra y coordinar el envío.`;

    const phone = STORE_CONFIG.whatsAppNumber || "56968449779";
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="pb-28 pt-8">
      
      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-8">
        <Link
          to="/prints"
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#6E6A63] hover:text-[#141413] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Volver a la colección</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-20">
        
        {/* MAIN CONFIGURATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: EXHIBITION VIEWPORT */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* View Mode Toggle Bar */}
            <div className="flex items-center justify-between border-b border-[#E6E1DA] pb-3">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setPreviewMode('studio')}
                  className={`text-[11px] font-mono uppercase tracking-[0.18em] transition-colors pb-1 ${
                    previewMode === 'studio'
                      ? 'text-[#141413] border-b border-[#141413]'
                      : 'text-[#9C968E] hover:text-[#141413]'
                  }`}
                >
                  Vista Estudio
                </button>
                <button
                  onClick={() => setPreviewMode('room')}
                  className={`text-[11px] font-mono uppercase tracking-[0.18em] transition-colors pb-1 ${
                    previewMode === 'room'
                      ? 'text-[#141413] border-b border-[#141413]'
                      : 'text-[#9C968E] hover:text-[#141413]'
                  }`}
                >
                  Escala en Muro
                </button>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#9C968E]">
                Escala relativa: {currentScalePct}%
              </span>
            </div>
            
            {/* EXHIBITION CANVAS */}
            <div className="bg-[#F4F0EA] border border-[#E6E1DA] p-6 sm:p-10 flex flex-col justify-center items-center relative overflow-hidden h-[480px] sm:h-[560px]">
              
              {/* Architectural Room Scale Backdrop */}
              {previewMode === 'room' && (
                <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#F4F0EA] via-[#EFEAE2] to-[#E6E0D6]" />
                  
                  {/* Minimalist Architectural Bench / Sofa Outline */}
                  <div className="relative z-0 w-full flex flex-col items-center mb-3 px-12 opacity-60">
                    <div className="w-[82%] sm:w-[76%] h-14 sm:h-16 bg-[#E5DEC9]/40 border-t border-x border-[#BFB8AC] relative flex">
                      <div className="w-full h-full flex divide-x divide-[#BFB8AC]">
                        <div className="flex-1" />
                        <div className="flex-1" />
                        <div className="flex-1" />
                      </div>
                      <div className="absolute -top-5 left-0 right-0 h-5 border-t border-x border-[#BFB8AC] bg-[#EAE4D7]/50" />
                    </div>
                    <div className="w-full h-[1px] bg-[#BFB8AC]" />
                    <span className="text-[9px] font-mono text-[#6E6A63] mt-1.5 uppercase tracking-[0.2em]">
                      Referencia Arquitectónica — Muro 200 cm
                    </span>
                  </div>
                </div>
              )}

              {/* PROPORTIONALLY SCALED FRAME / PRINT */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                <div
                  style={previewMode === 'studio' ? getStudioElementStyle() : getRoomElementStyle()}
                  className="transition-all duration-500 ease-out flex items-center justify-center relative"
                >
                  {/* Frame / Paper Outer Shell */}
                  <div className={`w-full h-full transition-all duration-500 overflow-hidden flex items-center justify-center ${getFrameCssClass()}`}>
                    
                    {/* Passepartout / Inner Mat Container */}
                    <div className={`w-full h-full flex items-center justify-center bg-[#FAF8F5] passepartout-inner transition-all duration-500 ${getMatPaddingClass()}`}>
                      
                      {/* Photo Image */}
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

                  {/* Fullscreen Inspection Button */}
                  <button
                    onClick={() => onOpenZoom(product)}
                    className="absolute top-3 right-3 p-2 bg-[#141413]/80 hover:bg-[#141413] text-[#FAF8F5] transition-colors z-20"
                    title="Inspeccionar obra en pantalla completa"
                  >
                    <Maximize2 className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                </div>
              </div>

              {/* Technical Caption inside Canvas */}
              <div className="relative z-10 mt-2 text-center">
                <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#6E6A63]">
                  {formattedSizeLabel} {selectedFormat.requiresFrame ? `· Marco ${selectedFrame.name}` : '· Papel Algodón Libre de Ácido'}
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: CURATORIAL CONFIGURATION PANEL */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Artwork Title & Metadata */}
            <div className="border-b border-[#E6E1DA] pb-6 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#9C968E] block">
                {product.archiveCode || "ARCHIVE"} — {placeName}, {countryName} ({product.year})
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#141413]">
                {product.title}
              </h1>
              <p className="text-xs font-mono text-[#6E6A63] pt-1">
                Olympus mju I · Kodak Gold 200 · 35mm
              </p>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline justify-between border-b border-[#E6E1DA] pb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">
                  Valor de la Obra
                </span>
                <div className="text-2xl font-mono text-[#141413] mt-1">
                  ${totalCLP.toLocaleString('es-CL')} CLP
                </div>
              </div>
              <span className="text-xs font-mono text-[#9C968E]">
                Aprox. ${totalUSD} USD
              </span>
            </div>

            {/* 1. ORIENTATION */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6E6A63]">
                  01 / Orientación
                </label>
                <span className="text-[10px] font-mono text-[#9C968E]">
                  Toma original: {product.orientation === 'horizontal' ? 'Horizontal' : 'Vertical'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedOrientation('horizontal')}
                  className={`py-3 px-4 border text-xs font-mono uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 transition-colors ${
                    selectedOrientation === 'horizontal'
                      ? 'border-[#141413] bg-[#141413] text-[#FAF8F5]'
                      : 'border-[#E6E1DA] bg-transparent text-[#141413] hover:border-[#141413]'
                  }`}
                >
                  <span className="w-4 h-2.5 border border-current shrink-0" />
                  <span>Horizontal</span>
                </button>

                <button
                  onClick={() => setSelectedOrientation('vertical')}
                  className={`py-3 px-4 border text-xs font-mono uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 transition-colors ${
                    selectedOrientation === 'vertical'
                      ? 'border-[#141413] bg-[#141413] text-[#FAF8F5]'
                      : 'border-[#E6E1DA] bg-transparent text-[#141413] hover:border-[#141413]'
                  }`}
                >
                  <span className="w-2.5 h-4 border border-current shrink-0" />
                  <span>Vertical</span>
                </button>
              </div>
            </div>

            {/* FIT MODE (If orientation differs from native) */}
            {isOrientationMismatched && (
              <div className="space-y-3 p-5 border border-[#E6E1DA] bg-[#F4F0EA]/50">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#141413] block">
                  Adaptación de Encuadre
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setFitMode('margin')}
                    className={`p-3 border text-left transition-colors ${
                      fitMode === 'margin'
                        ? 'border-[#141413] bg-[#FAF8F5]'
                        : 'border-[#E6E1DA] bg-transparent text-[#6E6A63]'
                    }`}
                  >
                    <span className="text-xs font-mono text-[#141413] block">Con Margen</span>
                    <span className="text-[10px] text-[#6E6A63] block mt-0.5 leading-snug">
                      Sin recorte, preserva el 100% del negativo.
                    </span>
                  </button>

                  <button
                    onClick={() => setFitMode('crop')}
                    className={`p-3 border text-left transition-colors ${
                      fitMode === 'crop'
                        ? 'border-[#141413] bg-[#FAF8F5]'
                        : 'border-[#E6E1DA] bg-transparent text-[#6E6A63]'
                    }`}
                  >
                    <span className="text-xs font-mono text-[#141413] block">Cubrir Formato</span>
                    <span className="text-[10px] text-[#6E6A63] block mt-0.5 leading-snug">
                      Llena el lienzo ajustando el foco.
                    </span>
                  </button>
                </div>

                {fitMode === 'crop' && (
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6E6A63]">Foco:</span>
                    <div className="flex gap-1.5">
                      {(product.orientation === 'horizontal'
                        ? [
                            { id: 'top', label: 'Arriba' },
                            { id: 'center', label: 'Centro' },
                            { id: 'bottom', label: 'Abajo' }
                          ]
                        : [
                            { id: 'left', label: 'Izquierda' },
                            { id: 'center', label: 'Centro' },
                            { id: 'right', label: 'Derecha' }
                          ]
                      ).map((pos) => (
                        <button
                          key={pos.id}
                          onClick={() => setCropPosition(pos.id)}
                          className={`px-2.5 py-1 text-[10px] font-mono uppercase border transition-colors ${
                            cropPosition === pos.id
                              ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                              : 'bg-transparent text-[#6E6A63] border-[#E6E1DA]'
                          }`}
                        >
                          {pos.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. FORMAT & DIMENSIONS */}
            <div className="space-y-3">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6E6A63] block">
                02 / Formato & Dimensiones
              </label>
              <div className="divide-y divide-[#E6E1DA] border-y border-[#E6E1DA]">
                {FORMAT_OPTIONS.map((fmt) => {
                  const isSelected = selectedFormat.id === fmt.id;
                  return (
                    <button
                      key={fmt.id}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`w-full py-3.5 px-3 flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'bg-[#F4F0EA] text-[#141413] font-medium'
                          : 'bg-transparent text-[#6E6A63] hover:text-[#141413]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full border ${
                            isSelected ? 'bg-[#141413] border-[#141413]' : 'border-[#9C968E]'
                          }`}
                        />
                        <span>{getFormattedSizeLabel(fmt, selectedOrientation)}</span>
                      </div>
                      <span className="font-mono text-xs text-[#141413]">
                        ${fmt.priceCLP.toLocaleString('es-CL')} CLP
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. FRAME MOLDING SELECTION */}
            {selectedFormat.requiresFrame && (
              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6E6A63] block">
                  03 / Terminación del Marco
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {FRAME_OPTIONS.map((frame) => {
                    const isSelected = selectedFrame.id === frame.id;
                    return (
                      <button
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame)}
                        className={`py-3 px-3 border flex items-center justify-center gap-2 transition-colors ${
                          isSelected
                            ? 'border-[#141413] bg-[#F4F0EA] text-[#141413]'
                            : 'border-[#E6E1DA] bg-transparent text-[#6E6A63] hover:border-[#141413]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#CFC8BC] shrink-0"
                          style={{ backgroundColor: frame.colorHex }}
                        />
                        <span className="text-[11px] font-mono">
                          {frame.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PURCHASE / INQUIRY ACTIONS */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleWhatsAppQuote}
                className="w-full py-4 bg-[#141413] hover:bg-[#2A2A28] text-[#FAF8F5] text-xs font-mono uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
              >
                <span>Encargar Obra</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-transparent hover:bg-[#F4F0EA] text-[#141413] border border-[#E6E1DA] text-[11px] font-mono uppercase tracking-[0.18em] transition-colors"
              >
                Añadir a la Selección
              </button>
            </div>

          </div>

        </div>

        {/* CURATORIAL NOTE / ABOUT THE PHOTOGRAPH */}
        <section className="border-t border-[#E6E1DA] pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C4A32] block">
              {product.seriesLabel || 'Archivo 35mm'} · Nota de la Obra
            </span>
            <h2 className="text-2xl font-serif font-normal text-[#141413]">
              {product.title} — {placeName}
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <p className="text-base text-[#6E6A63] leading-relaxed font-light max-w-2xl">
              {product.story}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#E6E1DA] text-xs font-mono">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#9C968E]">Cámara</span>
                <span className="text-[#141413] mt-1 block">Olympus mju I</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#9C968E]">Película</span>
                <span className="text-[#141413] mt-1 block">Kodak Gold 200</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#9C968E]">Negativo Original</span>
                <span className="text-[#141413] mt-1 block">35mm ({product.orientation === 'horizontal' ? 'Horizontal' : 'Vertical'})</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#9C968E]">Año</span>
                <span className="text-[#141413] mt-1 block">{product.year}</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
