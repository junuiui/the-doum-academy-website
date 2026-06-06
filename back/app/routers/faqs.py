from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select

from app.core.database import get_session
from app.models.faqs import Faq, get_pacific_time  # 타임존 함수와 모델 임포트
from app.routers.auth import get_current_admin  # 어드민 인증 의존성

router = APIRouter(prefix="/faqs", tags=["FAQs"])


# -----------------------------------------------------------------------------
# 1. GET
# -----------------------------------------------------------------------------
@router.get("/")
def get_faqs(
    lang: str = Query("ko", description="Language Selection: 'ko' or 'en'"),
    db: Session = Depends(get_session),
):
    # sort_order 오름차순으로 활성화된 FAQ만 조회
    statement = select(Faq).where(Faq.is_active == True).order_by(Faq.id)
    results = db.exec(statement).all()

    response = []
    for faq in results:
        if lang == "en":
            response.append(
                {
                    "id": faq.id,
                    "question": faq.question_en,
                    "answer": faq.answer_en,
                    "updated_at": faq.updated_at,
                }
            )
        else:
            response.append(
                {
                    "id": faq.id,
                    "question": faq.question_ko,
                    "answer": faq.answer_ko,
                    "updated_at": faq.updated_at,
                }
            )
    return response


# -----------------------------------------------------------------------------
# POST
# -----------------------------------------------------------------------------
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_faq(
    faq_data: Faq,
    db: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    어드민 대시보드용 API: 새로운 FAQ 항목을 추가합니다.
    생성 시 밴쿠버 현지 시각(PST)이 자동으로 주입됩니다.
    """
    db.add(faq_data)
    db.commit()
    db.refresh(faq_data)
    return faq_data


# -----------------------------------------------------------------------------
# PUT
# -----------------------------------------------------------------------------
@router.put("/{faq_id}")
def update_faq(
    faq_id: int,
    faq_data: Faq,  # 수정할 데이터를 데이터 패이로드로 받음
    db: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    db_faq = db.get(Faq, faq_id)
    if not db_faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Requested FAQ not found"
        )

    faq_dict = faq_data.dict(exclude_unset=True)
    for key, value in faq_dict.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(db_faq, key, value)

    db_faq.updated_at = get_pacific_time()

    db.add(db_faq)
    db.commit()
    db.refresh(db_faq)
    return db_faq


# -----------------------------------------------------------------------------
# Delete (soft)
# -----------------------------------------------------------------------------
@router.delete("/{faq_id}", status_code=status.HTTP_200_OK)
def delete_faq_soft(
    faq_id: int,
    db: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    어드민 대시보드용 API (Soft Delete): FAQ를 화면에서 숨깁니다.
    데이터는 안전하게 보존되며, updated_at 시각이 갱신됩니다.
    """
    db_faq = db.get(Faq, faq_id)
    if not db_faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Requested FAQ not found"
        )

    # 상태값만 꺼버리고 수정 시각 갱신
    db_faq.is_active = False
    db_faq.updated_at = get_pacific_time()

    db.add(db_faq)
    db.commit()

    return {"detail": f"FAQ ID {faq_id} has been successfully deactivated."}


# -----------------------------------------------------------------------------
# Delete (hard)
# -----------------------------------------------------------------------------
@router.delete("/{faq_id}/permanent", status_code=status.HTTP_200_OK)
def delete_faq_hard(
    faq_id: int,
    db: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    어드민 대시보드용 API (Hard Delete): FAQ 데이터를 DB에서 영구히 삭제합니다.
    실행 시 복구가 불가능하므로 신중하게 호출해야 합니다.
    """
    db_faq = db.get(Faq, faq_id)
    if not db_faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Requested FAQ not found"
        )

    # DB row complete delete
    db.delete(db_faq)
    db.commit()

    return {
        "detail": f"FAQ ID {faq_id} has been permanently deleted from the database."
    }
