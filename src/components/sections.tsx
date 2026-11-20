import { withBasePath } from '@/lib/paths';
import Image from 'next/image';
import { biography, research, skills, statistics } from '@/lib/content';
import { navigation, siteConfig } from '@/lib/site-config';
import type { ResearchItem } from '@/types/portfolio';
import { ContactButton } from './contact';
import { ArrowRightIcon, ChevronIcon, DownloadIcon } from './icons';
import { ScrollReveal } from './scroll-reveal';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  accentTitle: string;
  description: string;
}

function SectionHeading({ id, eyebrow, title, accentTitle, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}><span className="text-muted">{title}</span>{' '}<span className="text-accent">{accentTitle}</span></h2>
      <p className="section-description">{description}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-greeting">Hello, I’m</p>
          <div className="hero-name-wrap">
            <h1 id="hero-title" className="hero-name">{siteConfig.name}</h1>
            <img className="hero-arrow" src={withBasePath('/assets/hero-arrow.svg')} width={148} height={46} alt="" />
          </div>
          <p className="hero-description">I build quantum error-correction tools in Python. My Ankaa‑2 decoder achieved lower error rates than Riverlane’s best published result across all 16 runs.</p>
          <div className="hero-actions">
            <a  href="mailto:emadhossean71@hotmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className=" button button-primary"><span>Let’s Work Together</span><ArrowRightIcon className="button-icon" /></a>
            <a className="button button-outline hero-cv" href={siteConfig.cvUrl}><span>Get my CV</span><DownloadIcon className="button-icon" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <ScrollReveal id="skills" className="skills-section section-container" aria-labelledby="skills-title">
      <SectionHeading id="skills-title" eyebrow="WHAT I DO" title="Core" accentTitle="Skills" description="From raw qubit readouts to statistically validated quantum decoders." />
      <div className="skills-table-wrap">
        <table className="skills-table">
          <caption className="sr-only">Core skills and areas of expertise</caption>
          <thead><tr><th scope="col">Title</th><th scope="col">Description</th></tr></thead>
          <tbody id="skills-body">
            {skills.map(([title, description]) => <tr key={title}><th scope="row">{title}</th><td>{description}</td></tr>)}
          </tbody>
        </table>
      </div>
    </ScrollReveal>
  );
}

function ResearchCard({ item, index }: { item: ResearchItem; index: number }) {
  return (
    <article className={`research-item ${item.lead ? 'research-lead' : 'research-detail'}`} aria-labelledby={`research-title-${index}`}>
      <div className="research-card"><h3 id={`research-title-${index}`}>{item.title}</h3><p>{item.description}</p></div>
      <img className="research-arrow" src={withBasePath('/assets/research-arrow.svg')} alt="" width={65} height={20} />
    </article>
  );
}

export function ResearchSection() {
  const [lead, disclosure, ...milestones] = research;
  return (
    <ScrollReveal id="experience" className="experience-section section-container" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" eyebrow="A FEW THINGS I’VE EXPLORED" title="Research /" accentTitle="Experience" description="Exploring how real quantum hardware behaves and how better decoders can reduce logical errors." />
      <div className="research-list" id="research-list">
        {lead && <ResearchCard item={lead} index={0} />}
        {disclosure && (
          <article className="research-item research-lead research-expandable" aria-labelledby="research-title-1">
            <details className="research-accordion">
              <summary className="research-summary">
                <div className="research-summary-copy"><h3 id="research-title-1">{disclosure.title}</h3><p className="research-summary-meta">{milestones.length} research milestones</p></div>
                <span className="research-toggle-icon" aria-hidden="true"><ChevronIcon /></span>
              </summary>
              <div className="research-accordion-body">
                <p className="research-accordion-intro">{disclosure.description}</p>
                <div className="research-milestones">{milestones.map((item, index) => <ResearchCard key={item.title} item={item} index={index + 2} />)}</div>
              </div>
            </details>
          </article>
        )}
      </div>
    </ScrollReveal>
  );
}

export function AboutSection() {
  return (
    <ScrollReveal id="about" className="about-section section-container" aria-labelledby="about-title">
      <SectionHeading id="about-title" eyebrow="A LITTLE ABOUT ME" title="About" accentTitle="Me" description="I’m a physicist trained in quantum optics. I use real hardware data to understand how qubits fail and build decoders that reduce logical errors." />
      <div className="about-content">
        <Image className="about-portrait" src={withBasePath('/assets/emad-portrait.jpg')} width={390} height={390} sizes="(max-width: 438px) calc(100vw - 48px), 390px" alt="Emad concentrating on handwritten research notes" />
        <div className="about-copy"><p id="biography">{biography}</p></div>
      </div>
      <div className="stats-grid" id="stats-grid" role="list" aria-label="Research results">
        {statistics.map((stat) => {
          const [numerator, denominator] = stat.value.split(' / ');
          return (
            <div key={stat.label} className="stat-card" role="listitem">
              <span className="stat-label">{stat.label}</span>
              <strong className="stat-value">{numerator}{denominator && <span className="stat-denominator"> / {denominator}</span>}</strong>
              <p className="stat-description">{stat.description}</p>
              {stat.comparison && <span className="stat-comparison">{stat.comparison}</span>}
            </div>
          );
        })}
      </div>
    </ScrollReveal>
  );
}

export function SiteFooter() {
  return (
    <ScrollReveal as="footer" className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" aria-label="Emad — home"><img src={withBasePath('/assets/emad-logo.svg')} width={114} height={28} alt="Emad" /></a>
            <p>Quantum error correction, scientific Python, and research grounded in real hardware data.</p>
          </div>
          <div className="footer-contact">
            <p className="eyebrow">LET’S CONNECT</p>
            <h2>Have a research idea?</h2>
            <a  href="mailto:emadhossean71@hotmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="button button-outline footer-button">Let’s talk</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© <span id="footer-year">{new Date().getFullYear()}</span> {siteConfig.name}. All rights reserved.</p>
          <nav className="footer-links" aria-label="Footer navigation">{navigation.filter((item) => item.id !== 'home').map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav>
          <a className="footer-back-top" href="#home">Back to top</a>
        </div>
      </div>
    </ScrollReveal>
  );
}
