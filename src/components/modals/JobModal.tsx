import React from "react";
import { z } from "zod";
import { Button, Paper, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import { Job } from "@utils/types";
import useJobs from "@store/useJobs";

const schema = z.object({
  name: z.string(),
});

export type FormType = z.infer<typeof schema>;

type Props = {
  state: "Update" | "Add";
  job?: Job;
};

export default function JobModal({
  innerProps,
  id,
  context,
}: ContextModalProps<Props>) {
  const { job, state } = innerProps;
  const onAddJob = useJobs((state) => state.addJob);
  const onUpdateJob = useJobs((state) => state.updateJob);

  const form = useForm<FormType>({
    schema: zodResolver(schema),
    initialValues: {
      name: job?.name || "",
    },
  });

  const onSubmitForm = (data: FormType) => {
    const isAdding = state === "Add";
    const pastenseAction = isAdding ? "Added" : "Updated";

    isAdding ? onAddJob(data) : job?.id && onUpdateJob(data, job?.id);

    showNotification({
      title: `${state} Success`,
      message: `${data.name.toUpperCase()} has been ${pastenseAction}`,
      color: "green",
    });

    form.reset();
    // close when state is update
    !isAdding && context.closeModal(id);
  };

  return (
    <Paper
      onSubmit={form.onSubmit(onSubmitForm)}
      component='form'
      p={30}
      pt={6}
      radius='md'
    >
      <TextInput
        {...form.getInputProps("name")}
        label='Name'
        mt='xs'
        required
      />

      <Button type='submit' color='green' fullWidth mt='xl'>
        {state} Job
      </Button>
    </Paper>
  );
}
