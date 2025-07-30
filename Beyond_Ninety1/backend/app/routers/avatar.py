from fastapi import APIRouter, Depends, HTTPException
from app.models.avatar import Avatar
from app.dependencies.auth import get_current_user
from app.schemas.avatar import AvatarPublic

router = APIRouter(prefix="/avatars", tags=["avatars"])

@router.get("/me", response_model=AvatarPublic)
async def get_my_avatar(user = Depends(get_current_user)):
    avatar = await Avatar.get_or_none(user_id=user.id)
    if not avatar:
        raise HTTPException(status_code=404, detail="Avatar not found")
    return avatar
