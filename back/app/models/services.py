from sqlmodel import SQLModel, Field, JSON
from typing import Optional, List, Dict
from datetime import datetime
from sqlalchemy import Column


class Service(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    mongodb_id: str = Field(index=True, unique=True)
    title: Dict[str, str] = Field(default={}, sa_column=Column(JSON))
    body: List[Dict[str, str]] = Field(default=[], sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
