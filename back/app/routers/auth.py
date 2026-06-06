# app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt

from app.core.config import settings
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

# 프론트엔드가 토큰을 제출할 경로 지정
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# 임시 하드코딩된 관리자 정보 (나중에 DB로 이관 가능)
ADMIN_USERNAME = settings.TEMP_ADMIN_USERNAME
ADMIN_HASHED_PASSWORD = settings.TEMP_ADMIN_PW


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Admin Login / JWT Token"""
    from app.core.security import verify_password

    print("\n" + "=" * 50)
    print(f"[DEBUG] 사용자가 입력한 ID: '{form_data.username}'")
    print(f"[DEBUG] 사용자가 입력한 PW: '{form_data.password}'")
    print(f"[DEBUG] .env에서 로드된 ID: '{ADMIN_USERNAME}'")
    print(f"[DEBUG] .env에서 로드된 PW: '{ADMIN_HASHED_PASSWORD}'")
    print("=" * 50 + "\n")

    if form_data.username != ADMIN_USERNAME or not verify_password(
        form_data.password, ADMIN_HASHED_PASSWORD
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}


# 다른 라우터들이 '보안 장벽'으로 사용할 함수
def get_current_admin(token: str = Depends(oauth2_scheme)):
    """토큰을 유효성을 검증하여 현재 로그인한 관리자를 반환"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None or username != ADMIN_USERNAME:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception
