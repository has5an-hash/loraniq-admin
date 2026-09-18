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
- Astra handoff is now the canonical Loraniq visual/UI language. Vuexy and Metronic remain benchmark references for product quality and architecture only; proprietary code/assets/layouts are not copied.

### Latest verified quality gate

Verified commit: `a5be8e1ac8893b46ba077fe22c1f70345347bb06`
Workflow run: `35294882433`
Result: **PASS**
Pages deployment: **PASS**
Screenshot artifact: `loraniq-qa-screenshots`
Artifact ID: `10527811892`
Artifact digest: `sha256:d50b4677fa654c42c00f3ff6ad1bb5763fc9e914d0f75fc0438fbc05891ae9c6`

The main Chromium suite covers 31 product routes × 3 viewports × 2 direction/theme states = 186 screenshots/check states per run. Marketing QA adds Landing + Demos across the same three viewports and two states (12 more captures), for 198 state screenshots in the combined artifact.

### Latest visual-system work\n\nThe items below were verified in the last green pre-Astra run. A newer Astra visual migration is currently on `main` and requires a fresh full screenshot/CI verification before it is promoted to the verified list.\n\n### Last verified visual-system baseline

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

## Premium upgrade — 2026-09-19 (arena/01a0b4f2-loraniq-admin)

Scope verified with a real Chromium (built from source in-sandbox) against the
production static export: 33 routes × desktop/tablet/mobile × RTL/LTR × light/dark.

### Notification system (was: bell jumped straight to a page)

- Bell now opens a **dropdown notification panel** (Radix Popover, portaled, RTL/LTR aware).
- Latest 5 notifications, **unread badge** on the bell + live sidebar badge, **mark as read**
  (per item), **mark all read**, **clear-all empty state** with sample-data restore,
  and a **View all notifications** footer link to the hub page.
- Hub page (`/notifications/`) shares one store with the topbar
  (`components/notifications-store.ts`, localStorage-persisted via `useSyncExternalStore`).

### Search system (was: flat page list)

- `Ctrl/Cmd + K` palette rebuilt: **categorized results** (Quick actions / Dashboards /
  Apps & tools / Preferences), **live filtering** with Persian normalization
  (ی/ك/ZWNJ) + subsequence fuzzy match, **keyboard navigation**
  (↑/↓/Enter/Esc, roving aria-activedescendant), **recent searches** persisted and
  restoreable, **clear (×) button**, and **quick actions** (theme/direction toggles) runnable
  from the palette.
- Search Center page keeps category filters, recent chips and clear affordances.

### Visual polish & QA

- Fixed mobile horizontal overflow: off-canvas drawer no longer extends document
  width (anchored to its open edge + `overflow-x: clip` on the shell); verified
  **0 px overflow across 20 pages × 3 viewports** in RTL and LTR.
- Notification panel: mobile-collision-safe positioning, bottom-sheet spacing,
  badge ring matching card background.
- Command palette: taller results area (380 px), clearer group labels, footer
  legend with kbd chips.

### Verified behaviors (production build, Chromium)

- Ctrl+K opens palette; typing filters (FA + EN + fuzzy); Enter navigates and closes;
  Esc closes; × clears; recents persist across opens.
- Bell: click toggles panel; badge counts sync instantly after mark-as-read from the
  hub page; outside click and Esc close; `aria-expanded` correct.
- All 7 preference controls produce real DOM effects (density/skin/boxed/sidebar/
  motion/theme/direction); settings persist across reloads.
- 33 routes: zero console/page errors; all buttons labelled; no images without alt.
