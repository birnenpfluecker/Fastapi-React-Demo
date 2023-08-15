import {
  Button,
  Card,
  CardHeader,
  List,
  StandardListItem,
} from '@ui5/webcomponents-react';
import { Department, Employee } from '../models';
import { getDepartments, getEmployee } from '../http';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EmployeeDetail() {
  // url param
  const { email } = useParams<{ email: string }>();
  //State of employee
  const [employee, setEmployee] = useState<Employee | null>(null);
  //State of departments
  const [departments, setDepartments] = useState<Array<Department>>([]);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        if (!email) return;
        var response = await getEmployee(email);
        setEmployee(response.data);
        response = await getDepartments();
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching the employee data:', error);
      }
    }

    fetchEmployee();
  }, [email]);

  if (!employee) return <div>Loading...</div>;

  //function to get department name from id
  const getDepartmentName = (departmentId: number) => {
    const department = departments.find((dep) => dep.id === departmentId);
    return department ? department.name : 'Unknown Department';
  };

  return (
    <Card
      header={
        <CardHeader
          subtitleText='All about this employee'
          titleText={employee.first_name + ' ' + employee.last_name}
        />
      }
      style={{
        width: '300px',
        margin: 'auto',
        borderRadius: '8rem',
        textAlign: 'left',
      }}
    >
      <List>
        <StandardListItem description={employee.email}>E-Mail</StandardListItem>
        <StandardListItem description={employee.first_name}>
          First Name
        </StandardListItem>
        <StandardListItem description={employee.last_name}>
          Last Name
        </StandardListItem>
        <StandardListItem description={employee.age.toString()}>
          Age
        </StandardListItem>
        <StandardListItem
          description={getDepartmentName(employee.department_id)}
        >
          Department
        </StandardListItem>
        <StandardListItem>
          <a href={`/employees/`}>
            <Button>Back to overview</Button>
          </a>
        </StandardListItem>
      </List>
    </Card>
  );
}

export default EmployeeDetail;
