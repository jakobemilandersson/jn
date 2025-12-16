# jakob-now — Project Context for ChatGPT (LLM System Instructions)

This document provides architectural, structural and behavioral context for the jakob-now project.
It is consumed by the ChatGPT assistant so that answers remain aligned with the project’s architecture,
coding standards, design principles, and data modeling choices.

---

# 📦 Project Summary

jakob-now is a **React + TypeScript + Vite SPA** for presenting Jakob’s resume in an interactive,
filter-driven explorer. Users can filter work experiences by:

- Stack Type (`frontend`, `backend`, `fullstack`)
- Skills (multi-select, **AND or OR semantics via strict toggle**)

The app is deployed on GitHub Pages and follows a **Mini-FSD (Feature-Sliced Design)** architecture.

---

# 🧱 Architecture (Mini-FSD)

## ENTITIES LAYER
This layer defines **canonical domain models** and pure domain logic.

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
  description: string;
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
Feature modules encapsulate business logic.

```
src/features/filters/
    lib/applyFilters.ts
    lib/getSkillOptions.ts
    model/useFilterStore.ts
    ui/SkillsField.tsx
    ui/StrictSkillsToggle.tsx
```

### Filtering Behavior
```ts
applyFilters(data, stackType, skills, strict)
```

- `stackType` matches by equality
- Skill filtering modes:
  - `strict = true` → ALL skills must match (AND)
  - `strict = false` → ANY skill may match (OR)
- Function is pure and data-injected (no RESUME imports)

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

## TESTING (additions)

- Tests must not depend on RESUME directly
- Domain logic is tested with explicit mock data
- Module-level constants (e.g. SKILL_OPTIONS) are tested using:
  - `vi.mock()`
  - `vi.resetModules()`
  - dynamic `import()`

---

## DESIGN PRINCIPLES

- Entities own domain data + normalization
- Features own filtering + state
- Shared UI is pure presentation
- Pages compose but do not contain logic
- Skill metadata comes only from skillIndex
