from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models
from ..database import get_db
from ..dependencies import get_current_user, require_admin

router = APIRouter()

@router.post("/", response_model=schemas.ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project_in: schemas.ProjectCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    project = models.Project(title=project_in.title, description=project_in.description, owner_id=current_user.id)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.get("/", response_model=List[schemas.ProjectResponse])
def list_projects(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # returns projects where user is owner or member; admins see all
    if current_user.is_admin:
        projects = db.query(models.Project).all()
    else:
        # owner OR member
        projects = db.query(models.Project).filter(
            (models.Project.owner_id == current_user.id) |
            (models.Project.members.any(models.User.id == current_user.id))
        ).all()
    return projects

@router.get("/{project_id}", response_model=schemas.ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    # access control: owner or member or admin
    if not (current_user.is_admin or project.owner_id == current_user.id or current_user in project.members):
        raise HTTPException(status_code=403, detail="Not authorized to view this project")
    return project

@router.put("/{project_id}", response_model=schemas.ProjectResponse)
def update_project(project_id: int, project_in: schemas.ProjectUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if not (current_user.is_admin or project.owner_id == current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to update")
    if project_in.title is not None:
        project.title = project_in.title
    if project_in.description is not None:
        project.description = project_in.description
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if not (current_user.is_admin or project.owner_id == current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to delete")
    db.delete(project)
    db.commit()
    return

# Add a member to project
@router.post("/{project_id}/members/{user_id}", response_model=schemas.ProjectResponse)
def add_member(project_id: int, user_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if not (current_user.is_admin or project.owner_id == current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to add members")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user in project.members:
        return project
    project.members.append(user)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

# Remove member
@router.delete("/{project_id}/members/{user_id}", response_model=schemas.ProjectResponse)
def remove_member(project_id: int, user_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if not (current_user.is_admin or project.owner_id == current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to remove members")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user in project.members:
        project.members.remove(user)
        db.add(project)
        db.commit()
        db.refresh(project)
    return project
