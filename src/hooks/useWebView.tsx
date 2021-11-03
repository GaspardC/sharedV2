import React, { useState, Fragment } from "react";
import * as Linking from "expo-linking";
import FullWebView from "../components/common/FullWebView/FullWebView";
import { isDevice } from "../utils";

const useWebView = () => {
  const [urlToOpen, setUrl] = useState("");

  const openUrl = (url) => {
    if (isDevice()) return setUrl(url);
    window.open(url, "_self");
  };

  const webviewComp =
    urlToOpen && isDevice() ? (
      <FullWebView
        url={urlToOpen}
        onClose={() => {
          setUrl("");
        }}
      />
    ) : (
      <Fragment />
    );
  return {
    webviewComp,
    openUrl: ({ url, inApp = true }) =>
      inApp ? openUrl(url) : Linking.openURL(url),
  };
};

export default useWebView;
