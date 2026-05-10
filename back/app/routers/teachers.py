"""
Teachers router — mirrors teacher.route.ts + teacher.controllers.ts

GET /teachers   — returns all teachers sorted by id (asc)
  (lang query param is available on the frontend but the original controller
   returns the full document regardless; localisation is done client-side)
"""

from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy import asc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.models import Teacher
from app.models.schemas import TeacherOut

router = APIRouter(prefix="/teachers", tags=["teachers"])


@router.get("/", response_model=List[TeacherOut])
async def get_all_teachers(db: AsyncSession = Depends(get_db)):
    stmt = select(Teacher).order_by(asc(Teacher.id))
    result = await db.execute(stmt)
    return result.scalars().all()
