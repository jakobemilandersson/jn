import { useFilterStore } from "@features/filters";

export function StrictToggle() {
  const strict = useFilterStore((s) => s.strictSkillsMatch);
  const setStrict = useFilterStore((s) => s.setStrictSkillsMatch);
  return (
    <label className="group flex cursor-pointer select-none items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3.5 transition hover:border-sky-200/25 hover:bg-white/[0.045]">
      <span className={`relative mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full border p-0.5 transition-colors ${strict ? "border-sky-300/40 bg-sky-300/20" : "border-white/15 bg-black/30"}`}>
        <input type="checkbox" checked={strict} onChange={(event) => setStrict(event.target.checked)} className="peer sr-only" aria-describedby="strict-help" />
        <span aria-hidden="true" className={`h-3.5 w-3.5 rounded-full transition-all ${strict ? "translate-x-4 bg-sky-200" : "bg-white/50"}`} />
      </span>
      <span><span className="block text-sm font-medium text-white">Strict skill matching</span><span id="strict-help" className="mt-1 block text-xs leading-relaxed text-white/45">Only show roles that contain every selected skill.</span></span>
    </label>
  );
}
