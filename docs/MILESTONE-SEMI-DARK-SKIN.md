# Semi-dark Skin Milestone

Date: 2026-09-18
Parent: 07b17306f3a30ed856c6c5254746e01a136c1bfb

## Purpose
Close a real layout-customization gap identified in Vuexy benchmarking while preserving Loraniq's independent design.

## Implementation
- Extended SkinMode with `semi-dark`.
- Semi-dark is persistent through the existing local-storage preference system.
- Main content theme remains independent; only navigation chrome becomes dark.
- Added dedicated sidebar palette for text, hover, active state, badges, workspace card and progress.
- Settings UI exposes Soft / Bordered / Semi-dark.
- Settings summary reflects the active skin correctly.
- Chromium QA now activates Semi-dark, verifies the HTML preference state and checks the computed sidebar background before continuing.

## Gate
Must pass lint, typecheck, static build, full Chromium QA, marketing QA and Pages deployment.
