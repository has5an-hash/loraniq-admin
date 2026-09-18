# Competitor Benchmark & Milestone Gate

Last refreshed: **2026-09-18** (branch `arena/01a0b4c2-loraniq-admin`, base commit `a1deab1`)

This document is a mandatory quality gate for Loraniq Admin. Every material milestone must be compared against the current public Metronic and Vuexy experience before it can be called complete.

**Benchmarking means learning from capability, polish and system depth — never copying proprietary code, layouts, branding, artwork, copy or assets.** Both products are references for *quality level*, not sources of implementation.

Target standard:

- **Visual polish →** approach Vuexy's level.
- **Product breadth / architecture →** approach Metronic's level.
- **Final identity →** Loraniq + Astra Visual Language. Nothing else.

---

## 1. Live reference verification (re-checked 2026-09-18)

Every URL was fetched on 2026-09-18. Two of the commonly circulated reference URLs are stale — do not benchmark against them.

| Reference | URL | State on 2026-09-18 |
| --- | --- | --- |
| Metronic product | https://keenthemes.com/metronic | **Live.** Current positioning. |
| Metronic docs | https://keenthemes.com/metronic/docs | **Live.** Index for both generations. |
| Metronic demo (legacy) | https://preview.keenthemes.com/metronic8/demo1/ | **Live but legacy** — this is *Metronic 8*, the **Bootstrap 5** generation. Benchmarking against it compares us to the previous product line. |
| Vuexy product (old slug) | https://pixinvent.com/vuexy-admin-dashboard-template/ | **404 — page does not exist.** Dead reference. |
| Vuexy product (current) | https://pixinvent.com/vuexy-mui-nextjs-admin-template/ | **Live.** Use this one. |
| Vuexy Next.js demos | https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1 … demo-6 | Live, one demo per layout variant. |
| Vuexy docs | https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation/ | Live (Pages-directory doc is the deprecated `-old` path). |

### What Metronic actually is today (verified on the live pages)

- "Complete UI toolkit with **1000+ production-ready components**", "#1 Dashboard since 2013", 12 years+ on market, 120,000+ developers, 10M+ end users, 4.89/5 from 8,170 reviews.
- Two generations shipped under one license: **Metronic 9 = Tailwind CSS 4** stack across **14 guides**; **Metronic 8 = Bootstrap 5** stack across **13 guides**.
- Metronic 9 editions: HTML `v4.1.x` (KtUI), React `v19.x` (ReUI), **Next.js `v16.x`** (ReUI), plus standalone **ReUI v1.x** and **KtUI v1.x** open component libraries, plus integration guides for Angular, Vue, Laravel, Livewire, Blazor, Flask, Django, Symfony and ASP.NET Core.
- Stack logos advertised: Tailwind CSS 4, React 19, TypeScript 5, Next.js 16, Radix UI, Base UI, shadcn/ui, React Aria, Lucide, React Hook Form, Zod, TanStack Table, Motion, Vite, Node, Prisma, Supabase.

**Read-across:** Metronic's benchmark value is *breadth + a documented, reusable component architecture + multi-framework distribution*. Note that Loraniq already sits on essentially the same modern stack (Next 16 / React 19 / Tailwind 4 / Radix / Base UI / shadcn / RHF / Zod / Lucide), so the gap is **system depth, not technology choice**.

### What Vuexy actually is today (verified on the live pages)

- **6 layout variants, each with its own live demo**: Vertical, Bordered, Semi Dark, Dark, Horizontal, Horizontal Dark (demo-1 … demo-6). "RTL enabled in all demos."
- **10 applications** (Email, Chat, Calendar, Kanban, eCommerce, Roles & Permission, Logistics, Invoice, Academy, User), **30+ useful pages**, **15+ front pages**, 60+ basic/advanced cards (product-page copy).
- Stack: Next.js 16, React 19, MUI 7, Tailwind CSS, NextAuth, TS + JS, multilingual, React Hook Form, Iconify, fake-DB with API calls, `Cmd+K` search.
- Positioning: 10M+ end users, 20K+ customers, 11 years on ThemeForest.

**Read-across:** Vuexy's benchmark value is *polish, consistent state design, layout/customizer breadth and marketing-grade presentation*. Its page count is **not** extreme — the perceived quality comes from consistency, not from volume.

---

## 2. Loraniq measured baseline (2026-09-18)

All numbers below were produced by commands run in this checkout, not copied from earlier notes.

### Gates executed

| Command | Result |
| --- | --- |
| `pnpm install --frozen-lockfile` | Pass, 7.8s |
| `pnpm lint` | **Pass**, exit 0, zero warnings |
| `pnpm typecheck` | **Pass**, exit 0 |
| `pnpm build` | **Pass**, 35/35 static pages, 34 routes listed |
| `pnpm build:pages` (static export) | **Pass** |
| `pnpm qa:security` | **Pass** — 189 tracked text candidates scanned, no credential signatures, no tracked env/key files |
| `pnpm qa:dependencies` | **Pass** — production high/critical 0/0, full graph high/critical 0/0 (moderate 0, low 0) |
| `pnpm qa:performance` | **Pass** — `"failures": []` |
| `pnpm qa:pages` / `qa:accessibility` / `qa:runtime-performance` / `qa:cross-browser` / `qa:marketing` | **Not run in this environment** — see §6 |

### Measured output (`pnpm qa:performance` metrics)

| Bucket | Bytes | Files | Largest |
| --- | --- | --- | --- |
| Total export | 8,255,927 (7.87 MB) | 265 | — |
| JavaScript | 1,519,339 (1.45 MB) | 54 | `_next/static/chunks/1i-g4r2r3h5gp.js` — 228,915 B |
| CSS | 482,683 (0.46 MB) | 24 | `_next/static/chunks/31bg4nqr5lb5z.css` — 168,344 B |
| HTML | 1,379,978 (1.32 MB) | 36 | `landing/index.html` — 68,226 B |
| Images | 3,769,084 (3.59 MB) | 14 | `demo-previews/analytics.jpg` — 657,784 B |
| Demo previews | 3,759,013 (3.58 MB) | 6 | **45.5 % of the whole export** |
| Fonts | 111,152 | 1 | self-hosted Vazirmatn WOFF2 |

Largest route documents: `landing` 68,226 B · `kanban` 62,337 B · `ecommerce` 57,489 B · `/` 57,036 B · `finance` 55,499 B.

### Measured product scope

- **34 built routes** (33 `page.tsx` + `/_not-found`), all prerendered static: 6 flagship dashboards, 14 shell/operational routes, 7 auth routes, 4 utility routes, Landing + Demos.
- **7 persistent preference axes** in `components/ui-preferences-provider.tsx`: theme (`light|dark|system`), direction (`rtl|ltr`), density (`comfortable|compact`), skin (`soft|bordered|semi-dark`), content width (`fluid|boxed`), sidebar (`full|compact`), motion (`full|reduced`). Persisted to `localStorage` (`loraniq-ui-preferences-v1`), applied as `data-*` on `<html>`, cross-tab synced via the `storage` event, `lang` switches `fa`/`en`.
- **RTL-first is real, not decorative**: 475 logical-property occurrences (`inline-start/end`, `inset-inline`, `-start/-end`) vs 20 physical ones across `app/*.css` — **96 % logical**.
- **Accessibility surface in source**: 231 `aria-*` attributes, 34 `role=` usages, 16 `sr-only`, 9 `:focus-visible` rules in CSS.
- **Charts** are hand-authored inline SVG with keyboard-focusable data points (e.g. `components/revenue-chart.tsx`) across the 6 flagship routes.
- **Motion**: 10 `@keyframes`; `--motion-fast/base/slow/ease` defined in `app/system-premium.css` (loaded globally) with a `html[data-motion="reduced"]` and `@media (prefers-reduced-motion: reduce)` override.
- **Astra identity enforced**: `app/astra-reference.css` loads last in `app/layout.tsx` and pins `--primary:#7560d7 !important` (light) / `#a48eef !important` (dark).

### Measured weaknesses (found while benchmarking — see §4)

| Finding | Measured value |
| --- | --- |
| UI primitives shipped vs used | **61 files in `components/ui/`, only 13 imported anywhere → 48 unused (78.7 %)** |
| `recharts` | Production dependency in `package.json`, **0 occurrences in shipped JS** — tree-shaken, never used. `components/ui/chart.tsx` is dead. |
| Orphaned stylesheets | **4** never imported by any `.tsx`: `executive-premium.css` (15,980 B), `visual-reset.css` (14,231 B), `vuexy-polish.css` (13,971 B), `shell-data-polish.css` (6,517 B) = **50,699 B dead CSS** |
| Component Lab | 1 showcase route demonstrating ~12 patterns, self-declared "۸۶٪" coverage — it is a *picture* of a system, not a documented component library |
| Competitor colour leak | `app/system-premium.css:42` ships a hardcoded `linear-gradient(118deg,#7367f0,#8f86f7)` (Vuexy's exact primary) on the semi-dark active nav item |
| QA dependency reproducibility | `scripts/qa-*.mjs` import `playwright`, but `playwright` is **not** in `package.json`. CI installs `playwright@1.55.0` + `@axe-core/playwright@4.13.0` with `--lockfile=false` |
| Motion tokens | Not defined in the canonical `astra-reference.css`; the second definition lives in the orphaned `vuexy-polish.css` |

---

## 3. Scorecard — Loraniq vs Metronic vs Vuexy (2026-09-18)

Ratings are relative to *current* public product, not marketing claims.

| Dimension | Metronic benchmark | Vuexy benchmark | Loraniq measured position | Verdict |
| --- | --- | --- | --- | --- |
| Visual polish / composition | Broad but utilitarian | Calm, consistent, premium | Astra shell is coherent and distinctive; quiet borders, disciplined hierarchy | **Approaching Vuexy** — needs state-by-state polish audit |
| Typography | Framework-ready | Theme-level scale | Self-hosted Vazirmatn, Persian-first rhythm — a genuine differentiator | **At/above both for Persian** |
| Colour system | Production semantic | Polished MUI palette | Astra violet pinned with `!important`; one Vuexy hex still leaks in semi-dark | **Close** — remove the leak |
| Page breadth | Very large (1000+ components, many editions) | 10 apps · 30+ pages · 15+ front pages | 34 routes / 6 dashboards / 14 operational | **Behind Metronic, near Vuexy** |
| Component architecture | Documented ReUI/KtUI libraries, registry-driven | MUI + overrides | 61 primitives, 13 used, no docs, no registry | **Largest architectural gap** |
| Layout variety | Many documented layout patterns | 6 shipped layout variants | 1 Astra shell + density/skin/width/sidebar/motion axes (7) | **Competitive on axes, behind on distinct layouts** |
| Theme / customizer | Provider architecture | Config-driven customizer | Type-safe persistent provider, 7 axes, cross-tab sync | **At parity or better than Vuexy's model** |
| RTL / LTR | Supported | "RTL enabled in all demos" | 96 % logical properties, runtime switch, `fa`/`en` | **Ahead — this is Loraniq's moat** |
| Dark / semi-dark | Supported | Dedicated variants | Independent dark tokens + persistent semi-dark skin | **Parity** |
| Data tables & forms | Broad coverage incl. TanStack Table | Mature app patterns | Real responsive tables + multi-step forms with validation; no sorting/virtualisation/column config | **Behind both** |
| Charts | Chart library + widgets | 2 chart libraries | Hand-rolled SVG, keyboard-accessible, but single-series and one-off per route | **Behind; quality is good, reusability is not** |
| Apps depth | Extensive | 10 real apps | Chat/Email/Files/Invoice/Kanban/Calendar exist as single-route views, no sub-routes | **Behind — breadth is presentational** |
| Empty / error / loading states | Covered | Consistent | Present and demonstrated on the Lab route only | **Behind — must be systemic** |
| Motion | Purposeful interactions | Polished transitions | Tokens + reduced-motion path exist, but tokens live outside the canonical file | **Behind — centralise** |
| Landing / demo selector | Marketing site | 15+ front pages | Landing + Demos with **real** Chromium-captured previews | **Honest and competitive; previews are 45 % of export weight** |
| DX / docs / packaging | Extensive docs, 14 guides | Clear docs + starter kit | README + 14 internal docs; no developer guide, no starter/full split | **Behind** |
| Accessibility | Radix/Aria foundations | MUI/ARIA baseline | 231 aria attrs, focus-visible, reduced motion; Axe gate exists in CI | **Good, needs a fresh full audit** |
| Performance | Production builds | Production-ready | Static budget passes; no throttled runtime measurement in this run | **Unverified at runtime** |
| Legal / assets | Large licensed ecosystem | Strong marketing imagery | Local Vazirmatn (OFL) + 4 original SVGs + own screenshots | **Clean, but thin** |

---

## 4. Priority gaps (ranked, each with evidence)

1. **Component system is shallow relative to its own inventory.** 48/61 primitives unused, `recharts` unused, Component Lab is a static showcase. Metronic's real moat is a *documented, reused* component architecture. → Either wire the primitives into real routes and document them, or delete what is not shipped. Dead inventory is a quality signal in reverse.
2. **50,699 B of orphaned CSS, including a file named `vuexy-polish.css`.** It is not loaded, but it is in the tree, and its palette is literally the competitor's. Delete the four orphans; they also confuse the next developer.
3. **Competitor colour leak in shipped CSS.** `#7367f0` (Vuexy's exact primary) is hardcoded in `app/system-premium.css:42` for the semi-dark active nav item. Replace with Astra `#7560d7`. Fails gate question 3 (§5).
4. **App depth is one route deep.** Vuexy ships 10 apps *with sub-routes* (e.g. invoice list → preview → edit → add). Loraniq's apps are single views. Breadth without depth reads as a demo, not a product.
5. **Table/form capability gap.** No column sorting, pagination controls beyond the primitive, column visibility, export, or virtualisation. `components/ui/pagination.tsx` and `table.tsx` exist but are unused.
6. **Motion tokens are not in the canonical file.** Move `--motion-*` into `app/astra-reference.css` so the Astra layer owns motion; delete the duplicate definition in the orphaned Vuexy sheet.
7. **QA deps are not reproducible.** Pin `playwright` and `@axe-core/playwright` in `package.json`/lockfile instead of CI-side `--lockfile=false` installs. Otherwise the documented QA suite cannot be run from a clean checkout.
8. **Marketing weight.** Demo previews are 3.58 MB = 45.5 % of the export and the single largest bucket. Re-encode/resize before release; keep them real screenshots (never mock previews).
9. **No developer documentation / starter-vs-full packaging.** Metronic's 14 guides and Vuexy's docs+starter kit are part of what buyers are purchasing.

---

## 5. The three-question gate (mandatory for every new design decision)

Any new visual, structural or feature decision must pass **all three**:

1. **Is it consistent with the Astra Visual Reference?** (`docs/ASTRA-VISUAL-REFERENCE.md`: 254 px dark workspace sidebar, 78 px topbar, `#7560d7` primary, 13 px cards, 8–9 px controls, quiet shadows, violet as accent not paint.)
2. **Is its quality at premium-market level?** (Would it sit unembarrassed next to the current Metronic/Vuexy demos?)
3. **Does it strengthen an independent Loraniq identity?** (Would removing the Loraniq name still leave something recognisably Loraniq?)

If any answer is **no**, the change does not enter the product.

### Worked examples from this review

| Proposal | Q1 Astra | Q2 Premium | Q3 Identity | Decision |
| --- | --- | --- | --- | --- |
| Keep the Astra dark workspace shell | Yes | Yes | Yes — no competitor ships this exact shell | **Keep** |
| Adopt Vuexy's exact `#7367f0` active-nav gradient | No | Yes | **No** | **Reject** — re-token to Astra `#7560d7` |
| Clone a Metronic layout pattern 1:1 | No | Yes | No | **Reject** — study the hierarchy, rebuild it in Astra |
| Document + wire the 61 primitives into a real Component Lab | Yes | Yes | Yes (Persian-first lab is a differentiator) | **Accept** |
| Add a 7th flagship dashboard to match a competitor count | Yes | Neutral | No — vanity metric | **Reject** unless it solves a distinct problem |
| Re-encode demo previews | Yes | Yes | Neutral | **Accept** (performance) |

---

## 6. Mandatory benchmark gate for every milestone

A milestone is not complete until all applicable rows are reviewed and evidence is recorded.

1. **Visual composition** — hierarchy, density, spacing, grid, cards, typography, scanability, distinctive page identity vs current Metronic/Vuexy demos.
2. **Colour & theme** — semantic colours, light/dark surfaces, contrast, hover/focus/active/disabled, chart palette. No competitor hex values.
3. **Motion** — entrance, hover, state change, overlay feedback, duration/easing, `prefers-reduced-motion`.
4. **Responsive** — desktop/tablet/mobile composition, not a shrunk desktop UI.
5. **RTL/LTR** — direction, icon directionality, spacing, table/form layout, typography in both directions.
6. **Components & states** — default/hover/focus/active/disabled/loading/skeleton/empty/error/success/destructive.
7. **Technical architecture** — type safety, reuse, provider/state design, routing, maintainability, dependency and bundle impact. No unused dependencies or dead CSS.
8. **Accessibility** — keyboard, focus order, labels, landmarks, dialog behaviour, contrast, reduced motion.
9. **Performance** — measured, never asserted.
10. **Assets** — every image/font/icon/illustration has a legal redistribution path.
11. **Independent identity** — §5 gate passes for each new decision.
12. **Evidence** — lint / typecheck / build / browser QA + screenshots recorded before marking a stage green.

### What could not be verified in the 2026-09-18 sandbox run

Stated plainly so it is not mistaken for a pass:

- The Chromium suites (`qa:pages`, `qa:accessibility`, `qa:runtime-performance`, `qa:cross-browser`, `qa:marketing`) **did not run**: no browser binary is present and `cdn.playwright.dev` refused the download (`ECONNRESET`), and `playwright install --with-deps` failed on unavailable font packages. The last recorded green browser run remains the one cited in `docs/PROJECT-STATUS.md` (commit `a5be8e1`, workflow `35294882433`).
- Therefore **no visual/regression/Axe claim in this refresh is new evidence**; it is a static, build-level and source-level assessment.
- The static export was served locally and all sampled routes returned `200` (`/`, `/landing/`, `/demos/`, `/tables/`, `/settings/`, `/login/`).

---

## 7. Non-copy policy (unchanged, binding)

- No Metronic or Vuexy code, markup, CSS, layout, illustration, icon set, screenshot, demo data or marketing copy enters this repository.
- No competitor brand hex values, radii sets or spacing scales are adopted as identity. Adopting a *principle* (calm density, consistent states, documented components) is allowed; reproducing an *expression* is not.
- `app/vuexy-polish.css` and similar competitor-named layers must be deleted, not merely unloaded.
- Loraniq assets must be original, licensed, or generated from Loraniq's own running product (as the demo-preview pipeline already does).

---

## 8. Rightchin / marketplace note

Marketplace copy and images remain a later gate. The project's official Rightchin reference currently records a 2-line introduction, exactly 5 main features, a preferably single 960 px infographic under 1 MB, a title-only full feature list, and a warning against AI-generated final sales copy/images. Re-check these rules on the live Rightchin source immediately before submission because they can change.
