import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CHECK_INTERVAL_MS = 5 * 60 * 1000;

export const UpdateBanner: React.FC = () => {
  const { t } = useLanguage();
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const reloadingRef = useRef(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    let registration: ServiceWorkerRegistration | undefined;

    const trackInstallingWorker = (worker: ServiceWorker | null) => {
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          setWaitingWorker(worker);
        }
      });
    };

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;
      registration = reg;

      if (reg.waiting && navigator.serviceWorker.controller) {
        setWaitingWorker(reg.waiting);
      }
      reg.addEventListener('updatefound', () => trackInstallingWorker(reg.installing));
    });

    const interval = setInterval(() => {
      registration?.update().catch(() => {});
    }, CHECK_INTERVAL_MS);

    const onControllerChange = () => {
      if (reloadingRef.current) return;
      reloadingRef.current = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    return () => {
      clearInterval(interval);
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  if (!waitingWorker) return null;

  return (
    <div
      role="status"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2000,
        background: '#005333', color: 'white',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
        flexWrap: 'wrap',
        fontSize: 13, boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      }}
    >
      <span>{t.ui.updateAvailable}</span>
      <button
        onClick={() => waitingWorker.postMessage({ type: 'SKIP_WAITING' })}
        style={{
          background: '#D4AF37', color: '#005333', fontWeight: 700,
          fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase',
          border: 'none', borderRadius: 999, padding: '6px 16px', cursor: 'pointer',
        }}
      >
        {t.ui.updateNow}
      </button>
    </div>
  );
};
