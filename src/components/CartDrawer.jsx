import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  const totalCLP = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalUSD = Math.round(totalCLP / 940);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Si hay un item con purchaseUrl configurado, abrir el link de pago (Shopify / Mercado Pago)
    const firstWithUrl = cart.find(item => item.purchaseUrl && item.purchaseUrl.trim() !== "");
    if (firstWithUrl && cart.length === 1) {
      window.open(firstWithUrl.purchaseUrl, '_blank');
      return;
    }

    // Formatear pedido ordenado para WhatsApp o sistema de compra
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
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-lg">
              <ShoppingBag className="w-5 h-5 text-brand" />
              <span>Tu Carrito · JavaOnFilm</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-brand" />
                <p className="font-bold text-slate-800 text-base mb-1">Tu carrito está vacío</p>
                <p className="text-xs text-slate-500">Explora la colección para añadir tus cuadros análogos favoritos.</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={item.cartItemId || index} className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-xl shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate font-serif">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.location}</p>
                    <div className="text-[11px] text-slate-500 mt-1 space-y-0.5">
                      <p><span className="font-semibold text-slate-700">Medida:</span> {item.size}</p>
                      <p><span className="font-semibold text-slate-700">Marco:</span> {item.frame}</p>
                    </div>
                    <p className="text-sm font-extrabold text-brand mt-1.5">
                      ${(item.price * item.quantity).toLocaleString('es-CL')} CLP
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      title="Eliminar del carrito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={() => onUpdateQuantity(index, -1)}
                        className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 font-bold"
                      >-</button>
                      <span className="px-2.5 text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, 1)}
                        className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 font-bold"
                      >+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/80 space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-slate-900">
                <span>Total Estimado:</span>
                <span className="text-xl text-brand font-extrabold">
                  ${totalCLP.toLocaleString('es-CL')} CLP <span className="text-xs font-normal text-slate-500">(~${totalUSD} USD)</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Envíos a todo Chile con embalaje de protección fine art.</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-brand hover:bg-brand-hover text-white text-sm font-bold rounded-xl shadow-lg shadow-brand/20 transition flex items-center justify-center gap-2"
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
