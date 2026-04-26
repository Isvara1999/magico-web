import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import './index.css';

const ResetVitalApp = lazy(() => import('./ResetVital.jsx'));
const Familion = lazy(() => import('./src/Familion'));
const Gondorbows = lazy(() => import('./src/Gondorbows'));
const AulaVerde = lazy(() => import('./src/AulaVerde'));
const AchalaViva = lazy(() => import('./src/AchalaViva'));

const PageLoader = () => (
  <div id="loader-container" style={{ minHeight: '100vh', background: '#FDFBF7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 48, height: 48, border: '3px solid #e5e7eb', borderTopColor: '#A8971C', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/reset-vital-5-d" element={<ResetVitalApp />} />
          <Route path="/familion" element={<Familion />} />
          <Route path="/gondorbows" element={<Gondorbows />} />
          <Route path="/escuelas" element={<AulaVerde />} />
          <Route path="/achala-viva" element={<AchalaViva />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
