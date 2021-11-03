import React from 'react';
import { RiMenu2Line, RiCloseLine } from "react-icons/ri";
import { Box } from '@chakra-ui/react';

const MenuIcon = ({ isOpen, ...otherProps }) => <Box position="relative" {...otherProps}>
    <Box as={isOpen ? RiCloseLine : RiMenu2Line} boxSize="32px" color="sidebarRaw" position="absolute" top="4" left="16" />
</Box>
export default MenuIcon