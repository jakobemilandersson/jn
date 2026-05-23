import { HeroSection } from "@widgets/hero-section";
import { FeaturedWorkSection } from "@widgets/featured-work-section";
import { AboutSection } from "@widgets/about-section";

export default function HomePage() {
  return (
    <div className="relative z-10 flex flex-col gap-16 pb-24">
      <section id="hero" className="flex items-center pt-24 pb-12 sm:pt-32 sm:pb-16">
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
