export type StackType = 'fullstack' | 'backend' | 'frontend'

export type Skill = {
  presentation: string;
  stackType: "frontend" | "backend" | "fullstack";
};

export type WorkExperienceDescription = {
  title: string;
  fulltext: string;
};

/** A month+year string in "YYYY-MM" format, e.g. "2024-03". */
export type YearMonth = string & { readonly __brand: 'YearMonth' };

export type WorkExperience = {
  id: string
  role: string
  company: string
  stackType: StackType
  skills: Skill[]
  start: YearMonth
  end?: YearMonth
  description?: WorkExperienceDescription | null
}
