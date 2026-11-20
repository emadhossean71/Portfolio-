import { withBasePath } from '@/lib/paths';
import Link from "next/link";
import type { Metadata } from 'next';
import Image from 'next/image';
import { DownloadIcon } from '@/components/icons';
import { cvPages } from '@/lib/cv-pages';

export const metadata: Metadata = {
  title: 'Emad — Curriculum Vitae',
  description: 'View Emad’s curriculum vitae and download the original PDF.',
};

export default function CVPage() {
  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-[900px] py-6 sm:py-10" aria-labelledby="cv-title">
      <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-muted/20 pb-6" aria-label="CV navigation">
        <a href={withBasePath('/')} className="inline-flex min-h-11 items-center rounded-lg px-2 text-base text-soft transition-colors hover:text-accent">Back to portfolio</a>
        
        <a href={withBasePath('/Emad_Aghahosseini_CV.pdf')} download className="button button-primary min-h-11 gap-3 px-5 text-base">
          <span>Download PDF</span><DownloadIcon className="size-5 shrink-0" />
        </a>
      </nav>
      <header className="py-8 sm:py-10">
        <p className="eyebrow">EMAD</p>
        <h1 id="cv-title" className="mt-4 text-3xl font-black text-paper sm:text-4xl">Curriculum <span className="text-accent">Vitae</span></h1>
        <p className="mt-4 text-base leading-relaxed text-muted">Read the {cvPages.length}-page CV below, or download the original PDF.</p>
      </header>
      <section className="grid gap-8" aria-label="CV pages">
        {cvPages.map((page) => (
          <figure key={page.page} className="min-w-0">
            <Image src={withBasePath(page.src)} width={page.width} height={page.height} alt={`Emad Aghahosseini’s CV, page ${page.page} of ${cvPages.length}. Use Download PDF to read the original document.`} sizes="(max-width: 932px) calc(100vw - 32px), 900px" priority={page.page === 1} className="h-auto w-full rounded-lg bg-white shadow-xl" />
            <figcaption className="mt-3 text-center text-sm text-muted">Page {page.page} of {cvPages.length}</figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}
