import React from "react";
import { Trash } from "tabler-icons-react";
import { Button, Center, Group, Paper, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import useEmployees from "@store/useEmployees";

type Props = {
  employeeId: string;
};

export const EmployeeDeleteModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<Props>) => {
  const { employeeId } = innerProps;
  const onDeleteEmployee = useEmployees((state) => state.deleteEmployee);

  const handleDeleteEmployee = () => {
    onDeleteEmployee(employeeId);
    showNotification({
      title: `Delete Success`,
      message: ``,
      color: "green",
    });
    context.closeModal(id);
  };

  return (
    <Paper py={6} radius='md'>
      <Center mb='xl'>
        <Text>Are you sure you want to delete this employee?</Text>
      </Center>
      <Group position='center'>
        <Button
          onClick={() => context.closeModal(id)}
          type='submit'
          color='red'
          variant='outline'
        >
          No, Cancel
        </Button>
        <Button
          onClick={handleDeleteEmployee}
          type='submit'
          color='red'
          leftIcon={<Trash />}
        >
          Yes, Delete
        </Button>
      </Group>
    </Paper>
  );
};
