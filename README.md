# jakob-now

Single-page interactive resume presenter (Mini-FSD).  
Filters: `stack_type` (fullstack | backend | frontend) + multi-select `skills`. Built with React + TypeScript + Vite + Tailwind + Zustand. Deployed to GitHub Pages (custom domain: jakob.now).

## Features (MVP)
- Two dropdowns: `stack_type` (single) and `skills` (multi-select).
- Client-side filtering of a predefined resume dataset.
- Search button triggers filtering and reveals tailored Work Experience + Skills sections.
- Static hosting on GitHub Pages (free).

## Tech
- React 18 + TypeScript
- Vite
- TailwindCSS
- Zustand (global store for filters)
- Vitest (tests)
- GitHub Actions → gh-pages for deployment

## Project Structure (Mini-FSD)
```
src/
app/
main.tsx
providers/
pages/
ResumePage/
index.tsx
features/
filters/
ui/
model/
entities/
resume/
types.ts
data.ts
widgets/
ResumeSection/
shared/
ui/
Dropdown.tsx
MultiSelect.tsx
styles/
assets/ 
```


## Getting started
```bash
git clone <repo>
cd <repo>
pnpm install        # or npm / yarn
pnpm dev
```

## Build & Deploy (local build)
```bash
pnpm build
pnpm preview
```

## Deploy to GitHub Pages (recommended)
- Use the provided GitHub Actions workflow .github/workflows/deploy.yml
- Add repo secret GH_PAGES_TOKEN (GitHub Actions uses GITHUB_TOKEN by default).
- Add CNAME file: jakob.now

## DNS (Porkbun) & GitHub Pages
- For apex domain (jakob.now): set A records to GitHub Pages IPs:
 - 185.199.108.153 
 - 185.199.109.153
 - 185.199.110.153
 - 185.199.111.153
- Add CNAME file containing: jakob.now
- In repo GitHub Pages settings, set the custom domain to jakob.now (enable HTTPS).

## Contributing
- Use the Mini-FSD structure.
- One feature file per behavioral unit.
- Provide tests for non-trivial logic.
- Keep commits focused and atomic.
