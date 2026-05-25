from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from app.core.config import settings
from app.core.database import init_db

from app.routers import auth, locations, services, inquiries, teachers, achievements


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

app.include_router(auth.router)
app.include_router(locations.router)
app.include_router(services.router)
app.include_router(inquiries.router)
app.include_router(teachers.router)
app.include_router(achievements.router)

# app/main.py 맨 밑에 잠시 추가
from app.core.security import get_password_hash

@app.get("/gen-hash", tags=["DevTools"])
def generate_new_hash():
    # 'doum1234'의 순수 bcrypt 해시 값을 생성합니다.
    new_hash = get_password_hash("doum1234")
    print("\n" + "="*50)
    print(f"YOUR NEW HASH VALUE:\n{new_hash}")
    print("="*50 + "\n")
    return {"hash": new_hash}