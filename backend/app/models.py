from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

# Many-to-many: Project members
project_members = Table(
    "project_members",
    Base.metadata,
    Column("project_id", Integer, ForeignKey("projects.id")),
    Column("user_id", Integer, ForeignKey("users.id"))
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user")
    
    projects = relationship("Project", back_populates="owner")
    tasks = relationship("Task", back_populates="assignee")
    member_projects = relationship("Project", secondary=project_members, back_populates="members")

class BlacklistedToken(Base):
    __tablename__ = "blacklisted_tokens"
    
    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, nullable=False, unique=True)
    expires_at = Column(Integer, nullable=False)  # store as timestamp



class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="projects")
    members = relationship("User", secondary=project_members, back_populates="member_projects")
    tasks = relationship("Task", back_populates="project")

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="Todo")  # Todo, In Progress, Done
    due_date = Column(DateTime, nullable=True)
    priority = Column(String, default="Medium")  # Low, Medium, High
    project_id = Column(Integer, ForeignKey("projects.id"))
    assignee_id = Column(Integer, ForeignKey("users.id"))
    
    project = relationship("Project", back_populates="tasks")
    assignee = relationship("User", back_populates="tasks")
    status_history = relationship("TaskStatusHistory", back_populates="task")
    comments = relationship("TaskComment", back_populates="task")

class TaskStatusHistory(Base):
    __tablename__ = "task_status_history"
    
    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    old_status = Column(String)
    new_status = Column(String)
    changed_by = Column(Integer, ForeignKey("users.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    task = relationship("Task", back_populates="status_history")

class TaskComment(Base):
    __tablename__ = "task_comments"
    
    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    comment = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    task = relationship("Task", back_populates="comments")
