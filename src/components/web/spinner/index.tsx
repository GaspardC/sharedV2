import React from "react";
import { Spinner as ChakraSPinner, Box, BoxProps } from "@chakra-ui/react";

const Spinner = (props: BoxProps) => {
  return (
    <Box
      flex="1"
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100vw"
      {...props}
    >
      <ChakraSPinner color="quartiary.400" m={4} size="xl" />
    </Box>
  );
};
export default Spinner;
