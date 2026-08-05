from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import time


# -----------------------------------------------------------------------------
# Base: 공통 필드 정의
# -----------------------------------------------------------------------------
class LocationBase(SQLModel):
    location_name: str
    address: str
    phone: str
    email: str
    map_embed_link: str
    directions_base: str
    start_time: Optional[time] = Field(default=None)
    end_time: Optional[time] = Field(default=None)
    hours_comment: Optional[str] = Field(default=None)


# -----------------------------------------------------------------------------
# DB Table Model
# -----------------------------------------------------------------------------
class Location(LocationBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


# -----------------------------------------------------------------------------
# Request Schemas (DTO)
# -----------------------------------------------------------------------------
class LocationCreate(LocationBase):
    pass


class LocationUpdate(SQLModel):
    location_name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    map_embed_link: Optional[str] = None
    directions_base: Optional[str] = None
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    hours_comment: Optional[str] = None
