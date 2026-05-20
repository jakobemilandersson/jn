import { create } from 'zustand'
import type { StackType, YearMonth } from '@entities/resume'

type FilterState = {
  stackTypes: StackType[],
  skills: string[],
  strictSkillsMatch: boolean,
  dateFrom: YearMonth | null,
  dateTo: YearMonth | null,
  toggleStackType: (s: StackType) => void
  setStackTypes: (stackTypes: StackType[]) => void
  toggleSkill: (skill: string) => void
  setSkills: (skills: string[]) => void
  setStrictSkillsMatch: (strict: boolean) => void,
  setDateFrom: (date: YearMonth | null) => void,
  setDateTo: (date: YearMonth | null) => void,
  clear: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  stackTypes: [],
  skills: [],
  strictSkillsMatch: false,
  dateFrom: null,
  dateTo: null,
  toggleStackType: (stackType) =>
    set((state) => ({
      stackTypes: state.stackTypes.includes(stackType)
        ? state.stackTypes.filter((s) => s !== stackType)
        : [...state.stackTypes, stackType]
    })),
  setStackTypes: (stackTypes) => set({ stackTypes }),
  toggleSkill: (skill) =>
    set((state) => ({
      skills: state.skills.includes(skill)
        ? state.skills.filter((s) => s !== skill)
        : [...state.skills, skill]
    })),
  setSkills: (skills) => set({ skills }),
  setStrictSkillsMatch: (strictSkillsMatch) => set({ strictSkillsMatch }),
  setDateFrom: (dateFrom) => set({ dateFrom }),
  setDateTo: (dateTo) => set({ dateTo }),
  clear: () => set({ stackTypes: [], skills: [], strictSkillsMatch: false, dateFrom: null, dateTo: null })
}))
