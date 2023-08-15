import {
  Bar,
  Button,
  Dialog,
  Label,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  Title,
} from '@ui5/webcomponents-react';

import { Department, Project } from '../models';
import { deleteProject, getDepartments, getProjects } from '../http';
import { useEffect, useState } from 'react';

function ProjectTable() {
  // State to store the data from the API
  const [data, setData] = useState<Array<Project>>([]);
  //State of departments
  const [departments, setDepartments] = useState<Array<Department>>([]);
  // State for delete confirmation
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  // State for dialog
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  // Function to prompt the user to confirm the deletion
  const promptDelete = (id: number) => {
    setIdToDelete(id);
    setDialogOpen(true);
  };

  // Handle the click event
  const handleDelete = async (id: number) => {
    await deleteProject(id);
    window.location.reload();
  };

  // Function to fetch the data from the API and set it in the state
  const fetchData = async () => {
    console.log('fetchData');
    try {
      var response = await getProjects();
      setData(response.data);
      response = await getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  //function to get department name from id
  const getDepartmentName = (departmentId: number) => {
    const department = departments.find((dep) => dep.id === departmentId);
    return department ? department.name : 'Unknown Department';
  };

  //function to redirect to new employee
  const openNew = () => {
    window.location.href = '/projects/new/';
  };

  // Use effect to make the API call when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  //build table rows
  const rows = (data: Array<Project>) => {
    return data.map((project, index) => (
      <TableRow key={`${index}-row`}>
        <TableCell>
          <Label>{project.id}</Label>
        </TableCell>
        <TableCell>
          <Label>{project.name}</Label>
        </TableCell>
        <TableCell>
          <Label>{project.client}</Label>
        </TableCell>
        <TableCell>
          <Label>{getDepartmentName(project.department_id)}</Label>
        </TableCell>
        <TableCell>
          <a href={`/projects/${project.id}/`}>
            <Button>details</Button>
          </a>
        </TableCell>
        <TableCell>
          <a href={`/projects/${project.id}/update/`}>
            <Button>Edit</Button>
          </a>
        </TableCell>
        <TableCell>
          <Button design='Negative' onClick={() => promptDelete(project.id)}>
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
                    onClick={() => handleDelete(idToDelete!)}
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
      <Title level='H1'>Projects</Title>
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
              <Label>Client</Label>
            </TableColumn>
            <TableColumn>
              <Label>Department</Label>
            </TableColumn>
            <TableColumn />
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

export default ProjectTable;
