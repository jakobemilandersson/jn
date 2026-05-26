import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// vi.hoisted ensures mock data is available when vi.mock is hoisted by Vitest.
const { MOCK_EXPERIENCES } = vi.hoisted(() => {
  const MOCK_EXPERIENCES = [
    {
      id: 'a',
      kind: 'work' as const,
      role: 'First Role',
      company: 'Corp A',
      subtitle: 'Corp A',
      stackType: 'fullstack' as const,
      skills: [],
      start: '2020-01',
      description: { title: '', summary: 'First detail', fulltext: '' },
    },
    {
      id: 'b',
      kind: 'education' as const,
      role: 'Second Role',
      company: 'Corp B',
      subtitle: 'Corp B',
      stackType: 'backend' as const,
      skills: [],
      start: '2021-01',
      description: { title: '', summary: 'Second detail', fulltext: '' },
    },
    {
      id: 'c',
      kind: 'project' as const,
      role: 'Third Role',
      company: 'Corp C',
      subtitle: 'Corp C',
      stackType: 'frontend' as const,
      skills: [],
      start: '2022-01',
      description: { title: '', summary: 'Third detail', fulltext: '' },
    },
  ];
  return { MOCK_EXPERIENCES };
});

vi.mock('@entities/resume', () => ({
  RESUME: { experiences: MOCK_EXPERIENCES, profile: {} },
}));

// Import after mock is registered.
import { Timeline } from '@widgets/timeline';

describe('Timeline \u2014 desktop side assignment', () => {
  it('assigns right column to even-indexed events and left column to odd-indexed events after sort', () => {
    render(<Timeline />);

    const listItems = screen.getAllByRole('listitem');
    // After sort by start: First (2020-01) index 0, Second (2021-01) index 1, Third (2022-01) index 2

    // index 0 \u2192 side='right': first child of <li> is the aria-hidden spacer
    expect(Array.from(listItems[0].children)[0]).toHaveAttribute('aria-hidden', 'true');

    // index 1 \u2192 side='left': second child of <li> is the aria-hidden spacer
    expect(Array.from(listItems[1].children)[1]).toHaveAttribute('aria-hidden', 'true');

    // index 2 \u2192 side='right': first child of <li> is the aria-hidden spacer
    expect(Array.from(listItems[2].children)[0]).toHaveAttribute('aria-hidden', 'true');
  });
});
