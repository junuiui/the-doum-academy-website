from datetime import datetime
from typing import List, Optional
from zoneinfo import ZoneInfo
from sqlmodel import Field, SQLModel
from sqlalchemy import Column, ARRAY, String 

PACIFIC_TZ = ZoneInfo("America/Vancouver")


def get_pacific_time() -> datetime:
    return datetime.now(PACIFIC_TZ)


class ExtraData(SQLModel, table=True):
    __tablename__ = "extra_data"

    id: Optional[int] = Field(default=None, primary_key=True, description="ID")
    category: str = Field(
        index=True, description="Content category (hero, banner, popup)"
    )
    is_active: bool = Field(default=True, description="Activation status")

    # 단일 문자열 텍스트 필드
    title_ko: Optional[str] = Field(default=None, description="Korean Title")
    title_en: Optional[str] = Field(default=None, description="English Title")

    # 다중 문자열(List) 저장을 위한 PostgreSQL ARRAY 데이터 타입 매핑
    subtitle_ko: Optional[List[str]] = Field(
        default=None,
        sa_column=Column(ARRAY(String), nullable=True),
        description="Korean Subtitle List",
    )
    subtitle_en: Optional[List[str]] = Field(
        default=None,
        sa_column=Column(ARRAY(String), nullable=True),
        description="English Subtitle List",
    )

    # 메타데이터 타임스탬프
    created_at: datetime = Field(
        default_factory=get_pacific_time, description="Row creation time"
    )
    updated_at: datetime = Field(
        default_factory=get_pacific_time, description="Row update time"
    )
