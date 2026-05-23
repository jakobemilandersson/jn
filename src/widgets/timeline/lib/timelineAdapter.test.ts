import { describe, it, expect } from 'vitest';
import { toTimelineViewModels } from './timelineAdapter';
import type { WorkExperience, YearMonth } from '@entities/resume';

const workEntry: WorkExperience = {
  id: 'work-1',
  kind: 'work',
  role: 'Full Stack Developer',
  company: 'Plick',
  subtitle: 'Plick',
  stackType: 'fullstack',
  skills: [
    { presentation: 'React', stackType: 'frontend' },
    { presentation: 'PostgreSQL', stackType: 'backend' },
  ],
  start: '2022-08' as YearMonth,
  end: '2025-12' as YearMonth,
  description: {
    title: 'Scalable backend development',
    summary: 'Built scalable solutions for a high-traffic e-commerce platform.',
    fulltext: 'Built and maintained scalable backend and frontend solutions.',
  },
};

const educationEntry: WorkExperience = {
  id: 'edu-bsc',
  kind: 'education',
  role: "Bachelor's in Civil Engineering IT",
  company: 'Uppsala University',
  subtitle: 'Uppsala University',
  stackType: 'backend',
  skills: [
    { presentation: 'algorithms', stackType: 'backend' },
  ],
  start: '2014-08' as YearMonth,
  end: '2017-06' as YearMonth,
  description: {
    title: "Bachelor's degree",
    summary: 'Studied Civil Engineering IT at Uppsala University.',
    fulltext: 'Studied Civil Engineering IT at Uppsala University.',
  },
};

const projectEntry: WorkExperience = {
  id: 'project-jn',
  kind: 'project',
  role: 'jakob.now — Resume Filter App',
  company: 'Side project',
  subtitle: 'Side project',
  stackType: 'fullstack',
  url: 'https://github.com/jakobemilandersson/jn',
  skills: [
    { presentation: 'React', stackType: 'frontend' },
    { presentation: 'TypeScript', stackType: 'fullstack' },
  ],
  start: '2025-01' as YearMonth,
  description: {
    title: 'Filter-driven resume explorer',
    summary: 'Built a filter-driven resume explorer SPA.',
    fulltext: 'Built a filter-driven resume explorer SPA using React and TypeScript.',
  },
};

describe('toTimelineViewModels', () => {
  it('maps a work entry: title combines role and company', () => {
    const [vm] = toTimelineViewModels([workEntry]);
    expect(vm.title).toBe('Full Stack Developer — Plick');
  });

  it('maps a work entry: detail comes from description.summary', () => {
    const [vm] = toTimelineViewModels([workEntry]);
    expect(vm.detail).toBe('Built scalable solutions for a high-traffic e-commerce platform.');
  });

  it('maps a work entry: detail does NOT come from description.fulltext', () => {
    const [vm] = toTimelineViewModels([workEntry]);
    expect(vm.detail).not.toBe('Built and maintained scalable backend and frontend solutions.');
  });

  it('maps a work entry: tags are derived from skills', () => {
    const [vm] = toTimelineViewModels([workEntry]);
    expect(vm.tags).toEqual([
      { label: 'React', stackType: 'frontend' },
      { label: 'PostgreSQL', stackType: 'backend' },
    ]);
  });

  it('maps a work entry: preserves id, kind, subtitle, start, end', () => {
    const [vm] = toTimelineViewModels([workEntry]);
    expect(vm.id).toBe('work-1');
    expect(vm.kind).toBe('work');
    expect(vm.subtitle).toBe('Plick');
    expect(vm.start).toBe('2022-08');
    expect(vm.end).toBe('2025-12');
  });

  it('maps an education entry: kind is education', () => {
    const [vm] = toTimelineViewModels([educationEntry]);
    expect(vm.kind).toBe('education');
  });

  it('maps an education entry: detail comes from description.summary', () => {
    const [vm] = toTimelineViewModels([educationEntry]);
    expect(vm.detail).toBe('Studied Civil Engineering IT at Uppsala University.');
  });

  it('maps an education entry: url is undefined when not set', () => {
    const [vm] = toTimelineViewModels([educationEntry]);
    expect(vm.url).toBeUndefined();
  });

  it('maps a project entry: kind is project', () => {
    const [vm] = toTimelineViewModels([projectEntry]);
    expect(vm.kind).toBe('project');
  });

  it('maps a project entry: url is preserved', () => {
    const [vm] = toTimelineViewModels([projectEntry]);
    expect(vm.url).toBe('https://github.com/jakobemilandersson/jn');
  });

  it('maps a project entry: end is undefined for ongoing entries', () => {
    const [vm] = toTimelineViewModels([projectEntry]);
    expect(vm.end).toBeUndefined();
  });

  it('returns an empty detail string when description is null', () => {
    const entry: WorkExperience = { ...workEntry, description: null };
    const [vm] = toTimelineViewModels([entry]);
    expect(vm.detail).toBe('');
  });

  it('preserves order of input experiences', () => {
    const vms = toTimelineViewModels([workEntry, educationEntry, projectEntry]);
    expect(vms.map((v) => v.id)).toEqual(['work-1', 'edu-bsc', 'project-jn']);
  });
});
