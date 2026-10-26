import { useState } from "react";
import { FiltersPanel, useFilteredResume, useFilterStore } from "@features/filters";
import { WorkExperienceSkillBinder } from "@widgets/work-experience";
import { ActiveFilters } from "@widgets/filters";
import { RESUME } from "@entities/resume";

export default function ResumePage() {
  const results = useFilteredResume(RESUME.experiences);
  const skills = useFilterStore((s) => s.skills);
  const stackTypes = useFilterStore((s) => s.stackTypes);
  const [activeSheetId, setActiveSheetId] = useState<string | null>(null);
  const hasFilters = skills.length > 0 || stackTypes.length > 0;

  return (
    <main className="relative min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 sm:py-10">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm sm:p-7 lg:p-8">
          <div aria-hidden="true" className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-sky-300/[0.09] sm:-right-10 sm:-top-32 sm:h-80 sm:w-80" />
          <div aria-hidden="true" className="absolute right-10 top-8 hidden h-28 w-28 rounded-full border border-white/[0.05] sm:block" />
          <div className="relative max-w-3xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-200/65">Jakob Andersson <span className="mx-1.5 text-white/25">/</span> Resume</p>
            <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Software developer with an engineer’s mindset.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
              Civil engineer by background, with a master’s in software development. I enjoy solving problems in whatever language fits the job, with a soft spot for Ruby on Rails and its <span className="whitespace-nowrap text-sky-200">MINASWAN</span> spirit — “Matz is nice, and so we are nice.”
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Outside work, I build mobile apps and explore how AI can make development, everyday tools, and the way we work a little better.
            </p>
          </div>
        </header>
        <section id="experience" className="scroll-mt-8 pt-10 sm:pt-14">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200/70">Career timeline</p><h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Experience, in context.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Browse the work behind each role. Filter by skills, stack, or period to find relevant experience.</p></div>
            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-2.5"><span className="text-lg text-sky-200" aria-hidden="true">⌘</span><div><p className="text-lg font-semibold leading-none">{results.length.toString().padStart(2, "0")} <span className="text-sm font-normal text-slate-400">/ {RESUME.experiences.length.toString().padStart(2, "0")}</span></p><p className="mt-1 text-[11px] text-slate-400">{hasFilters ? "Matching roles" : "Roles shown"}</p></div></div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3 sm:p-5 lg:p-6"><div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200"><span className="h-1.5 w-1.5 rounded-full bg-sky-300" />Filter experience</div><FiltersPanel /><div className="mt-3"><ActiveFilters /></div></div>
          {results.length > 0 ? <div className="mt-5 space-y-3">{results.map((experience, index) => <WorkExperienceSkillBinder key={experience.id} experience={experience} selectedSkills={skills} selectedStackTypes={stackTypes} isOpen={activeSheetId === experience.id} onOpen={() => setActiveSheetId(experience.id)} onClose={() => setActiveSheetId(null)} position={index + 1} />)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-10 text-center"><p className="text-base font-semibold text-white">No roles match those filters.</p><p className="mt-2 text-sm text-slate-400">Remove a filter to see more of the experience timeline.</p></div>}
          <footer className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Jakob Andersson · Software development</span><a href="/jakob-andersson-resume.pdf" target="_blank" rel="noopener noreferrer" className="w-fit text-slate-300 transition hover:text-sky-200">Résumé PDF ↗</a></footer>
        </section>
      </div>
    </main>
  );
}
