import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title }: { title?: string }) => <Helmet title={title}></Helmet>;

const DefaultSEO = () => (
  <Helmet defaultTitle="Company XYZ" titleTemplate="%s - Company XYZ"></Helmet>
);

export { SEO, DefaultSEO };
