import { useState, useEffect, useRef, useCallback } from 'react';
import { TIMELINE } from '@entities/timeline';
import type { TimelineEvent, TimelineEventKind } from '@entities/timeline';
import { SkillChip } from '@shared/ui';

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

function PopoverCard({
  event,
  onClose,
}: {
  event: TimelineEvent;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="tooltip"
      onClick={(e) => e.stopPropagation()}
      className="mt-3 rounded-lg border border-white/10 bg-white/5 dark:bg-black/40 backdrop-blur-sm p-4 space-y-3"
    >
      <p className="text-sm text-white/90 leading-relaxed">{event.detail}</p>

      {event.tags && event.tags.length > 0 && (
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {event.tags.map((tag) => (
            <li key={tag.label}>
              <SkillChip label={tag.label} variant={tag.stackType} />
            </li>
          ))}
        </ul>
      )}

      {event.url && (
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white/90 transition-colors"
        >
          View project →
        </a>
      )}
    </div>
  );
}

function TimelineNode({
  event,
  isActive,
  onActivate,
  onDeactivate,
}: {
  event: TimelineEvent;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const styles = KIND_STYLES[event.kind];

  const handleMouseEnter = useCallback(() => onActivate(), [onActivate]);
  const handleMouseLeave = useCallback(() => onDeactivate(), [onDeactivate]);
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isActive) onDeactivate();
      else onActivate();
    },
    [isActive, onActivate, onDeactivate],
  );
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isActive) onDeactivate();
        else onActivate();
      }
    },
    [isActive, onActivate, onDeactivate],
  );

  return (
    <div className="space-y-1">
      <button
        type="button"
        aria-label={`${event.title} — ${formatPeriod(event.start, event.end)}`}
        aria-expanded={isActive}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group w-full text-left flex flex-col gap-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
      >
        <span className="flex items-center gap-2">
          {/* Scale is driven solely by isActive. group-hover was intentionally
              removed: on touch devices browsers retain :hover after a tap,
              causing the dot to stay enlarged even after deselection. */}
          <span
            className={[
              'block w-3 h-3 rounded-full ring-4 transition-transform duration-150 shrink-0',
              isActive ? 'scale-125' : 'scale-100',
              styles.dot,
            ].join(' ')}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-white/90">{event.title}</span>
        </span>

        {event.subtitle && (
          <span className={`text-xs pl-5 ${styles.label}`}>{event.subtitle}</span>
        )}
        <span className="text-xs pl-5 text-white/40">{formatPeriod(event.start, event.end)}</span>
      </button>

      {isActive && (
        <div className="pl-5">
          <PopoverCard event={event} onClose={onDeactivate} />
        </div>
      )}
    </div>
  );
}

export function Timeline() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sorted = [...TIMELINE].sort((a, b) => (a.start < b.start ? -1 : 1));

  return (
    <section aria-label="Career and project timeline" className="relative w-full py-4">
      <div
        aria-hidden="true"
        className="absolute left-3 top-0 bottom-0 w-px bg-white/10"
      />
      <ol className="space-y-8 pl-2">
        {sorted.map((event) => (
          <li key={event.id}>
            <TimelineNode
              event={event}
              isActive={activeId === event.id}
              onActivate={() => setActiveId(event.id)}
              onDeactivate={() => setActiveId(null)}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
