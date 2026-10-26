import type { Skill, StackType, WorkExperience } from "@entities/resume";
import { useFilterStore } from "@features/filters";
import { WorkExperienceCard, classifySkills } from "@widgets/work-experience";

type Props = {
  experience: WorkExperience;
  selectedSkills: string[];
  selectedStackTypes: StackType[];
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  position?: number;
};

export function WorkExperienceSkillBinder({
  experience,
  selectedSkills,
  selectedStackTypes,
  isOpen,
  onOpen,
  onClose,
  position,
}: Props) {
  const { toggleSkill } = useFilterStore();
  const { matched } = classifySkills({
    experience,
    selectedSkills,
    selectedStackTypes,
  });

  const handleSkillPress = (skill: Skill) => {
    toggleSkill(skill.presentation);
  };

  const hasActiveFilters = selectedSkills.length > 0 || selectedStackTypes.length > 0;
  const matchCount = matched.length;
  const matchLabel = selectedSkills.length > 0
    ? `${matchCount} / ${selectedSkills.length} skills matched`
    : `${selectedStackTypes.length} stack ${selectedStackTypes.length === 1 ? "filter" : "filters"}`;

  return (
    <div className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.055] via-white/[0.025] to-transparent p-2 transition duration-300 hover:border-sky-200/25 hover:shadow-[0_18px_60px_-32px_rgba(56,189,248,0.3)] sm:p-3">
      <div aria-hidden="true" className="absolute inset-y-5 left-0 w-px bg-gradient-to-b from-sky-300/0 via-sky-300/60 to-violet-300/0 opacity-60 transition group-hover:opacity-100" />
      <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-1 sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/20 font-mono text-xs text-slate-400">
            {position ? position.toString().padStart(2, "0") : "↳"}
          </span>
          <span className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {hasActiveFilters ? "Skill relevance" : "Experience"}
          </span>
        </div>
        {hasActiveFilters ? (
          <span className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${matchCount > 0 ? "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200" : "border-white/10 bg-white/[0.04] text-slate-400"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${matchCount > 0 ? "bg-emerald-300" : "bg-slate-500"}`} />
            {matchLabel}
          </span>
        ) : (
          <span className="hidden text-xs text-slate-500 sm:inline">Role details <span aria-hidden="true">↗</span></span>
        )}
      </div>
      <WorkExperienceCard
        experience={experience}
        selectedSkills={selectedSkills}
        selectedStackTypes={selectedStackTypes}
        onSkillPressed={handleSkillPress}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </div>
  );
}
