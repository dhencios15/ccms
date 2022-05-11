import { AppLayout } from "@components/AppLayout";
import { EmployeeHeader } from "@components/employee/EmployeeHeader";
import { EmployeeTabe } from "@components/EmployeeTable";
import { Button, Group, Space, Title } from "@mantine/core";
import useEmployees from "@store/useEmployees";
import { Employee } from "@utils/types";
import React from "react";
import { Plus } from "tabler-icons-react";

export default function Employees() {
  const getEmployees = useEmployees((state) => state.employees);
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  // https://nextjs.org/docs/messages/react-hydration-error
  React.useEffect(() => setEmployees(getEmployees), [getEmployees]);

  return (
    <AppLayout>
      <EmployeeHeader />
      <Space h='xl' />
      <EmployeeTabe data={employees} />
    </AppLayout>
  );
}
