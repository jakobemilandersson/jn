# ADR-008: Portfolio Homepage as Default Entry Point

**Date:** 2026-05-23
**Status:** Accepted

## Context

The app launched as a pure filter-driven resume explorer — `#/` rendered `ResumePage`
directly. As the project evolved toward a shareable personal site, a recruiter-facing
homepage became necessary: a place to present featured work, a short bio, and CTAs
before the visitor drills into the resume explorer.

## Decision

The default route `#/` now renders a new `HomePage` page component. The resume
explorer moves to `#/resume`. The about page remains at `#/about`.

`HomePage` is composed of three widget slices: `HeroSection`, `FeaturedWorkSection`,
and `AboutSection`. These widgets source their copy from `RESUME.profile` and
static data — no new domain entity was introduced.

The project description is updated from "resume explorer" to "portfolio site with
a filter-driven resume explorer at `#/resume`".

## Consequences

- **Routing table changed** — any bookmark or direct link to `#/` now lands on the
  portfolio homepage, not the resume explorer. The resume explorer is at `#/resume`.
- **Three new widget slices** — `hero-section`, `featured-work-section`,
  `about-section` — all follow the standard Mini-FSD slice shape.
- **`AboutPage` remains the canonical contact surface** — `HeroSection`'s
  "Contact me" CTA routes to `#/about`, not a separate `#contact` section.
- **`CONTEXT.md` and `project-context.md`** updated to reflect the new scope and
  route table.
