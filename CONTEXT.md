# jakob-now — Domain Context

Filter-driven resume explorer SPA. Lets a visitor filter work experience entries
by stack type, skills, and date range to surface the most relevant parts of a
resume for a given role or audience.

## Domain language

| Term | Meaning |
|---|---|
| `WorkExperience` | A single job or engagement: role, company, stack type, skills, date range, optional description |
| `Skill` | A named technology or capability, tagged with a `stackType` |
| `StackType` | One of `frontend`, `backend`, `fullstack` — classifies an experience or skill |
| `YearMonth` | A `"YYYY-MM"` branded string representing a month in time (e.g. `"2024-03"`) |
| Filter | A set of active `stackTypes`, `skills`, a `strictSkillsMatch` flag, and an optional date range |
| Strict match | When true, a `WorkExperience` must contain **all** selected skills to appear in results |

## Bounded context

This is a single-page, read-only presentation of resume data. There is no backend,
no authentication, and no mutable state beyond UI filter selections. The canonical
data source is the static `RESUME` object in `src/entities/resume/`.

## Key invariants

- `skillIndex.ts` is the only place skill metadata is indexed or deduplicated.
- Filter state lives exclusively in the Zustand store in `features/`.
- Domain → UI mapping happens only in `features/*/lib` presentation helpers.
- `shared/` UI components consume view models, never domain entities directly.
