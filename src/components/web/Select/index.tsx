import React from "react";
import { Select as SelectC, SelectProps } from "@chakra-ui/react";
import { DEFAULT_BTN_STYLE } from "@my-monorepo/shared/src/components/web/button";

const SCHEME_COLOR = "secondary";
const COLOR = `${SCHEME_COLOR}.600`;
const BORDER_COLOR = `${SCHEME_COLOR}.100`;
const BG_COLOR_HOVER = "#E1EEFF";
const Select = (props: SelectProps) => (
  <SelectC
    {...DEFAULT_BTN_STYLE}
    px={0}
    w={200}
    size="md"
    _hover={{ backgroundColor: BG_COLOR_HOVER }}
    borderColor={BORDER_COLOR}
    color={COLOR}
    fontSize={16}
    fontWeight="600"
    borderWidth={1}
    {...props}
  />
);

export default Select;
