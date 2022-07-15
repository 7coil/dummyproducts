import React, { ReactNode } from "react";

const SiteHeader = () => (
  <div className="flex bg-white drop-shadow">
    <span>Company XYZ</span>

    <div className="ml-auto flex gap-2">
      <span>Example Link 1</span>
      <span>Example Link 2</span>
      <span>Example Link 3</span>
    </div>
  </div>
);

export { SiteHeader };
