import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export const SectionContacto = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Codificación de datos para Netlify Forms
      const data = new URLSearchParams();
      data.append('form-name', 'contact');
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });

      setStatus('success');
      setFormData({ name: '', email: '', whatsapp: '', message: '' });
      
      // Resetear mensaje de éxito después de 5 segundos
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="py-24 bg-bone relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-brand mb-4 font-serif">{t.contact.title}</h2>
          <p className="text-dark/70 font-light text-lg">{t.contact.subtitle}</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-brand/5">
          <form 
            className="grid gap-6" 
            onSubmit={handleSubmit} 
            name="contact" 
            data-netlify="true"
          >
            {/* Campo oculto necesario para Netlify Forms en React */}
            <input type="hidden" name="form-name" value="contact" />

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.placeholders.name}
                className="w-full px-4 py-3 bg-bone border border-transparent focus:border-gold focus:bg-white focus:outline-none transition-all rounded-lg font-light text-dark"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.contact.placeholders.email}
                className="w-full px-4 py-3 bg-bone border border-transparent focus:border-gold focus:bg-white focus:outline-none transition-all rounded-lg font-light text-dark"
                required
              />
            </div>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder={t.contact.placeholders.whatsapp}
              className="w-full px-4 py-3 bg-bone border border-transparent focus:border-gold focus:bg-white focus:outline-none transition-all rounded-lg font-light text-dark"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder={t.contact.placeholders.message}
              className="w-full px-4 py-3 bg-bone border border-transparent focus:border-gold focus:bg-white focus:outline-none transition-all rounded-lg font-light text-dark"
              required
            ></textarea>

            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`
                  w-full md:w-auto px-12 py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg mt-4 transition-all duration-300 flex items-center justify-center gap-2
                  ${status === 'success' 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-gold text-white hover:bg-brand disabled:opacity-70 disabled:cursor-not-allowed'}
                `}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> ¡Enviado!
                  </>
                ) : (
                  t.contact.btn
                )}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-sm animate-fadeIn font-medium">
                  Gracias por escribirnos. Te responderemos a la brevedad.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-sm animate-fadeIn flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Hubo un error al enviar. Por favor intenta de nuevo.
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center text-dark/60 text-sm">
          <div>
            <p className="font-bold text-brand mb-1 font-serif text-base">{t.contact.labels.email}</p>
            <a href="mailto:experienciamagico@gmail.com" className="hover:text-gold transition-colors font-light">
              experienciamagico@gmail.com
            </a>
          </div>
          <div>
            <p className="font-bold text-brand mb-1 font-serif text-base">{t.contact.labels.whatsapp}</p>
            <a href={t.contact.labels.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-light">
              +54 9 351 676 5820
            </a>
          </div>
          <div>
            <p className="font-bold text-brand mb-1 font-serif text-base">{t.contact.labels.social}</p>
            <a
              href="https://instagram.com/experienciamagico"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold transition-colors font-light"
            >
              @experienciamagico
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};