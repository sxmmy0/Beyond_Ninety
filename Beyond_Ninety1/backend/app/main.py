from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from app.config import settings

app = FastAPI(title="Beyond Ninety API")

@app.get("/")
async def root():
    return {"message": "Welcome to Beyond Ninety!"}

register_tortoise(
    app,
    db_url=settings.DATABASE_URL,
    modules={"models": ["app.models.user"]},  # Update this once user model exists
    generate_schemas=True,
    add_exception_handlers=True,
)
