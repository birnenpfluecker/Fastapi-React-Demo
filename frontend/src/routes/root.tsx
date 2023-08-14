import { Text } from '@ui5/webcomponents-react';

function Root() {
  return (
    <>
      <Text>Welcome to the Frontend of the programming task. </Text>
      <br />
      <Text>
        This is a React application, using the UI5 Web Components for React.
      </Text>
      With this application you can manage employees, projects and departments.
      You can view all entities of a type, view details of a single entity and
      create a new entity. Update and delete are currently not implemented.
    </>
  );
}

export default Root;
