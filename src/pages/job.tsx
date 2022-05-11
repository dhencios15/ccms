import React from "react";
import { Space } from "@mantine/core";

import { JobWithEmployee } from "@utils/types";
import useJobs from "@store/useJobs";

import { AppLayout } from "@components/AppLayout";
import { JobHeader } from "@components/job/JobHeader";
import { JobTable } from "@components/job/JobTable";

export default function Employees() {
  const getJobs = useJobs((state) => state.jobs);
  const [jobs, setJobs] = React.useState<JobWithEmployee[]>([]);

  // https://nextjs.org/docs/messages/react-hydration-error
  React.useEffect(() => setJobs(getJobs), [getJobs]);

  return (
    <AppLayout>
      <JobHeader />
      <Space h='xl' />
      <JobTable data={jobs} />
    </AppLayout>
  );
}
