# Changelog

All notable development milestones for Loraniq Admin are recorded here. This is a development changelog; it does not imply marketplace release readiness.

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
