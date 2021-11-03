/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defaultTheme } from "react-native-magnus";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";

export const themeMagnus = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors!,
    ...theme.colors
  },
  fontSize: {
    ...defaultTheme.fontSize,
    ...theme.fontSize
  },
  screenSize: {
    ...theme.screenSize
  },
  spacing: {
    ...defaultTheme.spacing!,
    ...theme.spacing
  },
  shadow: {
    ...defaultTheme.shadow!,
    md: {
      ...theme.shadow
    }
  },
  radius: {
    ...defaultTheme.borderRadius,
    ...theme.radius
  },
  rounded: {
    ...theme.rounded
  }
};
