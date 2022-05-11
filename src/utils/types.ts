export type Employee = {
  id: string;
  name: string;
  photo: string;
  feature: boolean;
  createdAt: string;
  jobs: Job[];
};

export type CreateEmployee = Omit<Employee, "jobs" | "createdAt" | "id">;

export type Job = {
  id: string;
  name: string;
  createdAt: string;
};
