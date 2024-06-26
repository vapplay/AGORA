import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { EPISODES_URL, TMDB_BASE_URL } from "../../../constants/url";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../types/types";
import FastImage from "react-native-fast-image";
type Props = {
  data: { name: string; profile_path: string };
};

export default function RepartoScreen({ data }: Props) {
  const navigation = useNavigation<navigation>();

  /*   const NavigateFucion = useCallback(
    (id: number, profile_path: string, name: string, popularity: string) => {
      navigation.navigate("Actors", { id, profile_path, name, popularity });
    },
    []
  ); */

  return (
    <FlatList
      contentContainerStyle={styles.Container}
      horizontal
      data={data as any}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.7} style={styles.itemsConainer}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.image}
              source={{
                uri: item?.profile_path
                  ? EPISODES_URL + item?.profile_path
                  : "https://felicitips.com/others/logoUser.png",
              }}
            />
          </View>
          <Text numberOfLines={2} style={styles.text}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 110,
    height: 140,
  },
  image: {
    width: "100%",
    borderRadius: 6,
    height: "100%",
  },
  itemsConainer: {
    marginRight: 7,
    overflow: "hidden",
  },
  Container: {
    marginTop: 10,
  },
  text: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    width: "90%",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalConted: {
    height: 300,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
  },
});
