# jakob-now — Domain Context

Filter-driven resume explorer SPA. Lets a visitor filter work experience entries
by stack type, skills, and date range to surface the most relevant parts of a
resume for a given role or audience.

> **Scope:** domain language, UI presentation rules, and bounded context only.
> Architectural constraints, layer ownership, import rules, and the Zustand store
> shape live in `.chatgpt/project-context.md`. Cross-reference, don't duplicate.

## Domain language

| Term | Meaning |
|---|---|
| `Resume` | The top-level domain object: `{ profile: ResumeProfile, experiences: WorkExperience[] }`. The canonical instance is exported as `RESUME` from `src/entities/resume/data.ts`. |
| `ResumeProfile` | Identity and contact information for the person behind the resume: `name`, `title`, `bio`, and `contact` (`email`, `linkedin`, `github`). Not filterable. Used by the About page. |
| `WorkExperience` | A single job or engagement: role, company, stack type, skills, date range, optional description |
| `Skill` | A named technology or capability, tagged with a `stackType` |
| `StackType` | One of `frontend`, `backend`, `fullstack` — classifies an experience or skill |
| `YearMonth` | A `"YYYY-MM"` branded string (e.g. `"2024-03"`). Used for `start` and `end` on `WorkExperience` and `TimelineEvent`. Open-ended (ongoing) roles omit `end`. Each entity slice that uses `YearMonth` declares it locally — it is not shared across entity boundaries. |
| Filter | A set of active `stackTypes`, `skills`, a `strictSkillsMatch` flag, `dateFrom`, and `dateTo` |
| Strict match | When true, a `WorkExperience` must contain **all** selected skills to appear in results |
| Date interval filter | An optional `dateFrom`/`dateTo` range (both `YearMonth | null`). Overlap logic: a role is included if its tenure overlaps the filter range. Open-ended roles use a `"9999-12"` sentinel for the upper bound. |
| `WorkExperienceDescription` | An optional object with `title: string` and `fulltext: string` attached to a `WorkExperience` |
| `BottomSheet` | The shared UI component at `src/shared/ui/BottomSheet.tsx`. A slide-up overlay used to show full `WorkExperienceDescription.fulltext` and skill chips. Accepts `isOpen`, `onClose`, `title`, and `children`. Domain-agnostic. |
| Active filter chip | A dismissible chip in the filter bar representing one active filter value. Grouped by category (Stack type / Skills) with `aria-labelledby` on each group. |
| `OptionGroup` | View model type defined in `src/shared/ui/SearchableMultiSelect.tsx` and exported via `src/shared/ui/index.ts`. Used to group skill filter options by `stackType`. |
| `TimelineEvent` | A single entry in the career/project timeline: `id`, `kind`, `title`, `start`, optional `subtitle`, `end`, `detail`, `url`, and `tags`. Defined in `src/entities/timeline/types.ts`. Independent of `WorkExperience`. |
| `TimelineEventKind` | Discriminates a `TimelineEvent` as one of `"work"`, `"education"`, or `"project"`. Determines dot colour and label style in the `Timeline` widget. |
| `TIMELINE` | The canonical static array of `TimelineEvent` entries, exported from `src/entities/timeline/data.ts`. The single source of truth for all timeline data — independent of `RESUME.experiences`. |
| `Timeline` | The widget component (`src/widgets/timeline`) that renders the vertical centre-line timeline on the About page. Reads directly from `TIMELINE`. Popover state (active event ID) is local `useState` — no Zustand. |

## Bounded context

This is a single-page, read-only presentation of resume data. There is no backend,
no authentication, and no mutable state beyond UI filter selections and timeline
popover state. The canonical data sources are the static `RESUME` object in
`src/entities/resume/data.ts` and the static `TIMELINE` array in
`src/entities/timeline/data.ts`.

## Key invariants

- `skillIndex.ts` invariant: see `.chatgpt/project-context.md`.
- Filter state and Zustand store shape: see `.chatgpt/project-context.md`.
- Domain → UI mapping happens only in `features/*/lib` presentation helpers.
- `shared/` UI components consume view models, never domain entities directly.
- `WorkExperience.end` is optional — omitting it signals an ongoing role.
- `applyFilters` date-interval logic uses `"9999-12"` as a sentinel for open-ended roles; this must not be changed without updating tests.
- `BottomSheet` must not import from `entities` or `features` — it is domain-agnostic.
- `getGroupedSkillOptions` is the only place skill-to-group mapping occurs; no other layer may reimplement this grouping.
- `RESUME` is the single canonical source for all personal and professional data. `RESUME.profile` is the only source for identity and contact information — no other file may duplicate these values.
- `TIMELINE` is the single canonical source for all timeline data. It must not derive from or duplicate `RESUME.experiences`.
- `entities/timeline` must not import from `entities/resume` — `YearMonth` is declared locally in each entity slice.

## UI presentation rules

- `WorkExperienceCard` is a **scanning surface** — it shows role, company, dates, `description.title` (not fulltext), and a "Read more →" or "View skills →" affordance.
- `description.fulltext` is only rendered inside the `BottomSheet`, never on the card itself.
- Skill chips are shown inside the `BottomSheet`, not directly on the card.
- Cards with no description show "View skills →"; cards with a description show "Read more →".
- Active filters are grouped by category (Stack type / Skills) with an `aria-labelledby` label on each group.
- `Timeline` is a **scanning surface** — dots show a one-line `title`. Full `detail`, `tags`, and `url` are revealed only inside the inline popover on activation.

## Dark mode

- Dark mode is driven by `prefers-color-scheme` (system preference) via Tailwind's `darkMode: 'media'` config.
- No manual toggle exists — the app always follows the OS setting.
- Native `<select>` elements rely on OS rendering for dark mode; custom components like `SearchableMultiSelect` require explicit dark-mode classes.
