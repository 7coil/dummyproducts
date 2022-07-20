import React from "react";
import { ButtonGroup } from ".";
import { Button, RedButton } from "../Button";

export default {
  title: "ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    centre: {
      title: "Centre align",
      type: {
        name: "boolean",
        required: false,
      },
      defaultValue: false,
      description:
        "Whether to justify the collection of buttons horizontally to the centre.",
      control: {
        type: "boolean",
      },
    },
  },
};

export const Default = ({ centre }) => (
  <ButtonGroup centre={centre}>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </ButtonGroup>
);
