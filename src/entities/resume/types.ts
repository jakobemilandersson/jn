export type StackType = 'fullstack' | 'backend' | 'frontend'

export type Skill = string

export type WorkExperience = {
  id: string
  role: string
  company: string
  stackType: StackType
  skills: Skill[]
  start: string
  end?: string
  description?: string
}
