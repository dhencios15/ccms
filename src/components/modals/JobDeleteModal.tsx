import React from "react";
import { AlertCircle, Trash } from "tabler-icons-react";
import { Alert, Button, Center, Group, Paper, Text } from "@mantine/core";
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

  const jobHasEmployee = job.employees.length > 0;

  return (
    <Paper py={6} radius='md'>
      {jobHasEmployee ? (
        <Alert
          mb='xl'
          icon={<AlertCircle size={16} />}
          title='Warning!'
          color='red'
        >
          Cannot delete {job.name}. there are {job.employees.length} assigned to
          this job.
        </Alert>
      ) : (
        <Center mb='xl'>
          <Text>Are you sure you want to delete this job?</Text>
        </Center>
      )}
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
          disabled={jobHasEmployee}
          leftIcon={<Trash />}
        >
          Yes, Delete
        </Button>
      </Group>
    </Paper>
  );
};
