import React from "react";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Terms = ({ to }: { to?: string }) => (
  <Text>
    I accept the{" "}
    <Link to={to}>
      <Text as="u">Terms and condition</Text>
    </Link>{" "}
  </Text>
);
export default Terms;
