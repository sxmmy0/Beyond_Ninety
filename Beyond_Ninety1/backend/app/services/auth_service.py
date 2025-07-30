from app.config import settings
from tortoise.exceptions import IntegrityError
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password
from app.schemas.user import UserLogin
from app.core.security import verify_password, create_access_token
from tortoise.exceptions import DoesNotExist
from datetime import timedelta


async def register_user(user_create: UserCreate):
    hashed_pw = hash_password(user_create.password)
    try:
        user = await User.create(
            email=user_create.email,
            username=user_create.username,
            hashed_password=hashed_pw
        )
        return user
    except IntegrityError:
        return None

async def login_user(user_login: UserLogin):
    try:
        user = await User.get(email=user_login.email)
    except DoesNotExist:
        return None

    if not verify_password(user_login.password, user.hashed_password):
        return None

    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return access_token