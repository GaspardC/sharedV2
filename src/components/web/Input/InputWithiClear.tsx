import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";
import { CloseIcon } from "@chakra-ui/icons";
import {
  InputProps,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  InputGroupProps,
  InputLeftElement,
  ResponsiveValue,
} from "@chakra-ui/react";
import Text from "@my-monorepo/shared/src/components/web/base/text";
import { wihtoutFocusStyledStr } from "../button";

export default React.forwardRef(
  (
    {
      value = "",
      textAlign = "left",
      groupProps,
      clearIcon = false,
      hasError = "",
      hasValidaton = true,
      ...props
    }: InputProps & {
      groupProps?: InputGroupProps;
      clearIcon?: boolean;
      hasError?: string;
      hasValidaton?: boolean; // formik validaton
    },
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const [innerValue, setInnerValue] = useState(value);
    const innerOnChange = (e) => {
      const v = e.target.value;
      setInnerValue(v);
      if (props?.onChange) props.onChange(e);
    };
    const displayClearIcon = clearIcon && innerValue && innerValue !== "";

    const closeIcon = (
      <CloseIcon
        w={3}
        h={3}
        onClick={() => innerOnChange({ target: { value: "" } })}
        color="grey.400"
      />
    );

    const getCloseIcon = (textAlign: InputProps["textAlign"]) => {
      return textAlign === "left" ? (
        <InputRightElement>{closeIcon}</InputRightElement>
      ) : (
        <InputLeftElement>{closeIcon}</InputLeftElement>
      );
    };

    const Container = hasValidaton ? Box : Fragment;
    return (
      <Container>
        <InputGroup {...groupProps}>
          {displayClearIcon && getCloseIcon(textAlign)}
          <InputWithoutFocus
            ref={ref}
            value={innerValue}
            {...props}
            onChange={innerOnChange}
            textAlign={textAlign}
          />
        </InputGroup>
        {hasError && hasError !== "" && (
          <Text mt={2} color="accent.500" fontSize="sm">
            {hasError}
          </Text>
        )}
      </Container>
    );
  }
);

export const InputWithoutFocus = styled(Input)<InputProps>`
  ${wihtoutFocusStyledStr}
`;
