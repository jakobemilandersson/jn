import React, { useMemo } from 'react'
import { StackTypeDropdown, ClearButton } from '../../features/filters'
import { useFilterStore } from '../../features/filters/model/useFilterStore'
import type { WorkExperience } from '../../entities/resume/types'
import { applyFilter } from '../../features/filters/lib/applyFilters'
import { SkillsSearchableMultiSelect } from '../../features/filters/ui/SkillsField'

export default function ResumePage() {
  const stackType = useFilterStore((s) => s.stackType)
  const skills = useFilterStore((s) => s.skills)

  const results = useMemo(() => {
    return applyFilter(stackType, skills);
  }, [stackType, skills])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Jakob — Interactive Resume</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StackTypeDropdown />
        <SkillsSearchableMultiSelect />
        <div className="flex items-end">
          <div className="space-x-2">
            <ClearButton />
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold">Results ({results.length})</h2>
        <div className="mt-4 space-y-4">
          {results.map((r: WorkExperience) => (
            <article key={r.id} className="p-4 border rounded">
              <h3 className="font-medium">{r.role} — {r.company}</h3>
              <p className="text-sm text-slate-600">{r.start} — {r.end ?? 'Present'}</p>
              <p className="mt-2">{r.description}</p>
              <p className="mt-2 text-sm">Skills: {r.skills.join(', ')}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
