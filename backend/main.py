import sys
from typing import List

from fastapi import FastAPI, Depends, HTTPException
from starlette.middleware.cors import CORSMiddleware

from backend import models, crud, schemas
from backend.database import SessionLocal, engine
from backend.import_data import import_data
from backend.schemas import Employee

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

#adding middleware to allow CORS
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""check if db contains data, if not, add some data"""
db_session = SessionLocal()
if not db_session.query(models.Employee).first() and not db_session.query(
        models.Department).first() and not db_session.query(
    models.Project).first():
    import_data()
db_session.close()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}


"""HTTP methods for the employees"""


@app.get("/employees/", response_model=list[schemas.Employee], status_code=200)
def get_employees(skip: int = 0, limit: int = 100, db=Depends(get_db)):
    return crud.get_employees(db, skip=skip, limit=limit)


@app.get("/employees/{user_mail}", response_model=schemas.Employee, status_code=200)
def get_employee(user_mail: str, db=Depends(get_db)) -> schemas.Employee:
    employee = crud.get_employee(db, user_mail=user_mail)
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


@app.post("/employees/", response_model=schemas.Employee, status_code=201)
def create_employee(employee: schemas.Employee, db=Depends(get_db)):
    db_employee = crud.get_employee(db, user_mail=employee.email)
    if db_employee:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_employee(db=db, employee=employee)


@app.put("/employees/{user_mail}", response_model=schemas.Employee, status_code=200)
def update_employee(user_mail: str, employee: schemas.Employee, db=Depends(get_db)):
    db_employee = crud.get_employee(db, user_mail=user_mail)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return crud.update_employee(db=db, mail=user_mail, employee=employee)


@app.delete("/employees/{user_mail}", status_code=204)
def delete_employee(user_mail: str, db=Depends(get_db)):
    db_employee = crud.get_employee(db, user_mail=user_mail)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    crud.delete_employee(db=db, user_mail=user_mail)


"""HTTP methods for the departments"""


@app.get("/departments/", response_model=list[schemas.Department], status_code=200)
def read_departments(skip: int = 0, limit: int = 100, db=Depends(get_db)):
    return crud.get_departments(db, skip=skip, limit=limit)


@app.get("/departments/{department_id}", response_model=schemas.Department, status_code=200)
def get_department(department_id: int, db=Depends(get_db)) -> schemas.Department:
    department = crud.get_department(db, department_id=department_id)
    if department is None:
        raise HTTPException(status_code=404, detail="Department not found")
    return department


@app.post("/departments/", response_model=schemas.Department, status_code=201)
def create_department(department: schemas.DepartmentCreate, db=Depends(get_db)):
    db_department = crud.get_department_by_name(db, department_name=department.name)
    if db_department:
        raise HTTPException(status_code=400, detail="Department already registered")
    return crud.create_department(db=db, department=department)


@app.put("/departments/{department_id}", response_model=schemas.Department, status_code=200)
def update_department(department_id: int, department: schemas.Department, db=Depends(get_db)):
    db_department = crud.get_department(db, department_id=department_id)
    if db_department is None:
        raise HTTPException(status_code=404, detail="Department not found")
    return crud.update_department(db=db, department_id=department_id, department=department)


@app.delete("/departments/{department_id}", status_code=204)
def delete_department(department_id: int, db=Depends(get_db)):
    db_department = crud.get_department(db, department_id=department_id)
    if db_department is None:
        raise HTTPException(status_code=404, detail="Department not found")
    crud.delete_department(db=db, department_id=department_id)


"""HTTP methods for the projects"""


@app.get("/projects/", response_model=list[schemas.Project], status_code=200)
def read_projects(skip: int = 0, limit: int = 100, db=Depends(get_db)):
    return crud.get_projects(db, skip=skip, limit=limit)


@app.get("/projects/{project_id}", response_model=schemas.Project, status_code=200)
def get_project(project_id: int, db=Depends(get_db)) -> schemas.Project:
    project = crud.get_project(db, project_id=project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@app.post("/projects/", response_model=schemas.Project, status_code=201)
def create_project(project: schemas.ProjectCreate, db=Depends(get_db)):
    db_project = crud.get_project_by_name(db, project_name=project.name)
    if db_project:
        raise HTTPException(status_code=400, detail="Project already registered")
    return crud.create_project(db=db, project=project)


@app.put("/projects/{project_id}", response_model=schemas.Project, status_code=200)
def update_project(project_id: int, project: schemas.Project, db=Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return crud.update_project(db=db, project_id=project_id, project=project)


@app.delete("/projects/{project_id}", status_code=204)
def delete_project(project_id: int, db=Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    crud.delete_project(db=db, project_id=project_id)


"""HTTP methods for statistics"""


@app.get("/statistics/average_age_per_department", status_code=200)
def get_average_age_per_department(db=Depends(get_db)) -> list[tuple[str, float]]:
    departments = crud.get_departments(db)
    departments_with_average_age = []
    for department in departments:
        average_age = crud.get_average_age_of_department(db, department_id=department.id)
        departments_with_average_age.append((department.name, average_age))
    return departments_with_average_age


@app.get("/statistics/employees_per_department", status_code=200)
def get_employees_per_department(db=Depends(get_db)) -> list[tuple[str, List[Employee]]]:
    departments = crud.get_departments(db)
    departments_with_employees = []
    for department in departments:
        print(type(department.employees))
        departments_with_employees.append((department.name, department.employees))
    return departments_with_employees


@app.get("/statistics/number_of_projects_per_department", status_code=200)
def get_number_of_projects_per_department(db=Depends(get_db)) -> list[tuple[str, int]]:
    departments = crud.get_departments(db)
    departments_with_number_of_projects = []
    for department in departments:
        number_of_projects = crud.get_number_of_projects_of_department(db, department_id=department.id)
        departments_with_number_of_projects.append((department.name, number_of_projects))
    return departments_with_number_of_projects
