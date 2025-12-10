# jakob-now

Interactive resume explorer built with **React + TypeScript + Vite** using **Mini-FSD architecture**.

Users can filter Jakob’s work experience by:
- Stack Type
- Skills (multi-select, AND-semantics)

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
- `resolveSkill(name)`
- `getAllSkills()`

### 🔍 SearchableMultiSelect
Searchable dropdown with:
- SkillChip rendering
- Memoized chip rendering
- String-based filtering integration

### ⚙️ Filtering System
`applyFilters(stackType, skills)`:
- Exact stackType matching
- AND logic for skills (based on `skill.presentation`)

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
- Tests for domain logic, filters, UI components.

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

## 📝 License
MIT
