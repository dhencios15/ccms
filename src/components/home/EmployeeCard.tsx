import React from "react";
import { Avatar, Text, Group, Paper, Popover, List } from "@mantine/core";
import { createStyles } from "@mantine/core";

import type { Job } from "@utils/types";
import useEmployees from "@store/useEmployees";

interface UserInfoIconsProps {
  avatar: string;
  name: string;
  jobs: Job[];
  id: string;
}

const useStyles = createStyles((th) => ({
  card: {
    ":hover": {
      cursor: "pointer",
    },
  },
  job: {
    fontSize: th.fontSizes.sm,
  },
}));

export const EmployeeCard = ({
  id,
  avatar,
  name,
  jobs,
}: UserInfoIconsProps) => {
  const { classes } = useStyles();
  const [opened, setOpened] = React.useState(false);
  const onHoveredEmployee = useEmployees((state) => state.onHovered);
  const handleOnMoustEnter = () => {
    setOpened(true);
    onHoveredEmployee(id);
  };

  const handleOnMoustLeave = () => {
    setOpened(false);
    onHoveredEmployee(null);
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Paper
          onMouseEnter={handleOnMoustEnter}
          onMouseLeave={handleOnMoustLeave}
          withBorder
          p='md'
          radius='md'
          shadow='md'
          className={classes.card}
        >
          <Group noWrap>
            <Avatar src={avatar} size={94} radius='md' />
            <div>
              <Text size='xs' sx={{ textTransform: "uppercase" }} weight={700}>
                {name}
              </Text>
              <Text size='xs'># of jobs {jobs.length}</Text>
            </div>
          </Group>
        </Paper>
      }
      width={260}
      position='bottom'
      withArrow
    >
      <Paper>
        {jobs.length ? (
          <>
            <Text size='sm'>Job list:</Text>
            <List>
              {jobs.map((job) => (
                <List.Item key={job.id} className={classes.job}>
                  {job.name}
                </List.Item>
              ))}
            </List>
          </>
        ) : (
          <Text align='center' size='sm' color='red'>
            No jobs assigned yet.
          </Text>
        )}
      </Paper>
    </Popover>
  );
};
