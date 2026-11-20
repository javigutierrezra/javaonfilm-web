import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="pb-20 sm:pb-28 pt-8 sm:pt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        <div className="border-b border-[#E6E1DA] pb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C4A32] block mb-1">
            Contacto
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#141413]">
            Consultas y encargos
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 border border-[#E6E1DA] bg-[#FDFCFA] space-y-4">
                <h3 className="text-xl font-serif text-[#141413]">Mensaje enviado</h3>
                <p className="text-xs text-[#6E6A63] font-light">
                  Te responderé pronto a <span className="text-[#141413] font-mono">{formData.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-6 py-3 bg-[#141413] text-[#FAF8F5] text-xs font-mono uppercase tracking-[0.18em]"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6E6A63] block">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full py-2.5 bg-transparent border-b border-[#E6E1DA] text-sm text-[#141413] placeholder:text-[#9C968E] focus:outline-none focus:border-[#141413] rounded-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6E6A63] block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full py-2.5 bg-transparent border-b border-[#E6E1DA] text-sm text-[#141413] placeholder:text-[#9C968E] focus:outline-none focus:border-[#141413] rounded-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6E6A63] block">
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Escribe tu consulta..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full py-2.5 bg-transparent border-b border-[#E6E1DA] text-sm text-[#141413] placeholder:text-[#9C968E] focus:outline-none focus:border-[#141413] resize-none rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#141413] hover:bg-[#2A2A28] text-[#FAF8F5] text-xs font-mono uppercase tracking-[0.18em] transition-colors"
                >
                  Enviar
                </button>
              </form>
            )}
          </div>

          {/* Direct Links */}
          <div className="lg:col-span-5 space-y-6 lg:pl-8 lg:border-l border-[#E6E1DA]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#9C968E] block">
                WhatsApp
              </span>
              <a
                href="https://wa.me/56968449779"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xl font-serif text-[#141413] hover:text-[#8C4A32] mt-1"
              >
                <span>+56 9 6844 9779</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.25]" />
              </a>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#9C968E] block">
                Instagram
              </span>
              <a
                href="https://instagram.com/javaonfilm"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xl font-serif text-[#141413] hover:text-[#8C4A32] mt-1"
              >
                <span>@javaonfilm</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.25]" />
              </a>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#9C968E] block">
                Email
              </span>
              <a
                href="mailto:javaonfilm@gmail.com"
                className="block text-lg font-serif text-[#141413] hover:text-[#8C4A32] mt-1 break-all"
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
