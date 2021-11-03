import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  TouchableOpacity
} from "react-native";
import { Collapse } from "react-native-magnus";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";

type collapseType = {
  headerComponent: JSX.Element;
  bodyComponent: JSX.Element;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  selected: boolean;
};

const ToggleCollapse = ({
  headerComponent,
  bodyComponent,
  onPress,
  selected
}: collapseType) => {
  return (
    <Collapse active={selected}>
      <Collapse.Header
        active
        color="grey900"
        fontSize="md"
        py={theme.spacing.md}
        px={theme.spacing.sm}
        prefix={null}
        suffix={null}
        activeSuffix={null}
        bg={theme.colors.transparent}
      >
        <Pressable onPress={onPress}>{headerComponent}</Pressable>
      </Collapse.Header>
      <Collapse.Body>
        <Pressable
          style={{
            paddingBottom: theme.spacing.sm,
            paddingLeft: 0,
            paddingRight: theme.spacing.sm
          }}
          onPress={onPress}
        >
          {bodyComponent}
        </Pressable>
      </Collapse.Body>
    </Collapse>
  );
};

export default ToggleCollapse;
