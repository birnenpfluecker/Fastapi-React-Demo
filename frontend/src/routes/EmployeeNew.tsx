import {
  Button,
  Card,
  CardHeader,
  Form,
  Input,
  InputDomRef,
  InputType,
  Label,
  List,
  MessageBox,
  StandardListItem,
  Ui5CustomEvent,
} from '@ui5/webcomponents-react';
import '@ui5/webcomponents/dist/features/InputElementsFormSupport.js';
import { Employee } from '../models';
import { createEmployee } from '../http';
import { useState } from 'react';
import React from 'react';

function EmployeeNew() {
  //state of input fields
  const [employeeData, setEmployee] = useState({
    email: '',
    first_name: '',
    last_name: '',
    age: '',
    department_id: '',
  });

  //refs for input fields
  const refs = {
    email: React.createRef<InputDomRef>(),
    first_name: React.createRef<InputDomRef>(),
    last_name: React.createRef<InputDomRef>(),
    age: React.createRef<InputDomRef>(),
    department_id: React.createRef<InputDomRef>(),
  };

  //preventing the form from submitting on hitting enter, submit is handled by submit button
  function onFormSubmit(e: Ui5CustomEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  // This is a workaround for the missing tab and Enter key support in the UI5 Input component
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation(); //otherwise tab skips one input

      const fieldsOrder = [
        'email',
        'first_name',
        'last_name',
        'age',
        'department_id',
      ];
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
    setEmployee((prev) => ({ ...prev, [field]: updatedValue }));
  };

  //create employee and redirect to overview
  const handleSubmit = async () => {
    console.log('handleSubmit');

    try {
      const employee = new Employee(
        employeeData.email,
        employeeData.first_name,
        employeeData.last_name,
        Number(employeeData.age),
        Number(employeeData.department_id)
      );
      console.log('employee', employee);
      await createEmployee(employee);
      window.location.href = '/employees/';
    } catch (error) {
      console.error('Error creating employee:', error);
      <MessageBox
        actions={['OK']}
        onAfterOpen={function ka() {}}
        onBeforeClose={function ka() {}}
        onBeforeOpen={function ka() {}}
        onClose={function ka() {}}
        type='Confirm'
      >
        Following error occurred during creation of employee. Please try again.
        For further assistance please contact your administrator.
      </MessageBox>;
    }
  };

  return (
    <Card
      header={
        <CardHeader
          subtitleText='Please enter all necessary information'
          titleText='Create a new employee'
        />
      }
      style={{
        width: '350px',
        margin: 'auto',
        borderRadius: '8rem',
        textAlign: 'justify',
      }}
    >
      <Form className='form' id='inputEmployee' onSubmit={onFormSubmit}>
        <List>
          <StandardListItem className='item'>
            <Label>E-Mail</Label>
            <Input
              ref={refs.email}
              className='input'
              type='Email'
              value={employeeData.email}
              onInput={(e) => handleInputChange(e, 'email')}
              onKeyDown={onKeyDown}
            ></Input>
          </StandardListItem>
          <StandardListItem className='item'>
            <Label>First Name</Label>
            <Input
              ref={refs.first_name}
              className='input'
              type='Text'
              value={employeeData.first_name}
              onInput={(e) => handleInputChange(e, 'first_name')}
              onKeyDown={onKeyDown}
            />
          </StandardListItem>
          <StandardListItem className='item'>
            <Label>Last Name</Label>
            <Input
              ref={refs.last_name}
              className='input'
              type='Text'
              value={employeeData.last_name}
              onInput={(e) => handleInputChange(e, 'last_name')}
              onKeyDown={onKeyDown}
            />
          </StandardListItem>
          <StandardListItem className='item'>
            <Label>Age</Label>
            <Input
              ref={refs.age}
              className='input'
              type='Text'
              value={employeeData.age}
              onInput={(e) => handleInputChange(e, 'age')}
              onKeyDown={onKeyDown}
            />
          </StandardListItem>
          <StandardListItem className='item'>
            <Label>Department ID</Label>
            <Input
              ref={refs.department_id}
              className='input'
              type='Text'
              value={employeeData.department_id}
              onInput={(e) => handleInputChange(e, 'department_id')}
              onKeyDown={onKeyDown}
            />
          </StandardListItem>
          <StandardListItem>
            <a href={`/employees/`}>
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

export default EmployeeNew;
