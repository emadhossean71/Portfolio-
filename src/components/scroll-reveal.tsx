'use client';

import { useEffect, useRef, useState, type HTMLAttributes } from 'react';

interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'footer';
}

/** Server-rendered content stays visible without JavaScript or reduced motion. */
export function ScrollReveal({ as: Tag = 'section', className = '', children, ...props }: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<'idle' | 'pending' | 'revealed'>('idle');

  useEffect(() => {
    const element = elementRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || motion.matches || !('IntersectionObserver' in window)) return;
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 48 && rect.bottom > 0) return;

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setPhase('revealed');
      observer.disconnect();
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) reveal();
    }, { rootMargin: '0px 0px -48px 0px', threshold: 0 });

    const onAnchor = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (anchor && anchor.hash.slice(1) === element.id) reveal();
    };
    const onMotionChange = (event: MediaQueryListEvent) => { if (event.matches) reveal(); };
    setPhase('pending');
    observer.observe(element);
    document.addEventListener('click', onAnchor);
    element.addEventListener('focusin', reveal);
    motion.addEventListener('change', onMotionChange);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', onAnchor);
      element.removeEventListener('focusin', reveal);
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  const animationClass = phase === 'idle' ? '' : phase === 'pending' ? ' scroll-reveal' : ' scroll-reveal is-revealed';
  return <Tag ref={elementRef} {...props} className={`${className}${animationClass}`}>{children}</Tag>;
}
