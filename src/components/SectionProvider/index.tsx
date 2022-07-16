import React, { ReactNode, HTMLAttributes } from 'react';

const SectionProvider = ({ children, ...props }: { children: ReactNode } | HTMLAttributes<HTMLDivElement>) => (
  <section {...props}>
    { children }
  </section>
)

export { SectionProvider }
