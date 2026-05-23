import { HeroSection } from "@widgets/hero-section";
import { FeaturedWorkSection } from "@widgets/featured-work-section";

export default function HomePage() {
  return (
    <div>
      <section id="hero">
        <HeroSection />
      </section>
      <section id="featured-work">
        <FeaturedWorkSection />
      </section>
      <section id="about" />
      <section id="contact" />
    </div>
  );
}
