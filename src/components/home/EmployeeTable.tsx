import React from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Tooltip,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { Edit, SquarePlus, Trash } from "tabler-icons-react";

import { Employee } from "@utils/types";
import { formatDate } from "@utils/formatter";
import useEmployees from "@store/useEmployees";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface TableSelectionProps {
  data: Employee[];
  showAction?: boolean;
  showFeature?: boolean;
}

const isFeatured = (featured: boolean) =>
  featured ? (
    <Badge color='cyan'>featured</Badge>
  ) : (
    <Badge color='orange'>not featured</Badge>
  );

export const EmployeeTable = ({
  data,
  showAction = false,
  showFeature = false,
}: TableSelectionProps) => {
  const modals = useModals();
  const { classes, cx } = useStyles();
  const hoveredEmployee = useEmployees((state) => state.hoveredEmployee);

  const onOpenUpdateEmployeeModal = (employee: Employee) =>
    modals.openContextModal("EmployeeModal", {
      title: `UPDATE EMPLOYEE`,
      innerProps: {
        state: "Update",
        employee,
      },
    });

  const onOpenDeleteEmployeeModal = (id: string) =>
    modals.openContextModal("EmployeeDeleteModal", {
      title: `DELETE EMPLOYEE`,
      innerProps: {
        employeeId: id,
      },
    });

  const onOpenAddJobsToEmployeeModal = (employee: Employee) =>
    modals.openContextModal("AddJobsToEmployee", {
      title: `APPLY JOB TO EMPLOYEE`,
      innerProps: {
        employee,
      },
      size: "xl",
    });

  const rows = data.map((item) => {
    const selected = item.id === hoveredEmployee;
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Group spacing='sm'>
            <Avatar size={26} src={item.photo} radius={26} />
            <Text size='sm' weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>{item.jobs.length}</td>
        {showFeature && <td>{isFeatured(item.feature)}</td>}
        <td>{formatDate({ date: item.createdAt })}</td>
        {showAction && (
          <td>
            <Group position='center'>
              <Tooltip position='top' label='Edit Employee'>
                <ActionIcon
                  onClick={() => onOpenUpdateEmployeeModal(item)}
                  color='green'
                >
                  <Edit />
                </ActionIcon>
              </Tooltip>
              <Tooltip position='top' label='Delete Employee'>
                <ActionIcon
                  onClick={() => onOpenDeleteEmployeeModal(item.id)}
                  color='red'
                >
                  <Trash />
                </ActionIcon>
              </Tooltip>
              <Tooltip position='top' label='View Employee Job'>
                <ActionIcon
                  onClick={() => onOpenAddJobsToEmployeeModal(item)}
                  color='blue'
                >
                  <SquarePlus />
                </ActionIcon>
              </Tooltip>
            </Group>
          </td>
        )}
      </tr>
    );
  });

  return (
    <ScrollArea style={{ height: 800 }}>
      <Table verticalSpacing='sm'>
        <thead>
          <tr>
            <th>User</th>
            <th># of Jobs</th>
            {showFeature && <th>is Featured</th>}
            <th>Joined Date</th>
            {showAction && <th style={{ textAlign: "center" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
