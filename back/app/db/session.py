"""
Database session management using SQLAlchemy (async) for PostgreSQL.

NOTE: PostgreSQL is not yet configured. The DATABASE_URL env var currently
points to a placeholder. Replace it with your actual PostgreSQL connection
string when ready, e.g.:
    postgresql+asyncpg://user:password@host:5432/dbname
"""

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://user:password@localhost:5432/doum_db"  # replace when ready
)

engine = create_async_engine(DATABASE_URL, echo=False, future=True)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    """FastAPI dependency that yields a database session."""
    async with AsyncSessionLocal() as session:
        yield session
