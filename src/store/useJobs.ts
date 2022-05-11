import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { CreateJob, JobWithEmployee } from "@utils/types";
import {
  generateDate,
  generateId,
  generateJobTitle,
} from "@utils/valueGenerator";

interface JobState {
  jobs: Array<JobWithEmployee>;
  addJob: (job: CreateJob) => void;
  updateJob: (job: CreateJob, id: string) => void;
  deleteJob: (id: string) => void;
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
      addJob: (job) =>
        set((state) => {
          const newJob: JobWithEmployee = {
            ...job,
            id: generateId(),
            createdAt: `${generateDate()}`,
            employees: [],
          };
          return { jobs: [newJob, ...state.jobs] };
        }),
      updateJob: (job, id) =>
        set((state) => {
          const getJobsToUpdate = state.jobs.find((d) => d.id === id);
          const updatedJobs = state.jobs.map((currentJob) => {
            if (getJobsToUpdate?.id === currentJob.id) {
              return {
                ...currentJob,
                name: job.name,
              };
            }

            return currentJob;
          });
          return { jobs: updatedJobs };
        }),
      deleteJob: (id) =>
        set((state) => {
          let filterJobs = state.jobs.filter((d) => d.id !== id);
          return { jobs: filterJobs };
        }),
    }))
  )
);

export default useJobs;
