import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";

import Constants from "expo-constants";
import { useShare } from "../../../../hooks/usechare";

type Props = {
  goBack: () => void;
};

const NavigationHeader = memo(({ goBack }: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons
        onPress={goBack}
        style={styles.icons}
        name="chevron-back-outline"
        size={24}
        color="white"
      />

      <Feather
        name="share"
        size={23}
        color="white"
        onPress={() =>
          useShare(
            "Ven a Suko Play,Donde ver películas es gratis,Sin necesidad de pagar,Sólo tienes que entrar y disfrutar. =>  "
          )
        }
        style={styles.icons}
      />
    </View>
  );
});

export { NavigationHeader };

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    marginTop: Constants.statusBarHeight,
    zIndex: 3,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    backgroundColor: "#0000008c",
    borderRadius: 100,
    padding: 5,
  },
});
