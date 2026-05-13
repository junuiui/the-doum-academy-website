from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from app.core.config import settings
from app.core.database import init_db, get_session
from app.models.teachers import Teacher  # Teacher 모델 임포트 (테이블 생성용)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager to handle startup and shutdown events.
    - startup: Initializes the database and creates tables.
    - shutdown: Logic to clean up resources (if any).
    """
    print("====================================")
    print("Initializing Doum Academy Backend...")
    print("====================================")
    
    # SQLModel metadata를 사용해 PostgreSQL 18에 테이블 생성
    init_db()
    
    yield
    print("=====================================")
    print("Shutting down Doum Academy Backend...")
    print("=====================================")


# FastAPI app instance
app = FastAPI(
    title=settings.APP_TITLE,
    description="Backend API for Doum Academy with PostgreSQL 18",
    version="1.0.0",
    lifespan=lifespan,
)


@app.get("/", tags=["Health"])
def root():
    """
    Root endpoint to verify server status.
    """
    return {
        "message": f"Welcome to {settings.APP_TITLE}",
        "database": "PostgreSQL 18 Connected",
        "status": "Running",
    }


# Example: Get all teachers (Verification of the model)
@app.get("/teachers", response_model=List[Teacher], tags=["Teachers"])
def read_teachers(session: Session = Depends(get_session)):
    """
    Fetch all teachers from the database.
    """
    teachers = session.exec(select(Teacher)).all()
    return teachers
