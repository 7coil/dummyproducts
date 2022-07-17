import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

const Button = ({
  children,
  onClick,
  disabled,
  title = "",
  type,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  title?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}) => (
  <button
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
    type={type}
  >
    {children}
  </button>
);

export { Button };
