import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { CreateEmployee, Employee } from "@utils/types";
import {
  generateDate,
  generateId,
  generateJobTitle,
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
  jobs: new Array(3).fill(null).map((_) => ({
    id: generateId(),
    name: generateJobTitle(),
    createdAt: `${generateDate()}`,
  })),
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
          let updateEmployee = state.employees.find((d) => d.id === id);
          console.log(updateEmployee);
          return { employees: [...state.employees] };
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
