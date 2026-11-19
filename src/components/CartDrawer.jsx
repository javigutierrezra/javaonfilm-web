import React from 'react';
import { X, Trash2, ArrowUpRight } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  const totalCLP = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalUSD = Math.round(totalCLP / 940);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let text = `*SELECCIÓN DE OBRAS — JAVA ON FILM*%0A`;
    text += `----------------------------------------%0A`;
    text += `Hola, me gustaría encargar las siguientes piezas del archivo:%0A%0A`;

    cart.forEach((item, index) => {
      const fullImgUrl = window.location.origin + item.image;
      
      text += `*${index + 1}. ${item.title}*%0A`;
      text += `   • Lugar: ${item.location}%0A`;
      text += `   • Formato: ${item.size}%0A`;
      text += `   • Terminación: ${item.frame}%0A`;
      text += `   • Cantidad: ${item.quantity}%0A`;
      text += `   • Valor: $${(item.price * item.quantity).toLocaleString('es-CL')} CLP%0A`;
      text += `   • Referencia: ${fullImgUrl}%0A%0A`;
    });

    text += `*TOTAL ESTIMADO:* $${totalCLP.toLocaleString('es-CL')} CLP (~$${totalUSD} USD)%0A%0A`;
    text += `Quedo atento a la disponibilidad y coordinación de envío.`;

    const phone = STORE_CONFIG.whatsAppNumber || "56968449779";
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#141413]/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E6E1DA]">
          
          {/* Header */}
          <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-[#E6E1DA] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">
                Archivo 35mm
              </span>
              <h2 className="text-xl font-serif font-normal text-[#141413] mt-0.5">
                Selección de Obras
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#6E6A63] hover:text-[#141413] transition-colors"
              aria-label="Cerrar selección"
            >
              <X className="w-5 h-5 stroke-[1.25]" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 divide-y divide-[#E6E1DA]">
            {cart.length === 0 ? (
              <div className="text-center py-20 sm:py-24 space-y-2">
                <p className="font-serif text-lg text-[#141413]">Tu selección está vacía</p>
                <p className="text-xs text-[#6E6A63] font-light max-w-xs mx-auto">
                  Explora la colección para configurar obras impresas o enmarcadas a medida.
                </p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={item.cartItemId || index} className="py-5 first:pt-0 last:pb-0 flex gap-4 sm:gap-5">
                  <div className="w-16 h-20 bg-[#F4F0EA] border border-[#E6E1DA] p-1.5 flex items-center justify-center shrink-0">
                    <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-base text-[#141413] truncate">{item.title}</h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-[#9C968E] hover:text-[#141413] transition-colors p-0.5"
                        title="Quitar de la selección"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                    </div>
                    <p className="text-[10px] sm:text-[11px] font-mono text-[#6E6A63] uppercase tracking-wider truncate">{item.location}</p>
                    
                    <div className="text-[11px] text-[#6E6A63] mt-1.5 space-y-0.5 font-light">
                      <p className="truncate">{item.size}</p>
                      <p className="truncate">Terminación: {item.frame}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center border border-[#E6E1DA] bg-[#FDFCFA]">
                        <button
                          onClick={() => onUpdateQuantity(index, -1)}
                          className="px-2.5 py-0.5 text-xs text-[#141413] hover:bg-[#F4F0EA] transition-colors"
                        >−</button>
                        <span className="px-2.5 text-[11px] font-mono text-[#141413]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, 1)}
                          className="px-2.5 py-0.5 text-xs text-[#141413] hover:bg-[#F4F0EA] transition-colors"
                        >+</button>
                      </div>

                      <p className="text-xs font-mono text-[#141413] whitespace-nowrap">
                        ${(item.price * item.quantity).toLocaleString('es-CL')} CLP
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-8 border-t border-[#E6E1DA] bg-[#FDFCFA] space-y-4 sm:space-y-5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.15em] text-[#6E6A63]">Total Estimado</span>
                <div className="text-right">
                  <span className="text-base sm:text-lg font-mono text-[#141413] block">
                    ${totalCLP.toLocaleString('es-CL')} CLP
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#9C968E]">
                    Aprox. ${totalUSD} USD
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#6E6A63] font-light leading-relaxed border-t border-[#E6E1DA] pt-3">
                Cada obra es producida bajo pedido en papel Fine Art y despachada con embalaje de conservación a todo Chile.
              </p>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 sm:py-4 bg-[#141413] hover:bg-[#2A2A28] text-[#FAF8F5] text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
              >
                <span>Solicitar Encargo vía WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
