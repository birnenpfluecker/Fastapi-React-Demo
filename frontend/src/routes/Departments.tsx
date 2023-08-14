import {
  Button,
  Label,
  Table,
  TableCell,
  TableColumn,
  TableRow,
} from '@ui5/webcomponents-react';

import { Department, Employee, Project, RawDepartment } from '../models';
import { getDepartments } from '../http';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import ProjectLabel from '../utils/ProjectLabel';
import EmployeeLabel from '../utils/EmployeeLabel';

const rows = (data: Array<Department>) => {
  return data.map((department, index) => (
    <TableRow key={`${index}-row`}>
      <TableCell>
        <Label>{department.id}</Label>
      </TableCell>
      <TableCell>
        <Label>{department.name}</Label>
      </TableCell>
      <TableCell>
        <Label style={{ whiteSpace: 'pre-line' }}>
          <EmployeeLabel employees={department.employees} />
        </Label>
      </TableCell>
      <TableCell>
        <Label>
          <ProjectLabel projects={department.projects} />
        </Label>
      </TableCell>
      <TableCell>
        <a href={`/departments/${department.id}/`}>
          <Button>details</Button>
        </a>
      </TableCell>
    </TableRow>
  ));
};

function DepartmentTable() {
  const [data, setData] = useState<Array<Department>>([]);

  // Function to fetch the data from the API and set it in the state
  const fetchData = async () => {
    console.log('fetchData');
    try {
      const response: AxiosResponse<RawDepartment[]> = await getDepartments();
      const rawDepartments: RawDepartment[] = response.data;
      const departments: Department[] = rawDepartments.map((dept) => {
        const employees: Employee[] = dept.employees.map(
          (emp) =>
            new Employee(
              emp.email,
              emp.first_name,
              emp.last_name,
              emp.age,
              emp.department_id
            )
        );

        const projects: Project[] = dept.projects.map(
          (proj) =>
            new Project(proj.id, proj.name, proj.client, proj.department_id)
        );

        return new Department(dept.id, dept.name, employees, projects);
      });

      setData(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  //function to redirect to new department
  const openNew = () => {
    window.location.href = '/departments/new/';
  };
  // Use effect to make the API call when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ overflow: 'auto' }}>
      <Table
        className='table'
        columns={
          <>
            <TableColumn>
              <Label>Id</Label>
            </TableColumn>
            <TableColumn>
              <Label>Name</Label>
            </TableColumn>
            <TableColumn>
              <Label>Employees</Label>
            </TableColumn>
            <TableColumn>
              <Label>Projects</Label>
            </TableColumn>
            <Button design='Positive' onClick={openNew}>
              New
            </Button>
            <TableColumn />
          </>
        }
      >
        {rows(data)}
      </Table>
    </div>
  );
}

export default DepartmentTable;
