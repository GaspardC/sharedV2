import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { ThemeProvider as EmotionTheme } from "@emotion/react";
import { theme } from "@my-monorepo/shared-local";

const ThemeProviderWrapper = ({ children }) => (
  <ChakraProvider theme={theme}>
    <EmotionTheme theme={theme}>
      {children}
      <CSSReset />
    </EmotionTheme>
  </ChakraProvider>
);

export default ThemeProviderWrapper;
