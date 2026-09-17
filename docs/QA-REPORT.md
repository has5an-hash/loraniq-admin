# QA Report

Date: 2026-09-17

## Verified build

- Commit: `73aebac9d107a2a4bd4c3598a1619dc9de5a9d16`
- GitHub Actions run: `35259952552`
- Result: **PASS**
- GitHub Pages deploy: **PASS**

## Routes covered

- `/` — Executive
- `/analytics/` — Analytics
- `/ecommerce/` — Ecommerce
- `/crm/` — CRM

## Viewports covered

- Desktop: 1440×1000
- Tablet: 820×1180
- Mobile: 390×844

## State matrix

Each route/viewport is captured in:

- RTL + Light
- LTR + Dark

Total visual captures per run: **24**.

## Automated browser checks

The Chromium QA script verifies:

- successful page response
- visible `#main-content`
- visible level-1 heading
- default RTL direction
- default light state
- horizontal overflow within 1px tolerance
- dark-theme toggle changes `<html>` state
- RTL/LTR toggle changes document direction to LTR
- command palette opens via Ctrl/Cmd+K, accepts search and closes with Escape
- mobile sidebar opens and closes at mobile viewport
- collection/failure on browser console errors
- collection/failure on failed network requests except the explicitly allowed cancelled speculative Next.js HEAD prefetch

Additional route interaction checks:

- Ecommerce: revenue/orders mode switch and expected order summary
- CRM: retention/value mode switch and expected CLV summary

## Build checks

Passed in the verified workflow:

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- static GitHub Pages production build
- Chromium QA
- Pages artifact upload
- GitHub Pages deployment

## Visual review performed

Generated screenshots were manually inspected for the implemented flagships. The current Executive, Analytics, Ecommerce and CRM compositions are visually distinct and materially improved over the earlier starter-like implementation. Ecommerce and CRM desktop/mobile RTL-light captures were explicitly reviewed after their implementation.

No release-level claim is made from this milestone review. Full final visual regression, accessibility, performance, browser compatibility and marketplace QA remain open.

## Known historical failure in this milestone

CRM commit `aeb54d902078012473d9d767d12c5da9f31e8bc6` failed at ESLint with:

`Parsing error: JSX element 'DropdownMenuContent' has no corresponding closing tag`

This was corrected in commit `73aebac9d107a2a4bd4c3598a1619dc9de5a9d16`, which then passed the full pipeline. The failed run must not be counted as a QA pass.

## Artifact

- Name: `loraniq-qa-screenshots`
- Artifact ID: `10514527023`
- SHA-256 digest reported by GitHub: `1b405310f6faa42560974dccedda611464e905e31f918729c065cb46f1faf0d1`

## Current gate result

Flagship milestone subset (Executive + Analytics + Ecommerce + CRM): **PASS for the checks listed above**.

Full product release gate: **NOT PASSED / NOT YET RUN**.
