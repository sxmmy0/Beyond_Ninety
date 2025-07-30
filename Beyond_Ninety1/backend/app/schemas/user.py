from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserPublic(BaseModel):
    id: int
    email: EmailStr
    username: str

    class Config:
        orm_mode = True
