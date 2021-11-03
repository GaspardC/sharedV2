import React from "react";
import { Div } from "../magnus/Div";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";
import { ActivityIndicator } from "react-native";
import { DivProps } from "react-native-magnus";
import { Subtitle } from "../Texts";

export const AbsoluteLoader = ({
  containerProps,
  children,
  title
}: {
  containerProps?: DivProps;
  children?;
  title?: string;
}) => (
  <Div
    position="absolute"
    top={0}
    bottom={0}
    left={0}
    right={0}
    alignItems="center"
    justifyContent="center"
    w="100%"
    h="100%"
    bg={theme.colors.white}
    {...containerProps}
  >
    <ActivityIndicator color={theme.colors.primary400} size="large" />
    {children && children}
    {title && <Subtitle>{title}</Subtitle>}
  </Div>
);
