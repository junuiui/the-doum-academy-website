from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

# 1. 신설: 어드민 동적 옵션 제어 모델
class InquiryOption(SQLModel, table=True):
    __tablename__ = "inquiry_options"

    id: Optional[int] = Field(default=None, primary_key=True)
    inquiry_type: str = Field(index=True)  # e.g., "online", "summer", "ap"
    option_name: str                        # e.g., "Physics 11", "Math 10 Prep"
    display_order: int = Field(default=0)  # 드롭다운 노출 순서
    is_active: bool = Field(default=True)   # 어드민 숨김/노출 플래그
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# 2. 정비: 통합 문의 모델
class Inquiry(SQLModel, table=True):
    __tablename__ = "inquiries"

    id: Optional[int] = Field(default=None, primary_key=True)
    student_name: str
    grade: str
    school_name: str
    phone: str
    kakao: Optional[str] = None
    inquiry_type: str                      # e.g., "online", "summer", "ap", "other"
    
    # [수정] 기존 개별 필드(subject, english_test 등) 제거 후 통합
    inquiry_option_id: Optional[int] = Field(default=None, foreign_key="inquiry_options.id")
    custom_course_text: Optional[str] = None  # 드롭다운 외 직접 입력 텍스트 (AP 과목명 등)
    
    location_id: str                       # 위치 ID
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)