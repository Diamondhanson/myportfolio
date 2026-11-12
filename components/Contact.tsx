'use client';

import { useEffect, useState } from 'react';
import { site } from '@/content/site';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

/**
 * The address is assembled in the browser from two halves, so the complete
 * string never appears in the served HTML for a scraper to lift. It is a
 * speed bump rather than a lock, which is the honest level of protection to
 * claim, but it filters the lazy majority.
 */
function useEmail() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    setEmail(`${site.email.user}@${site.email.domain}`);
  }, []);
  return email;
}

export function Contact() {
  const email = useEmail();

  return (
    <section className="section contactSection" id="contact">
      <div className="shell">
        <SectionHead num="04" title="Get in touch" />

        <div className="contact">
          <Reveal className="contactLead">
            <p className="contactBig">
              Open to remote roles and contract work.
              <span className="contactBigMuted">
                {' '}
                Fullstack, front end, or anything where the correctness matters.
              </span>
            </p>
            <p className="prose">
              The fastest way to reach me is email. I reply to everything that is not
              a template.
            </p>
          </Reveal>

          <Reveal className="contactGrid" delay={120}>
            <a
              className="contactCard contactCard--primary"
              href={email ? `mailto:${email}` : undefined}
              aria-disabled={email ? undefined : true}
            >
              <span className="label">Email</span>
              <span className="contactValue">{email ?? 'Loading address…'}</span>
              <span className="contactArrow" aria-hidden>
                ↗
              </span>
            </a>

            <a className="contactCard" href={`tel:${site.phone.dial}`}>
              <span className="label">Phone and WhatsApp</span>
              <span className="contactValue">{site.phone.display}</span>
              <span className="contactArrow" aria-hidden>
                ↗
              </span>
            </a>

            <a
              className="contactCard"
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="label">LinkedIn</span>
              <span className="contactValue">bambot-hanson-ngongmun</span>
              <span className="contactArrow" aria-hidden>
                ↗
              </span>
            </a>

            <a
              className="contactCard"
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="label">GitHub</span>
              <span className="contactValue">Diamondhanson</span>
              <span className="contactArrow" aria-hidden>
                ↗
              </span>
            </a>

            <a className="contactCard contactCard--wide" href={site.links.cv} download>
              <span className="label">Curriculum vitae</span>
              <span className="contactValue">Download PDF, one page</span>
              <span className="contactArrow" aria-hidden>
                ↓
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
