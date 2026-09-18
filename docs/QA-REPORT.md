# QA Report

Date: 2026-09-18

## Latest verified build

- Commit: `560b98ef03d51df52575e32a3f10e0ed6f606c06`
- GitHub Actions run: `35289957203`
- Quality build: **PASS**
- GitHub Pages deployment: **PASS**
- Screenshot artifact ID: `10525528997`
- Artifact digest: `sha256:e7045409f65c9081c990eed19f078bd353e37cddd5b0d15ee866d6d9615a4c10`

## Route coverage

Main Chromium suite: 31 routes:
- 20 shell/product routes: Executive, Analytics, Ecommerce, CRM, Finance, Healthcare, Tables, Forms, Calendar, Projects, Chat, Email, Files, Invoice, Components, Settings, Search, Notifications, Kanban, Users.
- 7 auth routes: Login, Register, Forgot Password, Reset Password, Two-factor, Verify Email, Lock Screen.
- 4 utility routes: 404, 500, Maintenance, Coming Soon.

Marketing suite:
- Landing
- Demos

## Viewports and UI states

- Desktop: 1440×1000
- Tablet: 820×1180
- Mobile: 390×844
- RTL + Light
- LTR + Dark

Main route state captures: 31 × 3 × 2 = 186.
Marketing state captures: 2 × 3 × 2 = 12.
Combined: 198 screenshots/states per full quality run.

## Automated checks

- successful responses and visible primary content
- default RTL and Light state
- horizontal overflow tolerance
- Light/Dark toggle
- RTL/LTR toggle
- command palette keyboard flow
- mobile sidebar open/close
- compact/full sidebar preference switching on desktop
- browser console error collection
- failed request collection with only known speculative HEAD abort excluded
- Ecommerce revenue/orders mode
- CRM retention/value mode
- Finance cash/profit mode
- Healthcare flow/wait mode
- table search/selection
- forms validation/wizard progression
- calendar mode/new event
- projects filtering/search
- chat send flow
- email search/open/compose
- files search/select/upload demo flow
- invoice search/send
- components state/actions
- settings persistence choices including Semi-dark computed sidebar state
- global search
- notifications mark/filter
- Kanban move flow
- user search/select/invite

## Build checks

- frozen dependency installation
- ESLint
- TypeScript typecheck
- static Pages production build
- Chromium product QA
- Chromium marketing QA
- QA artifact upload
- Pages artifact upload
- GitHub Pages deployment

## Visual review

The current flagship shell/data-polish artifact was manually reviewed. No visual blocker was identified in the inspected desktop flagship captures, and the previous visual milestone included representative mobile inspection across flagship and app routes.

## Current gate result

Functional/browser regression gate: **PASS** for the checks above.
Accessibility gate: **being added next; not yet passed**.
Performance/security/package/marketplace gates: **not yet passed**.
Full release gate: **NOT PASSED**.
