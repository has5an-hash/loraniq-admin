# Loraniq Admin Release Hardening Checklist

## Purpose

Tracking checklist for moving Loraniq Admin from feature-complete state toward a marketplace-ready 1.0.0 package.

## Product QA

- [ ] Verify all public routes render correctly.
- [ ] Verify RTL and LTR switching on all major layouts.
- [ ] Verify Light, Dark and navigation skin persistence.
- [ ] Verify mobile navigation and compact sidebar behavior.
- [ ] Verify empty, loading and error states.

## Performance

- [ ] Measure initial load performance.
- [ ] Review route-level CSS and JavaScript payloads.
- [ ] Check unnecessary assets and dependencies.
- [ ] Verify image and font loading strategy.

## Security

- [ ] Review external requests.
- [ ] Review exposed configuration and secrets.
- [ ] Review dependency audit output.

## Marketplace Package

- [ ] Prepare clean source package without dependency caches.
- [ ] Verify installation from a clean environment.
- [ ] Prepare screenshots and product assets.
- [ ] Prepare product documentation.
- [ ] Prepare version 1.0.0 release notes.

## Current Status

The Astra visual language remains the canonical design direction. This checklist tracks remaining hardening work before release.
