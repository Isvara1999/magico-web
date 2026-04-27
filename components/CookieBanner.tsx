import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'cookie-consent';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'dismissed');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 relative">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-gray-300 hover:text-gray-500 transition-colors"
          aria-label="Cerrar aviso de cookies"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="flex items-start gap-3 pr-4">
          <span className="text-2xl leading-none mt-0.5" aria-hidden="true">🍃</span>
          <div className="space-y-2">
            <p className="text-brand font-serif text-base leading-snug">Privacidad & cookies</p>
            <p className="text-gray-500 text-xs font-light leading-relaxed">
              Usamos cookies de analítica (Microsoft Clarity) para mejorar la experiencia.
              Más info en nuestra{' '}
              <a
                href="/politica-de-privacidad"
                className="text-brand underline underline-offset-2 hover:text-brand/70 transition-colors"
              >
                Política de Privacidad
              </a>.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={accept}
                className="bg-brand text-white px-5 py-1.5 rounded-full text-xs font-semibold hover:bg-brand/90 transition-colors shadow-sm"
              >
                Aceptar
              </button>
              <button
                onClick={dismiss}
                className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
              >
                Solo esenciales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
