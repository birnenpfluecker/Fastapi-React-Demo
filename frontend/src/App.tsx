import './App.css';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import { ShellBar } from '@ui5/webcomponents-react';
import Root from './routes/root';
import reactLogo from './assets/react.svg';
import ErrorPage from './error';
import EmployeeTable from './routes/employees';
import EmployeeDetail from './routes/employee_detail';
import { getEmployee } from './http';
import EmployeeNew from './routes/employee_new';

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
