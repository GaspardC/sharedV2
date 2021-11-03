import React from "react";
import {
  Button,
  ButtonProps as NativeButtonProps,
  MenuButton as NavtiveMenuButton,
  IconButton,
  IconButtonProps
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { forwardRef } from "react";

export type ButtonProps = NativeButtonProps & { "data-cy"?: string };

export const DEFAULT_BTN_STYLE = {
  h: 8,
  p: 2,
  fontSize: 16,
  borderRadius: 8 * 2
};

const BTN_WIDTH = 200;

export const OutlineButton = forwardRef(
  ({ children, onClick, w, ...otherProps }: ButtonProps, ref) => {
    return (
      <Button
        {...DEFAULT_BTN_STYLE}
        colorScheme="primary"
        variant="outline"
        // mr={2}
        onClick={onClick}
        w={w ?? `${BTN_WIDTH}px`}
        {...(!otherProps.disabled && { _hover: { transform: "scale(1.05)" } })}
        {...otherProps}
      >
        {children}
      </Button>
    );
  }
);
export const FullButton = ({
  children,
  onClick,
  ...otherProps
}: ButtonProps) => (
  <Button
    {...DEFAULT_BTN_STYLE}
    colorScheme="primary"
    onClick={onClick}
    {...otherProps}
  >
    {children}
  </Button>
);

export const wihtoutFocusStyledStr = `
  &:focus{
      outline:none !important;
      box-shadow: none !important;
  }
  &:focus {outline:none!important;}
  &::-moz-focus-inner {border:0!important;}
  outline: none !important;
`;

export const ButtonWithoutFocus = styled(Button)<ButtonProps>`
  ${wihtoutFocusStyledStr}
`;

export const IconButtonWithoutFocus = styled(IconButton)<IconButtonProps>`
  ${wihtoutFocusStyledStr}
`;

const bgTransparent = { bg: "transparent" };
export const GohstButton = (props: ButtonProps) => (
  <Button
    {...DEFAULT_BTN_STYLE}
    m={0}
    p={0}
    {...bgTransparent}
    _hover={bgTransparent}
    _focus={bgTransparent}
    _active={bgTransparent}
    border="none"
    {...props}
  ></Button>
);

export const MenuButton = (props: ButtonProps) => (
  <NavtiveMenuButton {...DEFAULT_BTN_STYLE} {...props} />
);
