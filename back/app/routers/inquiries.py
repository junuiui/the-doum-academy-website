from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List, Optional
from app.core.database import get_session
from app.models.inquiries import Inquiry, InquiryOption
from app.routers.auth import get_current_admin

router = APIRouter(prefix="/inquiries", tags=["Inquiries"])


# --- [1] PUBLIC: 프론트엔드 드롭다운 옵션 조회 API ---
@router.get("/options", response_model=List[InquiryOption])
def read_inquiry_options(
    inquiry_type: Optional[str] = None,
    session: Session = Depends(get_session)
):
    """
    유저가 inquiry_type(예: 'online')을 선택하면 해당되는 활성화된 옵션 목록만 반환합니다.
    """
    statement = select(InquiryOption).where(InquiryOption.is_active == True)
    if inquiry_type:
        statement = statement.where(InquiryOption.inquiry_type == inquiry_type)
    
    statement = statement.order_by(InquiryOption.display_order)
    return session.exec(statement).all()


# --- [2] PUBLIC: 문의 등록 API ---
@router.post("", response_model=Inquiry)
def create_inquiry(inquiry: Inquiry, session: Session = Depends(get_session)):
    session.add(inquiry)
    session.commit()
    session.refresh(inquiry)
    return inquiry


# --- [3] ADMIN: 전체 문의 내역 조회 API ---
@router.get("", response_model=List[Inquiry])
def read_inquiries(
    session: Session = Depends(get_session),
    admin: str = Depends(get_current_admin)
):
    return session.exec(select(Inquiry)).all()


# --- [4] ADMIN: 어드민 옵션 추가 API ---
@router.post("/options", response_model=InquiryOption)
def create_inquiry_option(
    option: InquiryOption,
    session: Session = Depends(get_session),
    admin: str = Depends(get_current_admin)
):
    session.add(option)
    session.commit()
    session.refresh(option)
    return option