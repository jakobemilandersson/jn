import type { Resume, YearMonth } from './types';

export const RESUME: Resume = {
  profile: {
    name: 'Jakob Andersson',
    title: 'Full-Stack Engineer',
    bio: "I'm a full-stack engineer based in Uppsala, Sweden. My background is in civil engineering — five years of studies and a master's degree — before I moved into software development. I'm comfortable across the stack, with a preference for backend work in Ruby on Rails, though the last year has been a deliberate push into frontend development with TypeScript and React Native.\n\nI'm genuinely excited about AI-first development — I use AI actively in my workflow, from structuring my own learning curriculum to building projects like this site. I believe working alongside AI is one of the most important skills an engineer can develop right now, and I'm making it a core part of how I build.",
    availability: 'Currently focused on personal projects and sharpening my JavaScript skills — open to freelance work if the project is interesting. Remote only.',
    contact: {
      email: 'jakobemilandersson@gmail.com',
      linkedin: 'https://www.linkedin.com/in/jakobemilandersson',
      github: 'https://github.com/jakobemilandersson',
    },
  },
  experiences: [
    {
      id: 'edu-bsc',
      kind: 'education',
      role: "Bachelor's in Civil Engineering IT",
      company: 'Uppsala University',
      subtitle: 'Uppsala University',
      stackType: 'backend',
      skills: [
        { presentation: 'algorithms', stackType: 'backend' },
        { presentation: 'data structures', stackType: 'backend' },
        { presentation: 'software development', stackType: 'fullstack' },
      ],
      start: '2014-08' as YearMonth,
      end: '2017-06' as YearMonth,
      description: {
        title: "Bachelor's degree in Civil Engineering IT",
        summary: 'Studied Civil Engineering IT at Uppsala University, covering software development, algorithms, data structures, and engineering fundamentals.',
        fulltext: 'Studied Civil Engineering IT at Uppsala University, covering software development, algorithms, data structures, and engineering fundamentals.',
      },
    },
    {
      id: 'edu-msc',
      kind: 'education',
      role: "Master's in Civil Engineering IT",
      company: 'Uppsala University',
      subtitle: 'Uppsala University',
      stackType: 'backend',
      skills: [
        { presentation: 'algorithms', stackType: 'backend' },
        { presentation: 'data structures', stackType: 'backend' },
        { presentation: 'software development', stackType: 'fullstack' },
        { presentation: 'technical documentation', stackType: 'backend' },
      ],
      start: '2017-08' as YearMonth,
      end: '2019-06' as YearMonth,
      description: {
        title: "Master's degree in Civil Engineering IT",
        summary: "Completed a Master's degree in Civil Engineering IT at Uppsala University. Concluded with a thesis on automated data extraction at Ductus.",
        fulltext: "Completed a Master's degree in Civil Engineering IT at Uppsala University. Concluded with a thesis on automated data extraction at Ductus.",
      },
    },
    {
      id: '4',
      kind: 'work',
      role: "Master's Thesis Student",
      company: 'Ductus',
      subtitle: 'Ductus',
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
        summary: 'Developed and evaluated algorithms for automated extraction and validation of numerical data from complex documents. Documented findings and presented improvement proposals for production use.',
        fulltext: `Developed and evaluated algorithms for automated extraction and validation of numerical data from complex documents.

Documented technical findings and presented improvement proposals for potential production use.`,
      },
    },
    {
      id: '3',
      kind: 'work',
      role: 'Full Stack Developer',
      company: 'Ductus',
      subtitle: 'Ductus',
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
        summary: 'Built and maintained a business-critical IPAM system for a major telecom client. Full-stack development, REST API design, database migrations, and production operations. Mentored a junior developer.',
        fulltext: `Developed and maintained a business-critical IP address management (IPAM) system for a major telecom client — responsible for full-stack development, REST API design, and production operations.

Designed system architecture with a strong focus on correctness, reliability, and long-term maintainability.

Handled database migrations, troubleshooting, and production support on-site with the client.

Worked closely with the client on requirements gathering, wrote technical specifications, and translated business needs into implementable solutions.

Mentored a junior developer in backend practices, system architecture, and code quality during the final year.`,
      },
    },
    {
      id: '2',
      kind: 'work',
      role: 'Full Stack Developer',
      company: 'Plick',
      subtitle: 'Plick',
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
        summary: 'Built scalable backend and frontend solutions for a high-traffic e-commerce platform. Designed integration flows, optimised PostgreSQL schemas, contributed to CI/CD pipelines, and built app and web interfaces.',
        fulltext: `Built and maintained scalable backend and frontend solutions for a high-traffic e-commerce platform.

Designed and operated integration flows between internal systems and external services, including API design, data modelling, and PostgreSQL optimisation (indexing, schema improvements).

Contributed to CI/CD pipelines with GitHub Actions and Docker.

Collaborated closely with product owners, designers, and engineers in an agile team.

Built app and web interfaces in Flutter and Ruby on Rails / Turbo.`,
      },
    },
    {
      id: '1',
      kind: 'work',
      role: 'IT Consultant',
      company: 'Independent',
      subtitle: 'Independent',
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
        summary: 'Founded and run an independent consultancy. Built a social mobile game from scratch for a client — covering architecture, real-time data modelling, UI, and international launch. Responsible for the full delivery chain.',
        fulltext: `Founded and run an independent consultancy focused on software development and technical advisory.

Built a social mobile game from scratch for a client — covering requirements gathering, architecture, real-time data modelling, UI, and international launch.

Responsible for the full delivery chain: technical decisions, client communication, and ongoing optimisation.`,
      },
    },
    {
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
        { presentation: 'Vite', stackType: 'frontend' },
        { presentation: 'Zustand', stackType: 'frontend' },
        { presentation: 'TailwindCSS', stackType: 'frontend' },
        { presentation: 'Vitest', stackType: 'fullstack' },
      ],
      start: '2025-01' as YearMonth,
      description: {
        title: 'Filter-driven resume explorer SPA',
        summary: 'Built a filter-driven resume explorer SPA using React, TypeScript, Vite, Zustand, and TailwindCSS. Mini-FSD architecture with strict layer boundaries, full CI, and TDD throughout.',
        fulltext: 'Built a filter-driven resume explorer SPA using React, TypeScript, Vite, Zustand, and TailwindCSS. Mini-FSD architecture with strict layer boundaries, full CI, and TDD throughout.',
      },
    },
  ],
};
