import { SkillChip } from "@shared/ui";
import type { SkillChipVariant } from "@shared/ui";

type Project = {
  title: string;
  context: string;
  role: string;
  stack: { label: string; variant: SkillChipVariant }[];
  outcome: string;
  links: { label: string; url: string }[];
};

const PROJECTS: Project[] = [
  {
    title: "Social Mobile Game",
    context:
      "An iOS party game built around a digital version of the Swedish \"pekleken\" format. Players enter the group's names, then the app presents random prompts to a selected player, who answers by naming someone else in the group.",
    role:
      "Sole developer — took over before launch, helped ship to the App Store, and continued as the sole developer for roughly two years post-launch.",
    stack: [
      { label: "React Native", variant: "frontend" },
      { label: "Firebase", variant: "backend" },
      { label: "RevenueCat", variant: "backend" },
    ],
    outcome: "Shipped on the App Store and actively maintained for two years.",
    links: [],
  },
  {
    title: "Merge Champion",
    context:
      "A cross-platform daily merge puzzle game for iOS and Android, built around deterministic daily challenges, generated puzzle sequences, leaderboards, replays, achievements, and production-ready mobile features.",
    role:
      "Sole developer — product, game design, engineering, backend, and release.",
    stack: [
      { label: "Flutter", variant: "frontend" },
      { label: "Dart", variant: "fullstack" },
      { label: "Flame", variant: "frontend" },
      { label: "Riverpod", variant: "frontend" },
      { label: "Supabase", variant: "backend" },
      { label: "Cloudflare Workers", variant: "backend" },
    ],
    outcome: "Cross-platform mobile game actively developed for iOS and Android.",
    links: [
      { label: "App Store", url: "https://apps.apple.com/se/app/merge-champion/id6801467932" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.mergechampionapp.mergechampion" },
    ],
  },
];

export function FeaturedWorkSection() {
  return (
    <div className="max-w-3xl mx-auto px-6 w-full">
      <h2 className="text-white/40 text-sm font-medium tracking-widest uppercase mb-6">
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
              {project.links.length > 0 && (
                <div className="flex gap-3 shrink-0">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 text-sm hover:text-white transition-colors"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{project.context}</p>
            <p className="text-white/40 text-sm">{project.role}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.stack.map((tech) => (
                <SkillChip key={tech.label} label={tech.label} variant={tech.variant} />
              ))}
            </div>
            <p className="text-white/50 text-sm italic">{project.outcome}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
