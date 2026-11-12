import { site } from '@/content/site';
import { ThemeToggle } from './ThemeToggle';

const items = [
  { href: '#work', label: 'Work' },
  { href: '#sites', label: 'Sites' },
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <div className="shell navInner">
        <a href="#top" className="navMark">
          <span className="navInitials">BHN</span>
          <span className="navRole">{site.role}</span>
        </a>

        <ul className="navLinks">
          {items.map((i) => (
            <li key={i.href}>
              <a href={i.href}>{i.label}</a>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </div>
    </nav>
  );
}
