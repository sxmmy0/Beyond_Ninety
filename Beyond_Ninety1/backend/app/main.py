from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from app.config import settings
from app.routers import auth, avatar

app = FastAPI(title="Beyond Ninety API")

app.include_router(auth.router)
app.include_router(avatar.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Beyond Ninety!"}

register_tortoise(
    app,
    db_url=settings.DATABASE_URL,
    modules={"models": ["app.models.user", "app.models.avatar"]},  
    generate_schemas=True,
    add_exception_handlers=True,
)

