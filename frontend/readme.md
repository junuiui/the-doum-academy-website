# Frontend - The Doum Academy

This is the client-side application for The Doum Academy Website, built with Next.js and React.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Vanilla CSS, CSS Modules
- **State/Animations**:
  - `@react-spring/web`
  - `@use-gesture/react`
- **Icons**: `lucide-react`, `react-icons`

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Server

Start the interactive development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

Create an optimized production build:

```bash
npm run build
npm start
```

## Features & Pages

- **Services Page**: Lists details about academy services.
- **Inquiry Form**: Allows users to send messages (Validated and sent to backend).
- **Toast Notifications**: Feedback for user actions.

## Status & Todo

- [x] Services Page UI & Integration
- [x] Inquiry Form UI
- [x] Inquiry Submission Logic
- [x] Toast Notifications
- [ ] Admin Inquiry List Table
- [ ] Gallery & Achievement Section