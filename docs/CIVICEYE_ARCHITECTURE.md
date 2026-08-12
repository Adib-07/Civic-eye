# CivicEye — Architecture Overview

**Audit date:** 2026-08-11  
**Repository:** Civic-eye (Lovable / TanStack Start template)  
**Audience:** Engineers onboarding to the project

---

## What CivicEye Is Today

CivicEye is a **frontend-only civic issue reporting demo**. Residents can photograph and submit problems (potholes, garbage, street lights, etc.), view them on a map, and browse a list. An “admin” can sign in to see analytics and mark issues resolved.

**Important:** Despite the “SaaS” positioning in marketing copy, there is **no backend database, no Supabase, no multi-tenant billing, and no real AI service**. All data lives in the browser’s `localStorage` on each device.

---

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (client)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │ TanStack     │  │ React pages  │  │ localStorage          │ │
│  │ Router       │──│ (6 routes)   │──│ • reports (JSON)      │ │
│  │ file routes  │  │              │  │ • session (JSON)        │ │
│  └──────────────┘  └──────────────┘  │ • theme preference    │ │
│         │                │            └──────────────────────┘ │
│         │                │                                       │
│         ▼                ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Shared UI: AppShell, Navbar, MapView (Leaflet), charts    │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
         │ SSR shell (TanStack Start + Nitro/Cloudflare)
         ▼
┌─────────────────────────────────────────────────────────────────┐
│ External services (read-only, no CivicEye API)                   │
│ • OpenStreetMap tiles                                            │
│ • Google Fonts (Inter, Plus Jakarta Sans)                      │
│ • Lovable CDN asset URLs (`/__l5e/assets-v1/...`)               │
└─────────────────────────────────────────────────────────────────┘
```

There is **no server-side data layer**. The SSR server only renders HTML and serves static assets.

---

## Technology Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **TanStack Start** (React 19) | SSR-capable; not plain Vite SPA |
| Routing | **TanStack Router** (file-based) | 6 routes under `src/routes/` |
| Styling | **Tailwind CSS v4** | Custom design tokens in `src/styles.css` |
| UI primitives | **shadcn/ui** (Radix) | ~40 components scaffolded; **only `Toaster` is used in app code** |
| Maps | **Leaflet + react-leaflet** | OpenStreetMap tiles |
| Charts | **Chart.js + react-chartjs-2** | Dashboard only |
| Animation | **Framer Motion** | Landing, cards, modals |
| Notifications | **Sonner** | Toast messages |
| Build / deploy | **Vite 8 + Nitro** (Lovable config) | Default Cloudflare target |
| Package manager | **Bun** (`bun.lock` present) | README still mentions npm |

---

## Folder Structure

```
src/
├── routes/           # One file per page (TanStack file routing)
│   ├── __root.tsx    # HTML shell, QueryClient, Toaster, 404/error
│   ├── index.tsx     # Landing / marketing
│   ├── login.tsx     # Demo admin login
│   ├── dashboard.tsx # Analytics (auth-gated)
│   ├── report.tsx    # Submit new issue
│   ├── reports.tsx   # List / search / edit / delete
│   └── map.tsx       # Leaflet map
├── components/       # App-specific UI
│   ├── AppShell.tsx  # Sidebar layout for app pages
│   ├── Navbar.tsx    # Landing nav
│   ├── MapView.tsx   # Map markers + popups
│   └── ui/           # shadcn scaffold (mostly unused)
├── lib/
│   ├── auth.ts       # Demo login + fake AI classifier
│   ├── storage.ts    # localStorage CRUD + seed data
│   ├── hooks.ts      # useReports, useTheme, useHydrated
│   └── types.ts      # Report, Category, Status
├── assets/           # Lovable asset manifest JSON files
├── server.ts         # SSR error wrapper
└── start.ts          # CSRF + error middleware for server fns
```

---

## Routing

| Path | Page | Auth | Data source |
|------|------|------|-------------|
| `/` | Landing | Public | Hardcoded marketing content |
| `/login` | Admin sign-in | Public | `localStorage` session |
| `/dashboard` | Analytics dashboard | **Protected** (`requireAuth`) | `localStorage` reports |
| `/report` | New issue form | Public | Writes to `localStorage` |
| `/reports` | All reports | Public | Reads/writes `localStorage` |
| `/map` | Interactive map | Public | Reads `localStorage` |

Route protection is **client-side only** in `AppShell.tsx`: if `requireAuth` is true and no session exists, redirect to `/login`. Only `/dashboard` sets `requireAuth`.

---

## Data Model

Defined in `src/lib/types.ts`:

```typescript
interface Report {
  id: string;
  title: string;
  description: string;
  category: Category;      // 6 fixed categories
  location: string;
  lat: number;
  lng: number;
  image: string | null;    // base64 data URL when user uploads
  status: Status;          // Pending | In Progress | Resolved
  aiCategory: Category | null;
  aiConfidence: number | null;
  createdAt: string;       // ISO timestamp
}
```

**Persistence:** `localStorage` key `civiceye_reports_v2`. On first visit, three seed reports are written automatically.

**Session:** `localStorage` key `civiceye_session` with `{ username, loginAt }`.

**Theme:** `localStorage` key `civiceye_theme` (`light` | `dark`).

---

## Authentication & Roles

| Role | Implementation | Status |
|------|----------------|--------|
| Public citizen | No account | Can report, browse, edit, delete all reports |
| Admin | Hardcoded `admin` / `admin123` | Can access dashboard after client-side login |

There is **no role field**, **no JWT**, **no Supabase Auth**, and **no server-side session validation**. Anyone with browser devtools can set a fake session or edit reports directly.

---

## Key User Flows

### 1. Report an issue (`/report`)

1. User uploads an image → stored as **base64** in memory.
2. “AI analysis” runs: filename keyword matching in `predictCategory()` (e.g. `pothole.jpg` → Pothole 96%).
3. User fills title, description, location, lat/lng (defaults to New Delhi; optional geolocation).
4. `addReport()` appends to `localStorage` and fires `civiceye:reports` event.
5. Redirect to `/reports`.

### 2. Browse & manage (`/reports`)

1. `useReports()` hook loads from `localStorage`.
2. Search + filter by category/status (client-side).
3. Edit opens inline modal; delete uses `ConfirmDialog`.
4. **No auth check** — any visitor can edit status or delete.

### 3. Map (`/map`)

1. `MapView` lazy-loaded (Leaflet is client-only).
2. Markers colored by status; popup shows image, category, title, location.
3. `MapFitter` auto-zooms to report bounds.

### 4. Admin dashboard (`/dashboard`)

1. `AppShell` with `requireAuth` checks session.
2. Stat cards, pie chart (category), bar chart (status), recent table.
3. “Resolve” button sets status to `Resolved` in `localStorage`.

---

## State Management

- **No Redux / Zustand.**
- **`useReports` hook** subscribes to custom `civiceye:reports` and native `storage` events.
- **`@tanstack/react-query`** is wired (`QueryClientProvider` in root) but **no `useQuery` / `useMutation` calls exist**.
- Theme toggled via `useTheme` hook + `document.documentElement.classList`.

---

## External Integrations

| Integration | Purpose | Present? |
|-------------|---------|----------|
| Supabase | Database / Auth / Storage | **No** |
| OpenStreetMap | Map tiles | Yes |
| Lovable assets CDN | Seed/marketing images | Yes |
| Stripe / billing | Subscriptions | **No** |
| Email / SMS / push | Notifications | **No** |
| Real ML / vision API | Image classification | **No** (filename heuristics) |

---

## SSR & Error Handling

- **TanStack Start** renders the React shell on the server.
- `src/server.ts` wraps SSR responses and replaces generic h3 500 JSON with an HTML error page.
- `src/start.ts` adds CSRF middleware for **server functions** (none are defined yet).
- Root route has `ErrorComponent` and `NotFoundComponent`.
- Lovable-specific error reporting hooks in `lovable-error-reporting.ts`.

---

## Environment Variables

**No `.env` files** exist in the repository. The Lovable Vite config supports `VITE_*` injection at build time, but **no app code reads environment variables today**.

---

## Deployment Context

- Connected to **Lovable** (`710d1867-d14f-4615-b026-a8d76a05277f`).
- Published URL referenced in meta tags: `https://civiceye.lovable.app`.
- `AGENTS.md` warns against force-pushing or rewriting git history synced with Lovable.

---

## Gap Between Marketing and Reality

The landing page claims “12 wards”, “320+ issues resolved”, “850+ residents”, and “AI categorisation”. In code:

- Ward/resident/resolution numbers are **hardcoded** in the landing page.
- “AI” is **filename keyword matching**, not computer vision.
- Data is **per-browser**, not shared across users or devices.
- There is **no municipal multi-tenant SaaS** architecture yet.

---

## Summary

CivicEye is a **polished frontend prototype** built on TanStack Start with local persistence. It demonstrates UX for civic reporting but requires a real backend (Supabase or similar), proper auth/RBAC, cloud image storage, and an actual classification service before it can operate as production SaaS.

See `CIVICEYE_TECHNICAL_AUDIT.md` for a detailed functionality matrix, security findings, and prioritized implementation plan.
