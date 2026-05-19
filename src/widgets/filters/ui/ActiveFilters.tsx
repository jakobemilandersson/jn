import { useFilterStore, mapSkillToChipProps, STACK_TYPE_LABELS } from "@features/filters";
import { resolveSkill } from "@entities/resume";
import { SkillChip } from "@shared/ui";
import type { StackType } from "@entities/resume";

export function ActiveFilters() {
  const { skills, toggleSkill, stackTypes, toggleStackType } = useFilterStore((s) => ({
    skills: s.skills,
    toggleSkill: s.toggleSkill,
    stackTypes: s.stackTypes,
    toggleStackType: s.toggleStackType,
  }));

  const visible = skills.length > 0 || stackTypes.length > 0;

  return (
    <div
      aria-live="polite"
      className={[
        "overflow-hidden transition-all duration-200 ease-in-out",
        visible ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 pt-2">
        {stackTypes.length > 0 && (
          <div aria-labelledby="active-filters-stack-label" className="flex flex-col gap-1.5">
            <span
              id="active-filters-stack-label"
              className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide"
            >
              Stack type
            </span>
            <div className="flex flex-wrap gap-2">
              {stackTypes.map((value: StackType) => (
                <button
                  key={`stack-${value}`}
                  type="button"
                  onClick={() => toggleStackType(value)}
                  aria-label={`Remove ${STACK_TYPE_LABELS[value]} filter`}
                  className="group inline-flex items-center gap-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-400"
                >
                  <SkillChip label={STACK_TYPE_LABELS[value]} variant={value} />
                  <span
                    aria-hidden="true"
                    className="text-xs text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors"
                  >
                    ×
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div aria-labelledby="active-filters-skills-label" className="flex flex-col gap-1.5">
            <span
              id="active-filters-skills-label"
              className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide"
            >
              Skills
            </span>
            <div className="flex flex-wrap gap-2">
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
        )}
      </div>
    </div>
  );
}
