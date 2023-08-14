import {
  Button,
  Card,
  CardHeader,
  List,
  StandardListItem,
} from '@ui5/webcomponents-react';
import { Employee } from '../models';
import { getEmployee } from '../http';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EmployeeDetail() {
  const { email } = useParams<{ email: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        if (!email) return;
        const response = await getEmployee(email);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching the employee data:', error);
      }
    }

    fetchEmployee();
  }, [email]);

  if (!employee) return <div>Loading...</div>;

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
        <StandardListItem description={employee.department_id.toString()}>
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
