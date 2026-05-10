"""
Services router — mirrors service.route.ts + service.controllers.ts

GET /services
  Query params:
    lang  ("en" | "ko")  — if provided, returns localized (title/body as strings)
                           otherwise returns the full bilingual object
"""

from typing import List, Optional, Union
from fastapi import APIRouter, Depends, Query
from sqlalchemy import asc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.models import Service
from app.models.schemas import ServiceOut, ServiceLocalizedOut

router = APIRouter(prefix="/services", tags=["services"])


@router.get("/", response_model=Union[List[ServiceOut], List[ServiceLocalizedOut]])
async def get_all_services(
    lang: Optional[str] = Query(None, regex="^(en|ko)$"),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Service).order_by(asc(Service.id))
    result = await db.execute(stmt)
    services = result.scalars().all()

    if lang in ("en", "ko"):
        return [
            ServiceLocalizedOut(
                id=s.id,
                title=s.title[lang],
                body=[b[lang] for b in s.body],
            )
            for s in services
        ]

    return services
