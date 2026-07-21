import React, { Component, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error?: Error; }

const CHUNK_ERROR_PATTERN = /dynamically imported module|loading chunk|importing a module script failed|failed to fetch/i;
const RELOAD_GUARD_KEY = 'pm-chunk-reload-attempted';

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);

    // Stale build: this tab loaded an old bundle and just tried to fetch a
    // lazy-loaded chunk that no longer exists after a new deploy. Reload once
    // (guarded via sessionStorage to avoid a loop) so the user gets the new
    // version automatically instead of a silent/broken screen.
    const isChunkError = CHUNK_ERROR_PATTERN.test(error.message || '');
    if (isChunkError && !sessionStorage.getItem(RELOAD_GUARD_KEY)) {
      sessionStorage.setItem(RELOAD_GUARD_KEY, '1');
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      const isChunkError = CHUNK_ERROR_PATTERN.test(this.state.error?.message || '');
      if (isChunkError && sessionStorage.getItem(RELOAD_GUARD_KEY)) {
        // Reload already triggered in componentDidCatch — show the loader, not the error card.
        return (
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F8F4' }}>
            <div style={{ width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#005333', borderRadius: '50%', animation: 'pm-spin 0.8s linear infinite' }} />
            <style>{`@keyframes pm-spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        );
      }
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F9F8F4', padding: '2rem', textAlign: 'center' }}>
          <img src="/uploads/logo negro.svg" alt="Pueblo Mágico" style={{ height: 40, marginBottom: 32, opacity: 0.7 }} />
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#005333', marginBottom: 8 }}>
            Algo salió mal
          </p>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: 24, maxWidth: 360 }}>
            Ocurrió un error inesperado. Por favor recargá la página o volvé al inicio.
          </p>
          <a href="/" style={{ background: '#005333', color: '#fff', padding: '10px 28px', borderRadius: 999, fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>
            Volver al inicio
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
