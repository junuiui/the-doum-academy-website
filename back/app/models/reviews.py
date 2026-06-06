from datetime import datetime
from typing import Optional
from zoneinfo import ZoneInfo
from sqlmodel import Field, SQLModel
from sqlalchemy import CheckConstraint

PACIFIC_TZ = ZoneInfo("America/Vancouver")


def get_pacific_time() -> datetime:
    """새로운 Row가 생성될 때 실행될 함수 (Callable)"""
    return datetime.now(PACIFIC_TZ)

class Review(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, description="ID")
    name: str = Field(schema_extra={"min_length": 2})
    star: int = Field(
        default=10,
        ge=1,  # Python 레벨 방어: >= 1
        le=10, # Python 레벨 방어: < 10
        sa_column_kwargs={
            "server_default": "10",
        },
        # DB protection
        sa_column_args=[CheckConstraint("star >= 1 AND star <= 10")]
    )
    
    # Korean
    review_ko: str = Field(schema_extra={"min_length": 2})
    
    # English
    review_en: str = Field(schema_extra={"min_length": 2})
    
    