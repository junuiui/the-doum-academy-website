from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from app.core.database import get_session
from app.models.locations import Location
from app.routers.auth import get_current_admin

router = APIRouter(prefix="/locations", tags=["Locations"])


# -----------------------------------------------------------------------------
# 1. GET: 지점 목록 조회 (일반 유저 및 어드민 공용)
# -----------------------------------------------------------------------------
@router.get("", response_model=List[Location])
def read_locations(session: Session = Depends(get_session)):
    return session.exec(select(Location)).all()


# -----------------------------------------------------------------------------
# 2. POST: 새로운 지점 생성 (어드민 전용)
# -----------------------------------------------------------------------------
@router.post("", response_model=Location, status_code=status.HTTP_201_CREATED)
def create_location(
    location_data: Location,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    새로운 학원 지점 정보를 데이터베이스에 등록합니다.
    """
    session.add(location_data)
    session.commit()
    session.refresh(location_data)
    return location_data


# -----------------------------------------------------------------------------
# 3. PUT: 기존 지점 정보 수정 (어드민 전용)
# -----------------------------------------------------------------------------
@router.put("/{location_id}", response_model=Location)
def update_location(
    location_id: int,
    updated_data: Location,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    지정된 ID의 지점 정보를 찾아 데이터를 덮어씁니다.
    """
    db_location = session.get(Location, location_id)
    if not db_location:
        raise HTTPException(status_code=404, detail="Location not found")

    data = updated_data.model_dump(exclude_unset=True)
    for key, value in data.items():
        if key != "id":
            setattr(db_location, key, value)

    session.add(db_location)
    session.commit()
    session.refresh(db_location)
    return db_location


# -----------------------------------------------------------------------------
# 4. DELETE: 지점 정보 삭제 (어드민 전용)
# -----------------------------------------------------------------------------
@router.delete("/{location_id}", status_code=status.HTTP_200_OK)
def delete_location(
    location_id: int,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    지정된 ID의 지점 데이터를 데이터베이스에서 영구히 삭제합니다.
    """
    db_location = session.get(Location, location_id)
    if not db_location:
        raise HTTPException(status_code=404, detail="Location not found")

    session.delete(db_location)
    session.commit()
    return {"detail": f"Location ID {location_id} has been permanently deleted."}