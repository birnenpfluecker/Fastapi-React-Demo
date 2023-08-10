from typing import List

from pydantic import BaseModel

"""This file contains the models for the employees, projects and departments."""


class Employee(BaseModel):
    """Single class, as we assume that the employees always have a email address"""
    email: str
    first_name: str
    last_name: str
    age: int

    class Config:
        from_attributes = True


class Project(BaseModel):
    """Model for the projects which consists of the following fields:
    - id: int
    - name: str
    - client: str
    - department: Department"""
    id: int
    name: str
    client: str

    class Config:
        from_attributes = True


class DepartmentBase(BaseModel):
    name: str
    employees: List[Employee]|None
    projects: List[Project]|None

    class Config:
        from_attributes = True


class DepartmentCreate(DepartmentBase):
    # not necessary, could also use DepartmentBase, but this way it is more explicit
    pass


class Department(DepartmentBase):
    id: int
