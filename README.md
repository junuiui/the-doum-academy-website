# The Doum Academy

**Official Full-Stack Website Repository**  
Located in Port Moody, British Columbia

---

# Overview

This repository contains the official source code for the website of **The Doum Academy**.

The project follows a full-stack architecture with separated frontend and backend services, providing a maintainable and scalable development environment.

---

# Technical Architecture

This project adopts a **Monorepo architecture**, where the frontend and backend are separated for maintainability and independent development.

## Frontend

| Category | Stack |
|------------|--------|
| Framework | Next.js 15+ (App Router) |
| Library | React 19 |
| Language | TypeScript |
| Design Core | Premium Glassmorphism, CSS Modules, HSL Color System |
| Animation | Framer Motion, @react-spring/web |

---

## Backend

| Category | Stack |
|------------|--------|
| Framework | FastAPI (Python) |
| Database | PostgreSQL with SQLModel ORM |
| Server Runtime | FastAPI CLI (`fastapi dev`) |
| Infrastructure Automation | Automatic database schema creation and initialization through Lifespan Context Manager |

---

# Localization

- Fully synchronized layouts for **English (EN)** and **Korean (KO)**.
- The root path (`/`) serves the English version by default.
- The Korean interface is accessible through the `/ko` route.

---

# Repository Structure

The repository is organized as follows:

```text
/
├── front/     # Next.js frontend application
└── back/      # FastAPI + PostgreSQL backend API server
```

### Directory Description

| Path | Description |
|--------|-------------|
| `/front` | Next.js-based frontend web application |
| `/back` | FastAPI and PostgreSQL backend API server |

---

# Quick Start

Refer to the README files inside each directory for detailed setup instructions.

---

## 1. Backend Setup (Port: 8000)

The backend server creates PostgreSQL sessions using environment variables from the local operating system.

### Installation

```bash
cd back

python -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
```

### Environment Variables

Copy `.env.example` and create a local `.env` file.

```bash
cp .env.example .env
```

Configure your local PostgreSQL credentials inside the `.env` file.

### Run the Development Server

```bash
fastapi dev
```

FastAPI CLI provides automatic hot reload during development.

### Swagger API Documentation

```text
http://localhost:8000/docs
```

---

## 2. Frontend Setup (Port: 3000)

The Next.js client communicates with the local backend server.

### Installation

```bash
cd front

npm install
```

or

```bash
yarn install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Run the Development Server

```bash
npm run dev
```

### Local Address

```text
http://localhost:3000
```

---

# Security and Collaboration Policy

- Production `.env` files must never be committed or pushed to remote repositories.
- Sensitive credentials, including database passwords and JWT signing keys (`SECRET_KEY`), must remain private.
- Only `.env.example` files should be shared for collaboration purposes.
- All credentials are excluded from version control through `.gitignore`.
- Future infrastructure deployments will manage secrets through the following systems.

### Credential Management

- GitHub Secrets
- Synology NAS (DS218+) environment

---

## © The Doum Academy

All Rights Reserved.