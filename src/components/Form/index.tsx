import React, { ReactNode } from "react";

const Form = ({ children }: { children: ReactNode }) => (
  <div
    className="grid grid-cols-1 gap-2 sm:grid-cols-2
  lg:grid-cols-4"
  >
    {children}
  </div>
);
const FormColumn = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col">{children}</div>
);
const FormRow = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-2">{children}</div>
);

export { Form, FormColumn, FormRow };
