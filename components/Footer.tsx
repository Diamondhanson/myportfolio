import { site } from '@/content/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="shell footerInner">
        <dl className="titleBlock footerBlock">
          <div>
            <dt>Drawn by</dt>
            <dd>{site.name}</dd>
          </div>
          <div>
            <dt>Sheet</dt>
            <dd>1 of 1</dd>
          </div>
          <div>
            <dt>Revision</dt>
            <dd>{year}</dd>
          </div>
          <div>
            <dt>Scale</dt>
            <dd>1:1</dd>
          </div>
        </dl>
        <p className="footerNote label">
          Built with Next.js and hand-written CSS. No template, no page builder.
        </p>
      </div>
    </footer>
  );
}
