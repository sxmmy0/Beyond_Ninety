from tortoise.exceptions import IntegrityError
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password

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
