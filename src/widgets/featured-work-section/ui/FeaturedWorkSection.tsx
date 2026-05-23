const PROJECTS = [
  {
    title: "Internal Operations Platform",
    context:
      "A mid-sized company managed workflows across spreadsheets and email with no centralised tool.",
    role: "Sole developer — architecture, design, and delivery over 2 years.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    outcome: "Replaced manual processes for a team of 40+, still in active use.",
    link: null,
  },
  {
    title: "jakob.now — Resume Explorer",
    context: "Wanted a smarter way to present a resume than a static PDF.",
    role: "Solo — product, design, and engineering.",
    stack: ["React", "TypeScript", "Vite", "Zustand", "TailwindCSS"],
    outcome: "Live and actively developed.",
    link: "https://github.com/jakobemilandersson/jn",
  },
];

export function FeaturedWorkSection() {
  return (
    <div className="max-w-3xl mx-auto px-6 w-full">
      <h2 className="text-white/40 text-sm font-medium tracking-widest uppercase mb-12">
        Featured work
      </h2>
      <div className="flex flex-col gap-6">
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h3 className="text-white text-xl font-semibold">{project.title}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 text-sm hover:text-white transition-colors shrink-0"
                >
                  View on GitHub →
                </a>
              )}
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{project.context}</p>
            <p className="text-white/40 text-sm">{project.role}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-white/50 text-sm italic">{project.outcome}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
