import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Employee } from "@utils/types";
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
  addEmployee: (employee: Employee) => void;
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
        set((state) => ({ employees: [employee, ...state.employees] })),
    }))
  )
);

export default useEmployees;
