import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

import { FiFilter } from "react-icons/fi";

const Icons = (iconProps?: IconProps) => (
  <Icon mx={2} {...iconProps} color="secondary.600" as={FiFilter} />
);
export default Icons;
