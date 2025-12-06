# jakob-now — Project Context (for AI assistant)

- Purpose: Single-page interactive resume filter and presenter.
- Hosting: Static site on GitHub Pages at custom domain `jakob.now` (porkbun DNS).
- Stack: React + TypeScript + Vite + Tailwind + Zustand.
- Architecture: Mini-FSD (app, pages, features, entities, widgets, shared).
- Data: Predefined resume data in `src/entities/resume/data.ts`.
- Filters:
  - `stack_type` ∈ {"fullstack","backend","frontend"}
  - `skills` ∈ Array<string> (dynamic)
- UX:
  - Two dropdowns (single + multi-select), Search button triggers filtering.
  - Show/hide Work Experience and Skills & Tools sections based on filters.
- Deployment: GitHub Actions push to `gh-pages` branch; `CNAME` file with `jakob.now`.
- Coding conventions:
  - Use TypeScript types for all entities.
  - One file per React component.
  - Export only minimal public APIs per folder (index.ts).
  - Keep UI components in `shared/ui`.
- State management: Zustand store at `src/features/filters/model/useFilterStore.ts`.
