import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Timeline } from '@widgets/timeline';
import { TIMELINE } from '@entities/timeline';

describe('Timeline', () => {
  it('renders all event titles', () => {
    render(<Timeline />);
    for (const event of TIMELINE) {
      expect(screen.getAllByText(event.title).length).toBeGreaterThan(0);
    }
  });

  it('renders a list item for each timeline event', () => {
    render(<Timeline />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(TIMELINE.length);
  });

  it('renders events in chronological order', () => {
    render(<Timeline />);
    const sorted = [...TIMELINE].sort((a, b) => (a.start < b.start ? -1 : 1));
    const items = screen.getAllByRole('listitem');
    expect(items[0].textContent).toContain(sorted[0].title);
  });

  it('clicking a dot reveals the event detail', () => {
    render(<Timeline />);
    const first = TIMELINE[0];
    const btn = screen.getByRole('button', { name: new RegExp(first.title) });
    fireEvent.click(btn);
    expect(screen.getByText(first.detail)).toBeInTheDocument();
  });

  it('clicking an active dot hides the detail', () => {
    render(<Timeline />);
    const first = TIMELINE[0];
    const btn = screen.getByRole('button', { name: new RegExp(first.title) });
    fireEvent.click(btn);
    expect(screen.getByText(first.detail)).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText(first.detail)).not.toBeInTheDocument();
  });

  it('pressing Escape closes the open popover', () => {
    render(<Timeline />);
    const first = TIMELINE[0];
    const btn = screen.getByRole('button', { name: new RegExp(first.title) });
    fireEvent.click(btn);
    expect(screen.getByText(first.detail)).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText(first.detail)).not.toBeInTheDocument();
  });

  it('only one popover is open at a time', () => {
    render(<Timeline />);
    const sorted = [...TIMELINE].sort((a, b) => (a.start < b.start ? -1 : 1));
    const [first, second] = sorted;
    fireEvent.click(screen.getByRole('button', { name: new RegExp(first.title) }));
    expect(screen.getByText(first.detail)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: new RegExp(second.title) }));
    expect(screen.queryByText(first.detail)).not.toBeInTheDocument();
    expect(screen.getByText(second.detail)).toBeInTheDocument();
  });

  it('tags are visible when a popover is open', () => {
    render(<Timeline />);
    const withTags = TIMELINE.find((e) => e.tags && e.tags.length > 0)!;
    fireEvent.click(screen.getByRole('button', { name: new RegExp(withTags.title) }));
    expect(screen.getByText(withTags.tags![0].label)).toBeInTheDocument();
  });

  it('url link is visible when a popover is open for a project with a url', () => {
    render(<Timeline />);
    const withUrl = TIMELINE.find((e) => e.url)!;
    fireEvent.click(screen.getByRole('button', { name: new RegExp(withUrl.title) }));
    expect(screen.getByRole('link', { name: /view project/i })).toBeInTheDocument();
  });
});
