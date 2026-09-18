# Astra Visual Reference — Loraniq Admin

Last updated: 2026-09-18

## Authority

- **Live development source:** `has5an-hash/loraniq-admin` on `main`.
- **Canonical visual/UI reference:** the user-provided Windows Astra handoff, `loraniq-github.zip`.
- The Astra handoff is a **visual and interaction reference**, not a replacement live source tree. Newer GitHub routes, QA, accessibility, RTL/LTR, theme preferences and release hardening remain authoritative unless they conflict with the requested Astra visual language.

The local handoff intentionally excluded dependency/cache directories:
- `.pnpm-store`
- `node_modules`
- `node_modules.incomplete-backup`

Those directories are reproducible dependencies/cache and are not product source.

## Non-regression rules

1. Do not return to the white/generic sidebar shell.
2. Do not replace the Astra workspace shell with a generic Vuexy/Metronic clone.
3. Do not change Astra's core proportions merely to make a route look "different".
4. New routes must look like they belong to the same Astra-built product.
5. Preserve real RTL/LTR, Light/Dark, responsive behavior, keyboard support and functional interactions.
6. Preserve legal, local typography and do not add required runtime CDN/font dependencies.
7. Competitor products remain benchmarking references only; proprietary code/assets/layouts must not be copied.

## Canonical visual tokens

Light:
- App background: `#f7f8fc`
- Foreground: `#242738`
- Card: `#ffffff`
- Primary: `#7560d7`
- Accent: `#f0ecfb`
- Muted foreground: `#73788b`
- Border: `#e9eaf2`
- Input: `#e1e3eb`
- Focus ring: `#8b76e1`

Astra sidebar:
- Base: `#202131`
- Workspace surface: `#292a3d`
- Hover: `#2d2c40`
- Border: `#35364b`
- Text: `#b3b4c7`
- Muted text: `#8e90a7`
- Active item: `#8470d6`
- Brand/monogram: `#8c78df`
- Detail accent: `#ddcc95`

Core geometry:
- Sidebar: `254px`
- Topbar: `78px`
- Main max width: `1580px`
- Main desktop padding: `34px`
- Cards: mostly `13px` radius
- Controls/buttons: mostly `8–9px` radius
- Astra shadow: deliberately very quiet; borders carry most hierarchy.

## Canonical shell anatomy

Sidebar:
1. Loraniq monogram + `LORANIQ / WORKSPACE`
2. Workspace switch / PRO indicator
3. Management navigation
4. Apps/tools navigation
5. Preferences/help
6. "یک نگاه، تصمیم‌های بهتر." workspace note
7. Preview status

Topbar:
1. Mobile menu
2. Current workspace / active route context
3. Demo-data marker
4. Search / Ctrl-K
5. Sidebar density toggle
6. Direction/language toggle
7. Light/Dark toggle
8. Notifications
9. Compact user avatar

## Component language

- White cards on a very light neutral canvas.
- Thin quiet borders, low-noise shadows.
- Violet is an accent, not a full-page paint bucket.
- KPI icons use soft semantic surfaces.
- Charts use restrained grid lines and a single clear primary series.
- Tables use muted headers and calm row hover.
- Controls are compact, aligned and functional.
- No decorative gradients that overpower data.
- No inflated radius, oversized cards or excessive glassmorphism.
- Motion is subtle and must respect reduced-motion settings.

## Current implementation

The canonical layer is `app/astra-reference.css` and intentionally loads as the strongest visual normalizer. The shared shell is `components/loraniq-shell.tsx`.

Route-specific CSS remains allowed for layout/behavior, but it must not override Astra's product identity.

## Performance rule inherited from Astra

Route-specific CSS must be scoped to its route rather than shipped globally. Rare overlays (command/help) should be loaded on interaction. Visual fidelity is not a reason to ship cache/dependency folders or unnecessary first-load assets.
