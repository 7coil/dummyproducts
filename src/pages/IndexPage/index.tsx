import { marked } from "marked";
import { Link } from "react-router-dom";
import readme from "../../../README.md";
import { Button } from "../../components/Button";
import { ButtonGroup } from "../../components/ButtonGroup";
import { HeroSection } from "../../components/HeroSection";
import { Layout } from "../../components/Layout";
import { TextSection } from "../../components/TextSection";
import React from "react";

const IndexPage = () => (
  <Layout>
    <HeroSection
      title="Company XYZ Product Database"
      subtitle="Insert a catchy database subtitle here!"
    >
      <ButtonGroup centre>
        <Link to="/products">
          <Button>All Products</Button>
        </Link>
      </ButtonGroup>
    </HeroSection>
    <TextSection>
      <div dangerouslySetInnerHTML={{ __html: marked.parse(readme) }} />
    </TextSection>
  </Layout>
);

export { IndexPage };
