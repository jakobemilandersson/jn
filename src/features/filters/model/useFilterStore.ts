import { create } from 'zustand'
import type { StackType } from '../../../entities/resume/types'

type FilterState = {
  stackType: StackType | null,
  skills: string[],
  strictSkillsMatch: boolean,
  setStackType: (s: StackType | null) => void
  toggleSkill: (skill: string) => void
  setSkills: (skills: string[]) => void
  setStrictSkillsMatch: (strict: boolean) => void,
  clear: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  stackType: null,
  skills: [],
  strictSkillsMatch: false,
  setStackType: (stackType) => set({ stackType }),
  toggleSkill: (skill) =>
    set((state) => ({
      skills: state.skills.includes(skill)
        ? state.skills.filter((s) => s !== skill)
        : [...state.skills, skill]
    })),
  setSkills: (skills) => set({ skills }),
  setStrictSkillsMatch: (strictSkillsMatch) => set({ strictSkillsMatch }),
  clear: () => set({ stackType: null, skills: [], strictSkillsMatch: false })
}))
