# Competitor Benchmark & Milestone Gate

Last refreshed: 2026-09-17

This document is a mandatory quality gate for Loraniq Admin. Every material milestone must be compared against the current public Metronic and Vuexy experience before it can be called complete. Benchmarking means learning from capability, polish and system depth — never copying proprietary code, layouts, branding, artwork or assets.

## Current live references

### Metronic
- Product / current positioning: https://keenthemes.com/metronic/
- React docs: https://docs.keenthemes.com/metronic-react
- Next.js docs: https://docs.keenthemes.com/metronic-nextjs
- Components: https://docs.keenthemes.com/metronic-nextjs/getting-started/components
- Layouts: https://docs.keenthemes.com/metronic-nextjs/guides/layouts
- Live previews: https://preview.keenthemes.com/

Current official material emphasizes React 19, TypeScript, Tailwind CSS 4, Radix-based/ReUI component foundations, RTL/dark support, multiple dashboard layouts and production-oriented architecture. The current Next.js layout documentation exposes ten layout patterns. Metronic's strongest benchmark remains breadth, reusable architecture, layout depth, component coverage and developer-facing structure.

### Vuexy
- Current product page: https://pixinvent.com/vuexy-mui-nextjs-admin-template/
- Current live demo: https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/
- Detailed public docs currently discoverable under the older documentation path: https://demos.pixinvent.com/vuexy-nextjs-admin-template-old/documentation/

The current product page visibly exposes vertical, bordered, semi-dark, dark, horizontal and horizontal-dark layout variants. The detailed public configuration docs (older path, last-updated dates must be treated as historical technical detail rather than proof of the newest implementation) document configurable layout, mode, direction, skin and content width. Vuexy's strongest benchmark remains visual polish, comfortable density, customization UX, consistent states and quick-to-understand page composition.

## Loraniq current baseline before UI-System milestone

Verified commit before this milestone: `a54f04532c0eb736bc565b6b171f78f1f0b05b6b`.

Verified capabilities at that commit:
- 6 distinct flagship dashboards: Executive, Analytics, Ecommerce, CRM, Finance, Healthcare
- Advanced Data Tables
- Multi-step Forms
- Calendar
- Projects
- Chat
- Email
- File Manager
- Invoice
- Persian-first self-hosted Vazirmatn
- Runtime RTL/LTR
- Light/Dark
- Responsive desktop/tablet/mobile handling
- Command palette and shared shell
- Clean install, lint, TypeScript, production static build, Chromium interaction QA and GitHub Pages deployment
- 14 routes × 3 viewports × 2 theme/direction states = 84 visual states in the automated route QA

## Current gap analysis

| Dimension | Metronic benchmark | Vuexy benchmark | Loraniq position / required response |
| --- | --- | --- | --- |
| Visual hierarchy | Broad enterprise dashboard patterns | Strong polish, calm density, easy scanning | Flagships are distinct; continue reducing repeated generic card grammar and keep page-specific hierarchy |
| Layout breadth | Ten current Next.js layout patterns documented | Multiple vertical/horizontal/skin variants marketed | Major gap before UI-System milestone; add persistent density, skin, content-width and sidebar modes without cloning competitor layouts |
| Component foundation | ReUI + Radix, accessible reusable foundation | MUI-based component ecosystem and overrides | Base primitives exist; add a real Loraniq Component Lab and documented state rules |
| Theme/customizer | Settings/provider-oriented architecture | Customizer/config-driven theme, direction, skin, layout | Build a type-safe persistent Preferences Provider and Settings UI |
| RTL/LTR | Current official support | RTL documented/marketed | Loraniq already runtime-switches direction; preserve logical CSS and QA every route |
| Dark mode | Supported across system | Dedicated dark/semi-dark variants | Loraniq has independent dark tokens; continue checking contrast and data visualization in dark mode |
| Color system | Production semantic system | Polished MUI palette/theme overrides | Keep semantic violet/green/amber/red/blue system; avoid turning the whole product purple |
| Typography | System/framework-ready | Theme-level typography configuration | Loraniq differentiates with self-hosted Persian Vazirmatn; keep Latin fallback/English rhythm under review |
| Motion | Product interactions and component behavior | Polished transitions/routing UX | Centralize Loraniq motion tokens, purposeful entrance/feedback, and true reduced-motion behavior; avoid decorative over-animation |
| Images/assets | Large legal asset ecosystem in commercial package | Strong demo/marketing imagery | Loraniq still needs a legal curated illustration/screenshot/marketing asset layer; no copied competitor assets and no unlicensed media |
| Data tables/forms | Broad product coverage | Mature application patterns | Loraniq has real responsive tables and multi-step forms; expand edge states, date/time/Jalali, OTP, uploads and accessibility |
| Apps | Extensive app/page breadth | Extensive conceptual apps | Loraniq now has several real apps; Kanban, User Management, Notifications, Search and Settings remain priority gaps |
| Auth/utility | Dedicated auth/error layouts | Auth guards and dedicated utility pages | Still open in Loraniq |
| DX/architecture | Strong documented scalable structure | Core/override/config separation | Loraniq needs stronger provider/state abstraction, component docs, customization docs and starter/full packaging |
| Accessibility | Accessible component foundations | MUI/ARIA baseline | Keyboard/focus/reduced-motion foundations exist; formal WCAG audit still required |
| Performance | Framework-specific production builds | Production-ready positioning | Loraniq needs measured Lighthouse/bundle work; no unverified performance claims |

## Mandatory benchmark gate for every milestone

A milestone is not complete until all applicable rows below are reviewed and evidence is recorded in the milestone note or QA report.

1. **Visual composition:** hierarchy, density, spacing, grid, cards, typography, scanability and distinctive page identity compared with current Metronic/Vuexy demos.
2. **Color & theme:** semantic colors, light/dark surfaces, contrast, hover/focus/active/disabled states and chart palette.
3. **Motion:** entrance, hover, state change, modal/drawer/dropdown feedback, duration/easing and `prefers-reduced-motion` behavior.
4. **Responsive:** desktop/tablet/mobile composition — not merely shrinking desktop UI.
5. **RTL/LTR:** direction, icon directionality, spacing, table/form layout and typography in both directions.
6. **Components & states:** default/hover/focus/active/disabled/loading/skeleton/empty/error/success and destructive states where relevant.
7. **Technical architecture:** type safety, reuse, provider/state design, routing, maintainability, dependency impact and bundle impact.
8. **Accessibility:** keyboard, focus order, labels, landmarks, dialog behavior, contrast and reduced motion.
9. **Performance:** avoid unnecessary dependencies; inspect generated output/network/bundle at milestones and measure before final release.
10. **Assets:** every image/font/icon/illustration must have a legal redistribution path; no copied Metronic/Vuexy proprietary assets.
11. **Independent identity:** benchmark principles may be adopted; competitor branding, code, exact layouts, copy and proprietary artwork may not be reproduced.
12. **Evidence:** lint/typecheck/build/browser QA plus screenshots must exist before marking the stage green.

## UI-System milestone — acceptance criteria

This milestone directly targets the largest current gap against both competitors.

Required:
- Persistent global Preferences Provider
- Light/Dark/System theme modes
- RTL/LTR persistence
- Comfortable/Compact density
- Soft/Bordered skin
- Fluid/Boxed content width
- Full/Compact sidebar behavior
- Full/Reduced motion preference
- Dedicated Settings/Customizer route
- Dedicated Component Lab route
- Centralized motion tokens and reduced-motion CSS
- Browser interaction QA for preferences and component states
- Desktop/tablet/mobile screenshots in RTL/light and LTR/dark
- No regression in the existing 14 routes

## Next benchmark-driven milestones after UI-System

1. Application breadth: Kanban, User Management, Notifications, Search and deeper Settings.
2. Authentication + utility layouts: login/register/forgot/reset/2FA/verification/lock/error/maintenance.
3. Component/state completion: date/time/Jalali, OTP, upload, advanced filters, drawers/modals, toast/alerts, charts and navigation variants.
4. Layout/demo breadth: create genuinely distinct Loraniq layout/demo options only where they add product value; do not chase competitor demo counts as vanity metrics.
5. Landing + demo selector with real Loraniq screenshots.
6. Accessibility, performance, security, dependency and licensing audits with measured evidence.
7. Documentation, starter/full structure, release packaging and extracted-copy build test.
8. Final benchmark refresh against current Metronic/Vuexy immediately before packaging.
9. Current Rightchin rule review and marketplace assets only after technical release gates pass.

## Rightchin release note

Marketplace copy/images are a later gate. The project's official Rightchin reference currently records a 2-line introduction, exactly 5 main features, a preferably single 960px infographic under 1MB, title-only full feature list, and a warning against AI-generated final sales copy/images. These rules must be re-checked on the live Rightchin source immediately before submission because they can change.
