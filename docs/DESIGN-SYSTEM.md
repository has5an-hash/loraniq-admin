# Loraniq Design System

Last updated: 2026-09-18

## Authority

The user-provided Windows Astra handoff `loraniq-github.zip` is the canonical visual/UI reference for Loraniq Admin. The live development source remains `has5an-hash/loraniq-admin` on `main`.

Vuexy and Metronic may be used only as product-quality and architecture benchmarks. They are not the visual source of truth and no proprietary code, asset, branding, or exact layout may be copied.

See `docs/ASTRA-VISUAL-REFERENCE.md` for the detailed non-regression contract.

## Visual thesis

Quiet, precise Persian business software: a dark Astra workspace sidebar, bright neutral canvas, white data surfaces, restrained violet identity, compact controls, thin borders, low-noise shadows and deliberate spacing.

The product must feel like one system across dashboards, apps, auth, utilities, landing and demo selector. Route-specific CSS may own layout and functional states, but must not invent a second visual identity.

## Canonical colors

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

Dark:
- App background: `#141722`
- Foreground: `#eef0f8`
- Card: `#1d2130`
- Primary: `#a48eef`
- Border: `#303648`
- Input: `#41465a`

Astra workspace sidebar:
- Base: `#202131`
- Workspace surface: `#292a3d`
- Hover: `#2d2c40`
- Border: `#35364b`
- Text: `#b3b4c7`
- Muted text: `#8e90a7`
- Active navigation: `#8470d6`
- Monogram: `#8c78df`
- Small detail accent: `#ddcc95`

Semantic success/warning/danger colors remain distinct from brand violet and should be used as status signals, not page decoration.

## Typography

- Primary UI font: locally hosted Vazirmatn WOFF2.
- Fallback: Tahoma, Segoe UI, Arial, sans-serif.
- Main user-facing copy: normally 12–16px depending on hierarchy.
- Metadata may be smaller only when paired with a stronger label and adequate contrast.
- Persian text must retain correct shaping, RTL flow and readable line-height.
- No required runtime font CDN is allowed.

## Geometry and spacing

Canonical Astra shell:
- Sidebar: `254px`
- Topbar: `78px`
- Main content max width: `1580px`
- Main desktop padding: `34px`

Component geometry:
- Most cards: `13px` radius.
- Most controls/buttons: `8–9px` radius.
- Navigation rows: approximately `45px` high.
- Card hierarchy is carried mainly by thin borders; shadows stay deliberately quiet.
- Large glassmorphism, inflated radii, decorative gradients and oversized empty cards are non-canonical.

## Component language

- White cards on a very light neutral canvas.
- Violet is an accent, not a full-page paint bucket.
- KPI icons use soft semantic surfaces.
- Charts use calm grid lines and a clear primary series.
- Tables use muted headers and restrained hover.
- Split applications such as Chat, Email and Files behave like one divided workspace card rather than unrelated floating panels.
- Forms and auth use compact 8px controls, clear focus rings and quiet surfaces.
- Landing/demo cards use the same border/radius/shadow language as the product.

## Motion and focus

- Motion is subtle, functional and normally 180–250ms.
- Hover must not produce large jumps or decorative 3D movement.
- `prefers-reduced-motion` is mandatory.
- All keyboard-focusable elements receive a visible violet focus ring.

## Directionality and responsiveness

- Logical CSS properties are preferred.
- Runtime RTL/LTR switching is a required product capability.
- Dark/Light, full/compact sidebar and tested display preferences must remain functional.
- Mobile layout may reorganize content but must preserve the same Astra component language.
- No horizontal overflow, overlap, clipped controls or directionally incorrect icons are acceptable.

## Implementation

- Canonical normalizer: `app/astra-reference.css`.
- Shared application shell: `components/loraniq-shell.tsx`.
- Route-specific styles are imported by their routes to avoid shipping every application stylesheet globally.
- Rare overlays are deferred until interaction where practical.
- Visual fidelity is not a reason to ship dependency caches such as `.pnpm-store` or `node_modules`.
