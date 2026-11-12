'use client';

import Image from 'next/image';
import { useState } from 'react';
import { liveSites, type LiveSite } from '@/content/sites';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

/**
 * A still by default, the live site on request.
 *
 * Embedding four third-party sites on load would mean four extra page loads
 * before a visitor sees anything, on a connection that may be metered. So each
 * card shows a captured frame and only mounts an iframe when asked. Sites that
 * refuse framing never offer the option, rather than rendering an empty box.
 */
function SiteCard({ site }: { site: LiveSite }) {
  const [live, setLive] = useState(false);

  return (
    <article className="siteCard" style={
        {
          ['--accent' as string]: `var(--pen-${site.pen})`,
          ['--accent-text' as string]: `var(--pen-${site.pen}-text)`,
        } as React.CSSProperties
      }>
      <div className="chrome">
        <span className="chromeDots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="chromeUrl">{site.host}</span>
        {site.embeddable ? (
          <button
            type="button"
            className="chromeAction"
            onClick={() => setLive((v) => !v)}
            aria-pressed={live}
          >
            {live ? 'Show still' : 'Load live'}
          </button>
        ) : (
          <span className="chromeAction chromeAction--off" title="This site sends X-Frame-Options: DENY">
            No embed
          </span>
        )}
      </div>

      <div className="siteViewport">
        {live ? (
          <iframe
            src={site.url}
            title={`${site.name}, live`}
            className="siteFrame"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        ) : (
          <Image
            src={site.preview}
            alt={`${site.name} home page`}
            width={800}
            height={500}
            sizes="(max-width: 820px) 92vw, 540px"
            className="siteShot"
          />
        )}
      </div>

      <div className="siteBody">
        <div className="siteTitleRow">
          <h3>{site.name}</h3>
          <span className="siteActions">
            {site.caseStudy ? (
              <a href={site.caseStudy} className="siteVisit siteVisit--muted">
                Case study<span aria-hidden> ↑</span>
              </a>
            ) : null}
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="siteVisit">
              Visit<span aria-hidden> ↗</span>
            </a>
          </span>
        </div>
        <p className="siteBlurb">{site.blurb}</p>
        <p className="siteStack">
          {site.stack.map((s) => (
            <span className="chip" key={s}>
              {s}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}

export function LiveSites() {
  const embeddableCount = liveSites.filter((s) => s.embeddable).length;

  return (
    <section className="section" id="sites">
      <div className="shell">
        <SectionHead num="02" title="Shipped and online" />
        <p className="lede sitesLede">
          {liveSites.length} public sites. Press <em>Load live</em> to swap a still for
          the running site, on the {embeddableCount} that allow being framed. The rest
          refuse it, which is the correct setting for them and the reason they stay
          stills rather than broken frames.
        </p>

        <div className="siteGrid">
          {liveSites.map((site, i) => (
            <Reveal key={site.id} delay={i * 90}>
              <SiteCard site={site} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
