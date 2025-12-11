from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str
    software_experience: str  # beginner, intermediate, advanced
    hardware_experience: str  # beginner, intermediate, advanced
    learning_style: str       # visual, auditory, kinesthetic, reading/writing

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: int
    software_experience: str
    hardware_experience: str
    learning_style: str
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None