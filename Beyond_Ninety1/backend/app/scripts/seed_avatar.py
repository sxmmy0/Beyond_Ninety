import asyncio
from app.models.user import User
from app.models.avatar import Avatar
from tortoise import Tortoise

async def seed():
    await Tortoise.init(
        db_url="your-db-url-here",
        modules={"models": ["app.models.user", "app.models.avatar"]}
    )
    await Tortoise.generate_schemas()

    user = await User.get(email="samuel@example.com")
    await Avatar.create(user=user, speed=70, endurance=80, agility=65)
    await Tortoise.close_connections()

asyncio.run(seed())
