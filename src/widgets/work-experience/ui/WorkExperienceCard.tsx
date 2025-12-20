import type { WorkExperience, StackType } from '@entities/resume'
import { SkillChip } from '@shared/ui'
import { classifySkills } from '@widgets/work-experience'

type Props = {
  experience: WorkExperience
  selectedSkills: string[]
  selectedStackType: StackType | null
}

export function WorkExperienceCard({
  experience,
  selectedSkills,
  selectedStackType,
}: Props) {
  const { matched, related, other, matchStrength } = classifySkills({
    experience,
    selectedSkills,
    selectedStackType,
  })

  const nonMatched = [...related, ...other]

  return (
    <article className="p-4 border rounded space-y-3">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">
            {experience.role} — {experience.company}
          </h3>

          <p className="text-sm text-slate-600">
            {experience.start} — {experience.end ?? 'Present'}
          </p>
        </div>
        <div>
          {matchStrength && (
            <p className="text-xs text-slate-500 py-1">
              Matches {matchStrength.matched} of {matchStrength.total} selected skills
            </p>
          )}
        </div>
      </div>

      {experience.description && (
        <p>{experience.description}</p>
      )}

      <div className="py-1" />

      {matched.length > 0 && (
        <>
          <h5 className="text-sm font-medium">Matched skills</h5>
          <div className="flex flex-wrap gap-1">
            {matched.map((skill) => (
              <SkillChip
                key={skill.presentation}
                skill={skill}
              />
            ))}
          </div>
        </>
      )}

      {nonMatched.length > 0 && (
        <>
          <h5 className="text-sm font-medium opacity-60">Other skills</h5>
          <div className="flex flex-wrap gap-1 opacity-60">
            {nonMatched.map((skill) => (
              <SkillChip
                key={skill.presentation}
                skill={skill}
              />
            ))}
          </div>
        </>
      )}
    </article>
  )
}
