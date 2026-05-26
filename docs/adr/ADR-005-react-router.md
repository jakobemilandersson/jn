# ADR-005 — React Router v6 with BrowserRouter and 404.html fallback

## Status

Accepted (merged in #53). Supersedes ADR-004.

## Context

Hash-based routing (ADR-004) left US4 unsatisfied: visitors arriving directly
at `jakob.now/about` received a GitHub Pages 404. The `useHashRoute` hook was
also an unconventional pattern that obscured navigation intent.

With the addition of a third page (`/resume`) the routing logic warranted a
proper solution.

## Decision

Migrate to **React Router v6** (`react-router-dom`) with `BrowserRouter`.

- `src/app/main.tsx` wraps the app in `<BrowserRouter>` and declares routes via
  `<Routes>` / `<Route>`.
- An `AppShell` component is extracted so `useLocation()` can be called inside
  the router context, passing `pathname` as `activeHref` to `Navbar`.
- The `useHashRoute` hook is deleted.
- GitHub Pages SPA fallback is handled by a `postbuild` npm script:
  `cp dist/index.html dist/404.html` — no additional Vite plugins required.

## Consequences

- Direct URLs (`jakob.now/resume`, `jakob.now/about`) now resolve correctly.
- US4 from #44 is fully satisfied.
- `react-router-dom` is added as a production dependency.
- `Navbar` links remain plain `<a>` tags (not `<Link>`) to respect the
  `widgets → app` import restriction. This means navigation causes a full-page
  reload in the browser. Tracked as a known limitation — acceptable at current
  scope.
- The `postbuild` script must be kept in sync with any future changes to the
  Vite `build.outDir`.
