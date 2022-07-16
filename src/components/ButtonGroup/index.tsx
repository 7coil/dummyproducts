import React, { ReactNode } from "react";

const ButtonGroup = ({
  children,
  centre = false,
}: {
  children: ReactNode;
  centre?: boolean;
}) => (
  <div
    className={`flex flex-wrap gap-x-3 gap-y-1 ${
      centre ? "justify-center" : ""
    }`}
  >
    {children}
  </div>
);

export { ButtonGroup };
