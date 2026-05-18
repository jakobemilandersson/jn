# jakob-now — Project Context

Architectural constraints, layer ownership rules, domain types, and non-obvious
decisions for the jakob-now project. Read by the AI pair-programmer at the start
of each conversation.

This document covers decisions that cannot be inferred from reading the source alone.
It does not document feature implementations — read the source for those.

Update this file only for:
- Major architectural changes (new layers, new patterns)
- Design system changes (replacing Tailwind, adding a component library)
- Tooling changes (new test runner, CI changes, package manager)
- New domain-level constraints or data model decisions

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

## Layer Ownership

| Layer | Owns |
|---|---|
| `entities` | Domain models, raw data, normalization logic |
| `features` | Business logic, filter state, ordering, domain → view model mapping |
| `widgets` | UI composition, presentation interpretation, interaction wiring |
| `shared` | Domain-agnostic UI primitives and layout components |
| `pages` | Composition only — no logic |
| `app` | App shell, global styles, decorative root elements |

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

```ts
type StackType = 'fullstack' | 'backend' | 'frontend';

type Skill = {
  presentation: string;
  stackType: 'frontend' | 'backend' | 'fullstack';
};

type WorkExperienceDescription = {
  title: string;
  fulltext: string;
};

type WorkExperience = {
  id: string;
  role: string;
  company: string;
  stackType: StackType;
  skills: Skill[];
  start: string;
  end?: string;
  description?: WorkExperienceDescription | null;
};
```

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
  stackType: StackType | null;
  skills: string[];
  strictSkillsMatch: boolean;
  clear(): void;
}
```

***

## Git Conventions

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