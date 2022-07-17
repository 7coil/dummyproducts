import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto w-full max-w-screen-xl px-4">{children}</div>
);

export { Container };
