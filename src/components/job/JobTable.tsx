import React from "react";
import {
  Table,
  ScrollArea,
  Group,
  Tooltip,
  ActionIcon,
  Switch,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { Edit, Trash } from "tabler-icons-react";

import { Job, JobWithEmployee } from "@utils/types";
import useEmployees from "@store/useEmployees";

interface TableSelectionProps {
  data: JobWithEmployee[];
  employeeId?: string;
}

export const JobTable = ({ data, employeeId }: TableSelectionProps) => {
  const modals = useModals();
  const toggleJobAssign = useEmployees((state) => state.toggleJobEmployee);
  const onOpenUpdateJobModal = (job: Job) =>
    modals.openContextModal("JobModal", {
      title: `UPDATE JOB`,
      innerProps: {
        state: "Update",
        job,
      },
    });

  const onOpenDeleteJobModal = (job: JobWithEmployee) =>
    modals.openContextModal("JobDeleteModal", {
      title: `DELETE JOB`,
      innerProps: {
        job,
      },
    });

  const onToggeAssign = (item: Job) => {
    employeeId && toggleJobAssign(item, employeeId);
  };

  const rows = data.map((item) => {
    const getEmployee = item.employees.find(
      (currEmp) => currEmp.id === employeeId
    );
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.employees.length}</td>
        {employeeId && (
          <td>
            <Switch
              defaultChecked={!!getEmployee}
              onLabel='Yes'
              offLabel='No'
              size='lg'
              onChange={() => onToggeAssign(item)}
            />
          </td>
        )}
        <td>
          <Group position='center'>
            <Tooltip position='top' label='Edit Employee'>
              <ActionIcon
                onClick={() => onOpenUpdateJobModal(item)}
                color='green'
              >
                <Edit />
              </ActionIcon>
            </Tooltip>
            <Tooltip position='top' label='Delete Employee'>
              <ActionIcon
                onClick={() => onOpenDeleteJobModal(item)}
                color='red'
              >
                <Trash />
              </ActionIcon>
            </Tooltip>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea style={{ height: 800 }}>
      <Table striped verticalSpacing='sm'>
        <thead>
          <tr>
            <th>User</th>
            <th># of Employees Assigned</th>
            {employeeId && <th>is Assigned?</th>}
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
