import {
  Button,
  Label,
  Table,
  TableCell,
  TableColumn,
  TableRow,
} from '@ui5/webcomponents-react';

import { Employee } from '../models';
import { getEmployees } from '../http';
import { useEffect, useState } from 'react';

const rows = (data: Array<Employee>) => {
  return data.map((employee, index) => (
    <TableRow key={`${index}-row`}>
      <TableCell>
        <Label>{employee.email}</Label>
      </TableCell>
      <TableCell>
        <Label>{employee.last_name}</Label>
      </TableCell>
      <TableCell>
        <Label>{employee.first_name}</Label>
      </TableCell>
      <TableCell>
        <Label>{employee.age}</Label>
      </TableCell>
      <TableCell>
        <Label>{employee.department_id}</Label>
      </TableCell>
      <TableCell>
        <a href={`/employees/${employee.email}/`}>
          <Button>details</Button>
        </a>
      </TableCell>
    </TableRow>
  ));
};

function EmployeeTable() {
  const [data, setData] = useState<Array<Employee>>([]);

  // Function to fetch the data from the API and set it in the state
  const fetchData = async () => {
    console.log('fetchData');
    try {
      const response = await getEmployees();
      setData(response.data); // Assuming the data is directly in the response object
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  //function to redirect to new employee
  const openNew = () => {
    window.location.href = '/employees/new/';
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
              <Label>E-Mail</Label>
            </TableColumn>
            <TableColumn>
              <Label>Lastname</Label>
            </TableColumn>
            <TableColumn>
              <Label>Firstname</Label>
            </TableColumn>
            <TableColumn>
              <Label>Age</Label>
            </TableColumn>
            <TableColumn>
              <Label>Department</Label>
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

export default EmployeeTable;
