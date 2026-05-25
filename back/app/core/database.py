"""
Database Management Module
- Manages the connection between the FastAPI application and PostgreSQL 18.
- Utilizes SQLModel as an ORM (Object-Relational Mapping) layer.
"""

from sqlmodel import create_engine, SQLModel, Session
from .config import settings

# 1. Database Engine Creation
# The 'engine' is the core interface to the database.
# It manages a 'Connection Pool', which maintains a set of active connections
# to be reused, reducing the overhead of opening a new connection for every request.
# echo=True: Logs all generated SQL statements to the terminal (useful for debugging/learning).
engine = create_engine(settings.DATABASE_URL, echo=True)


def init_db():
    """
    Database Table Initialization
    - Uses SQLModel's metadata to detect all classes inherited from 'SQLModel' with 'table=True'.
    - If the tables do not exist in PostgreSQL, it executes 'CREATE TABLE' statements.
    - Typically called once during the application startup (lifespan).
    """
    SQLModel.metadata.create_all(engine)


def get_session():
    """
    Database Session Dependency (Generator)
    - A 'Session' represents a transactional unit of work with the database.
    - Used with FastAPI's 'Depends' for Dependency Injection.
    - 'yield' ensures the session is automatically closed after the request is finished,
        preventing memory leaks or connection exhaustion.
    """
    with Session(engine) as session:
        yield session
