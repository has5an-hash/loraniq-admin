# Shell & Data Polish Milestone

Date: 2026-09-18
Parent: 6d7f4dc58970478b59af67c53f13a2928a574066

## Benchmark observations
- Metronic's current documentation continues to emphasize multiple dashboard layouts, responsive/collapsible navigation, reusable layout components and a shared component foundation.
- Vuexy's documented layout system emphasizes configurable vertical/horizontal navigation, collapsed menu, floating/static navbar variants and a customizer-driven shell.
- Loraniq keeps its own Persian/RTL-first identity and does not copy proprietary assets, code or exact layouts.

## Implemented
- Added a real quick sidebar-mode toggle to the desktop topbar, wired to the persistent UiPreferences system.
- Added an active-view context indicator in the topbar.
- Added aria-current to active navigation links.
- Tightened the desktop shell radius/density and reduced floating-card heaviness.
- Added semantic top accents to KPI cards.
- Differentiated primary chart panels from secondary cards.
- Added a cleaner chart surface/grid treatment and stronger primary plotted lines.
- Added hover states to tabular/list data rows.
- Preserved mobile/tablet layout and reduced-motion behavior.
- Extended Chromium QA to test compact/full sidebar switching on every shell route at desktop size.

## Gate
Must pass lint, typecheck, static build, full Chromium route QA, marketing QA and GitHub Pages deployment before closure.
