from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # .env is empty... use below
    APP_TITLE: str = "Doum Academy Default"
    DATABASE_URL: str
    DEBUG_MODE: bool = False

    # Pydantic reads .env file
    model_config = SettingsConfigDict(env_file=".env")


# instance
settings = Settings()
