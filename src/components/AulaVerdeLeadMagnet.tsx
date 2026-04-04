import React, { useState } from 'react';
import { DownloadSimple, CheckCircle, FilePdf, CircleNotch } from '@phosphor-icons/react';
import { pdf } from '@react-pdf/renderer';
import DossierAulaVerde from './pdf/DossierAulaVerde';

const AulaVerdeLeadMagnet: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form submission handler to prevent default and use Netlify AJAX (or standard form action)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const myForm = e.target as HTMLFormElement;
    const formData = new FormData(myForm);

    // Mapeo manual para asegurar compatibilidad si fetch falla en algunos entornos
    const urlEncodedData = new URLSearchParams(formData as any).toString();

    setIsGenerating(true);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: urlEncodedData,
    })
      .then(async () => {
        try {
          // Generar PDF usando react-pdf/renderer al vuelo
          const blob = await pdf(<DossierAulaVerde />).toBlob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Propuesta-Magico-Ensueno-Aula-Verde.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (pdfError) {
          console.error("Error generando el PDF:", pdfError);
        } finally {
          setIsGenerating(false);
          setSubmitted(true);
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario", error);
        setIsGenerating(false);
      });
  };

  return (
    <section className="py-20 md:py-32 px-6 bg-brand relative overflow-hidden text-white">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Columna Izquierda: Copy / Explicación del PDF */}
          <div data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <FilePdf weight="fill" className="w-4 h-4" />
              <span>Material Descargable</span>
            </div>

            <h2 className="text-3xl md:text-5xl serif-title mb-6 leading-tight">
              ¿Necesitás compartirlo con la <span className="text-gold">directora</span> o tu equipo?
            </h2>
            
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Sabemos que organizar la salida requiere que varias personas lo aprueben. Por eso diseñamos una presentación institucional lista para enviar por WhatsApp o mail.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4">
                <CheckCircle weight="fill" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-white/90"><strong>Quiénes somos:</strong> La visión detrás de Mágico Ensueño y nuestra reserva en Los Gigantes.</p>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle weight="fill" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-white/90"><strong>Cronograma tipo:</strong> Cómo se estructura el Día 1, Día 2, actividades guiadas y tiempos libres.</p>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle weight="fill" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-white/90"><strong>Qué incluye:</strong> Detalles de gastronomía, infraestructura, y personal a cargo (no incluye precios, para garantizar flexibilidad según el grupo).</p>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Formulario */}
          <div data-aos="fade-left">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative">
              
              {!submitted ? (
                <>
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl serif-title text-brand mb-2">Descargar Propuesta Educativa</h3>
                    <p className="text-gray-500 text-sm">Completá los datos y accedé al PDF al instante.</p>
                  </div>

                  <form name="aula-verde-pdf" data-netlify="true" onSubmit={handleSubmit} className="space-y-5">
                    {/* Campos ocultos de netlify */}
                    <input type="hidden" name="form-name" value="aula-verde-pdf" />
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="nombre_apellido">Nombre y Apellido *</label>
                      <input required type="text" id="nombre_apellido" name="nombre_apellido" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-gray-800" placeholder="Ej. Mariana López" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="colegio">Nombre del Colegio / Institución *</label>
                      <input required type="text" id="colegio" name="colegio" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-gray-800" placeholder="Ej. Instituto Belgrano" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="email">Correo Electrónico *</label>
                      <input required type="email" id="email" name="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-gray-800" placeholder="tu@correo.com" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="whatsapp">Número de WhatsApp *</label>
                      <input required type="tel" id="whatsapp" name="whatsapp" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-gray-800" placeholder="+54 9 351..." />
                    </div>

                    <button type="submit" disabled={isGenerating} className="w-full bg-gold hover:bg-yellow-500 text-brand font-extrabold uppercase tracking-widest text-sm py-4 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 mt-4 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-wait">
                      {isGenerating ? (
                        <>
                          <span>Generando PDF...</span>
                          <CircleNotch weight="bold" className="w-5 h-5 animate-spin" />
                        </>
                      ) : (
                        <>
                          <span>Descargar PDF</span>
                          <DownloadSimple weight="bold" className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    
                    <p className="text-xs text-gray-400 text-center mt-4">Tus datos están seguros y no enviamos spam.</p>
                  </form>
                </>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle weight="fill" className="w-12 h-12 text-brand" />
                  </div>
                  <h3 className="text-2xl serif-title text-brand mb-4">¡Listo, enviado!</h3>
                  <p className="text-gray-600 mb-8 px-4">
                    Tus datos fueron recibidos. Estamos preparando el material (en tu dispositivo debería haber comenzado la descarga).
                  </p>
                  <button onClick={() => setSubmitted(false)} className="text-brand font-bold uppercase text-sm tracking-widest border border-brand/20 py-2 px-6 rounded-full hover:bg-brand/5 transition-colors">
                    Volver
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AulaVerdeLeadMagnet;
