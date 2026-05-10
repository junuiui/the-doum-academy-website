"""
Entry point — mirrors server.ts

Loads .env before any other imports (mirrors `dotenv.config()` in server.ts),
then creates DB tables and starts the uvicorn server.
When PostgreSQL is ready, just update DATABASE_URL in .env.
"""

from dotenv import load_dotenv
load_dotenv()  # must be FIRST — before any os.getenv calls in submodules

import os
import asyncio
import uvicorn
from app.db.session import engine, Base
from app.main import create_app

# Import all models so SQLAlchemy knows about them before create_all
import app.models.models  # noqa: F401


async def init_db() -> None:
    """Create tables if they don't exist yet (dev convenience)."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("==========\nDB tables ready\n==========")


async def bootstrap() -> None:
    await init_db()


if __name__ == "__main__":
    asyncio.run(bootstrap())

    application = create_app()

    uvicorn.run(
        "server:application",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 3002)),
        reload=True,
        log_level="info",
    )
