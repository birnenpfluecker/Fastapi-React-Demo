from sqlalchemy import Column, String, Integer, ForeignKey

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
