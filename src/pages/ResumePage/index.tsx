import React, { useMemo } from 'react'
import { StackTypeDropdown, ClearButton } from '../../features/filters'
import { useFilterStore } from '../../features/filters/model/useFilterStore'
import type { WorkExperience } from '../../entities/resume/types'
import { applyFilters } from '../../features/filters/lib/applyFilters'
import { SkillsField } from '../../features/filters/ui/SkillsField'
import { StrictToggle } from '../../features/filters/ui/StrictSkillsToggle'
import { RESUME } from '../../entities/resume'
import { WorkExperienceCard } from '../../widgets/work-experience/ui/WorkExperienceCard'

export default function ResumePage() {
  const stackType = useFilterStore((s) => s.stackType)
  const skills = useFilterStore((s) => s.skills)
  const strictSkills = useFilterStore((s) => s.strictSkillsMatch)

  const results = useMemo(() => {
    return applyFilters(RESUME, stackType, skills, strictSkills);
  }, [stackType, skills, strictSkills])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Jakob — Interactive Resume</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StackTypeDropdown />
        <SkillsField />
        <div className="flex flex-col justify-end gap-2">
          <StrictToggle />
          <div className="space-x-2">
            <ClearButton />
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold">Results ({results.length})</h2>
        <div className="mt-4 space-y-4">
          {results.map((r: WorkExperience) => (
            <WorkExperienceCard
              key={r.id}
              experience={r}
              selectedSkills={skills}
              selectedStackType={stackType}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
