import { create } from 'zustand'
import type { StackType } from '@entities/resume'

type FilterState = {
  stackTypes: StackType[],
  skills: string[],
  strictSkillsMatch: boolean,
  toggleStackType: (s: StackType) => void
  toggleSkill: (skill: string) => void
  setSkills: (skills: string[]) => void
  setStrictSkillsMatch: (strict: boolean) => void,
  clear: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  stackTypes: [],
  skills: [],
  strictSkillsMatch: false,
  toggleStackType: (stackType) =>
    set((state) => ({
      stackTypes: state.stackTypes.includes(stackType)
        ? state.stackTypes.filter((s) => s !== stackType)
        : [...state.stackTypes, stackType]
    })),
  toggleSkill: (skill) =>
    set((state) => ({
      skills: state.skills.includes(skill)
        ? state.skills.filter((s) => s !== skill)
        : [...state.skills, skill]
    })),
  setSkills: (skills) => set({ skills }),
  setStrictSkillsMatch: (strictSkillsMatch) => set({ strictSkillsMatch }),
  clear: () => set({ stackTypes: [], skills: [], strictSkillsMatch: false })
}))
