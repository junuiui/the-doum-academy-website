from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from app.core.database import get_session
from app.models.inquiries import Inquiry

router = APIRouter(prefix="/inquiries", tags=["Inquiries"])

@router.get("", response_model=List[Inquiry])
def read_inquiries(session: Session = Depends(get_session)):
    return session.exec(select(Inquiry)).all()

@router.post("", response_model=Inquiry)
def create_inquiry(inquiry: Inquiry, session: Session = Depends(get_session)):
    session.add(inquiry)
    session.commit()
    session.refresh(inquiry)
    return inquiry
