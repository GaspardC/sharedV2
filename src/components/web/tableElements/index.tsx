/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@emotion/react";

import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

const PX = 2;
const PY = 0;
/**
 * The style of this component is inspired by Tailwind UI.
 * @see https://tailwindui.com/components/application-ui/tables/wide
 */

/**
 * Represents tabular data - that is, information presented in a
 * two-dimensional table comprised of rows and columns of cells containing
 * data. It renders a `<table>` HTML element.
 */
export function Table(props: BoxProps & { headerSticky?: boolean }) {
  const { headerSticky, ...boxProps } = props;
  return (
    <Box
      shadow="md"
      rounded="lg"
      width="100%"
      overflowX="scroll"
      css={css`
        scrollbar-width: none;
      `}
    >
      <Box
        as="table"
        width="100%"
        {...boxProps}
        {...(headerSticky && {
          display: "block",
          maxHeight: "100vh",
          overflowY: "auto",
          minW: "100%"
        })}
      />
    </Box>
  );
}

/**
 * Defines a set of rows defining the head of the columns of the table. It
 * renders a `<thead>` HTML element.
 */
export function TableHead(props: BoxProps) {
  return <Box as="thead" {...props} />;
}

/**
 * Defines a row of cells in a table. The row's cells can then be established
 * using a mix of `TableCell` and `TableHeader` elements. It renders a `<tr>`
 * HTML element.
 */
export function TableRow(props: BoxProps) {
  return <Box as="tr" {...props} />;
}

/**
 * Defines a cell as header of a group of table cells. It renders a `<th>` HTML
 * element.
 */
export function TableHeader(props: BoxProps & { headerSticky?: boolean }) {
  const { headerSticky, ...otherProps } = props;
  return (
    <Box
      as="th"
      px={PX}
      py={PY + 2}
      borderBottomWidth="1px"
      backgroundColor="grey.50"
      textAlign="left"
      fontSize="xs"
      color="grey.500"
      textTransform="uppercase"
      letterSpacing="wider"
      lineHeight="1rem"
      fontWeight="large"
      {...(headerSticky && {
        position: "sticky",
        top: 0,
        opacity: 1,
        zIndex: 1
      })}
      {...otherProps}
    />
  );
}

/**
 * Encapsulates a set of table rows, indicating that they comprise the body of
 * the table. It renders a `<tbody>` HTML element.
 */
export function TableBody(props: BoxProps) {
  return <Box as="tbody" {...props} />;
}

/**
 * Defines a cell of a table that contains data. It renders a `<td>` HTML
 * element.
 */
export function TableCell(props: BoxProps) {
  return (
    <Box
      as="td"
      px={PX}
      py={PY}
      fontSize="0.875rem"
      // lineHeight="1.25rem"
      whiteSpace="nowrap"
      {...props}
    />
  );
}
