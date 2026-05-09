import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, ChevronUp, Music, Video, Wind, Sun, 
  Feather, Anchor, Heart, Info, Coffee, BookOpen, Compass, Star, 
  Footprints, PenTool, Smile, Moon, PlayCircle, Headphones, Smartphone,
  Users, Notebook, Printer, Sparkles, Download
} from 'lucide-react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// --- CONFIGURACIÓN DE MARCA (Manual de Uso) ---
const BRAND = {
  gold: '#A8971C',      // Ocre (Luz)
  terracotta: '#AA3E11', // Terracota (Tierra)
  green: '#005333',     // Verde (Naturaleza)
  magenta: '#9D005E',   // Magenta (Espiritual)
  blue: '#0099D1',      // Azul (Cielo)
  bg: '#FDFBF7',        // Crema Papel
  dark: '#1F2937'
};

// --- IMÁGENES DE FONDO (Placeholders estilo Córdoba) ---
const IMAGES = {
  hero: "/uploads/img_6948.webp", 
  day1: "/uploads/hero(3).webp", 
  day2: "/uploads/f2d5nat1pa6uihnwj480.webp", 
  day3: "/uploads/494815924_1424799465353456_392615711940557767_n.webp", 
  day4: "/uploads/refu.webp", 
  day5: "/uploads/exterior.webp"  
};

// --- COMPONENTES VISUALES ---

const PortalBackground = ({ color }) => (
  <svg viewBox="0 0 200 200" className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none animate-spin-slow">
    <circle cx="100" cy="100" r="90" stroke={color} strokeWidth="0.5" fill="none" strokeDasharray="4 4"/>
    <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="0.5" fill="none"/>
    <path d="M100,10 L100,190 M10,100 L190,100" stroke={color} strokeWidth="0.5"/>
    <rect x="50" y="50" width="100" height="100" stroke={color} strokeWidth="0.5" fill="none" transform="rotate(45 100 100)"/>
  </svg>
);

const MediaButton = ({ type, title, link, color }) => {
  const isSpotify = type === 'spotify';
  const Icon = isSpotify ? Music : Video;
  
  return (
    <a 
      href={link || "#"} 
      target="_blank" 
      rel="noopener noreferrer"
      className="no-print group flex items-center gap-3 p-3 rounded-lg border border-stone-200 bg-white hover:border-[color] transition-all shadow-sm hover:shadow-md"
      style={{ borderColor: `${color}40` }}
    >
      <div className={`p-2 rounded-full text-white shadow-sm`} style={{ backgroundColor: color }}>
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">{isSpotify ? 'Audio Guía' : 'Video Guía'}</p>
        <p className="text-sm font-bold text-stone-700 group-hover:text-[color]" style={{ color: '#444' }}>{title}</p>
      </div>
      <span className="text-stone-300">→</span>
    </a>
  );
};

const DayCard = ({ dayNumber, title, subtitle, icon: Icon, color, image, children, isOpen, onClick }) => {
  return (
    <div className="mb-10 print:mb-4 print:block" style={{ pageBreakBefore: 'always' }}>

      {/* HEADER CARD */}
      <button
        onClick={onClick}
        className="w-full relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 text-left print:shadow-none print:border-b print:rounded-none break-inside-avoid cursor-pointer z-20 touch-manipulation active:scale-[0.99] group"
      >
        {/* Background Image with layered overlay */}
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 opacity-55" style={{ backgroundColor: color, mixBlendMode: 'multiply' }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15"></div>
        </div>

        {/* Ghost day number — decorative */}
        <div className="absolute right-3 bottom-0 font-serif leading-none text-white/[0.07] font-bold select-none pointer-events-none z-10 tabular-nums" style={{ fontSize: 'clamp(100px, 20vw, 180px)' }} aria-hidden="true">
          {dayNumber}
        </div>

        <div className="relative z-10 px-8 py-9 md:px-12 md:py-11 flex items-end justify-between min-h-[200px] md:min-h-[240px]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-white/40"></span>
              <span className="rv-section-title text-white/50">Día {dayNumber}</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-none mb-2 drop-shadow-xl tracking-wide">
              {title}
            </h3>
            <p className="text-white/65 font-sans text-sm font-light tracking-widest uppercase">
              {subtitle}
            </p>
          </div>

          {/* TOGGLE BUTTON */}
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-500 no-print shadow-xl border border-white/20 backdrop-blur-xl flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : 'bg-white/15 group-hover:bg-white/25'}`}
            style={{ backgroundColor: isOpen ? color : undefined }}
          >
            <ChevronDown size={20} />
          </div>
        </div>
      </button>

      {/* CONTENT (Accordion) */}
      <div className={`overflow-hidden transition-all duration-700 ease-in-out bg-white rounded-b-2xl shadow-xl border-x border-b border-stone-100 print:max-h-none print:opacity-100 print:shadow-none print:border-none ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {/* Color accent strip */}
        <div className="h-[3px]" style={{ background: `linear-gradient(to right, ${color}, ${color}60, transparent)` }}></div>
        <div className="p-6 md:p-10 space-y-8 relative">
          <PortalBackground color={color} />
          <div className="relative z-10 text-stone-700 font-sans leading-relaxed text-left">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function ResetVitalApp() {
  const [openDay, setOpenDay] = useState(0); 
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOfflineInfoOpen, setIsOfflineInfoOpen] = useState(false);

  useEffect(() => {
    // Detectar si la app ya está instalada/abierta en modo standalone
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsStandalone(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = () => {
    // Rastreo de Pixel: Intento de instalación
    if (window.fbq) {
      window.fbq('track', 'Lead', { content_name: 'App Install Intent' });
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setDeferredPrompt(null);
        }
      });
    } else {
      alert("📱 Para Celulares (Android/iOS):\n1. Abrí el menú del navegador (⋮ o botón compartir).\n2. Seleccioná 'Agregar a la pantalla principal' o 'Instalar aplicación'.\n\n💻 Para PC/Notebook:\n1. Buscá el ícono de instalar (⊕ o 🖥️) en la barra de direcciones.\n2. O andá al menú > Guardar y compartir > Instalar página...\n\n✨ IMPORTANTE: Una vez descargada, podrás ingresar a este mismo enlace incluso sin conexión a internet.");
    }
  };

  const toggleSection = (index) => {
    setOpenDay(openDay === index ? -1 : index);
  };

  const isDayOpen = (index) => openDay === 'ALL' || openDay === index;

  return (
    <LanguageProvider>
      <>
        <Header />
        <div className="min-h-screen font-sans bg-[#FDFBF7] selection:bg-[#A8971C] selection:text-white print:bg-white">
      <style>{`
        .font-serif { font-family: 'Marcellus', 'Georgia', serif; }
        .font-sans { font-family: 'Nunito', sans-serif; }
        .animate-spin-slow { animation: spin 60s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .rv-quote { font-family: 'Marcellus', Georgia, serif; font-style: italic; }
        .rv-section-title { letter-spacing: 0.18em; text-transform: uppercase; font-size: 0.7rem; font-weight: 700; }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .hero-animate { animation: fadeSlideUp 0.9s ease forwards; }
        .hero-animate-2 { animation: fadeSlideUp 0.9s 0.2s ease both; }
        .hero-animate-3 { animation: fadeSlideUp 0.9s 0.4s ease both; }
        
        @media print {
          .no-print { display: none !important; }
          .break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
          body { background-color: white; color: black; }
          .shadow-xl, .shadow-lg, .shadow-md { box-shadow: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          
          /* --- OPTIMIZACIÓN CRÍTICA PARA PDF --- */
          /* 1. Forzar diseño de una sola columna (elimina cortes verticales raros) */
          .grid, .md\\:grid-cols-2, .md\\:grid-cols-3 { 
            display: block !important; 
          }
          
          /* 2. Añadir margen inferior a los elementos que antes estaban en grilla */
          .grid > *, .md\\:grid-cols-2 > * {
            margin-bottom: 2rem !important;
          }

          /* 3. PROHIBIR que estos elementos se corten a la mitad entre páginas */
          p, h1, h2, h3, h4, h5, h6, li, img, svg, .rounded-xl, .rounded-lg, .bg-stone-50, .bg-green-50 {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* --- HERO HEADER --- */}
      <header className="relative h-[92vh] min-h-[600px] flex flex-col items-center justify-center text-center overflow-hidden print:h-auto print:py-10 print:pb-0" style={{ pageBreakAfter: 'always' }}>
        <div className="absolute inset-0 z-0 no-print">
          <img src={IMAGES.hero} className="w-full h-full object-cover scale-110 transition-transform duration-[8s] ease-out" alt="Cielo estrellado montaña" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70"></div>
          <div className="absolute inset-0 bg-[#005333]/20 mix-blend-overlay"></div>
          {/* Vignette lateral */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center">
          {/* Badge */}
          <div className="hero-animate inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-2xl print:border-stone-800 print:text-stone-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8971C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A8971C]"></span>
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/85">Retiro Autogestivo · Mágico Ensueño</span>
          </div>

          {/* Main title */}
          <h1 className="hero-animate-2 font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 drop-shadow-2xl print:text-[#005333] leading-[0.9] w-full">
            Desconectar<br/>para<br/>Reconectar
          </h1>

          {/* Divider */}
          <div className="hero-animate-3 flex items-center gap-4 mb-6">
            <div className="h-px w-14 bg-gradient-to-r from-transparent via-[#A8971C]/70 to-[#A8971C]"></div>
            <Star size={12} className="text-[#A8971C]" fill="#A8971C" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent via-[#A8971C]/70 to-[#A8971C]"></div>
          </div>

          {/* Subtitle + Logo */}
          <div className="hero-animate-3 flex flex-col items-center gap-4">
            <p className="text-base md:text-lg font-serif tracking-[0.35em] text-[#A8971C] uppercase print:text-[#A8971C]">
              Reset Vital
            </p>
            <img
              src="/uploads/logo blanco.svg"
              alt="Mágico Ensueño"
              className="h-16 md:h-20 lg:h-24 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity drop-shadow-xl print:hidden"
            />
            <img
              src="/uploads/logo negro.svg"
              alt="Mágico Ensueño"
              className="hidden print:block h-14 w-auto object-contain mt-2"
            />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 no-print flex flex-col items-center gap-2 opacity-50">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white font-bold">Comenzar</span>
          <ChevronDown size={18} className="text-white animate-bounce" />
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-3xl mx-auto px-4 -mt-20 relative z-20 pb-10 print:mt-0 print:pb-0">

        {/* 0. UMBRAL (Intro Card) */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl shadow-stone-200/50 mb-12 relative overflow-hidden text-center break-inside-avoid print:shadow-none print:border print:border-stone-200">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#005333] via-[#A8971C] to-[#AA3E11]"></div>
            <PortalBackground color={BRAND.green} />
            
            <div className="relative z-10">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                   <Wind className="text-[#005333]" size={32} strokeWidth={1} />
                </div>
                <h2 className="font-serif text-3xl text-[#005333] mb-1">UMBRAL</h2>
                <p className="text-xs font-bold text-[#AA3E11] uppercase tracking-[0.3em] mb-8">Antes de seguir</p>

                <div className="prose prose-lg mx-auto text-stone-600 mb-10 space-y-6 font-serif leading-relaxed">
                   <p className="italic text-xl text-[#005333]">
                     "No llegaste hasta acá por casualidad. Algo en vos sintió un llamado. Este lugar no es solo un espacio físico. Es un portal."
                   </p>
                   <p className="font-sans text-base">
                     A partir de este punto, el tiempo cambia. Las exigencias se aflojan. La escucha se vuelve posible.
                   </p>
                   <p className="font-sans text-base">
                     No hace falta que creas en nada. Solo que estés disponible para dejarte atravesar por la experiencia.
                   </p>
                   <p className="font-bold text-[#A8971C] text-sm tracking-wide uppercase mt-4">
                     Te invitamos a ser vos mismo/a en todo momento.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-8 pt-8 border-t border-stone-100">
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                        <Smartphone size={20} className="text-[#AA3E11] mx-auto mb-2" />
                        <p className="text-xs text-stone-600 leading-tight">Usá el celular lo menos posible durante tu estadía, solo si lo necesitás realmente.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                        <Users size={20} className="text-[#005333] mx-auto mb-2" />
                        <p className="text-xs text-stone-600 leading-tight">Para lo que necesites, nuestro equipo anfitrión está disponible para acompañarte.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                        <Notebook size={20} className="text-[#A8971C] mx-auto mb-2" />
                        <p className="text-xs text-stone-600 leading-tight">Tené tu bitácora siempre a mano y, cada vez que lo sientas, escribí lo que emerja.</p>
                    </div>
                </div>
                
                {/* --- TIP OFFLINE (Accordion) --- */}
                {!isStandalone && (
                  <div className="mt-8 bg-stone-100 rounded-xl border border-stone-200 overflow-hidden no-print transition-all duration-300">
                      <button 
                          onClick={() => setIsOfflineInfoOpen(!isOfflineInfoOpen)}
                          className="w-full p-4 flex items-center gap-4 text-left hover:bg-stone-50 transition-colors"
                      >
                          <div className="p-3 bg-white rounded-full text-[#AA3E11] shadow-sm shrink-0">
                          <Smartphone size={24} />
                      </div>
                      <div className="flex-1">
                          <p className="text-sm font-bold text-stone-700">¿Vas a estar sin señal?</p>
                              <p className="text-xs text-stone-500">Guardá esta guía para acceder offline.</p>
                      </div>
                          <div className={`text-stone-400 transition-transform duration-300 ${isOfflineInfoOpen ? 'rotate-180' : ''}`}>
                              <ChevronDown size={20} />
                          </div>
                      </button>

                      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOfflineInfoOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="p-4 pt-0 text-sm text-stone-600 border-t border-stone-200/50">
                              <div className="space-y-4 pt-4">
                                  {deferredPrompt ? (
                                     <button 
                                        onClick={handleInstall}
                                        className="w-full py-3 bg-[#AA3E11] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#8a330e] transition-colors shadow-md flex items-center justify-center gap-2"
                                    >
                                        <Download size={16} /> Instalar App Ahora
                                    </button>
                                  ) : (
                                    <>
                                      <div>
                                        <p className="font-bold text-[#AA3E11] mb-1 flex items-center gap-2"><Smartphone size={14}/> En Celulares (Android/iOS):</p>
                                        <ol className="list-decimal pl-5 space-y-1 text-xs">
                                          <li>Abrí el menú del navegador (⋮ o botón compartir).</li>
                                          <li>Seleccioná <strong>"Agregar a inicio"</strong> o <strong>"Instalar aplicación"</strong>.</li>
                                        </ol>
                                      </div>
                                      <div>
                                        <p className="font-bold text-[#AA3E11] mb-1 flex items-center gap-2"><Printer size={14}/> En PC/Notebook:</p>
                                        <ol className="list-decimal pl-5 space-y-1 text-xs">
                                          <li>Buscá el ícono de instalar (⊕) en la barra de direcciones.</li>
                                          <li>O andá al menú {'>'} Guardar y compartir {'>'} Instalar página.</li>
                                        </ol>
                                      </div>
                                    </>
                                  )}
                                  <div className="bg-[#AA3E11]/10 p-3 rounded-lg">
                                     <p className="text-xs text-[#AA3E11] font-bold">✨ IMPORTANTE:</p>
                                     <p className="text-xs text-[#AA3E11]">Una vez descargada, podrás ingresar a este mismo enlace incluso sin conexión a internet.</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                )}

                <p className="mt-8 text-xs font-bold text-stone-400 uppercase tracking-widest no-print">Cuando estés listo/a, seguí</p>
            </div>
        </div>

        {/* DÍA 1 */}
        <DayCard
          dayNumber="01"
          title="CRUZAR EL PORTAL"
          subtitle="Soltar el ruido · Habitar el cuerpo"
          icon={Anchor}
          color={BRAND.terracotta}
          image={IMAGES.day1}
          isOpen={isDayOpen(1)}
          onClick={() => toggleSection(1)}
        >
          <div className="text-center mb-8 px-4">
            <p className="text-xl font-serif italic text-[#AA3E11] mb-4">
              "Este primer día no es para entender. Es para llegar de verdad."
            </p>
            <p className="text-sm font-bold text-stone-400 uppercase tracking-widest">
              Aterrizar · Sincronizar · Conectar
            </p>
            <p className="text-sm text-stone-600 mt-2">
              Aterrizar en el cuerpo. Sincronizarte con el ritmo. Conectar con vos y con el territorio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <section>
               <h4 className="flex items-center gap-2 font-bold text-[#AA3E11] mb-4 text-sm uppercase tracking-wider border-b border-[#AA3E11]/20 pb-2">
                  <Coffee size={18} /> Ritual de llegada
                </h4>
                <p className="text-sm text-stone-500 mb-4 italic">Elegí un gesto simple para marcar el cruce:</p>
                <ul className="space-y-3 text-sm text-stone-700">
                  {["Prepará una infusión.", "Salí unos minutos al aire libre.", "Poné ambos pies en la tierra.", "Respirá profundo tres veces.", "Decí, en voz baja o por dentro: Estoy acá."].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AA3E11] mt-1.5"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 bg-orange-50 p-4 rounded-lg text-xs text-[#AA3E11] italic border-l-2 border-[#AA3E11]">
                   Más que decirlo, sentilo. Date las gracias. Si hoy estás acá, es porque algo estás haciendo bien.
                </div>
            </section>

            <section>
                <h4 className="flex items-center gap-2 font-bold text-[#AA3E11] mb-4 text-sm uppercase tracking-wider border-b border-[#AA3E11]/20 pb-2">
                  <Footprints size={18} /> Caminata de aterrizaje
                </h4>
                <p className="text-stone-700 mb-4 text-sm">Salí a caminar sin destino.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                   {["Paso Lento", "Respiración Profunda", "Mirada Amplia"].map(tag => (
                     <span key={tag} className="px-2 py-1 bg-stone-100 text-stone-500 text-[10px] font-bold uppercase rounded">{tag}</span>
                   ))}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                   No busques nada especial. Si la mente se acelera, volvés al paso. Cada paso es una forma de llegar. Observá lo que pasa en vos y quedate ahí. Dejá que la energía se vaya ordenando sola.
                </p>
            </section>
          </div>

          <section className="bg-stone-50 p-6 rounded-xl border border-stone-100">
              <h4 className="flex items-center gap-2 font-bold text-[#AA3E11] mb-4 text-sm uppercase tracking-wider">
                <Sun size={18} /> El cuerpo como puerta
              </h4>
              <p className="text-sm text-stone-600 mb-4">
                 Te invitamos a realizar alguna dinámica que te conecte con el presente a través del cuerpo. Elegí lo que sientas:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-stone-700 mb-6">
                 {["Estiramientos suaves", "Movimiento libre", "Acostarte en el suelo", "Bañarte en el río", "Meditar"].map(item => (
                   <div key={item} className="flex items-center gap-2">
                     <div className="w-1 h-1 bg-stone-300 rounded-full"></div> {item}
                   </div>
                 ))}
              </div>
              <p className="text-sm text-stone-600 italic mb-6">
                Escuchate. Sentí lo que tu cuerpo tiene para contarte hoy. Agradecele por traerte hasta acá y por ser el canal de esta experiencia.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MediaButton type="spotify" title="Relajación para sentirte a salvo" link="https://soundcloud.com/desansiedad/meditacion-relajacion-para-sentirte-a-salvo-protegido-seguro" color={BRAND.terracotta} />
                <MediaButton type="video" title="Yoga Suave para desconectar" link="https://www.youtube.com/watch?v=ShRi81rRMao" color={BRAND.terracotta} />
              </div>
          </section>

          <section>
              <h4 className="flex items-center gap-2 font-bold text-[#AA3E11] mb-4 text-sm uppercase tracking-wider border-b border-[#AA3E11]/20 pb-2">
                <BookOpen size={18} /> Escritura de descarga
              </h4>
              <div className="bg-white p-6 rounded-xl shadow-inner border border-stone-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><PenTool size={40} /></div>
                <p className="text-sm text-stone-600 mb-4">Tomá un cuaderno o una hoja. Escribí sin pensar demasiado:</p>
                <ul className="space-y-2 text-base font-serif text-[#AA3E11] italic mb-6">
                  <li>¿Cómo llego a este lugar?</li>
                  <li>¿Quién estoy siendo hoy?</li>
                  <li>¿Cuál es el propósito de este viaje?</li>
                </ul>
                <p className="text-xs text-stone-400">
                    No pienses tanto. Dejá salir lo que sientas. No hay manera de hacerlo mal. Así como sale, está bien.
                </p>
              </div>
          </section>
          
          <div className="bg-[#AA3E11] text-white p-8 -mx-6 -mb-6 md:-mx-8 md:-mb-8 mt-4 text-center">
              <Moon size={24} className="mx-auto mb-3 opacity-80" />
              <h4 className="font-serif text-xl mb-2">Cierre del día</h4>
              <p className="text-sm opacity-90 leading-relaxed max-w-md mx-auto mb-4">
                  "Antes de acostarte, hacé un pequeño ritual de revisión del día. Agradecé por todo lo que sentiste. No por lo que hiciste, sino por haberte permitido llegar y simplemente ser quien sos hoy. Eso ya es mucho."
              </p>
              <p className="text-xs opacity-70 mb-4">Lo último que experimentás antes de dormir es lo que más fuerte graba el subconsciente. Regalate ese momento para intencionar y visualizar tu mejor versión.</p>
              <p className="font-serif italic text-lg opacity-80">Bienvenido/a. Este viaje ya empezó.</p>
          </div>
        </DayCard>

        {/* DÍA 2 */}
        <DayCard
          dayNumber="02"
          title="ESCUCHAR"
          subtitle="Abrir la percepción · Dar espacio a lo que está"
          icon={Feather}
          color={BRAND.green}
          image={IMAGES.day2}
          isOpen={isDayOpen(2)}
          onClick={() => toggleSection(2)}
        >
          <div className="text-center mb-8 bg-green-50 p-6 rounded-xl border border-green-100">
             <p className="text-sm text-stone-600 mb-2">Ya cruzaste el portal. Este día es para escuchar. Escuchar el cuerpo. Escuchar el pulso interno. Escuchar lo que normalmente queda tapado por el ruido.</p>
            <p className="text-lg font-serif italic text-[#005333] mb-2">
                "Escucharte de verdad. Sentirte. Hacerte lugar."
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-[#005333]/60">
                Acá no hay juicios. Todo lo que estás siendo hoy está bien. Recordá: sos valioso/a.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h4 className="flex items-center gap-2 font-bold text-[#005333] mb-3 text-sm uppercase tracking-wider">
                <Sun size={18} /> Ritual de la mañana
              </h4>
              <p className="text-sm text-stone-600 mb-3">
                Al despertar, empezá el día agradeciendo simplemente estar vivo/a. Tomá un vaso de agua fresca. Salí al aire libre. Respirá profundo.
              </p>
              <p className="text-sm text-stone-600 mb-3">Preguntate, sin responder con palabras: <br/><span className="font-serif italic text-lg text-[#005333]">¿Cómo estoy hoy?</span></p>
              <p className="text-sm text-stone-600">Elegí con conciencia cómo querés vivir tu día.</p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 font-bold text-[#005333] mb-3 text-sm uppercase tracking-wider">
                <Wind size={18} /> Movimiento consciente
              </h4>
               <p className="text-sm text-stone-600 mb-2">Elegí un movimiento suave para habitarte.</p>
               <p className="text-sm text-stone-600 mb-4">Algunas ideas: Yoga, Estiramientos intuitivos, Movimiento libre con respiración. Dejá que el cuerpo marque el ritmo.</p>
              <div className="space-y-2">
                 <MediaButton type="spotify" title="Tibetan Bowls with Binaural Beats" link="https://soundcloud.com/sonic-yogi/c-tibetan-bowls-with-binaural" color={BRAND.green} />
                 <MediaButton type="video" title="Relájate: Yoga Suave para Soltar" link="https://www.youtube.com/watch?v=_ycYIPNszMo" color={BRAND.green} />
              </div>
            </section>
          </div>

          <section className="bg-[#005333]/5 p-6 rounded-xl border-l-4 border-[#005333] my-6">
            <h4 className="font-bold text-[#005333] mb-2 flex items-center gap-2 text-sm uppercase"><Info size={16} /> Espacio de escucha</h4>
            <p className="text-sm text-stone-600 mb-2">Buscá un lugar tranquilo. Podés sentarte o acostarte. Observá: La respiración. Las sensaciones. Las emociones. Los pensamientos.</p>
            <p className="italic text-stone-700 font-medium">"Sé la conciencia que observa. No te identifiques. Solo respirás y sos testigo. Si se siente bien, quedate. Si se siente incómodo, quedate. Lo que sea que aparezca está bien. Habitá con confianza y entregate."</p>
          </section>

          <section>
              <h4 className="flex items-center gap-2 font-bold text-[#005333] mb-4 text-sm uppercase tracking-wider">
                <PenTool size={18} /> Escritura reveladora
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-lg">
                   <p className="text-xs font-bold text-stone-400 uppercase mb-2">Disparadores posibles</p>
                   <ul className="text-sm italic text-[#005333] space-y-2 font-serif">
                    <li>¿Qué emoción aparece con más fuerza?</li>
                    <li>¿Qué parte de mí pide atención?</li>
                    <li>¿Qué estoy evitando escuchar?</li>
                    <li>¿Cuál es mi mayor miedo?</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center p-4 text-center text-sm text-stone-500 italic">
                  <p>"Escribí sin pensar todo lo que llegue. Nadie más lo va a leer. Es para vos. Soltá todo lo que necesites poner afuera."</p>
                  <p className="text-xs mt-2 not-italic font-bold">Cerrá el cuaderno y registrá cómo te sentís después.</p>
                </div>
              </div>
          </section>
          
          <div className="border-t border-stone-100 mt-6 pt-6 text-center">
             <h4 className="font-bold text-stone-400 flex items-center justify-center gap-2 text-xs uppercase tracking-widest mb-2"><Moon size={14}/> Cierre del día</h4>
             <p className="text-sm text-stone-600 mb-2">Al anochecer: Bajá el ritmo. Menos palabras. Más silencio.</p>
             <p className="text-sm text-stone-600 italic">
                "Agradecé lo que apareció, incluso aquello que resultó incómodo. Ver las cosas como son y aceptarlas es un acto profundo de valentía."
             </p>
          </div>
        </DayCard>

        {/* DÍA 3 */}
        <DayCard
          dayNumber="03"
          title="ORDENAR"
          subtitle="Dar forma · Integrar lo vivido"
          icon={Sun}
          color={BRAND.gold}
          image={IMAGES.day3}
          isOpen={isDayOpen(3)}
          onClick={() => toggleSection(3)}
        >
          <div className="text-center mb-8">
             <Star className="mx-auto text-[#A8971C] mb-2 animate-pulse" size={24} />
             <p className="text-sm text-stone-600 mb-2">Un nuevo día que invita a ordenar desde adentro.</p>
             <p className="text-lg font-serif italic text-[#A8971C]">
                "Lo que fue emergiendo empieza a decantar y acomodarse solo."
             </p>
          </div>

          <section className="mb-8">
              <h4 className="flex items-center gap-2 font-bold text-[#A8971C] mb-2 text-sm uppercase tracking-wider">
                 Amanecer consciente
              </h4>
              <p className="text-sm text-stone-600">
                  Respirá. Mirà el entorno. Sentí el cuerpo. Agradecé por estar. Simplemente eso. <br/>
                  <span className="font-bold text-[#A8971C]">Algo ya es distinto. ¿Podés sentirlo?</span>
              </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-yellow-50/50 p-6 rounded-xl border border-[#A8971C]/20">
              <h4 className="flex items-center gap-2 font-bold text-[#A8971C] mb-3 text-sm uppercase tracking-wider">
                <Footprints size={18} /> Caminata de integración
              </h4>
              <p className="text-xs font-bold text-stone-400 uppercase mb-2">Caminá preguntándote suavemente:</p>
              <ul className="space-y-2 text-sm font-serif text-[#A8971C] italic">
                  <li>¿Qué me llevo de estos días?</li>
                  <li>¿Qué elijo dejar acá?</li>
                  <li>¿Qué necesito cuidar y potenciar al volver?</li>
              </ul>
              <p className="text-xs text-stone-500 mt-2">No respondas rápido. Dejá que el paisaje acompañe. Escuchate.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
              <h4 className="flex items-center gap-2 font-bold text-[#A8971C] mb-3 text-sm uppercase tracking-wider">
                <BookOpen size={18} /> Escritura de claridad
              </h4>
               <p className="text-sm text-stone-600 mb-2">Escribí:</p>
               <ul className="list-disc pl-4 space-y-2 text-sm text-stone-600">
                  <li>Una verdad que apareció.</li>
                  <li>Un límite necesario.</li>
                  <li>Un gesto pequeño y posible para sostener esto en tu vida.</li>
                  <li>Alguna persona a la que te gustaría escribirle para agradecer o pedir perdón.</li>
              </ul>
              <p className="text-xs italic text-stone-400 mt-4">Que sea simple. Que sea real. Animate.</p>
            </div>
          </section>

          <section className="mb-8">
             <h4 className="font-bold text-[#A8971C] mb-3 text-sm uppercase tracking-wider flex items-center gap-2"><Headphones size={18}/> Recursos para el enfoque</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MediaButton type="spotify" title="Deep Focus & Concentration" link="https://soundcloud.com/quietqueststudymusic/3-hours-of-ambient-study-music-to-concentrate-deep-focus-music-for-studying-and-work" color={BRAND.gold} />
                <MediaButton type="spotify" title="Meditación: Soltar tensiones" link="https://insighttimer.com/es/carmen/meditacion-guiada/soltar-tensiones" color={BRAND.gold} />
             </div>
          </section>

          <section className="text-center p-6 border-2 border-[#A8971C] border-dashed rounded-xl">
              <h4 className="font-bold text-[#A8971C] mb-2 text-sm uppercase tracking-wider">Ritual de cierre</h4>
              <p className="text-sm text-stone-600 mb-2">Elegí un gesto simbólico:</p>
              <p className="text-sm text-stone-600 mb-4">Romper un papel · Agradecer en voz alta · Una respiración profunda mirando el lugar.</p>
              <p className="font-serif text-[#A8971C] text-lg leading-relaxed">
                 "Reconocé el tiempo que te regalaste hasta aca. Hacelo Consciente. Agradecerte por darte permiso a vivir esta experiencia de volver a vos!"
              </p>
          </section>
        </DayCard>

        {/* DÍA 4 */}
        <DayCard
          dayNumber="04"
          title="ELEGIR"
          subtitle="Direccionar la energía · Llevar claridad a la vida"
          icon={Compass}
          color={BRAND.blue}
          image={IMAGES.day4}
          isOpen={isDayOpen(4)}
          onClick={() => toggleSection(4)}
        >
          <div className="mb-8 pl-4 border-l-4 border-[#0099D1]">
             <p className="text-sm text-stone-600 mb-2">Este día abre una nueva capa. Después de escuchar y ordenar, llega el momento de elegir conscientemente.</p>
             <p className="text-lg font-serif italic text-[#0099D1] mb-2">
                "No desde la exigencia. Desde la coherencia."
             </p>
             <p className="text-sm text-stone-500">
                Elegir qué sí. Elegir qué no. Elegir cómo querés vivir lo que viene.
             </p>
          </div>
          
           <section className="mb-8">
              <h4 className="flex items-center gap-2 font-bold text-[#0099D1] mb-3 text-sm uppercase tracking-wider">
                <Sun size={18} /> Amanecer con intención
              </h4>
              <p className="text-sm text-stone-600 mb-1">Al despertar: Respiraciones profundas. Contacto con el entorno. Una mano en el pecho.</p>
              <p className="text-sm text-stone-600">Preguntate suavemente: <span className="font-bold text-[#0099D1]">¿Qué necesita hoy mi energía?</span></p>
           </section>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <section>
              <h4 className="flex items-center gap-2 font-bold text-[#0099D1] mb-3 text-sm uppercase tracking-wider">
                <Compass size={18} /> Caminata de dirección
              </h4>
              <p className="text-sm text-stone-600 mb-3">Caminá en silencio. Imaginá que cada paso es una decisión.</p>
              <div className="bg-sky-50 p-4 rounded-lg">
                 <p className="text-xs font-bold text-[#0099D1] uppercase mb-2">Preguntas guía:</p>
                 <ul className="text-sm italic text-[#0099D1] space-y-2 font-serif">
                    <li>¿Qué quiero seguir alimentando en mi vida?</li>
                    <li>¿Qué ya cumplió su ciclo?</li>
                    <li>¿Qué estoy listo/a para elegir distinto?</li>
                 </ul>
              </div>
              <p className="text-[10px] text-stone-400 mt-2 uppercase tracking-wide">No busques respuestas mentales. Dejá que el cuerpo responda primero.</p>
            </section>

            <section>
               <h4 className="flex items-center gap-2 font-bold text-[#0099D1] mb-3 text-sm uppercase tracking-wider">
                <Smile size={18} /> Integración corporal
              </h4>
              <p className="text-sm text-stone-600 mb-3">
                Elegí una práctica que te ayude a encarnar lo elegido: Movimiento consciente. Yoga suave. Respiración profunda. Quietud.
              </p>
              <p className="text-xs italic text-stone-500 mb-4">Sentí cómo se acomoda la energía cuando hay claridad.</p>
              <div className="space-y-2">
                 <MediaButton type="spotify" title="Crear tu realidad / Soltar" link="https://insighttimer.com/es/sacredalquimia/meditacion-guiada/soltar_1" color={BRAND.blue} />
                 <MediaButton type="video" title="Yoga para el Tercer Chakra" link="https://www.youtube.com/watch?v=1uZIN6NWXCU" color={BRAND.blue} />
              </div>
            </section>
          </div>

          <section className="bg-white shadow-md rounded-xl p-6 border border-stone-100">
              <h4 className="flex items-center gap-2 font-bold text-[#0099D1] mb-4 text-sm uppercase tracking-wider">
                <PenTool size={18} /> Escritura de elección
              </h4>
              <p className="text-sm text-stone-600 mb-4">Escribí con honestidad:</p>
              <div className="space-y-4">
                {[1, 2, 3].map(n => (
                   <div key={n} className="flex gap-3 items-center border-b border-stone-50 pb-2">
                      <span className="font-serif text-2xl text-stone-200">{n}</span>
                      <span className="text-sm text-stone-600">
                        {n === 1 ? 'Tres cosas que elijo sostener.' : n === 2 ? 'Tres cosas que elijo soltar.' : 'Un compromiso concreto conmigo.'}
                      </span>
                   </div>
                ))}
              </div>
              <p className="text-xs text-center mt-4 text-[#0099D1] font-bold uppercase tracking-widest">Que sea posible · Que sea amoroso</p>
          </section>

          <div className="text-center mt-6 bg-stone-50 p-4 rounded-lg">
             <h4 className="font-bold text-stone-400 text-xs uppercase mb-2">Cierre del día</h4>
             <p className="text-sm text-stone-600 mb-2">Al anochecer: Agradecé las decisiones tomadas. Soltá la necesidad de control.</p>
             <p className="text-lg font-serif text-[#0099D1] italic">
                 "Elegir también es confiar."
             </p>
          </div>
        </DayCard>

        {/* DÍA 5 */}
        <DayCard
          dayNumber="05"
          title="INTEGRAR"
          subtitle="HONRAR · REGRESAR"
          icon={Star}
          color={BRAND.magenta}
          image={IMAGES.day5}
          isOpen={isDayOpen(5)}
          onClick={() => toggleSection(5)}
        >
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 text-center mb-8">
              <h4 className="font-bold text-[#9D005E] uppercase tracking-wider text-xs mb-3">Intención del día</h4>
              <div className="text-sm text-stone-600 mb-4 space-y-1 text-left inline-block">
                  <p>• Cerrar el proceso con presencia.</p>
                  <p>• Reconocer lo vivido.</p>
                  <p>• Elegir qué se lleva uno de regreso a la vida cotidiana.</p>
                  <p>• No volver igual, pero tampoco forzar un “nuevo yo”.</p>
              </div>
              <p className="text-lg font-serif italic text-stone-800">
                "Hoy no se busca transformación. Hoy se integra."
              </p>
          </div>

          <div className="relative border-l border-[#9D005E]/20 ml-4 space-y-8 pl-8 py-2">
              
              <div className="relative">
                  <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-white border-4 border-[#9D005E]"></span>
                  <h4 className="font-bold text-[#9D005E] text-sm uppercase mb-2">MAÑANA Despertar en gratitud</h4>
                  <p className="text-sm font-bold text-stone-700">Ritual simple de inicio</p>
                  <p className="text-sm text-stone-600">Antes de levantarte: Apoyá una mano en el pecho y otra en el abdomen. Tres respiraciones lentas.</p>
                  <p className="text-sm text-stone-600">Decí en voz baja o internamente:</p>
                  <p className="text-lg font-serif italic text-[#9D005E] my-2">“Honro lo vivido. Me preparo para regresar.”</p>
                  
                  <p className="text-sm font-bold text-stone-700 mt-4">Movimiento consciente suave (10-15 min)</p>
                  <p className="text-sm text-stone-600">Estiramientos lentos. Movilidad de columna. Posturas simples, sin exigencia.</p>
                  <p className="text-xs text-stone-500 italic mt-1">La consigna es habitar el cuerpo, no trabajarlo.</p>
                  
                  <div className="mt-4 space-y-2">
                    <MediaButton type="spotify" title="Gratitud: Despertar la conciencia" link="https://soundcloud.com/haciaelser/meditacion-gratitud-despertar-la-conciencia-a-traves-del-agradecimiento" color={BRAND.magenta} />
                    <MediaButton type="video" title="Estiramientos y Movilidad" link="https://www.youtube.com/watch?v=KCbu5Bb23HI" color={BRAND.magenta} />
                  </div>
              </div>

               <div className="relative">
                  <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-white border-4 border-[#9D005E]"></span>
                  <h4 className="font-bold text-[#9D005E] text-sm uppercase mb-2">ESCRITURA Lo que se acomoda</h4>
                  <p className="text-sm text-stone-600 mb-2">Buscá un lugar tranquilo y escribí sin pensar demasiado:</p>
                  <div className="bg-stone-50 p-4 rounded-lg text-sm text-stone-600 italic">
                      <p>¿Qué parte de mí se expresó con más verdad estos días?</p>
                      <p>¿Qué necesito cuidar más al volver?</p>
                      <p>¿Qué no quiero volver a hacer como antes?</p>
                  </div>
                  <p className="text-xs text-[#9D005E] font-bold mt-2 uppercase">No busques respuestas lindas. Buscá respuestas honestas.</p>
              </div>

               <div className="relative">
                  <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-white border-4 border-[#9D005E]"></span>
                  <h4 className="font-bold text-[#9D005E] text-sm uppercase mb-2">CAMINATA DE CIERRE Volver con conciencia</h4>
                  <p className="text-sm text-stone-600 mb-2">
                    Salí a caminar en silencio. Si podés, descalzo un tramo.
                  </p>
                  <p className="text-sm text-stone-600 mb-2">
                    Durante la caminata: Observá cómo mirás ahora el entorno. Sentí el ritmo de tu paso. Registrá si algo se acomodó sin esfuerzo.
                  </p>
                  <p className="text-sm text-stone-600 mb-2">
                    Al finalizar, recogé un pequeño elemento natural (piedra, hoja, rama).
                  </p>
                  <p className="text-sm font-serif italic text-[#9D005E]">
                    Será tu ancla de este proceso.
                  </p>
              </div>

               <div className="relative">
                  <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-white border-4 border-[#9D005E]"></span>
                  <h4 className="font-bold text-[#9D005E] text-sm uppercase mb-2">RITUAL DE INTEGRACIÓN</h4>
                  <p className="text-sm text-stone-600 mb-2">En un espacio tranquilo:</p>
                  <ol className="list-decimal pl-4 text-sm text-stone-600 space-y-1 mb-3">
                     <li>Tomá el objeto que elegiste</li>
                     <li>Recordá brevemente cada día vivido</li>
                     <li>Decí (o escribí): <span className="font-serif italic text-[#9D005E]">"Esto no termina aquí. Esto me acompaña."</span></li>
                  </ol>
                  <p className="text-sm text-stone-600">Guardá el objeto en un lugar especial o llevalo con vos un tiempo, si tenes un altar en tu hogar podes ponerlo alli,,,</p>
              </div>

          </div>

          <div className="bg-[#9D005E] text-white p-8 -mx-6 -mb-8 mt-8 text-center">
              <h4 className="font-serif text-xl mb-2">CIERRE Regresar distinto, no separado</h4>
              <p className="text-sm opacity-90 mb-3">Antes de dormir o antes de partir:</p>
              <ul className="text-sm opacity-90 list-none space-y-1 mb-4">
                  <li>• Agradecé al lugar</li>
                  <li>• Agradecé al cuerpo</li>
                  <li>• Agradecé el silencio</li>
              </ul>
              <p className="text-sm opacity-90 italic mb-2">No hace falta prometer nada.</p>
              <p className="font-serif text-lg">Con recordar alcanza.</p>
          </div>
        </DayCard>

        {/* --- TARJETA FINAL "PARA LLEVARTE" --- */}
        <div className="bg-[#005333] rounded-2xl mt-20 mb-20 relative overflow-hidden text-center break-inside-avoid shadow-2xl print:shadow-none print:border print:border-stone-200 print:bg-white" style={{ pageBreakBefore: 'always' }}>
          <PortalBackground color={BRAND.gold} />
          {/* Glow orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A8971C]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto px-8 py-16 md:py-24">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Heart size={28} className="text-[#A8971C]" strokeWidth={1.5} />
            </div>

            <p className="rv-section-title text-[#A8971C]/60 mb-4">Cierre del viaje</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 print:text-[#005333]">Para llevarte</h2>

            <div className="text-white/70 text-base md:text-lg leading-relaxed font-sans mb-10 max-w-md mx-auto">
              <p className="mb-3">No hace falta tener todo resuelto.</p>
              <p>A veces alcanza con elegir un poco mejor.</p>
            </div>

            <div className="w-12 h-px bg-[#A8971C]/40 mx-auto mb-10"></div>

            <div className="space-y-3 mb-12">
              <p className="font-serif text-2xl md:text-3xl italic text-[#A8971C] leading-tight">
                Este es un camino de Vida.
              </p>
              <p className="font-serif text-2xl md:text-3xl italic text-white/60 leading-tight">
                Sos creador/a de tu realidad.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Star size={12} className="text-[#A8971C]" fill="#A8971C" />
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#A8971C]">
                El portal queda abierto en vos
              </p>
              <Star size={12} className="text-[#A8971C]" fill="#A8971C" />
            </div>
          </div>
        </div>

        {/* --- MAPA DEL LUGAR --- */}
        <div className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 mt-8 mb-24 relative overflow-hidden break-inside-avoid border border-stone-100 print:shadow-none print:border print:border-stone-200" style={{ pageBreakBefore: 'always' }}>
          <div className="h-1 bg-gradient-to-r from-[#005333] via-[#A8971C] to-[#AA3E11]"></div>
          <div className="p-8 md:p-12 text-center">
            <p className="rv-section-title text-[#005333]/40 mb-2">Orientación</p>
            <h2 className="font-serif text-3xl text-[#005333] mb-8 tracking-wide">Mapa del Lugar</h2>

            <div className="relative group cursor-zoom-in max-w-4xl mx-auto rounded-xl overflow-hidden border border-stone-100 shadow-md" onClick={() => window.open('/uploads/mapa_magico.webp', '_blank')}>
              <img
                src="/uploads/mapa_magico.webp"
                alt="Mapa de Mágico Ensueño"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/15 rounded-xl">
                <span className="bg-white/90 text-[#005333] px-5 py-2.5 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm flex items-center gap-2">
                  <Sparkles size={15} /> Ver ampliado
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="/uploads/mapa_magico.webp"
                download="Mapa_Magico_Ensueno.webp"
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#005333] text-white rounded-full hover:bg-[#003d26] transition-colors text-xs font-bold uppercase tracking-widest shadow-lg"
              >
                <Download size={16} /> Descargar Mapa
              </a>
            </div>
          </div>
        </div>

      </main>
      
      {/* Footer eliminado como se solicitó */}
      {/* <div className="h-10"></div> Eliminado para evitar hoja en blanco al final */}

      {/* BOTÓN FLOTANTE DE INSTALACIÓN (Solo si no está instalada) */}
      {!isStandalone && (
        <button
          onClick={handleInstall}
          className="fixed bottom-6 right-6 z-50 bg-[#AA3E11] text-white p-4 rounded-full shadow-2xl hover:bg-[#8a330e] transition-all duration-300 hover:scale-110 no-print flex items-center gap-2 group border-2 border-white/20"
          style={{ boxShadow: '0 4px 20px rgba(170, 62, 17, 0.4)' }}
        >
          <Download size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-bold pl-0 group-hover:pl-2">
            {deferredPrompt ? 'Instalar App' : 'Descargar'}
          </span>
        </button>
      )}
        </div>
        
        {/* Footer */}
        <Footer />
        
        {/* Diego Epelman Credit */}
        <div className="bg-stone-800 text-stone-400 text-center text-xs py-3">
          Diseñado por Diego Epelman
        </div>
      </>
    </LanguageProvider>
  );
}