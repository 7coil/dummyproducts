import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <main className="flex-grow">{children}</main>
);

export { Layout };
