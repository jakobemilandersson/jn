# jakob-now — Project Context

Architectural constraints, layer ownership rules, and non-obvious decisions for
the jakob-now project. Read by the AI pair-programmer at the start of each conversation.

This document covers decisions that cannot be inferred from reading the source alone.
It does not document feature implementations — read the source for those.

Update this file only for:
- Major architectural changes (new layers, new architectural patterns)
- Design system changes (replacing Tailwind, adding a component library)
- Tooling changes (new test runner, CI changes, package manager)
- New domain-level constraints or data model decisions

## See also

- `CONTEXT.md` — domain language, UI presentation rules, bounded context
- `docs/adr/` — architectural decision records
- `AGENTS.md` — skill entry point (issue tracker, triage labels, domain doc layout)

> **Content split:** this file owns architectural constraints, layer rules, import
> rules, testing rules, git/PR conventions, the Zustand store shape, and AI workflow
> instructions. `CONTEXT.md` owns domain language and UI presentation rules.
> Never duplicate content across these files — cross-reference instead.

***

## Project

React + TypeScript + Vite SPA. Filter-driven resume explorer. Deployed on GitHub Pages at jakob.now.
Mini-FSD (Feature-Sliced Design) architecture.

***

## App Shell & SEO Ownership

`index.html` is the canonical surface for:
- SEO metadata (`title`, `description`)
- Canonical URL
- Open Graph / social preview metadata
- JSON-LD structured data (e.g. `Person`)
- Crawl directives (`robots.txt`)

These **must not** be implemented in React components. They are deployment- and
identity-level infrastructure. React components may assume these guarantees but
must not reimplement them.

### Decorative App Shell Elements

Purely decorative visual elements (e.g. canvas-based animated backgrounds) may
be mounted at the application root. They must:
- Live in `src/app/`
- Not depend on entities, features, or widgets
- Not affect layout flow or business logic
- Be non-interactive and accessibility-neutral

***

## Routing

The app currently uses **hash-based routing** via a `useHashRoute` hook in
`src/app/main.tsx`. Routes: `#/` → `ResumePage`, `#/about` → `AboutPage`.

This is a **temporary approach** — see `docs/adr/ADR-004-hash-routing.md`.
Migration to React Router v6 + `404.html` is tracked in issue #50.

When #50 is delivered:
- Replace `useHashRoute` with `BrowserRouter` + `<Route>` definitions in `main.tsx`
- Extract the inline nav into `src/app/Nav.tsx` using `<NavLink>`
- Update ADR-004 status to Superseded and remove this note

***

## Layer Ownership

| Layer | Owns |
|---|---|
| `entities` | Domain models, raw data, normalization logic |
| `features` | Business logic, filter state, ordering, domain → view model mapping |
| `widgets` | UI composition, presentation interpretation, interaction wiring |
| `shared` | Domain-agnostic UI primitives and layout components |
| `pages` | Composition only — no logic |
| `app` | App shell, routing, global styles, decorative root elements |

**Critical constraints:**
- `features` must **not** import from `widgets`
- `pages` must **not** access feature stores directly or reimplement feature semantics
- `shared` UI must **not** depend on `entities` or `features` — consumes view models only

***

## Import Rules

Cross-slice imports must use path aliases. Relative imports (`../`) are only
allowed within the same slice. Each slice exposes a public API via `index.ts`;
no deep imports across layers.

### Canonical Aliases

```ts
@app/*       → src/app/*
@pages/*     → src/pages/*
@widgets/*   → src/widgets/*
@features/*  → src/features/*
@entities/*  → src/entities/*
@shared/*    → src/shared/*
```

### Examples

```ts
// Correct
import { applyFilters } from "@features/filters";
import type { WorkExperience } from "@entities/resume";
import { SkillChip } from "@shared/ui";

// Forbidden
import { applyFilters } from "../../../features/filters/lib/applyFilters";
import { SkillChip } from "../../shared/ui/chips/SkillChip";
```

These rules are enforced by ESLint (`eslint-plugin-boundaries`) and will fail CI.

***

## Domain Types

See `CONTEXT.md` for the canonical domain language glossary. The TypeScript type
definitions live in `src/entities/resume/types.ts`.

***

## skillIndex.ts — Canonical Skill Metadata Source

`src/entities/resume/lib/skillIndex.ts` is the **only** place skill metadata is
indexed or deduplicated. No other layer may implement its own skill deduplication
or indexing.

Exports: `extractSkills(data)`, `getAllSkills()`, `resolveSkill(name, data?)`

***

## Presentation Mapping (domain → view model)

Features may define pure presentation-mapping helpers in `features/*/lib` that
convert domain entities into UI-ready view models. These helpers:
- Contain no React or rendering logic
- Are the **only** place domain → presentation mapping occurs
- Keep shared UI components free from domain entity dependencies

Shared UI components must consume view models only, never domain entities directly.

***

## Widgets: Interaction Binder Pattern

Widgets may define interaction binders that live inside the widget slice, import
feature state (e.g. Zustand stores), and translate localized user intent into
feature actions.

Example: `widgets/work-experience/ui/WorkExperienceSkillBinder.tsx`

This pattern exists to satisfy the strict `features → widgets` import restriction
while still enabling contextual interactivity within widget UI.

***

## Widgets: Text Normalization

Widgets may normalize domain text for presentation purposes only (e.g. trimming
whitespace for previews, collapsing blank lines in collapsed views). These
transformations must:
- Be pure and deterministic
- Never mutate the underlying domain entity
- Preserve original content in expanded views

Text normalization that affects business meaning or data integrity belongs in
the entities layer.

***

## Testing Rules

- Tests must **not** import `RESUME` data directly — use explicit mock data
- Module-level constants (e.g. `SKILL_OPTIONS`) must be tested using `vi.mock()`,
  `vi.resetModules()`, and dynamic `import()`
- Filter tests must assert both inclusion/exclusion **and** result ordering
  where ordering is relevant

***

## Zustand Filter Store Shape

```ts
{
  stackTypes: StackType[];
  skills: string[];
  strictSkillsMatch: boolean;
  dateFrom: YearMonth | null;
  dateTo: YearMonth | null;
  toggleStackType(s: StackType): void;
  setStackTypes(stackTypes: StackType[]): void;
  toggleSkill(skill: string): void;
  setSkills(skills: string[]): void;
  setStrictSkillsMatch(strict: boolean): void;
  setDateFrom(date: YearMonth | null): void;
  setDateTo(date: YearMonth | null): void;
  clear(): void;
}
```

***

## Definition of Done (feat / refactor PRs)

Before a `feat` or `refactor` PR is considered ready to merge, the following
docs audit must be completed consciously — "not needed" is a valid answer, but
an omission is not.

- [ ] `CONTEXT.md` is accurate — domain language table reflects any new types,
      terms, or UI components introduced by the PR
- [ ] `project-context.md` is accurate — any new architectural constraint, layer
      rule, routing decision, or tooling change is recorded
- [ ] An ADR exists in `docs/adr/` if the PR introduces or changes an architectural
      decision (new pattern, new dependency, new layer rule, deviation from an
      existing ADR)
- [ ] Space instructions are up to date if any agent workflow rule changed

This checklist is part of the PR Review Formula `feat` checklist below.

***

## Git Conventions

### Commits & PR Titles

Commit messages and PR titles follow conventional commits scoped to the
Mini-FSD slice being changed:

```
  <type>(<scope>): <behavioral or UX-level change>
```

Examples:
```
  feat(filters): rank results by number of matching skills
  fix(widgets): preserve full description text in expanded view
  refactor(entities): extract WorkExperienceDescription as named type
```

- Type reflects intent: feat, fix, refactor, chore, test, docs
- Scope aligns with the owning layer/slice (filters, widgets, entities, etc.)
- Description reflects observable behavior, not implementation details

### Branch Naming

```
  <type>/<short-description>
```

Examples:
```
  feat/skill-filter-ranking
  fix/expanded-description-text
  docs/update-project-context
  refactor/extract-work-experience-description
```

- Lowercase and hyphenated — no spaces, no underscores
- 3–5 words max after the type prefix
- Type mirrors the conventional commit type for the change

***

## PR Review Formula

When asked to review a pull request, use this structure:

```
## Summary
One sentence describing what the change does.

## Verified
<type-specific checklist — only items relevant to this PR type>

## Action items
- Blocker: <specific violation — must fix before merge>
- Minor: <non-blocking improvement>
(omit section entirely if none)

## Verdict
<"No blockers — safe to merge" or "Blockers present — do not merge">

---
*Reviewed by AI pair-programmer (Perplexity)*
```

The review should be done on the GitHub pull request with review type 'COMMENT'.

### Blocker definition

Anything violating rules defined in:
- `project-context.md` (architectural constraints, layer ownership, import rules, testing rules)
- `README.md` (git conventions)
- Space Instructions (tech stack, architectural enforcement)

Everything else is Minor at most.

### Type-specific checklists

**`feat`**
- Correct layer ownership — logic in right slice
- Cross-slice imports use aliases, no deep imports
- New exports exposed via `index.ts`
- Tests exist and follow testing rules (no RESUME coupling, ordering asserted where relevant)
- No violations of project-context.md constraints
- Docs audit complete — CONTEXT.md, project-context.md, ADRs checked (or explicitly confirmed not needed)

**`fix`**
- Root cause addressed, not just symptom
- Regression test covers the fixed case
- No unintended behavior changes in adjacent logic
- No violations of project-context.md constraints

**`refactor`**
- Behavior unchanged
- No layer boundary crossings introduced
- No deep imports introduced
- No violations of project-context.md constraints
- Docs audit complete — CONTEXT.md, project-context.md, ADRs checked (or explicitly confirmed not needed)

**`test`**
- No direct RESUME imports — explicit mock data used
- Module-level constants tested via `vi.mock()` + `vi.resetModules()` + dynamic `import()`
- Ordering asserted where filter behavior is tested
- No violations of project-context.md constraints

**`docs`**
- Content accurate against current source
- No stale markers or outdated descriptions
- Formatting consistent

**`chore`**
- CI still passes
- Linting enforcement intact
- No architectural rules inadvertently weakened

***

## Agent Workflow: "Take action on the latest review"

When instructed with something similar to "take action on the latest review for PR #X",
follow these steps in order:

1. **Read the review** — fetch the most recent `COMMENT`-type pull request review for PR #X.
2. **Analyse action items** — identify all items listed under the `## Action items` section
   of that review. Decide which ones to fix: fix all `Blocker` items unconditionally;
   fix `Minor` items unless there is a clear reason not to (e.g. out of scope, conflicts
   with architectural rules, or requires clarification from the user).
3. **Implement the fixes** — make the necessary code changes on the PR branch, respecting
   all layer ownership, import alias, and testing rules defined in this document.
4. **Commit and push** — push the changes to the PR branch in a single commit. Use the
   conventional commit format: `fix(<scope>): <description of what was fixed>`.

***

## Agent Workflow: Skills with CI feedback loops

Skills like `tdd`, `diagnose`, and `improve-codebase-architecture` assume the agent
can run commands and observe output locally. In this environment (chatbot + GitHub
connector), the agent cannot execute code directly.

When running these skills:
1. Write the code change and push it to the PR branch.
2. **Pause and ask the user to run CI** (or `pnpm test` locally) and share the output.
3. Resume the skill loop once the user reports the result.

Do not attempt to infer test pass/fail from static analysis alone.
