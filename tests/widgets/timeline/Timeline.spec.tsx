import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from '@widgets/timeline';
import { TIMELINE } from '@entities/timeline';

describe('Timeline', () => {
  it('renders all event titles', () => {
    render(<Timeline />);
    for (const event of TIMELINE) {
      // Each title may appear more than once (mobile + desktop slots) —
      // we only assert presence, not count.
      expect(screen.getAllByText(event.title).length).toBeGreaterThan(0);
    }
  });

  it('renders a list item for each timeline event', () => {
    render(<Timeline />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(TIMELINE.length);
  });

  it('renders events in chronological order (earliest title appears first in DOM)', () => {
    render(<Timeline />);
    const sorted = [...TIMELINE].sort((a, b) => (a.start < b.start ? -1 : 1));
    const items = screen.getAllByRole('listitem');
    // The first visible title text inside the first list item should match the
    // earliest event — use textContent to avoid caring about DOM structure.
    expect(items[0].textContent).toContain(sorted[0].title);
  });
});
