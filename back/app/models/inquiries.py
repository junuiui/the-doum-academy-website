from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Inquiry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    student_name: str
    grade: str
    school_name: str
    phone: str
    kakao: Optional[str] = None
    inquiry_type: str  # inquiry 필드 매핑
    subject: Optional[str] = None
    english_test: Optional[str] = None
    ap_course: Optional[str] = None
    other_course: Optional[str] = None
    location_id: str  # MongoDB의 location ($oid) 연동용
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
