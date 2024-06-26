import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import { Linking } from "react-native";

type Props = {
  url: string;
};

export const BlockAdsWebView = ({ url }: Props) => {
  const webViewRef = useRef(null);

  return (
    <>
      <WebView
        style={{ flex: 1 }}
        ref={webViewRef}
        source={{ uri: "https://sbbrisk.com/embed-4tpetfko22hx" }}
      />
    </>
  );
};
