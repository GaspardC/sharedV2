import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MagnusThemeProvider } from "react-native-magnus";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";
import { themeMagnus } from "../themeMagnus";
import { StatusBar } from "expo-status-bar";

const ThemeProvider = ({ children }: { children: any }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <MagnusThemeProvider theme={themeMagnus}>
        <StatusBar style="auto" />
        {children}
      </MagnusThemeProvider>
    </StyledThemeProvider>
  );
};
export default ThemeProvider;
