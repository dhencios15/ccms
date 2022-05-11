import { AppLayout } from "@components/AppLayout";
import { EmployeeTabe } from "@components/EmployeeTable";
import useEmployees from "@store/useEmployees";
import { Employee } from "@utils/types";
import React from "react";

export default function Employees() {
  const getEmployees = useEmployees((state) => state.employees);
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  // https://nextjs.org/docs/messages/react-hydration-error
  React.useEffect(() => setEmployees(getEmployees), [getEmployees]);

  return (
    <AppLayout>
      <EmployeeTabe data={employees} />
    </AppLayout>
  );
}
