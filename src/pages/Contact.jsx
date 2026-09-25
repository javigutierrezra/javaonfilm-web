import React, { useState } from 'react';
import { Mail, Instagram, Send, CheckCircle2, HelpCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consulta de Cuadro',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="pb-24 pt-6 space-y-16">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-mono font-bold text-[#C85A32] uppercase tracking-widest block">Contacto & Encargos de Archivo</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2A1E17]">
          ¿Tienes dudas o buscas una medida especial?
        </h1>
        <p className="text-base text-[#5A4C40] max-w-xl mx-auto font-normal">
          Escríbeme directamente para asesoría en marquería, encargos de formatos personalizados o proyectos de arquitectura e interiorismo.
        </p>
      </section>

      {/* Main Grid: Form + Direct Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#FAF6EE] p-8 sm:p-10 rounded-2xl border border-[#E4DCD0] shadow-sm space-y-6">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-[#EFE5D5] text-[#C85A32] rounded-full flex items-center justify-center mx-auto border border-[#E4DCD0]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2A1E17]">¡Mensaje Recibido en la Bitácora!</h3>
                <p className="text-sm text-[#5A4C40] max-w-md mx-auto font-mono">
                  Gracias por comunicarte con JavaOnFilm. Te responderé al correo <span className="font-bold text-[#2A1E17]">{formData.email}</span> lo antes posible.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Consulta de Cuadro', message: '' });
                  }}
                  className="px-6 py-3 bg-[#C85A32] hover:bg-[#B24B25] text-white font-semibold text-xs rounded-lg shadow-sm"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-serif font-bold text-[#2A1E17] mb-2">Formulario de Correspondencia</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#2A1E17] block">Tu Nombre</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Camila Morales"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm focus:outline-none focus:border-[#C85A32] text-[#2A1E17]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#2A1E17] block">Correo Electrónico</label>
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
                  <label className="text-xs font-mono font-bold text-[#2A1E17] block">Asunto</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm focus:outline-none focus:border-[#C85A32] text-[#2A1E17] font-medium"
                  >
                    <option value="Consulta de Cuadro">Consulta sobre un Cuadro Específico</option>
                    <option value="Medida Personalizada">Encargo con Medida Personalizada</option>
                    <option value="Envío Especial">Duda sobre Envío o Tiempos de Entrega</option>
                    <option value="Proyecto / Galería">Proyectos de Decoración / Arquitectura</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#2A1E17] block">Tu Mensaje</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Cuéntame en qué puedo ayudarte..."
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

          {/* Right Column: Direct Info & Instagram */}
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
                  <span className="text-[10px] font-mono font-bold text-[#736B63] block uppercase tracking-wider">Instagram Oficial</span>
                  <span className="text-xl font-serif font-bold text-[#2A1E17] group-hover:text-[#C85A32] transition-colors">
                    @javaonfilm
                  </span>
                  <p className="text-xs text-[#5A4C40] mt-0.5">Nuevos rollos, bitácoras de viajes y fotos inéditas.</p>
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

            {/* FAQ Box */}
            <div className="bg-[#FAF6EE] p-8 rounded-2xl border border-[#E4DCD0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#2A1E17] font-serif font-bold text-lg">
                <HelpCircle className="w-5 h-5 text-[#C85A32]" />
                <span>Preguntas Frecuentes</span>
              </div>

              <div className="space-y-4 text-xs text-[#5A4C40] divide-y divide-[#E4DCD0]">
                <div className="pt-2">
                  <p className="font-serif font-bold text-[#2A1E17] mb-1">¿Cuánto demoran los envíos?</p>
                  <p>Envíos dentro de Santiago: 2 a 4 días hábiles. Regiones de Chile: 4 a 7 días hábiles.</p>
                </div>
                <div className="pt-3">
                  <p className="font-serif font-bold text-[#2A1E17] mb-1">¿Los cuadros vienen listos para colgar?</p>
                  <p>Sí, todas las opciones con marco incluyen colgante metálico instalado y protección frontal de cristal fine art.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
