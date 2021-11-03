import React, { Fragment } from "react";
import styled from "@emotion/styled/macro";
import {
  Box,
  BoxProps,
  IconProps,
  Text,
  Icon as ChakraIcon,
  LinkProps,
} from "@chakra-ui/react";
import { transition } from "@my-monorepo/shared-local/src";
import { Row } from "@my-monorepo/shared/src/components/web/base";
import customIcons from "@my-monorepo/shared/src/config/theme/customIcons";
import { themeGet } from "@styled-system/theme-get";
import { Link } from "react-router-dom";
import { CY_SIDE_NAV_HOME, CY_ARROW_NAV } from "../ids.test";
import useWindowSize from "../../../../hooks/useWindowsDimensions";

const IconNav = ({
  iconName,
  linkName,
  onClick,
  selected = true,
  isOpen,
  bottom = false,
  routePath,
  nativeIcon,
}: any) => {
  const isArrow = iconName?.includes("arrow");
  const arrowStyle = {
    width: "100%",
    ...(selected && { justify: "flex-end", right: 6 }),
  };
  const datacy = routePath?.replace("/", "")
    ? routePath?.replace("/", "")
    : isArrow
    ? CY_ARROW_NAV
    : CY_SIDE_NAV_HOME;
  const icon = customIcons[iconName];
  const windowsSize = useWindowSize();

  const color = `${selected ? "white" : "primary.100"}`;

  const LikCont: <S = any>(
    props: LinkProps & React.RefAttributes<HTMLAnchorElement>
  ) => React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null = onClick ? Fragment : Link;
  return (
    <IconContainer
      position="relative"
      h={10}
      w="100%"
      display="flex"
      justify="center"
      align="center"
      {...{ onClick, "data-cy": datacy }}
      {...(!isOpen && { w: windowsSize.sideBarWidth })}
      {...(isArrow && { ...arrowStyle, isOpen })}
      {...(bottom && { position: "absolute", bottom })}
    >
      <HoveredIndicator {...{ isOpen }} />
      <LikCont
        {...(!onClick && {
          to: routePath,
          ...(!isOpen && {
            style: { width: "100%", textAlign: isOpen ? "start" : "center" },
          }),
        })}
      >
        <Icon
          name={iconName}
          my="4"
          {...(!nativeIcon && { viewBox: icon?.viewBox })}
          {...(nativeIcon && { as: nativeIcon })}
          {...{ isOpen, color }}
        >
          {!nativeIcon && icon?.path}
        </Icon>
      </LikCont>
      {linkName && (
        <IconLinkName {...{ isOpen, color }}>
          <LikCont {...(!onClick && { to: routePath })}>{linkName} </LikCont>
        </IconLinkName>
      )}
    </IconContainer>
  );
};
export default IconNav;

const IconContainer = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isOpen, ...otherProps }) => <Row {...otherProps} />
)<{ isOpen: boolean }>`
  svg {
    ${({ isOpen }) =>
      `transform: ${isOpen ? "rotate(180deg)" : "rotate(0deg)"};`}
  }
`;
const IconLinkName = styled<React.FC<BoxProps & { isOpen: boolean }>>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isOpen, ...otherProps }) => <Text {...otherProps} />
)`
  a {
    display: inline-block;
    width: 100%;
  }
  opacity: 0;
  display: inline-block;
  width: 0%;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  ${transition};
  ${({ isOpen }) =>
    isOpen
      ? `
text-align: start;
opacity: 1;
width: 100%;
margin-left: 16px;`
      : ";"}

  ${IconContainer}:hover & {
    color: ${themeGet("colors.grey.50")};
  }
`;

const HoveredIndicator = styled<React.FC<BoxProps & { isOpen: boolean }>>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isOpen, ...otherProps }) => <Box {...otherProps} />
)`
  position: absolute;
  width: 2px;
  height: 60%;
  ${transition};
  background-color: transparent;
  ${({ isOpen }) => `left: ${isOpen ? "-12px" : "0px"};`}

  ${IconContainer}:hover & {
    background-color: white;
  }
`;

const Icon = styled<React.FC<IconProps & { isOpen: boolean }>>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isOpen, ...otherProps }) => <ChakraIcon {...otherProps} />
)`
  ${transition};
  ${IconContainer}:hover & {
    color: ${themeGet("colors.grey.50")};
  }
  ${({ isOpen }) => `margin-left: ${!isOpen ? "0px" : "0.4rem"};`}
`;
