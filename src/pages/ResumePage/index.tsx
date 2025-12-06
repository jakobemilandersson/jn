import React, { useMemo } from 'react'
import Dropdown from '../../shared/ui/Dropdown'
import MultiSelect from '../../shared/ui/MultiSelect'
import { useFilterStore } from '../../features/filters/model/useFilterStore'
import { RESUME } from '../../entities/resume/data'
import type { WorkExperience } from '../../entities/resume/types'

const SKILL_OPTIONS = Array.from(new Set(RESUME.flatMap((r) => r.skills))).sort()

export default function ResumePage() {
  const stackType = useFilterStore((s) => s.stackType)
  const setStackType = useFilterStore((s) => s.setStackType)
  const skills = useFilterStore((s) => s.skills)
  const toggleSkill = useFilterStore((s) => s.toggleSkill)
  const clear = useFilterStore((s) => s.clear)

  const handleSearch = () => {
    // optional side effect: could focus results; filtering is done in derived state below
  }

  const results = useMemo(() => {
    return RESUME.filter((r) => {
      if (stackType && r.stackType !== stackType) return false
      if (skills.length > 0) {
        return skills.every((s) => r.skills.includes(s))
      }
      return true
    })
  }, [stackType, skills])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Jakob — Interactive Resume</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Dropdown
          label="Stack type"
          value={stackType}
          onChange={(v) => setStackType(v as any)}
          options={[
            { value: 'fullstack', label: 'Fullstack' },
            { value: 'backend', label: 'Backend' },
            { value: 'frontend', label: 'Frontend' }
          ]}
        />

        <MultiSelect label="Skills" options={SKILL_OPTIONS} selected={skills} onToggle={toggleSkill} />

        <div className="flex items-end">
          <div className="space-x-2">
            <button onClick={handleSearch} className="px-4 py-2 rounded bg-slate-800 text-white">
              Search
            </button>
            <button onClick={clear} className="px-4 py-2 rounded border">
              Clear
            </button>
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
