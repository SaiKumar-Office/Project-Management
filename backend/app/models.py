# from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text
# from sqlalchemy.orm import relationship
# from .database import Base

# class User(Base):
#     __tablename__ = "users"
    
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, nullable=False)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String, nullable=False)
#     is_admin = Column(Boolean, default=False)
    
#     projects = relationship("Project", back_populates="owner")
#     tasks = relationship("Task", back_populates="assignee")

# class Project(Base):
#     __tablename__ = "projects"
    
#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String, nullable=False)
#     description = Column(Text)
#     owner_id = Column(Integer, ForeignKey("users.id"))
    
#     owner = relationship("User", back_populates="projects")
#     tasks = relationship("Task", back_populates="project")

# class Task(Base):
#     __tablename__ = "tasks"
    
#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String, nullable=False)
#     description = Column(Text)
#     status = Column(String, default="Todo")  # Todo, In Progress, Done
#     project_id = Column(Integer, ForeignKey("projects.id"))
#     assignee_id = Column(Integer, ForeignKey("users.id"))
    
#     project = relationship("Project", back_populates="tasks")
#     assignee = relationship("User", back_populates="tasks")
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text, Table
from sqlalchemy.orm import relationship
from .database import Base

# association table for many-to-many between projects and users (members)
project_members = Table(
    "project_members",
    Base.metadata,
    Column("project_id", Integer, ForeignKey("projects.id"), primary_key=True),
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)
    
    projects_owned = relationship("Project", back_populates="owner")
    tasks = relationship("Task", back_populates="assignee")
    member_of = relationship("Project", secondary=project_members, back_populates="members")


class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="projects_owned")
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")
    members = relationship("User", secondary=project_members, back_populates="member_of")


class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="Todo")  # Todo, In Progress, Done
    project_id = Column(Integer, ForeignKey("projects.id"))
    assignee_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    project = relationship("Project", back_populates="tasks")
    assignee = relationship("User", back_populates="tasks")
