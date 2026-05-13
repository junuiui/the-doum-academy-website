from sqlmodel import SQLModel, Field
from typing import Optional

class Location(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    mongodb_id: str = Field(index=True, unique=True) # 기존 $oid 유지용
    location_name: str # location 필드 매핑
    address: str
    phone: str
    email: str
    map_embed_link: str
    directions_base: str