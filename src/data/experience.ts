import { ExperienceItem, EducationItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    id: 'freelance-senior',
    versionTag: 'v4.0.0',
    commitHash: 'c74f81a',
    role: 'Senior Software Developer & AI Systems Engineer',
    company: 'Independent / Freelance',
    period: 'Jan 2024 — Present',
    current: true,
    type: 'Freelance',
    description:
      'Building and shipping cloud platforms, AI toolchains, and high-concurrency backend services for clients across different industries.',
    highlights: [
      'Engineered an AI-driven NestJS boilerplate CLI synthesizing clean CQRS architectures, reducing scaffolding time by 85%',
      'Built custom Go-based desktop automation utilities with bounded worker pools handling batch digital media processing',
      'Developed multimodal translation workflows integrating OpenAI Whisper, Vision OCR, and streaming server-sent events',
      'Architected cloud-native microservices with Docker, MongoDB, and PostgreSQL on GCP',
    ],
    technologies: ['Go (Golang)', 'TypeScript', 'Node.js', 'NestJS', 'Next.js 15', 'OpenAI', 'GCP', 'Docker', 'PostgreSQL'],
    keyMetrics: ['85% Scaffolding Speedup', '10x Go Concurrency', 'Zero-Downtime Releases'],
  },
  {
    id: 'eten-fullstack',
    versionTag: 'v3.0.0',
    commitHash: 'a19e42c',
    role: 'FullStack Developer',
    company: 'Eten',
    period: 'Nov 2021 — Jan 2024',
    type: 'Full-time',
    description:
      'Led core web application features, backend APIs, and high-performance reactive interfaces for fast-growing products.',
    highlights: [
      'Developed scalable RESTful APIs with Node.js and TypeScript adhering to clean architecture and domain-driven design',
      'Engineered high-performance React and Next.js user interfaces with complex state management and responsive styling',
      'Streamlined database schema design, indexing, and query performance in MongoDB and PostgreSQL',
      'Collaborated in agile sprint cycles, code reviews, and automated CI/CD pipeline deployments',
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    keyMetrics: ['40% Query Latency Reduction', '99.9% Uptime', 'Agile CI/CD Delivery'],
  },
  {
    id: 'happyhero-fullstack',
    versionTag: 'v2.0.0',
    commitHash: '8e5b10d',
    role: 'FullStack Developer',
    company: 'Happy Hero',
    period: 'Jan 2020 — Oct 2021',
    type: 'Full-time',
    description:
      'Built full-stack features, client dashboards, and real-time notification services across multiple products.',
    highlights: [
      'Integrated third-party APIs and payment processors with fault-tolerant retry handling and webhook auditing',
      'Optimized frontend asset loading and bundle sizes to enhance page speed and user engagement',
      'Implemented real-time messaging and event-driven data flow across client web portals',
    ],
    technologies: ['JavaScript', 'TypeScript', 'Node.js', 'React', 'Firebase', 'MySQL', 'WebSockets'],
    keyMetrics: ['Sub-second Page Loads', 'Fault-Tolerant Webhook Queue', 'Real-Time Sync'],
  },
  {
    id: 'kavazak-backend',
    versionTag: 'v1.0.0',
    commitHash: '3d9a117',
    role: 'Backend Developer',
    company: 'Kavazak',
    period: 'Jan 2013 — Jan 2020',
    type: 'Full-time',
    description:
      'Started here as a backend developer — built and maintained the foundational web services, database schemas, and Linux infrastructure that kept the company running for 7 years.',
    highlights: [
      '7 years of foundational backend software engineering spanning high-volume relational databases, REST APIs, and core architectures',
      'Architected robust relational database schemas in MySQL/PostgreSQL with rigorous constraint integrity and query indexing',
      'Configured and maintained Linux servers, Nginx reverse proxies, caching layers, and deployment scripts',
      'Diagnosed and eliminated performance bottlenecks in legacy backend services',
    ],
    technologies: ['Go', 'JavaScript', 'Node.js', 'MySQL', 'PostgreSQL', 'Nginx', 'Linux / Bash', 'REST APIs'],
    keyMetrics: ['7 Years Continuous Service', '10M+ Database Records Handled', 'Linux / SysAdmin'],
  },
];

export const educationList: EducationItem[] = [
  {
    id: 'pnu-degree',
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'PNU University',
    period: '2009 — 2014',
    details:
      'Rigorous foundation in computer science theory, algorithms, data structures, computer networks, distributed systems, operating systems, and discrete mathematics.',
    coreSubjects: [
      'Data Structures & Algorithms',
      'Distributed Systems & Networking',
      'Operating Systems & Concurrency',
      'Database Architecture & SQL',
      'Software Design Patterns & OOP',
    ],
  },
];
