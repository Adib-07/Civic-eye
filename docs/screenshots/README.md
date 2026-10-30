# Screenshots

This directory contains application screenshots for the README and documentation.

## Required Screenshots

To capture these screenshots, run the application locally and take screenshots of each screen:

| File | Route | Description |
|------|-------|-------------|
| `landing.png` | `/` | Landing page hero section |
| `report.png` | `/report` | 4-step issue reporting wizard |
| `dashboard.png` | `/dashboard` | Operations dashboard with charts and stats |
| `reports.png` | `/reports` | Reports queue with filters |
| `map.png` | `/map` | Interactive Leaflet map with markers |
| `issue-detail.png` | (modal from `/reports`) | Issue detail with evidence comparison |
| `login.png` | `/login` | Login page |

## Capture Instructions

1. Start the dev server: `bun run dev`
2. Open `http://localhost:3000`
3. Take full-page screenshots (1280px width recommended)
4. For authenticated screens (`/dashboard`, `/reports`), sign in first
5. Save screenshots as PNG files in this directory

## Usage in README

Reference screenshots in the main README.md like:

```markdown
## Screenshots

### Landing Page
![CivicEye Landing Page](docs/screenshots/landing.png)
```
