import type { WorkExperience, StackType, Skill } from "@entities/resume";
import { SkillChip } from "@shared/ui";
import { classifySkills } from "@widgets/work-experience";
import { mapSkillToChipProps } from "@features/filters";

type Props = {
  experience: WorkExperience;
  selectedSkills: string[];
  selectedStackTypes: StackType[];
  onSkillPressed?: (skill: Skill) => void;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export function WorkExperienceCard({ experience, selectedSkills, selectedStackTypes, onSkillPressed, isOpen = false, onOpen, onClose }: Props) {
  const { matched, related, other } = classifySkills({ experience, selectedSkills, selectedStackTypes });
  const hasDescription = Boolean(experience.description?.title || experience.description?.fulltext);
  const hasSkills = experience.skills.length > 0;
  const hasLinks = Boolean(experience.links?.length);
  const hasDetails = hasDescription || hasSkills;
  const title = `${experience.role} — ${experience.company}`;
  const remainingSkills = [...related, ...other];

  const handleToggle = () => isOpen ? onClose?.() : onOpen?.();
  const skillChips = (skills: Skill[]) => skills.map((skill) => {
    const { label, variant } = mapSkillToChipProps(skill, skill.presentation);
    const chip = <SkillChip key={skill.presentation} label={label} variant={variant} />;
    return onSkillPressed ? (
      <button key={`filter-${skill.presentation}`} type="button" onClick={() => onSkillPressed(skill)} aria-label={`Filter by ${skill.presentation}`} className="rounded-full transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">{chip}</button>
    ) : chip;
  });

  return (
    <article
      tabIndex={hasDetails ? 0 : undefined}
      aria-label={hasDetails ? `Toggle details for ${title}` : undefined}
      aria-expanded={hasDetails ? isOpen : undefined}
      onClick={(event) => {
        if (!hasDetails || (event.target as HTMLElement).closest("a, button, input, select, textarea, [role='button']")) return;
        handleToggle();
      }}
      onKeyDown={(event) => {
        if (!hasDetails || event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        handleToggle();
      }}
      className={`group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition duration-200 sm:p-7 ${hasDetails ? "cursor-pointer hover:border-sky-200/35 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:scale-[0.998]" : "hover:border-white/20"}`}
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/40">{experience.start} — {experience.end ?? "Present"}</p>
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h3>
          {experience.description?.title && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">{experience.description.title}</p>}
        </div>
        {hasDetails && (
          <div aria-hidden="true" className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60 transition duration-200 group-hover:border-sky-200/30 group-hover:bg-sky-200/[0.08] group-hover:text-sky-100 ${isOpen ? "rotate-180 border-sky-200/30 text-sky-100" : ""}`}>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </div>
        )}
      </div>
      {hasLinks && <div className="flex flex-wrap gap-2">{experience.links?.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">{link.label} ↗</a>)}</div>}
      {isOpen && hasDetails && (
        <div className="border-t border-white/10 pt-5">
          {experience.description?.fulltext && <p className="whitespace-pre-line text-sm leading-relaxed text-white/70">{experience.description.fulltext}</p>}
          {hasSkills && <div className={experience.description?.fulltext ? "mt-6" : ""}>
            {selectedSkills.length > 0 ? <>
              {matched.length > 0 && <div className="mb-5"><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/80">Matched skills</h4><div className="flex flex-wrap gap-2">{skillChips(matched)}</div></div>}
              {remainingSkills.length > 0 && <div><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Other skills</h4><div className="flex flex-wrap gap-2 opacity-75">{skillChips(remainingSkills)}</div></div>}
            </> : <><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Technology & skills</h4><div className="flex flex-wrap gap-2">{skillChips(experience.skills)}</div></>}
          </div>}
        </div>
      )}
    </article>
  );
}
