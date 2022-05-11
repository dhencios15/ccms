import { JobTable } from "@components/job/JobTable";
import { Paper } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import useJobs from "@store/useJobs";
import { Employee } from "@utils/types";
import React from "react";

type Props = {
  employee: Employee;
};

export const AddJobsToEmployee = ({
  context,
  id,
  innerProps,
}: ContextModalProps<Props>) => {
  const { employee } = innerProps;
  const jobs = useJobs((state) => state.jobs);
  return (
    <Paper component='form' p={30} pt={6} radius='md'>
      <JobTable data={jobs} employeeId={employee.id} />
    </Paper>
  );
};
