'use client';

import { createContext, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type FormEvent, type MouseEvent, type ReactNode } from 'react';
import { siteConfig } from '@/lib/site-config';
import { CloseIcon } from './icons';

const ContactContext = createContext<((trigger: HTMLButtonElement) => void) | null>(null);

export function ContactButton({ children, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const openContact = useContext(ContactContext);
  if (!openContact) throw new Error('ContactButton requires ContactProvider.');
  return <button {...props} type="button" onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) openContact(event.currentTarget); }}>{children}</button>;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const previousOverflow = useRef('');
  const [status, setStatus] = useState('');
  const hasEmail = Boolean(siteConfig.email);

  useEffect(() => () => {
    if (dialogRef.current?.open) document.body.style.overflow = previousOverflow.current;
  }, []);

  const openContact = (trigger: HTMLButtonElement) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    triggerRef.current = trigger;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setStatus('');
    dialog.showModal();
  };
  const onClose = () => {
    document.body.style.overflow = previousOverflow.current;
    triggerRef.current?.focus({ preventScroll: true });
  };
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (!name || !message) { setStatus('Please enter your name and message.'); return; }
    const subject = `Research / collaboration — ${name}`;
    const body = `${message}\n\nFrom: ${name}\nEmail: ${email}`;
    if (hasEmail) {
      window.location.href = `mailto:${encodeURIComponent(siteConfig.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('Your email draft is ready to review.');
      return;
    }
    const blob = new Blob([`To: ${siteConfig.name}\nSubject: ${subject}\n\n${body}\n`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const download = document.createElement('a');
    download.href = url;
    download.download = 'message-for-emad.txt';
    download.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Your message has been saved. Nothing has been sent.');
  };

  return (
    <ContactContext.Provider value={openContact}>
      {children}
      <dialog ref={dialogRef} id="contact-dialog" className="contact-dialog" aria-labelledby="contact-title" aria-describedby="contact-description" onClick={onBackdropClick} onClose={onClose}>
        <div className="contact-inner">
          <button type="button" className="dialog-close" aria-label="Close contact form" onClick={() => dialogRef.current?.close()}><CloseIcon className="size-6" /></button>
          <p className="eyebrow">LET’S CONNECT</p>
          <h2 id="contact-title" className="mt-4 text-3xl font-black text-accent">Let’s work together.</h2>
          <p id="contact-description" className="mt-4 text-base leading-relaxed text-muted">Have a research idea or a project in mind? Write a message below.</p>
          <form id="contact-form" className="mt-7 grid gap-5" onSubmit={onSubmit}>
            <div><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder="Your name" /></div>
            <div><label htmlFor="contact-email">Your email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></div>
            <div><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" rows={4} required maxLength={5000} placeholder="Tell me a little about your idea…" /></div>
            <p id="contact-note" className="text-sm leading-relaxed text-muted">{hasEmail ? 'This opens a draft in your email app for you to review and send.' : 'Contact details are coming soon. You can save your message as a text file.'}</p>
            <button type="submit" className="button button-primary w-full" id="contact-submit">{hasEmail ? 'Open email draft' : 'Save message'} <span aria-hidden="true">↗</span></button>
            <p id="contact-status" className="text-sm text-accent" role="status" aria-live="polite">{status}</p>
          </form>
        </div>
      </dialog>
    </ContactContext.Provider>
  );
}
