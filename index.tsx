import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode, useEffect } from 'react';
import Main from './Main';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Componente Wrapper para manejar lógica global (Favicon)
const App = () => {
  useEffect(() => {
    const updateFavicon = () => {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Buscar el link del favicon o crear uno nuevo
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }

      // URLs de los logos
      const iconLight = "https://tawaapukuntur.com/wp-content/uploads/2025/10/logotipo-marron-magico.svg";
      const iconDark = "https://tawaapukuntur.com/wp-content/uploads/2025/10/logotipo-blanco-magico.svg";

      link.href = isDark ? iconDark : iconLight;
    };

    // Ejecutar al inicio y escuchar cambios
    updateFavicon();
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    matcher.addEventListener('change', updateFavicon);
    return () => matcher.removeEventListener('change', updateFavicon);
  }, []);

  return <Main />;
};

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);