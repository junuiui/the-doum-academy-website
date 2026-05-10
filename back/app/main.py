"""
FastAPI application factory — mirrors app.ts

Registers CORS (same origins logic as before), all routers, and a root health
check route.
"""

import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.routers import achievements, locations, services, teachers, inquiries


def create_app() -> FastAPI:
    app = FastAPI(
        title="The Doum Academy API",
        description="FastAPI backend for The Doum Academy website.",
        version="2.0.0",
    )

    # -----------------------------------------------------------------------
    # CORS — mirrors the CORS_ORIGINS env var logic from app.ts
    # -----------------------------------------------------------------------
    raw_origins = os.getenv("CORS_ORIGINS", "")
    allow_origins = raw_origins.split(",") if raw_origins else ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allow_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE"],
        allow_headers=["*"],
    )

    # -----------------------------------------------------------------------
    # Routers
    # -----------------------------------------------------------------------
    app.include_router(achievements.router)
    app.include_router(locations.router)
    app.include_router(services.router)
    app.include_router(teachers.router)
    app.include_router(inquiries.router)

    # -----------------------------------------------------------------------
    # Root health-check (mirrors the GET / route in app.ts)
    # -----------------------------------------------------------------------
    @app.get("/", tags=["health"])
    async def root():
        return {"message": "The Doum Academy API Server is Running!"}

    # -----------------------------------------------------------------------
    # Global error handler (mirrors error.middleware.ts)
    # -----------------------------------------------------------------------
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={"success": False, "message": str(exc)},
        )

    return app
