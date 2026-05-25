from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from app.core.database import get_session
from app.models.services import Service

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("", response_model=List[Service])
def read_services(session: Session = Depends(get_session)):
    statement = select(Service).order_by(Service.id)
    return session.exec(statement).all()