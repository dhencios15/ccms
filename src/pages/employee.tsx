import React from "react";
import { Space } from "@mantine/core";

import useEmployees from "@store/useEmployees";
import { Employee } from "@utils/types";

import { EmployeeHeader } from "@components/employee/EmployeeHeader";
import { AppLayout } from "@components/AppLayout";
import { EmployeeTable } from "@components/home/EmployeeTable";

export default function Employees() {
  const getEmployees = useEmployees((state) => state.employees);
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  // https://nextjs.org/docs/messages/react-hydration-error
  React.useEffect(() => setEmployees(getEmployees), [getEmployees]);

  return (
    <AppLayout>
      <EmployeeHeader />
      <Space h='xl' />
      <EmployeeTable data={employees} showAction />
    </AppLayout>
  );
}
