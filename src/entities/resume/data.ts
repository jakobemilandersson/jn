import { WorkExperience } from './types';

export const RESUME: WorkExperience[] = [
  {
    id: '1',
    role: 'Full Stack Developer',
    company: 'Plick',
    stackType: 'fullstack',
    skills: [
      'ruby on rails',
      'python',
      'flask',
      'react',
      'flutter',
      'postgresql',
      'mysql',
      'api design',
      'integrations',
      'docker',
      'github actions',
      'performance optimisation',
      'system architecture',
      'data modelling',
      'testing',
      'minitest',
      'capybara',
      'factorybot',
      'background jobs'
    ],
    start: '2022-08',
    end: 'present',
    description:
      'Built and maintained scalable backend systems for a high-traffic e-commerce platform. Designed integrations with external services, optimized database performance, contributed to CI/CD workflows, and led development of AI-assisted upload features improving engagement and cutting upload time by half.'
  },

  {
    id: '2',
    role: 'IT Consultant',
    company: 'Independent Consultant',
    stackType: 'fullstack',
    skills: [
      'architecture',
      'requirements',
      'system design',
      'flutter',
      'rails',
      'testing',
      'typescript',
      'javascript'
    ],
    start: '2025-01',
    end: 'present',
    description:
      'Managed full development lifecycle for client projects, including requirements, architecture, implementation, and optimization. Built a social mobile game from scratch, owning all technical decisions from concept to launch.'
  },

  {
    id: '3',
    role: 'Software Engineer / Technical Advisor',
    company: 'Independent Consultant',
    stackType: 'backend',
    skills: [
      'architecture',
      'api design',
      'requirements gathering',
      'technical advising',
      'performance optimization'
    ],
    start: '2025-01',
    end: 'present',
    description:
      'Provided software engineering and technical advisory services, working closely with clients on architecture, requirements, and performance-oriented backend development.'
  },

  {
    id: '4',
    role: 'Full Stack Developer',
    company: 'Ductus',
    stackType: 'backend',
    skills: [
      'python',
      'flask',
      'rest api',
      'postgresql',
      'system integration',
      'data modelling',
      'production support',
      'testing',
      'documentation',
      'performance optimisation'
    ],
    start: '2019-08',
    end: '2022-08',
    description:
      'Developed and maintained an IP address management (IPAM) system for a major telecom client. Built REST APIs, refined database structures, optimized performance, handled production support, and mentored a junior developer.'
  }
];
