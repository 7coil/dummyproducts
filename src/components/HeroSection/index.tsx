import React, { ReactNode } from "react";
import { Container } from "../Container";
import { SectionProvider } from "../SectionProvider";

/**
 * A horizontal hero section, to put on the top of the page to capture the user's attention.
 */
const HeroSection = ({
  children,

  /** The title! */
  title,
  subtitle,
}: {
  children?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
}) => (
  <SectionProvider className="bg-blue-100 py-6">
    <Container>
      <div className="flex flex-col gap-6 text-center">
        {title && <h1 className="text-4xl">{title}</h1>}
        {subtitle && <p className="text-2xl">{subtitle}</p>}
        {children}
      </div>
    </Container>
  </SectionProvider>
);

export { HeroSection };
