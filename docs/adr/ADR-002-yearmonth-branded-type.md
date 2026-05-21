# ADR-002: YearMonth as a Branded String Type

**Date:** 2026-05-20
**Status:** Accepted

## Context

The `start` and `end` fields on `WorkExperience` were typed as plain `string`. This allowed any
string to be assigned, making the type contract too loose for date-interval filtering logic that
depends on lexicographic `"YYYY-MM"` comparison.

## Decision

Introduce a branded type:

```ts
type YearMonth = string & { readonly __brand: 'YearMonth' };
```

All `start`/`end` literals in `data.ts` are cast with `as YearMonth`. The open-ended sentinel
`"9999-12"` used internally in `applyFilters` is also cast as `YearMonth`.

`YearMonth` is defined and exported from `src/entities/resume/types.ts`.

## Consequences

- TypeScript enforces that only explicitly cast values are assigned to date fields.
- Test fixtures must use `as YearMonth` casts — plain string literals will be a type error.
- The sentinel `"9999-12"` is an implementation detail of `applyFilters` and must not leak into domain data or UI.
