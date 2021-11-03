import React from 'react'
import { forwardRef } from 'react';
import {
  Flex,
  BoxProps as NativeBoxProps,
  FlexProps as NativeFlexProps,
} from '@chakra-ui/react';

export const Col = ({ children, ...props }: FlexProps) => (
  <Flex flex={1} direction="column" align="center" {...props}>
    {children}
  </Flex>
);
export const Row = ({ children, ...props }: FlexProps) => (
  <Flex direction="row" justify="center" {...props}>
    {children}
  </Flex>
);
export const RowWrap = forwardRef(
  ({ children, ...props }: FlexProps, ref: any) => (
    <Flex
      ref={ref}
      direction="row"
      justify="center"
      maxWidth="100%"
      wrap="wrap"
      {...props}
    >
      {children}
    </Flex>
  ),
);

export type BoxProps = NativeBoxProps & { 'data-cy'?: string };
export type FlexProps = NativeFlexProps & { 'data-cy'?: string };
