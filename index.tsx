import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
// @ts-ignore
import ResetVitalApp from './ResetVital.jsx';
import Familion from './Familion';
import './index.css';
import { clarity } from 'react-microsoft-clarity';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Inicializar Microsoft Clarity
clarity.init('uycou5x3v2');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/reset-vital-5-d" element={<ResetVitalApp />} />
        <Route path="/familion" element={<Familion />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
