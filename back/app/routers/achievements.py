"""
Achievements router — mirrors achievement.route.ts + achievement.controllers.ts

GET /achievements
  Query params:
    year    (int)    — filter by Year
    school  (str)    — filter by School
    major   (str)    — filter by Major
    name    (str)    — case-insensitive substring search on Name
    sort    (str)    — column to sort by (default: "Year")
    order   (str)    — "asc" | "desc" (default: "desc")
"""

from typing import Optional, List
from fastapi import APIRouter, Depends, Query
from sqlalchemy import asc, desc, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.models import Achievement
from app.models.schemas import AchievementOut

router = APIRouter(prefix="/achievements", tags=["achievements"])

SORTABLE_COLUMNS = {
    "Year": Achievement.Year,
    "School": Achievement.School,
    "Major": Achievement.Major,
    "Name": Achievement.Name,
    "ScholarshipAmount": Achievement.ScholarshipAmount,
}


@router.get("/", response_model=List[AchievementOut])
async def get_all_achievements(
    year: Optional[int] = Query(None),
    school: Optional[str] = Query(None),
    major: Optional[str] = Query(None),
    name: Optional[str] = Query(None),
    sort: str = Query("Year"),
    order: str = Query("desc"),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Achievement)

    # filtering
    if year is not None:
        stmt = stmt.where(Achievement.Year == year)
    if school:
        stmt = stmt.where(Achievement.School == school)
    if major:
        stmt = stmt.where(Achievement.Major == major)
    if name:
        stmt = stmt.where(Achievement.Name.ilike(f"%{name}%"))

    # sorting
    sort_col = SORTABLE_COLUMNS.get(sort, Achievement.Year)
    stmt = stmt.order_by(asc(sort_col) if order == "asc" else desc(sort_col))

    result = await db.execute(stmt)
    return result.scalars().all()
