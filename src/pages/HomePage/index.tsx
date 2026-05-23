import { HeroSection } from "@widgets/hero-section";
import { FeaturedWorkSection } from "@widgets/featured-work-section";
import { AboutSection } from "@widgets/about-section";

export default function HomePage() {
  return (
    <div className="relative z-10 flex flex-col gap-16 pb-24">
      <section id="hero" className="min-h-screen flex items-center">
        <HeroSection />
      </section>
      <section id="featured-work">
        <FeaturedWorkSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
    </div>
  );
}
