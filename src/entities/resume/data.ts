import type { WorkExperience, YearMonth } from './types';


export const RESUME: WorkExperience[] = [
  {
    id: '1',
    role: 'IT Consultant',
    company: 'Independent',
    stackType: 'fullstack',
    skills: [
      { presentation: 'React Native', stackType: 'frontend' },
      { presentation: 'Flutter', stackType: 'frontend' },
      { presentation: 'system design', stackType: 'fullstack' },
      { presentation: 'project management', stackType: 'fullstack' },
      { presentation: 'firestore', stackType: 'backend' },
    ],
    start: '2025-01' as YearMonth,
    description: {
      title: 'Full-cycle client project delivery',
      fulltext: `Founded and run an independent consultancy focused on software development and technical advisory.

Built a social mobile game from scratch for a client — covering requirements gathering, architecture, real-time data modelling, UI, and international launch.

Responsible for the full delivery chain: technical decisions, client communication, and ongoing optimisation.`,
    },
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    company: 'Plick',
    stackType: 'fullstack',
    skills: [
      { presentation: 'Ruby on Rails', stackType: 'backend' },
      { presentation: 'Python', stackType: 'backend' },
      { presentation: 'Flutter', stackType: 'frontend' },
      { presentation: 'React', stackType: 'frontend' },
      { presentation: 'PostgreSQL', stackType: 'backend' },
      { presentation: 'GraphQL', stackType: 'backend' },
      { presentation: 'REST API', stackType: 'backend' },
      { presentation: 'Docker', stackType: 'fullstack' },
      { presentation: 'GitHub Actions', stackType: 'fullstack' },
      { presentation: 'MiniTest', stackType: 'backend' },
      { presentation: 'Sidekiq', stackType: 'backend' },
    ],
    start: '2022-08' as YearMonth,
    end: '2025-12' as YearMonth,
    description: {
      title: 'Scalable backend & AI feature development',
      fulltext: `Built and maintained scalable backend and frontend solutions for a high-traffic e-commerce platform.

Designed and operated integration flows between internal systems and external services, including API design, data modelling, and PostgreSQL optimisation (indexing, schema improvements).

Contributed to CI/CD pipelines with GitHub Actions and Docker.

Collaborated closely with product owners, designers, and engineers in an agile team.

Built app and web interfaces in Flutter and Ruby on Rails / Turbo.`,
    },
  },
  {
    id: '3',
    role: 'Full Stack Developer',
    company: 'Ductus',
    stackType: 'fullstack',
    skills: [
      { presentation: 'Python (Flask)', stackType: 'backend' },
      { presentation: 'React', stackType: 'frontend' },
      { presentation: 'PostgreSQL', stackType: 'backend' },
      { presentation: 'REST API', stackType: 'backend' },
      { presentation: 'Swagger/OpenAPI', stackType: 'backend' },
      { presentation: 'Linux', stackType: 'backend' },
      { presentation: 'PowerShell', stackType: 'backend' },
    ],
    start: '2019-08' as YearMonth,
    end: '2022-08' as YearMonth,
    description: {
      title: 'IPAM system for major telecom client',
      fulltext: `Developed and maintained a business-critical IP address management (IPAM) system for a major telecom client — responsible for full-stack development, REST API design, and production operations.

Designed system architecture with a strong focus on correctness, reliability, and long-term maintainability.

Handled database migrations, troubleshooting, and production support on-site with the client.

Worked closely with the client on requirements gathering, wrote technical specifications, and translated business needs into implementable solutions.

Mentored a junior developer in backend practices, system architecture, and code quality during the final year.`,
    },
  },
  {
    id: '4',
    role: "Master's Thesis Student",
    company: 'Ductus',
    stackType: 'backend',
    skills: [
      { presentation: 'algorithms', stackType: 'backend' },
      { presentation: 'data extraction', stackType: 'backend' },
      { presentation: 'technical documentation', stackType: 'backend' },
      { presentation: 'constraint programming', stackType: 'backend' },
    ],
    start: '2019-01' as YearMonth,
    end: '2019-06' as YearMonth,
    description: {
      title: 'Automated data extraction algorithms',
      fulltext:`Developed and evaluated algorithms for automated extraction and validation of numerical data from complex documents.

Documented technical findings and presented improvement proposals for potential production use.`,
    },
  },
];
