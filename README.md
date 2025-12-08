# jakob-now

Single-page interactive resume presenter (Mini-FSD).  
Filters: `stackType` (fullstack | backend | frontend) + searchable multi-select `skills`. Built with React + TypeScript + Vite + Tailwind + Zustand. Deployed to GitHub Pages (custom domain: jakob.now).

## Features (MVP)
- One dropdown (`stackType`) and one searchable multi-select (`skills`).
- Client-side filtering of a predefined resume dataset.
- Filters apply instantly on change and reveal tailored Work Experience + Skills sections.
- Static hosting on GitHub Pages (free).

## Tech
- React 18 + TypeScript
- Vite
- TailwindCSS
- Zustand (global store for filters)
- Vitest (tests)
- React Testing Library
- Jest-DOM matchers (via setupTests.ts)
- GitHub Actions → gh-pages for deployment

## Contributing
- Use the Mini-FSD structure (app / pages / features / entities / shared).
- One feature file per behavioral unit.
- Provide tests for non-trivial logic.
- Keep commits focused and atomic.
