import { RESUME } from '@entities/resume';
import { Timeline } from '@widgets/timeline';
import { APP_VERSION } from '@app/version';

const { profile } = RESUME;

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 text-white">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-white/60 text-sm">{profile.title}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm">
          <a
            href={`mailto:${profile.contact.email}`}
            aria-label={`Send email to ${profile.contact.email}`}
            className="text-white/50 hover:text-white transition-colors"
          >
            Email
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </header>

      <section>
        <p className="leading-relaxed text-white/80 whitespace-pre-line">{profile.bio}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-white/50 uppercase tracking-widest text-xs">Timeline</h2>
        <Timeline />
      </section>

      <p
        aria-label="Site version"
        className="text-xs text-white/20 tabular-nums pb-16"
      >
        {APP_VERSION}
      </p>
    </div>
  );
}
