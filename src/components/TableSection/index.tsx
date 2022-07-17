import React, { ReactNode } from "react";
import { Container } from "../Container";
import { SectionProvider } from "../SectionProvider";

const TableSection = ({ children }: { children?: ReactNode }) => (
  <SectionProvider className="py-6">
    <Container>{children}</Container>
  </SectionProvider>
);

export { TableSection };
