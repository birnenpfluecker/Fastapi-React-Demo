import {
  Button,
  Card,
  CardHeader,
  List,
  StandardListItem,
} from '@ui5/webcomponents-react';
import { Project } from '../models';
import { getProject } from '../http';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        if (!id) return;
        const response = await getProject(Number(id));
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching the project data:', error);
      }
    }

    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

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
        <StandardListItem description={project.department_id.toString()}>
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
