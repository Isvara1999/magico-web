import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import DossierAulaVerde from './DossierAulaVerde';
import { X } from '@phosphor-icons/react';

interface PrevisualizadorProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrevisualizadorPDF: React.FC<PrevisualizadorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex flex-col items-center p-4 md:p-8 animate-fade-in">
      {/* Botonera superior */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-4 text-white">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-serif text-gold">Vista Previa Automática - Dossier PDF</h2>
          <p className="text-sm opacity-80">Esta es la versión exacta que el código genera y descarga al docente.</p>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-red-500/80 rounded-full flex items-center justify-center transition-colors shadow-lg group"
        >
          <X weight="bold" className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Visor PDF nativo de react-pdf */}
      <div className="flex-1 w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20">
        <PDFViewer width="100%" height="100%" className="border-none" showToolbar={true}>
          <DossierAulaVerde />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PrevisualizadorPDF;
