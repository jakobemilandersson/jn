import { StackTypeField } from "./StackTypeField";
import { SkillsField } from "./SkillsField";
import { StrictToggle } from "./StrictSkillsToggle";
import { ClearButton } from "./ClearButton";
import { DateIntervalField } from "./DateIntervalField";

const fields = [
  { number: "01", title: "Stack", description: "Choose the kind of engineering work" },
  { number: "02", title: "Skills", description: "Find specific technologies" },
  { number: "03", title: "Timeline", description: "Narrow by time period" },
];

export function FiltersPanel() {
  const controls = [<StackTypeField key="stack" />, <SkillsField key="skills" />, <DateIntervalField key="date" />];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-3">
      {controls.map((field, index) => (
        <section key={fields[index].number} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-white/20 sm:p-5">
          <div className="mb-4 flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/20 font-mono text-xs text-sky-200/80">{fields[index].number}</span>
            <div><h3 className="text-sm font-semibold text-white">{fields[index].title}</h3><p className="mt-1 text-xs leading-relaxed text-white/40">{fields[index].description}</p></div>
          </div>
          {field}
        </section>
      ))}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 md:col-span-3">
        <StrictToggle />
        <ClearButton />
      </div>
    </div>
  );
}
