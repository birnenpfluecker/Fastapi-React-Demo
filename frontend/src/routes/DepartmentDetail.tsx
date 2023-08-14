import {
  Button,
  Card,
  CardHeader,
  List,
  StandardListItem,
} from '@ui5/webcomponents-react';
import { Department, Employee, Project, RawDepartment } from '../models';
import { getDepartment } from '../http';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import EmployeeLabel from '../utils/EmployeeLabel';
import ProjectLabel from '../utils/ProjectLabel';

function DepartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    async function fetchDepartment() {
      try {
        if (!id) return;
        const response: AxiosResponse<RawDepartment> = await getDepartment(
          Number(id)
        );
        const rawDepartment: RawDepartment = response.data;

        const employees: Employee[] = rawDepartment.employees.map(
          (emp) =>
            new Employee(
              emp.email,
              emp.first_name,
              emp.last_name,
              emp.age,
              emp.department_id
            )
        );

        const projects: Project[] = rawDepartment.projects.map(
          (proj) =>
            new Project(proj.id, proj.name, proj.client, proj.department_id)
        );

        const department = new Department(
          rawDepartment.id,
          rawDepartment.name,
          employees,
          projects
        );

        setDepartment(department);
      } catch (error) {
        console.error('Error fetching the department data:', error);
      }
    }

    fetchDepartment();
  }, [id]);

  if (!department) return <div>Loading...</div>;

  return (
    <Card
      header={
        <CardHeader
          subtitleText='All about this department'
          titleText={department.name}
        />
      }
      style={{
        width: '300px',
        height: '600px',
        margin: 'auto',
        borderRadius: '8rem',
        textAlign: 'left',
      }}
    >
      <List>
        <StandardListItem description={department.id.toString()}>
          Id
        </StandardListItem>
        <StandardListItem description={department.name}>Name</StandardListItem>
        <StandardListItem style={{ height: 'auto' }}>
          Employees <br />
          <EmployeeLabel employees={department.employees} />
        </StandardListItem>
        <StandardListItem style={{ height: 'auto' }}>
          Projects <br />
          <ProjectLabel projects={department.projects} />
        </StandardListItem>
        <StandardListItem>
          <a href={`/departments/`}>
            <Button>Back to overview</Button>
          </a>
        </StandardListItem>
      </List>
    </Card>
  );
}

export default DepartmentDetail;
