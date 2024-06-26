import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import RenderSlider from "./render/RenderSlider";
import { CustomCoors } from "../../../constants/colors";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";

type Props = {
  data: Array<Object>;
  onLoadMore?: () => void;
  loading?: boolean;
  children?: JSX.Element;
  refreshing?: () => void;
};

let { width, height } = Dimensions.get("window");

export default function SliderGrid({
  data,
  onLoadMore,
  loading,
  refreshing,
}: Props) {
  const activitiIndicator = loading ? (
    <ActivityIndicator size={30} color={CustomCoors.BLue} />
  ) : (
    <></>
  );
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <FlashList
        refreshControl={
          <RefreshControl
            refreshing={loading as any}
            onRefresh={refreshing}
            colors={[CustomCoors.BLue]}
          />
        }

        estimatedItemSize={100}
        numColumns={3}
        data={data}
        renderItem={({ item }) => (
          <RenderSlider
            itemStylesConted={{ marginBottom: 10 }}
            Item={item as any}
          />
        )}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={activitiIndicator}
        ListFooterComponentStyle={{ paddingVertical: 30 }}
      />
    </View>
  );
}
