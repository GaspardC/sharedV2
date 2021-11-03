import React from "react";
import WebView from "react-native-webview";
import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";
import { Metrics } from "../../../utils";

const FullWebView = ({ url, onClose }) => {
  const closeWebView = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <SafeAreaView style={styles.mainCont}>
      <TouchableOpacity onPress={closeWebView} style={styles.touchable}>
        {/* <Icon light name={"chevron-down"} size={25} style={styles.close} /> */}
        <AntDesign name="down" size={24} color="black" style={styles.close} />
      </TouchableOpacity>
      <WebView
        source={{ uri: url }}
        style={styles.container}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};
export default FullWebView;

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.white,
  },
  touchable: {
    backgroundColor: "transparent",
    padding: theme.spacing.xs,
  },
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  close: {
    fontSize: theme.fontSize.large,
    backgroundColor: theme.colors.white,
  },
});
