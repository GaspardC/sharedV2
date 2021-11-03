import React from "react";
import NativeFlashMessage, { showMessage } from "react-native-flash-message";
// import { theme } from "../../config/theme/theme";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";
import { getDescriptionSafe, isAndroid } from "@my-monorepo/shared/src/utils";

export const FlashMessage = ({ extraStyle }: { extraStyle? }) => {
  return (
    <NativeFlashMessage
      style={{ marginTop: isAndroid() ? 30 : 0, ...extraStyle }}
      position="top"
    />
  );
};

type Props = {
  title?: string;
  description?: string;
  duration?: number;
  status?: "success" | "error" | "info";
  onPress?: () => void;
};

const toast = ({
  title = "",
  description = "",
  duration = 3000,
  status = "success",
  onPress,
  ...otherProps
}: Props) => {
  const backgroundColor = getBg(status);
  const color = "white";

  showMessage({
    message: title,
    description: getDescriptionSafe(description),
    backgroundColor,
    color, // text color
    duration,
    ...(onPress && { onPress }),
    ...otherProps,
  });
};
export default toast;

export const getBg = (type: Props["status"]) => {
  switch (type) {
    case "error":
      return theme.colors.accent200;
    case "info":
      return theme.colors.quartiary400;
    case "success":
      return theme.colors.success400;
    default:
      return theme.colors.quartiary400;
  }
};
