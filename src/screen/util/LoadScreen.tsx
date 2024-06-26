import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CustomScreen from "../../components/custom/CustomScreen";
import { CustomCoors } from "../../constants/colors";

const { width, height } = Dimensions.get("window");
export default function LoadScreen() {
  return (
    <CustomScreen>
      <View style={styles.container}>
        <ActivityIndicator color={CustomCoors.BLue} size={50} />
      </View>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
});
