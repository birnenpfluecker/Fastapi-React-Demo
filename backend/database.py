from typing import List

from sqlalchemy.orm import Session

from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from backend import models

"""Create a SQLAlchemy engine and sessionmaker."""
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

"""Database models for the employees, projects and departments."""


class Employee(Base):
    """Model for the employees which consists of the following fields:
    - email: str
    - first_name: str
    - last_name: str
    - age: int
    - department: Department"""
    __tablename__ = "employees"
    email = Column(String, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    age = Column(Integer)
    department_id = Column(Integer, ForeignKey("departments.id"))


class Project(Base):
    """Model for the projects which consists of the following fields:
    - id: int
    - name: str
    - client: str
    - department: Department"""
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    client = Column(String)
    department_id = Column(Integer, ForeignKey("departments.id"))


class Department(Base):
    """Model for the departments which consists of the following fields:
    - id: int
    - name: str
    - employees: List[Employee]
    - projects: List[Project]"""
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    employees = Column(String, ForeignKey("employees.email"))
    projects = Column(Integer, ForeignKey("projects.id"))


"""CRUD operations for the employees"""


def create_employee(db: Session, employee: models.Employee) -> Employee:
    db_employee = models.Employee(email=employee.email,
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


def update_employee(db: Session, mail: str, employee: models.Employee) -> Employee:
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
