# Skill: PR Review

Triggered when the user asks to review a pull request.

## Output format

Post the review directly on the GitHub pull request using review type `COMMENT`.
Use this exact structure:

```
## Summary
One sentence describing what the change does.

## Verified
<type-specific checklist — only items relevant to this PR type>

## Action items
- Blocker: <specific violation — must fix before merge>
- Minor: <non-blocking improvement>
(omit section entirely if none)

## Verdict
<"No blockers — safe to merge" or "Blockers present — do not merge">

---
*Reviewed by AI pair-programmer (Perplexity)*
```

## Blocker definition

Anything violating rules defined in:
- `project-context.md` (architectural constraints, layer ownership, import rules, testing rules)
- `README.md` (git conventions)
- Space Instructions (tech stack, architectural enforcement)

Everything else is **Minor** at most.

## Type-specific checklists

### `feat`
- Correct layer ownership — logic in right slice
- Cross-slice imports use aliases, no deep imports
- New exports exposed via `index.ts`
- Tests exist and follow testing rules (no RESUME coupling, ordering asserted where relevant)
- No violations of `project-context.md` constraints
- Docs audit complete — `CONTEXT.md`, `project-context.md`, ADRs checked (or explicitly confirmed not needed)

### `fix`
- Root cause addressed, not just symptom
- Regression test covers the fixed case
- No unintended behaviour changes in adjacent logic
- No violations of `project-context.md` constraints

### `refactor`
- Behaviour unchanged
- No layer boundary crossings introduced
- No deep imports introduced
- No violations of `project-context.md` constraints
- Docs audit complete — `CONTEXT.md`, `project-context.md`, ADRs checked (or explicitly confirmed not needed)

### `test`
- No direct RESUME imports — explicit mock data used
- Module-level constants tested via `vi.mock()` + `vi.resetModules()` + dynamic `import()`
- Ordering asserted where filter behaviour is tested
- No violations of `project-context.md` constraints

### `docs`
- Content accurate against current source
- No stale markers or outdated descriptions
- Formatting consistent

### `chore`
- CI still passes
- Linting enforcement intact
- No architectural rules inadvertently weakened
