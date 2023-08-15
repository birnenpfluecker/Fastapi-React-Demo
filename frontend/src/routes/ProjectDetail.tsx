import {
  Button,
  Card,
  CardHeader,
  List,
  StandardListItem,
} from '@ui5/webcomponents-react';
import { Department, Project } from '../models';
import { getDepartments, getProject } from '../http';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProjectDetail() {
  //url param
  const { id } = useParams<{ id: string }>();
  //proejct data
  const [project, setProject] = useState<Project | null>(null);
  //State of departments
  const [departments, setDepartments] = useState<Array<Department>>([]);

  useEffect(() => {
    async function fetchProject() {
      try {
        if (!id) return;
        var response = await getProject(Number(id));
        setProject(response.data);
        response = await getDepartments();
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching the project data:', error);
      }
    }

    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  //function to get department name from id
  const getDepartmentName = (departmentId: number) => {
    const department = departments.find((dep) => dep.id === departmentId);
    return department ? department.name : 'Unknown Department';
  };

  return (
    <Card
      header={
        <CardHeader
          subtitleText='All about this project'
          titleText={project.name}
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
        <StandardListItem description={project.id.toString()}>
          Id
        </StandardListItem>
        <StandardListItem description={project.name}>
          First Name
        </StandardListItem>
        <StandardListItem description={project.client}>
          Last Name
        </StandardListItem>
        <StandardListItem
          description={getDepartmentName(project.department_id)}
        >
          Department
        </StandardListItem>
        <StandardListItem>
          <a href={`/projects/`}>
            <Button>Back to overview</Button>
          </a>
        </StandardListItem>
      </List>
    </Card>
  );
}

export default ProjectDetail;
