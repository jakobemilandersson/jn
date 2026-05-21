# Domain Docs

This repo uses a **single-context** layout.

## Layout

| File / Directory | Purpose |
|---|---|
| `CONTEXT.md` (repo root) | Domain language, key concepts, bounded context |
| `docs/adr/` | Architecture Decision Records (ADRs) |

## Consumer rules for skills

- Read `CONTEXT.md` first to establish domain vocabulary before analysing source code.
- Check `docs/adr/` for past architectural decisions before proposing changes. If an ADR already addressed the area you're working in, respect its constraints or explicitly supersede it with a new ADR.
- If `CONTEXT.md` does not exist yet, fall back to `.chatgpt/project-context.md` for domain and architectural context.
- ADRs are append-only. Never edit a past ADR — write a new one that supersedes it.

## ADR format

```markdown
# ADR-NNN: <title>

**Date:** YYYY-MM-DD  
**Status:** Proposed | Accepted | Superseded by ADR-NNN

## Context
<what situation prompted this decision>

## Decision
<what was decided>

## Consequences
<trade-offs, follow-up work, constraints introduced>
```
