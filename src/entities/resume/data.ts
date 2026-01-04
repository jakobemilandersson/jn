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
    description: { 
      title: 'Built full product features',
      fulltext: 'Developed and maintained full product features using React for frontend and Node.js for backend, deployed on AWS.'
    }
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
    description: {
      title: 'Component development and design system',
      fulltext: `
        Focused on building reusable components and maintaining the design system using React and Storybook.
        Collaborated closely with designers to ensure design fidelity and accessibility compliance.

        Implemented comprehensive testing strategies to ensure component reliability and performance.

        Did more than just code...

        Eat some doughnuts.
      `.trim()
    }
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
    description: {
      title: 'API and data modeling',
      fulltext: 'Designed and implemented RESTful APIs and data models to support application features and ensure data integrity.'
    }
  }
];
