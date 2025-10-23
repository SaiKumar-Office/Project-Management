from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models
from ..database import get_db
from ..dependencies import get_current_user

router = APIRouter()

@router.post("/projects/{project_id}/", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(project_id: int, task_in: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    # only owner, member, or admin can add tasks
    if not (current_user.is_admin or project.owner_id == current_user.id or current_user in project.members):
        raise HTTPException(status_code=403, detail="Not authorized to add tasks")
    # validate assignee if provided
    assignee = None
    if task_in.assignee_id:
        assignee = db.query(models.User).filter(models.User.id == task_in.assignee_id).first()
        if not assignee:
            raise HTTPException(status_code=404, detail="Assignee not found")
    task = models.Task(title=task_in.title, description=task_in.description, status=task_in.status, project=project, assignee=assignee)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.get("/projects/{project_id}/", response_model=List[schemas.TaskResponse])
def list_tasks(project_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if not (current_user.is_admin or project.owner_id == current_user.id or current_user in project.members):
        raise HTTPException(status_code=403, detail="Not authorized to view tasks")
    tasks = db.query(models.Task).filter(models.Task.project_id == project_id).all()
    return tasks

@router.get("/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    project = task.project
    if not (current_user.is_admin or project.owner_id == current_user.id or current_user in project.members):
        raise HTTPException(status_code=403, detail="Not authorized to view task")
    return task

@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_in: schemas.TaskUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    project = task.project
    # only owner, member, assignee, or admin can update
    if not (current_user.is_admin or project.owner_id == current_user.id or current_user in project.members or task.assignee_id == current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to update")
    if task_in.title is not None:
        task.title = task_in.title
    if task_in.description is not None:
        task.description = task_in.description
    if task_in.status is not None:
        task.status = task_in.status
    if task_in.assignee_id is not None:
        if task_in.assignee_id == 0:
            task.assignee = None
        else:
            assignee = db.query(models.User).filter(models.User.id == task_in.assignee_id).first()
            if not assignee:
                raise HTTPException(status_code=404, detail="Assignee not found")
            task.assignee = assignee
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    project = task.project
    # only owner, member, assignee, or admin can delete
    if not (current_user.is_admin or project.owner_id == current_user.id or current_user in project.members or task.assignee_id == current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to delete")
    db.delete(task)
    db.commit()
    return
