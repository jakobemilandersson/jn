import type { WorkExperience, StackType, Skill } from "@entities/resume";
import { SkillChip } from "@shared/ui";
import { classifySkills } from "@widgets/work-experience";
import { mapSkillToChipProps } from "@features/filters";
import type { ReactNode } from "react";
import { useState } from "react";

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

  const [isOpen, setIsOpen] = useState(false);
  const descriptionId = `work-exp-${experience.id}-desc`;

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

    const wrappedChip = onSkillPressed ? (
      <button
        key={`wrapped-${skill.presentation}`}
        type="button"
        onClick={(_) => onSkillPressed(skill)}
        aria-label={`Filter by ${skill.presentation}`}
      >
        {chip}
      </button>
    ) : chip;

    return wrappedChip;
  })

  const fulltext = experience.description?.fulltext ?? "";

  const previewText = fulltext
    .trim()
    .replace(/\n{3,}/g, "\n\n");

  const previewLineCount = previewText.split("\n").length;

  const shouldFadeWhenCollapsed =
    !isOpen && previewLineCount >= 3;


  return (
    <article className="space-y-3 rounded border p-4 bg-gray-800/50 text-white shadow-sm">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">
            {experience.role} — {experience.company}
          </h3>

          <p className="text-xs text-slate-600 text-white/80">
            {experience.start} — {experience.end ?? "Present"}
          </p>
        </div>

        {matchStrength && (
          <p className="py-1 text-xs text-slate-500">
            Matches {matchStrength.matched} of {matchStrength.total} selected
            skills
          </p>
        )}
      </div>

      {/* Description well */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={descriptionId}
        onClick={() => setIsOpen((v) => !v)}
        className={`
          group w-full rounded-md border border-gray-200
          bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600
          px-4 py-3 text-left shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
        `}
        >
        <p className="text-sm font-medium leading-snug text-white">
          {experience.description?.title}
        </p>
        {/* Expandable text container */}
        <div
          id={descriptionId}
          aria-hidden={!isOpen}
          className={`relative mt-2 overflow-hidden transition-[max-height] duration-700 ease-in-out ${
            isOpen ? "max-h-[999px]" : "max-h-[4.875em]"
          }`}
        >
          {(() => {
            const fulltext = experience.description?.fulltext ?? "";

            const previewText = fulltext
              .trim()
              .replace(/\n{3,}/g, "\n\n");

            return (
              <div className="whitespace-pre-line text-sm leading-relaxed text-white">
                {isOpen ? fulltext : previewText}
              </div>
            );
          })()}
          {/* Multi-stop fade overlay (collapsed only) */}
          {shouldFadeWhenCollapsed && (
            <div
              aria-hidden
              className="
                pointer-events-none absolute inset-x-0 bottom-0
                h-[4.875em]
                bg-gradient-to-b/20
                from-transparent
                to-gray-50/20
                transition-opacity duration-500 ease-in-out
                opacity-100
              "
            />
          )}
          </div>
        </button>

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
