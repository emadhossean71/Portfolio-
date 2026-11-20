import { withBasePath } from '@/lib/paths';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Emad — Quantum Error Correction',
  description: 'Emad — physicist working on quantum error correction, scientific Python, and reinforcement-learning-based quantum decoders.',
  icons: { icon: { url: withBasePath('/assets/favicon.svg'), type: 'image/svg+xml' } },
};

export const viewport: Viewport = { themeColor: '#0b1324' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="preload" as="image" href={withBasePath('/assets/emad-portrait.jpg')} /></head>
      <body className="bg-midnight font-sans text-paper antialiased">{children}</body>
    </html>
  );
}
