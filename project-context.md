# jakob-now — Project Context for ChatGPT (LLM System Instructions)

This document provides architectural, structural and behavioral context for the jakob-now project.
It is consumed by the ChatGPT assistant so that answers remain aligned with the project’s architecture,
coding standards, design principles, and data modeling choices.

---

# 📦 Project Summary

jakob-now is a **React + TypeScript + Vite SPA** for presenting Jakob’s resume in an interactive,
filter-driven explorer. Users can filter work experiences by:

- Stack Type (`frontend`, `backend`, `fullstack`)
- Skills (multi-select, AND filter semantics)

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
      skillIndex.ts → Derived skill index (Map for O(1) lookup)
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
- `resolveSkill(name): Skill | null`
- `getAllSkills(): readonly Skill[]`

Used throughout features + UI.

---

## FEATURES LAYER
Feature modules encapsulate business logic.

```
src/features/filters/
    lib/applyFilters.ts
    lib/getSkillOptions.ts
    model/useFilterStore.ts
    ui/SkillsField.tsx
```

Filtering behavior:
- `applyFilters` performs AND logic across selected skills.
- Filters operate on `string[]` (skill.presentation).

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
A presentational component that colors itself based on `skill.stackType`.

### SearchableMultiSelect
- Renders SkillChips inside selected area.
- Uses `resolveSkill` to map strings → Skill objects.
- Memoized.

---

## PAGES LAYER
`ResumePage` composes filters + UI + skill chips.

---

# STATE MANAGEMENT

Zustand store:
- `stackType: StackType | null`
- `skills: string[]`

---

# TESTING

Vitest + React Testing Library.

Tests cover:
- skillIndex
- applyFilters
- SKILL_OPTIONS
- SkillChip
- SearchableMultiSelect

---

# DESIGN PRINCIPLES

- Entities own domain data + normalization
- Features own filtering + state
- Shared UI is pure presentation
- Pages compose but do not contain logic
- Skill metadata comes only from skillIndex
