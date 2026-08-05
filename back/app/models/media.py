from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


# -----------------------------------------------------------------------------
# 1. AchievementMedia (연도별 성과 이미지/미디어)
# -----------------------------------------------------------------------------
class AchievementMediaBase(SQLModel):
    year: int = Field(index=True)  # 조회 시 연도별 정렬/필터링용
    title: str  # 성과 제목 (예: "2026 경시대회 수상")
    description: Optional[str] = Field(default=None)
    image_url: str  # 예: "/static/images/achievements/2026_sfu.webp"
    display_order: int = Field(default=0)  # 같은 연도 내 순서 정렬용


class AchievementMedia(AchievementMediaBase, table=True):
    __tablename__ = "achievement_media"  # 학생 실적 테이블(achievements)과 충돌 방지
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)


# -----------------------------------------------------------------------------
# 2. Gallery (학원 갤러리 이미지 - 100개 미만)
# -----------------------------------------------------------------------------
class GalleryBase(SQLModel):
    title: str
    description: Optional[str] = Field(default=None)
    image_url: str  # 예: "/static/images/gallery/classroom_1.webp"
    category: Optional[str] = Field(
        default=None
    )  # 예: "facility", "event", "class" (선택사항)
    display_order: int = Field(default=0)  # 노출 순서
    is_active: bool = Field(default=True)  # 숨김/노출 여부


class Gallery(GalleryBase, table=True):
    __tablename__ = "galleries"
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)


# -----------------------------------------------------------------------------
# 3. Banner (메인/페이지별 배너)
# -----------------------------------------------------------------------------
class BannerBase(SQLModel):
    title: str  # 배너 식별용 이름 (예: "Main Home Hero")
    description: Optional[str] = Field(default=None)
    image_url: str  # 예: "/static/images/banners/hero_bg.webp"
    target_link: Optional[str] = Field(default=None)  # 클릭 시 이동할 URL (선택사항)
    location_tag: str = Field(
        default="home_main"
    )  # 배너 위치 구분 (예: "home_main", "about_top")
    is_active: bool = Field(default=True)


class Banner(BannerBase, table=True):
    __tablename__ = "banners"
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)