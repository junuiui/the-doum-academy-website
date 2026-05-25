from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from app.core.database import get_session
from app.models.achievements import Achievement

router = APIRouter(prefix="/achievements", tags=["Achievements"])

@router.get("", response_model=List[Achievement])
def read_achievements(session: Session = Depends(get_session)):
    statement = select(Achievement).order_by(Achievement.year.desc()) # 최신순 정렬
    return session.exec(statement).all()