import { useFilterStore } from "@features/filters";

export function StrictToggle() {
  const strict = useFilterStore((s) => s.strictSkillsMatch);
  const setStrict = useFilterStore((s) => s.setStrictSkillsMatch);

  return (
    <label className="inline-flex min-h-11 cursor-pointer select-none items-center gap-2.5 rounded-lg py-1 pr-2 transition hover:bg-white/[0.035]">
      <span className={`relative flex h-5 w-9 shrink-0 items-center rounded-full border p-0.5 transition-colors ${strict ? "border-sky-300/40 bg-sky-300/20" : "border-white/15 bg-black/30"}`}>
        <input
          type="checkbox"
          checked={strict}
          onChange={(event) => setStrict(event.target.checked)}
          className="peer sr-only"
          aria-describedby="strict-help"
        />
        <span aria-hidden="true" className={`h-3.5 w-3.5 rounded-full transition-all ${strict ? "translate-x-4 bg-sky-200" : "bg-white/50"}`} />
      </span>
      <span className="text-sm text-white/70">
        Match all skills
        <span id="strict-help" className="sr-only">Only show roles that contain every selected skill.</span>
      </span>
    </label>
  );
}
