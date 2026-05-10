"""
Locations router — mirrors location.route.ts + location.controllers.ts

GET /locations   — returns all locations sorted by location name (asc)
"""

from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy import asc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.models import Location
from app.models.schemas import LocationOut

router = APIRouter(prefix="/locations", tags=["locations"])


@router.get("/", response_model=List[LocationOut])
async def get_all_locations(db: AsyncSession = Depends(get_db)):
    stmt = select(Location).order_by(asc(Location.location))
    result = await db.execute(stmt)
    return result.scalars().all()
