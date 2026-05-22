# Skill: Bug Report

Triggered when the user sends a message beginning with `Bug:`.

## Steps

Follow these steps in order. Do not skip or reorder them.

### 1. Read the codebase

Inspect the relevant source files to understand current behaviour, identify the
owning layer(s), and locate any existing tests that cover the affected logic.

Do **not** ask the user for information that can be inferred from the code.

### 2. Ask a follow-up only if truly needed

If steps to reproduce cannot be inferred from static analysis alone (e.g. requires
a specific user interaction or data combination not visible in code), ask a single,
focused question before proceeding. Otherwise skip directly to step 3.

### 3. Create a GitHub issue

- **Title:** plain language description of the broken behaviour (not conventional
  commit format — that belongs on the branch/PR, not the issue)
- **Label:** `bug`
- **Body template:**

```
## What's broken
<one sentence>

## Expected behaviour
<one sentence>

## Likely cause
<brief description of root cause based on codebase inspection>

## Owning layer
<entities | features | widgets | shared | app/pages>

## Relevant files
<list of files likely involved>

## Test coverage
<existing tests that cover this area, or "none found">
```

### 4. Present the issue

Share the issue link and a one-line complexity signal:

- "Looks straightforward — touches one layer, no cross-slice changes needed."
- "Moderate — touches multiple layers or requires careful test updates."
- "Complex — architectural implications or risk of unintended side effects."

### 5. Ask for confirmation

> "Shall I go ahead and fix this?"

### 6. If yes — implement and open a PR

- Implement the fix following all layer ownership, import alias, and testing rules
  defined in `project-context.md`.
- Push to a `fix/<short-description>` branch.
- Open a PR.
- **Pause and ask the user to run CI before proceeding.**
