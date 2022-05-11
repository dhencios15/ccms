import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { faker } from "@faker-js/faker";
import ShortUniqueId from "short-unique-id";

import type { Employee } from "@utils/types";
import dayjs from "dayjs";

interface EmployeeState {
  employees: Array<Employee>;
  hoveredEmployee: string | null;
  onHovered: (id: string | null) => void;
}

const uid = new ShortUniqueId();

const initEmployee: Array<Employee> = new Array(5).fill(null).map((_) => ({
  id: uid(),
  name: faker.name.findName(),
  photo: faker.image.people(1234, 2345, true),
  feature: true,
  createdAt: `${dayjs(new Date())}`,
  jobs: new Array(3).fill(null).map((_) => ({
    id: uid(),
    name: faker.name.jobTitle(),
    createdAt: `${dayjs(new Date())}`,
  })),
}));

const useEmployees = create<EmployeeState>()(
  devtools(
    persist((set) => ({
      employees: initEmployee,
      hoveredEmployee: null,
      onHovered: (id) => set(() => ({ hoveredEmployee: id })),
    }))
  )
);

export default useEmployees;
