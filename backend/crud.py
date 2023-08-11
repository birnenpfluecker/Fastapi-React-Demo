from typing import List

from sqlalchemy.orm import Session

from backend import schemas
from backend.models import Employee, Department, Project

"""CRUD operations for the employees"""


def create_employee(db: Session, employee: schemas.Employee) -> Employee:
    db_employee = Employee(email=employee.email,
                           first_name=employee.first_name,
                           last_name=employee.last_name,
                           age=employee.age,
                           department_id=employee.department_id)
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def get_employee(db: Session, user_mail: str) -> Employee:
    return db.query(Employee).filter(Employee.email == user_mail).first()


def get_employees(db: Session, skip: int = 0, limit: int = 100) -> List[Employee]:
    return db.query(Employee).offset(skip).limit(limit).all()


def update_employee(db: Session, mail: str, employee: schemas.Employee) -> Employee:
    db_employee = db.query(Employee).filter(Employee.email == mail).first()
    db_employee.email = employee.email
    db_employee.first_name = employee.first_name
    db_employee.last_name = employee.last_name
    db_employee.age = employee.age
    db_employee.department_id = employee.department_id
    db.commit()
    db.refresh(db_employee)
    return db_employee


def delete_employee(db: Session, user_mail: str) -> None:
    db_employee = db.query(Employee).filter(Employee.email == user_mail).first()
    db.delete(db_employee)
    db.commit()


"""Crud operations for the departments"""


def create_department(db: Session, department: schemas.DepartmentCreate) -> Department:
    db_department = Department(name=department.name, employees=department.employees, projects=department.projects)
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department


def get_department(db: Session, department_id: int) -> Department:
    return db.query(Department).filter(Department.id == department_id).first()


def get_department_by_name(db: Session, department_name: str) -> Department:
    return db.query(Department).filter(Department.name == department_name).first()


def get_departments(db: Session, skip: int = 0, limit: int = 100) -> List[Department]:
    return db.query(Department).offset(skip).limit(limit).all()


def update_department(db: Session, department_id: int, department: schemas.Department) -> Department:
    print(str(department) + "\n" + str(department_id) + "\n")
    db_department = db.query(Department).filter(Department.id == department_id).first()
    print('got right department')
    db_department.name = department.name
    print('updated name')
    db_department.employees = department.employees
    print('updated employees')
    db_department.projects = department.projects
    print('updated projects')
    db.commit()
    print('committed')
    db.refresh(db_department)
    print('refreshed')
    return db_department


def delete_department(db: Session, department_id: int) -> None:
    db_department = db.query(Department).filter(Department.id == department_id).first()
    db.delete(db_department)
    db.commit()


"""Crud operations for the projects"""


def create_project(db: Session, project: schemas.ProjectCreate) -> Project:
    db_project = Project(name=project.name,
                         client=project.client,
                         department_id=project.department_id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def get_project(db: Session, project_id: int) -> Project:
    return db.query(Project).filter(Project.id == project_id).first()


def get_projects(db: Session, skip: int = 0, limit: int = 100) -> List[Project]:
    return db.query(Project).offset(skip).limit(limit).all()


def update_project(db: Session, project_id: int, project: schemas.Project) -> Project:
    db_project = db.query(Project).filter(Project.id == project_id).first()
    db_project.name = project.name
    db_project.client = project.client
    db_project.department_id = project.department_id
    db.commit()
    db.refresh(db_project)
    return db_project


def delete_project(db: Session, project_id: int) -> None:
    db_project = db.query(Project).filter(Project.id == project_id).first()
    db.delete(db_project)
    db.commit()
