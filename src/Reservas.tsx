import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ReservasSection } from './components/ReservasSection';

const C = { dark: '#1A2B3C', gold: '#D4AF37', cream: '#F5F9FF' };

export default function Reservas() {
  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section style={{ backgroundColor: C.dark }}>
        <div className="max-w-5xl mx-auto px-4 pt-36 md:pt-40 pb-8 md:pb-12 text-center">
          <p className="text-[10px] tracking-widest uppercase font-bold mb-3" style={{ color: 'rgba(212,175,55,0.7)' }}>
            Invierno 2026 · julio · agosto · septiembre
          </p>
          <h1 className="text-3xl md:text-4xl font-bold serif-title mb-2" style={{ color: 'white', letterSpacing: '-0.02em' }}>
            Reservá tu estadía
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Todo el invierno en la montaña · Los Gigantes, Córdoba
          </p>
        </div>
      </section>

      {/* ── Booking section (componente reutilizable) ── */}
      <ReservasSection bgColor={C.cream} />

      {/* ── Cómo funciona ── */}
      <section className="py-14 px-4" style={{ backgroundColor: '#EBF4FA' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[10px] tracking-widest uppercase font-bold mb-8" style={{ color: '#4A6070' }}>
            ¿Cómo funciona?
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { num: '01', title: 'Elegís tus fechas', desc: 'Seleccioná llegada y salida en el calendario. Julio, agosto y septiembre disponibles.' },
              { num: '02', title: 'Confirmás por WhatsApp', desc: 'Tocás el botón y te abrimos una conversación con tu selección ya escrita.' },
              { num: '03', title: 'Asegurás lugar con seña', desc: 'Transferís el 30% de seña. El resto lo pagás al llegar a Pueblo Mágico.' },
            ].map(({ num, title, desc }) => (
              <div key={num}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3"
                  style={{ background: 'rgba(0,83,51,0.08)', color: '#005333' }}>
                  {num}
                </div>
                <p className="font-bold mb-1 text-sm" style={{ color: C.dark }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#4A6070' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
