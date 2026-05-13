from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # .env 파일에 해당 변수가 없으면 기본값을 사용함
    APP_TITLE: str = "Doum Academy Default"
    DATABASE_URL: str
    DEBUG_MODE: bool = False

    # Pydantic이 .env 파일을 읽도록 설정
    model_config = SettingsConfigDict(env_file=".env")


# 전역에서 사용될 인스턴스 생성
settings = Settings()
