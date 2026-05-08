import React, { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import './src/i18n';
import { LanguageProvider } from './contexts/LanguageContext';
import Main from './Main';
import './index.css';
import Familion from './src/Familion';
import Gondorbows from './src/Gondorbows';
import AulaVerde from './src/AulaVerde';
import AchalaViva from './src/AchalaViva';
import VueloDelCondor from './src/VueloDelCondor';

const ResetVitalApp = lazy(() => import('./ResetVital.jsx'));
const Estadia = lazy(() => import('./src/Estadia'));
const TerminosYCondiciones = lazy(() => import('./src/TerminosYCondiciones'));
const PoliticaPrivacidad = lazy(() => import('./src/PoliticaPrivacidad'));
const NotFound = lazy(() => import('./src/NotFound'));

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
};

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
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/reset-vital" element={<ResetVitalApp />} />
              <Route path="/familion" element={<Familion />} />
              <Route path="/gondorbows" element={<Gondorbows />} />
              <Route path="/escuelas" element={<AulaVerde />} />
              <Route path="/achala-viva" element={<AchalaViva />} />
              <Route path="/el-vuelo-del-condor" element={<VueloDelCondor />} />
              <Route path="/estadia" element={<Estadia />} />
              <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
              <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>
);
