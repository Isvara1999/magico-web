import React from 'react';
import ReactDOM from 'react-dom/client';
// Importamos explícitamente la extensión .tsx para evitar que cargue 'app.js' por error
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);