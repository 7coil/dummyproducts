import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

interface ColouredButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  title?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

interface UncolouredButtonProps extends ColouredButtonProps {
  disabledColour?: string;
  activeColour?: string;
  hoverColour?: string;
}

const Button = ({
  children,
  onClick,
  disabled,
  title = "",
  type,
  disabledColour = "bg-blue-100",
  activeColour = "bg-blue-300",
  hoverColour = "hover:bg-blue-200",
}: UncolouredButtonProps) => (
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

const RedButton = (props: ColouredButtonProps) => (
  <Button
    activeColour="bg-red-300"
    hoverColour="hover:bg-red-200"
    disabledColour="bg-gray-100"
    {...props}
  />
);

export { Button, RedButton };
