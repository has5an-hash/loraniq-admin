# Checkpoint

Last updated: 2026-09-18

## Live source

Repository: `has5an-hash/loraniq-admin`
Branch: `main`
GitHub is the live source. Historical ZIP files are not the development reference.

## Current verified product commit

`560b98ef03d51df52575e32a3f10e0ed6f606c06`

Verified workflow: `35289957203`
Quality build: **PASS**
GitHub Pages deploy: **PASS**

## Current verified scope

- 6 flagship dashboards: Executive, Analytics, Ecommerce, CRM, Finance, Healthcare.
- 14 operational shell routes: Tables, Forms, Calendar, Projects, Kanban, Users, Chat, Email, Files, Invoice, Components, Search, Notifications, Settings.
- 7 auth routes.
- 4 utility routes.
- Landing and Demos marketing routes.
- True RTL/LTR runtime direction, Light/Dark, density, content width, full/compact sidebar, reduced motion, Soft/Bordered/Semi-dark skin preferences.
- Command palette and responsive mobile navigation.
- High-DPI real screenshot generation from deployed Pages.
- Original illustration set and licensed local Vazirmatn.

## Browser QA matrix

Main product suite:
- 31 routes
- Desktop 1440×1000
- Tablet 820×1180
- Mobile 390×844
- RTL + Light
- LTR + Dark
- horizontal overflow checks
- console error checks
- failed network request checks
- command palette flow
- mobile sidebar flow
- compact/full sidebar preference flow
- route-specific functional interactions

Marketing suite:
- Landing + Demos
- same 3 viewports
- RTL/Light + LTR/Dark
- real preview-image presence
- CTA/navigation checks

Combined screenshot states per quality run: 198.

## Visual checkpoint

Run 39 screenshots were manually reviewed after shell/data polish. Executive, Analytics, Ecommerce, CRM, Finance and Healthcare remain visually coherent on desktop; representative mobile views for flagship and app routes were also reviewed after the preceding visual milestone.

## Do not regress

- Do not return to the earlier generic card-grid visual language.
- Do not remove local Vazirmatn or add required runtime font/CDN dependencies.
- Do not remove real RTL/LTR or Dark/Light testing.
- Do not replace real high-DPI dashboard screenshots with mock or decorative fake previews.
- Do not copy proprietary Vuexy/Metronic code, assets, branding or exact layouts.
- Do not mark release-ready before accessibility, performance, security, packaging and RTL-Theme gates pass.

## Exact next step

Add automated axe accessibility scans on representative dashboard/data/form/auth/marketing routes in desktop/mobile and RTL-Light/LTR-Dark states. Treat serious/critical WCAG findings as blockers, remediate them, and only then move to measured performance profiling.
