export type SectionId = 'home' | 'skills' | 'experience' | 'about';

export interface NavigationItem {
  id: SectionId;
  label: string;
}

export type Skill = readonly [title: string, description: string];

export interface ResearchItem {
  title: string;
  description: string;
  lead: boolean;
}

export interface ResearchStatistic {
  label: string;
  value: string;
  description: string;
  comparison?: string;
}

export interface SocialProfile {
  name: 'Instagram' | 'Email' | 'LinkedIn' | 'GitHub' | 'WhatsApp';
  icon: string;
  url: string;
}

export interface SiteConfiguration {
  name: string;
  email: string;
  cvUrl: string;
  socials: readonly SocialProfile[];
}
