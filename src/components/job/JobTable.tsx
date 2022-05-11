import React from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { Edit, Trash } from "tabler-icons-react";

import { Job, JobWithEmployee } from "@utils/types";
import { useModals } from "@mantine/modals";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface TableSelectionProps {
  data: JobWithEmployee[];
}

export const JobTable = ({ data }: TableSelectionProps) => {
  const modals = useModals();

  const onOpenUpdateJobModal = (job: Job) =>
    modals.openContextModal("JobModal", {
      title: `UPDATE JOB`,
      innerProps: {
        state: "Update",
        job,
      },
    });

  const onOpenDeleteJobModal = (id: string) =>
    modals.openContextModal("JobDeleteModal", {
      title: `DELETE JOB`,
      innerProps: {
        jobId: id,
      },
    });

  const rows = data.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.employees.length}</td>
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
                // onClick={() => onOpenDeleteJobModal(item.id)}
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
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
