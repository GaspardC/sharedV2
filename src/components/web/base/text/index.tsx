import React, { forwardRef } from "react";
import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
  BoxProps as ChakraBoxProps
} from "@chakra-ui/react";
import colors  from "@my-monorepo/shared-local/src/theme/web/colors";

const textColor = colors.textRaw;
interface TextProps extends ChakraTextProps {
  text?: string;
}
const Text = forwardRef(({ children, ...props }: TextProps, ref: any) => (
  <ChakraText ref={ref} fontSize={["sm", "md"]} color={textColor} {...props}>
    {props.text && typeof props.text === "string" ? props.text : children}
  </ChakraText>
));
export default Text;

export const Title = forwardRef(({ children, ...props }: TextProps, ref) => (
  <Text
    ref={ref}
    fontSize={["md", "lg"]}
    fontWeight="600"
    color={textColor}
    {...props}
  >
    {children}
  </Text>
));
