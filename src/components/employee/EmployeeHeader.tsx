import { Button, Group, Title } from "@mantine/core";
import { useModals } from "@mantine/modals";
import React from "react";
import { Plus } from "tabler-icons-react";

export const EmployeeHeader = () => {
  const modals = useModals();

  const onOpenCreateEmployeeModal = () =>
    modals.openContextModal("EmployeeModal", {
      title: `CREATE EMPLOYEE`,
      innerProps: {
        state: "Add",
      },
    });

  return (
    <Group position='apart'>
      <Title>Employee</Title>
      <Button onClick={onOpenCreateEmployeeModal} leftIcon={<Plus />}>
        ADD EMPLOYEE
      </Button>
    </Group>
  );
};
