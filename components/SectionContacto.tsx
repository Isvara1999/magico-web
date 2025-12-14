import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionContacto: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contacto" className="py-24 bg-bone relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-brand mb-4 font-serif">{t.contact.title}</h2>
          <p className="text-dark/70 font-light text-lg">{t.contact.subtitle}</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-brand/5">
          <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder={t.contact.placeholders.name}
                className="w-full px-4 py-3 bg-bone border border-transparent focus:border-gold focus:bg-white focus:outline-none transition-all rounded-lg font-light text-dark"
                required
              />
              <input
                type="email"
                placeholder={t.contact.placeholders.email}
                className="w-full px-4 py-3 bg-bone border border-transparent focus:border-gold focus:bg-white focus:outline-none transition-all rounded-lg font-light text-dark"
                required
              />
            </div>
            <input
              type="tel"
              placeholder={t.contact.placeholders.whatsapp}
              className="w-full px-4 py-3 bg-bone border border-transparent focus:border-gold focus:bg-white focus:outline-none transition-all rounded-lg font-light text-dark"
            />
            <textarea
              rows={4}
              placeholder={t.contact.placeholders.message}
              className="w-full px-4 py-3 bg-bone border border-transparent focus:border-gold focus:bg-white focus:outline-none transition-all rounded-lg font-light text-dark"
            ></textarea>
            <button
              type="submit"
              className="w-full md:w-auto md:self-center px-12 py-4 bg-gold text-white rounded-full hover:bg-brand transition-all duration-300 text-sm font-bold uppercase tracking-widest shadow-lg mt-4"
            >
              {t.contact.btn}
            </button>
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
            <a href="tel:+5493513709899" className="hover:text-gold transition-colors font-light">
              +54 9 351 370 9899
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