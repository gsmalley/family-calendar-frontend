# Family Calendar Frontend

A shared family calendar application designed for **TV**, **tablet**, and **mobile** — touch-first, always-on, family-friendly.

Built with React + Vite, based on [Weaver's Phase 1 Wireframes](https://github.com/gsmalley/family-calendar-frontend/tree/pixie).

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` with API proxy to `http://localhost:5000`.

## 📐 Features

- **Home** — "Happening Now" hero, today's events, quick actions, family member filter
- **Calendar** — Month/Week/Day views with event indicators and day detail panel
- **Tasks** — Kanban-style columns (Backlog → To Do → In Progress → Done) with priority cards
- **Meals** — Weekly meal planning grid (Breakfast/Lunch/Dinner/Snack × Mon–Sun)
- **School** — Homeschool schedule grid + instrument practice tracker

## 🎨 Design System

Based on Weaver's design tokens in `shared-styles.css`:

- **Primary:** Indigo (#4F46E5)
- **Family Colors:** Blue (Dad), Pink (Mom), Emerald (Emma), Amber (Sam)
- **Typography:** Inter, 4px spacing scale
- **Touch Targets:** 44px minimum (WCAG 2.5.5)
- **Light theme** across all devices

## 📱 Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | 390px | Phone (portrait) |
| Tablet | 768px | iPad portrait |
| Desktop | 1024-1366px | Laptop / landscape tablet |
| TV | 1920px | Large display / TV |

## 🔌 API

Proxies `/api/*` to the Family Calendar backend. See [API docs](http://localhost:5000/) for endpoints.

## 📋 Project Structure

```
src/
├── components/     # Shared UI components
│   ├── AppShell/       # Header, nav, mobile bottom bar
│   ├── FamilySelector # Family member filter chips
│   ├── EventCard/      # Calendar event display
│   ├── TaskCard/       # Task card with priority
│   ├── QuickActions/   # Add Event/Task/Meal/Practice
│   └── SkeletonLoader/ # Loading skeletons
├── context/        # React context (FamilyContext)
├── pages/          # Route pages
│   ├── HomePage/
│   ├── CalendarPage/
│   ├── TasksPage/
│   ├── MealsPage/
│   └── SchoolPage/
├── styles/         # Design tokens & global CSS
└── utils/          # API client, helpers
```