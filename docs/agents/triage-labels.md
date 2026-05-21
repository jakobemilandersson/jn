# Triage Labels

These are the five canonical triage labels for this repo.

| Role | Label string | Meaning |
|---|---|---|
| Needs evaluation | `needs-triage` | Maintainer needs to evaluate this issue |
| Waiting on reporter | `needs-info` | Blocked — need more information from the person who filed it |
| AFK-ready | `ready-for-agent` | Fully specified; an AI agent can implement it without human context |
| Human-ready | `ready-for-human` | Fully specified; requires a human to implement |
| Won't fix | `wontfix` | Will not be actioned |

## State machine

```
[opened] → needs-triage
         → needs-info (if under-specified)
         → ready-for-agent (if fully specified and AFK-safe)
         → ready-for-human (if fully specified but needs human judgment)
         → wontfix (if out of scope or rejected)
```

## Creating labels in GitHub

```bash
gh label create needs-triage --color "e4e669" --description "Maintainer needs to evaluate"
gh label create needs-info --color "d876e3" --description "Waiting on reporter"
gh label create ready-for-agent --color "0075ca" --description "AFK-ready for an AI agent"
gh label create ready-for-human --color "008672" --description "Ready for human implementation"
gh label create wontfix --color "ffffff" --description "Will not be actioned"
```
