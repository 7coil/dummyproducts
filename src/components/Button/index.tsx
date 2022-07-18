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
  disabledColour = "bg-blue-100",
  activeColour = "bg-blue-300",
  hoverColour = "hover:bg-blue-200",
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  title?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabledColour?: string;
  activeColour?: string;
  hoverColour?: string;
}) => (
  <button
    className={`rounded px-6 py-3 ${
      disabled
        ? `cursor-not-allowed ${disabledColour} text-gray-400`
        : `cursor-pointer ${activeColour} transition-colors ${hoverColour}`
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
