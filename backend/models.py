from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from backend.database import Base

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

    department = relationship("Department", back_populates="employees")


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

    department = relationship("Department", back_populates="projects")


class Department(Base):
    """Model for the departments which consists of the following fields:
    - id: int
    - name: str
    - employees: List[Employee]
    - projects: List[Project]"""
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    employees = relationship("Employee", back_populates="department", cascade="all, delete")
    projects = relationship("Project", back_populates="department", cascade="all, delete")
