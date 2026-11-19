import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motive: 'Consulta sobre obra del archivo',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="pb-28 pt-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="border-b border-[#E6E1DA] pb-10 max-w-3xl space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8C4A32] block">
            Contacto & Encargos a Medida
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-[#141413]">
            Asesoría, dimensiones especiales o encargos.
          </h1>
          <p className="text-sm text-[#6E6A63] font-light leading-relaxed pt-1">
            Cada impresión y enmarcado se realiza a pedido. Si tienes dudas sobre qué medida o moldura elegir para tu espacio, o buscas una fotografía específica de las series de Viajes o Ecuestre, escríbenos directamente.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Minimalist Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-12 border border-[#E6E1DA] bg-[#FDFCFA] space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">
                  Confirmación
                </span>
                <h3 className="text-2xl font-serif text-[#141413]">Mensaje recibido</h3>
                <p className="text-xs text-[#6E6A63] leading-relaxed font-light max-w-md">
                  Gracias por escribir. Te responderé a la brevedad posible al correo <span className="text-[#141413] font-mono">{formData.email}</span>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', motive: 'Consulta sobre obra del archivo', message: '' });
                    }}
                    className="px-6 py-3 bg-[#141413] text-[#FAF8F5] text-[11px] font-mono uppercase tracking-[0.18em]"
                  >
                    Enviar nueva consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6E6A63] block">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full py-3 bg-transparent border-b border-[#E6E1DA] text-sm text-[#141413] placeholder:text-[#9C968E] focus:outline-none focus:border-[#141413] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6E6A63] block">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nombre@dominio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full py-3 bg-transparent border-b border-[#E6E1DA] text-sm text-[#141413] placeholder:text-[#9C968E] focus:outline-none focus:border-[#141413] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6E6A63] block">
                    Asunto
                  </label>
                  <select
                    value={formData.motive}
                    onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                    className="w-full py-3 bg-transparent border-b border-[#E6E1DA] text-sm text-[#141413] focus:outline-none focus:border-[#141413] transition-colors"
                  >
                    <option value="Consulta sobre obra del archivo">Consulta sobre una obra del archivo</option>
                    <option value="Dimensiones o enmarcado a medida">Dimensiones o enmarcado a medida</option>
                    <option value="Proyecto de interiorismo / arquitectura">Proyecto de interiorismo o arquitectura</option>
                    <option value="Otro">Otro motivo</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6E6A63] block">
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Indica la obra, medidas o detalles de tu consulta..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full py-3 bg-transparent border-b border-[#E6E1DA] text-sm text-[#141413] placeholder:text-[#9C968E] focus:outline-none focus:border-[#141413] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-10 py-4 bg-[#141413] hover:bg-[#2A2A28] text-[#FAF8F5] text-xs font-mono uppercase tracking-[0.2em] transition-colors"
                >
                  Enviar Consulta
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-8 lg:pl-8 lg:border-l border-[#E6E1DA]">
            
            <div className="space-y-2 pb-6 border-b border-[#E6E1DA]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">
                Atención Directa (WhatsApp)
              </span>
              <a
                href="https://wa.me/56968449779?text=Hola,%20quisiera%20consultar%20por%20una%20obra%20del%20archivo%20JavaOnFilm."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-2xl font-serif text-[#141413] hover:text-[#6E6A63] transition-colors"
              >
                <span>+56 9 6844 9779</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.25]" />
              </a>
              <p className="text-xs text-[#6E6A63] font-light">
                Consultas rápidas sobre disponibilidad, marcos y tiempos de despacho.
              </p>
            </div>

            <div className="space-y-2 pb-6 border-b border-[#E6E1DA]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">
                Bitácora Visual (Instagram)
              </span>
              <a
                href="https://instagram.com/javaonfilm"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-2xl font-serif text-[#141413] hover:text-[#6E6A63] transition-colors"
              >
                <span>@javaonfilm</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.25]" />
              </a>
              <p className="text-xs text-[#6E6A63] font-light">
                Nuevos rollos revelados, procesos de enmarcado y registros de viaje.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9C968E] block">
                Correo Electrónico
              </span>
              <a
                href="mailto:javaonfilm@gmail.com"
                className="block text-xl font-serif text-[#141413] hover:text-[#6E6A63] transition-colors"
              >
                javaonfilm@gmail.com
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
