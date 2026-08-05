import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import init_db

from app.routers import (
    auth,
    locations,
    services,
    inquiries,
    teachers,
    achievements,
    faqs,
    reviews,
    extra_data,
    media,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager to handle startup and shutdown events.
    - startup: Initializes the database and creates tables.
    - shutdown: Logic to clean up resources (if any).
    """
    print("====================================")
    print("Initializing The Doum Academy Backend...")
    print("====================================")

    # SQLModel metadata를 사용해 PostgreSQL 18에 테이블 생성
    init_db()

    yield
    print("=====================================")
    print("Shutting down The Doum Academy Backend...")
    print("=====================================")


# FastAPI app instance
app = FastAPI(
    title=settings.APP_TITLE,
    description="Backend API for The Doum Academy with PostgreSQL 18",
    version="1.0.0",
    lifespan=lifespan,
)

origins = [
    "http://localhost:3000",  # Next.js 기본 로컬 주소
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allowed Domain List
    allow_credentials=True,  # 쿠키 및 인증 헤더(Authorization) 포함 허용 여부 (JWT 필수)
    allow_methods=["*"],  # GET, POST, PUT, DELETE 등 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

# # NAS SSD 내 실제 파일 저장 절대 경로
# # 예: Synology NAS의 경우 "/volume1/web/uploads" 또는 Docker volume 경로
# NAS_MEDIA_DIR = os.getenv("NAS_MEDIA_DIR", "/Users/junuiui/nas_data/uploads")

# # 폴더가 없을 경우 자동 생성
# os.makedirs(NAS_MEDIA_DIR, exist_ok=True)

# # /static/images 요청이 오면 NAS_MEDIA_DIR 폴더 안의 실제 파일을 서빙
# app.mount("/static/images", StaticFiles(directory=NAS_MEDIA_DIR), name="static_images")

app.include_router(auth.router)
app.include_router(locations.router)
app.include_router(services.router)
app.include_router(inquiries.router)
app.include_router(teachers.router)
app.include_router(achievements.router)
app.include_router(faqs.router)
app.include_router(reviews.router)
app.include_router(extra_data.router)
app.include_router(media.router)


@app.get("/")
def greeting():
    return {"Hello": "The Doum Academy API"}
