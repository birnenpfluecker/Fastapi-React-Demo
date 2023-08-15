import {
  Button,
  Card,
  CardHeader,
  Form,
  Input,
  InputDomRef,
  Label,
  List,
  MessageBox,
  Option,
  Select,
  StandardListItem,
  Ui5CustomEvent,
} from '@ui5/webcomponents-react';
import '@ui5/webcomponents/dist/features/InputElementsFormSupport.js';
import { Project, ProjectCreate } from '../models';
import {
  createProject,
  getDepartments,
  getProject,
  updateProject,
} from '../http';
import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

function ProjectNew() {
  //get id from url
  const { id } = useParams<{ id: string }>();

  // State to hold departments.
  const [departments, setDepartments] = useState([]);

  //state of input fields
  const [projectData, setProject] = useState({
    id: '',
    name: '',
    client: '',
    department_id: '',
  });

  //refs for input fields
  const refs = {
    id: React.createRef<InputDomRef>(),
    name: React.createRef<InputDomRef>(),
    client: React.createRef<InputDomRef>(),
    department_id: React.createRef<InputDomRef>(),
  };

  //preventin the form from submitting on hitting enter, submit is handled by submit button
  function onFormSubmit(e: Ui5CustomEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await getDepartments();
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    }

    async function fetchProject() {
      try {
        const response = await getProject(Number(id));
        const fetchedProject = response.data;
        setProject(fetchedProject);
      } catch (error) {
        console.error('Error fetching the project data:', error);
      }
    }

    // Fetch departments on component load
    fetchDepartments();

    //load project data if we have the id in the url meaning we are in updata
    if (id) {
      fetchProject();
    }
  }, [id]);

  // This is a workaround for the missing tab and Enter key support in the UI5 Input component
  function onKeyDown(e: any, field: string) {
    //prevent select behaviour of spacebar and add space to input
    if (e.key === ' ') {
      e.stopPropagation();
      e.preventDefault();
      setProject((prev) => ({ ...prev, [field]: prev[field] + ' ' }));
    }

    //got to next input with tab or enter
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation(); //otherwise tab skips one input
      console.log('onKeyDown Enter or Tab');

      const fieldsOrder = ['id', 'name', 'client', 'department_id'];
      const currentField = fieldsOrder.find(
        (field) => e.currentTarget === refs[field].current
      );

      if (currentField) {
        const currentPosition = fieldsOrder.indexOf(currentField);
        const nextFieldRef = refs[fieldsOrder[currentPosition + 1]];

        if (nextFieldRef && nextFieldRef.current) {
          nextFieldRef.current.focus();
        }
      }
    }
  }

  // update state of input fields
  const handleInputChange = (e: any, field: string) => {
    const updatedValue = e.target.value;
    setProject((prev) => ({ ...prev, [field]: updatedValue }));
  };

  //create or update project and redirect to overview
  const handleSubmit = async () => {
    try {
      if (id) {
        const project = new Project(
          Number(projectData.id),
          projectData.name,
          projectData.client,
          Number(projectData.department_id)
        );
        await updateProject(Number(id), project);
      } else {
        const project = new ProjectCreate(
          projectData.name,
          projectData.client,
          Number(projectData.department_id)
        );
        await createProject(project);
      }
      window.location.href = '/projects/';
    } catch (error) {
      console.error('Error creating project:', error);
      <MessageBox
        actions={['OK']}
        onAfterOpen={function ka() {}}
        onBeforeClose={function ka() {}}
        onBeforeOpen={function ka() {}}
        onClose={function ka() {}}
        type='Confirm'
      >
        An error occurred during creation of project. Please try again. For
        further assistance please contact your administrator.
      </MessageBox>;
    }
  };

  return (
    <Card
      header={
        <CardHeader
          subtitleText='Please enter all necessary information'
          titleText={!!id ? 'Update project' : 'Create a new project'}
        />
      }
      style={{
        width: '350px',
        margin: 'auto',
        borderRadius: '8rem',
        textalign: 'justify',
      }}
    >
      <Form className='form' id='inputProject' onSubmit={onFormSubmit}>
        <List>
          {id && (
            <StandardListItem className='item'>
              <Label>ID</Label>
              <Input
                className='input'
                type='Text'
                value={projectData.id}
                disabled={true}
              ></Input>
            </StandardListItem>
          )}
          <StandardListItem className='item'>
            <Label required={true}>Name</Label>
            <Input
              ref={refs.name}
              className='input'
              type='Text'
              value={projectData.name}
              onInput={(e) => handleInputChange(e, 'name')}
              onKeyDown={(e) => onKeyDown(e, 'name')}
            />
          </StandardListItem>
          <StandardListItem className='item'>
            <Label required={true}>Client</Label>
            <Input
              ref={refs.client}
              className='input'
              type='Text'
              value={projectData.client}
              onInput={(e) => handleInputChange(e, 'client')}
              onKeyDown={(e) => onKeyDown(e, 'client')}
            />
          </StandardListItem>
          <StandardListItem className='item'>
            <Label required={true}>Department</Label>
            <Select
              value={projectData.department_id}
              onChange={(e) => {
                // Get department_id from the selected option.
                const selectedDeptId = e.detail.selectedOption.dataset.id;
                handleInputChange(
                  { target: { value: selectedDeptId } },
                  'department_id'
                );
              }}
            >
              {departments.map((dept) => (
                <Option key={dept.id} data-id={dept.id}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </StandardListItem>
          <StandardListItem>
            <a href={`/projects/`}>
              <Button className='button' design='Negative'>
                Discard and back to overview
              </Button>
            </a>
            <Button onClick={handleSubmit} className='button' design='Positive'>
              Save
            </Button>
          </StandardListItem>
        </List>
      </Form>
    </Card>
  );
}

export default ProjectNew;
