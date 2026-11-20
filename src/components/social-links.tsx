'use client';

import { withBasePath } from '@/lib/paths';


import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/lib/site-config';

export function SocialLinks() {
  const [toast, setToast] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const showToast = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast(`${name} link is coming soon.`);
    timeoutRef.current = setTimeout(() => setToast(''), 3500);
  };

  return (
    <>
      <div className="social-links" aria-label="Social media" id="social-links">
        {siteConfig.socials.map((social) => {
          const url = social.url || (social.name === 'Email' && siteConfig.email ? `mailto:${siteConfig.email}` : '');
          const contents = <><img src={withBasePath(`/assets/${social.icon}`)} alt="" width={24} height={24} /><span className="social-tooltip" aria-hidden="true">{url ? social.name : `${social.name} · coming soon`}</span></>;
          return url ? (
            <a key={social.name} className="social-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>{contents}</a>
          ) : (
            <button key={social.name} type="button" className="social-link" aria-label={`${social.name} — link coming soon`} onClick={() => showToast(social.name)}>{contents}</button>
          );
        })}
      </div>
      <div id="toast" className={`toast${toast ? ' is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
