# jakob-now — Domain Context

Portfolio and filter-driven resume explorer SPA. The default entry point is a
portfolio homepage (`HomePage`). The resume explorer is accessible at `#/resume`.
A visitor can browse featured work and filter work experience entries by stack
type, skills, and date range to surface the most relevant parts of a resume for
a given role or audience.

> **Scope:** domain language, UI presentation rules, and bounded context only.
> Architectural constraints, layer rules, import rules, and the Zustand store
> shape live in `.chatgpt/project-context.md`. Cross-reference, don't duplicate.

## Domain language

| Term | Meaning |
|---|---|
| `Resume` | The top-level domain object: `{ profile: ResumeProfile, experiences: WorkExperience[] }`. The canonical instance is exported as `RESUME` from `src/entities/resume/data.ts`. |
| `ResumeProfile` | Identity and contact information for the person behind the resume: `name`, `title`, `bio`, `availability` (optional freelance/job status line), and `contact` (`email`, `linkedin`, `github`). Not filterable. Used by the About page and the hero section on HomePage. |
| `WorkExperience` | A single career entry (job, education, or project): role, company, `kind`, stack type, skills, date range, optional description. The `kind` field drives timeline dot colour and label. |
| `ExperienceKind` | One of `'work' \| 'education' \| 'project'` — classifies a `WorkExperience` entry. Defined in `src/entities/resume/types.ts`. |
| `Skill` | A named technology or capability, tagged with a `stackType` |
| `StackType` | One of `frontend`, `backend`, `fullstack` — classifies an experience or skill |
| `SkillChipVariant` | The shared display contract for `SkillChip`: `'frontend' \| 'backend' \| 'fullstack' \| 'neutral'`. Defined in `src/shared/ui` and exported via `src/shared/ui/index.ts`. Used by both the resume filter and timeline tags. |
| `YearMonth` | A `"YYYY-MM"` branded string (e.g. `"2024-03"`). Used for `start` and `end` on `WorkExperience`. Open-ended (ongoing) roles omit `end`. |
| Filter | A set of active `stackTypes`, `skills`, a `strictSkillsMatch` flag, `dateFrom`, and `dateTo` |
| Strict match | When true, a `WorkExperience` must contain **all** selected skills to appear in results |
| Date interval filter | An optional `dateFrom`/`dateTo` range (both `YearMonth \| null`). Overlap logic: a role is included if its tenure overlaps the filter range. Open-ended roles use a `"9999-12"` sentinel for the upper bound. |
| `WorkExperienceDescription` | An optional object with `title: string`, `summary: string`, and `fulltext: string` attached to a `WorkExperience`. `summary` is used by the timeline widget; `fulltext` is rendered in the `BottomSheet`. |
| `BottomSheet` | The shared UI component at `src/shared/ui/BottomSheet.tsx`. A slide-up overlay used to show full `WorkExperienceDescription.fulltext` and skill chips. Accepts `isOpen`, `onClose`, `title`, and `children`. Domain-agnostic. Only one sheet can be open at a time — active sheet state is owned by `ResumePage`. |
| Active filter chip | A dismissible chip in the filter bar representing one active filter value. Grouped by category (Stack type / Skills) with `aria-labelledby` on each group. |
| `OptionGroup` | View model type defined in `src/shared/ui/SearchableMultiSelect.tsx` and exported via `src/shared/ui/index.ts`. Used to group skill filter options by `stackType`. |
| `TimelineViewModel` | Widget-local presentation type produced by `toTimelineViewModels` in `src/widgets/timeline/lib`. Consumed only by `Timeline.tsx`. Not a domain type — not exported from `@entities/resume`. Shape: `{ id, kind: ExperienceKind, title, subtitle?, start, end?, detail, url?, tags?: TimelineTag[] }`. |
| `TimelineTag` | `{ label: string; stackType: SkillChipVariant }` — a tag on a `TimelineViewModel`, derived from `WorkExperience.skills`. Defined in `src/widgets/timeline/lib/timelineAdapter.ts`. |
| `Navbar` | The app-level navigation component at `src/widgets/navbar/Navbar.tsx`. Accepts `activeHref: string` and derives active state from it. Renders a scroll-aware sticky header on desktop and a fixed bottom tab bar on mobile. Domain-agnostic. Owns a hamburger button that opens `SpaceSettingsPanel`. |
| `SpaceSettingsPanel` | A slide-in drawer at `src/app/SpaceSettingsPanel.tsx` that exposes six range sliders for configuring the space background (comet speed min/max, comet size min/max, star radius min/max) and a Reset button. Opened via the hamburger in `Navbar`. Reads and writes `useSpaceSettingsStore`. |
| `useSpaceSettingsStore` | Zustand store at `src/app/spaceSettingsStore.ts` owning the six `SpaceSettings` values, individual setters, and a `reset()` action. The canonical source of truth for space background configuration. See `.chatgpt/project-context.md` for the store shape. |

## Pages

| Route | Page | Purpose |
|---|---|
| `#/` | `HomePage` | Portfolio homepage — hero and featured work |
| `#/resume` | `ResumePage` | Filter-driven resume explorer |
| `#/about` | `AboutPage` | Full bio, availability, contact info, and timeline sourced from `RESUME.profile` |

### HomePage widgets

`HomePage` is composed of two widget slices mounted in order:

- **`HeroSection`** (`src/widgets/hero-section/`) — display name, positioning subline, three CTAs: "View featured work" → `#featured-work`, "Download CV" → LinkedIn PDF, "More about me" → `#/about`. Subtitle sourced from `profile.title`.
- **`FeaturedWorkSection`** (`src/widgets/featured-work-section/`) — two curated project entries rendered as `<article>` elements with role, outcome, and stack chips.

## Bounded context

This is a single-page, read-only presentation of resume and portfolio data. There
is no backend, no authentication, and no mutable state beyond UI filter selections
and space background settings.
The canonical data source is the static `RESUME` object in
`src/entities/resume/data.ts`, populated with real content. `RESUME.experiences`
is the single source of truth for all career, education, and project entries.

## Key invariants

- `skillIndex.ts` invariant: see `.chatgpt/project-context.md`.
- Filter state and Zustand store shape: see `.chatgpt/project-context.md`.
- Domain → UI mapping happens only in `features/*/lib` presentation helpers or widget-local `widgets/*/lib` adapters.
- `shared/` UI components consume view models, never domain entities directly.
- `WorkExperience.end` is optional — omitting it signals an ongoing role.
- `applyFilters` date-interval logic uses `"9999-12"` as a sentinel for open-ended roles; this must not be changed without updating tests.
- `BottomSheet` must not import from `entities` or `features` — it is domain-agnostic.
- `getGroupedSkillOptions` is the only place skill-to-group mapping occurs; no other layer may reimplement this grouping.
- `RESUME` is the single canonical source for all personal and professional data. `RESUME.profile` is the only source for identity and contact information — no other file may duplicate these values.
- `Navbar` must not import from `entities` or `features` — it is domain-agnostic. Active state is always derived from the `activeHref` prop, never from `window.location` directly.
- `toTimelineViewModels` is the only place `WorkExperience` → `TimelineViewModel` mapping occurs; it lives in `src/widgets/timeline/lib`.
- `useSpaceSettingsStore` is the single source of truth for space background configuration. No other file may hardcode comet or star sizing values.
- `SpaceSettingsPanel` must not import from `entities` or `features` — it is an app-shell concern.

## UI presentation rules

- `WorkExperienceCard` is a **controlled component** — it accepts `isOpen`, `onOpen`, `onClose` props. Active sheet state is owned by `ResumePage`, not by the card. Only one sheet can be open at a time.
- `WorkExperienceCard` is a **scanning surface** — it shows role, company, dates, `description.title` (not fulltext), and a "Read more →" or "View skills →" affordance.
- `description.fulltext` is only rendered inside the `BottomSheet`, never on the card itself.
- Skill chips are shown inside the `BottomSheet`, not directly on the card.
- Cards with no description show "View skills →"; cards with a description show "Read more →".
- Active filters are grouped by category (Stack type / Skills) with an `aria-labelledby` label on each group.
- `Timeline` widget: only one popover is open at a time. Clicking a dot opens its `PopoverCard`; clicking again or pressing Escape closes it. The dot shows `scale-125` unconditionally when active, and `group-hover:scale-125` when inactive.
- `Timeline` widget uses a center-line layout on `md+` (events alternate left/right) and a single left-rail layout on mobile.
- `PopoverCard` receives a `side` prop (`'left' | 'right'`) that drives text alignment and layout direction.
- `Navbar` uses two layout branches inside a single `<nav aria-label="Main">` landmark: a sticky header (`hidden md:flex`) on desktop and a fixed bottom tab bar (`flex md:hidden`) on mobile. Both branches render the same three nav destinations (Home, Resume, About) plus a hamburger button that opens `SpaceSettingsPanel`. The active destination carries `aria-current="page"` in both branches.
- `Navbar` desktop header: transparent at top, transitions to `bg-black/60 backdrop-blur-md border-b border-white/10` after scrolling 16px (`useScrolled` hook). The hamburger sits at the right end of the header row. The hook lives inside `src/widgets/navbar/`.
- `Navbar` tab bar: four slots — Home, Resume, About, Settings (hamburger). Icons: `Home`, `FileText`, `User` (nav), custom hamburger SVG (settings). `min-h-[56px]` for touch targets.
- `SpaceSettingsPanel` open state is **local to `Navbar`** (`useState`) — it is transient UI state, not persisted in any store.
- `SpaceSettingsPanel` is a slide-in drawer (`translate-x` transition, z-40) with a semi-transparent backdrop (z-30). It renders inside `Navbar`'s JSX return, co-located with its trigger.

## Dark mode

- Dark mode is driven by `prefers-color-scheme` (system preference) via Tailwind's `darkMode: 'media'` config.
- No manual toggle exists — the app always follows the OS setting.
- Native `<select>` elements rely on OS rendering for dark mode; custom components like `SearchableMultiSelect` require explicit dark-mode classes.
