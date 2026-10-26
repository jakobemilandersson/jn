export function HeroSection() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm sm:p-7 lg:p-8">
        <div aria-hidden="true" className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-sky-300/[0.09] sm:-right-10 sm:-top-32 sm:h-80 sm:w-80" />
        <div aria-hidden="true" className="absolute right-10 top-8 hidden h-28 w-28 rounded-full border border-white/[0.05] sm:block" />
        <div className="relative max-w-3xl">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-200/65">
            Jakob Andersson <span className="mx-1.5 text-white/25">/</span> Resume
          </p>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Build simply. Think deeply. Keep learning.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            I enjoy turning ideas into useful products, figuring things out along the way, and finding simpler ways to solve complex problems. I'm naturally curious, comfortable adapting to new challenges, and always looking for ways to improve both what I build and how I build it—including through practical uses of AI.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Outside work, I build mobile apps and make time for side projects that turn ideas I enjoy into things I can share with others.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
            <a
              href="#featured-work"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
            >
              View featured work
            </a>
            <a
              href={`${import.meta.env.BASE_URL}jakob-andersson-resume.pdf`}
              download="jakob-andersson-resume.pdf"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Download CV
            </a>
            <a
              href="#/about"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              More about me
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
