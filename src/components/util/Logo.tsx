import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CustomCoors } from "../../constants/colors";

type Props = {
  size?: number;
};

export default function Logo({ size = 26  }: Props) {
  return (
    <View>
      <Text style={{ fontFamily: "Righteous", fontSize: size, color: "white" }}>
        AG<Text style={{ color: CustomCoors.BLue }}>O</Text>
        RA
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
