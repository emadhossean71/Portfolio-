import { withBasePath } from '@/lib/paths';
export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-content-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-black text-accent">Page not found</h1>
      <p className="text-base text-soft">The page you’re looking for doesn’t exist.</p>
      <a className="button button-outline mx-auto" href={withBasePath('/')}>Back to Emad’s portfolio</a>
    </main>
  );
}
