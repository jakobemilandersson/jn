# ADR-007: Skill Filter Options Grouped by Stack Type

**Date:** 2026-05-19
**Status:** Accepted

> **Note:** This ADR was originally filed as `ADR-004-skill-filter-grouped-by-stack-type.md`
> in error (colliding with `ADR-004-hash-routing.md`). Renumbered to ADR-007 in the
> docs audit of 2026-05-23.

## Context

The skills filter displayed all skills in a flat list. As the number of skills grew, the list
became hard to scan. Skills already carry a `stackType` on the domain model, making grouping
a natural fit.

## Decision

Skill options in `SearchableMultiSelect` are grouped by `stackType` using an `OptionGroup[]`
view model. A `getGroupedSkillOptions` helper in `features/filters/lib` produces this view model.
Groups with zero options are omitted.

The `OptionGroup` type is defined in `src/shared/ui/SearchableMultiSelect.tsx` and exported
via `src/shared/ui/index.ts`.

## Consequences

- `OptionGroup` lives in `shared/ui` — it is a view model type, not a domain type.
- `getGroupedSkillOptions` is the single place for skill-to-group mapping; no other layer may reimplement it.
- Groups render in order: frontend → backend → fullstack.
- Groups with zero skills are silently omitted from the rendered output.
