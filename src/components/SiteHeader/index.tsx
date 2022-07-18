import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container } from "../Container";

const SiteHeader = () => (
  <div className="bg-white bg-gray-100 py-4 drop-shadow">
    <Container>
      <div className="flex flex-wrap">
        <Link to="/">
          <span className="font-semibold">Company XYZ Product Database</span>
        </Link>

        <div className="ml-auto flex gap-6">
          <Link to="/products">All Products</Link>
          <span>Example Link 2</span>
          <span>Example Link 3</span>
        </div>
      </div>
    </Container>
  </div>
);

export { SiteHeader };
