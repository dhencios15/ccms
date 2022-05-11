import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import type {
  CreateEmployee,
  Employee,
  Job,
  JobWithEmployee,
} from "@utils/types";
import {
  generateDate,
  generateId,
  generateJobTitle,
} from "@utils/valueGenerator";

interface JobState {
  jobs: Array<JobWithEmployee>;
  //   addJob: (employee: CreateEmployee) => void;
  //   updateJob: (employee: CreateEmployee, id: string) => void;
  //   deleteJob: (id: string) => void;
}

const initJob: Array<JobWithEmployee> = new Array(5).fill(null).map((_) => ({
  id: generateId(),
  name: generateJobTitle(),
  createdAt: `${generateDate()}`,
  employees: [],
}));

const useJobs = create<JobState>()(
  devtools(
    persist((set) => ({
      jobs: initJob,
    }))
  )
);

export default useJobs;
