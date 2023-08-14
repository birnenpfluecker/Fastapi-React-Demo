import { Employee } from '../models';

type EmployeeLabelProps = {
  employees: Employee[];
};

const EmployeeLabel: React.FC<EmployeeLabelProps> = ({ employees }) => {
  return (
    <>
      {employees.map((employee, index) => (
        <span key={index}>
          {employee.toString()}
          <br />
        </span>
      ))}
    </>
  );
};

export default EmployeeLabel;
