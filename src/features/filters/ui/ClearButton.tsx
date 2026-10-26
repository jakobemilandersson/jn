import { useFilterStore } from "@features/filters";

export const ClearButton = () => {
  const clear = useFilterStore((s) => s.clear);
  return (
    <button type="button" aria-label="Clear filters" onClick={clear} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-rose-300/30 hover:bg-rose-300/[0.06] hover:text-rose-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      Clear filters
    </button>
  );
};
