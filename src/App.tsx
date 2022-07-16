import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { IndexPage } from "./pages/IndexPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const App = () => (
  <HashRouter>
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </div>
  </HashRouter>
);

export { App };
