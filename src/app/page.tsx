import { ContactProvider } from '@/components/contact';
import { AboutSection, HeroSection, ResearchSection, SiteFooter, SkillsSection } from '@/components/sections';
import { SiteHeader } from '@/components/site-header';
import { SocialLinks } from '@/components/social-links';

export default function HomePage() {
  return (
    <ContactProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <SocialLinks />
        <SkillsSection />
        <ResearchSection />
        <AboutSection />
      </main>
      <SiteFooter />
    </ContactProvider>
  );
}
