## Agent skills

### Issue tracker

Issues live in GitHub Issues (`jakobemilandersson/jn`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-label vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Project skills

Project-specific agent workflows live in `skills/project/`. Fetch the relevant
`SKILL.md` via the GitHub MCP tool before executing.

| Invocation | Path |
|---|---|
| Bug report (`Bug: ...`) | `skills/project/bug-report/SKILL.md` |
| PR review | `skills/project/pr-review/SKILL.md` |
| Take action on review | `skills/project/take-action-on-review/SKILL.md` |

External skills from [`mattpocock/skills`](https://github.com/mattpocock/skills)
live at `skills/engineering/<skill-name>/SKILL.md` in that repo.

| Invocation name | Path in mattpocock/skills |
|---|---|
| `grill-with-docs` | `skills/engineering/grill-with-docs/SKILL.md` |
| `to-prd` | `skills/engineering/to-prd/SKILL.md` |
| `to-issues` | `skills/engineering/to-issues/SKILL.md` |
| `tdd` | `skills/engineering/tdd/SKILL.md` |
