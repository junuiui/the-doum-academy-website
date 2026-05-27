from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
from app.core.database import get_session
from app.models.teachers import Teacher
from app.routers.auth import get_current_admin

router = APIRouter(prefix="/teachers", tags=["Teachers"])


# -----------------------------------------------------------------------------
# GET: 강사 목록 조회 (공용)
# -----------------------------------------------------------------------------
@router.get("", response_model=List[Teacher])
def read_teachers(session: Session = Depends(get_session)):
    return session.exec(select(Teacher)).all()


# -----------------------------------------------------------------------------
# POST: 새로운 강사 등록 (어드민 전용)
# -----------------------------------------------------------------------------
@router.post("", response_model=Teacher, status_code=status.HTTP_201_CREATED)
def create_teacher(
    teacher_data: Teacher,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    새로운 강사 프로필을 등록합니다.
    """
    session.add(teacher_data)
    session.commit()
    session.refresh(teacher_data)
    return teacher_data


# -----------------------------------------------------------------------------
# PUT: 강사 정보 수정 (어드민 전용)
# -----------------------------------------------------------------------------
@router.put("/{teacher_id}", response_model=Teacher)
def update_teacher(
    teacher_id: int,
    updated_data: Teacher,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    지정된 ID의 강사 프로필 정보를 수정합니다.
    """
    db_teacher = session.get(Teacher, teacher_id)
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")

    data = updated_data.model_dump(exclude_unset=True)
    for key, value in data.items():
        if key != "id":
            setattr(db_teacher, key, value)

    session.add(db_teacher)
    session.commit()
    session.refresh(db_teacher)
    return db_teacher


# -----------------------------------------------------------------------------
# DELETE: 강사 프로필 삭제 (어드민 전용)
# -----------------------------------------------------------------------------
@router.delete("/{teacher_id}", status_code=status.HTTP_200_OK)
def delete_teacher(
    teacher_id: int,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    지정된 ID의 강사 데이터를 영구히 삭제합니다.
    """
    db_teacher = session.get(Teacher, teacher_id)
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")

    session.delete(db_teacher)
    session.commit()
    return {"detail": f"Teacher ID {teacher_id} has been permanently deleted."}
