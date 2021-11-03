import { MenuList } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const MenuListOverflow = styled(MenuList)`
  .chakra-menu__group {
    max-height: 70vh;
    overflow-y: auto;
  }
`