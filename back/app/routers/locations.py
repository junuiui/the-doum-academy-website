# CRUD for locations

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from app.core.database import get_session
from app.models.locations import Location

router = APIRouter(prefix="/locations", tags=["Locations"])

@router.get("", response_model=List[Location])
def read_locations(session: Session = Depends(get_session)):
    return session.exec(select(Location)).all()

# @router.put("/{location_id}", response_model=Location)
# def update_location(location_id: int, updated_data: Location, session: Session = Depends(get_session)):
#     db_location = session.get(Location, location_id)
#     if not db_location:
#         raise HTTPException(status_code=404, detail="Location not found")
    
#     # 데이터 업데이트 로직
#     data = updated_data.model_dump(exclude_unset=True)
#     for key, value in data.items():
#         setattr(db_location, key, value)
        
#     session.add(db_location)
#     session.commit()
#     session.refresh(db_location)
#     return db_location