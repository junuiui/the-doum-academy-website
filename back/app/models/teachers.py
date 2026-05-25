from sqlmodel import SQLModel, Field, JSON
from typing import Optional, List, Dict
from datetime import datetime


class Teacher(SQLModel, table=True):
    """
    Teacher Model for Doum Academy
    - id: Primary Key (Auto-incrementing Integer)
    - role: Teacher's position (e.g., director, tutor)
    - Multilingual fields (name, education, bio, etc.) are stored as JSONB
        for flexibility while maintaining high performance in PostgreSQL 18.
    """

    # Primary Key
    id: Optional[int] = Field(default=None, primary_key=True)

    # Metadata
    role: str = Field(index=True)
    profile_image: Optional[str] = None

    # Multilingual Content (Using dict to store {"en": "...", "ko": "..."})
    # JSONB is used internally by PostgreSQL 18 for fast querying.
    name: Dict[str, str] = Field(default={}, sa_type=JSON)
    education: Dict[str, str] = Field(default={}, sa_type=JSON)
    bio: Dict[str, str] = Field(default={}, sa_type=JSON)
    achievements: Dict[str, str] = Field(default={}, sa_type=JSON)
    core: Dict[str, str] = Field(default={}, sa_type=JSON)

    # Lists (Using list of strings within JSONB)
    # Stores {"en": ["Math", "Science"], "ko": ["수학", "과학"]}
    subject: Dict[str, List[str]] = Field(default={}, sa_type=JSON)
    experience: Dict[str, List[str]] = Field(default={}, sa_type=JSON)
    certificate: Dict[str, List[str]] = Field(default={}, sa_type=JSON)

    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
