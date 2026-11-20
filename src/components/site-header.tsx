'use client';

import { withBasePath } from '@/lib/paths';


import { useEffect, useRef, useState } from 'react';
import { navigation, siteConfig } from '@/lib/site-config';
import type { SectionId } from '@/types/portfolio';
import { DownloadIcon } from './icons';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || toggleRef.current?.getAttribute('aria-expanded') !== 'true') return;
      setMenuOpen(false);
      toggleRef.current.focus();
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = () => setMenuOpen(false);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, []);

  useEffect(() => {
    let frame: number | null = null;
    const updateActiveSection = () => {
      const position = window.scrollY + Math.min(window.innerHeight * 0.35, 300);
      let current: SectionId = 'home';
      for (const item of navigation) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= position) current = item.id;
      }
      setActiveSection(current);
      frame = null;
    };
    const queueUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateActiveSection);
    };
    updateActiveSection();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate, { passive: true });
    document.addEventListener('toggle', queueUpdate, true);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      document.removeEventListener('toggle', queueUpdate, true);
    };
  }, []);

  return (
    <header className="site-header">
      <nav ref={navRef} className="nav-shell" aria-label="Main navigation">
        <a href="#home" className="logo-link" aria-label="Emad — home" onClick={() => setMenuOpen(false)}>
          <img src={withBasePath('/assets/emad-logo.svg')} width={114} height={28} alt="Emad" />
        </a>
        <div id="main-menu" className={`nav-links${menuOpen ? ' is-open' : ''}`}>
          {navigation.map((item) => (
            <a key={item.id} className={`nav-link${activeSection === item.id ? ' is-active' : ''}`} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
        <a className="button button-outline nav-cv" href={siteConfig.cvUrl}>
          <span>Get my CV</span><DownloadIcon className="button-icon" />
        </a>
        <button ref={toggleRef} id="menu-toggle" type="button" className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-menu" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
}
