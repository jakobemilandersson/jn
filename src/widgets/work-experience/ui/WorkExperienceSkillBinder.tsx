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

export function WorkExperienceSkillBinder({ experience, selectedSkills, selectedStackTypes, isOpen, onOpen, onClose, position }: Props) {
  const { toggleSkill } = useFilterStore();
  const { matched } = classifySkills({ experience, selectedSkills, selectedStackTypes });
  const hasActiveFilters = selectedSkills.length > 0 || selectedStackTypes.length > 0;
  const matchCount = matched.length;
  const matchLabel = selectedSkills.length > 0 ? `${matchCount} / ${selectedSkills.length} skills matched` : `${selectedStackTypes.length} stack ${selectedStackTypes.length === 1 ? "filter" : "filters"}`;
  const handleSkillPress = (skill: Skill) => toggleSkill(skill.presentation);

  return (
    <div className="group relative">
      <div className="mb-2 flex items-center justify-between gap-3 px-2">
        <div className="flex min-w-0 items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-[11px] text-white/40">{position ? position.toString().padStart(2, "0") : "↳"}</span><span className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{hasActiveFilters ? "Skill relevance" : "Experience"}</span></div>
        {hasActiveFilters && <span className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${matchCount > 0 ? "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200" : "border-white/10 bg-white/[0.04] text-white/45"}`}><span className={`h-1.5 w-1.5 rounded-full ${matchCount > 0 ? "bg-emerald-300" : "bg-white/30"}`} />{matchLabel}</span>}
      </div>
      <WorkExperienceCard experience={experience} selectedSkills={selectedSkills} selectedStackTypes={selectedStackTypes} onSkillPressed={handleSkillPress} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
}
