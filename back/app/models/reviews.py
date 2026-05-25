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
        ge=1,  # 💡 Python 레벨 방어: 1보다 크거나 같아야 함 (Greater than or equal)
        le=10, # 💡 Python 레벨 방어: 10보다 작거나 같아야 함 (Less than or equal)
        sa_column_kwargs={
            "server_default": "10", # DB 레벨에서도 기본값을 10으로 설정
        },
        # 💡 DB 레벨 방어: PostgreSQL 자체에서 1~10 외의 값이 들어오면 에러 뱉게 만듦
        sa_column_args=[CheckConstraint("star >= 1 AND star <= 10")]
    )
    
    # Korean
    review_ko: str = Field(schema_extra={"min_length": 2})
    
    # English
    review_en: str = Field(schema_extra={"min_length": 2})
    
    