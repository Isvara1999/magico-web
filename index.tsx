import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
// @ts-ignore
import ResetVitalApp from './ResetVital.jsx';
import Familion from './src/Familion';
import Gondorbows from './src/Gondorbows';
import AulaVerde from './src/AulaVerde';
import AchalaViva from './src/AchalaViva';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/reset-vital-5-d" element={<ResetVitalApp />} />
        <Route path="/familion" element={<Familion />} />
        <Route path="/gondorbows" element={<Gondorbows />} />
        <Route path="/escuelas" element={<AulaVerde />} />
        <Route path="/achala-viva" element={<AchalaViva />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
