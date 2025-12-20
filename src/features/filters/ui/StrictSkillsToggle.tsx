import { useFilterStore } from "@features/filters";

export function StrictToggle() {
    const strict = useFilterStore(s => s.strictSkillsMatch);
    const setStrict = useFilterStore(s => s.setStrictSkillsMatch);

    return (
        <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
                type="checkbox"
                checked={strict}
                onChange={(e) => setStrict(e.target.checked)}
                className="h-4 w-4"
                aria-describedby="strict-help"
            />
            <span className="text-sm font-medium">Strict skill matching</span>
            <span id="strict-help" className="sr-only">
                When strict mode is enabled, work experiences must include all selected skills.
            </span>
        </label>
    );
}
