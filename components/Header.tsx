import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../src/routes';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const isHomePage = location.pathname === ROUTES.HOME;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll effect for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Active Section Highlighting
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const idsToObserve = new Set<string>();
    t.menu.items.forEach((item: any) => {
      if (item.href.startsWith('#')) idsToObserve.add(item.href.substring(1));
      item.submenu?.forEach((sub: any) => {
        if (sub.href.startsWith('#')) idsToObserve.add(sub.href.substring(1));
      });
    });
    idsToObserve.add('contacto');

    idsToObserve.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [t.menu.items, isHomePage]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, hasSubmenu: boolean, index: number) => {
    // Mobile: Toggle submenu if it exists
    if (isMobile && hasSubmenu) {
      e.preventDefault();
      setActiveSubmenu(activeSubmenu === index ? null : index);
      return;
    }

    // Navigation logic
    if (href.startsWith('#')) {
      if (isHomePage) {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        
        if (element) {
          setIsMobileMenuOpen(false);
          // Offset by ~80px to avoid the fixed header covering the section title.
          // Use scrollTo with behavior:'smooth' when supported (Safari 15.4+);
          // fall back to an instant jump on older browsers.
          const headerOffset = 80;
          const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({ top, behavior: 'smooth' });
          } else {
            window.scrollTo(0, top);
          }
          window.history.pushState(null, '', href);
        }
      } else {
        // On a sub-landing, we let the link navigate to /#section
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  // Helper to check if link is active
  const isLinkActive = (href: string) => {
    if (!href.startsWith('#')) return location.pathname === href;
    return isHomePage && activeSection === href.substring(1);
  };

  // Dynamic Classes
  // iOS Safari bug: transform on position:fixed makes the element scroll with the page.
  // Fix: center with left-0/right-0/mx-auto instead of left-1/2/-translate-x-1/2.
  // Also scope transition properties explicitly — transition-all includes transform,
  // which can trigger the same WebKit compositing bug.
  const pillClasses = `
    fixed left-0 right-0 mx-auto z-[1000]
    transition-[background-color,box-shadow,border-radius,top,width,max-width,padding] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
    flex items-center justify-between
    ${
      isScrolled || isMobileMenuOpen
        ? 'top-[10px] w-[96%] max-w-[98%] bg-white text-dark shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-[12px] py-2 px-5'
        : 'top-[30px] w-[94%] max-w-[1400px] bg-transparent text-white border-none rounded-[50px] py-2.5'
    }
    lg:py-2.5
  `;

  const logoClasses = `
    block w-auto transition-all duration-300
    ${isScrolled || isMobileMenuOpen ? 'h-[40px] md:h-[48px] filter-none' : 'h-[52px] md:h-[65px] brightness-0 invert'}
  `;

  return (
    <header className={pillClasses}>
      <div className="flex justify-between items-center w-full lg:px-4 px-2">
        {/* Logo - Left */}
        <div className="flex-1 lg:flex-none">
          <a href={ROUTES.HOME} className="relative z-[1200] inline-block" onClick={(e) => { 
            if (isHomePage) {
              e.preventDefault(); 
              window.scrollTo({top: 0, behavior: 'smooth'}); 
            }
          }}>
            <img
              src="/uploads/logo negro.svg"
              alt="Pueblo Mágico"
              width="65"
              height="65"
              className={logoClasses}
            />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden relative z-[1200] p-2 focus:outline-none"
          aria-label={t.ui.toggleMenu}
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
            {t.menu.items.map((item: any, index: number) => (
              <li key={index} className="relative group w-full lg:w-auto text-center lg:text-left">
                <a
                  href={item.href.startsWith('#') && !isHomePage ? ROUTES.HOME + item.href : item.href}
                  onClick={(e) => handleNavClick(e, item.href, !!item.submenu, index)}
                  className={`
                    flex items-center justify-center lg:justify-start gap-1.5 py-3.5 lg:py-2.5 
                    text-[16px] lg:text-[13px] font-serif lg:font-sans font-normal lg:font-medium
                    border-b border-black/5 lg:border-none w-full lg:w-auto
                    transition-colors duration-300
                    ${isScrolled || isMobileMenuOpen 
                      ? (isLinkActive(item.href) ? 'text-gold font-bold' : 'text-dark hover:text-brand') 
                      : (isLinkActive(item.href) ? 'text-gold' : 'text-white hover:text-gold')}
                    ${isMobile && !isLinkActive(item.href) ? 'text-[#444]' : ''}
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
                    {item.submenu.map((sub: any, subIndex: number) => (
                      <li key={subIndex}>
                        <a
                          href={sub.href.startsWith('#') && !isHomePage ? ROUTES.HOME + sub.href : sub.href}
                          onClick={(e) => handleNavClick(e, sub.href, false, index)}
                          className={`
                            block py-2.5 px-5 text-[14px] lg:text-[12px] transition-all text-center lg:text-left
                            ${isLinkActive(sub.href) ? 'text-gold font-bold bg-[#F9F9F9]' : 'text-[#777] lg:text-[#666] hover:text-brand hover:bg-[#F9F9F9] lg:hover:pl-6'}
                          `}
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
               <a 
                 href={t.menu.bookLink} 
                 target="_blank"
                 rel="noopener noreferrer"
                 onClick={(e) => handleNavClick(e, t.menu.bookLink, false, -1)}
                 className={`text-xs font-bold px-5 py-2 rounded-full transition-all shadow-lg ${isScrolled ? 'bg-brand text-white hover:bg-gold' : 'bg-white text-brand hover:bg-gold hover:text-white'}`}
               >
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