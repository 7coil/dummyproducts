import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { DefaultSEO } from "./components/SEO";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { IndexPage } from "./pages/IndexPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductsPage } from "./pages/ProductsPage";

const App = () => (
  <HashRouter>
    <DefaultSEO />
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="/products/" element={<ProductsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </div>
  </HashRouter>
);

export { App };
