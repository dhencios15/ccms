import React from "react";
import { Avatar, Text, Group, Paper, Popover, List } from "@mantine/core";

import type { Job } from "@utils/types";
import { createStyles } from "@mantine/core";

interface UserInfoIconsProps {
  avatar: string;
  name: string;
  jobs: Job[];
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

export const EmployeeCard = ({ avatar, name, jobs }: UserInfoIconsProps) => {
  const { classes } = useStyles();
  const [opened, setOpened] = React.useState(false);
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Paper
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
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
        <List>
          {jobs.map((job) => (
            <List.Item key={job.id} className={classes.job}>
              {job.name}
            </List.Item>
          ))}
        </List>
      </Paper>
    </Popover>
  );
};
