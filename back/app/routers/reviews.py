from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select

from app.core.database import get_session
from app.models.reviews import Review  # 파일명에 맞게 임포트 경로 확인
from app.routers.auth import get_current_admin

router = APIRouter(prefix="/reviews", tags=["Reviews"])


# -----------------------------------------------------------------------------
# 1. GET: 리뷰 목록 조회 (일반 유저 및 어드민 공용)
# -----------------------------------------------------------------------------
@router.get("/")
def get_reviews(
    lang: str = Query("ko", description="Language Selection: 'ko' or 'en'"),
    db: Session = Depends(get_session),
):
    """
    일반 유저용 API: 학원 리뷰 목록을 최신순(ID 내림차순)으로 반환합니다.
    선택한 언어(?lang=ko 또는 ?lang=en)에 맞춰 이름, 별점, 리뷰 내용만 정제하여 뿜어줍니다.
    """
    statement = select(Review).order_by(Review.id.desc())
    results = db.exec(statement).all()

    response = []
    for review in results:
        if lang == "en":
            response.append(
                {
                    "id": review.id,
                    "name": review.name,
                    "star": review.star,
                    "review": review.review_en,
                }
            )
        else:
            response.append(
                {
                    "id": review.id,
                    "name": review.name,
                    "star": review.star,
                    "review": review.review_ko,
                }
            )
    return response


# -----------------------------------------------------------------------------
# 2. POST: 새로운 리뷰 작성 (어드민 전용)
# -----------------------------------------------------------------------------
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_review(
    review_data: Review,
    db: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    어드민 대시보드용 API: 새로운 학생/학부모 리뷰를 추가합니다.
    Pydantic 엔진이 star 값이 1~10 사이 정수인지 여기서 1차로 쳐냅니다.
    """
    db.add(review_data)
    db.commit()
    db.refresh(review_data)
    return review_data


# -----------------------------------------------------------------------------
# 3. PUT: 기존 리뷰 수정 (어드민 전용)
# -----------------------------------------------------------------------------
@router.put("/{review_id}")
def update_review(
    review_id: int,
    review_data: Review,
    db: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    어드민 대시보드용 API: 기존 리뷰의 이름, 별점, 내용을 수정합니다.
    """
    db_review = db.get(Review, review_id)
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Requested review not found"
        )

    # 들어온 페이로드로 필드 동적 업데이트 (id 제외)
    review_dict = review_data.dict(exclude_unset=True)
    for key, value in review_dict.items():
        if key != "id":
            setattr(db_review, key, value)

    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


# -----------------------------------------------------------------------------
# 4. DELETE: 리뷰 영구 삭제 (어드민 전용)
# -----------------------------------------------------------------------------
@router.delete("/{review_id}", status_code=status.HTTP_200_OK)
def delete_review(
    review_id: int,
    db: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    어드민 대시보드용 API: 잘못 기재된 리뷰를 DB에서 즉시 완전 삭제합니다.
    """
    db_review = db.get(Review, review_id)
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Requested review not found"
        )

    db.delete(db_review)
    db.commit()

    return {"detail": f"Review ID {review_id} has been permanently deleted."}
