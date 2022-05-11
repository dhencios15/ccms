import React from "react";
import { Plus } from "tabler-icons-react";
import { Button, Group, Title } from "@mantine/core";
import { useModals } from "@mantine/modals";

export const JobHeader = () => {
  const modals = useModals();

  const onOpenCreateJobModal = () =>
    modals.openContextModal("JobModal", {
      title: `CREATE JOB`,
      innerProps: {
        state: "Add",
      },
    });

  return (
    <Group position='apart'>
      <Title>Job</Title>
      <Button onClick={onOpenCreateJobModal} leftIcon={<Plus />}>
        ADD JOB
      </Button>
    </Group>
  );
};
