import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function CustomAlert({ close, title, subTitle }) {
  return (
    <View style={styles.conted}>
      <View style={styles.contedItems}>
        <LinearGradient
          colors={["red", "#03294700"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
        <Octicons
          style={styles.trackIcont}
          name="trash"
          size={24}
          color="black"
        />
        <View style={styles.textConted}>
          <Text style={styles.contedText}>Custom Alert</Text>
          <Text style={styles.contedText}>Custom Alert</Text>
        </View>
        <Ionicons name="ios-close-sharp" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conted: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    marginBottom: 10,
  },
  contedItems: {
    width: "90%",
    borderRadius: 6,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#032947d8",
    flexDirection: "row",
    paddingHorizontal: 6,
  },
  trackIcont: {
    color: "red",
    backgroundColor: "#ce222257",
    padding: 5,
    borderRadius: 6,
    paddingHorizontal: 8,
    zIndex:1
  },
  gradient: {
    position: "absolute",
    left: 0,
    height: "100%",
    width: "50%",
    borderRadius: 6,
    zIndex: -1,
  },
});
