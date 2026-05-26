export type StackType = 'fullstack' | 'backend' | 'frontend'

export type Skill = {
  presentation: string;
  stackType: "frontend" | "backend" | "fullstack";
};

export type WorkExperienceDescription = {
  title: string;
  summary: string;
  fulltext: string;
};

/** A month+year string in "YYYY-MM" format, e.g. "2024-03". */
export type YearMonth = string & { readonly __brand: 'YearMonth' };

export type ExperienceKind = 'work' | 'education' | 'project';

export type WorkExperience = {
  id: string;
  kind: ExperienceKind;
  role: string;
  company: string;
  subtitle?: string;
  stackType: StackType;
  skills: Skill[];
  start: YearMonth;
  end?: YearMonth;
  url?: string;
  description?: WorkExperienceDescription | null;
}

export type ResumeProfile = {
  name: string;
  title: string;
  bio: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
};

export type Resume = {
  profile: ResumeProfile;
  experiences: WorkExperience[];
};
