# The Doum Academy Website

Welcome to The Doum Academy Website project. This repository contains the source code for both the frontend and backend of the application.

## Project Structure

This project is organized as a monorepo-style structure:

- **`frontend/`**: The client-side application built with Next.js 16 and React 19.
- **`backend/`**: The server-side API application built with Node.js, Express, and TypeScript.

## Quick Start

You can run the frontend and backend independently.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on [http://localhost:3000](http://localhost:3000).

### Running the Backend

```bash
cd backend
npm install
npm run dev
```

The backend will start on the configured port (default is often 4000 or 5000, check `.env`).

## Deployment

- **Frontend**: Recommended deployment on [Vercel](https://vercel.com).
- **Backend**: Can be deployed on any Node.js hosting service (e.g., AWS, Heroku, Railway).

## Current Status

- **Frontend**: Services page, Inquiry form, and basic routing are implemented.
- **Backend**: Basic API setup, MongoDB connection, and Inquiry submission endpoints are ready.
