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
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm sm:p-10 lg:p-14">
          <div aria-hidden="true" className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full border border-sky-300/10 sm:h-96 sm:w-96" />
          <div aria-hidden="true" className="absolute right-12 top-12 hidden h-40 w-40 rounded-full border border-white/[0.06] sm:block" />
          <div className="relative max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3.5 py-2 text-xs font-medium tracking-wide text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />FULL-STACK ENGINEER · WEB & MOBILE</div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-sky-200/70">Jakob Andersson / Resume</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">I build digital products<span className="block bg-gradient-to-r from-sky-200 via-cyan-300 to-violet-300 bg-clip-text pb-2 text-transparent">from first idea to launch.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">Full-stack solutions across web and mobile, with a focus on thoughtful user experiences, dependable engineering, and products that solve real problems.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#experience" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">Explore experience <span aria-hidden="true">↓</span></a>
              <a href="/jakob-andersson-resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">Download résumé <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="relative mt-10 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-5 sm:pt-8">
            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4 sm:p-5"><p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{RESUME.experiences.length.toString().padStart(2, "0")}</p><p className="mt-1 text-sm text-slate-400">Career chapters</p></div>
            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4 sm:p-5"><p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Web + mobile</p><p className="mt-1 text-sm text-slate-400">End-to-end product delivery</p></div>
            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4 sm:p-5"><p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Built to ship</p><p className="mt-1 text-sm text-slate-400">Craft, quality, and maintainability</p></div>
          </div>
        </header>
        <section id="experience" className="scroll-mt-8 pt-14 sm:pt-20">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/70">01 / Career timeline</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Experience, in context.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">Explore the work behind each role. Filter by skills or stack to find the experience most relevant to your team or product.</p></div>
            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-300/10 text-lg text-sky-200" aria-hidden="true">⌘</span><div><p className="text-xl font-semibold leading-none">{results.length.toString().padStart(2, "0")} <span className="text-sm font-normal text-slate-400">/ {RESUME.experiences.length.toString().padStart(2, "0")}</span></p><p className="mt-1 text-xs text-slate-400">{hasFilters ? "Relevant roles" : "Roles shown"}</p></div></div>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-4 sm:p-6 lg:p-8"><div className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-200"><span className="h-1.5 w-1.5 rounded-full bg-sky-300" />Find the right experience</div><FiltersPanel /><div className="mt-4"><ActiveFilters /></div></div>
          {results.length > 0 ? <div className="mt-6 space-y-4">{results.map((experience, index) => <WorkExperienceSkillBinder key={experience.id} experience={experience} selectedSkills={skills} selectedStackTypes={stackTypes} isOpen={activeSheetId === experience.id} onOpen={() => setActiveSheetId(experience.id)} onClose={() => setActiveSheetId(null)} position={index + 1} />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-12 text-center"><p className="text-lg font-semibold text-white">No roles match those filters.</p><p className="mt-2 text-sm text-slate-400">Remove one or more filters to see more of the experience timeline.</p></div>}
          <footer className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Jakob Andersson · Full-stack engineering</span><a href="/jakob-andersson-resume.pdf" target="_blank" rel="noopener noreferrer" className="w-fit text-slate-300 transition hover:text-sky-200">Résumé PDF ↗</a></footer>
        </section>
      </div>
    </main>
  );
}
