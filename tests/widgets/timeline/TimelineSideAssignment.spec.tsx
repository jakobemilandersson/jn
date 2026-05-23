import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// vi.hoisted ensures the mock data is available when vi.mock is hoisted to the
// top of the file by Vitest's transformer — avoids "Cannot access before init".
const { MOCK_EVENTS } = vi.hoisted(() => {
  const MOCK_EVENTS = [
    {
      id: 'a',
      kind: 'work' as const,
      title: 'First Event',
      start: '2020-01',
      detail: 'First detail',
    },
    {
      id: 'b',
      kind: 'education' as const,
      title: 'Second Event',
      start: '2021-01',
      detail: 'Second detail',
    },
    {
      id: 'c',
      kind: 'project' as const,
      title: 'Third Event',
      start: '2022-01',
      detail: 'Third detail',
    },
  ];
  return { MOCK_EVENTS };
});

vi.mock('@entities/timeline', () => ({
  TIMELINE: MOCK_EVENTS,
}));

// Import after the mock is registered.
import { Timeline } from '@widgets/timeline';

describe('Timeline — desktop side assignment', () => {
  it('assigns right column to even-indexed events and left column to odd-indexed events after sort', () => {
    render(<Timeline />);

    const listItems = screen.getAllByRole('listitem');
    // After sort by start: First (2020-01) index 0, Second (2021-01) index 1, Third (2022-01) index 2

    // index 0 → side='right': first child of <li> is the aria-hidden spacer
    expect(Array.from(listItems[0].children)[0]).toHaveAttribute('aria-hidden', 'true');

    // index 1 → side='left': second child of <li> is the aria-hidden spacer
    expect(Array.from(listItems[1].children)[1]).toHaveAttribute('aria-hidden', 'true');

    // index 2 → side='right': first child of <li> is the aria-hidden spacer
    expect(Array.from(listItems[2].children)[0]).toHaveAttribute('aria-hidden', 'true');
  });
});
