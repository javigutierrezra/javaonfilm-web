import React, { useState } from 'react';
import { Mail, Instagram, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motive: 'Consulta sobre fotografía',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="pb-24 pt-6 space-y-12">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-mono font-bold text-[#C85A32] uppercase tracking-widest block">CONTACTO</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2A1E17]">
          ¿Una fotografía, tamaño o encargo?
        </h1>
        <p className="text-base text-[#5A4C40] max-w-xl mx-auto font-normal">
          Escríbeme directamente si buscas una imagen en particular, un tamaño especial o tienes cualquier consulta.
        </p>
      </section>

      {/* Main Grid: Form + Instagram / Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#FAF6EE] p-8 sm:p-10 rounded-2xl border border-[#E4DCD0] shadow-sm space-y-6">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-[#EFE5D5] text-[#C85A32] rounded-full flex items-center justify-center mx-auto border border-[#E4DCD0]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2A1E17]">¡Mensaje Enviado!</h3>
                <p className="text-sm text-[#5A4C40] max-w-md mx-auto font-mono">
                  Gracias por tu mensaje. Te responderé al correo <span className="font-bold text-[#2A1E17]">{formData.email}</span> a la brevedad.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', motive: 'Consulta sobre fotografía', message: '' });
                  }}
                  className="px-6 py-3 bg-[#C85A32] hover:bg-[#B24B25] text-white font-semibold text-xs rounded-lg shadow-sm"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-serif font-bold text-[#2A1E17] mb-2">Mensaje Directo</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#2A1E17] block">Nombre</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm focus:outline-none focus:border-[#C85A32] text-[#2A1E17]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#2A1E17] block">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="tu.email@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm focus:outline-none focus:border-[#C85A32] text-[#2A1E17]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#2A1E17] block">Motivo</label>
                  <select
                    value={formData.motive}
                    onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm focus:outline-none focus:border-[#C85A32] text-[#2A1E17] font-medium"
                  >
                    <option value="Consulta sobre fotografía">Consulta sobre una fotografía del archivo</option>
                    <option value="Medida especial">Encargo de medida especial</option>
                    <option value="Proyecto o colaboración">Proyecto o asesoría de espacios</option>
                    <option value="Otro">Otro motivo</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#2A1E17] block">Mensaje</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Escribe tu mensaje..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm focus:outline-none focus:border-[#C85A32] text-[#2A1E17]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C85A32] hover:bg-[#B24B25] text-white font-semibold text-sm rounded-lg shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje</span>
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Instagram & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Instagram Card */}
            <a
              href="https://instagram.com/javaonfilm"
              target="_blank"
              rel="noreferrer"
              className="bg-[#FAF6EE] p-8 rounded-2xl border border-[#E4DCD0] shadow-sm block group hover:border-[#C85A32] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2A1E17] text-[#C85A32] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-[#6E4B37]/30">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#736B63] block uppercase tracking-wider">Instagram</span>
                  <span className="text-xl font-serif font-bold text-[#2A1E17] group-hover:text-[#C85A32] transition-colors">
                    @javaonfilm
                  </span>
                  <p className="text-xs text-[#5A4C40] mt-0.5">Bitácora constante, viajes y fotos en 35mm.</p>
                </div>
              </div>
            </a>

            {/* WhatsApp Direct Card */}
            <a
              href="https://wa.me/56968449779?text=Hola!%20Quisiera%20hacer%20una%20consulta%20sobre%20tus%20fotograf%C3%ADas%20an%C3%A1logas."
              target="_blank"
              rel="noreferrer"
              className="bg-[#FAF6EE] p-8 rounded-2xl border border-[#E4DCD0] shadow-sm block group hover:border-[#25D366] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#25D366] text-slate-950 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-slate-950 stroke-none" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#736B63] block uppercase tracking-wider">WhatsApp Directo</span>
                  <span className="text-xl font-serif font-bold text-[#2A1E17] group-hover:text-[#25D366] transition-colors">
                    +56 9 6844 9779
                  </span>
                  <p className="text-xs text-[#5A4C40] mt-0.5">Atención rápida y personalizada.</p>
                </div>
              </div>
            </a>

            {/* Email Direct */}
            <div className="bg-[#FAF6EE] p-8 rounded-2xl border border-[#E4DCD0] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#EFE5D5] text-[#C85A32] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#736B63] block uppercase tracking-wider">Correo Directo</span>
                  <a href="mailto:javaonfilm@gmail.com" className="text-base font-bold text-[#2A1E17] hover:text-[#C85A32]">
                    javaonfilm@gmail.com
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
