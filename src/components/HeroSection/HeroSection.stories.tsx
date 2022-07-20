import React from "react";
import { HeroSection } from ".";

export default {
  title: "HeroSection",
  component: HeroSection,
  argTypes: {
    title: {
      control: "text",
      defaultValue: "Hero Section Title",
    },
    subtitle: {
      control: "text",
      defaultValue:
        "Imagine all of the headlines you can place in this Hero Section!",
    },
  },
};

export const Default = ({ title, subtitle }) => (
  <HeroSection title={title} subtitle={subtitle}>
    <p>This paragraph is an example of the Hero Section children.</p>
  </HeroSection>
);
