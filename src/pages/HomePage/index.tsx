import { HeroSection } from "@widgets/hero-section";

export default function HomePage() {
  return (
    <div>
      <section id="hero">
        <HeroSection />
      </section>
      <section id="featured-work" />
      <section id="about" />
      <section id="contact" />
    </div>
  );
}
