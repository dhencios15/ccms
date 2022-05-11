import React from "react";
import { z } from "zod";
import { Button, Checkbox, Paper, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import useEmployees from "@store/useEmployees";
import { Employee } from "@utils/types";

const schema = z.object({
  name: z.string(),
  photo: z.string().url(),
  feature: z.boolean(),
});

export type FormType = z.infer<typeof schema>;

type Props = {
  state: "Update" | "Add";
  employee?: Employee;
};

export default function EmployeeModal({
  innerProps,
  id,
  context,
}: ContextModalProps<Props>) {
  const { employee, state } = innerProps;
  const onAddEmployee = useEmployees((state) => state.addEmployee);
  const onUpdateEmployee = useEmployees((state) => state.updateEmployee);
  const form = useForm<FormType>({
    schema: zodResolver(schema),
    initialValues: {
      name: employee?.name || "",
      photo: employee?.photo || "",
      feature: true,
    },
  });
  console.log({ employee });
  const onSubmitForm = (data: FormType) => {
    const isAdding = state === "Add";
    const pastenseAction = isAdding ? "Added" : "Updated";

    isAdding
      ? onAddEmployee(data)
      : employee?.id && onUpdateEmployee(data, employee?.id);

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
      <TextInput
        {...form.getInputProps("photo")}
        label='Photo (url)'
        mt='xs'
        required
      />
      <Checkbox
        {...form.getInputProps("feature")}
        mt='sm'
        label='featured this employee ?'
      />
      <Button type='submit' color='green' fullWidth mt='xl'>
        {state} Employee
      </Button>
    </Paper>
  );
}
