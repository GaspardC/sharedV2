import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";
import { Text as TextM, Div, TextProps } from "react-native-magnus";
import { theme, FONTS } from "@my-monorepo/shared-local/src/theme/mobile";

const Text: React.FC<Omit<TextProps, "style"> & { style?: any }> = ({
  fontFamily = FONTS.Montserrat_700Bold,
  style,
  ...otherProps
}) => {
  const dynamicStyle = StyleSheet.create({
    magnusTextProps: {
      fontFamily,
      fontSize: theme.fontSize.xsmall
    }
  });
  const combineStyles = StyleSheet.flatten([
    dynamicStyle.magnusTextProps,
    style
  ]);

  return (
    <TextM
      style={combineStyles}
      {...otherProps}
      {...(!fontFamily && { fontFamily })}
    />
  );
};
export default Text;

export const Title: React.FC<TextProps & {margin?}> = ({ style, margin, ...otherProps }) => {
  const combineStyles = StyleSheet.flatten([styles.title, style]);
  return (
    <Div py={margin ?? theme.spacing.md}>
      <Text style={combineStyles} {...otherProps} />
    </Div>
  );
};

export const Subtitle: React.FC<TextProps> = ({
  style,
  ...otherProps
}: any) => {
  const combineStyles = StyleSheet.flatten([styles.subtitle, style]);
  return (
    <Div py={theme.spacing.md}>
      <Text style={combineStyles} {...otherProps} />
    </Div>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSize.large,
    textAlign: "center"
  },
  subtitle: {
    fontSize: theme.fontSize.medium
  }
});
