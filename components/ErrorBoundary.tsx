import React, { Component, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
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
