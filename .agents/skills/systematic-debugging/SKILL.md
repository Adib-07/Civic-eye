---
name: systematic-debugging
description: Systematically diagnose and fix software bugs by reproducing issues, tracing root causes, testing hypotheses, applying minimal fixes, and verifying regressions.
---

# Systematic Debugging

Follow this process for debugging tasks.

## 1. Reproduce

- Reproduce the reported issue before changing code.
- Identify the smallest reliable reproduction.
- Prefer an automated failing test when practical.

## 2. Investigate Root Cause

- Inspect the relevant code and data flow.
- Trace inputs, state, API calls, database operations, and UI state.
- Do not guess or immediately patch symptoms.
- Form explicit hypotheses and test them.

## 3. Identify Scope

- Search the codebase for similar patterns.
- Determine whether the problem is in frontend, backend, API contracts, database, authentication, state management, or external services.
- Inspect recent git changes when useful.

## 4. Apply Minimal Fix

- Fix the actual root cause.
- Avoid unnecessary rewrites.
- Preserve existing functionality and architecture.
- Do not weaken security or validation.
- Add a regression test when practical.

## 5. Verify

- Reproduce the original scenario again.
- Run relevant tests.
- Run lint/typecheck/build when appropriate.
- Check adjacent functionality for regressions.
- Report exactly what was changed and how it was verified.

## Rules

- Never modify files during an investigation-only request.
- Never make destructive database changes without explicit approval.
- Never hide errors with superficial UI workarounds.
- Prefer small, maintainable changes.
