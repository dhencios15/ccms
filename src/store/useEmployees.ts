import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { CreateEmployee, Employee } from "@utils/types";
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
    }))
  )
);

export default useEmployees;
