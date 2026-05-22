import { TIMELINE } from '@entities/timeline';
import type { TimelineEventKind } from '@entities/timeline';

const KIND_STYLES: Record<TimelineEventKind, { dot: string; label: string }> = {
  work: {
    dot: 'bg-teal-500 dark:bg-teal-400 ring-teal-500/30 dark:ring-teal-400/30',
    label: 'text-teal-700 dark:text-teal-400',
  },
  education: {
    dot: 'bg-purple-500 dark:bg-purple-400 ring-purple-500/30 dark:ring-purple-400/30',
    label: 'text-purple-700 dark:text-purple-400',
  },
  project: {
    dot: 'bg-orange-500 dark:bg-orange-400 ring-orange-500/30 dark:ring-orange-400/30',
    label: 'text-orange-700 dark:text-orange-400',
  },
};

function formatPeriod(start: string, end?: string): string {
  const fmt = (ym: string) => {
    const [y, m] = ym.split('-');
    return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };
  return end ? `${fmt(start)} – ${fmt(end)}` : `${fmt(start)} – present`;
}

export function Timeline() {
  const sorted = [...TIMELINE].sort((a, b) => (a.start < b.start ? -1 : 1));

  return (
    <section aria-label="Career and project timeline" className="relative w-full py-4">
      {/* Centre line — hidden on mobile, visible md+ */}
      <div
        aria-hidden="true"
        className="absolute left-3 top-0 bottom-0 w-px bg-white/10 dark:bg-white/10 md:left-1/2 md:-translate-x-px"
      />

      <ol className="space-y-10">
        {sorted.map((event, index) => {
          const styles = KIND_STYLES[event.kind];
          const isRight = index % 2 === 0;

          return (
            <li
              key={event.id}
              className="relative flex items-start gap-4 md:gap-0"
            >
              {/* ── Mobile layout: left rail ── */}
              {/* ── Desktop layout: alternating ── */}

              {/* Left-side content (desktop only, even-index items) */}
              <div
                className={[
                  'hidden md:flex md:w-1/2 md:pr-10',
                  isRight ? 'md:justify-end' : 'md:invisible',
                ].join(' ')}
              >
                {isRight && (
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white/90">{event.title}</p>
                    {event.subtitle && (
                      <p className={`text-xs mt-0.5 ${styles.label}`}>{event.subtitle}</p>
                    )}
                    <p className="text-xs text-white/40 mt-1">
                      {formatPeriod(event.start, event.end)}
                    </p>
                  </div>
                )}
              </div>

              {/* Dot — sits on the line */}
              <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1">
                <span
                  className={[
                    'block w-3 h-3 rounded-full ring-4',
                    styles.dot,
                    'ml-1.5 md:ml-0',
                  ].join(' ')}
                  aria-hidden="true"
                />
              </div>

              {/* Right-side content — mobile always, desktop odd-index */}
              <div
                className={[
                  'flex-1 pl-4 md:pl-0',
                  'md:w-1/2 md:pl-10',
                  !isRight ? '' : 'md:invisible md:pointer-events-none',
                  // On desktop the right slot is only visible for odd items;
                  // on mobile it is always visible.
                  'md:absolute md:right-0 md:top-0',
                  isRight ? 'md:hidden' : '',
                ].join(' ')}
              >
                <p className="text-sm font-semibold text-white/90">{event.title}</p>
                {event.subtitle && (
                  <p className={`text-xs mt-0.5 ${styles.label}`}>{event.subtitle}</p>
                )}
                <p className="text-xs text-white/40 mt-1">
                  {formatPeriod(event.start, event.end)}
                </p>
              </div>

              {/* Mobile-only: also show right-side for even items */}
              {isRight && (
                <div className="flex-1 pl-4 md:hidden">
                  <p className="text-sm font-semibold text-white/90">{event.title}</p>
                  {event.subtitle && (
                    <p className={`text-xs mt-0.5 ${styles.label}`}>{event.subtitle}</p>
                  )}
                  <p className="text-xs text-white/40 mt-1">
                    {formatPeriod(event.start, event.end)}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
