import { create } from 'zustand'
import type { StackType } from '../../../entities/resume/types'

type FilterState = {
  stackType: StackType | null,
  skills: string[]
  setStackType: (s: StackType | null) => void
  toggleSkill: (skill: string) => void
  setSkills: (skills: string[]) => void
  clear: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  stackType: null,
  skills: [],
  setStackType: (stackType) => set({ stackType }),
  toggleSkill: (skill) =>
    set((state) => ({
      skills: state.skills.includes(skill)
        ? state.skills.filter((s) => s !== skill)
        : [...state.skills, skill]
    })),
  setSkills: (skills) => set({ skills }),
  clear: () => set({ stackType: null, skills: [] })
}))
