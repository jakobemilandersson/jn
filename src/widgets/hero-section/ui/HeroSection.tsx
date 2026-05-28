import { RESUME } from '@entities/resume';

const { profile } = RESUME;

export function HeroSection() {
  return (
    <div className="max-w-3xl mx-auto px-6 w-full">
      <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-4">
        {profile.title}
      </p>
      <h1
        aria-label="Jakob Andersson"
        className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight mb-6"
      >
        Jakob
        <br />
        Andersson
      </h1>
      <p className="text-white/60 text-lg sm:text-xl mb-12 max-w-xl leading-relaxed">
        Based in Uppsala, Sweden — building products end-to-end.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href="#featured-work"
          className="px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
        >
          View featured work
        </a>
        <a
          href={`${import.meta.env.BASE_URL}jakob-andersson-cv.pdf`}
          download="jakob-andersson-cv.pdf"
          className="px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-full hover:border-white/50 hover:bg-white/5 transition-colors"
        >
          Download CV
        </a>
        <a
          href="#/about"
          className="px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-full hover:border-white/50 hover:bg-white/5 transition-colors"
        >
          More about me
        </a>
      </div>
    </div>
  );
}
