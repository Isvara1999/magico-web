import React from 'react';
import { CheckCircle, Sun, Moon, Leaf, UsersThree, Target, Star, House, ForkKnife } from '@phosphor-icons/react';

const VueloDelCondorInfo: React.FC = () => {
  return (
    <>
      {/* ====== INTRODUCCIÓN Y COSMOVISIÓN ====== */}
      <section id="experiencia" className="py-16 md:py-24 px-6 bg-white mt-16 md:mt-24" style={{ paddingBottom: 'max(6rem, 90px)' }}>
        <div className="max-w-5xl mx-auto pt-8">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-10 md:mb-16">
            De ver más allá. De recordar quién sos Desde un lugar más profundo.
          </h2>

          <div className="flex flex-col">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto px-4">
              En la cosmovisión andina, el Cóndor representa la conexión con lo más alto. La visión amplia. La sabiduría que observa.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto font-serif px-4 mt-8">
              Este viaje no es solo aventura. Es una experiencia iniciática.
              Un espacio para salir de la rutina, conectar con la naturaleza sagrada de Perú y abrir una nueva perspectiva sobre tu vida.
            </p>
          </div>
        </div>
      </section>

      {/* ====== PARA QUIÉN ES ====== */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl serif-title brand-green mb-6">¿Para quién es?</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              No se requiere ningún tipo de experiencia ni conocimiento previo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <CheckCircle weight="fill" className="text-brand-green w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700">Hombres en procesos de cambio.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <CheckCircle weight="fill" className="text-brand-green w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700">Buscadores de sentido y propósito.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <CheckCircle weight="fill" className="text-brand-green w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700">Quienes ya recorrieron caminos de autoconocimiento.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <CheckCircle weight="fill" className="text-brand-green w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700">Quienes sienten un llamado y que es momento de dar un salto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== QUÉ VAS A VIVIR ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-16 md:mb-24">
            Qué vas a vivir
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
            <div className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-brand-green/5 transition-colors duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <Moon weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-800">Rituales y ceremonias ancestrales</h4>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-brand-green/5 transition-colors duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <Leaf weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-800">Conexión con la naturaleza</h4>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-brand-green/5 transition-colors duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <UsersThree weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-800">Círculos de palabra</h4>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-brand-green/5 transition-colors duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <Sun weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-800">Dinámicas y Espacios de introspección</h4>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-brand-green/5 transition-colors duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <Target weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-800">Movimiento consciente</h4>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-brand-green/5 transition-colors duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <House weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-800">Armonizaciones Sonoras</h4>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-brand-green/5 transition-colors duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <Star weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-800">Caminatas con propósito</h4>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-brand-green/5 transition-colors duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <ForkKnife weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-800">Constelaciones Familiares</h4>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-brand-green/5 transition-colors duration-300 md:col-start-2 lg:col-start-auto">
              <div className="mb-4 text-brand-green flex justify-center">
                <CheckCircle weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-800">Silencio y contemplación</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ====== EL GRUPO ====== */}
      <section className="py-16 md:py-24 px-6 bg-brand-green text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl serif-title text-brand-gold mb-8">El Grupo</h2>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6 font-light">
            Grupo reducido para garantizar calidad y profundidad en la experiencia.
          </p>
          <p className="text-white/80 text-base md:text-lg">
            Acompañamiento cercano en un espacio cuidado y contenido.
          </p>
        </div>
      </section>
    </>
  );
};

export default VueloDelCondorInfo;
