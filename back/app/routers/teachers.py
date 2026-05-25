from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from app.core.database import get_session
from app.models.teachers import Teacher

router = APIRouter(prefix="/teachers", tags=["Teachers"])

@router.get("", response_model=List[Teacher])
def read_teachers(session: Session = Depends(get_session)):
    return session.exec(select(Teacher)).all()

# todo: put