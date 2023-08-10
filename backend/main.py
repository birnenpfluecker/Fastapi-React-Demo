import sys

from fastapi import FastAPI, Depends, HTTPException

from backend import models, crud, schemas
from backend.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)
print(sys.path)
app = FastAPI()


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


@app.get("/employees/", response_model=list[schemas.Employee])
def get_employees(skip: int = 0, limit: int = 100, db=Depends(get_db)):
    return crud.get_employees(db, skip=skip, limit=limit)


@app.get("/employees/{user_mail}", response_model=schemas.Employee)
def get_employee(user_mail: str, db=Depends(get_db)) -> schemas.Employee:
    employee = crud.get_employee(db, user_mail=user_mail)
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


@app.post("/employees/", response_model=schemas.Employee)
def create_employee(employee: schemas.Employee, db=Depends(get_db)):
    db_employee = crud.get_employee(db, user_mail=employee.email)
    if db_employee:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_employee(db=db, employee=employee)


@app.get("/departments/", response_model=list[schemas.Department])
def read_departments(skip: int = 0, limit: int = 100, db=Depends(get_db)):
    return crud.get_departments(db, skip=skip, limit=limit)


@app.get("/departments/{department_id}", response_model=schemas.Department)
def get_department(department_id: int, db=Depends(get_db)) -> schemas.Department:
    department = crud.get_department(db, department_id=department_id)
    if department is None:
        raise HTTPException(status_code=404, detail="Department not found")
    return department


@app.post("/departments/", response_model=schemas.Department)
def create_department(department: schemas.DepartmentCreate, db=Depends(get_db)):
    db_department = crud.get_department_by_name(db, department_name=department.name)
    if db_department:
        raise HTTPException(status_code=400, detail="Department already registered")
    return crud.create_department(db=db, department=department)
