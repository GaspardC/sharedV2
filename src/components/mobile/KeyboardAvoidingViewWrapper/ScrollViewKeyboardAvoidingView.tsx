import React from "react";
import { ScrollView } from "react-native";
import KeyboardAvoidingViewWrapper from "./index";
import { Div } from "react-native-magnus";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";
const ScrollViewKeyboardAvoidingView: React.FC<any> = ({ children }) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingViewWrapper>
        <Div
          flex={1}
          pt={20}
          m={theme.spacing.md}
          bg={theme.colors.transparent}
        >
          {children}
        </Div>
      </KeyboardAvoidingViewWrapper>
    </ScrollView>
  );
};

export default ScrollViewKeyboardAvoidingView;
