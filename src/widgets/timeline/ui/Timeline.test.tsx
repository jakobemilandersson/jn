import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Timeline } from './Timeline';
import type { TimelineEvent } from '@entities/timeline';

// Mock TIMELINE so the test is decoupled from real entity data.
const MOCK_EVENTS: TimelineEvent[] = [
  {
    id: 'a',
    kind: 'work',
    title: 'First Event',
    start: '2020-01' as TimelineEvent['start'],
    detail: 'First detail',
  },
  {
    id: 'b',
    kind: 'education',
    title: 'Second Event',
    start: '2021-01' as TimelineEvent['start'],
    detail: 'Second detail',
  },
  {
    id: 'c',
    kind: 'project',
    title: 'Third Event',
    start: '2022-01' as TimelineEvent['start'],
    detail: 'Third detail',
  },
];

vi.mock('@entities/timeline', () => ({
  TIMELINE: MOCK_EVENTS,
}));

describe('Timeline — side assignment', () => {
  it('assigns right to even-indexed events and left to odd-indexed events after sort', () => {
    render(<Timeline />);

    const listItems = screen.getAllByRole('listitem');

    // index 0 (First Event) → right column: spacer is first child, node second
    // index 1 (Second Event) → left column: node is first child, spacer second
    // index 2 (Third Event) → right column: spacer first, node second

    // Right-column items have the node in the second <div> child of the <li>.
    // Left-column items have the node in the first <div> child.
    // We assert this via aria-label on the button inside each node.

    const buttons = screen.getAllByRole('button');
    // After sort by start: First (2020), Second (2021), Third (2022)
    expect(buttons[0]).toHaveAccessibleName(/First Event/);
    expect(buttons[1]).toHaveAccessibleName(/Second Event/);
    expect(buttons[2]).toHaveAccessibleName(/Third Event/);

    // Even index (0, 2) → side='right' → li first child is aria-hidden spacer
    const firstLi = listItems[0];
    const firstLiChildren = Array.from(firstLi.children);
    expect(firstLiChildren[0]).toHaveAttribute('aria-hidden', 'true');

    // Odd index (1) → side='left' → li second child is aria-hidden spacer
    const secondLi = listItems[1];
    const secondLiChildren = Array.from(secondLi.children);
    expect(secondLiChildren[1]).toHaveAttribute('aria-hidden', 'true');

    // Even index again (2) → side='right' → li first child is aria-hidden spacer
    const thirdLi = listItems[2];
    const thirdLiChildren = Array.from(thirdLi.children);
    expect(thirdLiChildren[0]).toHaveAttribute('aria-hidden', 'true');
  });
});
