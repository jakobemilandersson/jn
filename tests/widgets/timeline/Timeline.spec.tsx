import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Timeline } from '@widgets/timeline';
import { RESUME } from '@entities/resume';
import { toTimelineViewModels } from '@widgets/timeline/lib';

const TIMELINE_VMS = toTimelineViewModels(RESUME.experiences).sort(
  (a, b) => (a.start < b.start ? -1 : 1),
);

describe('Timeline', () => {
  it('renders all event titles', () => {
    render(<Timeline />);
    for (const event of TIMELINE_VMS) {
      expect(screen.getAllByText(event.title).length).toBeGreaterThan(0);
    }
  });

  it('renders a list item for each timeline event', () => {
    render(<Timeline />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(TIMELINE_VMS.length);
  });

  it('renders events in chronological order', () => {
    render(<Timeline />);
    const items = screen.getAllByRole('listitem');
    expect(items[0].textContent).toContain(TIMELINE_VMS[0].title);
  });

  it('clicking a dot reveals the event detail', () => {
    render(<Timeline />);
    const first = TIMELINE_VMS[0];
    const btn = screen.getByRole('button', { name: new RegExp(first.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
    fireEvent.click(btn);
    expect(screen.getByText(first.detail)).toBeInTheDocument();
  });

  it('clicking an active dot hides the detail', () => {
    render(<Timeline />);
    const first = TIMELINE_VMS[0];
    const btn = screen.getByRole('button', { name: new RegExp(first.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
    fireEvent.click(btn);
    expect(screen.getByText(first.detail)).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText(first.detail)).not.toBeInTheDocument();
  });

  it('dot has scale-125 class when entry is active', () => {
    render(<Timeline />);
    const first = TIMELINE_VMS[0];
    const btn = screen.getByRole('button', { name: new RegExp(first.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
    fireEvent.click(btn);
    const dot = btn.querySelector('[aria-hidden="true"]');
    expect(dot?.classList.contains('scale-125')).toBe(true);
    expect(dot?.classList.contains('scale-100')).toBe(false);
  });

  it('dot returns to scale-100 after deselecting', () => {
    render(<Timeline />);
    const first = TIMELINE_VMS[0];
    const btn = screen.getByRole('button', { name: new RegExp(first.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    const dot = btn.querySelector('[aria-hidden="true"]');
    expect(dot?.classList.contains('scale-125')).toBe(true);
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    expect(dot?.classList.contains('scale-125')).toBe(false);
    expect(dot?.classList.contains('scale-100')).toBe(true);
  });

  it('pressing Escape closes the open popover', () => {
    render(<Timeline />);
    const first = TIMELINE_VMS[0];
    const btn = screen.getByRole('button', { name: new RegExp(first.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
    fireEvent.click(btn);
    expect(screen.getByText(first.detail)).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText(first.detail)).not.toBeInTheDocument();
  });

  it('only one popover is open at a time', () => {
    render(<Timeline />);
    const [first, second] = TIMELINE_VMS;
    fireEvent.click(screen.getByRole('button', { name: new RegExp(first.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }));
    expect(screen.getByText(first.detail)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: new RegExp(second.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }));
    expect(screen.queryByText(first.detail)).not.toBeInTheDocument();
    expect(screen.getByText(second.detail)).toBeInTheDocument();
  });

  it('tags are visible when a popover is open', () => {
    render(<Timeline />);
    const withTags = TIMELINE_VMS.find((e) => e.tags && e.tags.length > 0)!;
    fireEvent.click(screen.getByRole('button', { name: new RegExp(withTags.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }));
    expect(screen.getByText(withTags.tags![0].label)).toBeInTheDocument();
  });

  it('url link is visible when a popover is open for a project with a url', () => {
    render(<Timeline />);
    const withUrl = TIMELINE_VMS.find((e) => e.url)!;
    fireEvent.click(screen.getByRole('button', { name: new RegExp(withUrl.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }));
    expect(screen.getByRole('link', { name: /view project/i })).toBeInTheDocument();
  });
});
