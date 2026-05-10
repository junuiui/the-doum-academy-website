"""
Pydantic schemas (request/response validation) for all resources.
These replace the implicit Mongoose schema validation.
"""

from __future__ import annotations
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
import enum


# ---------------------------------------------------------------------------
# Achievement
# ---------------------------------------------------------------------------

class AchievementOut(BaseModel):
    id: int
    Name: str
    Year: int
    School: str
    Major: str
    ScholarshipName: Optional[str] = None
    ScholarshipAmount: Optional[float] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Location
# ---------------------------------------------------------------------------

class LocationOut(BaseModel):
    id: int
    location: str
    address: str
    phone: str
    email: str
    mapEmbedLink: str
    directionsBase: str

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Service
# ---------------------------------------------------------------------------

class LocalizedText(BaseModel):
    en: str
    ko: str


class ServiceOut(BaseModel):
    id: int
    title: LocalizedText
    body: List[LocalizedText]

    model_config = {"from_attributes": True}


class ServiceLocalizedOut(BaseModel):
    """Used when ?lang=en or ?lang=ko is provided."""
    id: int
    title: str
    body: List[str]


# ---------------------------------------------------------------------------
# Teacher
# ---------------------------------------------------------------------------

class TeacherRoleEnum(str, enum.Enum):
    director = "director"
    instructor = "instructor"


class TeacherOut(BaseModel):
    id: int
    role: TeacherRoleEnum
    name: dict
    profileImage: Optional[str] = None
    education: Optional[dict] = None
    subject: Optional[dict] = None
    bio: Optional[dict] = None
    experience: Optional[dict] = None
    certificate: Optional[dict] = None
    achievements: Optional[dict] = None
    core: Optional[dict] = None

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Inquiry
# ---------------------------------------------------------------------------

class InquiryStatusEnum(str, enum.Enum):
    new = "new"
    contacted = "contacted"
    closed = "closed"


class InquiryCreate(BaseModel):
    """Request body for POST /inquiries"""
    studentName: str
    grade: str
    schoolName: str
    phone: Optional[str] = None
    kakao: Optional[str] = None
    inquiry: str
    subject: Optional[str] = None
    englishTest: Optional[str] = None
    apCourse: Optional[str] = None
    otherCourse: Optional[str] = None
    location: str
    message: Optional[str] = None


class InquiryOut(BaseModel):
    id: int
    studentName: str
    grade: str
    schoolName: str
    phone: Optional[str] = None
    kakao: Optional[str] = None
    inquiry: str
    subject: Optional[str] = None
    englishTest: Optional[str] = None
    apCourse: Optional[str] = None
    otherCourse: Optional[str] = None
    location: str
    message: Optional[str] = None
    status: InquiryStatusEnum
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}
