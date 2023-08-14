import { Project } from '../models';

type ProjectLabelProps = {
  projects: Project[];
};

const ProjectLabel: React.FC<ProjectLabelProps> = ({ projects }) => {
  return (
    <>
      {projects.map((project, index) => (
        <span key={index}>
          {project.toString()}
          <br />
        </span>
      ))}
    </>
  );
};

export default ProjectLabel;
