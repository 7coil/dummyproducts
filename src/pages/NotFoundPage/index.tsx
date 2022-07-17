import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { TextSection } from "../../components/TextSection";

const NotFoundPage = () => (
  <Layout>
    <TextSection>
      <h1>Not Found</h1>
      <p>
        Unfortunately, the content you were looking for does not exist, either
        because it has been moved or because you have accessed a bad link.
      </p>
      <p>
        <Link to="/">Go Home</Link>
      </p>
    </TextSection>
  </Layout>
);

export { NotFoundPage };
