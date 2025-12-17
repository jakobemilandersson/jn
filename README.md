# jakob-now

Interactive resume explorer built with **React + TypeScript + Vite** using **Mini-FSD architecture**.

Users can filter Jakob’s work experience by:
- Stack Type
- Skills (multi-select, **AND or OR semantics via strict toggle**)

Results are **ranked by relevance** when skills are selected: experiences with more matching skills appear first.

---

## 🚀 Features

### 🎨 SkillChip
A presentational chip reflecting `skill.stackType` via colors.

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
      lib/applyFilters.ts
      lib/getSkillOptions.ts
      model/useFilterStore.ts
      ui/SkillsField.tsx
      ui/StrictSkillsToggle.tsx
  shared/
    ui/
      SearchableMultiSelect.tsx
      chips/
        SkillChip.tsx
        index.ts
  pages/
    ResumePage/index.tsx
```

---

## 🧪 Testing
- Vitest + React Testing Library.
- Tests for domain logic, filters, and UI components.
- Filter tests assert both **filter semantics** and **result ordering**.
- Domain tests use explicit mock data (no RESUME coupling).

Run tests:
```
pnpm test
```

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
