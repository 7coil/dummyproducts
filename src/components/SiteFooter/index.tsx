import React from "react";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { Container } from "../Container";

const SiteFooter = () => (
  <div className="bg-gray-200 py-6 text-center drop-shadow">
    <Container>
      <p>
        Copyright (c) "Example Company XYZ" {new Date().getFullYear()}
        <br />
        All rights reserved.
      </p>
      <ButtonGroup centre>
        <Button>Support Desk</Button>
        <Button>Staff Intranet</Button>
        <Button>Corporate Relations</Button>
      </ButtonGroup>
    </Container>
  </div>
);

export { SiteFooter };
