import React, { forwardRef } from "react";
import { Pressable } from "react-native";
import { Button, ButtonProps, Div, TextProps } from "react-native-magnus";
import { LinearGradient } from "expo-linear-gradient";
import { GestureResponderEvent, StyleSheet, View, ActivityIndicator } from "react-native";
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
  loading?: boolean;
};

type SecondaryButtonProps = ButtonProps & {
  children: any;
  onPress?: (event: GestureResponderEvent) => void;
  w?: number | string;
  h?: number | string;
  bgColor?: string;
  color?: string;
  numberOfLines?: number;
  loading?: boolean;
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
  stylesCont,
  loading = false,
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
      <Div
        h={h ?? BUTTON_DIMS.height}
        w={w ?? BUTTON_DIMS.width}
        minW={w ?? BUTTON_DIMS.width}
      >
        <Pressable {...{ onPress }} disabled={disabled} style={styles.btn}>
          {loading ? <ActivityIndicator color={theme.colors.primary400} size="large" /> : getButtonContent(children)}
        </Pressable>
      </Div>
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
  const bgColor = otherProps.disabled ? theme.colors.grey100 : "transparent";
  return (
    <Div
      h={BUTTON_DIMS.height}
      w={w ?? BUTTON_DIMS.width}
      minW={w ?? BUTTON_DIMS.width}
    >
      <Pressable
        {...{ onPress }}
        {...otherProps}
        style={[styles.btn, { backgroundColor: bgColor }]}
      >
        {getButtonContent(children, { color: "black" })}
      </Pressable>
    </Div>
  );
};

export const OutlinedButton = forwardRef(({
  children,
  onPress = noop,
  h = undefined,
  w = undefined,
  bgColor = "transparent",
  color = theme.colors.primary400,
  numberOfLines,
  loading = false,
  ...otherProps
}: SecondaryButtonProps, ref? :any) => {
  const bg = !otherProps.disabled ? bgColor : theme.colors.grey100;
  return (
    <Div
      h={h ?? BUTTON_DIMS.height}
      w={w ?? BUTTON_DIMS.width}
      minW={w ?? BUTTON_DIMS.width}
    >
      <Pressable
        {...{ onPress }}
        style={[
          styles.btn,
          styles.outlinedBtn,
          { backgroundColor: bg, borderColor: color }
        ]}
        {... ref && {ref}}
        {...otherProps}
      >
        {loading ? <ActivityIndicator color={theme.colors.primary400} size="large" /> : getButtonContent(children, { color, numberOfLines })}
      </Pressable>
    </Div>
  );
});

export const LightButton = ({
  children,
  onPress = noop,
  w = undefined,
  bgColor = "transparent",
  color = "black"
}: SecondaryButtonProps) => {
  return (
    <Pressable
      {...{ onPress }}
      style={[styles.lightPadding, { backgroundColor: bgColor }]}
    >
      {getButtonContent(children, { color })}
    </Pressable>
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
  },
  lightPadding: {
    padding: theme.spacing.sm
  },
  btn: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    cursor: 'pointer'
  },
  outlinedBtn: {
    borderWidth: 1,
    borderRadius: 20
  }
});
