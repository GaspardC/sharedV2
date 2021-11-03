import { isIos } from "@my-monorepo/shared/src/utils";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

const KeyboardAvoidingViewWrapper: React.FC<any> = ({
  children,
  style,
}: {
  children: JSX.Element;
  style?: any;
}) => {
  return (
    <KeyboardAvoidingView
      behavior={isIos() ? "padding" : "position"}
      {...(style && { style })}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingViewWrapper;
