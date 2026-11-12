'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Extra classes applied alongside the reveal behaviour. */
  className?: string;
  /** `drawable` animates SVG strokes instead of sliding the block up. */
  variant?: 'reveal' | 'drawable';
  as?: ElementType;
  /** Stagger, in milliseconds, before this element is allowed to show. */
  delay?: number;
};

/**
 * Marks an element shown once it has scrolled into view, and then stops
 * watching it. Elements are visible by default if JavaScript never runs, so a
 * failed hydration degrades to a plain, readable page rather than a blank one.
 */
export function Reveal({
  children,
  className = '',
  variant = 'reveal',
  as: Tag = 'div',
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.dataset.shown = 'true';
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          window.setTimeout(() => {
            el.dataset.shown = 'true';
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`${variant} ${className}`.trim()} data-shown="false">
      {children}
    </Tag>
  );
}
