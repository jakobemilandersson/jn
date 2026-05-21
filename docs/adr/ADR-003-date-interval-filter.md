# ADR-003: Date Interval Filter with Overlap Logic

**Date:** 2026-05-20
**Status:** Accepted

## Context

Users needed to filter work experience entries by a date range (from/to month). The domain
required a clear definition of what “matches” means when a role’s tenure partially overlaps
the selected filter range.

## Decision

A role is included in results if its tenure **overlaps** the filter interval — i.e. the role
started before or on `dateTo` AND ended on or after `dateFrom`. Open-ended (ongoing) roles
use the sentinel `"9999-12"` as their upper bound for the overlap calculation.

Implementation:
- `dateFrom` and `dateTo` are added to the Zustand filter store as `YearMonth | null`.
- `applyFilters` receives optional `dateFrom`/`dateTo` params (default `null`) to preserve
  backward compatibility with existing call sites.
- A `matchesDateInterval` helper inside `applyFilters` encapsulates the overlap logic.
- `useFilteredResume` subscribes to both fields and forwards them to `applyFilters`.

## Consequences

- Changing the overlap definition (e.g. to strict containment) requires updating `matchesDateInterval` and its full test suite.
- The `"9999-12"` sentinel must not be changed without updating tests.
- `dateFrom`/`dateTo` being nullable means the filter is opt-in: no selection → all roles shown.
- Boundary conditions are tested: a role ending exactly on `dateFrom` is included; an interval entirely in the future returns an empty result.
