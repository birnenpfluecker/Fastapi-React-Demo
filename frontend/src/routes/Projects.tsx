import {
  Button,
  Label,
  Table,
  TableCell,
  TableColumn,
  TableRow,
} from '@ui5/webcomponents-react';

import { Project } from '../models';
import { getProjects } from '../http';
import { useEffect, useState } from 'react';

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
        <Label>{project.department_id}</Label>
      </TableCell>
      <TableCell>
        <a href={`/projects/${project.id}/`}>
          <Button>details</Button>
        </a>
      </TableCell>
    </TableRow>
  ));
};

function ProjectTable() {
  const [data, setData] = useState<Array<Project>>([]);

  // Function to fetch the data from the API and set it in the state
  const fetchData = async () => {
    console.log('fetchData');
    try {
      const response = await getProjects();
      setData(response.data); // Assuming the data is directly in the response object
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  //function to redirect to new employee
  const openNew = () => {
    window.location.href = '/projects/new/';
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
              <Label>Client</Label>
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

export default ProjectTable;
