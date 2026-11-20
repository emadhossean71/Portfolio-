import { withBasePath } from '@/lib/paths';
import type { NavigationItem, SiteConfiguration } from '@/types/portfolio';

/** Contact details and profile URLs supplied by the owner. */
export const siteConfig: SiteConfiguration = {
  name: 'Emad',
  email: 'emadhossean71@hotmail.com',
  cvUrl: withBasePath('/cv/'),
  socials: [
    { name: 'Instagram', icon: 'instagram.svg', url: 'https://www.instagram.com/hosseini5823?jplx=MW11ZXkxN2FxaTQ3OQ==' },
    { name: 'Email', icon: 'mail.svg', url: 'mailto:emadhossean71@hotmail.com' },
    { name: 'LinkedIn', icon: 'linkedin.svg', url: 'https://linkedin.com/in/emad-aghahosseini-47780115b' },
    { name: 'GitHub', icon: 'github.svg', url: 'https://github.com/emadhossean71' },
    { name: 'WhatsApp', icon: 'whatsapp.svg', url: 'https://wa.me/989134099243' },
  ],
};

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About Me' },
] as const satisfies readonly NavigationItem[];
