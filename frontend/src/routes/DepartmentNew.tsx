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
  StandardListItem,
  Ui5CustomEvent,
} from '@ui5/webcomponents-react';
import '@ui5/webcomponents/dist/features/InputElementsFormSupport.js';
import { DepartmentCreate } from '../models';
import { createDepartment } from '../http';
import { useState } from 'react';
import React from 'react';

function DepartmentNew() {
  //state of input fields
  const [departmentData, setDepartment] = useState({
    name: '',
  });

  //refs for input fields
  const refs = {
    name: React.createRef<InputDomRef>(),
  };

  //preventin the form from submitting on hitting enter, submit is handled by submit button
  function onFormSubmit(e: Ui5CustomEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  // This is a workaround for the missing tab and Enter key support in the UI5 Input component
  function onKeyDown(e: any, field: string) {
    //prevent select behavio of spacebar
    if (e.key === ' ') {
      console.log('onKeyDown spacebar');
      // Check for spacebar key
      e.stopPropagation();
      e.preventDefault();
      setDepartment((prev) => ({ ...prev, [field]: prev[field] + ' ' }));
    }
    //got to next input with tab or enter
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation(); //otherwise tab skips one input

      const fieldsOrder = ['name'];
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

  //update state of input fields
  const handleInputChange = (e: any, field: string) => {
    const updatedValue = e.target.value;
    setDepartment((prev) => ({ ...prev, [field]: updatedValue }));
  };

  //create department and redirect to overview
  const handleSubmit = async () => {
    console.log('handleSubmit');

    try {
      const department = new DepartmentCreate(departmentData.name);
      await createDepartment(department);
      window.location.href = '/departments/';
    } catch (error) {
      console.error('Error creating department:', error);
      <MessageBox
        actions={['OK']}
        onAfterOpen={function ka() {}}
        onBeforeClose={function ka() {}}
        onBeforeOpen={function ka() {}}
        onClose={function ka() {}}
        type='Confirm'
      >
        Following error occurred during creation of department. Please try
        again. For further assistance please contact your administrator.
      </MessageBox>;
    }
  };

  return (
    <Card
      header={
        <CardHeader
          subtitleText='Please enter all necessary information'
          titleText='Create a new department'
        />
      }
      style={{
        width: '350px',
        margin: 'auto',
        borderRadius: '8rem',
        textAlign: 'justify',
      }}
    >
      <Form className='form' id='inputDepartment' onSubmit={onFormSubmit}>
        <List>
          <StandardListItem className='item'>
            <Label required={true}>Name</Label>
            <Input
              ref={refs.name}
              className='input'
              type='Text'
              value={departmentData.name}
              onInput={(e) => handleInputChange(e, 'name')}
              onKeyDown={(e) => onKeyDown(e, 'name')}
            ></Input>
          </StandardListItem>
          <StandardListItem>
            <a href={`/departments/`}>
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

export default DepartmentNew;
