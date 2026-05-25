from datetime import datetime
from typing import Optional
from zoneinfo import ZoneInfo
from sqlmodel import Field, SQLModel

PACIFIC_TZ = ZoneInfo("America/Vancouver")


def get_pacific_time() -> datetime:
    """새로운 Row가 생성될 때 실행될 함수 (Callable)"""
    return datetime.now(PACIFIC_TZ)


class Faq(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, description="ID")
    is_active: bool = Field(default=False, description="False to hide, True to show")

    # Korean
    question_ko: str = Field(schema_extra={"min_length": 2})
    answer_ko: str = Field(schema_extra={"min_length": 1})

    # English
    question_en: str = Field(schema_extra={"min_length": 2})
    answer_en: str = Field(schema_extra={"min_length": 5})

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(ZoneInfo("America/Vancouver"))
    )

    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(ZoneInfo("America/Vancouver"))
    )
