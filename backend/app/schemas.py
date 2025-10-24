from pydantic import BaseModel, EmailStr
from typing import List, Optional

# ---------- User Create ----------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = None  # optional role (user/admin/super-admin)

# ---------- User Login ----------
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ---------- User Response ----------
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        orm_mode = True

# ---------- Token ----------
class Token(BaseModel):
    access_token: str
    token_type: str


# Project Schemas
class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    owner_id: int

    class Config:
        orm_mode = True

# Task Schemas
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "Todo"
    assignee_id: Optional[int] = None
    project_id: int   


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    project_id: int
    assignee_id: Optional[int]

    class Config:
        orm_mode = True
