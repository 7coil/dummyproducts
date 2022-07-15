import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader";
import { IndexPage } from "./pages/IndexPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const App = () => (
  <HashRouter>
    <SiteHeader />
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);

export { App };
