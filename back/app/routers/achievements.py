from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
from app.core.database import get_session
from app.models.achievements import Achievement
from app.routers.auth import get_current_admin

router = APIRouter(prefix="/achievements", tags=["Achievements"])


# -----------------------------------------------------------------------------
# GET: 합격 실적 목록 조회 (공용)
# -----------------------------------------------------------------------------
@router.get("", response_model=List[Achievement])
def read_achievements(session: Session = Depends(get_session)):
    statement = select(Achievement).order_by(Achievement.year.desc())
    return session.exec(statement).all()


# -----------------------------------------------------------------------------
# POST: 새로운 합격 실적 등록 (어드민 전용)
# -----------------------------------------------------------------------------
@router.post("", response_model=Achievement, status_code=status.HTTP_201_CREATED)
def create_achievement(
    achievement_data: Achievement,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    새로운 합격 실적 혹은 명예의 전당 데이터를 추가합니다.
    """
    session.add(achievement_data)
    session.commit()
    session.refresh(achievement_data)
    return achievement_data


# -----------------------------------------------------------------------------
# PUT: 합격 실적 수정 (어드민 전용)
# -----------------------------------------------------------------------------
@router.put("/{achievement_id}", response_model=Achievement)
def update_achievement(
    achievement_id: int,
    updated_data: Achievement,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    지정된 ID의 합격 실적 정보를 갱신합니다.
    """
    db_achievement = session.get(Achievement, achievement_id)
    if not db_achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")

    data = updated_data.model_dump(exclude_unset=True)
    for key, value in data.items():
        if key != "id":
            setattr(db_achievement, key, value)

    session.add(db_achievement)
    session.commit()
    session.refresh(db_achievement)
    return db_achievement


# -----------------------------------------------------------------------------
# DELETE: 합격 실적 삭제 (어드민 전용)
# -----------------------------------------------------------------------------
@router.delete("/{achievement_id}", status_code=status.HTTP_200_OK)
def delete_achievement(
    achievement_id: int,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    지정된 ID의 합격 실적 데이터를 영구히 삭제합니다.
    """
    db_achievement = session.get(Achievement, achievement_id)
    if not db_achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")

    session.delete(db_achievement)
    session.commit()
    return {"detail": f"Achievement ID {achievement_id} has been permanently deleted."}
