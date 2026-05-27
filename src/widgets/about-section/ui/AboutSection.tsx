import { RESUME } from '@entities/resume';

const { profile } = RESUME;

// Show only the first paragraph of the bio as a teaser
const teaserBio = profile.bio.split('\n\n')[0];

export function AboutSection() {
  return (
    <div className="max-w-3xl mx-auto px-6 w-full">
      <h2 className="text-white/40 text-sm font-medium tracking-widest uppercase mb-6">
        About
      </h2>
      <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl">
        {teaserBio}
      </p>
      <a
        href="#/about"
        className="inline-block mt-4 text-sm text-white/50 hover:text-white transition-colors"
      >
        More about me →
      </a>
    </div>
  );
}
