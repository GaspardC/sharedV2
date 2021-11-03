import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

const ShadowBox = ({ children, ...otherProps }: FlexProps) => (
  <Flex
    position="relative"
    direction="column"
    justify="center"
    align="center"
    p="4"
    bg="white"
    boxShadow="0px 10px 30px 0px rgba(0,0,0,0.1)"
    {...otherProps}
  >
    {children}
  </Flex>
);
export default ShadowBox;
