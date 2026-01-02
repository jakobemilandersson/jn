import type { WorkExperience, StackType, Skill } from "@entities/resume";
import { SkillChip } from "@shared/ui";
import { classifySkills } from "@widgets/work-experience";
import { mapSkillToChipProps } from "@features/filters";
import type { ReactNode } from "react";

type Props = {
  experience: WorkExperience;
  selectedSkills: string[];
  selectedStackType: StackType | null;
  onSkillPressed?: (skill: Skill) => void;
};

export function WorkExperienceCard({
  experience,
  selectedSkills,
  selectedStackType,
  onSkillPressed,
}: Props) {
  const { matched, related, other, matchStrength } = classifySkills({
    experience,
    selectedSkills,
    selectedStackType,
  });

  const nonMatched = [...related, ...other];

  const skillChips = (skills: Skill[]): ReactNode[] => skills.map((skill) => {
    const { label, variant } = mapSkillToChipProps(
      skill,
      skill.presentation
    );

    const chip = <SkillChip
      key={skill.presentation}
      label={label}
      variant={variant}
    />

    const wrappedChip = (onSkillPressed && false) ? (
      <button
        type="button"
        onClick={(_) => onSkillPressed!(skill)}
        aria-label={`Filter by ${skill.presentation}`}
      >
        {chip}
      </button>
    ) : chip;

    return wrappedChip;
  })

  return (
    <article className="p-4 border rounded space-y-3">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">
            {experience.role} — {experience.company}
          </h3>

          <p className="text-sm text-slate-600">
            {experience.start} — {experience.end ?? "Present"}
          </p>
        </div>

        {matchStrength && (
          <p className="text-xs text-slate-500 py-1">
            Matches {matchStrength.matched} of {matchStrength.total} selected skills
          </p>
        )}
      </div>

      {experience.description && <p>{experience.description}</p>}

      <div className="py-1" />

      {selectedSkills.length > 0 ? (
        <>
          {matched.length > 0 && (
            <>
              <h5 className="text-sm font-medium">Matched skills</h5>
              <div className="flex flex-wrap gap-1">
                {skillChips(matched)}
              </div>
            </>
          )}

          {nonMatched.length > 0 && (
            <>
              <h5 className="text-sm font-medium opacity-60">Other skills</h5>
              <div className="flex flex-wrap gap-1 opacity-60">
                {skillChips(nonMatched)}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h5 className="text-sm font-medium">Skills</h5>
          <div className="flex flex-wrap gap-1">
            {skillChips(nonMatched)}
          </div>
        </>
      )}
    </article>
  );
}
