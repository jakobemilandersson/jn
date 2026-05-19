import { useFilterStore, mapSkillToChipProps } from "@features/filters";
import { resolveSkill } from "@entities/resume";
import { SkillChip } from "@shared/ui";

export function ActiveSkillFilters() {
  const { skills, toggleSkill } = useFilterStore((s) => ({
    skills: s.skills,
    toggleSkill: s.toggleSkill,
  }));

  const visible = skills.length > 0;

  return (
    <div
      aria-live="polite"
      className={[
        "overflow-hidden transition-all duration-200 ease-in-out",
        // max-h-96 (384px) gives ample room for many wrapped chips before clipping
        visible ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
      ].join(" ")}
    >
      <div className="flex flex-wrap gap-2 pt-2">
        {skills.map((value) => {
          const skill = resolveSkill(value);
          const { label, variant } = mapSkillToChipProps(skill, value);

          return (
            <button
              key={value}
              type="button"
              onClick={() => toggleSkill(value)}
              aria-label={`Remove ${label} filter`}
              className="group inline-flex items-center gap-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-400"
            >
              <SkillChip label={label} variant={variant} />
              <span
                aria-hidden="true"
                className="text-xs text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors"
              >
                ×
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
