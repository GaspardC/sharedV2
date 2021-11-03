import React from "react";
// import styled from "@emotion/styled/macro";
import styled from "@emotion/styled";
import Text from "@my-monorepo/shared/src/components/web/base/text";
import { Box, BoxProps, Flex, Fade } from "@chakra-ui/react";
import { transitions } from "@my-monorepo/shared-local";

const LogoWrapper = ({ me, isOpen = false, logo, ...otherProps }) => {
  return (
    <Flex
      direction="row"
      justify="flex-start"
      align="center"
      {...otherProps}
      width="100%"
      height="8"
    >
      <Logo {...{ isOpen, logo }} />
      {isOpen && me && (
        <Fade in={isOpen}>
          <Text opacity="0.5" ml={2} color="white">
            {me?.username}
          </Text>
        </Fade>
      )}
    </Flex>
  );
};

// const logo = require("@my-monorepo/shared-local/src/assets/logo.png");
const Logo = styled<React.FC<BoxProps & { isOpen: boolean; logo: string }>>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isOpen, logo, ...otherProps }) => <Box {...otherProps} />
)`
  filter: grayscale(100%) opacity(1);
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  width: 100%;
  height: 100%;
  ${transitions};
  ${({ isOpen }) => `transform: ${isOpen ? "rotate(90deg)" : "rotate(0deg)"};`}
  ${({ logo }) => `background-image: url(${logo});
  `}
  ${({ isOpen }) =>
    isOpen
      ? `
width: 20%;
margin-top: 10px;
filter: grayscale(50%) opacity(1);
margin-bottom: 0px;`
      : ""}
`;

export default LogoWrapper;
