# ADR-001: Bottom Sheet for WorkExperience Description and Skills

**Date:** 2026-05-20
**Status:** Accepted

## Context

The original `WorkExperienceCard` expanded inline to show `description.fulltext` and skill chips.
This caused layout instability, animation jank (height transitions on dynamic content), and made
the card a poor scanning surface — the fulltext preview competed with filter-relevant signals
(role, company, dates, skill chips).

Four options were evaluated:
1. Fix the inline expand/collapse animation
2. Render description as a static non-animated block
3. Truncate with `line-clamp` and a "Read more" trigger on the card
4. Move description + skills into a bottom sheet overlay

## Decision

Option 4 — bottom sheet. A `BottomSheet` component was introduced in `src/shared/ui/` that
slides up from the bottom of the viewport. `WorkExperienceCard` shows only `description.title`
plus a "Read more →" affordance. Tapping opens the sheet with `fulltext` and skill chips.

Skill chips were also moved into the sheet (previously rendered directly on the card), keeping
the card a pure scanning surface.

## Consequences

- Cards are compact and layout-stable — no height animation, no layout shift.
- `BottomSheet` is domain-agnostic and reusable: it accepts `isOpen`, `onClose`, `title`, and `children`.
- `description.fulltext` must never be rendered on the card — only inside the sheet.
- Cards with no description show "View skills →"; cards with a description show "Read more →".
- `BottomSheet` implementation must handle: full-viewport backdrop (`100dvh`), focus trap, `isMounted` guard (300ms delay matching transition duration) to avoid orphaned DOM nodes when fully closed, and `requestAnimationFrame` for the open animation to avoid instant-render flicker.
- Decorative elements use `aria-hidden="true"` (explicit string value, not bare attribute) for reliable screen reader behaviour.
