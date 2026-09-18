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

## Latest verified automated result

- Commit: `a5be8e1ac8893b46ba077fe22c1f70345347bb06`
- GitHub Actions run: `35294882433`
- Result: **PASS**
- Scans: 32
- Blocking findings: **0 serious / 0 critical**
- QA artifact ID: `10527811892`
- Artifact digest: `sha256:d50b4677fa654c42c00f3ff6ad1bb5763fc9e914d0f75fc0438fbc05891ae9c6`

The first real Axe run exposed contrast, ARIA, focusability and accessible-name blockers. Those issues were remediated and the final representative matrix passed without suppressing the blocker rules.

## Manual work still required

- keyboard-only end-to-end review
- focus order and focus visibility review
- screen-reader semantics on complex widgets
- zoom/reflow/manual responsive review
- color/meaning checks not fully captured by automation
- final accessibility statement only after release audit
