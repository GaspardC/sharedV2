import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";
import { isWeb } from "../../../utils";

export type ScrollContainerProps = {
  children: any;
  containerStyle?;
  height?: string | number;
  noInnerStyle?: boolean;
};
export const ScrollContainer = ({
  children,
  containerStyle,
  height,
  noInnerStyle = false
}: ScrollContainerProps) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...(height && { style: { height } })}
    >
      <SafeAreaView
        style={[
          !noInnerStyle ? styles.inner : {},
          styles.margin,
          styles.bg,
          containerStyle
        ]}
      >
        {children}
      </SafeAreaView>
    </ScrollView>
  );
};

const ScreenContainer = ({
  children,
  containerStyles,
  MarkerPartialExitComponent,
  height,
  innerWrapper = true
}: {
  children: any;
  containerStyles?;
  MarkerPartialExitComponent?: React.FC<any> | null;
  height?;
  innerWrapper?: boolean;
}) => {
  const InnerWrapper = innerWrapper ? View : React.Fragment;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, styles.margin, styles.bg, containerStyles]}
    >
      {MarkerPartialExitComponent && <MarkerPartialExitComponent top={-15} />}
      <TouchableWithoutFeedback
        {...(!isWeb() && { onPress: () => Keyboard.dismiss() })}
      >
        <InnerWrapper {...(innerWrapper && { style: styles.inner })}>
          {children}
        </InnerWrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export const ScreenContainerWithScrollView = ({
  children,
  containerStyles,
  MarkerPartialExitComponent,
  height
}: {
  children: any;
  containerStyles?;
  MarkerPartialExitComponent?: React.FC<any> | null;
  height?;
}) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <ScreenContainer
        containerStyles={containerStyles}
        MarkerPartialExitComponent={MarkerPartialExitComponent}
        height={height}
      >
        {children}
      </ScreenContainer>
    </ScrollView>
  );
};
export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll"
  },
  inner: {
    flex: !isWeb() ? 1 : undefined,
    // minHeight: Metrics.fullScreenHeightN - 100,
    paddingTop: 20,
    alignItems: "center",
    width: !isWeb() ? "100%" : undefined
  },
  margin: {
    margin: theme.spacing.md
  },
  bg: {
    backgroundColor: theme.colors.transparent
  }
});
