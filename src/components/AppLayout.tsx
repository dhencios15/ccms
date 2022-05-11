import { Container } from "@mantine/core";
import React from "react";

import { AppNavbar } from "./AppNavbar";

interface Props {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: Props) => {
  return (
    <>
      <AppNavbar />
      <Container size={1300} p='md'>
        {children}
      </Container>
    </>
  );
};
