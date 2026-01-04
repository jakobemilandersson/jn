# jakob-now

Interactive resume explorer built with **React + TypeScript + Vite** using **Mini-FSD architecture**.

Users can filter Jakob’s work experience by:
- Stack Type
- Skills (multi-select, **AND or OR semantics via strict toggle**)

Results are **ranked by relevance** when skills are selected: experiences with more matching skills appear first.

---

## 🚀 Features

### 📝 Expandable Experience Descriptions

Each work experience includes a structured description with:
- A concise **summary title** for quick scanning
- An expandable **full description** for deeper context

Descriptions use a progressive disclosure pattern, showing a readable preview
with a subtle fade when collapsed and revealing full content on interaction.

### 🎯 Result Relevance
Filtered results visually highlight:
- Skills that directly match selected filters
- Additional related skills for context

When multiple skills are selected, a subtle match-strength indicator explains
why a result appears.

### 🎨 SkillChip
A presentational chip reflecting `skill.stackType` via colors.

- SkillChips rendered inside **WorkExperience cards** are clickable.
- Clicking a chip toggles the corresponding skill filter and immediately updates results.
- This interaction is **scoped to WorkExperience cards only**.

### 🧱 Structured Skill Model
```ts
type Skill = {
  presentation: string;
  stackType: "frontend" | "backend" | "fullstack";
};
```

### 🔎 skillIndex
Provides:
- `resolveSkill(name, data?)`
- `getAllSkills()`
- `extractSkills(data)` (deduplicates by presentation)

Acts as the **canonical source of skill metadata**.

### 🔍 SearchableMultiSelect
Searchable dropdown with:
- SkillChip rendering
- Memoized chip rendering
- String-based filtering integration

### ⚙️ Filtering System
```ts
applyFilters(data, stackType, skills, strict)
```
- Exact stackType matching
- Skill filtering supports:
  - **Strict mode (AND)** — all selected skills must match
  - **Loose mode (OR)** — any selected skill may match
- When skills are selected, results are **sorted by number of matching skills (descending)**.
- Filtering and ordering are pure and data-injected.

---

## 📁 Project Structure

```
src/
  entities/
    resume/
      data.ts
      types.ts
      lib/skillIndex.ts
  features/
    filters/
      index.ts
      lib/
        applyFilters.ts
        getSkillOptions.ts
        useFilteredResume.ts
      model/
        useFilterStore.ts
      ui/
        FiltersPanel.tsx
        SkillsField.tsx
        StrictSkillsToggle.tsx
  shared/
    ui/
      SearchableMultiSelect.tsx
      chips/
        SkillChip.tsx
        index.ts
  pages/
    ResumePage/index.tsx
  widgets/
    work-experience/
      index.ts
      ui/
        WorkExperienceCard.tsx
```

---

## ⚙️ Filtering System

```ts
useFilteredResume(data)
```

- Feature-level selector hook
- Encapsulates:
  - filter state access
  - filtering semantics
  - relevance-based sorting
- Pages consume filtered results without coordinating logic

```tsx
<FiltersPanel />
```

- Public UI surface of the filters feature
- Internally composes all filter controls
- Pages must not import feature UI internals

Filtering behavior remains unchanged:
- StackType filtering
- Skill filtering with strict (AND) / loose (OR) semantics
- Results ranked by number of matching skills (descending)

### Skill Rendering

Selected skills are rendered via **feature-provided presentation logic**:

```tsx
<SearchableMultiSelect
  renderSelected={(value) => <SkillChip ... />}
/>
```

This ensures:
- Shared UI remains domain-agnostic
- Skill metadata resolution lives in features
- Visual semantics stay consistent across the app

---

## 🧪 Testing
- Vitest + React Testing Library.
- Tests for domain logic, filters, and UI components.
- Interactive WorkExperience skill filtering is covered by a widget-level test
- Filter tests assert both **filter semantics** and **result ordering**.
- Domain tests use explicit mock data (no RESUME coupling).

Run tests:
```
pnpm test
```

---

## 🧪 Code Quality & Tooling

This project uses a **strict, architecture-aware linting setup**.

### Linting

Run all lint rules:

```
pnpm lint
```

Automatically fix where possible:

```
pnpm lint:fix
```

### Formatting

Format all supported files using Prettier:

```
pnpm format
```

### Continuous Integration (CI)

All pull requests are automatically validated using **GitHub Actions**:

- ESLint runs with **zero warnings tolerated**
- Vitest runs in **CI mode** (`vitest run`)
- Checks re-run on every push to a PR branch
- **Draft pull requests are ignored**
- Merges are blocked unless all checks pass

This ensures architectural boundaries and test guarantees are enforced
before code can be merged.


### Notes

- ESLint uses a flat config (`eslint.config.ts`)
- Architectural rules are enforced automatically
- Deep imports across layers are disallowed
- Only public APIs (`index.ts`) may be imported across layers


---

## 🧬 Technologies
React  
TypeScript  
Vite  
Tailwind  
Zustand  
Vitest

---

## 🔀 Git & Pull Request Guidelines

This project follows a lightweight, feature-oriented git workflow.

- Pull request titles should describe **observable behavior**, not implementation
- Titles follow the format:

  `feature(filters): rank results by skill relevance`

- Scope should align with the Mini-FSD slice being changed
- Commits may be granular; PR titles should summarize user-visible impact

## 📝 License
MIT
