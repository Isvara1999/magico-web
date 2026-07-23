import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CHECK_INTERVAL_MS = 5 * 60 * 1000;

export const UpdateBanner: React.FC = () => {
  const { t } = useLanguage();
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [updating, setUpdating] = useState(false);
  const reloadingRef = useRef(false);
  // sw.js calls clients.claim() on activate, which also fires 'controllerchange'
  // the very first time a page gets claimed by ANY service worker (not just on
  // real updates). Only reload when WE explicitly asked for the update — never
  // reload just because a 'controllerchange' event happened.
  const userTriggeredUpdateRef = useRef(false);

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
      if (!userTriggeredUpdateRef.current) return;
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
        disabled={updating}
        onClick={() => {
          if (updating) return;
          setUpdating(true);
          userTriggeredUpdateRef.current = true;
          waitingWorker.postMessage({ type: 'SKIP_WAITING' });
          // Safety net: if the browser doesn't hand off control within a few
          // seconds (should be near-instant), reload anyway rather than
          // leaving the button stuck on "Actualizando...".
          setTimeout(() => {
            if (!reloadingRef.current) {
              reloadingRef.current = true;
              window.location.reload();
            }
          }, 3000);
        }}
        style={{
          background: '#D4AF37', color: '#005333', fontWeight: 700,
          fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase',
          border: 'none', borderRadius: 999, padding: '6px 16px',
          cursor: updating ? 'default' : 'pointer', opacity: updating ? 0.7 : 1,
        }}
      >
        {updating ? t.ui.updating : t.ui.updateNow}
      </button>
    </div>
  );
};
