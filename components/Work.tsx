import { projects } from '@/content/projects';
import { CaseStudy } from './CaseStudy';
import { SectionHead } from './SectionHead';

export function Work() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <SectionHead num="01" title="Selected work" />
        <div className="cases">
          {projects.map((p) => (
            <CaseStudy key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
