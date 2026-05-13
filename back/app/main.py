from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from app.core.config import settings
from app.core.database import get_session, init_db
from app.models.teachers import Teacher
from app.models.achievements import Achievement
from app.models.locations import Location
from app.models.services import Service
from app.models.inquiries import Inquiry


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
    
@app.get("/locations", response_model=List[Location], tags=["Locations"])
def read_locations(session: Session = Depends(get_session)):
    locations = session.exec(select(Location)).all()
    return locations


@app.get("/services", response_model=List[Service], tags=["Services"])
def read_services(session: Session = Depends(get_session)):
    statement = select(Service).order_by(Service.id)
    services = session.exec(statement).all()
    return services


@app.post("/inquiries", response_model=Inquiry, tags=["Inquiries"])
def create_inquiry(inquiry: Inquiry, session: Session = Depends(get_session)):
    session.add(inquiry)
    session.commit()
    session.refresh(inquiry)
    return inquiry

@app.get("/inquiries", response_model=List[Inquiry], tags=["Inquiries"])
def read_inquiries(session: Session = Depends(get_session)):
    inquiries = session.exec(select(Inquiry)).all()
    return inquiries


@app.get("/teachers", response_model=List[Teacher], tags=["Teachers"])
def read_teachers(session: Session = Depends(get_session)):
    """
    Fetch all teachers from the database.
    """
    teachers = session.exec(select(Teacher)).all()
    return teachers


@app.get("/achievements", response_model=List[Achievement], tags=["Achievements"])
def read_achievements(session: Session = Depends(get_session)):
    """
    Fetch all achievements from the database.
    """
    statement = select(Achievement).order_by(Achievement.year.desc()) # 내림차순
    return session.exec(statement).all()
    return achievements