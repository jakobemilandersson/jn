# ADR-005: CI Coverage Reporting and Dependency Audit

**Date:** 2026-05-20
**Status:** Accepted

## Context

A full repo audit identified three gaps:
1. The deploy workflow could fire on a build that had never passed lint or tests.
2. There was no test coverage reporting.
3. The dependency tree had an esbuild version conflict causing `pnpm audit` to fail.

## Decision

1. **Deploy gates on CI**: the deploy job declares a `needs:` dependency on the lint-and-test job.
2. **Coverage reporting**: Vitest is configured to produce a coverage report; CI posts it as a
   PR comment using `if: always()` so the comment appears even when thresholds fail.
3. **Coverage exclude list**: `src/**/*.spec.{ts,tsx}` and `src/**/*.test.{ts,tsx}` are excluded
   from coverage instrumentation.
4. **esbuild override**: `pnpm.overrides` in `package.json` pins `esbuild` to resolve the audit conflict.

## Consequences

- A failed lint or test run blocks deploy — intentional.
- The esbuild pin must be reviewed when upgrading Vite or other build tooling.
- Coverage thresholds, if set, will block merge; the PR comment always appears regardless (`if: always()`).
