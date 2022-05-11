import dayjs from "dayjs";

export const formatDate = ({
  date,
  withTime = false,
}: {
  date: string;
  withTime?: boolean;
}) =>
  withTime
    ? dayjs(date).format("MM/DD/YYYY hh:mm:ss A")
    : dayjs(date).format("MM/DD/YYYY");
