import type { WorkExperience } from './types'

export const RESUME: WorkExperience[] = [
  {
    id: '1',
    role: 'Fullstack Developer',
    company: 'Acme Corp',
    stackType: 'fullstack',
    skills: ['react', 'node', 'mysql', 'aws'],
    start: '2022-01',
    end: '2023-12',
    description: 'Built full product features'
  },
  {
    id: '2',
    role: 'Frontend Engineer',
    company: 'Widget Ltd',
    stackType: 'frontend',
    skills: ['react', 'storybook', 'testing'],
    start: '2020-06',
    end: '2021-12',
    description: 'Component development and design system'
  },
  {
    id: '3',
    role: 'Backend Engineer',
    company: 'DataCo',
    stackType: 'backend',
    skills: ['mysql', 'node', 'integration testing'],
    start: '2019-01',
    end: '2020-05',
    description: 'API and data modeling'
  }
]
