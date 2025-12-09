from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, projects, tasks

# create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Project Management Tool API")


# # CORS (allow frontend origin in production restrict it)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(projects.router, prefix="/projects", tags=["Projects"])
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])



# Routers
# app.include_router(auth.router, prefix="/auth", tags=["auth"])
