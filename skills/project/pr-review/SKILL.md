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
<“No blockers — safe to merge” or “Blockers present — do not merge”>

---
*Reviewed by AI pair-programmer (Perplexity)*
```

## Blocker definition

Anything violating rules defined in:
- `project-context.md` (architectural constraints, layer ownership, import rules, testing rules)
- `README.md` (git conventions)
- Space Instructions (tech stack, architectural enforcement)

Everything else is **Minor** at most.

## Docs audit enforcement (CRITICAL — read before reviewing any feat or refactor PR)

For every `feat` or `refactor` PR that touches any file under `src/`:

1. Inspect the PR diff for changes to `CONTEXT.md`, `.chatgpt/project-context.md`, or `docs/adr/`.
2. If **none** of those files appear in the diff, you **must** determine whether they should have been updated:
   - Did the PR introduce new domain types, terms, or UI components? → `CONTEXT.md` required.
   - Did the PR change routing, layer rules, import constraints, or tooling? → `project-context.md` required.
   - Did the PR introduce a hard-to-reverse architectural decision? → ADR required.
3. If any of those should have been updated but weren’t, it is a **Blocker**. Use this exact action item:
   > Blocker: Docs audit incomplete — `<file(s)>` must be updated to reflect `<what changed>`. See the Docs audit checklist in the PR template.
4. If none needed updating, confirm this explicitly in the Verified section:
   > Docs audit: no new domain terms, architectural changes, or ADR-worthy decisions — not needed.

You **must not** approve a `feat` or `refactor` PR without explicitly resolving step 4 above.

## Type-specific checklists

### `feat`
- Correct layer ownership — logic in right slice
- Cross-slice imports use aliases, no deep imports
- New exports exposed via `index.ts`
- Tests exist and follow testing rules (no RESUME coupling, ordering asserted where relevant)
- No violations of `project-context.md` constraints
- Docs audit complete (see section above — **mandatory**)

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
- Docs audit complete (see section above — **mandatory**)

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
