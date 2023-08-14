import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ShellBar, StandardListItem } from '@ui5/webcomponents-react';
import Root from './routes/Root';
import reactLogo from './assets/react.svg';
import ErrorPage from './error';
import EmployeeTable from './routes/Employees';
import EmployeeDetail from './routes/EmployeeDetail';
import EmployeeNew from './routes/EmployeeNew';
import ProjectTable from './routes/Projects';
import ProjectNew from './routes/ProjectNew';
import ProjectDetail from './routes/ProjectDetail';
import DepartmentTable from './routes/Departments';
import DepartmentDetail from './routes/DepartmentDetail';
import DepartmentNew from './routes/DepartmentNew';
import { EventHandler } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/employees',
    element: <EmployeeTable />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/employees/:email',
    element: <EmployeeDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/employees/new',
    element: <EmployeeNew />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/projects',
    element: <ProjectTable />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/projects/:id',
    element: <ProjectDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/projects/new',
    element: <ProjectNew />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/departments',
    element: <DepartmentTable />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/departments/:id',
    element: <DepartmentDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/departments/new',
    element: <DepartmentNew />,
    errorElement: <ErrorPage />,
  },
]);

const shellLogo = <img src={reactLogo} alt='React Logo' />;
const menuClicked = (e: any) => {
  const key = e.detail.item.dataset.key;
  switch (key) {
    case '1':
      window.location.href = '/departments';
      break;
    case '2':
      window.location.href = '/employees';
      break;
    case '3':
      window.location.href = '/projects';
      break;
    default:
      window.location.href = '/';
      break;
      window.location.href = '/departments';
  }
};

function App() {
  return (
    <>
      <ShellBar
        className='bar'
        primaryTitle='PxC Frontend API Demo'
        logo={shellLogo}
        onLogoClick={() => {
          window.location.href = '/';
        }}
        menuItems={
          <>
            <StandardListItem data-key='1'>Departments</StandardListItem>
            <StandardListItem data-key='2'>Employees</StandardListItem>
            <StandardListItem data-key='3'>Projects</StandardListItem>
          </>
        }
        onMenuItemClick={menuClicked}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
