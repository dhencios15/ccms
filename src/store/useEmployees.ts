import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { faker } from "@faker-js/faker";
import ShortUniqueId from "short-unique-id";

import type { Employee } from "@utils/types";

interface EmployeeState {
  employees: Array<Employee>;
}

const uid = new ShortUniqueId();

const initEmployee: Array<Employee> = new Array(20)
  .fill(null)
  .map((_, idx) => ({
    id: uid(),
    name: faker.name.findName(),
    photo: faker.image.people(1234, 2345, true),
    feature: true,
    createdAt: `${Date.now() + idx}`,
    jobs: new Array(3).fill(null).map((_, idx) => ({
      id: uid(),
      name: faker.name.jobTitle(),
      createdAt: `${Date.now() + idx}`,
    })),
  }));

const useEmployees = create<EmployeeState>()(
  devtools(
    persist((set) => ({
      employees: initEmployee,
      //   increase: (by) => set((state) => ({ bears: state.bears + by })),
    }))
  )
);

export default useEmployees;
