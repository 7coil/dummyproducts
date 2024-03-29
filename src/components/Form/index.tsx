import React, { ReactNode } from "react";

const Form = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <form className={`flex flex-col gap-6 md:flex-row ${className}`}>
    {children}
  </form>
);
const FormColumn = ({
  children,
  gap = false,
}: {
  children: ReactNode;
  gap?: boolean;
}) => (
  <div className={`flex flex-grow flex-col ${gap ? "gap-3" : ""}`}>
    {children}
  </div>
);
const FormRow = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-2">{children}</div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="h-10 rounded bg-blue-200 px-6" />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className="h-10 rounded bg-blue-200 px-6" />
);

export { Form, FormColumn, FormRow, Input, Select };
