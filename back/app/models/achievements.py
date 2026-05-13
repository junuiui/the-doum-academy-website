from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Achievement(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(alias="Name")
    school: str = Field(alias="School")
    major: str = Field(alias="Major")
    scholarship_name: Optional[str] = Field(alias="ScholarshipName")
    scholarship_amount: int = Field(alias="ScholarshipAmount", default=0)
    year: int = Field(alias="Year")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)