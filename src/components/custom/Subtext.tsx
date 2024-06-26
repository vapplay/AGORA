import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";

interface prosp {
  text: string;
  TextStyle?: TextStyle;
  isSubtitle?: boolean;
  subText?: string;
  subTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  action?:() => void;
}

export default function Subtext({
  text,
  TextStyle,
  isSubtitle = false,
  subText,
  subTextStyle,
  containerStyle,
  action
}: prosp) {
  const subtitle = isSubtitle ? (
    <Text onPress={action} style={[styles.subText, subTextStyle]}>{subText}</Text>
  ) : null;

  return (
    <View style={[styles.conatiner, containerStyle]}>
      <Text style={[styles.textStyles, TextStyle]}>{text}</Text>
      {subtitle}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    textTransform: "capitalize",
    letterSpacing: 0.5,
  },
  subText: {
    color: "white",
  },

  conatiner:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal:10,
    marginTop: 10,

  }
});
