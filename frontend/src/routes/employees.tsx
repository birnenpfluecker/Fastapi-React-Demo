import {
  Label,
  Table,
  TableCell,
  TableColumn,
  TableRow,
} from "@ui5/webcomponents-react";

import { Employee } from "../models";
import { getEmployees } from "../http";
import { useEffect, useState } from "react";

// const json =
//   '[{"email":"BMullinder@phoenixcontact.com","first_name":"Barbabra","last_name":"Mullinder","age":30,"department_id":1},{"email":"LBarthelemy@phoenixcontact.com","first_name":"Lammond","last_name":"Barthelemy","age":24,"department_id":8},{"email":"DParmiter@phoenixcontact.com","first_name":"Daphene","last_name":"Parmiter","age":26,"department_id":5},{"email":"DShew@phoenixcontact.com","first_name":"Dareen","last_name":"Shew","age":44,"department_id":5},{"email":"CDorie@phoenixcontact.com","first_name":"Colver","last_name":"Dorie","age":32,"department_id":6},{"email":"NFinder@phoenixcontact.com","first_name":"Norine","last_name":"Finder","age":53,"department_id":4}]';

// const empObjects = JSON.parse(json);
// const data: Array<Employee> = empObjects.map(
//   (item: any) =>
//     new Employee(
//       item.email,
//       item.first_name,
//       item.last_name,
//       item.age,
//       item.department_id
//     )
// );

const rows = (data: Array<Employee>) => {
  return data.map((employee, index) => (
    <TableRow key={`${index}-row`}>
      <TableCell>
        <Label>{employee.email}</Label>
      </TableCell>
      <TableCell>
        <Label>{employee.last_name}</Label>
      </TableCell>
      <TableCell>
        <Label>{employee.first_name}</Label>
      </TableCell>
      <TableCell>
        <Label>{employee.age}</Label>
      </TableCell>
      <TableCell>
        <Label>{employee.department_id}</Label>
      </TableCell>
    </TableRow>
  ));
};

function EmployeeTable() {
  const [data, setData] = useState<Array<Employee>>([]);

  const fetchData = async () => {
    console.log("fetchData");
    try {
      const response = await getEmployees();
      setData(response.data); // Assuming the data is directly in the response object
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Use effect to make the API call when the component mounts
  useEffect(() => {
    console.log("useEffect");
    fetchData();
  }, []);

  return (
    <div style={{ overflow: "auto" }}>
      <Table
        className="table"
        columns={
          <>
            <TableColumn>
              <Label>E-Mail</Label>
            </TableColumn>
            <TableColumn>
              <Label>Lastname</Label>
            </TableColumn>
            <TableColumn>
              <Label>Firstname</Label>
            </TableColumn>
            <TableColumn>
              <Label>Age</Label>
            </TableColumn>
            <TableColumn>
              <Label>Department</Label>
            </TableColumn>
          </>
        }
      >
        {rows(data)}
      </Table>
    </div>
  );
}

export default EmployeeTable;
