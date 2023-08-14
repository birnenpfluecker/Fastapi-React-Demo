import './App.css';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import { ShellBar } from '@ui5/webcomponents-react';
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

function App() {
  return (
    <>
      <ShellBar
        className='bar'
        primaryTitle='PxC Frontend API Demo'
        logo={shellLogo}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
