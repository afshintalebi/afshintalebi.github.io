export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectBenchmark {
  label: string;
  before: string;
  after: string;
  delta: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'ai' | 'backend' | 'fullstack' | 'automation';
  role: string;
  impact: string;
  technologies: string[];
  features: string[];
  metrics?: ProjectMetric[];
  benchmarks?: ProjectBenchmark[];
  architecture?: string;
  challenges?: string[];
  architectureSummary?: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  accentColor?: string;
}

export interface ExperienceItem {
  id: string;
  versionTag: string;
  commitHash: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  current?: boolean;
  type: 'Full-time' | 'Freelance' | 'Contract';
  description: string;
  highlights: string[];
  technologies: string[];
  keyMetrics?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
  coreSubjects?: string[];
}

export interface SkillItem {
  name: string;
  level: string;
  proficiency: number; // 0 to 100 for animation bars
  years: number;
  highlight?: boolean;
  category: string;
  tags?: string[];
  architectureUse?: string;
  color?: string;
}

export interface SkillCategory {
  layer: string;
  title: string;
  iconName: string;
  description: string;
  skills: SkillItem[];
}
