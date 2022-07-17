import React, { MouseEventHandler, ReactNode } from "react";

const Button = ({
  children,
  onClick,
  disabled,
  title = "",
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  title?: string;
}) => (
  <div
    className={`px-6 py-3 ${
      disabled
        ? "cursor-not-allowed bg-blue-100 text-gray-400"
        : "cursor-pointer bg-blue-300"
    }`}
    onClick={onClick}
    title={title}
    role="button"
    tabIndex={0}
    aria-disabled={disabled}
  >
    {children}
  </div>
);

export { Button };
