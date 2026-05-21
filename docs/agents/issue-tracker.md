# Issue Tracker

Issues for this repo live in **GitHub Issues** at `jakobemilandersson/jn`.

## Tooling

Use the `gh` CLI for all issue operations:

- Create: `gh issue create --title "..." --body "..." --label "..."`
- List: `gh issue list`
- View: `gh issue view <number>`
- Edit: `gh issue edit <number> --add-label "..." --remove-label "..."`
- Close: `gh issue close <number>`

## Conventions

- Issue titles follow the same behavioral/UX framing as commit messages (describe the observable problem or goal, not the implementation).
- Labels drive triage state — see `docs/agents/triage-labels.md`.
- Link issues to PRs via `Closes #<number>` in the PR body.
