import React from "react";
import { Button, Paper, Switch, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import useEmployees from "@store/useEmployees";
import { generateDate, generateId } from "@utils/valueGenerator";
import { Employee } from "@utils/types";

const schema = z.object({
  name: z.string(),
  photo: z.string().url(),
  feature: z.boolean().default(true),
});

export type FormType = z.infer<typeof schema>;

export default function EmployeeModal() {
  const onAddEmployee = useEmployees((state) => state.addEmployee);
  const form = useForm<FormType>({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      photo: "",
      feature: true,
    },
  });

  const onSubmitForm = (data: FormType) => {
    const employeeToSend: Employee = {
      ...data,
      id: generateId(),
      createdAt: `${generateDate()}`,
      jobs: [],
    };

    onAddEmployee(employeeToSend);
    form.reset();
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
      <Switch
        {...form.getInputProps("feature")}
        mt='sm'
        label='featured this employee ?'
        onLabel='Yes'
        offLabel='No'
        size='lg'
      />
      <Button type='submit' color='green' fullWidth mt='xl'>
        Add Employee
      </Button>
    </Paper>
  );
}
