# ADR-004 — Hash-based routing for initial multi-page navigation

## Status

Superseded by ADR-005 (merged in #53).

## Context

The app needed to navigate between two pages: the resume explorer (`/`) and the
About page (`/about`). GitHub Pages serves static files with no server-side
fallback — any direct request to an unknown path (e.g. `jakob.now/about`) returns
a 404 unless a workaround is in place.

Two options were considered:

1. **React Router v6 + `404.html` copy** — install `react-router-dom`, wrap the
   app in `BrowserRouter`, and emit `404.html` as a copy of `index.html` in the
   Vite build so GitHub Pages falls back to the SPA shell for unknown paths.
2. **Hash routing via `useHashRoute`** — a small in-app hook that reads
   `window.location.hash` and listens for `hashchange`. Routes become `/#/` and
   `/#/about`. No build config changes or new dependencies required.

## Decision

Hash routing was chosen for the initial implementation.

**Reasons:**
- Zero external dependencies and zero build config changes for a two-page app.
- Fully compatible with GitHub Pages out of the box.
- Fast to deliver; unblocks the About page without introducing React Router.

## Consequences

- Direct URLs like `jakob.now/about` 404 on GitHub Pages — the correct URL is
  `jakob.now/#/about`. This is a known limitation accepted at this scope.
- US4 from #44 ("a visitor arriving directly at `/about` is not shown a 404") is
  **not fully satisfied** by this approach.
- A follow-up (#50) tracks the migration to React Router v6 + `404.html` to
  close US4 properly.
- Superseded by ADR-005 when #50 was delivered — `useHashRoute` removed,
  `BrowserRouter` adopted, `404.html` emitted via `postbuild` script.
