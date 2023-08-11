import "./App.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { ShellBar } from "@ui5/webcomponents-react";
import Root from "./routes/root";
import reactLogo from "./assets/react.svg";
import ErrorPage from "./error";
import EmployeeTable from "./routes/employees";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/employees",
    element: <EmployeeTable />,
    errorElement: <ErrorPage />,
  },
]);

const shellLogo = <img src={reactLogo} alt="React Logo" />;

function App() {
  return (
    <>
      <ShellBar
        className="bar"
        primaryTitle="PxC Frontend API Demo"
        logo={shellLogo}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
