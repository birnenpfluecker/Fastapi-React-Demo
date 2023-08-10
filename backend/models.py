from typing import List

from pydantic import BaseModel

"""This file contains the models for the employees, projects and departments."""


class Employee(BaseModel):
    """Model for the employees which consists of the following fields:
    - email: str
    - first_name: str
    - last_name: str
    - age: int
    - department: Department"""
    email: str
    first_name: str
    last_name: str
    age: int


class Project:
    """Model for the projects which consists of the following fields:
    - id: int
    - name: str
    - client: str
    - department: Department"""
    id: int
    name: str
    client: str


class Department(BaseModel):
    """Model for the departments which consists of the following fields:
    - id: int
    - name: str
    - employees: List[Employee]
    - projects: List[Project]"""
    id: int
    name: str
    employees: List[Employee]
    projects: List[Project]
