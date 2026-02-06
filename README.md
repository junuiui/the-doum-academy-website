# The Doum Academy

**Official Website Repository**  
*Located in Port Moody, British Columbia*

---

## Overview

Welcome to the official source code repository for **The Doum Academy** website. This platform serves as the digital front door for our academy, providing information on our services, achievements, and facilitating communication with students and parents in the Port Moody community.

The application is architected as a modern full-stack solution, ensuring performance, scalability, and a seamless user experience.

## Technical Architecture

This project adopts a monorepo structure to maintain separation of concerns while keeping the codebase unified.

### Frontend
The client-side application is built to be responsive and performant.
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Vanilla CSS, CSS Modules
- **Language**: TypeScript

### Backend
The server-side application handles data persistence and business logic.
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Language**: TypeScript

## Getting Started

### Prerequisites
Ensure the following are installed on your system:
- Node.js (v18+ LTS)
- npm (Node Package Manager)

### Installation & Execution

The frontend and backend services operate independently. You may run them concurrently for full local development.

#### Frontend Application
```bash
cd frontend
npm install
npm run dev
```
*Access via: [http://localhost:3000](http://localhost:3000)*

#### Backend Service
```bash
cd backend
npm install
npm run dev
```
*Port configuration is handled via environment variables (default: 4000/5000).*

## Deployment

- **Frontend**: Optimized for deployment on scalable platforms such as Vercel.
- **Backend**: Compatible with standard Node.js hosting environments (AWS, Azure, Railway, etc.).

## Project Status

**Current Phase**: Active Development

- **Services & Inquiry**: Fully implemented user interfaces for service listings and contact forms.
- **API Integration**: Backend endpoints established for inquiry processing and data management.
- **Next Steps**: Development of administrative dashboards, gallery features, and Google Reviews integration.

---

*© The Doum Academy. All Rights Reserved.*
