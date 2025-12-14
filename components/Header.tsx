import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      // Locking body scroll could be implemented here if desired
    }
  };

  const toggleSubmenu = (index: number, e: React.MouseEvent) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      setActiveSubmenu(activeSubmenu === index ? null : index);
    }
  };

  // Dynamic Classes
  const pillClasses = `
    fixed left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
    flex items-center justify-between
    ${
      isScrolled || isMobileMenuOpen
        ? 'top-[10px] w-[96%] max-w-[98%] bg-white text-dark shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-[12px] py-2 px-5'
        : 'top-[30px] w-[94%] max-w-[1400px] bg-transparent text-white border-none rounded-[50px] py-2.5'
    }
    lg:py-2.5
  `;

  const logoClasses = `
    block transition-all duration-300
    ${isScrolled || isMobileMenuOpen ? 'h-[28px] filter-none' : 'h-[32px] brightness-0 invert'}
  `;

  return (
    <header className={pillClasses}>
      <div className="flex justify-between items-center w-full lg:px-0 px-2">
        <a href="#" className="relative z-[1200]">
          <img
            src="https://tawaapukuntur.com/wp-content/uploads/2025/10/logotipo-marron-magico.svg"
            alt="Mágico Ensueño"
            className={logoClasses}
          />
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden relative z-[1200] p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-dark" />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-dark' : 'text-white'}`} />
          )}
        </button>

        {/* Navigation */}
        <nav
          className={`
            fixed top-0 left-0 w-full h-screen bg-white pt-[100px] pb-10 px-8
            flex flex-col overflow-y-auto transition-all duration-400 z-[1100]
            lg:static lg:h-auto lg:w-auto lg:bg-transparent lg:p-0 lg:flex-row lg:opacity-100 lg:visible lg:overflow-visible
            ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible'}
          `}
        >
          <ul className="flex flex-col lg:flex-row items-center gap-0 lg:gap-[45px] w-full lg:w-auto">
            {t.menu.items.map((item, index) => (
              <li key={index} className="relative group w-full lg:w-auto text-center lg:text-left">
                <a
                  href={item.href}
                  onClick={(e) => item.submenu && toggleSubmenu(index, e)}
                  className={`
                    flex items-center justify-center lg:justify-start gap-1.5 py-3.5 lg:py-2.5 
                    text-[16px] lg:text-[13px] font-serif lg:font-sans font-normal lg:font-medium
                    border-b border-black/5 lg:border-none w-full lg:w-auto
                    transition-colors duration-300
                    ${isScrolled || isMobileMenuOpen ? 'text-dark hover:text-brand' : 'text-white hover:text-gold'}
                    ${window.innerWidth < 1024 ? 'text-[#444]' : ''}
                  `}
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown 
                      className={`w-3 h-3 transition-transform duration-300 ${activeSubmenu === index ? 'rotate-180' : ''}`} 
                    />
                  )}
                </a>

                {/* Submenu */}
                {item.submenu && (
                  <ul
                    className={`
                      lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-[10px]
                      bg-[#FAFAFA] lg:bg-white lg:min-w-[180px] lg:rounded-sm lg:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                      lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0
                      transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                      w-full lg:w-auto py-1 lg:py-2
                      ${activeSubmenu === index ? 'block animate-fadeIn' : 'hidden lg:block'}
                    `}
                  >
                    {item.submenu.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <a
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2.5 px-5 text-[14px] lg:text-[12px] text-[#777] lg:text-[#666] hover:text-brand hover:bg-[#F9F9F9] lg:hover:pl-6 transition-all text-center lg:text-left"
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            
            {/* Desktop Reservar Button */}
            <li className="hidden lg:block pl-4 border-l border-white/20">
               <a href="#contacto" className={`text-xs font-bold px-5 py-2 rounded-full transition-all shadow-lg ${isScrolled ? 'bg-brand text-white hover:bg-gold' : 'bg-white text-brand hover:bg-gold hover:text-white'}`}>
                  {t.menu.book}
               </a>
            </li>

            {/* Mobile Language Button */}
            <li className="lg:hidden mt-8 w-full flex justify-center pb-10">
              <button
                onClick={toggleLanguage}
                className="border border-brand text-brand hover:bg-brand hover:text-white rounded-[30px] py-2 px-8 text-[12px] font-medium transition-colors uppercase"
              >
                {t.menu.lang}
              </button>
            </li>
          </ul>
        </nav>

        {/* Desktop Language Button */}
        <div className="hidden lg:flex items-center pl-5">
          <button
            onClick={toggleLanguage}
            className={`
              text-[11px] font-medium uppercase border rounded-[20px] py-[5px] px-[18px] transition-all duration-300
              ${
                isScrolled
                  ? 'border-black/15 text-dark hover:bg-brand hover:border-brand hover:text-white'
                  : 'border-white/40 text-white hover:bg-white hover:border-white hover:text-brand'
              }
            `}
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </div>
    </header>
  );
};