import { Text } from '@ui5/webcomponents-react';

function Root() {
  return (
    <div className='root'>
      <h1>Frontend Demonstration</h1>
      <Text className='rootText'>
        Welcome to the Frontend of the programming task. This React application
        was built using npm and vice. The look and feel of the App is mostly
        obtained by using the UI5 Web Components for React.
      </Text>
      <h3>Functionality</h3>
      <Text className='rootText'>
        With this application you can manage employees, projects and
        departments. You can view all entities of a type, view details of a
        single entity and create a new entity. In addition to the requirements
        from the task update and delete capabilities are also implemented (for
        departments only the name can be changed, everything else would have
        required a lot of additional code).
      </Text>
      <h3>Navigation</h3>
      <Text className='rootText'>
        Navigation is possible through the menu in the ShellBar. You will get to
        the overview pages for specific models and from there you can reach all
        functionality to manipulate the instaces. <br />
        You can reach this starting page by clicking on the logo in the
        ShellBar.
      </Text>
    </div>
  );
}

export default Root;
