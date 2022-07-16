import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => (
  <div className="max-w-screen-xl w-full px-4 mx-auto">
    { children }
  </div>
)

export { Container }
