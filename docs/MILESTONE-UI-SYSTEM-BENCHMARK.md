# UI System Milestone — Metronic / Vuexy Benchmark

Date: 2026-09-17

## Verified implementation

Verified commit: `cc225ea7d2abc142649f06caac97adec28fe7021`

Verified workflow run: `35265941673`

Verified gates:
- clean dependency installation — PASS
- ESLint — PASS
- TypeScript — PASS
- static production build — PASS
- Chromium interaction QA — PASS
- GitHub Pages deployment — PASS
- route matrix: 16 routes × 3 viewports × RTL/light + LTR/dark = 96 captured states
- screenshot artifact ID: `10515904345`

## What changed in Loraniq

- Added a persistent, React-19-safe global Preferences Provider backed by `useSyncExternalStore` and localStorage.
- Added Light / Dark / System theme modes.
- Added persistent RTL / LTR.
- Added Comfortable / Compact density.
- Added Soft / Bordered skin.
- Added Fluid / Boxed content width.
- Added Full / Compact sidebar.
- Added Full / Reduced motion preference with CSS and `prefers-reduced-motion` support.
- Added a real Settings / Customizer page.
- Added a real Component Lab with actions, fields, semantic statuses, selection controls, loading/skeleton, data/empty/error states and motion examples.
- Added browser interaction QA for preferences and component state changes.

## Comparison — Metronic

Current official Metronic material emphasizes React/TypeScript/Tailwind, Radix/ReUI component foundations, RTL/dark support and multiple dedicated layout patterns. Its strongest lead over Loraniq remains **layout breadth, reusable component-system depth and developer documentation breadth**.

Loraniq response in this milestone:
- narrowed the architecture gap with a typed global preferences layer;
- made theme/direction/density/skin/content/sidebar/motion first-class application state rather than one-off page toggles;
- added a central component/state reference surface;
- kept the visual system independent rather than copying Metronic layouts or assets.

Remaining gap versus Metronic after this milestone:
- Loraniq still has one primary shell with configurable modes rather than Metronic's broader set of dedicated layout compositions;
- component coverage is growing but not yet equivalent to a mature full commercial ecosystem;
- formal DX documentation, utility/auth layouts and measured performance/a11y evidence remain open.

## Comparison — Vuexy

The current Vuexy product presentation exposes multiple visual/layout variants including vertical, bordered, semi-dark, dark and horizontal experiences. Its strongest benchmark is still **visual polish, customization discoverability, density balance and consistent page states**.

Loraniq response in this milestone:
- added an explicit Settings/Customizer experience rather than hiding customization in source-only config;
- supports persistent skin, density, width, sidebar, theme, direction and motion preferences;
- keeps a calmer Persian-first visual identity instead of reproducing Vuexy's MUI composition;
- added explicit loading/empty/error/state references in the Component Lab.

Remaining gap versus Vuexy after this milestone:
- no horizontal navigation layout yet;
- no dedicated semi-dark navigation treatment yet;
- some micro-copy / metadata typography is visually smaller than the mature benchmark and requires a readability pass;
- legal illustration/photography strategy for demo/landing assets is still open.

## Visual review findings from the real artifact

Reviewed actual generated Settings and Component Lab screenshots in desktop/mobile and light/dark variants.

Positive findings:
- visual hierarchy is clear;
- card spacing, semantic color use and surface separation are coherent;
- Settings reads as a real customizer instead of a decorative page;
- Component Lab exposes useful real states;
- mobile compositions are not simple desktop shrink-downs;
- no obvious component overlap or horizontal overflow was observed in the reviewed captures.

Issues found by visual benchmark:
1. Several helper/metadata/badge sizes across the product remain in the 6.5–9px range and look too small next to mature admin-template benchmarks. A dedicated readability floor is required and must be re-QA'd for overflow.
2. Full-page screenshots taken after deep interaction can capture sticky header/sidebar at the current scroll position. This is a QA-evidence problem, not an application-layout regression. The capture routine must scroll to top and wait for sticky/sidebar transitions before screenshotting.

## Milestone status

**Technical gate: PASS.**

**Visual benchmark gate: PASS WITH REQUIRED REMEDIATION.** The two findings above must be verified in the next full route run before the UI System is considered fully closed.

## Sources used for this stage

- Metronic current product/docs: https://keenthemes.com/metronic/ and https://docs.keenthemes.com/metronic-nextjs
- Metronic current components/layout docs: https://docs.keenthemes.com/metronic-nextjs/getting-started/components and https://docs.keenthemes.com/metronic-nextjs/guides/layouts
- Vuexy current product: https://pixinvent.com/vuexy-mui-nextjs-admin-template/
- Vuexy current demo: https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/
- Vuexy detailed configuration docs used only as historical technical context where the current product page does not expose implementation detail: https://demos.pixinvent.com/vuexy-nextjs-admin-template-old/documentation/

No competitor proprietary code, paid assets, branding, exact page composition or marketing copy was copied into Loraniq.
