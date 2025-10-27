from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app import models, schemas
from app.dependencies import get_current_user

router = APIRouter()

# Create Task with enhanced fields
@router.post("/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, project_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Only owner/admin or project member can add
    if current_user.id not in [u.id for u in project.members] and project.owner_id != current_user.id and current_user.role not in ["admin", "superadmin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_task = models.Task(
        title=task.title,
        description=task.description,
        status=task.status,
        due_date=task.due_date,
        priority=task.priority,
        assignee_id=task.assignee_id,
        project_id=project_id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task



# Get All Tasks for a Project
@router.get("/alltasks/{project_id}", response_model=List[schemas.TaskResponse])
def get_tasks(project_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    tasks = db.query(models.Task).filter(models.Task.project_id == project_id).all()
    return tasks

# Update Task with status history
@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    project = db.query(models.Project).filter(models.Project.id == db_task.project_id).first()
    
    if current_user.id not in [db_task.assignee_id] + [u.id for u in project.members] and project.owner_id != current_user.id and current_user.role not in ["admin", "superadmin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Save status history if status changes
    if task.status != db_task.status:
        from app.models import TaskStatusHistory
        status_record = TaskStatusHistory(
            task_id=db_task.id,
            old_status=db_task.status,
            new_status=task.status,
            changed_by=current_user.id
        )
        db.add(status_record)
        db_task.status = task.status
    
    db_task.title = task.title
    db_task.description = task.description
    db_task.due_date = task.due_date
    db_task.priority = task.priority
    db_task.assignee_id = task.assignee_id
    
    db.commit()
    db.refresh(db_task)
    return db_task

# Delete Task
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    project = db.query(models.Project).filter(models.Project.id == db_task.project_id).first()
    if db_task.assignee_id != current_user.id and project.owner_id != current_user.id and current_user.role not in ["admin", "superadmin"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")
    
    db.delete(db_task)
    db.commit()
    return {"detail": "Task deleted successfully"}

# Filter tasks
@router.get("/filter", response_model=List[schemas.TaskResponse])
def filter_tasks(project_id: int, status: Optional[str] = None, assignee_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(models.Task).filter(models.Task.project_id == project_id)
    
    if status:
        query = query.filter(models.Task.status == status)
    if assignee_id:
        query = query.filter(models.Task.assignee_id == assignee_id)
    return query.all()

# Add comment
@router.post("/{task_id}/comments", response_model=schemas.TaskCommentResponse)
def add_comment(task_id: int, comment: schemas.TaskCommentCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    new_comment = models.TaskComment(
        task_id=task_id,
        user_id=current_user.id,
        comment=comment.comment
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

# Get comments for a task
@router.get("/{task_id}/comments", response_model=List[schemas.TaskCommentResponse])
def get_comments(task_id: int, db: Session = Depends(get_db)):
    return db.query(models.TaskComment).filter(models.TaskComment.task_id == task_id).all()
