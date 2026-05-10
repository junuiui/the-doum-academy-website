"""
SQLAlchemy ORM models — PostgreSQL equivalents of the Mongoose schemas.

Each model maps 1-to-1 with the original MongoDB collection shape.
Nested / localized text (en/ko) is stored as JSONB columns for flexibility
until you decide on a full relational schema.
"""

from datetime import datetime
from typing import Optional, List
from sqlalchemy import (
    Integer, String, Float, DateTime, Text, Enum as SAEnum, JSON, func
)
from sqlalchemy.orm import Mapped, mapped_column
from app.db.session import Base
import enum


# ---------------------------------------------------------------------------
# Achievement
# ---------------------------------------------------------------------------

class Achievement(Base):
    __tablename__ = "achievements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    Name: Mapped[str] = mapped_column(String, nullable=False)
    Year: Mapped[int] = mapped_column(Integer, nullable=False)
    School: Mapped[str] = mapped_column(String, nullable=False)
    Major: Mapped[str] = mapped_column(String, nullable=False)
    ScholarshipName: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    ScholarshipAmount: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())


# ---------------------------------------------------------------------------
# Location
# ---------------------------------------------------------------------------

class Location(Base):
    __tablename__ = "locations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    location: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    address: Mapped[str] = mapped_column(String, nullable=False)
    phone: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False)
    mapEmbedLink: Mapped[str] = mapped_column(Text, nullable=False)
    directionsBase: Mapped[str] = mapped_column(String, nullable=False)


# ---------------------------------------------------------------------------
# Service  (title / body stored as JSONB — {en, ko})
# ---------------------------------------------------------------------------

class Service(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)  # custom numeric id
    title: Mapped[dict] = mapped_column(JSON, nullable=False)   # {"en": "...", "ko": "..."}
    body: Mapped[list] = mapped_column(JSON, nullable=False)    # [{"en": "...", "ko": "..."}, ...]
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())


# ---------------------------------------------------------------------------
# Teacher  (multilingual fields stored as JSONB)
# ---------------------------------------------------------------------------

class TeacherRole(str, enum.Enum):
    director = "director"
    instructor = "instructor"


class Teacher(Base):
    __tablename__ = "teachers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)          # custom numeric id
    role: Mapped[TeacherRole] = mapped_column(SAEnum(TeacherRole), nullable=False)
    name: Mapped[dict] = mapped_column(JSON, nullable=False)            # {"en": "...", "ko": "..."}
    profileImage: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    education: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    subject: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    bio: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    experience: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    certificate: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    achievements: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    core: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())


# ---------------------------------------------------------------------------
# Inquiry
# ---------------------------------------------------------------------------

class InquiryStatus(str, enum.Enum):
    new = "new"
    contacted = "contacted"
    closed = "closed"


class Inquiry(Base):
    __tablename__ = "inquiries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    studentName: Mapped[str] = mapped_column(String, nullable=False)
    grade: Mapped[str] = mapped_column(String, nullable=False)
    schoolName: Mapped[str] = mapped_column(String, nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    kakao: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    inquiry: Mapped[str] = mapped_column(Text, nullable=False)
    subject: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    englishTest: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    apCourse: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    otherCourse: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    location: Mapped[str] = mapped_column(String, nullable=False)
    message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[InquiryStatus] = mapped_column(
        SAEnum(InquiryStatus), nullable=False, default=InquiryStatus.new
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())
