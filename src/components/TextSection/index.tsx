import React, { ReactNode } from "react";
import { Container } from "../Container";
import { SectionProvider } from "../SectionProvider";

const TextSection = ({ children }: { children?: ReactNode }) => (
  <SectionProvider className="py-6">
    <Container>
      <div className="prose max-w-none">{children}</div>
    </Container>
  </SectionProvider>
);

export { TextSection };
