import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import useJobs from "./useJobs";

import type { CreateEmployee, Employee, Job } from "@utils/types";
import {
  generateDate,
  generateId,
  generatePeopleImage,
  generatePeopleName,
} from "@utils/valueGenerator";

interface EmployeeState {
  employees: Array<Employee>;
  hoveredEmployee: string | null;
  onHovered: (id: string | null) => void;
  addEmployee: (employee: CreateEmployee) => void;
  updateEmployee: (employee: CreateEmployee, id: string) => void;
  deleteEmployee: (id: string) => void;
  toggleJobEmployee: (job: Job, employeeId: string) => void;
}

const initEmployee: Array<Employee> = new Array(5).fill(null).map((_) => ({
  id: generateId(),
  name: generatePeopleName(),
  photo: generatePeopleImage(),
  feature: true,
  createdAt: `${generateDate()}`,
  jobs: [],
}));

const useEmployees = create<EmployeeState>()(
  devtools(
    persist((set) => ({
      employees: initEmployee,
      hoveredEmployee: null,
      onHovered: (id) => set(() => ({ hoveredEmployee: id })),
      addEmployee: (employee) =>
        set((state) => {
          const newEmployee = {
            ...employee,
            id: generateId(),
            createdAt: `${generateDate()}`,
            jobs: [],
          };
          return { employees: [newEmployee, ...state.employees] };
        }),
      updateEmployee: (employee, id) =>
        set((state) => {
          const getEmployeeToUpdate = state.employees.find((d) => d.id === id);
          const updatedEmployees = state.employees.map((currentEmployee) => {
            if (getEmployeeToUpdate?.id === currentEmployee.id) {
              return {
                ...currentEmployee,
                name: employee.name,
                feature: employee.feature,
                photo: employee.photo,
              };
            }

            return currentEmployee;
          });
          return { employees: updatedEmployees };
        }),
      deleteEmployee: (id) =>
        set((state) => {
          let fiterEmployees = state.employees.filter((d) => d.id !== id);
          return { employees: fiterEmployees };
        }),
      toggleJobEmployee: (job, employeeId) =>
        set((state) => {
          const currentJobList = useJobs.getState().jobs;

          const updateStateEmployee = state.employees.map((currEmp) => {
            if (currEmp.id === employeeId) {
              const isJobAlreadyAssign = currEmp.jobs.find(
                (currJob) => currJob.id === job.id
              );

              // delete or remove the job assigned to selected employee
              if (isJobAlreadyAssign) {
                const filterJobs = currEmp.jobs.filter(
                  (currJob) => currJob.id !== isJobAlreadyAssign.id
                );

                // then update the state of useJobs - remove the employee
                const updateStateJob = currentJobList.map((currJob) => {
                  if (currJob.id === isJobAlreadyAssign.id) {
                    const filterEmployee = currJob.employees.filter(
                      (currJobEmp) => currJobEmp.id !== currEmp.id
                    );
                    return {
                      ...currJob,
                      employees: filterEmployee,
                    };
                  }

                  return currJob;
                });

                useJobs.setState({ jobs: updateStateJob });

                return {
                  ...currEmp,
                  jobs: filterJobs,
                };
              }

              // add employee to the state job
              const updateStateJob = currentJobList.map((currJob) => {
                if (currJob.id === job.id) {
                  const updateEmployees = [currEmp, ...currJob.employees];
                  return {
                    ...currJob,
                    employees: updateEmployees,
                  };
                }

                return currJob;
              });

              useJobs.setState({ jobs: updateStateJob });

              return {
                ...currEmp,
                jobs: [job, ...currEmp.jobs],
              };
            }

            return currEmp;
          });

          return { employees: updateStateEmployee };
        }),
      // toggleJobEmployee: (job, employeeId) =>
      //   set((state) => {

      //     const getEmployeeJobs = state.employees.find(
      //       (employee) => employee.id === employeeId
      //     )?.jobs;

      //     const updateEmployee = state.employees.map((employee) => {
      //       const alreadyAssignedJob = getEmployeeJobs?.find(
      //         (currJob) => currJob.id === job.id
      //       );

      //       // filter or remove the job, when the job is already assigned to this employee
      //       if (alreadyAssignedJob) {
      //         const filterEmployeeJob = employee.jobs.filter(
      //           (currJob) => currJob.id !== alreadyAssignedJob.id
      //         );
      //         // update/remove the employee on the job
      //         const updateJob = currentJobList.map((jobs) => {
      //           if (jobs.id === job.id) {
      //             const updateJobEmployee = jobs.employees.filter(
      //               (currEmp) => currEmp.id !== employeeId
      //             );
      //             return {
      //               ...jobs,
      //               employees: updateJobEmployee,
      //             };
      //           }

      //           return jobs;
      //         });

      //         useJobs.setState({ jobs: updateJob });
      //         return {
      //           ...employee,
      //           jobs: filterEmployeeJob,
      //         };
      //       }

      //       // add the job, when if its not assigned
      //       const addEmployeeToJob = currentJobList.map(jobs => {
      //         if(jobs.id === job.id) {
      //           const updateJobEmployee = [employee]
      //           return {
      //             ...jobs,
      //             employees: updateJobEmployee
      //           }
      //         }

      //         return jobs
      //       })

      //       useJobs.setState({ jobs: addEmployeeToJob });

      //       return {
      //         ...employee,
      //         jobs: [job, ...employee.jobs],
      //       };
      //     });

      //     return { employees: updateEmployee };
      //   }),
    }))
  )
);

export default useEmployees;
