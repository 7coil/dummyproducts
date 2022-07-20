import React from "react";
import { Button, RedButton } from ".";

export default {
  title: "Button",
  component: Button,
  subcomponents: { RedButton },
};

export const Default = ({ disabled }) => (
  <Button disabled={disabled}>Button</Button>
);

export const Red = () => <RedButton>Button</RedButton>;
