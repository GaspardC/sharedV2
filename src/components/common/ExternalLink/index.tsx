import React from "react";
import { Pressable } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Text from "../../mobile/Texts";
import { isWeb } from "../../../utils";

const ExternalLink = ({ name, url }: { name: string; url: string }) => {
  const openLink = () => WebBrowser.openBrowserAsync(url);
  return (
    <Pressable
      //@ts-ignore
      style={{
        ...(isWeb() && { cursor: "pointer" }),
        padding: 5,
      }}
      onPress={openLink}
    >
      <Text>{name}</Text>
    </Pressable>
  );
};

export default ExternalLink;
