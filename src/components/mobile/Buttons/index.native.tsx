import React from "react";
import { Button, ButtonProps, TextProps } from "react-native-magnus";
import { LinearGradient } from "expo-linear-gradient";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";
import Text from "../Texts";
import { noop } from "../../../utils";

export const BUTTON_DIMS = {
  width: "100%",
  height: 60
};

const BUTTON_PHOTO_DIM = {
  dim: 80
};

type PrimaryButtonProps = ButtonProps & {
  children: any;
  onPress?: (event: GestureResponderEvent) => void;
  w?: number;
  h?: number;
  colorStart?: string;
  colorEnd?: string;
  disabled?: boolean;
  stylesCont?;
};

type SecondaryButtonProps = ButtonProps & {
  children: any;
  onPress?: (event: GestureResponderEvent) => void;
  w?: number;
  h?: number;
  bgColor?: string;
  color?: string;
  numberOfLines?: number;
};

type PhotoButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
  dim?: number;
  colorStart?: string;
  colorEnd?: string;
};

const getButtonContent = (children: any, otherProps?: any) => {
  return typeof children === "string" ? (
    <TextButton {...otherProps}>{children}</TextButton>
  ) : (
    children
  );
};
const PrimaryButton = ({
  children,
  onPress = noop,
  w = undefined,
  h = undefined,
  colorStart = colors.primary400,
  colorEnd = colors.primary600,
  disabled = false,
  stylesCont
}: PrimaryButtonProps) => {
  return (
    <LinearGradient
      style={[
        styles.gradientContainer,
        {
          backgroundColor: colors.primary400,
          width: w ?? BUTTON_DIMS.width,
          minWidth: w ?? BUTTON_DIMS.width,
          height: h ?? BUTTON_DIMS.height,
          minHeight: h ?? BUTTON_DIMS.height
        },
        stylesCont
      ]}
      colors={[colorStart, disabled ? theme.colors.grey100 : colorEnd]}
      start={[0.1, 50]}
      end={[0.9, 50]}
    >
      <Button
        bg="transparent"
        {...{ onPress }}
        py="sm"
        px="sm"
        h={h ?? BUTTON_DIMS.height}
        w={w ?? BUTTON_DIMS.width}
        minW={w ?? BUTTON_DIMS.width}
        disabled={disabled}
        loaderColor={theme.colors.primary400}
      >
        {getButtonContent(children)}
      </Button>
    </LinearGradient>
  );
};

export default PrimaryButton;

export const SecondaryButton = ({
  children,
  onPress = noop,
  w = undefined,
  ...otherProps
}: SecondaryButtonProps) => {
  return (
    <Button
      bg="transparent"
      {...{ onPress }}
      py="sm"
      px="sm"
      h={BUTTON_DIMS.height}
      w={w ?? BUTTON_DIMS.width}
      minW={w ?? BUTTON_DIMS.width}
      {...otherProps}
      {...(otherProps.disabled && { bg: theme.colors.grey100 })}
      loaderColor={theme.colors.primary400}
    >
      {getButtonContent(children, { color: "black" })}
    </Button>
  );
};

export const OutlinedButton = ({
  children,
  onPress = noop,
  h = undefined,
  w = undefined,
  bgColor = "transparent",
  color = theme.colors.primary400,
  numberOfLines,
  ...otherProps
}: SecondaryButtonProps) => {
  return (
    <Button
      bg={!otherProps.disabled ? bgColor : theme.colors.grey100}
      {...{ onPress }}
      py="sm"
      px="sm"
      h={h ?? BUTTON_DIMS.height}
      w={w ?? BUTTON_DIMS.width}
      minW={w ?? BUTTON_DIMS.width}
      borderWidth={1}
      borderColor={color}
      rounded="xl"
      loaderColor={theme.colors.primary400}
      loaderSize='lg'
      {...otherProps}
    >
      {getButtonContent(children, { color, numberOfLines })}
    </Button>
  );
};

export const LightButton = ({
  children,
  onPress = noop,
  w = undefined,
  bgColor = "transparent",
  color = "black"
}: SecondaryButtonProps) => {
  return (
    <Button bg={bgColor} {...{ onPress }} py="sm" px="sm">
      {getButtonContent(children, { color })}
    </Button>
  );
};

export const PhotoButton = ({
  onPress = noop,
  dim = undefined,
  colorStart = colors.primary400,
  colorEnd = colors.primary600
}: PhotoButtonProps) => {
  const dimInside = dim ? dim - 14 : BUTTON_PHOTO_DIM.dim - 14;
  return (
    <LinearGradient
      style={[
        styles.gradientContainer,
        styles.buttonGradient,
        {
          backgroundColor: colors.primary400,
          width: dim ?? BUTTON_PHOTO_DIM.dim,
          height: dim ?? BUTTON_PHOTO_DIM.dim,
          borderRadius: dim ? dim / 2 : BUTTON_PHOTO_DIM.dim / 2
        }
      ]}
      colors={[colorStart, colorEnd]}
      start={[0.1, 50]}
      end={[0.9, 50]}
    >
      <View
        style={{
          width: dimInside,
          height: dimInside,
          borderRadius: dimInside / 2,
          backgroundColor: theme.colors.primary100
        }}
      >
        <Button
          bg="transparent"
          {...{ onPress }}
          py="sm"
          px="sm"
          h={dim ?? BUTTON_PHOTO_DIM.dim - 5}
          w={dim ?? BUTTON_PHOTO_DIM.dim}
        />
      </View>
    </LinearGradient>
  );
};

export const TextButton = (textProps: any) => {
  return (
    <Text
      style={{ fontSize: theme.fontSize.medium }}
      color="white"
      {...textProps}
    />
  );
};

const { colors, radius, shadow } = theme;

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: radius.lg,
    shadowColor: shadow.shadowColor,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: BUTTON_DIMS.width,
    height: BUTTON_DIMS.height
  },
  textColor: {
    color: colors.white
  },
  textSize: {
    fontSize: theme.fontSize.medium
  },
  buttonGradient: {
    alignItems: "center",
    justifyContent: "center"
  }
});
