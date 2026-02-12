# Frontend - The Doum Academy

This is the client-side application for The Doum Academy Website, featuring a premium "Royal Blue & Gold" design system.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **UI Library**: React 19
- **Design System**: Vanilla CSS with CSS Modules & HSL Variables
- **Animations**:
  - `@react-spring/web` (Gallery components)
  - `Framer Motion` (Advanced UI transitions)
- **Icons**: `lucide-react`, `react-icons`

## Core Premium Features

- **Glassmorphic Navigation**: A sticky header with backdrop-blur and animated gold underlines.
- **Dynamic Language Toggle**: A pill-styled switch for 1-click transition between EN and KR.
- **Professional Popups**: Royal Blue & Gold announcement popups with stacking logic and persistence.
- **Fluid Layouts**: Grids that adapt seamlessly through 4, 3, 2, and 1 column layouts across viewports.
- **Service/Faculty Profiles**: High-fidelity cards for programs and teacher introductions.

## Implementation Details

### Multi-Language Synchronization
The frontend maintains parallel directory structures for `/` (English) and `/ko` (Korean). Shared components in `src/components/features` are designed to be locale-agnostic or localized via props.

### Layout & Spacing
A global grid system is established in `globals.css` using radial patterns and CSS variables for consistent padding and gap management.

## Installation & Running

```bash
cd frontend
npm install
npm run dev
```

## Status
- [x] Global Premium Theme (Royal Blue & Gold)
- [x] Multi-Language (EN/KO) Synchronization
- [x] Responsive 4-3-2-1 Column Grid
- [x] Glassmorphic Header & Navbar
- [x] Professional Announcement Popups
- [x] Contact Form & Location Services