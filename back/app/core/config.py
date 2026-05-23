from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_TITLE: str = "Doum Academy Default"
    DATABASE_URL: str
    DEBUG_MODE: bool = False

    # Let Pydantic read .env
    model_config = SettingsConfigDict(env_file=".env")


# Global Instance
settings = Settings()
