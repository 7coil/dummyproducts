import React, { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }) => (
  <div className="bg-blue-300 px-6 py-3">{children}</div>
);

export { Button };
