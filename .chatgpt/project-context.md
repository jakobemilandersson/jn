# jakob-now — Project Context for ChatGPT (LLM System Instructions)

This document provides architectural, structural and behavioral context for the jakob-now project.
It is consumed by the ChatGPT assistant so that answers remain aligned with the project’s architecture,
coding standards, design principles, and data modeling choices.

---

# 📦 Project Summary

jakob-now is a **React + TypeScript + Vite SPA** for presenting Jakob’s resume in an interactive,
filter-driven explorer.

Users can filter work experiences by:
- Stack Type (`frontend`, `backend`, `fullstack`)
- Skills (multi-select, **AND or OR semantics via strict toggle**)

When skills are selected, filtered results are **ranked by relevance**, where experiences with more
matching skills are ordered before those with fewer matches.

The app is deployed on GitHub Pages and follows a **Mini-FSD (Feature-Sliced Design)** architecture.

---

# 🧱 Architecture (Mini-FSD)

## 🌐 App Shell & SEO Ownership (IMPORTANT)

The application uses a **static SPA shell** (`index.html`) as the canonical
surface for:

- SEO metadata (`title`, `description`)
- Canonical URL declaration
- Open Graph / social preview metadata
- JSON-LD structured data (e.g. `Person`)
- Crawl directives (`robots.txt`)

These concerns:
- **Must not** be implemented in React
- **Must not** be owned by features, widgets, or pages
- Are considered **deployment- and identity-level infrastructure**

React components may assume these guarantees but must not reimplement them.


## 📐 ARCHITECTURAL ENFORCEMENT (LINTING)

They are actively enforced via:
- **ESLint (flat config, ESLint v9)**
- `eslint-plugin-boundaries`
- `eslint-plugin-import`

### Enforcement Guarantees

The linting system enforces:
- Feature / entity / widget layer boundaries
- Public API–only imports across layers
- No deep imports except via `index.ts`
- Alias-only imports (`@features/*`, `@entities/*`, etc.)

- `features` **must not import** from `widgets`
- `widgets` **may import** from `features`, `entities`, and `shared`

Violations of architectural rules will fail CI and must be fixed before merge.

---

## 🔄 CONTINUOUS INTEGRATION (CI)

The project uses **GitHub Actions** to enforce architectural and behavioral
guarantees on pull requests.

CI guarantees:
- ESLint runs with **zero warnings allowed**
- Vitest runs in **non-watch CI mode** (`vitest run`)
- Checks re-run on every push to a pull request branch
- **Draft pull requests do not execute CI**
- Pull requests cannot be merged unless all checks pass

CI is treated as an **app-level quality gate**, not a convenience.

## 📦 MODULE RESOLUTION & IMPORT RULES (IMPORTANT)

The project uses **TypeScript + Vite path aliases** as a core architectural constraint.

### Canonical Aliases

```ts
@app/*       → src/app/*
@pages/*     → src/pages/*
@widgets/*   → src/widgets/*
@features/*  → src/features/*
@entities/*  → src/entities/*
@shared/*    → src/shared/*
```

### Rules (Mandatory)

- Cross-slice imports **must use aliases**
- Relative imports (`../`) are allowed **only within the same slice**
- Each slice exposes a public API via `index.ts`
- Consumers must not import internal files unless explicitly intended

### Correct Examples

```ts
import { applyFilters } from "@features/filters";
import type { WorkExperience } from "@entities/resume";
import { SkillChip } from "@shared/ui";
```

### Forbidden Examples

```ts
import { applyFilters } from "../../../features/filters/lib/applyFilters";
import { SkillChip } from "../../shared/ui/chips/SkillChip";
```

These rules enforce Mini-FSD boundaries, improve refactor safety,
and are relied upon by the LLM when reasoning about the codebase.

## ENTITIES LAYER
Defines **canonical domain models** and pure domain logic.
No ordering, filtering, or presentation logic lives in entities.

### Resume Domain
```
src/entities/resume/
    data.ts         → Hardcoded resume data (WorkExperience[])
    types.ts        → Domain types (Skill, StackType, WorkExperience)
    lib/
      skillIndex.ts → Canonical skill index (deduplication + resolution)
```

### Domain Models

#### `Skill`
```ts
type Skill = {
  presentation: string;
  stackType: 'frontend' | 'backend' | 'fullstack';
};
```

#### `WorkExperience`
```ts
type WorkExperience = {
  id: string;
  role: string;
  company: string;
  stackType: StackType;
  skills: Skill[];
  start: string;
  end?: string;
  description?: {
    title: string;
    fulltext: string;
  } | null;
};
```

### skillIndex.ts — Domain Normalization
Exports:
- `extractSkills(data: WorkExperience[])`
  - Deduplicates by `presentation`
  - Preserves first occurrence
- `getAllSkills()` (RESUME-backed convenience)
- `resolveSkill(name, data?)`

No other layer should implement its own skill deduplication or indexing.

---

## FEATURES LAYER
Encapsulates business logic.

```
src/features/filters/
    lib/applyFilters.ts
    lib/getSkillOptions.ts
    lib/mapSkillToChipProps.ts
    lib/useFilteredResume.ts
    model/useFilterStore.ts
    ui/FiltersPanel.tsx
    ui/SkillsField.tsx
    ui/StrictSkillsToggle.tsx
```

### Presentation Mapping Helpers (IMPORTANT)

Features may define **pure presentation-mapping helpers** that:
- Convert domain entities into UI-ready view models
- Contain no React or rendering logic
- Are reusable across features and widgets
- Prevent shared UI components from depending on entities

Example:
```ts
mapSkillToChipProps(skill, fallbackLabel)
```

These helpers:
- Belong in `features/*/lib`
- Must remain pure and testable
- Are the only place where domain → presentation mapping occurs

Shared UI components must consume view models only, never domain entities.

## WIDGETS LAYER (IMPORTANT)

Features may expose **feature-level abstractions** via their public `index.ts`, including:

- **UI orchestrators** (e.g. `FiltersPanel`)
  - Compose internal feature UI
  - Own Zustand wiring and internal control composition
  - Are the *only* UI surface pages should consume

- **Derived selector hooks** (e.g. `useFilteredResume`)
  - Encapsulate store access + feature semantics
  - Return ready-to-consume data for pages
  - Prevent pages from coordinating feature logic

Pages must not:
- Access feature stores directly via internal paths
- Import feature UI internals
- Reimplement feature semantics

### Text Presentation & Progressive Disclosure (IMPORTANT)

Widgets **may normalize domain text for presentation purposes only**, including:
- Trimming leading/trailing whitespace for previews
- Collapsing excessive blank lines in collapsed views
- Deriving preview-only representations of longer text
- Applying conditional visual affordances (e.g. fades) to indicate overflow

These transformations must:
- Be **pure and deterministic**
- Never mutate the underlying domain entity
- Preserve the original content in expanded or detailed views

Text normalization that affects **business meaning** or **data integrity**
must remain in the entities layer.

### Interactive Widget Pattern (NEW)

Widgets may define **interaction binders** that:
- Live inside the widget slice
- Import feature state (e.g. Zustand stores)
- Translate localized user intent into feature actions

Example:
```
widgets/work-experience/ui/WorkExperienceSkillBinder.tsx
```

This pattern exists to satisfy strict `features → widgets` import restrictions
while still enabling contextual interactivity.

### Work Experience Widget
```
src/widgets/work-experience/
  lib/
    classifySkills.ts   // Groups skills into matched / related / other
  ui/
    WorkExperienceCard.tsx
```

**Note:**  
Skill classification for presentation lives in widgets, not in features or entities.
Filtering eligibility remains owned by `features/filters`.

### Filtering Behavior
```ts
applyFilters(data, stackType, skills, strict)
```

Responsibilities:
- Filter by stackType
- Filter by skills:
  - `strict = true` → ALL selected skills must match
  - `strict = false` → ANY selected skill may match
- When skills are provided:
  - Results are **sorted by number of matching skills (descending)**
  - Sorting is stable for equal match counts
- Function is pure and data-injected (no RESUME imports)

Ordering logic belongs to the **features layer**, never pages or entities.

### SKILL_OPTIONS
- Derived from `getAllSkills()`
- Deduplicated and sorted A–Z
- Cached and frozen at module load
- Used as the canonical skill option list for UI

---

## SHARED UI LAYER

```
src/shared/ui/
    SearchableMultiSelect.tsx
    chips/
      SkillChip.tsx
      index.ts
```

Shared UI may also define **global layout primitives** (e.g. `Footer`) that:
- Contain no domain or business logic
- Are globally rendered at the app shell level
- May include external identity links or static navigation

These components remain domain-agnostic and must not depend on features or entities.

### SkillChip
Presentational component; color derives from `skill.stackType`.

### SearchableMultiSelect
- Renders SkillChips for selected values
- Maps `string` → `Skill` via `skillIndex`
- Memoized for performance

---

## PAGES LAYER
`ResumePage` composes filters, UI, and results.  
Pages contain no domain logic.

---

## STATE MANAGEMENT

Zustand store:
- `stackType: StackType | null`
- `skills: string[]`
- `strictSkillsMatch: boolean`

`clear()` resets all filter fields.

---

## TESTING RULES
- Tests must not depend on RESUME directly
- Domain logic is tested with explicit mock data
- Module-level constants (e.g. SKILL_OPTIONS) are tested using:
  - `vi.mock()`
  - `vi.resetModules()`
  - dynamic `import()`
- Filtering tests must assert both:
  - Inclusion/exclusion
  - Result ordering when relevant

---

## DESIGN PRINCIPLES
- Entities own domain data + normalization
- Features own filtering + state (including ordering)
- Widgets define *how matched data is interpreted for UI*
- Shared UI is pure presentation
- Pages compose but do not contain logic
- Skill metadata comes only from skillIndex

---

## GIT & CHANGE COMMUNICATION (LLM CONTEXT)

- Pull request titles must reflect **behavioral or UX-level changes**
- Titles should align with Mini-FSD ownership (features > pages > entities)
- Avoid implementation-focused wording in PR titles
- Ordering, filtering, and ranking changes are considered **feature logic**
- LLMs should prefer concise, industry-standard PR titles using:
  <type>(<scope>): <behavioral change>

