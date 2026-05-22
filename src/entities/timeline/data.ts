import type { TimelineEvent } from './types';
import type { YearMonth } from '@entities/resume';

export const TIMELINE: TimelineEvent[] = [
  {
    id: 'edu-bsc',
    kind: 'education',
    title: "Bachelor's in Computer Science",
    subtitle: 'University',
    start: '2016-08' as YearMonth,
    end: '2019-06' as YearMonth,
    detail:
      'Studied computer science with a focus on algorithms, data structures, and software engineering. Graduated with a thesis on automated data extraction.',
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
    tags: ['algorithms', 'data extraction', 'constraint programming', 'technical documentation'],
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
    tags: ['Python (Flask)', 'React', 'PostgreSQL', 'REST API', 'Linux'],
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
    tags: ['Ruby on Rails', 'Flutter', 'React', 'PostgreSQL', 'GraphQL', 'Docker', 'GitHub Actions'],
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
    tags: ['React', 'TypeScript', 'Vite', 'Zustand', 'TailwindCSS', 'Vitest'],
  },
  {
    id: 'work-consultant',
    kind: 'work',
    title: 'IT Consultant — Independent',
    subtitle: 'Independent',
    start: '2025-01' as YearMonth,
    detail:
      'Founded and run an independent consultancy. Built a social mobile game from scratch for a client — covering architecture, real-time data modelling, UI, and international launch. Responsible for the full delivery chain.',
    tags: ['React Native', 'Flutter', 'Firestore', 'system design', 'project management'],
  },
];
