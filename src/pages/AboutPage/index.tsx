import { RESUME } from "@entities/resume";

const { profile } = RESUME;

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 text-white">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-white/60 text-sm">{profile.title}</p>
      </header>

      <section>
        <p className="leading-relaxed text-white/80 whitespace-pre-line">{profile.bio}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-white/50 uppercase tracking-widest text-xs">Contact</h2>
        <ul className="space-y-1 text-sm">
          <li>
            <a
              href={`mailto:${profile.contact.email}`}
              className="text-white/70 hover:text-white transition-colors"
            >
              {profile.contact.email}
            </a>
          </li>
          <li>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
