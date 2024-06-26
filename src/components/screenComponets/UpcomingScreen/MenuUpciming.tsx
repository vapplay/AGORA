import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import constants from "expo-constants";

export default function MenuUpciming() {
  return (
    <View style={styles.header}>
      <View style={styles.headerItem}>
        <View style={{ width: 25, height: 25 }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../../../assets/img/assets/cine.png")}
          />
        </View>
        <Text style={styles.title}>Próximamente</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    title: {
      color: "black",
      fontSize: 15,
      fontWeight: "bold",
      marginLeft: 10,
    },
  
    header: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 15,
      marginVertical: constants.statusBarHeight + 10,
    },
  
    headerItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 50,
      paddingVertical: 5,
      paddingHorizontal: 9,
    },
  });