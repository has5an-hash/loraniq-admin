# Accessibility QA

Target: WCAG 2.2 AA where technically applicable to this template product.

## Automated representative matrix

Routes:
- Executive
- Healthcare
- Tables
- Forms
- Settings
- Login
- Landing
- Demos

Viewports:
- Desktop 1440×1000
- Mobile 390×844

States:
- RTL + Light
- LTR + Dark

Total automated axe scans: 32.

The CI gate uses `@axe-core/playwright@4.13.0` only in the QA environment. It is not a runtime product dependency.

## Blocking rule

Axe findings with impact `critical` or `serious` are treated as CI blockers. The JSON report is written to `artifacts/a11y/axe-report.json` and is included in the standard QA artifact even when the accessibility step fails.

Moderate/minor findings are retained in the report for later remediation and final manual audit; passing automated axe does not by itself prove full WCAG conformance.

## Manual work still required

- keyboard-only end-to-end review
- focus order and focus visibility review
- screen-reader semantics on complex widgets
- zoom/reflow/manual responsive review
- color/meaning checks not fully captured by automation
- final accessibility statement only after release audit
