import React, { ReactNode } from "react";
import { Container } from "../Container";
import { SectionProvider } from "../SectionProvider";

const TableSection = ({ children }: { children?: ReactNode }) => (
  <SectionProvider className="overflow-x-auto py-6">
    <Container>{children}</Container>
  </SectionProvider>
);

export { TableSection };
