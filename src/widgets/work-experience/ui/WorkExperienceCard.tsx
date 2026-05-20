import type { WorkExperience, StackType, Skill } from "@entities/resume";
import { SkillChip, DescriptionSheet } from "@shared/ui";
import { classifySkills } from "@widgets/work-experience";
import { mapSkillToChipProps } from "@features/filters";
import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  experience: WorkExperience;
  selectedSkills: string[];
  selectedStackTypes: StackType[];
  onSkillPressed?: (skill: Skill) => void;
};

export function WorkExperienceCard({
  experience,
  selectedSkills,
  selectedStackTypes,
  onSkillPressed,
}: Props) {
  const { matched, related, other, matchStrength } = classifySkills({
    experience,
    selectedSkills,
    selectedStackTypes,
  });

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const nonMatched = [...related, ...other];

  const skillChips = (skills: Skill[]): ReactNode[] =>
    skills.map((skill) => {
      const { label, variant } = mapSkillToChipProps(skill, skill.presentation);

      const chip = (
        <SkillChip
          key={skill.presentation}
          label={label}
          variant={variant}
        />
      );

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
    });

  const hasDescription =
    experience.description?.title || experience.description?.fulltext;

  const sheetTitle = `${experience.role} — ${experience.company}`;

  return (
    <>
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

        {/* Description title — opens sheet on click */}
        {hasDescription && (
          <button
            type="button"
            aria-label={`Read full description for ${sheetTitle}`}
            aria-haspopup="dialog"
            onClick={() => setIsSheetOpen(true)}
            className="
              group w-full rounded-md border border-gray-200
              bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600
              px-4 py-3 text-left shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
            "
          >
            <p className="text-sm font-medium leading-snug text-white">
              {experience.description?.title}
            </p>
            <p aria-hidden="true" className="mt-2 text-xs text-white/50 group-hover:text-white/70 transition-colors">
              Read more →
            </p>
          </button>
        )}

        <div className="py-1" />

        {selectedSkills.length > 0 ? (
          <>
            {matched.length > 0 && (
              <>
                <h5 className="text-sm font-medium">Matched skills</h5>
                <div className="flex flex-wrap gap-1">{skillChips(matched)}</div>
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
            <div className="flex flex-wrap gap-1">{skillChips(nonMatched)}</div>
          </>
        )}
      </article>

      {hasDescription && (
        <DescriptionSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          title={sheetTitle}
        >
          {experience.description?.title && (
            <p className="mb-4 text-sm font-semibold text-white/90 leading-snug">
              {experience.description.title}
            </p>
          )}
          {experience.description?.fulltext && (
            <p className="whitespace-pre-line text-sm leading-relaxed text-white/80">
              {experience.description.fulltext}
            </p>
          )}
        </DescriptionSheet>
      )}
    </>
  );
}
