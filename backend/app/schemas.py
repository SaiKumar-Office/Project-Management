from pydantic import BaseModel, EmailStr
from typing import List, Optional

# --- User ---
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_admin: bool

    class Config:
        orm_mode = True

# --- Token ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# --- Project ---
class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    owner_id: int
    members: List[UserResponse] = []

    class Config:
        orm_mode = True

# --- Task ---
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "Todo"
    assignee_id: Optional[int] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    assignee_id: Optional[int] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    project_id: Optional[int]
    assignee: Optional[UserResponse] = None

    class Config:
        orm_mode = True
