import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container } from "../Container";

const SiteHeader = () => (
  <div className="bg-white bg-gray-100 py-2 drop-shadow">
    <Container>
      <div className="flex flex-wrap">
        <Link to="/">Company XYZ Product Database</Link>

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
