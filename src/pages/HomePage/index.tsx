import { HeroSection } from "@widgets/hero-section";
import { FeaturedWorkSection } from "@widgets/featured-work-section";
import { AboutSection } from "@widgets/about-section";

export default function HomePage() {
  return (
    <div className="relative z-10 flex flex-col gap-8 pb-16">
      <section id="hero" className="flex items-center pt-16 pb-6 sm:pt-20 sm:pb-8">
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
