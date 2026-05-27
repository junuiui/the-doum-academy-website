from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
from app.core.database import get_session
from app.models.services import Service
from app.routers.auth import get_current_admin

router = APIRouter(prefix="/services", tags=["Services"])


# -----------------------------------------------------------------------------
# GET: 서비스 목록 조회 (공용)
# -----------------------------------------------------------------------------
@router.get("", response_model=List[Service])
def read_services(session: Session = Depends(get_session)):
    statement = select(Service).order_by(Service.id)
    return session.exec(statement).all()


# -----------------------------------------------------------------------------
# POST: 새로운 서비스 생성 (어드민 전용)
# -----------------------------------------------------------------------------
@router.post("", response_model=Service, status_code=status.HTTP_201_CREATED)
def create_service(
    service_data: Service,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    새로운 학원 프로그램 혹은 서비스 정보를 등록합니다.
    """
    session.add(service_data)
    session.commit()
    session.refresh(service_data)
    return service_data


# -----------------------------------------------------------------------------
# PUT: 기존 서비스 정보 수정 (어드민 전용)
# -----------------------------------------------------------------------------
@router.put("/{service_id}", response_model=Service)
def update_service(
    service_id: int,
    updated_data: Service,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    지정된 ID의 서비스 정보를 찾아 데이터를 덮어씁니다.
    """
    db_service = session.get(Service, service_id)
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")

    data = updated_data.model_dump(exclude_unset=True)
    for key, value in data.items():
        if key != "id":
            setattr(db_service, key, value)

    session.add(db_service)
    session.commit()
    session.refresh(db_service)
    return db_service


# -----------------------------------------------------------------------------
# DELETE: 서비스 삭제 (어드민 전용)
# -----------------------------------------------------------------------------
@router.delete("/{service_id}", status_code=status.HTTP_200_OK)
def delete_service(
    service_id: int,
    session: Session = Depends(get_session),
    current_admin: str = Depends(get_current_admin),
):
    """
    지정된 ID의 서비스 데이터를 영구히 삭제합니다.
    """
    db_service = session.get(Service, service_id)
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")

    session.delete(db_service)
    session.commit()
    return {"detail": f"Service ID {service_id} has been permanently deleted."}