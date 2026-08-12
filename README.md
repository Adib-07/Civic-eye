# CivicEye Dashboard

Build a complete, modern React + Vite + Tailwind CSS application called CivicEye – AI City Problem Reporter.

This is a frontend-first MVP that should work immediately after npm install and npm run dev. Do NOT use Firebase, MongoDB, Express, or any backend. Store all data in localStorage.

Requirements:

- Create a premium startup-quality UI using glassmorphism, gradients, smooth animations, Framer Motion, and responsive design.

- Use React Router.

- Create reusable components and a clean folder structure.

- No placeholder pages. Every page must be functional.

Pages:

1. Landing Page

- Hero section

- Feature cards

- Statistics cards

- “How It Works”

- Professional navigation bar

- Footer

2. Login Page

- Demo login (admin/admin123)

- Save session in localStorage

- Protected Dashboard route

3. Report Issue

- Upload image

- Enter title

- Description

- Select category

- Location name

- Latitude and Longitude

- Show uploaded image preview

- AI Result card that automatically predicts category using filename keywords:

  - pothole → Pothole (96%)

  - garbage → Garbage (95%)

  - tree → Fallen Tree (94%)

  - water → Water Leakage (93%)

  - light → Broken Street Light (97%)

  - otherwise → Road Damage (90%)

4. Reports Page

- Display all submitted reports

- Search

- Filter by category

- Filter by status

- Edit

- Delete

- Status badges

- Store everything in localStorage

5. Interactive Map

- Use React Leaflet and OpenStreetMap

- Display all reports as markers

- Clicking a marker opens a popup with image, category, title, location, and status

6. Dashboard

- Total Reports

- Pending

- Resolved

- Today’s Reports

- Pie chart by category

- Bar chart for status

- Recent reports table

- Mark report as resolved

- Animated counters

Extra Features:

- Dark mode

- Toast notifications

- Loading animations

- Responsive sidebar

- Confirmation dialog before delete

- Image modal

- Professional icons

- Empty states

- Beautiful cards

- Mobile responsive

- Clean code using reusable components

Use only:

- React

- Vite

- Tailwind CSS

- React Router

- React Leaflet

- Framer Motion

- Chart.js

- React Icons

Generate the complete project with every file. Do not omit code or leave TODOs. Finish with the exact commands to install dependencies and run the application.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/710d1867-d14f-4615-b026-a8d76a05277f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
