from pydantic import BaseModel

class AvatarPublic(BaseModel):
    speed: int
    endurance: int
    agility: int

    class Config:
        orm_mode = True
