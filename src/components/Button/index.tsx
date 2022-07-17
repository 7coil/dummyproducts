import React, { MouseEventHandler, ReactNode } from "react";

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => (
  <div className="bg-blue-300 px-6 py-3" onClick={onClick}>
    {children}
  </div>
);

export { Button };
