import type { TimelineEvent, YearMonth } from './types';

export const TIMELINE: TimelineEvent[] = [
  {
    id: 'edu-bsc',
    kind: 'education',
    title: "Bachelor's in Civil Engineering IT",
    subtitle: 'Uppsala University',
    start: '2014-08' as YearMonth,
    end: '2017-06' as YearMonth,
    detail:
      'Studied Civil Engineering IT at Uppsala University, covering software development, algorithms, data structures, and engineering fundamentals.',
  },
  {
    id: 'edu-msc',
    kind: 'education',
    title: "Master's in Civil Engineering IT",
    subtitle: 'Uppsala University',
    start: '2017-08' as YearMonth,
    end: '2019-06' as YearMonth,
    detail:
      'Completed a Master\'s degree in Civil Engineering IT at Uppsala University. Concluded with a thesis on automated data extraction at Ductus.',
  },
  {
    id: 'work-ductus-thesis',
    kind: 'work',
    title: "Master's Thesis — Ductus",
    subtitle: 'Ductus',
    start: '2019-01' as YearMonth,
    end: '2019-06' as YearMonth,
    detail:
      'Developed and evaluated algorithms for automated extraction and validation of numerical data from complex documents. Documented findings and presented improvement proposals for production use.',
    tags: [
      { label: 'algorithms', stackType: 'backend' },
      { label: 'data extraction', stackType: 'backend' },
      { label: 'constraint programming', stackType: 'backend' },
      { label: 'technical documentation', stackType: 'neutral' },
    ],
  },
  {
    id: 'work-ductus',
    kind: 'work',
    title: 'Full Stack Developer — Ductus',
    subtitle: 'Ductus',
    start: '2019-08' as YearMonth,
    end: '2022-08' as YearMonth,
    detail:
      'Built and maintained a business-critical IPAM system for a major telecom client. Full-stack development, REST API design, database migrations, and production operations. Mentored a junior developer.',
    tags: [
      { label: 'Python (Flask)', stackType: 'backend' },
      { label: 'React', stackType: 'frontend' },
      { label: 'PostgreSQL', stackType: 'backend' },
      { label: 'REST API', stackType: 'backend' },
      { label: 'Linux', stackType: 'backend' },
    ],
  },
  {
    id: 'work-plick',
    kind: 'work',
    title: 'Full Stack Developer — Plick',
    subtitle: 'Plick',
    start: '2022-08' as YearMonth,
    end: '2025-12' as YearMonth,
    detail:
      'Built scalable backend and frontend solutions for a high-traffic e-commerce platform. Designed integration flows, optimised PostgreSQL schemas, contributed to CI/CD pipelines, and built app and web interfaces.',
    tags: [
      { label: 'Ruby on Rails', stackType: 'backend' },
      { label: 'Flutter', stackType: 'frontend' },
      { label: 'React', stackType: 'frontend' },
      { label: 'PostgreSQL', stackType: 'backend' },
      { label: 'GraphQL', stackType: 'fullstack' },
      { label: 'Docker', stackType: 'backend' },
      { label: 'GitHub Actions', stackType: 'neutral' },
    ],
  },
  {
    id: 'project-jn',
    kind: 'project',
    title: 'jakob.now — Resume Filter App',
    subtitle: 'Side project',
    start: '2025-01' as YearMonth,
    detail:
      'Built a filter-driven resume explorer SPA using React, TypeScript, Vite, Zustand, and TailwindCSS. Mini-FSD architecture with strict layer boundaries, full CI, and TDD throughout.',
    url: 'https://github.com/jakobemilandersson/jn',
    tags: [
      { label: 'React', stackType: 'frontend' },
      { label: 'TypeScript', stackType: 'fullstack' },
      { label: 'Vite', stackType: 'frontend' },
      { label: 'Zustand', stackType: 'frontend' },
      { label: 'TailwindCSS', stackType: 'frontend' },
      { label: 'Vitest', stackType: 'neutral' },
    ],
  },
  {
    id: 'work-consultant',
    kind: 'work',
    title: 'IT Consultant — Independent',
    subtitle: 'Independent',
    start: '2025-01' as YearMonth,
    detail:
      'Founded and run an independent consultancy. Built a social mobile game from scratch for a client — covering architecture, real-time data modelling, UI, and international launch. Responsible for the full delivery chain.',
    tags: [
      { label: 'React Native', stackType: 'frontend' },
      { label: 'Flutter', stackType: 'frontend' },
      { label: 'Firestore', stackType: 'backend' },
      { label: 'system design', stackType: 'fullstack' },
      { label: 'project management', stackType: 'neutral' },
    ],
  },
];
