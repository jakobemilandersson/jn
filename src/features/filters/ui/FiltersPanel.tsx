import { StackTypeField } from "./StackTypeField";
import { SkillsField } from "./SkillsField";
import { StrictToggle } from "./StrictSkillsToggle";
import { ClearButton } from "./ClearButton";
import { DateIntervalField } from "./DateIntervalField";

export function FiltersPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-tight text-white">Filters</h2>
        <span className="text-[11px] text-white/40">Refine experience</span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="min-w-0"><StackTypeField /></div>
        <div className="min-w-0"><SkillsField /></div>
        <div className="min-w-0"><DateIntervalField /></div>
      </div>
      <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.08] pt-3 sm:flex-row sm:items-center sm:justify-between">
        <StrictToggle />
        <ClearButton />
      </div>
    </div>
  );
}
