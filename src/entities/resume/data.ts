import type { WorkExperience } from './types';

export const RESUME: WorkExperience[] = [
  {
    id: '1',
    role: 'Fullstack Developer',
    company: 'Acme Corp',
    stackType: 'fullstack',
    skills: [
      { presentation: 'react', stackType: 'frontend' },
      { presentation: 'node', stackType: 'backend' },
      { presentation: 'mysql', stackType: 'backend' },
      { presentation: 'aws', stackType: 'fullstack' }
    ],
    start: '2022-01',
    end: '2023-12',
    description: 'Built full product features'
  },
  {
    id: '2',
    role: 'Frontend Engineer',
    company: 'Widget Ltd',
    stackType: 'frontend',
    skills: [
      { presentation: 'react', stackType: 'frontend' },
      { presentation: 'storybook', stackType: 'frontend' },
      { presentation: 'testing', stackType: 'frontend' }
    ],
    start: '2020-06',
    end: '2021-12',
    description: 'Component development and design system'
  },
  {
    id: '3',
    role: 'Backend Engineer',
    company: 'DataCo',
    stackType: 'backend',
    skills: [
      { presentation: 'mysql', stackType: 'backend' },
      { presentation: 'node', stackType: 'backend' },
      { presentation: 'integration testing', stackType: 'backend' }
    ],
    start: '2019-01',
    end: '2020-05',
    description: 'API and data modeling'
  }
];
