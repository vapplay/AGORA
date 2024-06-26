import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import RenderLongSlider from "../../custom/slider/render/RenderLongSlider";
import Subtext from "../../custom/Subtext";
import { useIsFocused } from "@react-navigation/native";

type Props = {
  title: string;
};

const SeeMoreComponet = ({ title }: Props) => {
  const [data, setData] = useState([]);

  const focus = useIsFocused();

  useEffect(() => {
    (async () => {
    })();
  }, [focus]);

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <Subtext
        isSubtitle
        text={title}
        containerStyle={{ marginVertical: 15 }}
      />
      <RenderLongSlider data={data as any} />
    </View>
  );
};

export default SeeMoreComponet;
