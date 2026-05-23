const PROJECTS = [
  {
    title: "Internal Operations Platform",
    context:
      "A mid-sized company managed workflows across spreadsheets and email with no centralised tool.",
    role: "Sole developer — architecture, design, and delivery over 2 years.",
    stack: "React, TypeScript, Node.js, PostgreSQL",
    outcome: "Replaced manual processes for a team of 40+, still in active use.",
    link: null,
  },
  {
    title: "jakob.now — Resume Explorer",
    context: "Wanted a smarter way to present a resume than a static PDF.",
    role: "Solo — product, design, and engineering.",
    stack: "React, TypeScript, Vite, Zustand, TailwindCSS",
    outcome: "Live and actively developed.",
    link: "https://github.com/jakobemilandersson/jn",
  },
];

export function FeaturedWorkSection() {
  return (
    <div>
      {PROJECTS.map((project) => (
        <article key={project.title}>
          <h2>{project.title}</h2>
          <p>{project.context}</p>
          <p>{project.role}</p>
          <p>{project.stack}</p>
          <p>{project.outcome}</p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          )}
        </article>
      ))}
    </div>
  );
}
