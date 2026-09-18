# Project Status

Last updated: 2026-09-18

## Current milestone — Release hardening

Status: **In progress**

### Implemented product scope

- Persian-first RTL admin system with runtime RTL/LTR switching.
- Light, Dark, Soft, Bordered and persistent Semi-dark navigation skin behavior.
- Self-hosted Vazirmatn WOFF2 with SIL OFL provenance.
- Shared Loraniq shell, command palette, account menu, responsive mobile navigation and quick compact-sidebar control.
- Six distinct flagship dashboards: Executive, Analytics, Ecommerce, CRM, Finance and Healthcare.
- Operational routes for Data Tables, Forms, Calendar, Projects, Kanban, User Management, Chat, Email, File Manager, Invoice, Notifications, Search, UI Components and Appearance Settings.
- Auth routes: Login, Register, Forgot Password, Reset Password, Two-factor, Verify Email and Lock Screen.
- Utility routes: 404, 500, Maintenance and Coming Soon.
- Public Landing and real Demo Selector using screenshots captured from the deployed product.
- Four original Loraniq SVG illustrations for design system, responsive composition, motion and application depth.
- High-DPI dashboard preview pipeline: 3360×2100 source capture at DPR2 / JPEG quality 96.
- Vuexy-oriented visual polish with Metronic-oriented layout/component discipline, without copying proprietary code/assets/layouts.

### Latest verified quality gate

Verified commit: `a5be8e1ac8893b46ba077fe22c1f70345347bb06`
Workflow run: `35294882433`
Result: **PASS**
Pages deployment: **PASS**
Screenshot artifact: `loraniq-qa-screenshots`
Artifact ID: `10527811892`
Artifact digest: `sha256:d50b4677fa654c42c00f3ff6ad1bb5763fc9e914d0f75fc0438fbc05891ae9c6`

The main Chromium suite covers 31 product routes × 3 viewports × 2 direction/theme states = 186 screenshots/check states per run. Marketing QA adds Landing + Demos across the same three viewports and two states (12 more captures), for 198 state screenshots in the combined artifact.

### Latest visual-system work verified

- semantic Vuexy-like primary/success/info/warning/danger palette
- lower-radius, calmer shell hierarchy
- active-view context in topbar
- persistent compact/full sidebar control
- semantic KPI accent lines
- differentiated primary visualization panels
- refined chart grid/surface treatment
- interactive row hover states
- persistent Semi-dark sidebar skin
- high-DPI real dashboard previews
- automated representative accessibility gate passed with zero serious/critical Axe blockers

## Open release gates

1. Measured performance profiling and optimization — current next gate.
2. Security/dependency/secret/external-request review — current next gate.
3. Final licensing/asset provenance audit.
4. Full documentation/developer guide reconciliation.
5. Final cross-browser/manual visual regression.
6. Clean extracted release-package install/build test.
7. Release manifest/checksums and marketplace package.
8. Current RTL-Theme rules review and compliant marketplace assets.
9. Final submission gate only after every blocking item above passes.

## Release status

**NOT READY FOR RELEASE.**

The product breadth, Chromium regression gate and automated Accessibility gate have passed. Performance/security/package/marketplace gates have not all passed yet.
