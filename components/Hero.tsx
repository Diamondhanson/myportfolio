import { site } from '@/content/site';
import { Reveal } from './Reveal';

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="shell heroInner">
        <Reveal className="heroHead">
          <p className="label">
            Sheet 00 <span className="sep">/</span> Identity
          </p>

          <h1 className="heroName">
            <span>Bambot</span>
            <span>Hanson</span>
            <span className="outline">Ngongmun</span>
          </h1>

          {/* A measured dimension, the way a drawing states a span. */}
          <p className="dim heroDim">{site.yearsExperience} years shipping</p>

          <p className="lede heroLede">{site.intro}</p>

          <div className="heroActions">
            <a href="#work" className="btn btn--accent">
              See the work
            </a>
            <a href={site.links.cv} className="btn" download>
              Download CV
            </a>
          </div>
        </Reveal>

        <Reveal className="heroAside" delay={140}>
          <dl className="titleBlock">
            <div>
              <dt>Discipline</dt>
              <dd>{site.role}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>TypeScript</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Zone</dt>
              <dd>{site.timezone}</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>English · French</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className="available">
                <span className="dot" aria-hidden />
                Open to remote
              </dd>
            </div>
          </dl>

          <p className="annotation heroNote">
            <span aria-hidden>↑</span> Every number on this page is checkable against
            the repositories and store listings linked below.
          </p>
        </Reveal>
      </div>

      <div className="shell">
        <Reveal className="metrics" delay={240}>
          {site.metrics.map((m) => (
            <div className="metric" key={m.label}>
              <p className="metricValue">
                {m.value}
                <span className="metricUnit">{m.unit}</span>
              </p>
              <p className="metricLabel">{m.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </header>
  );
}
