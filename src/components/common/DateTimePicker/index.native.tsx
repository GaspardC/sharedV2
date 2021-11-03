import React from "react";
import { Div } from "react-native-magnus";
import DateTimePickerUI from "@react-native-community/datetimepicker";
import { Pressable, StyleSheet } from "react-native";
import { theme } from "@my-monorepo/shared-local/src/theme";
import Text from "../../mobile/Texts";
import { isAndroid, isIos, formatDate, formatHours } from "../../../utils";

// on Android display only if asked (not init) and on ios follow variable
const DateTimePicker = ({
  mode,
  isVisible,
  setVisible,
  value,
  onChange,
  width = 90,
}: {
  mode: "date" | "time";
  isVisible: boolean;
  setVisible;
  value;
  onChange;
  width?: number;
}) => (
  <Div>
    {(isIos() ? isVisible : isVisible === true) && (
      <DateTimePickerUI
        value={value}
        mode={mode}
        display="default"
        onChange={onChange}
        style={{ width }}
        locale="fr-FR"
      />
    )}
    {isAndroid() && (
      <Div>
        <Pressable
          onPress={() => setVisible(true)}
          style={styles.pressableStyle}
        >
          <Text>
            {mode === "date" ? formatDate(value) : formatHours(value)}
          </Text>
        </Pressable>
      </Div>
    )}
  </Div>
);

export default DateTimePicker;

const styles = StyleSheet.create({
  pressableStyle: {
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary400,
    borderRadius: 5,
  },
});
