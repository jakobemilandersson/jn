# ADR-004 — Hash-based routing for multi-page navigation

## Status

Accepted (merged in #49). **Permanent — migration to BrowserRouter closed as won't-fix in #53.**

## Context

The app needed to navigate between pages: the portfolio home (`/`), the resume
explorer (`/resume`), and the About page (`/about`). GitHub Pages serves static
files with no server-side fallback — any direct request to an unknown path
(e.g. `jakob.now/about`) returns a 404 unless a workaround is in place.

Two options were considered:

1. **React Router v6 + `404.html` copy** — install `react-router-dom`, wrap the
   app in `BrowserRouter`, and emit `404.html` as a copy of `index.html` in the
   Vite build so GitHub Pages falls back to the SPA shell for unknown paths.
2. **Hash routing via `useHashRoute`** — a small in-app hook that reads
   `window.location.hash` and listens for `hashchange`. Routes become `/#/`,
   `/#/resume`, and `/#/about`. No build config changes or new dependencies
   required.

## Decision

Hash routing is the **permanent** approach for this project.

**Reasons:**
- Zero external dependencies and zero build config changes.
- Fully compatible with GitHub Pages at any path, including PR preview sub-paths
  (`jakob.now/pull/<n>/`).
- Migration to `BrowserRouter` was attempted in #53 and found to be fundamentally
  incompatible with the PR preview environment: `BrowserRouter` requires
  server-side routing, which GitHub Pages does not provide for sub-paths. Clicking
  a nav link in a preview navigated to the production root instead of staying
  within the preview sub-path. There is no reliable fix for this on GitHub Pages
  without abandoning sub-path previews entirely.
- The PR preview environment is a higher-priority constraint than clean production
  URLs.

## Consequences

- Direct URLs like `jakob.now/about` 404 on GitHub Pages — the correct URL is
  `jakob.now/#/about`. This is a **known and accepted** limitation.
- US4 from #44 ("a visitor arriving directly at `/about` is not shown a 404") is
  not satisfied. This is accepted in favour of preserving the PR preview workflow.
- Issue #50 is closed as won't-fix.
- Do not reopen the BrowserRouter migration without first solving the sub-path
  preview problem at the hosting level (e.g. migrating to Netlify, Vercel, or
  Cloudflare Pages).
