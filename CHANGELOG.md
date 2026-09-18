# Changelog

All notable development milestones for Loraniq Admin are recorded here. This is a development changelog; it does not imply marketplace release readiness.

## Unreleased — 2026-09-18

### Added

- Canonical Astra visual reference document at `docs/ASTRA-VISUAL-REFERENCE.md`.
- Global Astra visual normalization layer at `app/astra-reference.css`.
- Lazy-loaded command/help overlay module for lower first-load cost.

### Changed

- Restored the Windows Astra workspace shell across all application routes: dark 254px workspace sidebar, Astra monogram/workspace selector, 78px topbar, compact route context, quiet card hierarchy and Astra palette.
- Kept the newer GitHub route breadth, RTL/LTR, Light/Dark, density, content-width, sidebar and reduced-motion behavior inside the Astra shell.
- Scoped route-specific premium CSS to its own route instead of shipping every app stylesheet from the root layout.
- Reduced eager marketing-preview competition so only the first above-fold preview receives high fetch priority.
- Kept GitHub `main` as the live development source while making the user-provided Astra handoff the canonical visual/UI reference.

### Performance work in progress

- Previous throttled baseline failed around 4.7–5.1s FCP on representative routes and 14.7–18.7s LCP on Landing/Demos.
- Current changes target the causes rather than relaxing budgets: global CSS over-shipping, interaction-only overlays in the initial bundle, and preview-image fetch priority.
- A fresh full CI/browser/performance verification is required before these changes are marked verified.

## Unreleased — 2026-09-17

### Added

- Premium Executive dashboard composition
- Premium Analytics dashboard composition
- Premium Ecommerce flagship at `/ecommerce/`
- Premium CRM flagship at `/crm/`
- Self-hosted Vazirmatn variable WOFF2
- SIL Open Font License 1.1 bundle and asset provenance documentation
- Ecommerce and CRM navigation/command-palette routes
- Expanded Playwright/Chromium QA covering desktop, tablet and mobile
- RTL/light and LTR/dark screenshot coverage
- Ecommerce revenue/orders interaction QA
- CRM retention/value interaction QA
- GitHub Pages deployment workflow and QA screenshot artifacts

### Changed

- Replaced the early starter-like dashboard visual direction with a premium reusable visual foundation
- Improved sidebar, topbar, card hierarchy, typography, semantic color usage, responsive behavior and dark-mode surfaces
- Increased visual differentiation between flagship dashboards instead of reusing a single card-grid composition
- Expanded automated QA to four flagship routes and 24 screenshot states per verified run

### Fixed

- Mobile horizontal overflow introduced during the first visual reset
- Executive hero overlap on desktop/mobile
- CRM JSX parsing error caused by an unclosed `DropdownMenuContent`

### Verification

Latest verified commit for this entry: `73aebac9d107a2a4bd4c3598a1619dc9de5a9d16`

Latest verified workflow: `35259952552` — clean install, lint, typecheck, production build, Chromium QA and GitHub Pages deployment PASS.

### Still open before release

Finance and Healthcare flagships; advanced tables/forms; apps and auth pages; landing/demo selector; accessibility/performance/security/browser QA; documentation; packaging and extracted-copy install/build validation; marketplace asset production and current Rightchin compliance/submission gates.
