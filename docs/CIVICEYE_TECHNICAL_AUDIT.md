# CivicEye — Technical Audit Report

**Audit date:** 2026-08-11  
**Auditor role:** Senior engineer (read-only review)  
**Scope:** Full repository; no code, config, or database changes made during audit

---

## Executive Summary

CivicEye is a **frontend-first MVP** originally specified as a localStorage demo (see `README.md`). It has since been migrated to **TanStack Start** with SSR, a premium marketing landing page, and six functional routes. The UI quality is high, but **core SaaS infrastructure is entirely absent**:

- **No Supabase** (or any database)
- **No API layer**
- **No real authentication or authorization**
- **No cloud file storage**
- **No billing or notification systems**
- **Mock AI** (filename heuristics, not vision ML)

The app works as a **single-device demo**. Data does not sync between users, browsers, or deployments. Admin credentials are hardcoded in source code.

**Overall maturity:** Strong UI/UX prototype · Weak production/SaaS readiness

---

## 1. Framework and Architecture

| Aspect | Finding | Status |
|--------|---------|--------|
| Framework | TanStack Start + React 19 + Vite 8 | **A** — Coherent, modern stack |
| SSR | Enabled via TanStack Start + Nitro | **A** — Shell renders; data still client-only |
| Backend | None | **E** — Missing |
| Multi-tenancy | None | **E** — Missing |
| README accuracy | Describes React Router + npm; actual stack is TanStack Router + bun | **D** — Outdated docs |

**Architecture type:** Client-side SPA behavior wrapped in SSR shell. All business logic runs in the browser.

---

## 2. Frontend Structure

| Area | Finding | Status |
|------|---------|--------|
| Route organization | File-based routes in `src/routes/` | **A** |
| Component library | Custom components + unused shadcn/ui scaffold | **B** — Bloated unused UI kit |
| Design system | Tailwind v4 tokens, glassmorphism, dark mode | **A** |
| Asset pipeline | Lovable CDN manifests (`*.asset.json`) | **A** for Lovable; **C** for local-only dev without CDN |

**Custom app components (actively used):**

- `AppShell`, `Navbar`, `Footer`, `StatCard`, `StatusBadge`, `GlassCard`
- `EmptyState`, `Loader`, `ConfirmDialog`, `ImageModal`, `MapView`

**Unused scaffold:** ~40 files under `src/components/ui/` (only `sonner` Toaster imported in `__root.tsx`).

---

## 3. Routing

| Route | Works? | Notes |
|-------|--------|-------|
| `/` | Yes | Landing |
| `/login` | Yes | Demo login |
| `/dashboard` | Yes | Auth-gated client-side |
| `/report` | Yes | Create report |
| `/reports` | Yes | CRUD list |
| `/map` | Yes | Leaflet map |
| Unknown paths | Yes | Custom 404 in `__root.tsx` |

**Status:** **A** — All declared routes functional; no broken links detected in nav/footer.

**Gap:** No route-level loaders, no server-side data prefetch, no authenticated route guards at router level (only in `AppShell`).

---

## 4. Components

| Component | Purpose | Status |
|-----------|---------|--------|
| `AppShell` | App layout + mobile sidebar + auth gate | **A** |
| `Navbar` | Landing navigation | **A** |
| `MapView` | Leaflet map + markers | **A** |
| `ConfirmDialog` | Delete confirmation | **A** — Custom; shadcn `alert-dialog` unused |
| `EditDialog` (in reports.tsx) | Inline edit modal | **B** — React anti-pattern (setState during render) |
| shadcn `sidebar.tsx` | Full sidebar system | **E** — Not used; `AppShell` has its own sidebar |

**Duplicated patterns:**

- Custom modal/dialog (`ConfirmDialog`, `EditDialog`, `ImageModal`) vs unused shadcn `dialog`, `alert-dialog`, `drawer`
- Custom sidebar in `AppShell` vs unused shadcn `sidebar.tsx`
- Custom form inputs vs unused shadcn `form`, `input`, `select`, `textarea`

---

## 5. Pages

| Page | Functionality | Rating |
|------|---------------|--------|
| Landing | Hero, features, fake stats, testimonials, CTAs | **C** — UI **A**; metrics **mock** |
| Login | Demo credentials, session write | **C** — Demo only |
| Dashboard | Charts, stats, resolve action | **B** — Works locally; auth weak |
| Report | Upload, fake AI, geolocation, submit | **B** — Works; AI mock |
| Reports | Search, filter, edit, delete | **B** — Unprotected admin actions |
| Map | Markers, popups, list sidebar | **A** |

---

## 6. Authentication

| Feature | Implementation | Status |
|---------|----------------|--------|
| Login | `admin` / `admin123` in `src/lib/auth.ts` | **C** — Demo only |
| Session storage | `localStorage` JSON | **C** |
| Session validation | Client read only | **D** — Trivially bypassable |
| Logout | Clears localStorage | **A** |
| Protected routes | Only `/dashboard` via `requireAuth` | **D** — Incomplete |
| Password hashing | None | **E** |
| OAuth / magic link | None | **E** |
| Session expiry | None | **E** |

**Critical:** `/reports` allows **anyone** to edit status and delete reports without login.

---

## 7. Database

| Feature | Status |
|---------|--------|
| PostgreSQL / Supabase | **E** — Not present |
| Migrations | **E** |
| ORM / client | **E** |
| Server-side persistence | **E** |

All persistence is `localStorage`.

---

## 8. Supabase Configuration

| Item | Status |
|------|--------|
| `@supabase/supabase-js` dependency | **E** — Not installed |
| Supabase project / URL / keys | **E** — None |
| RLS policies | **E** — N/A (no database) |
| Supabase Auth | **E** |
| Supabase Storage | **E** |

**Note for future work:** When Supabase is added, RLS must enforce:

- Public read on reports (or ward-scoped read)
- Authenticated insert for citizens
- Admin-only update/delete/status changes
- Storage bucket policies for report images

---

## 9. API Calls

| Type | Count | Status |
|------|-------|--------|
| REST / GraphQL to CivicEye backend | 0 | **E** |
| `fetch()` to external APIs | 0 in app code | — |
| TanStack server functions | 0 defined | **E** |
| React Query queries | 0 (`useQuery` unused) | **E** — Dead wiring |

External requests: OSM tiles, Google Fonts, Lovable CDN images.

---

## 10. State Management

| Mechanism | Usage | Status |
|-----------|-------|--------|
| React `useState` / `useEffect` | Forms, filters, modals | **A** |
| Custom `useReports` hook | Sync via DOM events | **A** for demo |
| React Query | Provider only | **C** — Installed, unused |
| Global store | None | — |

Event bus: `civiceye:reports` and `civiceye:auth` custom events on `window`.

---

## 11. Forms

| Page | Validation | Library | Status |
|------|------------|---------|--------|
| Login | HTML `required` | Native | **B** |
| Report | HTML `required` + coord NaN check | Native | **B** |
| Edit report | Coord NaN check + toast | Native | **B** |

**Unused dependencies:** `react-hook-form`, `@hookform/resolvers`, `zod` — installed but not used in routes.

**Missing:** Server-side validation, schema validation, rate limiting, spam protection.

---

## 12. File Uploads

| Feature | Implementation | Status |
|---------|----------------|--------|
| Image pick | `<input type="file">` | **A** |
| Storage | `FileReader` → base64 data URL | **B** — Works but problematic at scale |
| Persistence | Stored inside report JSON in localStorage | **D** — Quota risk (~5MB typical limit) |
| Cloud upload | None | **E** |
| Image compression | None | **E** |
| MIME validation | `accept="image/*"` only | **B** |

**Risk:** A few high-resolution photos can exhaust `localStorage` and break the app silently.

---

## 13. Map Functionality

| Feature | Status |
|---------|--------|
| Leaflet + react-leaflet | **A** |
| OpenStreetMap tiles | **A** |
| Status-colored markers | **A** |
| Popups with image/details | **A** |
| Auto fit bounds | **A** (`MapFitter`) |
| Lazy load map bundle | **A** |
| SSR safety | **A** — Deferred until hydrated |
| Click-to-set location on map | **E** — Missing (manual lat/lng only) |
| Clustering for many markers | **E** — Missing |

---

## 14. Issue Reporting Workflow

```
User → /report → upload photo → fake AI → fill form → addReport(localStorage)
     → toast → redirect /reports → visible on /map and /dashboard
```

| Step | Status |
|------|--------|
| Create report | **A** |
| AI classification | **C** — Filename keyword mock |
| Geolocation | **A** — Optional browser API |
| Status default | Pending | **A** |
| Cross-user visibility | **E** — Data stays on device |
| Ward routing / assignment | **E** — Marketing copy only |
| Citizen tracking / notifications | **E** |

---

## 15. Admin / Dashboard Workflow

| Feature | Status |
|---------|--------|
| View aggregate stats | **A** (local data) |
| Category pie chart | **A** |
| Status bar chart | **A** |
| Recent reports table | **A** |
| Mark resolved | **A** |
| Filter by ward / date range | **E** |
| Assign to crew | **E** |
| Audit log | **E** |
| Export | **E** |

Dashboard is the **only** route with `requireAuth`, but `/reports` exposes equivalent edit/delete without login.

---

## 16. User Roles

| Role | Defined? | Enforced? |
|------|----------|-----------|
| Anonymous citizen | Implicit | Can do everything except dashboard view |
| Admin | Hardcoded username check | Client-only; dashboard only |

**Missing roles for real SaaS:** ward officer, field crew, super-admin, municipality tenant admin, read-only auditor.

**Status:** **E** — Role system missing

---

## 17. Existing Security Controls

| Control | Present? | Effective? |
|---------|----------|------------|
| HTTPS | Deploy-time (Lovable) | Yes in prod |
| CSRF middleware | Yes (`start.ts`) | N/A — no server fns |
| SSR error sanitization | Yes | **A** |
| Client auth gate | Dashboard only | **D** |
| Input sanitization | None explicit | **D** — XSS risk if data ever rendered unsafely; React default escaping helps |
| CSP headers | Not in repo | Unknown |
| Rate limiting | None | **E** |
| Secrets in repo | `admin123` in source | **P0 risk** |

---

## 18. Responsive / Mobile Implementation

| Area | Status |
|------|--------|
| Landing page | **A** — Responsive grids, mobile nav |
| AppShell sidebar | **A** — Slide-out on mobile |
| Report form | **A** — Stacks on small screens |
| Reports grid | **A** — 1/2/3 columns |
| Map height | **A** — `55vh` min 320px |
| Dashboard table | **B** — Horizontal scroll (`min-w-[640px]`) |
| Touch map interactions | **A** — Leaflet default |
| PWA / offline | **E** — Not implemented |

`use-mobile.tsx` hook exists but is **only used by unused shadcn sidebar**.

---

## 19. Mock / Demo Data

| Data | Location | Type |
|------|----------|------|
| Seed reports (3) | `src/lib/storage.ts` | Auto-loaded on first visit |
| Landing stats (320+, 850+, 4.7, 12) | `src/routes/index.tsx` | **Fake metrics** |
| Live issues cards (4) | `src/routes/index.tsx` | **Hardcoded marketing** |
| Testimonials (3) | `src/routes/index.tsx` | **Fabricated quotes** |
| Default coordinates | New Delhi (28.6139, 77.209) | Hardcoded default |
| AI confidence scores | `predictCategory()` | **Deterministic fake** |
| Contact info | Footer | Placeholder phone/email |

---

## 20. Environment Variables

| Variable | Used? |
|----------|-------|
| Any `VITE_*` | **No** |
| `.env` / `.env.example` | **None in repo** |
| Supabase URL/key | **N/A** |

All configuration is implicit or hardcoded.

---

## 21. Payment / Billing Architecture

| Feature | Status |
|---------|--------|
| Stripe / Razorpay / etc. | **E** — Missing |
| Subscription tiers | **E** |
| Usage metering | **E** |
| Tenant billing | **E** |

---

## 22. Notification Architecture

| Channel | Status |
|---------|--------|
| In-app toast (Sonner) | **A** |
| Email | **E** |
| SMS | **E** |
| Push | **E** |
| Webhooks | **E** |
| Status update to reporter | **E** |

---

## 23. Error Handling

| Layer | Implementation | Status |
|-------|----------------|--------|
| Route error boundary | `ErrorComponent` in `__root.tsx` | **A** |
| 404 page | `NotFoundComponent` | **A** |
| SSR catastrophic errors | `server.ts` + `error-page.ts` | **A** |
| Form errors | Toast messages | **B** |
| localStorage failures | Silent catch → empty array | **D** — User not informed |
| Network errors | N/A | — |
| Lovable telemetry | `lovable-error-reporting.ts` | **A** (Lovable only) |

---

## 24. Loading States

| Location | Pattern | Status |
|----------|---------|--------|
| Dashboard / reports / map | `Loader` component | **A** |
| Login submit | Artificial 600ms delay + spinner | **C** — Cosmetic only |
| Report submit | Artificial 700ms delay | **C** |
| AI analysis | Artificial 1100ms delay | **C** — Simulates ML latency |
| Map | Lazy + Suspense | **A** |
| Skeleton UI (shadcn) | Unused | — |

---

## 25. Empty States

| Location | Status |
|----------|--------|
| Dashboard (no reports) | **A** — `EmptyState` + CTA |
| Reports (none / no matches) | **A** |
| Map (no reports) | **A** |
| Report image preview | **A** — Inline placeholder |

---

## 26. Accessibility

| Item | Status |
|------|--------|
| `lang="en"` on `<html>` | **A** |
| `aria-label` on icon buttons (theme, menu, close) | **B** — Partial |
| Focus trap in modals | **D** — Not implemented |
| Keyboard escape to close modals | **D** — Click-only close |
| Form labels | **A** — Mostly associated |
| Color contrast | **B** — Generally good; not audited with tooling |
| Map accessibility | **D** — Leaflet popups use inline styles; limited screen reader support |
| Skip links | **E** — Missing |
| `EditDialog` close button | **A** — Has `aria-label` |

---

## 27. SEO

| Item | Status |
|------|--------|
| Per-route `<title>` and meta description | **A** |
| Open Graph tags | **A** — Root + landing |
| `robots.txt` | **A** — Allows all crawlers |
| Canonical URLs | **E** — Missing |
| `sitemap.xml` | **E** — Missing |
| Structured data (JSON-LD) | **E** — Missing |
| SSR content for landing | **A** — Marketing text in SSR shell |

---

## 28. Performance

| Item | Status | Notes |
|------|--------|-------|
| Code splitting (map) | **A** | `lazy(() => import MapView)` |
| Framer Motion sitewide | **B** | Adds bundle weight |
| Unused UI dependencies | **D** | Large dead code surface |
| Dual chart libraries | **D** | chart.js + recharts both installed |
| base64 images in localStorage | **D** | Memory + quota pressure |
| Image lazy loading | **A** | `loading="lazy"` on marketing images |
| Font loading | **B** | External Google Fonts blocking |
| React Query overhead | **C** | Provider without queries |

**Build verification:** `npm run build` failed in audit environment because `node_modules` not installed (`vite: command not found`). Source structure appears valid; Lovable CI likely builds successfully.

---

## Functionality Matrix (A / B / C / D / E)

| Area | Rating | Summary |
|------|--------|---------|
| Landing / marketing UI | **C** | Fully rendered; metrics and testimonials are fake |
| Issue submission | **B** | Works locally; mock AI; base64 storage |
| Reports list / CRUD | **B** | Full features; no auth on mutations |
| Interactive map | **A** | Solid Leaflet implementation |
| Admin dashboard | **B** | Works; weak auth; local data only |
| Authentication | **C** | Demo credentials only |
| Authorization / RBAC | **E** | Missing |
| Database / Supabase | **E** | Missing |
| Real AI classification | **C** | Filename heuristics |
| Multi-user / sync | **E** | Missing |
| File cloud storage | **E** | Missing |
| Billing | **E** | Missing |
| Notifications | **E** | Toast only |
| Email/SMS alerts | **E** | Missing |
| Ward / tenant model | **E** | Missing |
| API layer | **E** | Missing |
| Environment config | **E** | Missing |
| Production security | **D** | Hardcoded secrets; client-only gates |

**Legend:**  
**A** = Fully functional · **B** = Partially functional · **C** = Mock/demo only · **D** = Broken or unsafe · **E** = Missing

---

## Issues Catalog

### Security Risks (P0)

1. **Hardcoded admin password** (`admin123`) in `src/lib/auth.ts` and displayed on login page.
2. **Client-only auth** — session is a JSON blob anyone can inject via devtools.
3. **Unprotected mutations** — `/reports` edit/delete/status changes require no login.
4. **No server-side authorization** — even after adding Supabase, client checks alone are insufficient.
5. **base64 images in localStorage** — potential DoS via storage quota on shared machines.

### Supabase / RLS (Future)

- No RLS today because there is no database.
- When migrating, **do not** mirror current client-trust model — all writes must go through RLS-protected tables and Storage policies.

### Hardcoded / Fake Data

- Landing stats, live issues, testimonials (`index.tsx`)
- Seed reports (`storage.ts`)
- Default Delhi coordinates (`report.tsx`)
- AI confidence percentages (`auth.ts` → `predictCategory`)
- Placeholder contact details (`Footer.tsx`)

### Broken / Misleading (D)

- **README** describes React Router; app uses TanStack Router/Start.
- **“SaaS” / “12 wards” / “850+ residents”** — marketing claims without backend support.
- **`EditDialog` setState during render** — can cause extra renders / React strict mode warnings:

```194:194:src/routes/reports.tsx
  if (report && (!draft || draft.id !== report.id)) setDraft(report);
```

### Unnecessary Dependencies

| Package | Reason unused |
|---------|---------------|
| `recharts` + `src/components/ui/chart.tsx` | Dashboard uses Chart.js instead |
| `react-hook-form`, `@hookform/resolvers`, `zod` | Forms use native inputs |
| `@tanstack/react-query` | No queries defined |
| ~40 shadcn/ui Radix packages | Only `sonner` used in app routes |
| `cmdk`, `vaul`, `input-otp`, `embla-carousel-react`, etc. | Scaffold only |

**Estimated dead surface:** ~70% of `dependencies` by package count.

### Duplicated Components / Patterns

- Custom modals vs shadcn `dialog` / `alert-dialog`
- Custom `AppShell` sidebar vs shadcn `sidebar.tsx`
- Custom buttons/inputs vs shadcn form system
- Two chart stacks (Chart.js + Recharts)

### Technical Debt

1. README / stack documentation drift
2. React Query wired but unused
3. Full shadcn install with no adoption path documented
4. `noUnusedLocals: false` in tsconfig — hides dead imports
5. Artificial loading delays masking instant localStorage ops
6. No tests (unit, integration, e2e)
7. No CI config in repo root visible
8. Mixed package manager signals (bun.lock + npm in README)

### Mobile Problems

- Dashboard table requires horizontal scroll on small phones (**minor**)
- Map popup content may overflow narrow viewports (**minor**)
- No installable PWA for field crews

### Inconsistent UI Patterns

- Landing uses `Navbar` + primary styling; app pages use `AppShell` + `bg-brand` / glass classes
- Some buttons use `bg-brand`, landing CTAs use `bg-primary` — same intent, different tokens
- Map popups use inline styles; rest of app uses Tailwind
- Icon libraries: `react-icons/fi` in app; shadcn scaffold expects `lucide-react`

---

## Prioritized Implementation Plan

### P0 — Critical / Broken / Security

| # | Task | Rationale |
|---|------|-----------|
| 1 | **Remove hardcoded credentials**; integrate Supabase Auth (or equivalent) with server-validated sessions | Current auth is trivially bypassable |
| 2 | **Add Supabase (PostgreSQL) + RLS** for reports, users, wards, tenants | No shared data or security model exists |
| 3 | **Enforce authorization on all mutations** (edit, delete, resolve) via RLS + API — not client checks | `/reports` is wide open |
| 4 | **Move images to Supabase Storage** (or S3); stop base64-in-localStorage | Quota failures and no cross-device access |
| 5 | **Add environment variable management** (`.env.example`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) | Required for any real deployment |
| 6 | **Fix `EditDialog` state sync** — use `useEffect` when `report` prop changes | React correctness bug |

### P1 — Core SaaS Functionality

| # | Task | Rationale |
|---|------|-----------|
| 7 | **Data migration path** from localStorage seed to Supabase with ward/tenant scoping | Enable real multi-user product |
| 8 | **Role model**: citizen, ward_officer, admin, super_admin with RLS policies | Matches product narrative |
| 9 | **Replace mock AI** with vision API (Supabase Edge Function + OpenAI/Google Vision) or on-device model | Core value proposition |
| 10 | **React Query hooks** for reports CRUD against Supabase | Replace custom event bus |
| 11 | **Real geocoding** (Nominatim / Google) + map click-to-pin | Better UX than manual lat/lng |
| 12 | **Citizen report tracking** (reference ID, status page without login) | Closes reporting loop |
| 13 | **Admin-only dashboard routes**; public read-only reports/map | Align access with roles |
| 14 | **Form validation** with zod + react-hook-form (already installed) | Data quality |

### P2 — UX / Product Improvements

| # | Task | Rationale |
|---|------|-----------|
| 15 | **Replace fake landing metrics** with real aggregates or remove claims | Trust / compliance |
| 16 | **Unify design system** — adopt shadcn components OR remove unused ui/ folder | Reduce bundle and confusion |
| 17 | **Remove recharts** (or migrate dashboard to recharts and drop Chart.js) | One chart library |
| 18 | **Accessibility pass** — focus traps, Escape key, skip link, map a11y | Inclusivity |
| 19 | **SEO** — canonical URLs, sitemap, JSON-LD for organization | Discoverability |
| 20 | **Loading states** — remove fake delays; use real async pending states | Honest UX |
| 21 | **Empty/error states for API failures** | Production readiness |
| 22 | **Mobile PWA** for field staff offline queue | Indian 4G context from copy |
| 23 | **Map clustering** for dense report areas | Scale UX |
| 24 | **Update README** to reflect TanStack Start, bun, architecture | Developer onboarding |

### P3 — Future Features

| # | Task | Rationale |
|---|------|-----------|
| 25 | **Multi-tenant municipalities** (org billing, ward isolation) | SaaS business model |
| 26 | **Stripe/Razorpay billing** per ward or municipality | Monetization |
| 27 | **Email/SMS/WhatsApp notifications** on status change | Citizen engagement |
| 28 | **Audit log** for admin actions | Government accountability |
| 29 | **Analytics export** (CSV/PDF) | Operational reporting |
| 30 | **Repeat-issue / heatmap analytics** | Mentioned in marketing |
| 31 | **Integration APIs / webhooks** for existing municipal systems | Enterprise sales |
| 32 | **i18n** (Hindi, regional languages) | Indian market fit |
| 33 | **Automated tests + CI** (Playwright e2e, RLS policy tests) | Long-term quality |

---

## Recommended Migration Architecture (Target State)

```
Citizen / Admin Browser
        │
        ▼
TanStack Start (SSR + server functions)
        │
        ├── Supabase Auth (JWT, roles in profiles table)
        ├── Supabase PostgreSQL (reports, wards, tenants) + RLS
        ├── Supabase Storage (report images)
        └── Edge Functions (AI classify, notifications)
```

This preserves the existing UI investment while replacing localStorage with a real data plane.

---

## Files Reviewed

Core application files under `src/` (routes, components, lib, hooks, server entry), `package.json`, `vite.config.ts`, `README.md`, `components.json`, `public/robots.txt`, asset manifests, and Lovable project metadata.

---

## Approval Gate

**No implementation changes have been made** to application code, configuration, or database as part of this audit.

Please review this report and the companion `CIVICEYE_ARCHITECTURE.md`, then approve which P0/P1 items to implement first.
