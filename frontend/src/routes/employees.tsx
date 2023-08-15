import {
  Bar,
  Button,
  ButtonDomRef,
  Dialog,
  Label,
  Table,
  TableCell,
  TableColumn,
  TableRow,
} from '@ui5/webcomponents-react';

import { Employee } from '../models';
import { deleteEmployee, getEmployees } from '../http';
import { MouseEventHandler, useEffect, useState } from 'react';

function EmployeeTable() {
  // State to store the data from the API
  const [data, setData] = useState<Array<Employee>>([]);
  // state for delete confirmation
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);
  // state for dialog
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  // Function to prompt the user to confirm the deletion
  const promptDelete = (email: string) => {
    setEmailToDelete(email);
    setDialogOpen(true);
  };

  // Handle the click event
  const handleDelete = async (employeeMail: string) => {
    await deleteEmployee(employeeMail);
    window.location.reload();
  };

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

  //build table rows
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
            <Button>Details</Button>
          </a>
        </TableCell>
        <TableCell>
          <Button
            design='Negative'
            onClick={() => promptDelete(employee.email)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div style={{ overflow: 'auto' }}>
      {isDialogOpen && (
        <Dialog
          headerText='Confirm Delete'
          open={isDialogOpen}
          footer={
            <Bar
              endContent={
                <>
                  <Button
                    design='Emphasized'
                    onClick={() => handleDelete(emailToDelete!)}
                  >
                    Delete
                  </Button>
                  <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                </>
              }
            />
          }
        >
          Are you sure you want to delete this employee?
        </Dialog>
      )}
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
            <TableColumn>
              Actions&emsp;
              <Button design='Positive' onClick={openNew}>
                New
              </Button>
            </TableColumn>
          </>
        }
      >
        {rows(data)}
      </Table>
    </div>
  );
}

export default EmployeeTable;
