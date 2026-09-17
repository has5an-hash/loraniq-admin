# Loraniq Design System

## Visual thesis

Quiet luxury for high-information Persian business software: bright layered surfaces, restrained violet identity, semantic colors, compact but breathable density, precise typography and soft motion. The system deliberately avoids both purple saturation and generic starter-dashboard chrome.

## Color roles

- Primary: violet `#7367E8`, used for navigation, focus and primary action
- Success: teal `#12A891`
- Warning: amber `#F2A641`
- Danger: coral `#E5485D`
- Info: blue `#3C8FDF`
- Light background/surface: `#F5F6FA` / `#FFFFFF`
- Dark background/surface: `#161821` / `#20232E`
- Border: low-contrast neutral, independently tuned per theme

All semantic colors are distinct from the brand primary. Dark mode uses dedicated surface and contrast values rather than an inversion.

## Type

- UI fallback stack: Tahoma, Segoe UI, Arial, sans-serif
- Main reading size: 14px minimum; primary user copy remains 14–16px or larger
- Metadata may use 9–12px only where it is non-critical and visually paired with stronger labels
- A redistributable self-hosted Persian WOFF2 font will replace the fallback only after its license is bundled in `Licenses/`.

## Shape and spacing

- Base radius: 12.8px; major cards: 15px; controls: 9–11px
- Main spacing rhythm: 4 / 8 / 12 / 16 / 20 / 24 / 30px
- Cards use a subtle two-layer shadow, not a heavy floating effect
- Navigation density: 44px minimum row height

## Motion and focus

- UI transitions: 180–250ms, ease-based
- Motion is limited to navigation, overlays, toast and directional affordances
- `prefers-reduced-motion` collapses animations and transitions
- All keyboard-focusable elements receive a visible violet focus ring

## Directionality

- Logical properties are used for sidebar, borders, spacing and fixed actions.
- `dir` can switch at runtime between RTL and LTR.
- Directional movement is controlled with a direction factor rather than duplicated layouts.
