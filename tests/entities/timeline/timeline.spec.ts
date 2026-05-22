import { describe, it, expect } from 'vitest';
import { TIMELINE } from '@entities/timeline';
import type { TimelineEventKind } from '@entities/timeline';

const VALID_KINDS: TimelineEventKind[] = ['work', 'education', 'project'];

describe('TIMELINE data integrity', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(TIMELINE)).toBe(true);
    expect(TIMELINE.length).toBeGreaterThan(0);
  });

  it('every entry has a non-empty id', () => {
    for (const event of TIMELINE) {
      expect(event.id.trim().length).toBeGreaterThan(0);
    }
  });

  it('every entry has a non-empty title', () => {
    for (const event of TIMELINE) {
      expect(event.title.trim().length).toBeGreaterThan(0);
    }
  });

  it('every entry has a non-empty detail', () => {
    for (const event of TIMELINE) {
      expect(event.detail.trim().length).toBeGreaterThan(0);
    }
  });

  it('every entry has a valid kind', () => {
    for (const event of TIMELINE) {
      expect(VALID_KINDS).toContain(event.kind);
    }
  });

  it('every entry has a non-empty start', () => {
    for (const event of TIMELINE) {
      expect(event.start.trim().length).toBeGreaterThan(0);
    }
  });

  it('end is not earlier than start when present', () => {
    for (const event of TIMELINE) {
      if (event.end !== undefined) {
        expect(event.end >= event.start).toBe(true);
      }
    }
  });

  it('all ids are unique', () => {
    const ids = TIMELINE.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains at least one event of each kind', () => {
    const kinds = new Set(TIMELINE.map((e) => e.kind));
    expect(kinds.has('work')).toBe(true);
    expect(kinds.has('education')).toBe(true);
    expect(kinds.has('project')).toBe(true);
  });
});
