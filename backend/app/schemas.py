from datetime import datetime
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
    # member_ids: Optional[List[int]] = []  # Add members while creating project

class ProjectResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    owner_id: int
    # members: List[int] = []

    class Config:
        orm_mode = True

# Task Schemas
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "Todo"
    due_date: Optional[datetime] = None
    priority: Optional[str] = "Medium"
    assignee_id: Optional[int] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    due_date: Optional[datetime]
    priority: str
    project_id: int
    assignee_id: Optional[int]
    status_history: List[dict] = []
    comments: List[dict] = []

    class Config:
        orm_mode = True

# Task Comments
class TaskCommentCreate(BaseModel):
    comment: str

class TaskCommentResponse(BaseModel):
    id: int
    task_id: int
    user_id: int
    comment: str
    timestamp: datetime

    class Config:
        orm_mode = True
