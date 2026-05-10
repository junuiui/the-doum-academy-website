"""
Inquiries router — mirrors inquiry.route.ts + inquiry.controllers.ts

POST /inquiries  — create a new inquiry and fire-and-forget admin email
GET  /inquiries  — list all inquiries (admin use), newest first
"""

import asyncio
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.models import Inquiry, InquiryStatus
from app.models.schemas import InquiryCreate, InquiryOut
from app.utils.mailer import send_inquiry_mail

router = APIRouter(prefix="/inquiries", tags=["inquiries"])


@router.post("/", response_model=InquiryOut, status_code=201)
async def create_inquiry(
    body: InquiryCreate,
    db: AsyncSession = Depends(get_db),
):
    print("CREATE INQUIRY ROUTE HIT")

    inquiry = Inquiry(**body.model_dump(), status=InquiryStatus.new)
    db.add(inquiry)
    await db.commit()
    await db.refresh(inquiry)

    # fire-and-forget email (mirrors the Node.js behaviour)
    asyncio.create_task(send_inquiry_mail(body.model_dump()))

    return inquiry


@router.get("/", response_model=List[InquiryOut])
async def get_all_inquiries(db: AsyncSession = Depends(get_db)):
    stmt = select(Inquiry).order_by(desc(Inquiry.created_at))
    result = await db.execute(stmt)
    return result.scalars().all()
