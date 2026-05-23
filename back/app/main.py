from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from app.core.config import settings
from app.core.database import init_db

from app.routers import locations, services, inquiries, teachers, achievements


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager to handle startup and shutdown events.
    - startup: Initializes the database and creates tables.
    - shutdown: Logic to clean up resources (if any).
    """
    print("====================================")
    print("Initializing The Doum Academy Backend...")
    print("====================================")
    
    # SQLModel metadata를 사용해 PostgreSQL 18에 테이블 생성
    init_db()
    
    yield
    print("=====================================")
    print("Shutting down The Doum Academy Backend...")
    print("=====================================")


# FastAPI app instance
app = FastAPI(
    title=settings.APP_TITLE,
    description="Backend API for The Doum Academy with PostgreSQL 18",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(locations.router)
app.include_router(services.router)
app.include_router(inquiries.router)
app.include_router(teachers.router)
app.include_router(achievements.router)
