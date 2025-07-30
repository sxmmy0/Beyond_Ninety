from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserCreate, UserPublic, UserLogin, TokenResponse
from app.services.auth_service import register_user, login_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserPublic)
async def register(user_create: UserCreate):
    user = await register_user(user_create)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or username already exists"
        )
    return user

@router.post("/login", response_model=TokenResponse)
async def login(user_login: UserLogin):
    token = await login_user(user_login)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    return {"access_token": token, "token_type": "bearer"}