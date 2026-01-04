export type StackType = 'fullstack' | 'backend' | 'frontend'

export type Skill = {
  presentation: string;
  stackType: "frontend" | "backend" | "fullstack";
};

export type WorkExperienceDescription = {
  title: string;
  fulltext: string;
};

export type WorkExperience = {
  id: string
  role: string
  company: string
  stackType: StackType
  skills: Skill[]
  start: string
  end?: string
  description?: WorkExperienceDescription | null
}
