import csv
import logging

from backend.crud import get_department_by_name
from backend.database import SessionLocal
from backend.models import Department, Employee, Project


def import_data():
    """
    Import data from CSV files into the database.
    """
    # Create a database session
    db = SessionLocal()
    # Import the departments
    with open('backend/data_files/departments.csv', 'r') as file:
        reader = csv.DictReader(file, delimiter=';')
        for row in reader:
            department = Department(id=row['id'],
                                    name=row['name'])
            db.add(department)
            db.commit()
    # Import the employees
    with open('backend/data_files/employees.csv', 'r') as file:
        reader = csv.DictReader(file, delimiter=';')
        for row in reader:
            department = get_department_by_name(db, row['department'])
            employee = Employee(email=row['email'],
                                first_name=row['firstname'],
                                last_name=row['lastname'],
                                age=row['age'],
                                department_id=department.id)
            db.add(employee)
            db.commit()
    # Import the projects
    with open('backend/data_files/projects.csv', 'r') as file:
        reader = csv.DictReader(file, delimiter=';')
        for row in reader:
            department = get_department_by_name(db, row['department'])
            project = Project(id=row['id'],
                              name=row['name'],
                              client=row['client'],
                              department_id=department.id)
            db.add(project)
            db.commit()
