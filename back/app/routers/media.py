import os
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlmodel import Session, select

from app.core.database import get_session
from app.models.media import (
    AchievementMedia,
    AchievementMediaBase,
    Gallery,
    GalleryBase,
    Banner,
    BannerBase,
)

router = APIRouter(prefix="/media", tags=["Media"])

# NAS SSD 저장소 경로 설정 (환경변수 또는 기본값)
NAS_MEDIA_DIR = os.getenv("NAS_MEDIA_DIR", "/Users/junuiui/nas_data/uploads")


# -----------------------------------------------------------------------------
# Utility Function: 파일 저장 및 삭제
# -----------------------------------------------------------------------------
def save_upload_file(file: UploadFile, subfolder: str) -> str:
    """
    UploadFile을 NAS SSD의 지정된 subfolder에 저장하고 static URL 경로를 반환합니다.
    """
    folder_path = os.path.join(NAS_MEDIA_DIR, subfolder)
    os.makedirs(folder_path, exist_ok=True)

    # 파일명 중복 방지를 위한 UUID 생성 (예: a1b2c3d4_filename.jpg)
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4().hex[:8]}_{file.filename}"
    file_save_path = os.path.join(folder_path, unique_filename)

    # 실제 NAS SSD에 파일 쓰기
    with open(file_save_path, "wb") as buffer:
        buffer.write(file.file.read())

    # DB에 저장할 상대 static URL 반환
    return f"/static/images/{subfolder}/{unique_filename}"


def delete_physical_file(image_url: str):
    """
    DB 레코드 삭제 시 NAS SSD에 위치한 실제 파일도 삭제합니다.
    """
    # '/static/images/gallery/xxx.jpg' -> 'gallery/xxx.jpg' 추출
    relative_path = image_url.replace("/static/images/", "")
    full_path = os.path.join(NAS_MEDIA_DIR, relative_path)

    if os.path.exists(full_path):
        os.remove(full_path)


# =============================================================================
# 1. Achievement Media (연도별 성과 사진/미디어 - 엔드포인트: /achievement-media)
# =============================================================================
@router.get("/achievement-media", response_model=List[AchievementMedia])
def get_achievement_media(
    year: Optional[int] = None, session: Session = Depends(get_session)
):
    query = select(AchievementMedia)
    if year:
        query = query.where(AchievementMedia.year == year)
    query = query.order_by(
        AchievementMedia.year.desc(), AchievementMedia.display_order.asc()
    )
    return session.exec(query).all()


@router.post(
    "/achievement-media",
    response_model=AchievementMedia,
    status_code=status.HTTP_201_CREATED,
)
def create_achievement_media(
    year: int = Form(...),
    title: str = Form(...),
    description: Optional[str] = Form(None),
    display_order: int = Form(0),
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
):
    image_url = save_upload_file(file, subfolder="achievements")

    achievement_media = AchievementMedia(
        year=year,
        title=title,
        description=description,
        display_order=display_order,
        image_url=image_url,
    )
    session.add(achievement_media)
    session.commit()
    session.refresh(achievement_media)
    return achievement_media


@router.delete(
    "/achievement-media/{achievement_media_id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete_achievement_media(
    achievement_media_id: int, session: Session = Depends(get_session)
):
    item = session.get(AchievementMedia, achievement_media_id)
    if not item:
        raise HTTPException(status_code=404, detail="Achievement media not found")

    delete_physical_file(item.image_url)  # NAS 실제 파일 삭제
    session.delete(item)
    session.commit()


# =============================================================================
# 2. Gallery (학원 갤러리)
# =============================================================================
@router.get("/galleries", response_model=List[Gallery])
def get_galleries(
    category: Optional[str] = None, session: Session = Depends(get_session)
):
    query = select(Gallery).where(Gallery.is_active == True)
    if category:
        query = query.where(Gallery.category == category)
    query = query.order_by(Gallery.display_order.asc(), Gallery.created_at.desc())
    return session.exec(query).all()


@router.post("/galleries", response_model=Gallery, status_code=status.HTTP_201_CREATED)
def create_gallery(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    display_order: int = Form(0),
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
):
    image_url = save_upload_file(file, subfolder="gallery")

    gallery = Gallery(
        title=title,
        description=description,
        category=category,
        display_order=display_order,
        image_url=image_url,
    )
    session.add(gallery)
    session.commit()
    session.refresh(gallery)
    return gallery


@router.delete("/galleries/{gallery_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gallery(gallery_id: int, session: Session = Depends(get_session)):
    item = session.get(Gallery, gallery_id)
    if not item:
        raise HTTPException(status_code=404, detail="Gallery not found")

    delete_physical_file(item.image_url)
    session.delete(item)
    session.commit()


# =============================================================================
# 3. Banner (메인 / 페이지 배너)
# =============================================================================
@router.get("/banners", response_model=List[Banner])
def get_banners(
    location_tag: str = "home_main", session: Session = Depends(get_session)
):
    query = select(Banner).where(
        Banner.location_tag == location_tag, Banner.is_active == True
    )
    return session.exec(query).all()


@router.post("/banners", response_model=Banner, status_code=status.HTTP_201_CREATED)
def create_banner(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    target_link: Optional[str] = Form(None),
    location_tag: str = Form("home_main"),
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
):
    image_url = save_upload_file(file, subfolder="banners")

    banner = Banner(
        title=title,
        description=description,
        target_link=target_link,
        location_tag=location_tag,
        image_url=image_url,
    )
    session.add(banner)
    session.commit()
    session.refresh(banner)
    return banner


@router.delete("/banners/{banner_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_banner(banner_id: int, session: Session = Depends(get_session)):
    item = session.get(Banner, banner_id)
    if not item:
        raise HTTPException(status_code=404, detail="Banner not found")

    delete_physical_file(item.image_url)
    session.delete(item)
    session.commit()
