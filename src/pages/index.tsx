import { AppLayout } from "@components/AppLayout";
import { EmployeeCard } from "@components/EmployeeCard";
import useEmployees from "@store/useEmployees";
import { Employee } from "@utils/types";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper";
import { Text, Title } from "@mantine/core";

export default function HomePage() {
  const getEmployees = useEmployees((state) => state.employees);
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  // https://nextjs.org/docs/messages/react-hydration-error
  React.useEffect(() => setEmployees(getEmployees), [getEmployees]);

  const featuredEmployees = React.useMemo(
    () =>
      employees
        .filter((emp) => emp.feature)
        .map((employee) => (
          <SwiperSlide key={employee.id}>
            <EmployeeCard
              jobs={employee.jobs}
              avatar={employee.photo}
              name={employee.name}
            />
          </SwiperSlide>
        )),
    [employees]
  );

  return (
    <AppLayout>
      <Text
        variant='gradient'
        gradient={{ from: "blue", to: "green" }}
        align='center'
        weight='bolder'
        sx={{ fontSize: 40 }}
        component='h1'
      >
        Hire the best Employees!
      </Text>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Pagination]}
        style={{ paddingBottom: 60 }}
      >
        {featuredEmployees}
      </Swiper>
    </AppLayout>
  );
}
