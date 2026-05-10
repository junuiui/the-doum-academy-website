# The Doum Academy — Python FastAPI Backend

Replacement for the Node.js/Express backend. Same API surface, now powered by **FastAPI + SQLAlchemy (async) + PostgreSQL**.

## Project Structure

```
back/
├── app/
│   ├── db/
│   │   └── session.py          # SQLAlchemy engine + get_db dependency
│   ├── models/
│   │   ├── models.py           # ORM table definitions (replaces Mongoose schemas)
│   │   └── schemas.py          # Pydantic request/response models
│   ├── routers/
│   │   ├── achievements.py     # GET  /achievements  (filtering + sorting)
│   │   ├── inquiries.py        # POST /inquiries  GET /inquiries
│   │   ├── locations.py        # GET  /locations
│   │   ├── services.py         # GET  /services  (?lang=en|ko)
│   │   └── teachers.py         # GET  /teachers
│   ├── utils/
│   │   └── mailer.py           # async Gmail SMTP (replaces nodemailer)
│   └── main.py                 # App factory (CORS, routers, error handler)
├── server.py                   # Entry point (replaces server.ts)
├── requirements.txt
└── .env.example
```

## Setup

```bash
cd back

# 1. Create a virtual environment
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env
# Edit .env and fill in DATABASE_URL once your PostgreSQL is ready

# 4. Run the dev server
python server.py
# or directly with uvicorn:
uvicorn app.main:create_app --factory --reload --port 3002
```

## API Endpoints

| Method | Path             | Description                                      |
|--------|------------------|--------------------------------------------------|
| GET    | `/`              | Health check                                     |
| GET    | `/achievements`  | List achievements (filter by year/school/major/name, sort) |
| GET    | `/locations`     | List all locations                               |
| GET    | `/services`      | List services (`?lang=en\|ko` for localized)     |
| GET    | `/teachers`      | List all teachers                                |
| POST   | `/inquiries`     | Submit an inquiry (triggers admin email)         |
| GET    | `/inquiries`     | List all inquiries (admin)                       |

## Database

PostgreSQL is **not yet configured**. When you're ready:

1. Create a database: `createdb doum_db`
2. Set `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/doum_db
   ```
3. Tables are auto-created on server startup (`Base.metadata.create_all`).
4. For production migrations, use **Alembic** (included in `requirements.txt`).

## Notes

- Multilingual fields (`name`, `title`, `body` for services/teachers) are stored as **JSONB** for flexibility during the migration phase.
- The `?lang=en|ko` query param on `/services` works the same as before.
- Email sending uses `aiosmtplib` (async) instead of `nodemailer`.
