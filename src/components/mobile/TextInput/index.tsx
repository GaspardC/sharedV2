import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps as RTextInputProps,
} from "react-native";
import { Div } from "react-native-magnus";
import { theme, FONTS } from "@my-monorepo/shared-local/src/theme/mobile";
import { isWeb } from "@my-monorepo/shared/src/utils";
import Text from "../Texts";

type TextInputProps = Omit<RTextInputProps, "onChange"> &
  Partial<{
    small: boolean;
    label: string;
    topLabel?: boolean;
    type: RTextInputProps["keyboardType"];
    icon;
    onChange: RTextInputProps["onChangeText"];
  }>;
const Input = React.forwardRef((props: TextInputProps, ref: any) => {
  const {
    value,
    onChange,
    defaultValue,
    placeholder,
    small,
    topLabel = false,
    label,
    type = "default",
    icon,
    multiline = false,
    onBlur,
    onFocus,
    secureTextEntry,
    ...otherProps
  } = props;

  return (
    <Div
      row={!topLabel}
      justifyContent={label ? "space-between" : "flex-start"}
    >
      {label || topLabel ? (
        <Div
          pr={topLabel ? 0 : 8}
          style={{ height: topLabel ? 20 : small ? 30 : 40 }}
        >
          <Text
            fontFamily={
              topLabel ? FONTS.Montserrat_700Bold : FONTS.Montserrat_500Medium
            }
            style={topLabel ? styles.topLabel : styles.label}
          >
            {label}
          </Text>
        </Div>
      ) : null}
      <TextInput
        {...otherProps}
        data-focusvisible-polyfill={false}
        style={[
          styles.input,
          small
            ? { width: 50, height: 20, textAlign: "center" }
            : { width: icon ? "90%" : "100%", height: multiline ? 100 : 40 },
          multiline ? styles.multiline : {},
        ]}
        keyboardType={type}
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChange}
        placeholder={placeholder}
        multiline={multiline}
        ref={ref}
        {...(onBlur && { onBlur })}
        {...(onFocus && { onFocus })}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {icon}
    </Div>
  );
});

export default Input;

const styles = StyleSheet.create({
  input: {
    fontWeight: "bold",
    color: theme.colors.primary400,
    fontFamily: FONTS.Montserrat_500Medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary400,
    fontSize: theme.fontSize.medium,
    ...(isWeb() && { outlineWidth: 0 }),
  },
  label: {
    fontSize: theme.fontSize.medium,
  },
  topLabel: {
    fontSize: theme.fontSize.xsmall,
    fontWeight: "800",
  },
  multiline: {
    borderWidth: 1,
    borderColor: theme.colors.primary400,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    paddingTop: theme.spacing.md,
  },
});
