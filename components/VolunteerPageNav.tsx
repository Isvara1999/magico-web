import React, { useEffect, useRef, useState } from 'react';
import { Sprout } from 'lucide-react';

type NavigationItem = {
  id: string;
  label: string;
};

type VolunteerPageNavProps = {
  navigation: {
    ariaLabel: string;
    pageEyebrow: string;
    pageTitle: string;
    parent: string;
    sections: NavigationItem[];
  };
};

const formatIndex = (value: number) => String(value).padStart(2, '0');

export const VolunteerPageNav: React.FC<VolunteerPageNavProps> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const programmaticTargetRef = useRef<number | null>(null);
  const scrollEndTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const updateActiveSection = () => {
      if (programmaticTargetRef.current !== null) {
        setActiveIndex(programmaticTargetRef.current);
        return;
      }

      const header = document.querySelector('header');
      const marker = (header?.getBoundingClientRect().bottom || 0) + 48;
      let nextIndex = 0;

      navigation.sections.forEach((item, index) => {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= marker) {
          nextIndex = index;
        }
      });

      setActiveIndex(nextIndex);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      if (scrollEndTimeoutRef.current !== null) {
        window.clearTimeout(scrollEndTimeoutRef.current);
      }
    };
  }, [navigation.sections]);

  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeIndex]);

  const progress = navigation.sections.length > 0
    ? ((activeIndex + 1) / navigation.sections.length) * 100
    : 0;

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>, item: NavigationItem) => {
    event.preventDefault();
    const section = document.getElementById(item.id);
    if (!section) return;

    const itemIndex = navigation.sections.findIndex(sectionItem => sectionItem.id === item.id);
    if (itemIndex >= 0) {
      programmaticTargetRef.current = itemIndex;
      setActiveIndex(itemIndex);
    }

    const targetTop = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });

    if (scrollEndTimeoutRef.current !== null) {
      window.clearTimeout(scrollEndTimeoutRef.current);
    }
    scrollEndTimeoutRef.current = window.setTimeout(() => {
      const settledTop = window.scrollY + section.getBoundingClientRect().top;
      window.scrollTo({ top: Math.max(0, settledTop), behavior: 'instant' as ScrollBehavior });
      programmaticTargetRef.current = null;
      scrollEndTimeoutRef.current = null;
    }, 700);
    window.history.replaceState(null, '', `#${item.id}`);
  };

  const handleHorizontalWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    event.preventDefault();
    container.scrollBy({ left: event.deltaY, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-w-0 max-w-full">
      <nav
        aria-label={navigation.ariaLabel}
        className="w-full min-w-0 max-w-full overflow-hidden"
      >
        <div className="flex min-h-[50px] w-full min-w-0 max-w-full items-stretch lg:min-h-[56px]">
          <div className="relative flex shrink-0 items-center gap-3 px-3 md:px-5 lg:min-w-[185px] after:absolute after:inset-y-2.5 after:right-0 after:w-px after:bg-brand/10">
            <Sprout className="text-brand" size={23} strokeWidth={1.7} aria-hidden="true" />
            <div className="hidden sm:block">
              <p className="mb-0.5 text-[8px] font-bold uppercase leading-none tracking-[0.15em] text-dark/45">{navigation.pageEyebrow}</p>
              <p className="font-serif text-base leading-none text-dark">{navigation.pageTitle}</p>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="min-w-0 flex-1 touch-pan-x overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onWheel={handleHorizontalWheel}
            tabIndex={0}
          >
            <div className="flex h-full min-w-max items-stretch px-2 md:px-2.5">
              {navigation.sections.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <a
                    key={item.id}
                    ref={element => { tabRefs.current[index] = element; }}
                    href={`#${item.id}`}
                    onClick={event => handleNavigation(event, item)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center whitespace-nowrap px-2.5 text-[11px] transition-colors md:px-3 md:text-xs ${isActive ? 'font-medium text-brand' : 'text-dark/65 hover:text-brand'}`}
                  >
                    <span className={`rounded-lg px-2 py-2 transition-[background-color,color] duration-300 ease-out ${isActive ? 'bg-[#F5F0E4]' : 'bg-transparent'}`}>
                      <span className={`relative after:absolute after:-bottom-3 after:inset-x-0 after:h-0.5 after:origin-center after:rounded-full after:bg-gold after:transition-transform after:duration-300 after:ease-out ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'}`}>
                        {item.label}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="hidden w-[92px] shrink-0 flex-col justify-center border-l border-brand/10 px-4 xl:flex">
            <p className="mb-1 text-center text-[10px] leading-none tracking-[0.1em] text-dark/55">
              {formatIndex(activeIndex + 1)} <span className="text-dark/25">/</span> {formatIndex(navigation.sections.length)}
            </p>
            <div className="h-0.5 overflow-hidden rounded-full bg-brand/10">
              <div className="h-full rounded-full bg-gold transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
};
