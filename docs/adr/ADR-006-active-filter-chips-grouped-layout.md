# ADR-006: Active Filter Chips Grouped by Category

**Date:** 2026-05-19
**Status:** Accepted

## Context

Active filter chips were displayed in a flat undifferentiated row. When multiple filter
categories were active simultaneously it was unclear which chips belonged to which dimension
(stack type vs skills).

## Decision

Active filter chips are grouped by category (Stack type / Skills). Each group has a plain-text
label rendered as a `<span>` with an `id`, and the chip group `<div>` carries an
`aria-labelledby` pointing to that `id`. This allows screen readers to announce the group
name before reading the individual chip buttons.

## Consequences

- Each chip button retains its own `aria-label` (e.g. “Remove React filter”) — the group
  label is supplementary, not a replacement.
- Groups render only when they have at least one active chip.
- Layout uses `flex-wrap` per group row to handle chip overflow gracefully.
