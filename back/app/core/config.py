from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_TITLE: str = "Doum Academy Default"
    DATABASE_URL: str
    DEBUG_MODE: bool = False
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    
    TEMP_ADMIN_USERNAME: str
    TEMP_ADMIN_PW: str 

    # Let Pydantic read .env
    model_config = SettingsConfigDict(env_file=".env")


# Global Instance
settings = Settings()
