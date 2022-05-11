import React from "react";
import { Trash } from "tabler-icons-react";
import { Button, Center, Group, Paper, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import useJobs from "@store/useJobs";
import type { JobWithEmployee } from "@utils/types";

type Props = {
  job: JobWithEmployee;
};

export const JobDeleteModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<Props>) => {
  const { job } = innerProps;
  const onDeleteJob = useJobs((state) => state.deleteJob);

  const handleDeleteJob = () => {
    onDeleteJob(job.id);
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
        <Text>Are you sure you want to delete this job?</Text>
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
          onClick={handleDeleteJob}
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
