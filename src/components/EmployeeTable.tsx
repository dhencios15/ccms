import React, { useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
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
}

export const EmployeeTabe = ({ data }: TableSelectionProps) => {
  const { classes, cx } = useStyles();
  const hoveredEmployee = useEmployees((state) => state.hoveredEmployee);

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
        <td>{formatDate({ date: item.createdAt })}</td>
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
            <th>Joined Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
