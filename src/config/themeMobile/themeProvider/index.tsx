import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MagnusThemeProvider } from "react-native-magnus";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider as EmotionTheme } from "@emotion/react";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";
import { theme as globalTheme} from "@my-monorepo/shared-local";
import { themeMagnus } from "../themeMagnus";
import { StatusBar } from "expo-status-bar";

const ThemeProvider = ({ children }: { children: any }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <MagnusThemeProvider theme={themeMagnus}>
        <ChakraProvider theme={globalTheme}>
          <EmotionTheme theme={globalTheme}>
            <StatusBar style="auto" />
            {children}
          </EmotionTheme>
        </ChakraProvider>
      </MagnusThemeProvider>
    </StyledThemeProvider>
  );
};
export default ThemeProvider;
