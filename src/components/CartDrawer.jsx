import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  const totalCLP = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalUSD = Math.round(totalCLP / 940);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const firstWithUrl = cart.find(item => item.purchaseUrl && item.purchaseUrl.trim() !== "");
    if (firstWithUrl && cart.length === 1) {
      window.open(firstWithUrl.purchaseUrl, '_blank');
      return;
    }

    let summary = `Hola! Quisiera comprar los siguientes cuadros en JavaOnFilm:%0A%0A`;
    cart.forEach((item, index) => {
      summary += `${index + 1}. *${item.title}* (${item.location})%0A   - Medida: ${item.size}%0A   - Marco: ${item.frame}%0A   - Cantidad: ${item.quantity}%0A   - Valor: $${(item.price * item.quantity).toLocaleString('es-CL')} CLP%0A%0A`;
    });
    summary += `*TOTAL ESTIMADO: $${totalCLP.toLocaleString('es-CL')} CLP (~$${totalUSD} USD)*%0A%0A¿Me confirmas disponibilidad y forma de despacho?`;

    window.open(`https://wa.me/56912345678?text=${summary}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#181411]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6EE] shadow-2xl flex flex-col border-l border-[#E4DCD0]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E4DCD0] flex items-center justify-between bg-[#FDFBF7]">
            <div className="flex items-center gap-2 text-[#2A1E17] font-serif font-bold text-lg">
              <ShoppingBag className="w-5 h-5 text-[#C85A32]" />
              <span>Tu Carrito de Cuadros</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#736B63] hover:text-[#2A1E17] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-[#736B63]">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#C85A32]" />
                <p className="font-serif font-bold text-[#2A1E17] text-base mb-1">Tu carrito está vacío</p>
                <p className="text-xs font-mono text-[#736B63]">Explora el archivo para añadir tus cuadros análogos favoritos.</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={item.cartItemId || index} className="flex items-center gap-4 p-3.5 bg-[#FDFBF7] rounded-xl border border-[#E4DCD0]">
                  <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-lg shadow-sm border border-[#E4DCD0]" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#2A1E17] text-sm truncate font-serif">{item.title}</h4>
                    <p className="text-xs text-[#6E4B37]">{item.location}</p>
                    <div className="text-[11px] text-[#736B63] mt-1 space-y-0.5 font-mono">
                      <p><span className="font-semibold text-[#2A1E17]">Medida:</span> {item.size}</p>
                      <p><span className="font-semibold text-[#2A1E17]">Marco:</span> {item.frame}</p>
                    </div>
                    <p className="text-sm font-bold text-[#C85A32] mt-1.5 font-mono">
                      ${(item.price * item.quantity).toLocaleString('es-CL')} CLP
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-[#736B63] hover:text-[#C85A32] transition-colors"
                      title="Eliminar del carrito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-[#E4DCD0] rounded-lg bg-[#FAF6EE] overflow-hidden shadow-sm">
                      <button
                        onClick={() => onUpdateQuantity(index, -1)}
                        className="px-2 py-0.5 text-xs text-[#2A1E17] hover:bg-[#EFE5D5] font-bold"
                      >-</button>
                      <span className="px-2.5 text-xs font-mono font-bold text-[#2A1E17]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, 1)}
                        className="px-2 py-0.5 text-xs text-[#2A1E17] hover:bg-[#EFE5D5] font-bold"
                      >+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E4DCD0] bg-[#FDFBF7] space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-[#2A1E17]">
                <span className="font-serif">Total Estimado:</span>
                <span className="text-xl text-[#C85A32] font-mono font-extrabold">
                  ${totalCLP.toLocaleString('es-CL')} CLP <span className="text-xs font-normal text-[#736B63]">(~${totalUSD} USD)</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#736B63] bg-[#FAF6EE] p-2.5 rounded-lg border border-[#E4DCD0]">
                <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>Envíos a todo Chile con embalaje fine art de algodón.</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#C85A32] hover:bg-[#B24B25] text-white text-sm font-semibold rounded-lg shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Pagar / Enviar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
