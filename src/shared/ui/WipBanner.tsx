export function WipBanner() {
  return (
    <div
      role="status"
      aria-label="Work in progress notice"
      className="font-mono text-sm rounded-md border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-yellow-300/90"
    >
      <span className="text-yellow-400/60 select-none">▶ </span>
      <span className="text-yellow-400 font-semibold">console.warn(</span>
      <span className="text-yellow-200/80">&#39;[resume] filtering &amp; work experience data are under active development — expect rough edges and missing content&#39;</span>
      <span className="text-yellow-400 font-semibold">)</span>
    </div>
  );
}
