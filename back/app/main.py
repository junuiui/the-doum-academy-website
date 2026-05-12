from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(title=settings.APP_TITLE)


@app.get("/")
def read_root():
    return {"message": "Doum Academy Server is Running"}


@app.get("/health")
def health_check():
    return {"status:": "Succes"}

