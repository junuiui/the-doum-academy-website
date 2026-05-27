from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select
from typing import List
from app.core.database import get_session
from app.models.extra_data import ExtraData, get_pacific_time
from app.routers.auth import get_current_admin

router = APIRouter(prefix="/extra-data", tags=["ExtraData"])


# -----------------------------------------------------------------------------
# 1. GET: 카테고리별 데이터 조회 (공용)
# -----------------------------------------------------------------------------
@router.get("", response_model=List[ExtraData])
def read_extra_data(
    category: str = Query(
        ..., description="Filter selection: 'hero', 'banner', or 'popup'"
    ),
    session: Session = Depends(get_session),
):
    """
    일반 유저 및 어드민 공용 API입니다.
    카테고리가 일치하고 활성화상태(is_active=True)인 데이터를 ID 오름차순으로 정렬하여 반환합니다.
    """
    statement = (
        select(ExtraData)
        .where(ExtraData.category == category, ExtraData.is_active == True)
        .order_by(ExtraData.id.asc())
    )
    return session.exec(statement).all()


# -----------------------------------------------------------------------------
# 2. POST: 새로운 홈페이지 데이터 추가 (어드민 전용)
# -----------------------------------------------------------------------------
@router.post("", response_model=ExtraData, status_code=status.HTTP_201_CREATED)
def create_extra_data(
    payload: ExtraData,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    어드민 대시보드용 API입니다.
    새로운 히로, 배너, 팝업 데이터를 생성하며 subtitle 필드는 문자열 리스트 형식을 수용합니다.
    """
    session.add(payload)
    session.commit()
    session.refresh(payload)
    return payload


# -----------------------------------------------------------------------------
# 3. PUT: 기존 데이터 전체 수정 (어드민 전용)
# -----------------------------------------------------------------------------
@router.put("/{data_id}", response_model=ExtraData)
def update_extra_data(
    data_id: int,
    updated_data: ExtraData,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    어드민 대시보드용 API입니다.
    지정된 ID의 데이터를 찾아 내용을 덮어쓰고, 수정 시각(updated_at)을 밴쿠버 현지 시각으로 갱신합니다.
    """
    db_item = session.get(ExtraData, data_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Requested content data not found")

    # 수정을 허용할 필드만 추출하여 데이터 동적 매핑 (id, created_at, updated_at 제외)
    data_dict = updated_data.model_dump(exclude_unset=True)
    for key, value in data_dict.items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(db_item, key, value)

    # 수정 시각 강제 갱신
    db_item.updated_at = get_pacific_time()

    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item


# -----------------------------------------------------------------------------
# 4. DELETE: 데이터 물리 영구 삭제 (어드민 전용)
# -----------------------------------------------------------------------------
@router.delete("/{data_id}", status_code=status.HTTP_200_OK)
def delete_extra_data(
    data_id: int,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    어드민 대시보드용 API입니다.
    타겟팅된 홈페이지 데이터를 데이터베이스에서 즉시 물리적으로 영구 삭제합니다.
    """
    db_item = session.get(ExtraData, data_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Requested content data not found")

    session.delete(db_item)
    session.commit()
    return {
        "detail": f"Content ID {data_id} has been permanently deleted from the database."
    }
